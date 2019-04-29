require("ts-node").register(require("./tsconfig.json"));

const functions = require("./functions/index.ts");
const queues = require("./queues/index.ts");

exports.processTag = function processTag(event, callback) {
  functions.processTag(event, callback);
};

exports.queueTags = function queueTags(event, callback) {
  queues.queueTags(event, callback);
};
