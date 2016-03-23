function respondWith(ctx, json, status) {
  ctx.body = json;
  ctx.status = status;
}

module.exports = respondWith;
