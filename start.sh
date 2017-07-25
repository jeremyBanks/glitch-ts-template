set -eu;


rm -rf *dist*/;

echo "Building src/ for server...";
tsc -p src/server.tsconfig.json || >&2 echo "FAILED";

echo "Building src/ for client...";
tsc -p src/client.tsconfig.json || >&2 echo "FAILED";

echo "Building styles/ for client...";
node-sass styles/ --output styles.dist/ --quiet || >&2 echo "FAILED";

echo "Starting server...";
node server.dist/server/main.js;
