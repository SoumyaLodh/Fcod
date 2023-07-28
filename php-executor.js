const { NodePHP } = require("@php-wasm/node");
const arg = require("arg");

const args = arg({});

const php = await NodePHP.load("8.2", {
  requestHandler: {
    documentRoot: "/srv",
    absoluteUrl: "http://localhost:3000",
  },
});

php.mkdir("/srv");
php.chdir("/srv");

php.mount(process.cwd, "/srv");

process.exit(0);
