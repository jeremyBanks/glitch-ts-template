set -eu;


rm -rf *dist*/;

>&2 echo "Building src/ for server...";
tsc -p src/server.tsconfig.json || >&2 echo "FAILED";

>&2 echo "Building src/ for client...";
tsc -p src/client.tsconfig.json || >&2 echo "FAILED";

>&2 echo "Building styles/ for client...";
node-sass styles/ --output styles.dist/ --quiet || >&2 echo "FAILED";

>&2 echo "Starting server...";
node server.dist/server/main.js;
