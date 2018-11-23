---
layout: doc
language: en
title: Session Expansion
---

By default, Blade uses the built-in `Session` implementation, and session data is stored in `memory` if you want to use Redis or other storage containers.
Saving is also possible, just reimplementing a Session is fine.

The following is the definition of the `Session` interface:
 
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

So you only need to implement this class, then tell Blade that I need to use a custom Session implementation, how to configure it?

# TODO