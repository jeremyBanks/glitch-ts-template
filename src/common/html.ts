// The HTML`...` tag function automatically escapes interpolated text/attribute
// values, producing an HTML object. This is a subclass of the String object
// type, and can be converted to a primitive using the .toString() method. If
// you need to interpolate a dynamic HTML value, wrap it with
// HTML.UnsafeRaw(...). Arrays of strings will be concatenated.
//
// You can use HTML.string`...` and HTML.fragment`...` to get the result as a
// primitive string or DOM DocumentFragment.
 

// We use a subclass of String for our HTML objects.
// The implementation/constructor are not exported.
const HTMLRuntimeType = class HTML extends String {};

// But we do export the class's type, under the name HTML.
const htmlInstance = new HTMLRuntimeType;
export type HTML = typeof htmlInstance;

// Our primary HTML`...` escaping tag function returns our HTML String objects.
const htmlTag = (strings: TemplateStringsArray, ...substitutions: (string|String)[]): HTML => {
  const escapedFlattenedSubstitutions =
    substitutions.map(s => ([] as (string|String)[]).concat(s).map(HTML.escape).join(''));
  const pieces = [];
  for (let i = 0; i < strings.length; i++) {
    pieces.push(strings[i]);
    if (i < escapedFlattenedSubstitutions.length) {
      pieces.push(escapedFlattenedSubstitutions[i]);
    }
  }
  return new HTMLRuntimeType(pieces.join(''));
};

// HTML.string`...` converts the interpolated HTML to a primitive string.
const stringTag = (strings: TemplateStringsArray, ...substitutions: (string|String)[]): string => {
  return HTML(strings, ...substitutions).toString();
};

// HTML.fragment`...` safely parses the interpolated HTML as an HTMLFragment.
const fragmentTag = (strings: TemplateStringsArray, ...substitutions: (string|String)[]): DocumentFragment => {
  const html = HTML(strings, ...substitutions);
  const doc = (new DOMParser).parseFromString(`<!doctype html><body><template>${html}</template>`, 'text/html');
  return (doc.querySelector('template') as any).content;
};

// HTML.element`...` returns the single child element in the interpolated HTML or throws if more or less than one.
const elementTag = (strings: TemplateStringsArray, ...substitutions: (string|String)[]): Element => {
  const html = HTML(strings, ...substitutions);
  const doc = (new DOMParser).parseFromString(`<!doctype html><body><template>${html}</template>`, 'text/html');
  if (doc.body.children.length !== 1) {
    throw new Error(`found ${doc.body.children.length} elements expecting 1 in wrapper document body`);
  }
  const templateContent = (doc.body.firstElementChild as HTMLTemplateElement).content;
  if (templateContent.children.length !== 1)  {
    throw new Error(`found ${templateContent.children.length} elements expecting 1 in ${html}`);
  }
  return templateContent.firstElementChild as Element;
};

// HTML.escape(...) will return an HTML object unchanged, but convert any 
// other value to a string and escape it to create a new HTML object.
const htmlEscape = (text: any): HTML => {
  if (text instanceof HTMLRuntimeType) {
    return text;
  }
  return new HTMLRuntimeType(
      String(text)
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;')
          .replace(/'/g, '&#39;'));
};

// HTML.unsafeRaw(...) exposes our private constructor for unfortunate misuse.
const htmlUnsafeRaw = (s: string): HTML => {
  return new HTMLRuntimeType(s);
};

// We define our non-type HTML function and namespace here.
// Using Object.assign() lets us keep our full typing without much typing. ;)
export const HTML = Object.assign(
  htmlTag, {
    string: stringTag,
    fragment: fragmentTag,
    element: elementTag,
    escape: htmlEscape,
    unsafeRaw: htmlUnsafeRaw
  }
);

// Make HTML available as a default export in addition to a named one.
export { HTML as default };
