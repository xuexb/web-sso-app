module.exports = class extends think.Controller {
  async loginAction() {
    const { username, password } = this.post();
    if (username === password) {
      await this.session('userinfo', {
        username,
        update_time: Date.now()
      });
      return this.success();
    }
    return this.fail('出错了');
  }

  async checkAction() {
    const userinfo = await this.session('userinfo');
    return this.success(userinfo || null);
  }

  async logoutAction() {
    await this.session('userinfo', null);
    return this.success();
  }
};
