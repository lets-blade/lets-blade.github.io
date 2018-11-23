---
layout: doc
language: en
title: HTTP Response
---

The object of the operation response in Blade is `Response`

## Send text

`Response#text` is used to send a text response with a status code of 200.

```java
public void responseText(Response response){
    response.text("Hello World");
}
```

## Send HTML

`Response#html` is used to send a html response with a status code of 200.

```java
public void responseHTML(Response response){
    response.html("<h1>Hello World</h1>");
}
```

## Send XML

`Response#xml` is used to send a xml response with a status code of 200, just modified the response `ContentType`.

```java
public void responseXML(Response response){
    response.xml("<Msg>OK!</Msg>");
}
```

## Send JSON

`Response#json` is used to send a json response with a status code of 200.

```java
public void responseJSON(Response response){
    response.json("{\"status\": 200}");
}

public void responseJSON(Response response){
    User user = new User("biezhi", "biezhi.me@gmail.com");
    response.json(user);
}
```

## Download File

```java
public void responseFile(Response response){
    response.download("a.txt", "/data/wwwroot/hello.txt");
}
```

## Render template

```java
public void renderUsers(Response response){
    response.render("admin/users.html");
}
```

## Write Cookie

Cookies are a common technique used in our web development and are often used for operations such as `remember me` Writing a cookie to a browser in a Blade is also done using the Response object.

```java
response.cookie("c1", "value1");
```

This writes a cookie data that never expires under the current domain, with the name c1 data as value1. You can see it by opening the browser's developer tools.

Of course, the above is to write the simplest cookie, but many times we need to customize, this time you can look at the cookie related API in the Response object.

- `Response removeCookie(String name)`
- `Response cookie(Cookie cookie)`
- `Response cookie(String name, String value)`
- `Response cookie(String name, String value, int maxAge)`
- `Response cookie(String name, String value, int maxAge, boolean secured)`
- `Response cookie(String path, String name, String value, int maxAge, boolean secured)`

Quite a lot, one is longer than one. . Yes, seeing these APIs is probably clear how to use them.
The first is to remove a cookie, followed by a method of writing a cookie. Specific explanations can be seen in the source comments.

## Redirect

Sometimes we will want to redirect to another page after doing an operation. In HTTP, the 302 status code is actually dry. For example, after logging in, the background directly jumps to the page where the login is successful.

```java
@PostRoute("login")
public void doLogin(Response response) {
    response.redirect("/index");
}
```

Can also be redirected to an external site

```java
@GetRoute("github")
public void showGithub(Response response) {
    response.redirect("https://github.com/biezhi");
}
```

## Other

There are some other less common operations in Response, let's take a look at its API.

- `Response status(int status)`
- `Response notFound()`
- `Response contentType(String contentType)`
- `Map<String, String> headers()`
- `Response header(String name, String value)`
- `Map<String, String> cookies()`
- `void body(@NonNull byte[] data)`

More information can be viewed in the `Response` interface.