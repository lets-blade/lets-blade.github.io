---
title: 请求响应
categories: docs
comments: false
---


请求和响应是 `Blade` 中的核心概念，在几乎所有的Web框架中都有这个概念，
我们使用 `Request` 对象接收请求，使用 `Response` 对象向客户端发送响应。

从 Blade 的 `README` 中已经演示了绝大部分的使用场景，那些使用方法是你在开发中频次最高的一些操作，
本章节也会列出所有的 API 供你参考。

## Request 方法概览

```java
String host();                                          // 获取客户端Host
String uri();                                           // 获取请求URI
String url();                                           // 获取请求URL
String userAgent();                                     // 获取UserAgent
String protocol();                                      // 获取协议头
String contextPath();                                   // 获取ContextPath
Map<String, String> pathParams();                       // 获取Restful参数列表
String pathString(String name);                         // 根据名称获取Restful参数
Integer pathInt(String name);                           // 根据名称获取Restful Integer类型参数
Long pathLong(String name);                             // 根据名称获取Restful Long类型参数
String queryString();                                   // 获取QueryString
Map<String, List<String>> parameters();                 // 获取请求参数Map（不包括Resful参数）
Optional<String> query(String name);                    // 根据名称获取表单请求参数，返回Optional
String query(String name, String defaultValue);         // 根据名称获取表单请求参数，并设置默认值
Optional<Integer> queryInt(String name);                // 根据名称获取表单Integer请求参数，返回Optional
int queryInt(String name, int defaultValue);            // 根据名称获取表单Integer请求参数，并设置默认值
Optional<Long> queryLong(String name);                  // 根据名称获取表单Long请求参数，返回Optional
long queryLong(String name, long defaultValue);         // 根据名称获取表单Long请求参数，并设置默认值
Optional<Double> queryDouble(String name);              // 根据名称获取表单Double请求参数，返回Optional
double queryDouble(String name, double defaultValue);   // 根据名称获取表单Double请求参数，并设置默认值
String method();                                        // 获取当前请求method字符串
HttpMethod httpMethod();                                // 获取当前请求method枚举
String address();                                       // 获取客户端请求IP
Session session();                                      // 获取当前请求会话
String contentType();                                   // 获取当前请求ContentType
boolean isSecure();                                     // 返回当前请求是否是HTTPS请求
boolean isAjax();                                       // 返回当前请求是否是Ajax请求
boolean isIE();                                         // 返回当前请求是否是IE浏览器请求
Map<String, String> cookies();                          // 返回当前请求的Cookie Map键值对
Optional<String> cookie(String name);                   // 根据名称获取Cookie字符串，返回Optional
Optional<Cookie> cookieRaw(String name);                // 根据名称获取Cookie对象，返回Optional
String cookie(String name, String defaultValue);        // 根据名称获取Cookie字符串，并设置默认值
Map<String, String> headers();                          // 返回当前请求的Header Map键值对
String header(String name);                             // 根据名称获取Header信息
String header(String name, String defaultValue);        // 根据名称获取Header信息，并设置默认值
boolean keepAlive();                                    // 返回当前请求是否保持存活
Map<String, Object> attributes();                       // 返回当前请求的Attribute键值对
Request attribute(String name, Object value);           // 设置当前请求的Attribute数据
<T> T attribute(String name);                           // 根据名称获取当前请求的Attribute数据
Map<String, FileItem> fileItems();                      // 返回当前请求传出的文件项列键值对，键为文件名成值为文件详情信息
Optional<FileItem> fileItem(String name);               // 根据上传文件名称获取文件项，返回Optional
ByteBuf body();                                         // 返回当前请求Body体，返回ByteBuf
String bodyToString();                                  // 返回当前请求Body体，转换为字符串
```

## Response 方法概览

```java
Response status(int status);                            // 设置当前响应Http状态码
Response badRequest();                                  // 设置当前响应Http状态码为400
Response unauthorized();                                // 设置当前响应Http状态码为401
Response notFound();                                    // 设置当前响应Http状态码为404
Response contentType(String contentType);               // 设置当前响应ContentType
Response header(String name, String value);             // 向当前响应写入Header信息
Response cookie(Cookie cookie);                         // 向当前响应写入Cookie信息
Response cookie(String name, String value);             // 向当前响应写入Cookie信息
Response cookie(String name, String value, int maxAge); // 向当前响应写入Cookie信息，并设置Cookie有效期
Response removeCookie(String name);                     // 根据名称删除一个Cookie
void text(String text);                                 // 向客户端写入文本信息
void html(String html);                                 // 向客户端写入Html信息
void json(String json);                                 // 向客户端写入Json信息
void json(Object bean);                                 // 向客户端写入Json信息
void body(String data);                                 // 写入信息到响应Body
void body(byte[] data);                                 // 写入信息到响应Body
void body(ByteBuf byteBuf);                             // 写入信息到响应Body
void download(String fileName, File file);              // 下载文件写入到客户端
OutputStreamWrapper outputStream();                     // 返回当前响应输出流
void render(String view);                               // 渲染模板到客户端
void render(ModelAndView modelAndView);                 // 使用ModelAndView渲染到客户端
void redirect(String newUri);                           // 重定向到新地址
void send(FullHttpResponse response);                   // 向客户端发送自定义Response
```
