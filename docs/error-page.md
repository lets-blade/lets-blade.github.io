---
layout: doc
language: cn
title: 错误页面
---

Blade 程序中默认的 `404`、`500` 处理是直接输出在界面的，如果你希望使用一个 `html` 网页渲染错误页可以进行自定义配置。
在 `app.properties` 配置文件中设置 `mvc.view.404=my_404.html`，
这里的 `my_404.html` 应当位于 `templates` 根目录，同时你可以获取到 `title`、`message`、`stackTrace` 内置变量（当发生 500 错误的时候才有 `stackTrace`）。

我们来举个例子，默认情况下出现 `404` 你在界面会看到这样的输出信息：

```bash
404 Not Found - /someurl

Copyright © Blade-2.0.6-Alpha1
```

我们可以定义一个错误页面名为 `my_404.html` 存储在 `templates` 目录下，它的内容是：

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>${title}</title>
  </head>
  <body>
    我的404页面：${message}
  </body>
</html>
```

记得在 `app.properties` 配置文件中加入 `mvc.view.404=my_404.html`，这时候再打开一个未知页面试试：

```bash
我的404页面：/someurl
```
