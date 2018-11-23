---
layout: doc
language: en
title: Listen Event
---

A method is provided in Blade to help developers to listen to some of the lifecycles of an application's runtime. For example, the creation and destruction of `Session`, after the application is started, and so on.
The supported event types are as follows:

```java
public enum EventType {
    SERVER_STARTING,    // server ready to start
    SERVER_STARTED,     // server started successfully
    SERVER_STOPPING,    // when the server is ready to stop
    SERVER_STOPPED,     // server stopped (normal exit)
    SESSION_CREATED,    // when the create a session
    SESSION_DESTROY,    // when the destory a session
    ENVIRONMENT_CHANGED // when the configuration file changes
}
```

How to use it? very simple, just call the `event` method of `Blade`, generally we write at startup.

```java
Blade.of()
  .on(EventType.SESSION_CREATED, e -> {
    Session session = (Session) e.attribute("session");
    // do something
  }).start(Application.class, args);
```
