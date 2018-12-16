---
layout: doc
language: cn
title: 路由上下文
---

在 Blade 2.0.9 版本后加入了 `RouteContext` 这个类，作为路由的上下文操作。其本质是封装了 `Request` 和 `Response`，所以使用起来和它们的 API 是相同的，下面列举一下包含的方法列表。

## 请求相关

- [#request()](https://lets-blade.com/apidocs/com/blade/mvc/RouteContext.html#request--)
- [#method()](https://lets-blade.com/apidocs/com/blade/mvc/RouteContext.html#method--)
- [#uri()](https://lets-blade.com/apidocs/com/blade/mvc/RouteContext.html#uri--)
- [#keepAlive()](https://lets-blade.com/apidocs/com/blade/mvc/RouteContext.html#keepAlive--)
- [#session()](https://lets-blade.com/apidocs/com/blade/mvc/RouteContext.html#session--)
- [#isIE()](https://lets-blade.com/apidocs/com/blade/mvc/RouteContext.html#session--)
- [#header(String headerName)](https://lets-blade.com/apidocs/com/blade/mvc/RouteContext.html#header-java.lang.String-)
- [#cookie(String name)](https://lets-blade.com/apidocs/com/blade/mvc/RouteContext.html#cookie-java.lang.String-)
- [#attribute(String key, Object value)](https://lets-blade.com/apidocs/com/blade/mvc/RouteContext.html#attribute-java.lang.String-java.lang.Object-)
- [#query(String paramName)](https://lets-blade.com/apidocs/com/blade/mvc/RouteContext.html#query-java.lang.String-)
- [#query(String paramName, String defaultValue)](https://lets-blade.com/apidocs/com/blade/mvc/RouteContext.html#query-java.lang.String-java.lang.String-)
- [#queryInt(String paramName)](https://lets-blade.com/apidocs/com/blade/mvc/RouteContext.html#queryInt-java.lang.String-)
- [#queryInt(String paramName, Integer defaultValue)](https://lets-blade.com/apidocs/com/blade/mvc/RouteContext.html#queryInt-java.lang.String-java.lang.Integer-)
- [#queryLong(String paramName)](https://lets-blade.com/apidocs/com/blade/mvc/RouteContext.html#queryLong-java.lang.String-)
- [#queryLong(String paramName, Long defaultValue)](https://lets-blade.com/apidocs/com/blade/mvc/RouteContext.html#queryLong-java.lang.String-java.lang.Long-)
- [#queryDouble(String paramName)](https://lets-blade.com/apidocs/com/blade/mvc/RouteContext.html#queryDouble-java.lang.String-)
- [#queryDouble(String paramName, Double defaultValue)](https://lets-blade.com/apidocs/com/blade/mvc/RouteContext.html#queryDouble-java.lang.String-java.lang.Double-)
- [#queryBoolean(String paramName)](https://lets-blade.com/apidocs/com/blade/mvc/RouteContext.html#queryBoolean-java.lang.String-)
- [#queryBoolean(String paramName, Boolean defaultValue)](https://lets-blade.com/apidocs/com/blade/mvc/RouteContext.html#queryBoolean-java.lang.String-java.lang.Boolean-)
- [#pathString(String paramName)](https://lets-blade.com/apidocs/com/blade/mvc/RouteContext.html#pathString-java.lang.String-)
- [#pathInt(String paramName)](https://lets-blade.com/apidocs/com/blade/mvc/RouteContext.html#pathInt-java.lang.String-)
- [#pathLong(String paramName)](https://lets-blade.com/apidocs/com/blade/mvc/RouteContext.html#pathLong-java.lang.String-)
- [#userAgent()](https://lets-blade.com/apidocs/com/blade/mvc/RouteContext.html#userAgent--)
- [#address()](https://lets-blade.com/apidocs/com/blade/mvc/RouteContext.html#address--)
- [#headers()](https://lets-blade.com/apidocs/com/blade/mvc/RouteContext.html#headers--)
- [#parameters()](https://lets-blade.com/apidocs/com/blade/mvc/RouteContext.html#parameters--)
- [#contentType()](https://lets-blade.com/apidocs/com/blade/mvc/RouteContext.html#contentType--)
- [#bodyToString()](https://lets-blade.com/apidocs/com/blade/mvc/RouteContext.html#bodyToString--)
- [#body()](https://lets-blade.com/apidocs/com/blade/mvc/RouteContext.html#body--)
- [#targetType()](https://lets-blade.com/apidocs/com/blade/mvc/RouteContext.html#targetType--)
- [#routeTarget()](https://lets-blade.com/apidocs/com/blade/mvc/RouteContext.html#routeTarget--)
- [#routeAction()](https://lets-blade.com/apidocs/com/blade/mvc/RouteContext.html#routeAction--)
- [#routeParameters()](https://lets-blade.com/apidocs/com/blade/mvc/RouteContext.html#routeParameters--)

## 响应相关

- [#response()](https://lets-blade.com/apidocs/com/blade/mvc/RouteContext.html#response--)
- [#contentType(String contentType)](https://lets-blade.com/apidocs/com/blade/mvc/RouteContext.html#contentType-java.lang.String-)
- [#status(int statusCode)](https://lets-blade.com/apidocs/com/blade/mvc/RouteContext.html#status-int-)
- [#header(String name, String value)](https://lets-blade.com/apidocs/com/blade/mvc/RouteContext.html#header-java.lang.String-java.lang.String-)
- [#badRequest()](https://lets-blade.com/apidocs/com/blade/mvc/RouteContext.html#badRequest--)
- [#render(String view)](https://lets-blade.com/apidocs/com/blade/mvc/RouteContext.html#render-java.lang.String-)
- [#render(ModelAndView modelAndView)](https://lets-blade.com/apidocs/com/blade/mvc/RouteContext.html#render-com.blade.mvc.ui.ModelAndView-)
- [#text(String text)](https://lets-blade.com/apidocs/com/blade/mvc/RouteContext.html#text-java.lang.String-)
- [#json(String json)](https://lets-blade.com/apidocs/com/blade/mvc/RouteContext.html#json-java.lang.String-)
- [#json(Object object)](https://lets-blade.com/apidocs/com/blade/mvc/RouteContext.html#json-java.lang.Object-)
- [#html(String html)](https://lets-blade.com/apidocs/com/blade/mvc/RouteContext.html#html-java.lang.String-)
- [#body(Body body)](https://lets-blade.com/apidocs/com/blade/mvc/RouteContext.html#body-com.blade.mvc.http.Body-)
- [#cookie(String name, String value)](https://lets-blade.com/apidocs/com/blade/mvc/RouteContext.html#cookie-java.lang.String-java.lang.String-)
- [#cookie(String name, String value, int maxAge)](https://lets-blade.com/apidocs/com/blade/mvc/RouteContext.html#cookie-java.lang.String-java.lang.String-int-)
- [#redirect(String url)](https://lets-blade.com/apidocs/com/blade/mvc/RouteContext.html#redirect-java.lang.String-)

## 参考

该类的源文件在 [RouteContext.java](https://github.com/lets-blade/blade/blob/master/src/main/java/com/blade/mvc/RouteContext.java#L41) ，同时可以参考 [Request](https://lets-blade.com/docs/request.html) 和 [Response](https://lets-blade.com/docs/response.html) 的使用。