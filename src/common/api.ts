import * as t from 'runtypes';


export const ApiResponseData = t.Record({
  projectName: t.Union(t.String, t.Literal(null)),
  nodeVersion: t.String,
  typescriptVersion: t.String
});

export type ApiResponseData = t.Static<typeof ApiResponseData>;
