---
layout: doc
language: cn
title: 命令行参数
---

为了方便起见，我们支持在运行 Blade 应用的时候修改一些配置，比如我在运行时指定端口：

```bash
java -jar blade-app.jar --server.port=9088
```

当然还支持一些其他的命令行参数，看看下面的表格：

| 命令行参数 | 描述   |  示例  |
| -------- | -----  | ----  |
| `server.address` | 服务地址，默认是本机 `0.0.0.0` 回环地址 | `--server.address=192.168.1.100` |
| `server.port` | web服务端口，默认是 `9000` | `--server.port=9088` |
| `app.env` | 启动配置文件环境，默认是 `application.properties` | `--app.env=prod` |
