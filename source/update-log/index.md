---
title: Update logs
categories: update-log
comments: false
---

## v2.0.5

1. Support `WebSocket`
2. Support `SSL` configuration
3. Support custom start `BannerText`
3. Support custom start thread name
3. Support custom business thread pool prefix
3. Get `Environment` param allow set default value
4. Upgrade `Netty` version to `4.1.18.Final`
5. Fixed get client IP address
6. Fixed for exceptions caused by `robot.txt` requests
7. Fixed `Nginx` getting` Cookie` lowercase issue
8. Add `CollectionKit`
9. Add `StringKit.isAnyBlank()`

## v2.0.4

1. Optimize performance
2. Optimize `ClassReader` struct
2. Optimize deprecated methods
3. Separate asm module as a separate dependency
4. Fixed `JsonKit.toString` double quotes error
5. Fixed response `contentType` error
6. Fixed `UnsupportedOperationException`
5. Remove some magic code

## v2.0.3

1. Fixed Chinese 404 problem of static resources
1. Fixed `Signature` for routing method error
1. Fixed `ExceptionHandler` not injected
1. Remove the `@ QueryParam` annotation
1. Optimization section expired Netty API
1. Add `Session` interface to expand (add` Blade.sessionType` method)
Add the InputFilter tool class
1. Add `HtmlFilter` tool class
