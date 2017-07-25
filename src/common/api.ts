import * as t from 'runtypes';


// A simple example interface defined using runtypes.
// The run-time validator can only be used by the server code.
// The derived static type can be used by the client as well.

export const ApiResponseData = t.Record({
  projectName: t.Union(t.String, t.Literal(null)),
  nodeVersion: t.String,
  typescriptVersion: t.String
});

export type ApiResponseData = t.Static<typeof ApiResponseData>;
