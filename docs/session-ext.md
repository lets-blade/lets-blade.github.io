---
layout: doc
language: cn
title: Session 扩展
---

默认情况下 Blade 使用内置的 `Session` 实现，会话数据是存储在 `内存` 中的，如果你想使用 Redis 或者其他存储容器来
保存也是可以的，只需要重新实现一个 Session 就好了。

下面是 `Session` 接口的定义：

```java
public class HttpSession implements Session {

    private Map<String, Object> attributes = new HashMap<>();
    @Setter
    private String              id         = null;
    @Setter
    private String              ip         = null;
    @Setter
    private long                created    = -1;
    @Setter
    private long                expired    = -1;

    @Override
    public String id() {
        return id;
    }

    @Override
    public void id(String id) {
        this.id = id;
    }

    @Override
    public String ip() {
        return this.ip;
    }

    @Override
    public void ip(String ip) {
        this.ip = ip;
    }

    @Override
    public <T> T attribute(String name) {
        Object object = this.attributes.get(name);
        return null != object ? (T) object : null;
    }

    @Override
    public void attribute(String name, Object value) {
        this.attributes.put(name, value);
    }

    @Override
    public Map<String, Object> attributes() {
        return attributes;
    }

    @Override
    public void removeAttribute(String name) {
        this.attributes.remove(name);
    }

    @Override
    public long created() {
        return this.created;
    }

    @Override
    public void created(long created) {
        this.created = created;
    }

    @Override
    public long expired() {
        return this.expired;
    }

    @Override
    public void expired(long expired) {
        this.expired = expired;
    }

}
```

所以你只要实现这个类，然后告诉 Blade 我需要使用自定义的 Session 实现就可以了，如何配置呢？
