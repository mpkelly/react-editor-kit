"use strict";

var liveServer = require("live-server");

const internalIp = require("internal-ip");

(async () => {
  const ip = await internalIp.v4();
  // See https://www.npmjs.com/package/live-server#usage-from-node
  var params = {
    host: ip,
    port: 8090,
    root: ".",
    file: "index.html",
    logLevel: 0
  };
  liveServer.start(params);
})();
