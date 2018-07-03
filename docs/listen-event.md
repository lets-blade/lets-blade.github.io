---
layout: doc
language: cn
title: 监听事件
---

Blade 中提供一个方法帮助开发者可以自定义的监听应用程序运行中的一些生命周期。比如 `Session` 的创建与销毁，应用启动结束后等。
支持的事件类型有如下：

```java
public enum EventType {
    SERVER_STARTING,    // 服务准备启动
    SERVER_STARTED,     // 服务启动成功
    SERVER_STOPPING,    // 服务准备停止时
    SERVER_STOPPED,     // 服务停止结束（正常退出）
    SESSION_CREATED,    // 创建一个 Session 时
    SESSION_DESTROY,    // 销毁一个 Session 时
    SOURCE_CHANGED,     // TODO 暂无卵用
    ENVIRONMENT_CHANGED // 配置文件发生变化时
}
```

如何使用呢？很简单，只需要调用 `Blade` 的 `event` 方法即可，一般我们写在启动时。

```java
Blade.of().on(EventType.SESSION_CREATED, e -> {
  Session session = (Session) e.attribute("session");
  // do something
}).start(Application.class, args);
```
