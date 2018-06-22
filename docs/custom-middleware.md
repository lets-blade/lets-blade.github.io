---
layout: doc
language: cn
title: 自定义中间件
---

中间件是 `WebHook` 的一种变种模式，不同的是它早于 `WebHook` 执行，你可以做一些有用的前置拦截，比如 `token` 校验、日志记录等等。
实现一个中间件可以参考一个例子：

```java
public class BasicAuthMiddleware implements WebHook {

    private static final int AUTH_LENGTH = 6;
    private static final int AUTH_FIELD_LENGTH = 2;

    private String username;
    private String password;

    @Override
    public boolean before(RouteContext context) {
        if (null == username) {
            this.username = WebContext.environment().get(ENV_KEY_AUTH_USERNAME, "blade");
            this.password = WebContext.environment().get(ENV_KEY_AUTH_PASSWORD, "blade");
        }
        Request request   = context.request();
        Object  basicAuth = context.session().attribute("basic_auth");
        if (null != basicAuth) {
            return true;
        }
        Response response = context.response();
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
Blade.of().use(new BasicAuthMiddleware());
```