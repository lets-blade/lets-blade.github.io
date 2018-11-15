---
layout: doc
language: cn
title: 模板视图
---

模板引擎适合于动态 `HTML` 页面输出或者代码生成，在Web开发中是常见的 **装备**。
Blade内置了简单的模板引擎，为了应付网页渲染和简单的数据传输。在日常开发中，
我们通常使用一些优秀的、高效的、功能较为完善的模板引擎，诸如 Velocity、Freemarker、JetbrickTemplate 等等。
Blade支持扩展任意一款模板引擎，同时也有多个实现了，在 [这里](https://github.com/lets-blade/blade-template-engines)，也欢迎你贡献代码。

## 默认模板

默认的模板引擎是非常简单的，不到 `400` 行代码，当然功能也有限制。我们来试试，根据约定，所有的模板文件都存储在 `templates` 目录下。

**创建路由**

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

**创建模板文件**

`templates/index.html`：位于 classpath 下 

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

上面的默认模板只针对非常简单的 HTML 渲染，在绝大部分情况下我们都需要一款强大、满足业务开发的模板引擎，这里 Blade 推荐使用 Jetbrick Template，它类似于 Velocity 但比它更强大，官方文档是 [jetbrick-template](http://subchen.github.io/jetbrick-template/2x/overview.html)。

**添加 Jetbrick Template 依赖**

使用 Jetbrick Template 你无须引入它自己的依赖，Blade 做了一个简单的封装，当然你也可以自己封装，只有一个类文件而已，源码在 [这里](https://github.com/lets-blade/blade-template-engines/blob/master/blade-template-jetbrick/src/main/java/com/blade/mvc/view/template/JetbrickTemplateEngine.java)。

```xml
<dependency>
    <groupId>com.bladejava</groupId>
    <artifactId>blade-template-jetbrick</artifactId>
    <version>0.1.3</version>
</dependency>
```

**配置模板引擎**

添加好依赖之后我们需要做一项配置，告诉 Blade 应该使用 Jetbrick 模板引擎而不是默认的。

```java
@Bean
public class TemplateConfig implements BladeLoader {
    
    @Override
    public void load(Blade blade) {
        blade.templateEngine(new JetbrickTemplateEngine());
    }
    
}
```

上面的代码会在 Blade 启动的时候运行，你也可以在这里加载一些其他的东西（比如某些配置信息）。

编写两个路由：

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

下面对应 2 个模板文件，它们都位于 `resources/templates` 目录下。

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

想要了解更多关于该模板的使用，可以点击 Jetbrick 的官网查看，在 Blade 的路由里只要把数据存储在 `attribute` 里就可以了。

## 自行扩展

只需要实现 `TemplateEngine` 接口，在启动的时候配置即可。

```java
void render(ModelAndView modelAndView, Writer writer) throws TemplateException;
```

这个方法提供2个参数，第一个是数据和视图位置，第二个是写入IO对象。