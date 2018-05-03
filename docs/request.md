---
layout: doc
language: cn
title: HTTP 请求
---

Blade 支持注解的方式或者使用 `Request` 对象获取请求信息。

## 表单参数

先看看 `Request` 提供的操作表单参数的API

- `Optional<String> query(String name)`
- `Optional<Integer> queryInt(String name)`
- `Optional<Long> queryLong(String name)`
- `Optional<Double> queryDouble(String name)`
- `String query(String name, String defaultValue)`
- `int queryInt(String name, int defaultValue)`
- `long queryLong(String name, long defaultValue)`
- `double queryDouble(String name, double defaultValue)`

这几组API非常的清晰明了，因为使用了 Java8，有一组里面用了 `Optional` 的写法，为了让大家拿不到值的时候进行判断或其他处理，其实和带 `defaultValue` 的API是差不多的，因为 `Optional` 提供一个 `orElse` 方法让你设置默认值。怎么用呢？其实只要API设计的到位大家十有八九都可以猜到怎么用的，我能告诉你的是这组 API 获取的是 `Form` 表单的参数。

```bash
curl \
  -X POST \
  http://localhost:9000/save \
  -d 'username=Jack'
```

```java
@PostRoute("/save")
public void formParams(@Param String username){

}
```

```java
@PostRoute("/save")
public void formParams(Request request){
    String username = request.query("username", "默认值");
}
```

- 获取 `Integer` 数据: `request.queryInt("xxx")`
- 获取 `Long` 数据: `request.queryLong("xxx")`
- 获取 `Double` 数据: `request.queryDouble("xxx")`

## JSON数据

```bash
curl \
  -X POST \
  http://localhost:9000/users \
  -H 'Content-Type: application/json' \
  -d '{"name":"biezhi","email":"biezhi.me@gmail.com"}'
```

```java
public class User {
    private String name;
    private String email;
    // getter setter 省略
}

@PostRoute("/users")
public void bodyParams(@BodyParam User user){
    
}
```

```java
@PostRoute("/users")
public void bodyParams(Request request){
    String bodyString = request.bodyToString();
}
```

## Restful 参数

我们经常也会用到 REST 接口，一般它的URL形如：http://www.exmaple.com/users/128

这时候我们在 Blade 中定义的路由 Path 是 `/users/:id`，如何获取这个 id 呢，下面的API可以帮到你

- `String pathString(String name)`
- `String pathInt(String name)`
- `String pathLong(String name)`

```java
Integer userId = request.pathInt("id");
```

这样就可以获取到 `userId`，其他变量的获取方式相应你闭着眼睛都可以猜到。

也可以使用注解的方式

```java
@GetRoute("/user/:uid")
public void user(@PathParam Integer uid){

}
```

## 数据绑定

Blade 支持将参数绑定到某个模型对象上，你可以像这样使用

```java
public class User {
    private String name;
    private String email;
    // getter setter 省略
}

@PostRoute("/users")
public void bodyParams(User user){
    
}
```

此时接收的表单参数或者 `Request Body` 的 `JSON` 参数会被自动映射为一个 `User` 对象。

## 自定义绑定

如果你想自定义的绑定数据，比如像 `ruby` 那样在 `input` 文本框中指定某类名称才被匹配，
可以像这样：

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <form>
        <input type="text" name="user[name]"/>
        <input type="text" name="user[age]"/>
    </form>
</body>
</html>
```

```java
@PostRoute("/save")
public void customBind(@Param("user") User user){

}
```

## 读取头信息

依然看API，虽然我一直在重复看 API，因为框架编写的 API 就是为了给用户提供便捷。

- `Map<String, String> headers()`
- `String header(String name)`
- `String header(String name, String defaultValue)`
- `boolean isIE()`
- `boolean isAjax()`
- `String contentType()`
- `String userAgent()`

上面的 API 除了给出获取 `header` 的方法，也提供了常用的几个附件方法，用于获取是否是IE浏览器、是否是Ajax请求、ContentType 以及 UserAgent。

## 读取 Cookie

- `Map<String, String> cookies()`
- `Optional<Cookie> cookieRaw(String name)`
- `String cookie(String name, String defaultValue)`

这里的几个方法介绍一下，第一个是获取所有的 Cookie，map 的 key 是 cookie名，value 是 cookie值；第二个方法根据名称获取 cookie，这里可以获取到 cookie 的详细信息，包括 path、有效期等；最后一个方法根据名称获取 cookie，获取不到则设置一个默认值。

## 设置数据

很多时候我们都会用模板引擎，即便你没用过至少也知道JSP，我们会在 Request 作用域中设置一些数据，然后在模板中获取。在 Blade 中也是如此，API也很简单。

- `attribute(String name, Object value)`
- `T attribute(String name)`

这里第一个方法是像 Request 域设置一个数据，第二个方法从 Request 域获取一个数据，至于这里设置的数据在前端如何使用取决于你的模板引擎是哪个，根据其语法而来，比如默认的模板引擎非常简单，我们举个例子：

```java
request.attribute("name", "blade2.0");
```

在我们的模板中(存储在 `/resources/templates` 之下的视图文件)

```html
<h1>这是 ${name}</h1>
```

## 操作 Session

- `request.session()`

```java
Session session = request.session();
// 写入 session
session.attribute("LOGIN_USER", user);

// 读取 session
String hello = session.attribute("hello");
```
