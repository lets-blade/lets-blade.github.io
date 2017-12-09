---
title: Route register
categories: docs
comments: false
---

Routing is the core of the Blade. Routing is the smallest unit of Http request processing. We need to create a mapping between URL and route in the program.
There are 2 ways to register a route in Blade, let's explain in detail below.

## Routing rules

Routing rules in the Blade is not particularly complex, we pursue the simplicity and elegance, do not want to do more trouble.
So the routing rules are divided into several types:

1. Static route
2. Resource file route
3. Restful route

> **Static route** is the easiest to understand, that is, I wrote `/hello` then when I visit http://127.0.0.1:9000/hello it will match the route, the matching relationship is one to one.

> **Resource file route**: Blade built `static`,`upload` folder files are static resources, while supporting user-defined.
> So when you access a route such as `/static/a.css` it will match the static resource file.

> When we register a `/users/:uid` this routing rule when it is a `Restful` style URL, will match the corresponding routing implementation,
> Of course you can use multiple parameters.

## Blade register

```java
Blade.me().get("/", (req, res) -> res.text("Hello World"));
Blade.me().post("/", (req, res) -> res.text("Hello World"));
Blade.me().put("/", (req, res) -> res.text("Hello World"));
Blade.me().delete("/", (req, res) -> res.text("Hello World"));
```

This is the code you see when you first came to know Blade, which looks pretty straightforward,
But there are limitations, only very simple Web applications you will do.
Because the code is organized in a class, and in `main` Function inside,
So doomed to such a program must be very simple, such as the realization of a static site, file download server.

Let's take a look at the `Blade.get` method, which takes 2 parameters, the first one is route-matched `URL`,
The second parameter is used to process the request (the `RouteHandler` interface), because we use Java 8 so wording looks simpler.

## Controller register

Most of the time we will use the `class` to encapsulate some routing of the same functionality, which we will call the controller.
The Blade scans the routing in the controller when it starts up.

**1. Create Controller**

```java
@Path
public class IndexController {
    
}
```

Let's take a look at this `@Path` annotation, which has several commonly used configuration parameters.

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

As you can see from this, we registered a controller with namespace as `/` when using the `@Path` annotation, and the routing rules under that controller are concatenated with `/`.
You can use `suffix` To set the routing suffix, for example, sometimes we need all suffix `.html`. Another requirement is that my controller is doing `API` to others
Call, then we can set the `restful` option to `true`, so that all the routes in the controller will return `JSON` output.

**2. Create Route**

There are two kinds of ways to create a route in the controller. You can create a route that is related to a method and create a route.
There are several kinds of annotations to help you complete: `GetRoute`、`PostRoute`、`PutRoute`、`DeleteRoute`、`Route`.

```java
@GetRoute("/home")
public String home(){
    return "index.html";
}
```

Clever classmates have seen, I made it clear when using the route `HttpMethod + Route` this way easier, of course, you can also use the `@Route` to customize.

```java
@Route(value = "/home", method = HttpMethod.GET)
public String home(){
    return "index.html";
}
```

When you do not specify `method` it will receive any Http method request.

## parameter injection

In order to speed development, Blade made some tricks in the route, so you get the parameters faster.

**1. Get form parameter**

```java
@GetRoute("/home")
public String home(@Param String name){
    System.out.println("name: " + name);
    return "index.html";
}
```

**2. Get restful parameter**

```java
@GetRoute("/users/:uid")
public void users(@PathParam Integer uid){
    System.out.println("uid: " + uid);
}
```

**3. Get upload file**

```java
@PostRoute("/upload")
public void upload(@MultipartParam FileItem fileItem){
    byte[] data = fileItem.getData();
    // Save the temporary file to the specified path
    Files.write(Paths.get(filePath), data);
}
```

**4. Get header**

```java
@GetRoute("/header")
public void users(@HeaderParam String Referer){
    System.out.println("Referer: " + Referer);
}
```

**5. Get cookie**

```java
@GetRoute("/cookie")
public void users(@CookieParam String uid){
    System.out.println("uid: " + uid);
}
```

**6. Get body**

```java
@GetRoute("/bodyParam")
public void users(@BodyParam PayRequest payRequest){
    System.out.println("payRequest: " + JsonKit.toJson(payRequest));
}
```

**7. Get the model parameters**

There are several types of conventions for getting object parameters. By default you can write the `name` element of the` form` form in one-to-one correspondence with the class variables.
You can also use Blade's conventions to pass in, define a name for this pass, like `person`, then define the Form as `<input name = "person[age]" />`
This format can be. Here are 2 examples:

```java
@GetRoute("/savePerson")
public void users(@Param Person person){
    System.out.println("person: " + person);
}
```

The general form for this request is this:

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

The general form for this request is this:

```html
<form method="post">
    <input type="text" name="person[age]"/>
    <input type="text" name="person[name]"/>
</form>
```