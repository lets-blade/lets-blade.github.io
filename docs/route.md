---
layout: doc
language: cn
title: 路由注册
---

路由是 Blade 中的核心，路由是一个 Http 请求处理的最小的最小单元，我们需要在程序中创建好 URL 和路由的映射关系。
在Blade中注册一个路由有2种方式，在下面我们详细讲解。

## 路由规则

在 Blade 的路由规则不是特别复杂，我们追求简洁与优雅，不希望把事情做的更麻烦。
所以路由规则分为这么几种：

1. 静态路由
2. 资源文件路由
3. Restful路由

> **静态路由**是最容易理解的，也就是我写了 `/hello` 那么当我访问 http://127.0.0.1:9000/hello
 就会匹配到该路由，匹配关系是一一对应的。
 
> **资源文件路由**：Blade 内置了 `static`、`upload` 文件夹下的文件都是静态资源，同时支持用户自定义。
> 所以当你访问诸如 `/static/a.css` 这样的路由就会匹配到静态资源文件。

> 当我们注册一个 `/users/:uid` 这样的路由规则的时候它是一个 `Restful` 风格的URL，会匹配到相应的路由实现，
> 当然你可以使用多个参数。

## Blade 注册

```java
Blade.of().get("/", ctx -> ctx.text("Hello World"));
Blade.of().post("/", ctx -> ctx.text("Hello World"));
Blade.of().put("/", ctx -> ctx.text("Hello World"));
Blade.of().delete("/", ctx -> ctx.text("Hello World"));
```

你在刚认识 Blade 的时候这是你见到的一段代码，这看起来非常简单，
但是是有局限性的，只有非常简单的 Web 应用你才会这么做。
因为代码的组织构成都在一个类中，并且在 `main` 函数内部，
所以注定这样的一个程序必然是非常简单的，比如实现一个静态站点、文件下载服务器等。

我们来看看 `Blade.get` 这个方法，它接收2个参数，第一个是路由匹配的 `URL`，
第二个参数用于处理请求（`RouteHandler`接口），因为我们使用Java8所以写法看起来比较简洁。

## 控制器注册

大部分时候我们会使用 `类` 来封装一些相同功能的路由，我们将它称之为控制器。
Blade 在启动的时候会扫描控制器中的路由。

**1. 创建控制器**

```java
@Path
public class IndexController {
    
}
```

我们来看看这个 `@Path` 注解，它有几个常用的配置参数

```java
public @interface Path {
    
    /**
     * @return namespace
     */
    String value() default "/";

    /**
     * @return route suffix
     */
    String suffix() default "";

    /**
     * @return is restful api
     */
    boolean restful() default false;

    /**
     * @return path description
     */
    String description() default "";
}
```

从这里可以看出，我们使用 `@Path` 注解的时候注册了一个 `namespace` 为 `/` 的控制器，在该控制器下的路由规则都会和 `/` 进行拼接。
你可以使用 `suffix` 来设置路由的后缀，比如有时候我们需要所有后缀都是 `.html`。还有一种需求就是我这个控制器是做 `API` 给别人
调用的，那么我们可以设置 `restful` 选项为 `true`，这样控制器中的所有路由都会返回 `JSON` 输出了。

**2. 创建路由**

在控制器中创建路由的方式分 2 种，直接创建方法相关的路由、自定义创建。
共有这么几种注解帮你完成：`GetRoute`、`PostRoute`、`PutRoute`、`DeleteRoute`、`Route`

```java
@GetRoute("/home")
public String home(){
    return "index.html";
}
```

聪明的同学已经看出来，我明确了路由的时候使用 `HttpMethod+Route` 这种方式更简便，当然也可以使用 `@Route` 进行自定义

```java
@Route(value = "/home", method = HttpMethod.GET)
public String home(){
    return "index.html";
}
```

当你不指定 `method` 的时候它将接收任意Http方法的请求。

## 参数注入

为了加速开发，Blade 在路由上做了一些 **手脚**，让你更快的获取参数。

**1. 获取Form表单参数**

```java
@GetRoute("/home")
public String home(@Param String name){
    System.out.println("name: " + name);
    return "index.html";
}
```

**2. 获取Restful参数**

```java
@GetRoute("/users/:uid")
public void users(@PathParam Integer uid){
    System.out.println("uid: " + uid);
}
```

**3. 获取上传文件参数**

```java
@PostRoute("/upload")
public void upload(@MultipartParam FileItem fileItem){
    byte[] data = fileItem.getData();
    // Save the temporary file to the specified path
    Files.write(Paths.get(filePath), data);
}
```

**4. 获取Header参数**

```java
@GetRoute("/header")
public void users(@HeaderParam String Referer){
    System.out.println("Referer: " + Referer);
}
```

**5. 获取Cookie参数**

```java
@GetRoute("/cookie")
public void users(@CookieParam String uid){
    System.out.println("uid: " + uid);
}
```

**6. 获取Body参数**

```java
@GetRoute("/bodyParam")
public void users(@BodyParam PayRequest payRequest){
    System.out.println("payRequest: " + JsonKit.toJson(payRequest));
}
```

**7. 获取对象参数**

获取对象参数有几种约定，默认情况你可以将 `form` 表单的元素 `name` 写成和类变量一一对应这个就可以了。
你也可以使用 Blade 的约定来传递，给本次传参定义一个名字，像 `person`，那么Form表单中定义为 `<input name="person[age]"/>` 
这样的格式即可。下面是2个例子：

```java
@GetRoute("/savePerson")
public void users(@Param Person person){
    System.out.println("person: " + person);
}
```

这个请求中一般 Form 表单是这样的：

```html
<form method="post">
    <input type="text" name="age"/>
    <input type="text" name="name"/>
</form>
```

---


```java
@GetRoute("/savePerson")
public void users(@Param(name="person") Person person){
    System.out.println("person: " + person);
}
```

这个请求中一般 Form 表单是这样的：

```html
<form method="post">
    <input type="text" name="person[age]"/>
    <input type="text" name="person[name]"/>
</form>
```