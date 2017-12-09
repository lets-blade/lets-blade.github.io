---
title: Deployment
categories: docs
comments: false
---

After reading the previous document, you will find the use of Blade development of Web applications is simple, fast, of course, also contributed to the agreement.
We use Maven to build the project, package it and use it at the same time, if you are familiar with the Maven plug-in may also be used,
Of course, never used it does not matter, you only need to follow the configuration below can be configured.

## Packing project

**1. Add plugin**

Add the following 2 plugins under `build -> plugins`.

```xml
<plugin>
    <artifactId>maven-assembly-plugin</artifactId>
    <configuration>
        <appendAssemblyId>false</appendAssemblyId>
        <descriptors>
            <descriptor>package.xml</descriptor>
        </descriptors>
        <outputDirectory>${project.build.directory}/dist/</outputDirectory>
    </configuration>
    <executions>
        <execution>
            <id>make-assembly</id>
            <phase>package</phase>
            <goals>
                <goal>single</goal>
            </goals>
        </execution>
    </executions>
</plugin>
<plugin>
    <groupId>org.apache.maven.plugins</groupId>
    <artifactId>maven-jar-plugin</artifactId>
    <version>2.4</version>
    <configuration>
        <archive>
            <manifest>
                <mainClass>com.example.Application</mainClass>
                <classpathPrefix>lib/</classpathPrefix>
                <addClasspath>true</addClasspath>
            </manifest>
            <manifestEntries>
                <Class-Path>resources/</Class-Path>
            </manifestEntries>
        </archive>
    </configuration>
</plugin>
```

Here are a few key points to explain briefly:

- `${project.build.directory}/dist/`：After the specified package is complete, the result is output in `target/dist` directory
- `<descriptor>package.xml</descriptor>`：Use `package.xml` to determine the packaging structure, located in the project root directory
- `<phase>package</phase>`：Intercept `package` this life cycle
- `mainClass`：Specified to start the `main` function of the class name, usually only one
- `<Class-Path>resources/</Class-Path>`：Package all the configuration files in the resources directory

**Add in project root directory `package.xml`**

```xml
<assembly xmlns="http://maven.apache.org/plugins/maven-assembly-plugin/assembly/1.1.2"
          xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
          xsi:schemaLocation="http://maven.apache.org/plugins/maven-assembly-plugin/assembly/1.1.2 http://maven.apache.org/xsd/assembly-1.1.2.xsd">

    <id>customAssembly</id>
    <!-- dir -->
    <formats>
        <format>dir</format>
    </formats>

    <includeBaseDirectory>false</includeBaseDirectory>

    <fileSets>
        <fileSet>
            <directory>src/main/resources/</directory>
            <outputDirectory>/resources</outputDirectory>
        </fileSet>
    </fileSets>
    
    <dependencySets>
        <dependencySet>
            <outputDirectory>/lib</outputDirectory>
            <scope>runtime</scope>
            <excludes>
                <exclude>${project.groupId}:${project.artifactId}</exclude>
            </excludes>
        </dependencySet>
        <dependencySet>
            <outputDirectory>/</outputDirectory>
            <includes>
                <include>${project.groupId}:${project.artifactId}</include>
            </includes>
        </dependencySet>
    </dependencySets>

</assembly>
```

This configuration generally do not change, you are very familiar with this plug-in time can be detailed under the meaning of each parameter,
Our configuration is already Ok, and now execute the package command:

```bash
mvn clean package -DskipTests
```

