---
layout: doc
language: en
title: WebHook
---

Here we call the hook, people who may be java are relatively new to this word, you can understand it as an interceptor (in fact, it all means). The middleware has been introduced in the previous section. The concept of middleware is also simplified on the basis of the hook. A webhook (hook) will intercept the `routing logic` before executing **, ** after **, middleware Always do something before the routing logic executes.

## Registration hook

You can implement the `WebHook` interface and add a `@Bean` annotation to the implementation class to indicate that the class is being scanned by the IOC container.

```java
@Bean
public class Hook1 implements WebHook {

    @Override
    public boolean before(Signature signature) {
        System.out.println("进入web hook1");
        return signature.next();
    }

}
```

Let's see how the `WebHook` interface is defined:

```java
@FunctionalInterface
public interface WebHook {

    boolean before(Signature signature);

    default boolean after(Signature signature) {
        return true;
    }

}
```

This uses Java8's functional methods and provides a default `after` implementation, which is called after the route is executed if the `after` method is overridden.
Here, the return value of WebHook determines whether this request continues to be called down. If it is `true`, it will be let go, and if `false` is returned, the request will be interrupted.