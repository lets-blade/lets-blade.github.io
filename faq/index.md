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

然后使用对应的快照版本即可，如 `2.1.1-SNAPSHOT`。

> 快照版本一般修复紧急 BUG 或优先体验新特性时使用。
> 在发布时每次都会覆盖。

快照版本可以无限的发布，也意味着使用方想确保获取最新的版本可能要强制更新，使用 

```shell
mvn clean compile -U
```