> If you want to get the configuration simple, you can change the configuration Copy in [This Project](https://github.com/lets-blade/blade-demos/tree/master/blade-package).

At this point your terminal should output something similar to the following:

```bash
[INFO] Scanning for projects...
[WARNING]
[WARNING] Some problems were encountered while building the effective model for com.example:hello:jar:0.0.1
[WARNING] 'build.plugins.plugin.version' for org.apache.maven.plugins:maven-compiler-plugin is missing. @ line 80, column 21
[WARNING]
[WARNING] It is highly recommended to fix these problems because they threaten the stability of your build.
[WARNING]
[WARNING] For this reason, future Maven versions might no longer support building such malformed projects.
[WARNING]
[INFO]
[INFO] ------------------------------------------------------------------------
[INFO] Building hello 0.0.1
[INFO] ------------------------------------------------------------------------
[INFO]
[INFO] --- maven-clean-plugin:2.5:clean (default-clean) @ hello ---
[INFO] Deleting /Users/biezhi/workspace/projects/blade/hello/target
[INFO]
[INFO] --- maven-resources-plugin:2.6:resources (default-resources) @ hello ---
[WARNING] Using platform encoding (UTF-8 actually) to copy filtered resources, i.e. build is platform dependent!
[INFO] Copying 0 resource
[INFO]
[INFO] --- maven-compiler-plugin:3.1:compile (default-compile) @ hello ---
[INFO] Changes detected - recompiling the module!
[INFO] Compiling 2 source files to /Users/biezhi/workspace/projects/blade/hello/target/classes
[INFO]
[INFO] --- maven-resources-plugin:2.6:testResources (default-testResources) @ hello ---
[INFO] Not copying test resources
[INFO]
[INFO] --- maven-compiler-plugin:3.1:testCompile (default-testCompile) @ hello ---
[INFO] Not compiling test sources
[INFO]
[INFO] --- maven-surefire-plugin:2.12.4:test (default-test) @ hello ---
[INFO] Tests are skipped.
[INFO]
[INFO] --- maven-jar-plugin:2.4:jar (default-jar) @ hello ---
[INFO] Building jar: /Users/biezhi/workspace/projects/blade/hello/target/hello.jar
[INFO]
[INFO] --- maven-assembly-plugin:2.2-beta-5:single (make-assembly) @ hello ---
[INFO] Reading assembly descriptor: package.xml
[INFO] Copying files to /Users/biezhi/workspace/projects/blade/hello/target/dist/hello
[WARNING] Assembly file: /Users/biezhi/workspace/projects/blade/hello/target/dist/hello is not a regular file (it may be a directory). It cannot be attached to the project build for installation or deployment.
[INFO] ------------------------------------------------------------------------
[INFO] BUILD SUCCESS
[INFO] ------------------------------------------------------------------------
[INFO] Total time: 4.211 s
[INFO] Finished at: 2017-10-19T22:42:41+08:00
[INFO] Final Memory: 18M/253M
[INFO] ------------------------------------------------------------------------
```

Prove packaging successful, our package is a directory, in your `target/dist` folder store your project directory, the directory structure is as follows

```bash
# biezhi in ~/workspace/projects/blade/hello/target/dist/hello
» tree
.
├── hello-0.0.1.jar
├── lib
│   ├── blade-log-0.0.5.jar
│   ├── blade-mvc-2.0.3-beta.jar
│   ├── lombok-1.16.18.jar
│   ├── netty-buffer-4.1.16.Final.jar
│   ├── netty-codec-4.1.16.Final.jar
│   ├── netty-codec-http-4.1.16.Final.jar
│   ├── netty-common-4.1.16.Final.jar
│   ├── netty-handler-4.1.16.Final.jar
│   ├── netty-resolver-4.1.16.Final.jar
│   ├── netty-transport-4.1.16.Final.jar
│   └── slf4j-api-1.7.21.jar
└── resources
    ├── app.properties
    ├── static
    └── templates
        └── index.html

4 directories, 14 files
```

At this point you execute `java -jar hello-0.0.1.jar` to start the application.

## Deploy to server

In front of the project we have packaged Ok, just need to install `JDK` or `JRE` on your server environment of.
Then upload the uploaded package up (here is the entire folder is uploaded, not a jar, because we may modify some of the configuration).

If you want to access your Web application in the extranet, make sure you have extranet IP && your service port is open.
