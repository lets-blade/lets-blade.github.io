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

Then use the corresponding snapshot version, such as `2.1.1-SNAPSHOT`.

> The snapshot version is generally used to fix an emergency bug or to prioritize new features.
> Overwrite each time it is published.
