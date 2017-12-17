---
title: 进阶使用
categories: advance
comments: false
---

## 异常处理

Blade 内置了 `异常处理器`，在开发者模式下它会将异常输出在前端页面，并在控制台打印堆栈信息，生产环境只打印在控制台。
有些时候不满足我们的需求，这时候就需要自定义异常处理了，比如针对某个自定义的异常进行特殊处理。
我们用一个例子来解释如何操作。

定义了一个名为 `TipException` 的运行时异常类，用于输出错误消息到前台。
按照上面对异常的处理情况这个异常的堆栈信息会被输出在控制台，生产环境下前端只会收到 500 的错误码。
我们希望针对这个异常做一些特殊处理，在 Blade 中提供了 `ExceptionHandler` 接口定义了一个处理异常的方法，
为了方便内置了 [DefaultExceptionHandler]() 类做默认处理，我们不必单独写一个异常处理器，只需要继承 `DefaultExceptionHandler`
稍作修改即可完成自己的特定需要，如果你真的愿意自己完全处理异常信息，也可以参考这个类的实现。

```java
public class TipException extends RuntimeException {

    public TipException(String message) {
        super(message);
    }

    public TipException(String message, Throwable cause) {
        super(message, cause);
    }

    public TipException(Throwable cause) {
        super(cause);
    }
}

@Bean
public class GolbalExceptionHandler extends DefaultExceptionHandler {

    @Override
    public void handle(Exception e) {
        if (e instanceof TipException) {
            TipException tipException = (TipException) e;
            String msg = tipException.getMessage();
            WebContext.response().json(RestResponse.fail(msg));
        } else {
            super.handle(e);
        }
    }

}
```

这段代码很简洁，我们定义了一个名为 `GolbalExceptionHandler` 的类来处理自定义异常，它继承自 `DefaultExceptionHandler`，
并作为一个 `Bean` 被 Blade 托管，内部实现也只有几行代码，判断一下异常类型，做特殊处理即可，否则还是像之前一样处理。

## 自定义错误页面

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

## 自定义中间件

## Session 配置

## Session 扩展

## 命令行参数
