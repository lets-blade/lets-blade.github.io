---
layout: doc
language: en
title: Logging
---

Blade uses `slf4j-api` as the log interface. For convenience, the log implementation is built in by default.
It includes operations such as archiving files by date, and a small application does not need to configure logging components.

The coordinate name of maven is `blade-log`, the source code is [here](https://github.com/bladejava/blade-log)

The default log level is `INFO`, you can modify it. Use the log as usual:

```java
public class LogExample {
    private static final org.slf4j.Logger log = org.slf4j.LoggerFactory.getLogger(LogExample.class);

    log.debug("Hello Debug");
    log.info("Hello Info");
    log.warn("Hello Warn");
    log.error("Hello Error");
}
```

## Logging configuration

```shell
# configuring the log level
# log level options ("trace", "debug", "info", "warn", or "error").
# if you don't configure the default is "info".
#com.blade.logger.rootLevel=info

# configure the log level of a package or class
#com.blade.logger.xxxxx=
#com.blade.logger.org.sql2o.Query=debug

# display date time
#com.blade.logger.showDate=true

# date format
#com.blade.logger.datePattern=yyyy-MM-dd HH:mm:ss:SSS Z

# show thread name
#com.blade.logger.showThread=true

# Set to true if the Logger instance name is to be included in the output message.
# default is true
#com.blade.logger.showLogName=true

# Set to true if you want to include the last component of the name in the output message.
# default is true
#com.blade.logger.shortName=true

# Set the log file path
# com.blade.logger.dir=./logs

# Set the log file name. By default, the current app.name is taken.
# com.blade.logger.name=sample
```

## Conflict with other logger implementations

When using other components, it may conflict with `blade-log` because they both implement `slf4j-api`,
You can exclude any one in maven like this:

```xml
<dependency>
    <groupId>com.bladejava</groupId>
    <artifactId>blade-mvc</artifactId>
    <version>${blade.version}</version>
    <exclusions>
        <exclusion>
            <groupId>com.bladejava</groupId>
            <artifactId>blade-log</artifactId>
        </exclusion>
    </exclusions>
</dependency>
```

By default, `blade-mvc` has a built-in log implementation, and it is also necessary to replace an implementation.