---
layout: doc
language: en
title: Blade Design
---

## Design concept

The design of the Blade is based on the web framework of many languages, Node [Express] (http://expressjs.com/),
Python [Flask] (http://flask.pocoo.org/),
Golang [Martini] (https://github.com/go-macaron/macaron).

Blade adheres to the design philosophy of **small and beautiful **, ** conventions better than configuration**, **lowly coupled, reusable**, **improved productivity**.

**Convention is better than configuration**

Blade's wide range of configuration options have a sensible default value in the initial situation and follow some conventions.
For example, by convention, templates and static files are stored in the `templates` and `static` directories under `ClassPath`, respectively.
Although this configuration can be modified, you usually don't have to do this, especially at the beginning.

## Architecture diagram

<center>
    <img src="/static/images/architecture.png" width="400"/>
</center>

## The life cycle

1. Receive customer requests
2. Execute middleware (if any)
3. Execute WebHook (if any)
4. Execute the routing method
5. Send a response to the client
6. Remove the current thread Request, Response

## Framework principle

This framework is very simple and allows you to maintain a good code style. In order to use the Blade to complete the function, you need to understand a few concepts.

When developing a Blade program, your responsibility as a developer is to write code that caters to user requests (eg http://localhost:9000 ).
The resources corresponding to the request are displayed. (Home page)

The code that the user requests to execute is defined in the method of the **Controller class**. These methods are called **route** (you can also understand the RequestMapping in SpringMvc),
The class is called the controller (the controller will generally use the `@Path` annotation).
The mapping between user requests and code uses annotation associations like `@GetRoute`.
The content displayed by the browser is generally output through `templates`.

In the following sections you will learn the details of the internal workflow in the Blade Controller, Routing, and Templates.

**Controller And Route**

```java
@Path
public class IndexController {
    
    @GetRoute("/")
    public String index(){
        return "index.html";
    }

}
```

In the Blade program, the controller is usually a Java class with the name `Controller` in its name.

The methods in the controller, called Routes, are usually associated with a URL in the program.
In this example, the `Index` controller has only one route named `/`, and its corresponding method is `index`.

The code in the route is usually very short, only 10-15 lines, because they just call the rest of the program,
To generate the required information, and to be responsible for rendering the template and displaying the results to the user.

In this case, only one line is written, and `index.html` will be rendered. The program will look for this template file in the `templates` directory.

**Route**

The Blade route passes each request to the corresponding method for execution, which is achieved by matching the configured routing path in the program with the URL in the request.

**Template**

The Blade has a built-in simple Html template, but it's generally not enough for flexible web development. I generally use [jetbrick-template] (https://github.com/subchen/jetbrick-template-2x) as a template engine.
Of course you can extend other template engines you like.

We used `return "index.html"` to tell the program to look for the `templates/index.html` template file.
You can also render using the `render` method of the `Response` object.
