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

**添加 Jetbrick Template 依赖**

```xml
<dependency>
    <groupId>com.bladejava</groupId>
    <artifactId>blade-template-jetbrick</artifactId>
    <version>0.1.3</version>
</dependency>
```

**配置模板引擎**

```java
@Bean
public class TemplateConfig implements BladeLoader {
    
    @Override
    public void load(Blade blade) {
        blade.templateEngine(new JetbrickTemplateEngine());
    }
    
}
```

路由代码和之前的一样，这次我们稍微修改一下模板的展现

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

想要了解更多关于该模板的使用，点击 [Jetbrick文档](http://subchen.github.io/jetbrick-template/2x/syntax-expression.html) 查看。

## 自行扩展

只需要实现 `TemplateEngine` 接口，在启动的时候配置即可。

```java
void render(ModelAndView modelAndView, Writer writer) throws TemplateException;
```

这个方法提供2个参数，第一个是数据和视图位置，第二个是写入IO对象。