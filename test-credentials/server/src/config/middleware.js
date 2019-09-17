const path = require('path');
const cors = require('kcors');
const isDev = think.env === 'development';

module.exports = [
  {
    handle: 'meta',
    options: {
      logRequest: isDev,
      sendResponseTime: isDev
    }
  },
  {
    handle: 'resource',
    enable: isDev,
    options: {
      root: path.join(think.ROOT_PATH, 'www'),
      publicPath: /^\/(static|favicon\.ico)/
    }
  },
  {
    handle: 'trace',
    enable: !think.isCli,
    options: {
      debug: isDev
    }
  },
  {
    handle: 'payload',
    options: {}
  },
  {
    handle: 'router',
    options: {
    }
  },
  {
    handle: cors,
    options: {
      origin(ctx) {
        return ctx.get('origin');

        // 这里应该做 origin 白名单的
        // const host = new URL(ctx.request.header.origin).hostname;
        // if (['host1.com', 'host2.com'].includes(host)) {
        //   return ctx.get('origin');
        // }
        // return null;
      },
      credentials: true,
      allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH'
    }
  },
  'logic',
  'controller'
];
