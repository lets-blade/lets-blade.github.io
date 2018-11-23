---
layout: doc
language: en
title: Route
---

Routing is the core of Blade. Routing is the smallest unit of Http request processing. We need to create a mapping between URL and route in the program.
There are 2 ways to register a route in Blade, which we will explain in detail below.

## Route rule

The routing rules in Blade are not particularly complicated, we pursue simplicity and elegance, and do not want to make things more troublesome.
So routing rules are divided into several categories:

1. Static route
2. Resource file routing
3. Restful routing

> **Static routing** is the easiest to understand, that is, I wrote `/hello` so when I visit http://127.0.0.1:9000/hello It will match the route, and the matching relationship is one-to-one.
 
> **Resource file routing**: The built-in files in the `static` and `upload` folders of the Blade are all static resources and support user customization.
> So when you access a route such as `/static/a.css` it will match the static resource file.

> When we register a routing rule like `/users/:uid`, it is a `Restful` style URL that matches the corresponding routing implementation. Of course you can use multiple parameters.

## Blade registration

```java
Blade.of().get("/", ctx -> ctx.text("Hello World"));
Blade.of().post("/", ctx -> ctx.text("Hello World"));
Blade.of().put("/", ctx -> ctx.text("Hello World"));
Blade.of().delete("/", ctx -> ctx.text("Hello World"));
```

This is a piece of code that you see when you first know Blade. It looks very simple.
But there are limitations, and you only do this with very simple web applications.
Because the organization of the code is in a class, and inside the `main` function,
So destined to such a program must be very simple, such as implementing a static site, file download server.

Let's take a look at the `Blade.get` method, which takes 2 arguments, the first one is the route matching `URL`,
The second parameter is used to process the request (`RouteHandler` interface), because we use Java8 so the writing looks simple.

## Controller registration

Most of the time we will use `class` to encapsulate some routes of the same function, we call it the controller.
The Blade scans the routes in the controller at startup.

**1. create controller**

```java
@Path
public class IndexController {
    
}
```

Let's take a look at this `@Path` annotation, which has several common configuration parameters.

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

It can be seen from this that when we use the `@Path` annotation, we register a controller with `namespace` of `/`, and the routing rules under this controller will be spliced with `/`.
You can use `suffix` to set the suffix of the route. For example, sometimes we need all suffixes to be `.html`. Another requirement is that my controller is doing `API` to others.
Called, then we can set the `restful` option to `true` so that all routes in the controller will return `JSON` output.

**2. create route**

There are two ways to create routes in the controller, directly creating method-related routes and custom creation.
There are several kinds of annotations for you to complete: `GetRoute`, `PostRoute`, `PutRoute`, `DeleteRoute`, `Route`

```java
@GetRoute("/home")
public String home(){
    return "index.html";
}
```

Clever classmates have already seen that I have made it clear that using `HttpMethod+Route` is a simple way to route, of course, you can also use `@Route` to customize.

```java
@Route(value = "/home", method = HttpMethod.GET)
public String home(){
    return "index.html";
}
```

When you don't specify `method` it will receive requests for any Http method.

## Parameter injection

To speed development, Blade does some on the route, allowing you to get parameters faster.

**1. Get the Form parameters**

```java
@GetRoute("/home")
public String home(@Param String name){
    System.out.println("name: " + name);
    return "index.html";
}
```

**2. Get the Path parameters**

```java
@GetRoute("/users/:uid")
public void users(@PathParam Integer uid){
    System.out.println("uid: " + uid);
}
```

**3. Get the Upload parameters**

```java
@PostRoute("/upload")
public void upload(@MultipartParam FileItem fileItem){
    byte[] data = fileItem.getData();
    // Save the temporary file to the specified path
    Files.write(Paths.get(filePath), data);
}
```

**4. Get Header parameters**

```java
@GetRoute("/header")
public void users(@HeaderParam String Referer){
    System.out.println("Referer: " + Referer);
}
```

**5. Get Cookie parameters**

```java
@GetRoute("/cookie")
public void users(@CookieParam String uid){
    System.out.println("uid: " + uid);
}
```

**6. Get Request Body**

```java
@GetRoute("/bodyParam")
public void users(@BodyParam PayRequest payRequest){
    System.out.println("payRequest: " + JsonKit.toJson(payRequest));
}
```

**7. Bind parameters with Object**

There are several conventions for getting object parameters. By default, you can write the element `name` of the `form` form as a one-to-one correspondence with the class variable.
You can also use the convention's convention to pass, and define a name for this pass, like `person`, then the form is defined as `<input name="person[age]"/>`
This format is fine. Here are 2 examples:

```java
@GetRoute("/savePerson")
public void users(@Param Person person){
    System.out.println("person: " + person);
}
```

The form in this request is like this:

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

The form in this request is like this:

```html
<form method="post">
    <input type="text" name="person[age]"/>
    <input type="text" name="person[name]"/>
</form>
```