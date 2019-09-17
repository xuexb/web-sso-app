# Test CORS credentials

由于不是所有浏览器都对 CORS credentials 支持，这里写个示例测试一下下。

## 流程

- 在前端静态页面加载完毕后，发起一个 CORS credentials 自动登录请求，并且再发起一个请求信息接口
- 如果获取成功，则说明当前浏览器支持
- 如果获取不到用户信息，则说明当前浏览器不支持

## 示例

### 绑定 Hosts

```hosts
127.0.0.1 www.sso.com
127.0.0.1 www.a.com
```

### 运行代码

```bash
# 克隆代码
git clone https://github.com/xuexb/web-sso-app.git

# 进入目标目录
cd web-sso-app/test-credentials

# 使用 Docker Compose 启动服务
docker-compose up --force-recreate --build
```

访问域名以下域名查看页面显示状态即可。

- www.a.com