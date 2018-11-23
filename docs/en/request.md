---
layout: doc
language: en
title: HTTP Request
---

The Blade supports annotations or uses the `Request` object to get the request information.
 
## Form parameters

First look at the API for the action form parameters provided by `Request`

- `Optional<String> query(String name)`
- `Optional<Integer> queryInt(String name)`
- `Optional<Long> queryLong(String name)`
- `Optional<Double> queryDouble(String name)`
- `String query(String name, String defaultValue)`
- `int queryInt(String name, int defaultValue)`
- `long queryLong(String name, long defaultValue)`
- `double queryDouble(String name, double defaultValue)`

These sets of APIs are very clear and clear. Because Java8 is used, there is a set of `Optional` written in it. In order to make judgments or other processing when you can't get the value, it is similar to the API with `defaultValue`. Because `Optional` provides an `orElse` method that lets you set default values. How to use it? In fact, as long as the API design is in place, you can guess how to use it. What I can tell you is that this set of APIs gets the parameters of the `Form` form.

```shell
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
    String username = request.query("username", "default value");
}
```

- Get `Integer` data: `request.queryInt("xxx")`
- Get `Long` data: `request.queryLong("xxx")`
- Get `Double` data: `request.queryDouble("xxx")`

## JSON data

```shell
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

## Path parameter

We also often use the REST interface, generally its URL is like: http://www.exmaple.com/users/128

At this time, the route Path we defined in Blade is `/users/:id`. How to get this id? The following API can help you.

- `String pathString(String name)`
- `String pathInt(String name)`
- `String pathLong(String name)`

```java
Integer userId = request.pathInt("id");
```

This way you can get `userId`, and other variables can be obtained by closing your eyes.

You can also use annotations

```java
@GetRoute("/user/:uid")
public void user(@PathParam Integer uid){

}
```

## Parameter binding
 
Blade supports binding parameters to a model object, you can use it like this

```java
public class User {
    private String name;
    private String email;
    // getter setter omit
}

@PostRoute("/users")
public void bodyParams(User user){
    
}
```

The form parameters received at this time or the `JSON` parameter of `Request Body` will be automatically mapped to a `User` object.

## Custom binding

If you want to customize the binding data, such as `ruby`, specify a class name in the `input` text box to be matched,
Can be like this:

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

## Read header

Still looking at the API, although I have been repeating the API, because the API written by the framework is to provide convenience to users.

- `Map<String, String> headers()`
- `String header(String name)`
- `String header(String name, String defaultValue)`
- `boolean isIE()`
- `boolean isAjax()`
- `String contentType()`
- `String userAgent()`

In addition to the method of getting `header`, the API above also provides several commonly used attachment methods for getting IE browser, Ajax request, ContentType and UserAgent.

## Read Cookie

- `Map<String, String> cookies()`
- `Optional<Cookie> cookieRaw(String name)`
- `String cookie(String name, String defaultValue)`

Here are a few methods to introduce, the first is to get all the cookies, the map key is the cookie name, the value is the cookie value; the second method gets the cookie according to the name, here you can get the details of the cookie, including path, Validity period, etc.; the last method gets the cookie by name, and if it doesn't, it sets a default value.

## Setting data

Many times we will use the template engine, even if you have not used at least know JSP, we will set some data in the Request scope, and then get it in the template. The same is true in Blade, and the API is simple.

- `attribute(String name, Object value)`
- `T attribute(String name)`

The first method here is to set a data like the Request field, the second method to get a data from the Request field, as to how the data set here is used in the front end depends on which template engine you use, according to its syntax, such as the default The template engine is very simple, let's take an example:

```java
request.attribute("name", "blade2.0");
```

In template (view files stored under `/resources/templates`)

```html
<h1>This is ${name}</h1>
```

## Session

- `request.session()`

```java
Session session = request.session();
// write to session
session.attribute("LOGIN_USER", user);

// read from session
String hello = session.attribute("hello");
```
