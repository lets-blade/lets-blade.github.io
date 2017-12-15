---
title: 更新日志
categories: update-log
comments: false
---

## v2.0.5

1. 支持 `WebSocket`
2. 支持 `SSL` 配置
3. 支持自定义启动 `BannerText`
3. 支持自定义启动线程名称
3. 支持自定义业务线程前缀
3. 获取 `Environment` 参数允许设置默认值
4. 升级 `Netty` 版本到 `4.1.18.Final`
5. 修复获取客户端 IP 地址
6. 修复 `robots.txt` 请求导致的异常
7. 修复 `Nginx` 下获取 `Cookie` 小写问题
8. 添加 `CollectionKit` 工具类
9. 添加 `StringKit.isAnyBlank()` 方法

## v2.0.4

1. 优化性能
2. 优化 `ClassReader` 类结构
2. 优化过期方法
3. 分离 `asm` 模块为单独 jar
4. 修复 `JsonKit.toString` 双引号报错
5. 修复响应 `contentType` 输出错误
6. 修复 `UnsupportedOperationException` 异常
5. 移除部分魔数代码

## v2.0.3

1. 修复中文静态资源404问题
1. 修复 `Signature` 获取路由方法错误
1. 修复 `ExceptionHandler` 未被注入
1. 移除 `@QueryParam` 注解
1. 优化部分过期Netty API
1. 添加 `Session` 接口可扩展（添加 `Blade.sessionType` 方法）
1. 添加 `InputFilter` 工具类
1. 添加 `HtmlFilter` 工具类
