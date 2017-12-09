---
title: Request response
categories: docs
comments: false
---

Requests and responses are the core concepts in `Blade`, a concept that exists in almost any web framework,
We use the `Request` object to receive the request, use the `Response` object to send a response to the client.

From the Blade `README` has been demonstrated in most of the use of the scene, those who use is your highest frequency in the development of some operations,
This section also lists all the APIs for your reference.

## Request API Overview

```java
String host();                                          // Get the client Host
String uri();                                           // Get the request URI
String url();                                           // Get request URL
String userAgent();                                     // Get request UserAgent
String protocol();                                      // Get request protocol
String contextPath();                                   // Get ContextPath
Map<String, String> pathParams();                       // Get Restful parameter map
String pathString(String name);                         // Get Restful parameters by name
Integer pathInt(String name);                           // Get the Restful Integer type parameter by name
Long pathLong(String name);                             // Get Restful Long type parameters by name
String queryString();                                   // Get QueryString
Map<String, List<String>> parameters();                 // Get request parameters Map (excluding Resful parameters)
Optional<String> query(String name);                    // Get the form request parameters by name, and return the Optional type
String query(String name, String defaultValue);         // Get the form request parameters by name and set the default value
Optional<Integer> queryInt(String name);                // Get the form request parameters by name and set the default value
int queryInt(String name, int defaultValue);            // Obtain the form Integer request parameter by name and set the default value
Optional<Long> queryLong(String name);                  // Get the form Long request parameter by name and return Optional
long queryLong(String name, long defaultValue);         // Get the form Long request parameter by name and set the default value
Optional<Double> queryDouble(String name);              // Get the form Double request parameter by name and return Optional
double queryDouble(String name, double defaultValue);   // Get the form Double request parameter by name and set the default value
String method();                                        // Get the current request method string
HttpMethod httpMethod();                                // Get the current request method enumeration
String address();                                       // Get the client request IP
Session session();                                      // Get the current request session
String contentType();                                   // Get the current request ContentType
boolean isSecure();                                     // Returns whether the current request is an HTTPS request
boolean isAjax();                                       // Returns whether the current request is an Ajax request
boolean isIE();                                         // Returns whether the current request is an IE request
Map<String, String> cookies();                          // Returns the Cookie Map key-value pair for the current request
Optional<String> cookie(String name);                   // Get the cookie string by name and return Optional
Optional<Cookie> cookieRaw(String name);                // Get the cookie object by name and return Optional
String cookie(String name, String defaultValue);        // Get the cookie string by name and set the default value
Map<String, String> headers();                          // Returns the Header Map of the current request
String header(String name);                             // Get Header by name
String header(String name, String defaultValue);        // Get Header by name and set the default value
boolean keepAlive();                                    // Returns whether the current request keepAlive
Map<String, Object> attributes();                       // Returns the current request key-value pair
Request attribute(String name, Object value);           // Set the current request Attribute data
<T> T attribute(String name);                           // Get the current request attribute data by name
Map<String, FileItem> fileItems();                      // Return the current request for the outgoing file key column value, key for the file name into the file details information
Optional<FileItem> fileItem(String name);               // Obtain the file based on the uploaded file name and return Optional
ByteBuf body();                                         // Returns the body of the current request, returning ByteBuf
String bodyToString();                                  // Returns the body of the current request, converted to a string
```

## Response API Overview

```java
Response status(int status);                            // Set the current response Http status code
Response badRequest();                                  // Set the current response Http status code is 400
Response unauthorized();                                // Set the current response Http status code is 401
Response notFound();                                    // Set the current response Http status code is 404
Response contentType(String contentType);               // Set the current response ContentType
Response header(String name, String value);             // Write Header information to the current response
Response cookie(Cookie cookie);                         // Write cookie information to the current response
Response cookie(String name, String value);             // Write cookie information to the current response
Response cookie(String name, String value, int maxAge); // Write cookie information to the current response and set the cookie expiration date
Response removeCookie(String name);                     // Remove a cookie by name
void text(String text);                                 // Write text messages to the client
void html(String html);                                 // Write Html information to the client
void json(String json);                                 // Write Json information to the client
void json(Object bean);                                 // Write Json information to the client
void body(String data);                                 // Write message to response body
void body(byte[] data);                                 // Write message to response body
void body(ByteBuf byteBuf);                             // Write message to response body
void download(String fileName, File file);              // Download the file to the client
OutputStreamWrapper outputStream();                     // Returns the current response output stream
void render(String view);                               // Render the template to the client
void render(ModelAndView modelAndView);                 // Render to the client using ModelAndView
void redirect(String newUrl);                           // Redirect to new url
void send(FullHttpResponse response);                   // Send a custom Response to the client
```
