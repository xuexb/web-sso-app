const Base = require('./base.js');

module.exports = class extends Base {
  async loginAction() {
    return this.success();
  }
};
