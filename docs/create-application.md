---
layout: doc
language: cn
title: 创建一个工程
---


这个指引会带搭建一个简单的『Hello』程序。当然这只是开始，迈出这一步你将感受到 `Blade` 的强大 💪。

> ⚠️ 使用 Blade 必须用 Maven 进行构建，JDK1.8，这是约定。至于用什么IDE看你个人爱好（我更习惯在IDEA下进行编程）

## 创建一个 Maven 工程

创建一个 **普通** 的 `Maven` 工程，**再次提示** Blade 只需要你创建普通的工程！！！跟 Tomcat 什么的没有关系，请摆脱你只会J2EE那套。

创建好后我们需要引入 Blade 依赖，并且配置一下 JDK 编译版本，下面是一个 `pom.xml` 的示例:

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
        <blade-mvc.version>2.1.1.RELEASE</blade-mvc.version>
    </properties>

    <dependencies>
        <!-- mvc dependency -->
        <dependency>
            <groupId>com.hellokaton</groupId>
            <artifactId>blade-core</artifactId>
            <version>${blade-core.version}</version>
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

> ⚠️ 修改这个 `pom.xml` 的同学注意了。请把 `groupId` 和 项目名改掉; 请注意使用较新版本的 `blade-mvc` 依赖

## 项目结构

在此之前，我推荐搭建创建一个基础的 `package`，我们将程序所有的源文件放在 `包` 下面，Java是以 `package` 管理源码的。
那么我的项目结构如下：

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

## 编写运行类

编写**Application.java**

```java
package com.example;

import com.hellokaton.blade.Blade;

public class Application {
    public static void main(String[] args) {
        Blade.create().start(Application.class, args);
    }
}
```

> 创建一个启动类，位于 package 根目录下，使用 `Blade.create()` 静态方法创建 Blade 对象并且启动它。

当然，这个时候你启动它是没有意义的，因为我们还没有编写路由，编写路由最简单的方式就是使用 Blade 的内置方法，
在后面的章节中我们会讲到其他的方式，这里为了简单起见，编写一个 `Hello World` 吧

```java
Blade.create().get("/", ctx -> ctx.text("Hello World!")).start(Application.class, args);
```

此时你启动应用程序，在终端可以看到如下输出：

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
							  :: Blade :: (v2.1.1.RELEASE)

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

这时候你打开浏览器访问 http://127.0.0.1:9000 即可看到 `Hello World!` 的响应。
