---
layout: faq
language: en
title: FAQ
---

# How to use the snapshot version?

Add in the project's `pom.xml` file

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

Then use the corresponding snapshot version, such as `2.0.9-SNAPSHOT`.

> The snapshot version is generally used to fix an emergency bug or to prioritize new features.
> Overwrite each time it is published.

# How to modify the built-in JSON library?

By default, Blade has a simple json library built in to handle most situations. If you want to customize or you are used to a json library, Blade supports replacement, and currently supports the following json libraries.

- [fastjson](https://github.com/lets-blade/blade-json-support/tree/master/blade-fastjson-support)
- [jackson](https://github.com/lets-blade/blade-json-support/tree/master/blade-jackson-support)
- [gson](https://github.com/lets-blade/blade-json-support/tree/master/blade-gson-support)

If you want to support other libraries, please follow the source extensions yourself.

Add dependencies like `jackson`

```xml
<dependency>
    <groupId>com.bladejava</groupId>
    <artifactId>blade-jackson-support</artifactId>
    <version> latest version</version>
<dependency>
```

Then add a line before the Blade starts:

```java
JsonKit.jsonSupprt(new FastJsonSupport());
```