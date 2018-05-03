---
layout: doc
language: cn
title: 创建路由
---

Blade 中注册路由有 2 种方式，一种是使用 `Blade` 对象硬编码注册，另一种是通过控制器来管理多个路由。
在前面的 `main` 函数中我们使用第一种方式注册了一个路由。
上面的写法看起来是很简洁的，也用到java8的语法，但是一般我们编写一个站点的时候会有很多的路由，都放在一个文件中不是很好管理，这时候 `Blade` 支持你沿用 `SpringMvc` 的编程习惯，我们可以编写一个控制器，在你的 `Application` 所在目录之下，我们最好将它放在 `controller` 包中，看到名字也就知道是控制器了。

我们多创建几个路由，通过类管理的方式，首先创建一个 `IndexController.java`

```java
@Path
public class IndexController {

    @GetRoute("/")
    public String index(){
        return "index.html";
    }

    @PostRoute("/save")
    public void saveUser(@Param String username){
        System.out.println("username:" + username);
    }

    @PutRoute("/update")
    public void updateUser(@Param String username){
        System.out.println("username:" + username);
    }

    @DeleteRoute("/delete/:uid")
    public void updateUser(@PathParam Integer uid){
        System.out.println("delete user:" + uid);
    }

}
```

上面的代码中注册了 4 个路由，分别讲一下，在路由中包含这么几个东西：

- 访问路径
- 请求方法
- 具体执行的方法体

所谓访问路径就是我们前面使用 Blade 对象进行路由配置的第一个参数，Blade 提供了四种请求方式：`GET`, `POST`,`PUT`, `DELETE`。

使用 Blade 对象注册的时候有2个参数，第一个是路由的访问路径，后面的参数是一个 `@FunctionalInterface`，接口有 2 个参数，分别是 `Request` 和 `Response` 对象，具体的操作可以在核心概念章节中看到，比 `ServletAPI` 提供的更加方便和简单，例子中我们只输出了文本内容。

在启动的时候你可以通过观察控制台日志输出看到路由的注册情况。

