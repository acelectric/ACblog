let server = require("./server.js");
let router = require("./router.js");
let requestHandlers = require("./requestHandlers.js");

let handle = {};
handle["/"] = requestHandlers.start;
handle["/start"] = requestHandlers.start;
handle["/upload"] = requestHandlers.upload;

server.start(router.route, handle);