---
layout: doc
language: cn
title: 日志输出
---

Blade使用了 `slf4j-api` 作为日志接口，为了方便起见，默认内置了日志实现，
包含按日期进行文件归档等操作，一个小型应用无需配置日志组件。

maven的坐标名为 `blade-log`，源码在 [这里](https://github.com/bladejava/blade-log)

默认的日志级别是 `INFO`，你可以修改它。使用日志和往常一样：

```java
public class LogExample {
    private static final org.slf4j.Logger log = org.slf4j.LoggerFactory.getLogger(LogExample.class);

    log.debug("Hello Debug");
    log.info("Hello Info");
    log.warn("Hello Warn");
    log.error("Hello Error");
}
```

## 配置

```bash
# 配置日志级别
# 日志级别选项 ("trace", "debug", "info", "warn", or "error").
# 如果你没有配置默认是 "info".
#com.blade.logger.rootLevel=info

# 配置某个包、类的日志级别
#com.blade.logger.xxxxx=
#com.blade.logger.org.sql2o.Query=debug

# 显示日期时间
#com.blade.logger.showDate=false

# 日期格式化
#com.blade.logger.datePattern=yyyy-MM-dd HH:mm:ss:SSS Z

# 显示线程名
#com.blade.logger.showThread=true

# 如果要将Logger实例名称包含在输出消息中，请设置为true。
# 默认为true
#com.blade.logger.showLogName=true

# 如果要将名称的最后一个组件包含在输出消息中，请设置为true。
# 默认为true
#com.blade.logger.shortName=true

# 设置日志文件路径
# com.blade.logger.dir=./logs

# 设置日志文件名，默认取当前 app.name
# com.blade.logger.name=sample
```

## 和其他日志实现冲突

在使用其他的一些组件的时候，可能会和 `blade-log` 产生冲突，因为它们都实现了 `slf4j-api`，
在 maven 中你可以排除任意一个，像这样：

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

默认情况下 `blade-mvc` 已经内置了日志实现，需要替换一个实现也是这样的方式。