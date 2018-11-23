---
layout: doc
language: en
title: Error page
---

The default `404`, `500` processing in the Blade program is output directly in the interface. If you want to use a `html` page rendering error page, you can customize it.
Set `mvc.view.404=my_404.html` in the `app.properties` configuration file.
The `my_404.html` here should be in the `templates` root directory, and you can get the `title`, `message`, `stackTrace` built-in variables (the `stackTrace` is only needed when a 500 error occurs).

Let's take an example. By default, `404` will appear in the interface:

```bash
404 Not Found - /someurl

Copyright © Blade-2.0.12-Alpha1
```

We can define an error page named `my_404.html` stored in the `templates` directory, whose content is:

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>${title}</title>
  </head>
  <body>
    My 404 Page: ${message}
  </body>
</html>
```

Remember to add `mvc.view.404=my_404.html` to the `application.properties` configuration file. Try opening an unknown page again:

```shell
My 404 Page: /someurl
```
