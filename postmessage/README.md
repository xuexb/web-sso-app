# Web postMessage 跨域示例

这是一个前端后端分离项目，后端使用一个域名提供 RESTful API ，前端会有多个域名，但由于 [CORS credentials](https://github.com/xuexb/web-sso-app/tree/master/credentials) 限制问题，兼容不是很帅，这里使用 Token 机制，不使用后端记录 cookie ，如：

- 登录成功时由后端对该用户生成一个令牌（Token），用户浏览器请求时在 Request Headers 传该 Token 即可访问用户数据
- 对于后端服务来说，不在前端浏览器存储 Token ，而是使用 Token 跟用户关联后，把 Token 返给前端，前端存储处理
- 由于后端是无状态，只认 Token ，那么后端没有域名的限制，当然还是得有白名单的
- 前端需要使用一个固定的域名作为登录入口（ www.login.com ），Token 将存在该域下，前端的其他域名（ www.a.com 、www.b.com ）使用 postMessage 跨域请求这个登录入口来获取 Token

### 目录说明

```
.
├── client
│   ├── www.login.com                       - 登录服务页面
│   └── fe                                  - 前端页面
├── docker-compose.yml
├── nginx.conf
└── server                                  - 后端 RESTful API 服务
```

## 示例

### 绑定 Hosts

```
# 登录入口
127.0.0.1 www.login.com

# 前端域名
127.0.0.1 www.a.com www.b.com www.c.com

# 为了验证多后端共享，这里多模拟几个不同域名的后端
127.0.0.1 www.sso1.com www.sso2.com www.sso3.com www.sso4.com www.sso5.com
```

### 运行代码

```bash
# 克隆代码
git clone https://github.com/xuexb/web-sso-app.git

# 进入目标目录
cd web-sso-app/postmessage

# 使用 Docker Compose 启动服务
docker-compose up --force-recreate
```

访问域名 www.login.com 登录成功后，访问以下域名将自动进入登录状态：

- www.a.com
- www.b.com
- www.c.com

注意看请求，会随机请求到 `www.sso[1-5].com` 中。

## 问题

### 1. 没有安全问题？

怎么可能没有！这里只要有你的 Token 即可“变身”成为你。该项目只是一个示例，真正的 Token 生成逻辑、Token 验签逻辑肯定是后端大神做，这里只是走流程。

当然还有 CORS Origin 白名单安全问题和 iframe 页面的 CSP 、postMessage Origin 白名单问题等。

### 2. 不能每个前端域名下都有自已的登录页？

其实可以的，主要问题是在前端域名时不知道请求哪个域名的 Token ，比如在 www.a.com 登录，但主动的访问 www.b.com 时不知道登录状态是在 www.a.com 中，其实可以使用 postMessage 逐个的轮询其他共享前端域名。

### 3. 每次都获取 postMessage Token 会不会慢？

可以在获取成功时存储到当前域名下，刷新页面时优先使用当前域名下的 Token 。