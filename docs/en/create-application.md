---
layout: doc
language: en
title: Create Application
---

This guide will lead to a simple "Hello" program. Of course, this is just the beginning. Take this step and you will feel the power of `Blade` 💪.

> ⚠️ Using Blade must be built with Maven, JDK1.8, which is a convention. As for what IDE to use to see your personal hobbies (I am more used to programming under IDEA)

## Create Maven project

Create a **normal** `Maven` project, **again prompt** Blade only needs you to create a normal project!!! It doesn't matter what Tomcat is, please get rid of the J2EE set.

Once created, we need to introduce the Blade dependency and configure the JDK compiled version. Here is an example of `pom.xml`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>com.example</groupId>
    <artifactId>hello</artifactId>
    <version>0.0.1</version>

    <properties>
        <blade-mvc.version>2.0.12-ALPHA</blade-mvc.version>
    </properties>

    <dependencies>
        <!-- mvc dependency -->
        <dependency>
            <groupId>com.bladejava</groupId>
            <artifactId>blade-mvc</artifactId>
            <version>${blade-mvc.version}</version>
        </dependency>
    </dependencies>

    <build>
        <finalName>hello</finalName>
        <plugins>
            <plugin>
                <artifactId>maven-compiler-plugin</artifactId>
                <configuration>
                    <source>1.8</source>
                    <target>1.8</target>
                    <encoding>UTF-8</encoding>
                </configuration>
            </plugin>
        </plugins>
    </build>

</project>
```

> ⚠️ The classmate who modified this `pom.xml` paid attention. Please change the `groupId` and project names; please note that using the newer version of `blade-mvc` depends

## Project structure

Before that, I recommend building a basic `package`. We put all the source files of the program under `package`, and Java manages the source with `package`.
Then my project structure is as follows:

```shell
.
├── pom.xml
└── src
  ├── main
  │  ├── java
  │  │   └── com
  │  │   └─── example
  │  │      ├── Application.java
  │  │      ├── config
  │  │      ├── controller
  │  │      ├── hooks
  │  │      ├── model
  │  │      └── service
  │  └── resources
  │      ├── app.properties
  │      ├── static
  │      │   ├── css
  │      │   │ └─ style.css
  │      └── templates
  │          └─ index.html
  └── test
      └── java
```

## Write a launch class

Create **Application.java**

```java
package com.example;

import com.blade.Blade;

public class Application {
    public static void main(String[] args) {
        Blade.of().start(Application.class, args);
    }
}
```

> Create a startup class, located in the package root, and create a Blade object using the Blade.of() method and launch it.

Of course, it doesn't make sense to start it at this time, because we haven't written a route yet, and the easiest way to write a route is to use Blade's built-in methods.

In the following chapters we will talk about other ways, here for the sake of simplicity, write a `Hello World`

```java
Blade.of().get("/", ctx -> ctx.text("Hello World!")).start(Application.class, args);
```

At this point you launch the application, you can see the following output in the terminal:

```bash
2017-10-14 14:12:52:302 INFO - [ _(:3」∠)_ ] c.b.s.n.NettyServer  | environment.jdk.version    » 1.8.0_101
2017-10-14 14:12:52:306 INFO - [ _(:3」∠)_ ] c.b.s.n.NettyServer  | environment.user.dir       » /Users/biezhi/workspace/projects/java/hello
2017-10-14 14:12:52:306 INFO - [ _(:3」∠)_ ] c.b.s.n.NettyServer  | environment.java.io.tmpdir » /var/folders/y7/fdpr6jzx1rs6x0jmty2h6lvw0000gn/T/
2017-10-14 14:12:52:306 INFO - [ _(:3」∠)_ ] c.b.s.n.NettyServer  | environment.user.timezone  » Asia/Shanghai
2017-10-14 14:12:52:306 INFO - [ _(:3」∠)_ ] c.b.s.n.NettyServer  | environment.file.encoding  » UTF-8
2017-10-14 14:12:52:306 INFO - [ _(:3」∠)_ ] c.b.s.n.NettyServer  | environment.classpath      » /Users/biezhi/workspace/projects/java/hello/target/classes

                                        ②
							    __, _,   _, __, __,
							    |_) |   /_\ | \ |_
							    |_) | , | | |_/ |
							    ~   ~~~ ~ ~ ~   ~~~
							  :: Blade :: (v2.0.9.ALPHA1)

                                                                            ③
2017-10-14 14:12:52:390 INFO - [ _(:3」∠)_ ] c.b.m.r.RouteMatcher      | Add route GET	/
                                                                            ④
2017-10-14 14:12:53:258 INFO - [ _(:3」∠)_ ] c.b.s.n.NettyServer       | ⬢ Use NioEventLoopGroup
                                                                            ⑤
2017-10-14 14:12:53:461 INFO - [ _(:3」∠)_ ] c.b.s.n.NettyServer       | ⬢ hello initialize successfully, Time elapsed: 176 ms
                                                                            ⑥
2017-10-14 14:12:53:462 INFO - [ _(:3」∠)_ ] c.b.s.n.NettyServer       | ⬢ Blade start with 0.0.0.0:9000
2017-10-14 14:12:53:462 INFO - [ _(:3」∠)_ ] c.b.s.n.NettyServer       | ⬢ Open browser access http://127.0.0.1:9000 ⚡
```

At this time, you can see the response of `Hello World!` by opening a browser and accessing http://127.0.0.1:9000.
