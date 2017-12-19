---
title: Advanced use
categories: advance
comments: false
---

## Exception handling

Blade built-in `ExceptionHandler`. In developer mode it outputs the exception on the front page and prints the stack information on the console. The production environment prints only on the console.
Sometimes do not meet our needs, this time you need to customize the exception handling, such as a special exception for a special treatment We use an example to explain how to operate.

Defined a `TipException` Runtime exception class for outputting error messages to the foreground.
In accordance with the above exception handling the exception stack information will be output in the console, production front end will only receive 500 error code.
We hope to do something special about this exception at Blade Provides a `ExceptionHandler` interface defines a method of handling exceptions,
In order to facilitate built-in [DefaultExceptionHandler] () class to do the default processing, we do not have to write a separate exception handler, only need to inherit the `DefaultExceptionHandler`
A little modification to complete their specific needs, if you really want to completely handle the exception information, you can also refer to the realization of this class.

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

This code is very simple, we have defined a class called GolbalExceptionHandler to handle custom exceptions, it inherits from `DefaultExceptionHandler`,
And is managed as a Bean by the Blade, internally implementing only a few lines of code, judging the type of exception, doing special handling, or else doing the same as before.

## Custom error page

The default `404` and` 500` processing in Blade program is output directly in the interface, if you want to use a html page rendering error page can be customized configuration.

Set `mvc.view.404 = my_404.html` in` app.properties` config file.

The `my_404.html` here should be in the` templates` root directory, and you can get it `title`,` message`, `stackTrace` There's a built-in variable (` stackTrace` for 500 errors).

Let's give an example, by default, `404` you will see this output in the interface:

```bash
404 Not Found - /someurl

Copyright © Blade-2.0.6-Alpha1
```

You can define an error page named `my_404.html` stored in the` templates` directory, which reads:

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

Remember to add `mvc.view.404 = my_404.html` in` app.properties` configuration file, then open an unknown page try:

```bash
My 404 Page: /someurl
```

## Custom middleware

Middleware is a variant of `WebHook`, except that it executes earlier than` WebHook`, and you can do useful pre-blocking such as `token` checking, logging, and so on.
To achieve a middleware can refer to an example:

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

**Used this middleware**

```java
Blade.me().use(new BasicAuthMiddleware());
```

## Session extensions

By default, Blade uses the built-in Session implementation and session data is stored in `Memory`. If you want to use Redis or another storage container
Save is also possible, just need to re-implement a Session just fine.

The following is the definition of the `Session` interface:

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

So you just implement this class, and then tell Blade I need to use a custom Session implementation on it, how to configure it?

```java
Blade.me().sessionType(MySession.class);
```

Make sure your `Session` implementation is implemented by a constructor with no arguments (in fact, there's one thing that is implied here, not passing parameters through the constructor _if any_)

## Command line parameters

For your convenience, we support some configuration changes when running a Blade application, such as when I specify a port at runtime:

```bash
java -jar blade-app.jar --server.port=9088
```

Of course, also supports some other command line parameters, take a look at the following form:

| Command Line Parameters | Description | Example |
| --------   | -----  | ----  |
| --server.address | web server address, default value is `0.0.0.0` loopback address | --server.address=192.168.1.100 |
| --server.port | web server port, default value is `9000` | --server.port=9088 |
| --blade.env | start the configuration file environment, the default value is `app.properties` | --blade.env=prod |
