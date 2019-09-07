const fileSession = require('think-session-file');
const {Console, DateFile} = require('think-logger3');
const path = require('path');
const isDev = think.env === 'development';

/**
 * session adapter config
 * @type {Object}
 */
exports.session = {
  type: 'file',
  common: {
    cookie: {
      name: 'thinkjs'
      // keys: ['werwer', 'werwer'],
      // signed: true
    }
  },
  file: {
    handle: fileSession,
    sessionPath: path.join(think.ROOT_PATH, 'runtime/session')
  }
};

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
