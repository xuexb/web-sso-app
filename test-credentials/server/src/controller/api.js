module.exports = class extends think.Controller {
  async checkAction() {
    const userinfo = await this.session('userinfo');
    return this.success(userinfo || null);
  }

  async loginAction() {
    await this.session('userinfo', { name: Date.now() });
    return this.success();
  }
};
