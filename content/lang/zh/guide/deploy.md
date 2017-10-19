---
name: 打包部署
permalink: '/guide/deploy'
---

# 打包部署

学完前面的指南，你会发现使用 Blade 开发Web应用是简单的、快速的，当然也功归于约定。
我们使用 Maven 构建项目，打包同时也可以用它，如果你对 Maven 插件熟悉的话可能也用过了，
当然没用过也没关系，你只需要按照下面的操作配置一下即可。

## 打包工程 (Package JAR)

**1. 添加插件**

在 `build -> plugins` 下添加如下2个插件

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

这里简单解释一下几个关键点：

- `${project.build.directory}/dist/`：这个配置指定我们打包完成后将结果输出在 `target/dist` 目录下
- `<descriptor>package.xml</descriptor>`：使用 `package.xml` 决定打包结构，位于项目根目录
- `<phase>package</phase>`：是指插件拦截 `package` 这个生命周期
- `mainClass`：指定启动的 `main` 函数所在类全名称，一般只有一个
- `<Class-Path>resources/</Class-Path>`：将所有的配置文件打包在 `resources` 目录下

**在项目根目录添加 `package.xml`**

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

这个配置一般也不用变动，你非常熟悉这款插件的时候可以详细研究下每个参数的意思，
我们的配置就已经Ok了，现在执行打包命令：

```bash
mvn clean package
```

此时你的终端应该会输出类似如下信息：

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

证明打包成功，我们的包是一个目录，在 `target/dist` 文件夹下存储着你的项目目录，目录结构如下

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

此时你执行 `java -jar hello-0.0.1.jar` 便可启动程序。

## 部署到服务器 (Deploy To Server)

前面我们将项目已经打包Ok了，只需要在你的服务器上安装 `JDK` 或 `JRE` 的环境。
然后将打好的包上传上去（这里上传的是整个文件夹，不是一个jar，因为我们有可能会修改某些配置）。

如果想要在外网访问你的Web程序，请确保你有外网的IP && 你的服务端口是开放的。
