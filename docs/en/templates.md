---
layout: doc
language: en
title: Template View
---

The template engine is suitable for dynamic `HTML` page output or code generation, which is common in web development.
Blade has a built-in simple template engine for web page rendering and simple data transfer. In daily development,
We usually use some excellent, efficient, and full-featured template engines such as Velocity, Freemarker, JetbrickTemplate, and more.
Blade supports the extension of any template engine, and there are multiple implementations. At [here](https://github.com/lets-blade/blade-template-engines), you are also welcome to contribute code.

## Default tempalte

The default template engine is very simple, less than the `400` line of code, and of course the functionality is limited. Let's try it. According to the convention, all template files are stored in the `templates` directory.

**create route**

```java
public static void main(String[] args){
    Blade.of()
        .get("/", ctx -> {
            ctx.attribute("name", "biezhi");
            ctx.render("index.html");
        })
        .start(Application.class, args);
}
```

**create template file**

`templates/index.html`: located under the classpath.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Hello Page</title>
</head>
<body>

  <h1>Hello, ${name}</h1>

</body>
</html>
```

## Jetbrick Template

The default template above is only for very simple HTML rendering. In most cases we need a powerful template engine for business development. Here Blade recommends using Jetbrick Template, which is similar to Velocity but more powerful than it is official. The document is [jetbrick-template](http://subchen.github.io/jetbrick-template/2x/overview.html).

**Add Jetbrick Template Dependencies**

With Jetbrick Template you don't have to introduce its own dependencies. Blade does a simple wrapper. Of course, you can also package it yourself. There is only one class file. The source code is here [here](https://github.com/lets-blade/blade-template-engines/blob/master/blade-template-jetbrick/src/main/java/com/blade/mvc/view/template/JetbrickTemplateEngine.java)。

```xml
<dependency>
    <groupId>com.bladejava</groupId>
    <artifactId>blade-template-jetbrick</artifactId>
    <version>0.1.3</version>
</dependency>
```

**Configuring the template engine**

After adding dependencies we need to make a configuration that tells Blade that it should use the Jetbrick template engine instead of the default one.

```java
@Bean
public class TemplateConfig implements BladeLoader {
    
    @Override
    public void load(Blade blade) {
        blade.templateEngine(new JetbrickTemplateEngine());
    }
    
}
```

The above code will run when the Blade starts, and you can load some other stuff here (such as some configuration information).

Write two routes:

```java
@GetRoute("/hello")
public String hello(){
    return "hello.html";
}

@GetRoute("/users")
public String users(Request request){
    request.attribute("users", users);
    return "users.html";
}
```

The following two template files are located in the `resources/templates` directory.

**`hello.html`**

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Hello Page</title>
</head>
<body>
    <h1>Hello Blade!</h1>
</body>
</html>
```

**`users.html`**

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Users Page</title>
</head>
<body>
  <ul>
    #for(item : users)
    <li>${item.uid} - ${item.username}</li>
    #end
  </ul>
</body>
</html>
```

To learn more about the use of this template, you can click on Jetbrick's official website to view the data in the Blade routing as long as it is stored in `attribute`.

## Self-expanding

Just implement the `TemplateEngine` interface and configure it at startup.

```java
void render(ModelAndView modelAndView, Writer writer) throws TemplateException;
```

This method provides two parameters, the first is the data and view position, and the second is the write IO object.