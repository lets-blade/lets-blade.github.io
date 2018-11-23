---
layout: doc
language: en
title: Package And Deploy
---

After reading the previous documentation, you will find that developing web applications using Blade is simple, fast, and of course due to convention.
We use Maven to build the project, and it can be used for packaging as well. If you are familiar with the Maven plugin, you may have used it.
Of course, it doesn't matter if you haven't used it. You just need to configure it as follows.

## Packing project

**add plugin**

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

At this point your terminal should output something like the following:

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

Prove that the package is successful, our package is a jar package, stored in the `target` folder

At this point you can start the program by executing `java -jar target/hello.jar`.

## Deploy to server

Earlier we have packaged the project Ok, just install the `JDK` or `JRE` environment on your server.
Then upload the package you have uploaded (the entire folder is uploaded here, not a jar, as we may modify some configurations).

If you want to access your web application on the extranet, make sure you have the IP && service port of the extranet is open.