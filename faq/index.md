---
layout: faq
language: cn
title: 常见问题
---

# 如何使用快照版本？

在项目的 `pom.xml` 文件中加入

```xml
<repositories>
    <repository>
        <id>snapshots-repo</id>
        <url>https://oss.sonatype.org/content/repositories/snapshots</url>
        <releases>
            <enabled>false</enabled>
        </releases>
        <snapshots>
            <enabled>true</enabled>
        </snapshots>
    </repository>
</repositories>
```

然后使用对应的快照版本即可，如 `2.0.13-SNAPSHOT`。

> 快照版本一般修复紧急 BUG 或优先体验新特性时使用。
> 在发布时每次都会覆盖。

快照版本可以无限的发布，也意味着使用方想确保获取最新的版本可能要强制更新，使用 

```shell
mvn clean compile -U
```

# 如何修改内置 JSON 库？

默认情况下 Blade 内置了一个简单的 json 库，足以应对大多数情况。如果你想自定义或者你习惯于某个 json 库，Blade 支持替换，目前支持以下几个 json 库。

- [fastjson](https://github.com/lets-blade/blade-json-support/tree/master/blade-fastjson-support)
- [jackson](https://github.com/lets-blade/blade-json-support/tree/master/blade-jackson-support)
- [gson](https://github.com/lets-blade/blade-json-support/tree/master/blade-gson-support)

如果想支持其他库，请自行按照源码扩展。

添加依赖，如 `jackson`

```xml
<dependency>
    <groupId>com.bladejava</groupId>
    <artifactId>blade-jackson-support</artifactId>
    <version>最新版本</version>
<dependency>
```

然后在 Blade 启动前加入一行：

```java
JsonKit.jsonSupprt(new FastJsonSupport());
```
