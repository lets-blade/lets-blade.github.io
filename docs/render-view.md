---
layout: doc
language: cn
title: 渲染视图
---

Blade 内部内置了一个非常简单的模板渲染引擎，如果你有一些简单的页面需要渲染可以试试它（生产环境不适用）。
渲染一个模板需要遵守一条准则：

- 所有的模板文件都存储在 `resources/templates` 目录下

你可以调用 `Response` 方法的 `render` 方法渲染或者返回一个 `String` 类型的视图路径。

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