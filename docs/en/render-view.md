---
layout: doc
language: en
title: Render
---

Inside the Blade is a very simple template rendering engine built in. If you have some simple pages that need to be rendered, try it (production environment is not applicable).
There is a rule to follow when rendering a template:

- All template files are stored in the `resources/templates` directory

You can call the `render` method of the `Response` method to render or return a view path of type `String`.

```java
@GetRoute("/index")
public void renderIndex(Response response){
    response.render("index.html");
}

@GetRoute("/index2")
public String renderIndex(Response response){
    return "index.html";
}
```