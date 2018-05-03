---
layout: doc
language: cn
title: 打包部署
---

看完前面的文档，你会发现使用 Blade 开发Web应用是简单的、快速的，当然也功归于约定。
我们使用 Maven 构建项目，打包同时也可以用它，如果你对 Maven 插件熟悉的话可能也用过了，
当然没用过也没关系，你只需要按照下面的操作配置一下即可。

## 打包工程

**添加插件**

```xml
<build>
    <finalName>hello</finalName>
    <plugins>
        <!-- Compile -->
        <plugin>
            <groupId>org.apache.maven.plugins</groupId>
            <artifactId>maven-compiler-plugin</artifactId>
            <version>3.1</version>
            <configuration>
                <source>1.8</source>
                <target>1.8</target>
                <encoding>UTF-8</encoding>
            </configuration>
        </plugin>
        <plugin>
            <artifactId>maven-assembly-plugin</artifactId>
            <configuration>
                <finalName>${project.build.finalName}</finalName>  
                <appendAssemblyId>false</appendAssemblyId>  
                <archive>
                    <manifest>
                        <mainClass>com.example.Application</mainClass>
                    </manifest>
                </archive>
                <descriptorRefs>
                    <descriptorRef>jar-with-dependencies</descriptorRef>
                </descriptorRefs>
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
    </plugins>
</build>
```

```bash
mvn clean package -DskipTests
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
[INFO] ------------------------------------------------------------------------
[INFO] BUILD SUCCESS
[INFO] ------------------------------------------------------------------------
[INFO] Total time: 4.211 s
[INFO] Finished at: 2017-10-19T22:42:41+08:00
[INFO] Final Memory: 18M/253M
[INFO] ------------------------------------------------------------------------
```

证明打包成功，我们的包是一个jar包，在 `target` 文件夹下存储

此时你执行 `java -jar target/hello.jar` 便可启动程序。

## 部署到服务器

前面我们将项目已经打包Ok了，只需要在你的服务器上安装 `JDK` 或 `JRE` 的环境。
然后将打好的包上传上去（这里上传的是整个文件夹，不是一个jar，因为我们有可能会修改某些配置）。

如果想要在外网访问你的Web程序，请确保你有外网的IP && 你的服务端口是开放的。
