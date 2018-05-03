---
layout: doc
language: cn
title: HTTP 响应
---

Blade 中操作响应的对象是 `Response`

## 发送文本

`Response#text` 用于发送一个状态码为 200 的文本响应

```java
public void responseText(Response response){
    response.text("Hello World");
}
```

## 发送HTML

`Response#html` 用于发送一个状态码为 200 的HTML响应

```java
public void responseHTML(Response response){
    response.html("<h1>Hello World</h1>");
}
```

## 发送XML

`Response#xml` 用于发送一个状态码为 200 的XML响应，只是修改了响应 `ContentType`

```java
public void responseXML(Response response){
    response.xml("<Msg>OK!</Msg>");
}
```

## 发送JSON

`Response#json` 用于发送一个状态码为 200 的JSON响应。

```java
public void responseJSON(Response response){
    response.json("{\"status\": 200}");
}

public void responseJSON(Response response){
    User user = new User("biezhi", "biezhi.me@gmail.com");
    response.json(user);
}
```

## 发送文件

```java
public void responseFile(Response response){
    response.download("a.txt", "/data/wwwroot/hello.txt");
}
```

## 渲染模板

```java
public void renderUsers(Response response){
    response.render("admin/users.html");
}
```

## 写入Cookie

Cookie 是我们web开发中常用的一个技术，通常用于 `记住我` 等操作。在 Blade 中向浏览器写入 Cookie 也是使用 Response 对象完成的。

```java
response.cookie("c1", "value1");
```

这样就向当前域下写入了一个永不过期的 Cookie 数据，名称为 c1 数据为 value1。可以打开浏览器的开发者工具看到。

当然上面的写法是写最简单的 Cookie，但很多时候我们需要定制化，这时候可以看看 Response 对象里 Cookie 相关的API了。

- `Response removeCookie(String name)`
- `Response cookie(Cookie cookie)`
- `Response cookie(String name, String value)`
- `Response cookie(String name, String value, int maxAge)`
- `Response cookie(String name, String value, int maxAge, boolean secured)`
- `Response cookie(String path, String name, String value, int maxAge, boolean secured)`

还挺多的吗，一个比一个长。。是的，看到这些API大概都清楚怎么使用了。
第一个是移除一个 Cookie 的，后面都是写入一个 Cookie 的方法。具体解释都可以在源码注释中看到。

## 重定向

有时候我们会希望做完某个操作后重定向到另一个页面，在HTTP中其实就是 302 状态码干的。比如登录后后台直接跳转到登录成功的页面。

```java
@PostRoute("login")
public void doLogin(Response response) {
    response.redirect("/index");
}
```

也可以重定向到外部站点

```java
@GetRoute("github")
public void showGithub(Response response) {
    response.redirect("https://github.com/biezhi");
}
```

## 其他操作

在 Response 中还有一些其他不常用的操作，我们来看看它的 API

- `Response status(int status)`
- `Response notFound()`
- `Response contentType(String contentType)`
- `Map<String, String> headers()`
- `Response header(String name, String value)`
- `Map<String, String> cookies()`
- `void body(@NonNull byte[] data)`

更多的信息可以在 `Response` 接口中查看。