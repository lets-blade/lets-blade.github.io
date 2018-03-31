---
title: Quick start
categories: docs
comments: false
---

This guide will be used to build a simple "Hello" program. This is only the beginning, of course. You will feel the strength of the Blade in this step. 💪

> ⚠️ use Blade must use Maven to build, JDK1.8, this is agreed. As for what IDE to use for your personal hobbies (I'm more used to programming under IDEA)

## Create a Maven project

Create a **normal** Maven project, **again prompt** Blade only need you to create ordinary project!!! There's no relationship to Tomcat or anything. Please get rid of your J2EE.

Once created, we need to introduce a Blade dependency and configure the JDK compilation version, which is an example of a `pom.xml`:


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
        <blade-mvc.version>2.0.7-R2</blade-mvc.version>
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

> ⚠️ The student who modified this `pom.xml` has noticed. Please change the `groupId` and project name. Note the use of a newer version of the `blade-mvc` dependency.

## Project Structure

Before that, I recommend building a basic `package`, which we place all the source files under the `package`, and Java is the `package` management source.

Then my project structure is as follows:


```bash
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

## Write runtime class

write a **Application.java**

```java
package com.example;

import com.blade.Blade;

public class Application {
    public static void main(String[] args) {
        Blade.me().start(Application.class, args);
    }
}
```

> Create a startup class, located in the root of the package, create a Blade object using the Blade.me() method and launch it.

Of course, this time you start it does not make sense, because we have not prepared a route, the easiest way to write a route is to use Blade's built-in methods, In the following chapters we will talk about other ways, here for the sake of simplicity, write a `Hello World`

```java
Blade.me()
    .get("/", (req, res) -> res.text("Hello World!"))
    .start(Application.class, args);
```

At this point you start the application, the terminal can see the following output:

```bash
---
                                                                            ①
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
							  :: Blade :: (v2.0.7-R2)

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

This time you open the browser to visit http://127.0.0.1:9000 you can see the `Hello World!` Response.

## What did it do?

Let's briefly explain these terminals log terminal, so that you are more familiar with the framework of the mechanism.

Blade uses `slf4j-api` as the logging interface and by default provides a simple log implementation (modified from **simple-logger**) so you can see the log output at startup.

> ✨ Why Blade does not implement its own log framework? Most developers will use other libraries to help him complete the application development, and most of the Java library will use `slf4j-api` for developers to better expansion.
> Here we are the same, do not let you use two log services in a program. How to replace the log? As long as the exclusion out of the blade-log access you are familiar with it.

**Start the log**

We can know what Blade has done by looking at the startup log. I use the number of places to explain one by one (may be relatively small).

1. This part of the log print your program environment, including ** JDK version of the program directory, temporary directory, time zone, encoding, classpath **
2. This is where the banner and version information for Blade is printed
3. Here you have to register the routing output
4. Here to export your current Netty `EventLoopGroup`, the default is` NioEventLoopGroup`, the pursuit of performance can be configured as `EpollEventLoopGroup`
5. Here the project has been initialized, at the same time the output start up how many milliseconds
6. Output IP and port occupied by `Blade` startup, the default is 9000

The last line prompts you to open the browser to visit the address :)
