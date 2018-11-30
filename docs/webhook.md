---
layout: doc
language: cn
title: WebHook
---

Blade 中提出 `WebHook`，你可以叫它钩子。该组件主要目的是拦截每次请求之前和之后的一些操作。

## 注册 WebHook

你可以实现 `WebHook` 接口，并在实现类上加一个 `@Bean` 注解表示该类被 IOC 容器扫描。

```java
@Bean
public class Hook1 implements WebHook {

    @Override
    public boolean before(RouteContext ctx) {
        System.out.println("进入web hook1");
        return true;
    }

}
```

我们来看看 `WebHook` 接口是如何定义的：

```java
@FunctionalInterface
public interface WebHook {

    boolean before(RouteContext ctx);

    default boolean after(RouteContext ctx) {
        return true;
    }

}
```

这里用了 Java8 的函数式方法，并提供一个默认的 `after` 执行，如果重写 `after` 方法则在路由执行后调用。
这里 WebHook 的返回值决定了本次请求是否继续向下调用，为 `true` 则放过，返回 `false` 则中断请求。

除了拦截所有请求，你也可以选择拦截部分请求，比如拦截 `/user` 下的所有请求，那么就不需要使用这种全局的钩子了，可以这样：

```java
Blade.of()
     .before("/user/*", ctx -> System.out.println("before: " + ctx.uri()))
```

## 中间件

Blade 中将钩子做了一个细分，也就是中间件，它的执行逻辑会早于前面的钩子，主要用于一些校验、认证等操作的前置拦截。

你可以这样定义一个中间件：

```java
public class MyMiddleware implements WebHook {
    @Override
    public boolean before(RouteContext context) {
        System.out.println("this is my middleware");
        return true;
    }
}
```

然后使用它

```java
Blade.of().use(new MyMiddleware()).start(XXX);
```

此时所有的请求会先执行中间件的内容，然后再执行钩子里的逻辑（如果有的话）。

## 默认中间件

在 Blade 中内置了一些中间件：

- BasicAuthMiddleware：用于做 Basic 认证
- CorsMiddleware：用于做 Cors 跨域同源
- XssMiddleware：用于过滤 XSS 请求
- CsrfMiddleware：用于 CSRF 防御

你也可以根据自己的需求定义一些中间件，如果你认为它们是通用的也可以考虑开源出来让大家使用。