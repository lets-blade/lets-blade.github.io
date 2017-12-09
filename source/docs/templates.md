---
title: Template Engine
categories: docs
comments: false
---

Template engine suitable for dynamic `HTML` page output or code generation, is common in web development **equipment**.
Blade built a simple template engine, in order to cope with the page rendering and simple data transfer. In daily development,
We usually use some good, efficient, well-functioned template engines such as Velocity, Freemarker, JetbrickTemplate, and more.
Blade support extends any template engine, as well as multiple implementations, at [here](https://github.com/lets-blade/blade-template-engines), and also welcomes your contribution.

## Default template

The default template engine is very simple, less than `400` line of code, of course, the function is limited. Let's try, by convention, all template files are stored in the `templates` directory.

**create route**

```java
public static void main(String[] args){
    Blade.me()
        .get("/", (req, res) -> {
            req.attribute("name", "biezhi");
            res.render("index.html");
        })
        .start();
}
```

**create template file**

`templates/index.html`: located under the classpath

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

**Configure the template engine**

```java
@Bean
public class TemplateConfig implements BeanProcessor {
    
    @Override
    public void processor(Blade blade) {
        blade.templateEngine(new JetbrickTemplateEngine());
    }
    
}
```

The routing code is the same as before, this time we slightly modify the template display.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Hello Page</title>
</head>
<body>

  <h1>Hello, ${user.username}</h1>
  
  #if(user.age > 18)
    <p>Good Boy!</p>
  #else
    <p>Gooood Baby!</p>
  #end
  
</body>
</html>
```

To learn more about the use of this template, click on [Jetbrick Documentation](http://subchen.github.io/jetbrick-template/2x/syntax-expression.html).

## Custom extensions

Only need to achieve `TemplateEngine` interface, can be configured at startup.

```java
void render(ModelAndView modelAndView, Writer writer) throws TemplateException;
```

This method provides two parameters, the first one is the data and view location, the second is to write to the IO object.