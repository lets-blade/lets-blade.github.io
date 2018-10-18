---
layout: doc
language: cn
title: 配置文件
---

在 Web 开发中配置是一个非常常用的功能，笔者认为没有绝对的零配置，即便是编码也属于配置，
而且编码写入的配置在Java语言中需要重新编码才可修改，而生产环境中去修改代码是很麻烦的一件事。

Blade中配置的概念更加简化，当然即便你不使用配置文件也可以完全保证你的项目正常运行，
但开发程序落地到每位工程师手上就像是魔法一样，保不齐谁会有大胆的想法，我们满足你。

## 创建配置文件

我们约定在先，创建的配置文件名为 `application.properties`，位于 `classpath` 之下。

```bash
app.name=我可爱的程序
app.version=0.0.1
jdbc.url=jdbc:mysql://127.0.0.1:3306/app
jdbc.username=root
jdbc.password=123456
com.blade.logger.dir=./logs
```

这是一份简单的，常见的配置，在这份配置文件中我们指定了程序的名称、版本，JDBC的配置，和日志文件的存储位置。

## 获取配置

有些时候我们需要在程序中获取配置，比如我需要将 `app.version` 中的版本号展示在网页上，
那么只需要在路由执行的时候或者启动的时候获取配置，然后存储在 `Request#attribute` 中即可。

**启动时获取配置**

```java
Blade.of()
     .on(EventType.SERVER_STARTED, e -> {
        String version = WebContext.blade().env("app.version", "0.0.1");
        // 然后将 version 变量存储到一个常量字段中以便长期使用
     });
```

**路由执行时获取**

```java
public void someRoute(){
    String version = WebContext.blade().env("app.version", "0.0.1");
}
```

上面的写法比较粗暴，有时候我们更习惯在加载模板引擎配置或者数据库配置的时候来做，
下面举个例子，我将数据库配置和模板配置一起加载，编写一个实现了 `BladeLoader` 接口的配置类。

```java
@Bean
public class LoadConfig implements BladeLoader {

    @Override
    public void load(Blade blade) {
        String version = blade.env("app.version", "0.0.1");

        // 配置数据库
        DruidDataSource dataSource = new DruidDataSource();

        dataSource.setDriverClassName("jdbc.driver");
        dataSource.setUrl("jdbc.url");
        dataSource.setUsername("jdbc.username");
        dataSource.setPassword("jdbc.password");

        dataSource.setInitialSize(5);
        dataSource.setMaxActive(5);
        dataSource.setMinIdle(2);
        dataSource.setMaxWait(6000);

        Anima.open(dataSource);

        // 配置模板引擎
        JetbrickTemplateEngine templateEngine = new JetbrickTemplateEngine();
        templateEngine.getGlobalContext().set("version", version);
        blade.templateEngine(templateEngine);
    }
}
```

> 这里数据库使用了 `druid` 连接池，模板引擎使用 `blade-template-jetbrick`

我们将读取到的 `version` 通过模板引擎上下文对象存储进去，在所有模板中使用 `${version}` 使用。

## 配置清单

### 基础配置

| 配置        | 描述   |  默认值  |
| --------   | -----  | ----  |
| server.address | web服务地址 | 0.0.0.0 |
| server.port | web服务端口 | 9000 |
| app.devMode | 是否是开发者模式 | true |
| app.name | 应用名称 | blade |
| app.thread-name | 启动线程名 | _(:3」∠)_ |
| app.banner-path | 启动banner路径 | NULL |
| app.context-path | 应用上下文路径 | / |
| app.task.thread-count | 任务执行线程 | 当前 CPU 核心数 * 2 + 1 |

> 开发者模式下异常会输出在网页上，而生产环境应避免

### MVC 配置

| 配置        | 描述   |  默认值  |
| --------   | -----  | ----  |
| mvc.view.404 | 404页面地址 | 无 |
| mvc.view.500 | 500页面地址 | 无 |
| mvc.statics | 静态资源目录，多个用逗号隔开. | /static/,/upload/ |
| mvc.statics.show-list | 是否显示文件列表，显示后类似于FTP服务 | false |
| mvc.template.path | 模板文件目录,位于classpath | templates |

### HTTP 配置

| 配置        | 描述   |  默认值  |
| --------   | -----  | ----  |
| http.gzip.enable | 是否开启gzip压缩 | false |
| http.cors.enable | 是否开启cors | false |
| http.session.key | session在cookie中的id | SESSION |
| http.session.timeout | session超时时长，单位/秒 | 1800 |
| http.auth.username | basic认证用户名，当开启Basic认证时需要 | 无 |
| http.auth.password | basic认证密码，当开启Basic认证时需要 | 无 |

### SSL配置

当你想直接使用 Blade 来搭建一个 `https` 的站点时可以用到这个配置，但是笔者不是特别推荐这种做法。
如果你的服务器只有一个站点你可以这么干，否则还是乖乖使用 `nginx` 这样的专业户吧。

| 配置        | 描述   |  默认值  |
| --------   | -----  | ----  |
| server.ssl.enable | 是否开启SSL | false |
| server.ssl.cert-path | X.509 certificate chain 文件，如 cert.pem | NULL |
| server.ssl.private-key-path | 私钥路径，如 private.pem | NULL |
| server.ssl.private-key-pass | 私钥密码(如果有的话) | NULL |

## 最佳实践

我们通过上面的讲解和示例大概清楚了配置文件是如何玩转的，这里还有一些小技巧需要告诉你。

1. 参数前缀妙用
2. 配置环境区分

**参数前缀妙用**

我们在前面的例子中可以感受到读取配置文件是一件简单的事情，当参数过多的情况下面我们可以通过不同前缀来标识不同配置场景。
比如使用 `jdbc` 开头表示数据库配置，`mail` 开头表示邮件相关配置等等。

在Blade中支持根据前缀获取配置，像前面的示例我们可以修改成这样：

```java
Environment environment = blade.environment();
Map<String, Object> map = environment.getPrefix("jdbc");
if (map.containsKey("database")) {
    JdbcConfig jdbcConfig = JdbcConfig.builder()
            .driver("com.mysql.jdbc.Driver")
            .url(map.get("url").toString())
            .username(map.get("username").toString())
            .password(map.get("password").toString())
            .build();
}
```

Java语言是一门面向对象的语言，很多时候我们会将数据转为对象进行管理，那么前面以 `jdbc` 开头的配置就可以用如上代码表示。
当配置种类多的时候，编写一个类专门读取配置，用对象进行操作。

**配置环境区分**

有些时候本地的环境配置和生产是有区别的，比如数据库配置，那么最笨的办法就是上线后修改一下生产环境的配置。
为了解决这个问题 Blade 用环境配置的方式改善使用，我们认为 `application.properties` 是一份默认的配置文件，
用户可以扩展它，那么在启动的时候你的环境配置会覆盖默认配置。

假设我的生产环境数据库配置和本地不同的，但其他是相同的，那么怎么做呢？

_保留当前配置创建一份生产环境配置_

命名为 `application-prod.properties`，和 `application.properties` 文件处于同目录。

```bash
jdbc.url=jdbc:mysql://10.33.**.44:3328/app
jdbc.username=username
jdbc.password=passs**word
```

只需要这样做就可以了，我们可以看到相同的地方还会使用 `application.properties` 文件内容，
而不同的在新的环境配置中体现，在启动的时候只要加环境参数就可以了。

```bash
java -jar app.jar --app.env=prod
```