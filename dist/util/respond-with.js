"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
function respondWith(ctx, json, status) {
  ctx.body = json;
  ctx.status = status;
}

exports.default = respondWith;