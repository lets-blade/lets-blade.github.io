---
layout: doc
language: en
title: Create Route
---

There are two ways to register routes in a Blade. One is to use hard-coded registration with the `Blade` object, and the other is to manage multiple routes through the controller.
In the previous `main` function we used the first way to register a route.
The above method seems to be very concise, also uses the syntax of java8, but in general we have a lot of routes when writing a site, are not well managed in a file, this time `Blade` supports you to use `SpringMvc` programming habits, we can write a controller, in the directory of your `Application`, we better put it in the `controller` package, see the name will know the controller.

We create a few more routes, first create a `IndexController.java` through class management.

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

Four routes are registered in the above code, let's talk about it, including several things in the route:

- Access path
- Request method
- Specific method body

The so-called access path is the first parameter we used to route the configuration using the Blade object. The Blade provides four request methods: `GET`, `POST`, `PUT`, `DELETE`.

When using the Blade object to register, there are 2 parameters. The first one is the access path of the route. The latter parameter is a `@FunctionalInterface`. The interface has 2 parameters, which are `Request` and `Response` objects. The specific operation Can be seen in the core concept chapter, more convenient and simpler than the `ServletAPI`, in the example we only output the text content.

At startup you can see the registration of the route by observing the console log output.
