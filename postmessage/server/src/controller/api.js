module.exports = class extends think.Controller {
  // 前置数据验证权限，但要忽略登录接口
  async __before() {
    if (this.ctx.action === 'login') {
      return;
    }

    const ua = this.ctx.request.header['user-agent'];
    const token = this.ctx.request.header['sso-access-token'];

    // Header 没有 Token 或者没有 ua
    if (!ua || !token) {
      return this.fail(403, '未登录');
    }

    // token 失败，或者没有通过验证
    const userinfo = await this.cache(token);
    if (!userinfo || !userinfo.validator || userinfo.validator.ua !== ua) {
      return this.fail(403, '未登录');
    }

    // 写入当前数据
    delete userinfo.validator;
    this.userinfo = userinfo;
  }

  // 登录接口
  async loginAction() {
    const { username, password } = this.post();
    const ua = this.ctx.request.header['user-agent'] || '';

    if (!username || username !== password) {
      return this.fail(101, '用户名或密码不正确！');
    }

    if (!ua) {
      return this.fail(101, '没有 User-Agent ！');
    }

    const token = think.uuid();

    // 使用 token 作为缓存的 key 存储，且记录一个验证的标识
    await this.cache(token, {
      username,
      update_time: Date.now(),
      validator: {
        ua
      }
    });

    return this.success({
      token
    });
  }

  // 验证是否登录，登录时返回用户信息
  async checkAction() {
    return this.success(this.userinfo);
  }

  // 退出接口
  async logoutAction() {
    const token = this.ctx.request.header['sso-access-token'];
    await this.cache(token, null);
    return this.success();
  }
};
