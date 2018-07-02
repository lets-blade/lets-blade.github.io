---
layout: doc
language: cn
title: 路由上下文
---

在 Blade 2.0.9 版本后加入了 `RouteContext` 这个类，作为路由的上下文操作。其本质是封装了 `Request` 和 `Response`，所以使用起来和它们的 API 是相同的，下面列举一下包含的方法列表。

## 请求相关

- #request() 
- #method()
- #uri()
- #keepAlive()
- #session()
- #isIE()
- #header(String headerName)
- #attribute(String key, Object value)
- #fromString(String paramName)
- #fromString(String paramName, String defaultValue)
- #fromInt(String paramName)
- #fromInt(String paramName, Integer defaultValue)
- #fromLong(String paramName)
- #fromLong(String paramName, Long defaultValue)
- #pathString(String paramName)
- #pathInt(String paramName)
- #pathLong(String paramName)
- #userAgent()
- #address()
- #remoteAddress()
- #headers()
- #parameters()
- #contentType()
- #bodyToString()
- #body()
- #targetType()
- #routeTarget()
- #routeAction()
- #routeParameters()

## 响应相关

- #response()
- #cookie(String name)
- #contentType(String contentType)
- #status(int statusCode)
- #header(String name, String value)
- #badRequest()
- #render(String view)
- #render(ModelAndView modelAndView)
- #text(String text) 
- #json(String json)
- #json(Object object)
- #html(String html)
- #body(Body body)
- #cookie(String name, String value)
- #cookie(String name, String value, int maxAge)
- #redirect(String url)

## 参考

该类的源文件在 [RouteContext.java](https://github.com/lets-blade/blade/blob/master/src/main/java/com/blade/mvc/RouteContext.java#L41) ，同时可以参考 [Request](https://lets-blade.com/docs/request.html) 和 [Response](https://lets-blade.com/docs/response.html) 的使用。