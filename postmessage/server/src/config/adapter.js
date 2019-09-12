const fileCache = require('think-cache-file');
const {Console, DateFile} = require('think-logger3');
const path = require('path');
const isDev = think.env === 'development';

exports.cache = {
  type: 'file',
  common: {
    timeout: 24 * 60 * 60 * 1000 // 单位：毫秒
  },
  file: {
    handle: fileCache,
    cachePath: path.join(think.ROOT_PATH, 'runtime/cache'), // 缓存文件存放的路径
    pathDepth: 1,
    gcInterval: 24 * 60 * 60 * 1000 // 清理过期缓存定时时间
  }
}

/**
 * logger adapter config
 * @type {Object}
 */
exports.logger = {
  type: isDev ? 'console' : 'dateFile',
  console: {
    handle: Console
  },
  dateFile: {
    handle: DateFile,
    level: 'ALL',
    absolute: true,

    // 如果是 Docker 运行，则配合 Dockerfile 输出日志
    pattern: process.env.DOCKER ? '' : '-yyyy-MM-dd',
    alwaysIncludePattern: !process.env.DOCKER,
    filename: process.env.DOCKER ? '/var/log/node.log' : path.join(think.ROOT_PATH, 'logs/app.log')
  }
};
