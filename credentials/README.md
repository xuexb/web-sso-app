# Web CORS credentials 跨域示例

这里是一个前后端分离项目，是由后端提供 RESTful API ，前端多套域名使用 Fetch CORS credentials 跨域请求后端统一接口，以来实现『单点登录』，也就是在一个网站上登录了，在对应的其他网站中即是登录状态。

## 依赖技术点

- [CORS](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Access_control_CORS)
- [Access-Control-Allow-Credentials](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Credentials)
- [ThinkJS](https://thinkjs.org) 提供后端 RESTful API ，依赖 session 功能
- [Docker](https://www.docker.com) 运行 [Nginx](http://nginx.org/) 启用一个本地的静态服务器
- Docker 运行 [Node.js](https://nodejs.org) 启用 ThinkJS ，并使用 Nginx 反向代理

## 架构

- 前端后端分离项目，前端为纯洁的静态 HTML 文件，后端提供 RESTful API
- 为了模拟多域名登录状态共享，前端使用多个本地域名（如：`www.a.com`、`www.b.com` 等）
- 后端服务使用 CORS Credentials ，所以后端需要固定死一个域名，这里是：`www.sso.com`
- 当任意域名向 `www.sso.com` 发起 CORS Credentials 请求时，浏览器会自动带上 `www.sso.com` 域名上的 cookie 列表，这样就实现了简单的『单点登录』功能

## 示例

### 绑定 Hosts

```hosts
127.0.0.1 www.sso.com
127.0.0.1 www.a.com www.b.com www.c.com
```

### 运行代码

```bash
# 克隆代码
git clone https://github.com/xuexb/web-sso-app.git

# 进入目标目录
cd web-sso-app/credentials

# 使用 Docker Compose 启动服务
docker-compose up --force-recreate --build
```

访问域名以下域名登录成功后，其他域名将自动登录成功：

- www.a.com
- www.b.com
- www.c.com

## 问题

### 1. Safari 兼容问题

由于 Safari 默认开启了**阻止跨站追踪**功能，默认情况下不允许使用 CORS Credentials ，需要更换方案（待写）。也可以手动关闭：【Safari -> 偏好设置 -> 隐私】中关闭**阻止跨站追踪**并重启浏览器。

### 2. 安全问题

注意：CORS Credentials 的 Response Headers 中 `Access-Control-Allow-Origin` 字段不允许返回 `*` ，所以后端接口服务应该判断请求的 Origin ，并做白名单，在白名单内才返回请求的 Origin 。
