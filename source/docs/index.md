---
title: Introduction
categories: docs
comments: false
---

The Blade, a name that came up unintentionally, began in September 2015 with the aim of providing a choice for individual developers to remove the Spring series framework.

Learning a Blade builds a Web application that takes just one hour, and if you're a veteran of Web development, maybe `20` minutes is enough.

## What is a Blade?

1. An efficient MVC development framework
2. The embedded WebServer
3. Help developers build Web applications quickly
4. Source code less than `500KB` of source code framework
5. Simple and elegant `API`
6. Good code abstraction and thinking collide
7. What do you think is

> In general, the Blade is an open source framework that helps you quickly build a Web application. It has a clean code and elegant style, and the API works well.
> If you're willing to read the code, it won't take you long.

So the question is, **what is not Blade** ?

1. Not the product of the J2EE system (not following the Servlet specification)
2. It's not a family bucket (it's responsible for the perimeter of the Web, but more extensions need to be implemented on their own)

## Design concept

Blade's design references the Web framework of many languages, the [Express](http://expressjs.com/) of Node, 
Python [Flask](http://flask.pocoo.org/), 
Golang [Martini](https://github.com/go-macaron/macaron).

Blade is a philosophy of design that is **small and beautiful**, **which is superior to configuration**, **low coupling**, **reusable and productivity**.

**Convention over configuration**

The Blade's various configuration options have a sensible default value in the initial condition and follow some conventions.

For example, by convention, templates and static files are stored in the `templates` and `static` directories under the `ClassPath`, respectively.

Although this configuration can be modified, you usually don't have to, especially at the beginning.

## Architecture diagram

<center>
    <img src="/images/architecture.png" width="400"/>
</center>

## The life cycle

1. Receive requests from client
2. Execute middleware (if any)
3. Execute WebHook (if any)
4. Execute route logic
5. Send a response to the client
6. Remove the current thread Request, Response

## Principle of the framework

This framework is very simple and allows you to maintain good code style. To use the Blade completion function, you need to know several concepts.

When developing Blade programs, your responsibility as a developer is to write code that caters to user requests (e.g. http://localhost: 9000). The resources corresponding to the request are displayed. (home page)

The code executed by the user request is defined in the **controller class** method. These methods are called **routes** (you can also understand RequestMapping in SpringMvc), the class is called controller (controller, which is usually marked with the `@path` annotation).
The mapping between user requests and code is associated with annotations like `@GetRoute`.
The content displayed by the browser is typically exported through `templates` (templates).

In the following sections, you will learn the details of the internal workflow in Blade controller, routing, and template.

**Controller and Route**

```java
@Path
public class IndexController {
    
    @GetRoute("/")
    public String index(){
        return "index.html";
    }

}
```

In a Blade application, the Controller is usually a Java class that contains the `Controller` word in the name.

The method in the controller, called routing, is usually associated with a URL in the program,
in this example, the `Index` controller has only one route named `/`, and its corresponding method is `index`.

The code in the routing is usually very short, only 10-15 lines, because they are just other parts of the calling program, to generate the required information, and to render the template, display the results to the user.

In this example, only one line is written, rendering `index.html`, and the program will look for this template file in the `templates` directory.

**Route**

Blade route takes each request to the corresponding method for execution, which is achieved by matching the configured routing path in the program to the URL in the request.

**Template**

The Blade has a simple Html template built in, but it's not usually enough to handle flexible Web development, and I typically use the [jetbrick-template](https://github.com/subchen/jetbrick-template-2x) engine as support. Of course you can extend other template engines you like.

We used the `return "index.html"` to tell the program to find the `templates/index.html` template file, you can also render using the render method of the Response object.
