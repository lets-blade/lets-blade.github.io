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

中间件是 `WebHook` 的一种变种模式，不同的是它早于 `WebHook` 执行，你可以做一些有用的前置拦截，比如 `token` 校验、日志记录等等。
实现一个中间件可以参考一个例子：

```java
public class BasicAuthMiddleware implements WebHook {

    private static final int AUTH_LENGTH = 6;
    private static final int AUTH_FIELD_LENGTH = 2;

    private String username;
    private String password;

    @Override
    public boolean before(Signature signature) {
        if (null == username) {
            this.username = WebContext.blade().environment().get(ENV_KEY_AUTH_USERNAME, "blade");
            this.password = WebContext.blade().environment().get(ENV_KEY_AUTH_PASSWORD, "blade");
        }
        Request request   = signature.request();
        Object  basicAuth = request.session().attribute("basic_auth");
        if (null != basicAuth) {
            return true;
        }
        Response response = signature.response();
        if (!checkHeaderAuth(request)) {
            response.unauthorized();
            response.header("Cache-Control", "no-store");
            response.header("Expires", "0");
            response.header("WWW-authenticate", "Basic Realm=\"Blade\"");
            return false;
        }
        return true;
    }

    private boolean checkHeaderAuth(Request request) {
        String auth = request.header("Authorization");
        log.debug("Authorization: {}", auth);

        if (StringKit.isNotBlank(auth) && auth.length() > AUTH_LENGTH) {
            auth = auth.substring(6, auth.length());
            String decodedAuth = getFromBASE64(auth);
            log.debug("Authorization decode: {}", decodedAuth);

            String[] arr = decodedAuth.split(":");
            if (arr.length == AUTH_FIELD_LENGTH) {
                if (username.equals(arr[0]) && password.equals(arr[1])) {
                    request.session().attribute("basic_auth", decodedAuth);
                    return true;
                }
            }
        }

        return false;
    }

    private String getFromBASE64(String s) {
        if (s == null)
            return null;
        try {
            byte[] b = Base64.getDecoder().decode(s);
            return new String(b);
        } catch (Exception e) {
            return null;
        }
    }

}
```

**应用这个中间件**

```java
Blade.me().use(new BasicAuthMiddleware());
```

## Session 扩展

默认情况下 Blade 使用内置的 `Session` 实现，会话数据是存储在 `内存` 中的，如果你想使用 Redis 或者其他存储容器来
保存也是可以的，只需要重新实现一个 Session 就好了。

下面是 `Session` 接口的定义：

```java
public class HttpSession implements Session {

    private Map<String, Object> attributes = new HashMap<>();
    @Setter
    private String              id         = null;
    @Setter
    private String              ip         = null;
    @Setter
    private long                created    = -1;
    @Setter
    private long                expired    = -1;

    @Override
    public String id() {
        return id;
    }

    @Override
    public void id(String id) {
        this.id = id;
    }

    @Override
    public String ip() {
        return this.ip;
    }

    @Override
    public void ip(String ip) {
        this.ip = ip;
    }

    @Override
    public <T> T attribute(String name) {
        Object object = this.attributes.get(name);
        return null != object ? (T) object : null;
    }

    @Override
    public void attribute(String name, Object value) {
        this.attributes.put(name, value);
    }

    @Override
    public Map<String, Object> attributes() {
        return attributes;
    }

    @Override
    public void removeAttribute(String name) {
        this.attributes.remove(name);
    }

    @Override
    public long created() {
        return this.created;
    }

    @Override
    public void created(long created) {
        this.created = created;
    }

    @Override
    public long expired() {
        return this.expired;
    }

    @Override
    public void expired(long expired) {
        this.expired = expired;
    }

}
```

所以你只要实现这个类，然后告诉 Blade 我需要使用自定义的 Session 实现就可以了，如何配置呢？

```java
Blade.me().sessionType(MySession.class);
```

确保你的 `Session` 实现由一个无参构造函数（其实这里隐含的告诉一件事，不要通过构造器传参_如果有的话_）

## 命令行参数

为了方便起见，我们支持在运行 Blade 应用的时候修改一些配置，比如我在运行时指定端口：

```bash
java -jar blade-app.jar --server.port=9088
```

当然还支持一些其他的命令行参数，看看下面的表格：

| 命令行参数        | 描述   |  示例  |
| --------   | -----  | ----  |
| --server.address | 服务地址，默认是本机 `0.0.0.0` 回环地址 | --server.address=192.168.1.100 |
| --server.port | web服务端口，默认是 `9000` | --server.port=9088 |
| --blade.env | 启动配置文件环境，默认是 `app.properties` | --blade.env=prod |
