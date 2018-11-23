---
layout: doc
language: cn
title: 组件托管
---

Blade 中认为组件就是一种类型的 `Bean` 或者叫对象，框架内置了简单的 `IOC` 容器来帮你将他们托管起来。
这样用户在使用的时候就可以达到对象复用，不必无限的使用 `new` 关键词带来内存泄漏。那么我们在使用组件的
时候就要干2件事：1、创建一个组件 2、让 Blade 托管该组件

## 核心特征

常驻内存，我们的组件被框架托管后实际上以单例的方式存储在缓存池中，用的时候取出来就可以了。 

## 组件类型

为了使用者更简单方面，在 Blade 中内置了这么几种组件类型，`BladeLoader`、`WebHook`、控制器。
那么我们来一起看看这几个分别都来干什么的？

**BladeLoader**

在一个 Web 开发中我们经常会使用到项目启动的时候加载一些 **配置** 或者干一些其他的事情，
在Blade中设计了一个接口 `BladeLoader`，你只需要创建一个自己的类实现这个接口即可完成初始化加载的动作。
比如我要在项目启动的时候设置模板引擎：

```java
@Order(1)
@Bean
public class TemplateConfig implements BladeLoader {
    
    @Override
    public void load(Blade blade) {
        JetbrickTemplateEngine templateEngine = new JetbrickTemplateEngine();
        blade.templateEngine(templateEngine);
    }

}
```

那么这样的几行代码就帮助我们实现这样的功能，我们可以注意到这里实现了 `processor` 方法，
并且在该组件上面有 2 个注解，我们使用 `@Bean` 注解告诉框架这是一个组件，你将它帮我托管在
IOC 容器里吧。但是我有多个组件，我希望他们是按顺序执行的，所以又添加了一个 `@Order` 注解，
同时指定了这个组件的顺序是 `1`，那么框架在启动的时候会按照顺序执行所有组件的 `processor` 方法。

**WebHook**

`WebHook` 是Blade中拦截一个路由的前、后可以做一些自定义的动作的接口，用户可以使用该接口完成一些登录拦截、日志记录、权限验证等操作。
在这个接口中有2个方法 `before` 和 `after`，并且 `after` 方法是一个 **默认方法** （这个概念在Java8中出现的），因为我们
发现绝大部分情况下使用不到 `after` 方法，那么使用者在实现该接口的时候只需要实现 `before` 即可。
下面我们写一个简单的例子可以体验一下：

```java
@Bean
public class MyHook implements WebHook {
    
    @Override
    public boolean before(Signature signature) {
        Request request = signature.request();
        String  uri     = request.uri();
        log.info("{}\t{}", request.method(), uri);
        return true;
    }

}
```

这里只是简单的记录了一下日志，我们可以看到一个 `WebHook`（钩子）方法中有一个 `Signature`。我们在这个类中打包了当前路由的上下文参数，
这些上下文参数包括: `Request`、`Response`、`Action` 以便于用户使用。

**控制器**

在 Blade 中标识一个类是控制器类非常简单，只需要在该类上面添加一个 `@Path` 注解即可，为了不使该类的配置过于复杂我们允许用户在该类上不出现 `@Bean`
 注解，其实是框架帮你做了。这样的好处是，使用 `@Path` 可以配置这个控制器的一些特性，比如 `namespace`、`restful` 参数等。
 
```java
@Path
public class IndexController {
    
}
```

这样这个 `IndexController` 就被 Blade 认为是一个控制器，在启动的时候将它托管起来，当你访问某个路由的时候会找到这个对象，得到复用。
 
**自定义组件**

很多时候我们有一些自己的业务，我们需要自定义实现一些 `Service` 这样的服务。在 Blade 中将概念简化了，认为一切组件都是一个 `Bean`。
那么我可以这样创建一个组件：

```java
@Bean
public class UserService {
    
    public String sayHi(){
        return "Hi blade";    
    }
    
}
```

当我想要在控制器中使用这个组件的时候也非常简单：

```java
@Path
public class IndexController {
    
    @Inject
    private UserService userService;
    
    @GetRoute("/sayhi")
    public void sayHi(){
        userService.sayHi();
    }
    
}
```

使用 `@Inject` 注解注入一个我们定义好的组件，当然组件和组件的调用也是如此。

## 内置组件

为了让开发者花更少的时候在开发核心业务上面，Blade 内置了一些 **组件** 供你使用。

1. `DefaultExceptionHandler`：异常处理器，你如果有自定义的异常处理可以继承它。
2. `BasicAuthMiddleware`：Basic认证，如果用的到的话可以直接使用。
3. `CsrfMiddleware`：帮助你验证 `CSRF Token`
