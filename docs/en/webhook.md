---
layout: doc
language: en
title: WebHook
---

这里我们叫钩子，可能做java的人对这个词比较陌生，你可以理解为拦截器（其实都是一个意思）。之前的小节里已经介绍中间件，中间件的概念也是在钩子的基础之上做了简化，一个 webhook(钩子)会拦截 `路由逻辑` 执行 **前**, **后**，中间件总是在路由逻辑执行前做一些操作。

## 注册钩子

你可以实现 `WebHook` 接口，并在实现类上加一个 `@Bean` 注解表示该类被 IOC 容器扫描。

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

我们来看看 WebHook 接口是如何定义的：

```java
@FunctionalInterface
public interface WebHook {

    boolean before(Signature signature);

    default boolean after(Signature signature) {
        return true;
    }

}
```

这里用了 Java8 的函数式方法，并提供一个默认的 `after` 执行，如果重写 `after` 方法则在路由执行后调用。
这里 WebHook 的返回值决定了本次请求是否继续向下调用，为 `true` 则放过，返回 `false` 则中断请求。