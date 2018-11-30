---
layout: doc
language: en
title: WebHook
---

`WebHook` is proposed in Blade, you can call it hook. The main purpose of this component is to intercept some operations before and after each request.

## Register WebHook

You can implement the `WebHook` interface and add a `@Bean` annotation to the implementation class to indicate that the class is being scanned by the IOC container.

```java
@Bean
Public class Hook1 implements WebHook {

    @Override
    Public boolean before(RouteContext ctx) {
        System.out.println("Enter web hook1");
        Return true;
    }

}
```

Let's see how the `WebHook` interface is defined:

```java
@FunctionalInterface
Public interface WebHook {

    Boolean before(RouteContext ctx);

    Default boolean after(RouteContext ctx) {
        Return true;
    }

}
```

This uses Java8's functional methods and provides a default `after` implementation, which is called after the route is executed if the `after` method is overridden.
Here, the return value of WebHook determines whether this request continues to be called down. If it is `true`, it will be let go, and if `false` is returned, the request will be interrupted.

In addition to intercepting all requests, you can also choose to intercept some requests, such as intercepting all requests under `/user`, then you don't need to use this global hook, you can do this:

```java
Blade.of()
     .before("/user/*", ctx -> System.out.println("before: " + ctx.uri()))
```

## Middleware

In the Blade, the hook is subdivided, that is, the middleware. Its execution logic is earlier than the previous hook, and is mainly used for pre-interception of some operations such as verification and authentication.

You can define a middleware like this:

```java
Public class MyMiddleware implements WebHook {
    @Override
    Public boolean before(RouteContext context) {
        System.out.println("this is my middleware");
        Return true;
    }
}
```

Then use it

```java
Blade.of().use(new MyMiddleware()).start(XXX);
```

At this point all requests will execute the contents of the middleware first, and then execute the logic (if any) in the hook.

## Default middleware

Some middleware is built into the Blade:

- BasicAuthMiddleware: for Basic authentication
- CorsMiddleware: used to do Cors cross-domain homology
- XssMiddleware: used to filter XSS requests
- CsrfMiddleware: for CSRF defense

You can also define some middleware according to your needs. If you think they are generic, you can also consider open source for everyone to use.