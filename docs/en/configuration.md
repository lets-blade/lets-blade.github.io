---
layout: doc
language: en
title: Configuration
---

Configuration in Web development is a very common feature, I believe that there is no absolute zero configuration, even if the encoding is a configuration,
Moreover, the configuration of code writing needs to be re-encoded in the Java language to be modified, and it is very troublesome to modify the code in the production environment.

The concept of configuration in Blade is more simplified, of course, even if you do not use the configuration file, you can completely guarantee the normal operation of your project.
But the development of the program to the hands of every engineer is like magic, who will have a bold idea, we will meet you.

## Create configuration file
 
We agreed that the configuration file created earlier is named `application.properties` and is located under `classpath`.

```bash
app.name=HelloBlade
app.version=0.0.1
jdbc.url=jdbc:mysql://127.0.0.1:3306/app
jdbc.username=root
jdbc.password=123456
com.blade.logger.dir=./logs
```

This is a simple, common configuration in which we specify the name, version, JDBC configuration, and location of the log files.

## Read configuration

Sometimes we need to get the configuration in the program, for example, I need to display the version number in `app.version` on the webpage.
Then you only need to get the configuration when the route is executed or at startup, and then store it in `Request#attribute`.

**Get configuration at startup**

```java
Blade.of()
     .on(EventType.SERVER_STARTED, e -> {
        String version = WebContext.blade().env("app.version", "0.0.1");
        // Then store the version variable in a constant field for long-term use
     });
```

**Obtained when the route is executed**

```java
public void someRoute(){
    String version = WebContext.blade().env("app.version", "0.0.1");
}
```

The above is more rude, sometimes we are more accustomed to loading the template engine configuration or database configuration.
Let's take an example. I load the database configuration along with the template configuration and write a configuration class that implements the `BladeLoader` interface.

```java
@Bean
public class LoadConfig implements BladeLoader {

    @Override
    public void load(Blade blade) {
        String version = blade.env("app.version", "0.0.1");

        // configuration database
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

        // configuration template engine
        JetbrickTemplateEngine templateEngine = new JetbrickTemplateEngine();
        templateEngine.getGlobalContext().set("version", version);
        blade.templateEngine(templateEngine);
    }
}
```

> Here the database uses the `druid` connection pool and the template engine uses `blade-template-jetbrick`

We will read the `version` stored in the template engine context object and use `${version}` in all templates.

## Configuration list

### Basic configuration

| Configuration | Description | Default Value |
| --------   | -----  | ----  |
| server.address | web server address | 0.0.0.0 |
| server.port | web server port | 9000 |
| app.devMode | is it a developer mode | true |
| app.name | app name | blade |
| app.thread-name | start thread name | _(:3」∠)_ |
| app.banner-path | start banner path | NULL |
| app.context-path | context path | / |
| app.task.thread-count | task thread count | CPU Core*2 + 1 |

> Exceptions in developer mode are output on the web, and the production environment should be avoided

### MVC configuration

| 配置        | 描述   |  默认值  |
| --------   | -----  | ----  |
| mvc.view.404 | 404页面地址 | 无 |
| mvc.view.500 | 500页面地址 | 无 |
| mvc.statics | 静态资源目录，多个用逗号隔开. | /static/,/upload/ |
| mvc.statics.show-list | 是否显示文件列表，显示后类似于FTP服务 | false |
| mvc.template.path | 模板文件目录,位于classpath | templates |

### HTTP configuration

| Configuration | Description | Default Value |
| --------   | -----  | ----  |
| http.gzip.enable | enable gzip compression | false |
| http.cors.enable | enable cors compression | false |
| http.session.key | session id in cookie | SESSION |
| http.session.timeout | session timeout, unit/seconds | 1800 |

### SSL configuration

This configuration can be used when you want to use Blade directly to build a `https` site, but I don't recommend this.
If your server has only one site, you can do this, otherwise you should use a professional user like `nginx`.

| Configuration | Description | Default Value |
| --------   | -----  | ----  |
| server.ssl.enable | enable SSL | false |
| server.ssl.cert-path | X.509 certificate chain file path, e.g: `cert.pem` | NULL |
| server.ssl.private-key-path | private key file path, e.g: `private.pem` | NULL |
| server.ssl.private-key-pass | private key password(if so) | NULL |

## Best Practices

We have probably explained how the configuration file is played through the above explanations and examples. Here are some tips to tell you.

1. Parameter prefix magic
2. Configuration environment differentiation

**Parameter prefix magic**

In the previous example, we can feel that reading the configuration file is a simple matter. When there are too many parameters, we can identify different configuration scenarios with different prefixes.
For example, use `jdbc` to start with the database configuration, and `mail` to indicate the mail-related configuration.

Support for getting configurations based on prefixes in Blade, like the previous example we can modify to this:

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
The Java language is an object-oriented language. Many times we convert data to objects for management. The configuration that starts with `jdbc` can be represented by the above code.
When there are many types of configuration, write a class to read the configuration and use the object to operate.

**Configuration environment distinction**

Sometimes the local environment configuration and production are different, such as database configuration, then the most stupid way is to modify the configuration of the production environment after going online.
To solve this problem, Blade uses environment configuration to improve usage. We think `application.properties` is a default configuration file.
Users can extend it, and your environment configuration will override the default configuration at startup.

Suppose my production environment database configuration is different from the local one, but the others are the same, so how do I do this?

_Retain current configuration to create a production environment configuration_

named `application-prod.properties` and `application.properties` files are in the same directory.

```shell
jdbc.url=jdbc:mysql://10.33.**.44:3328/app
jdbc.username=username
jdbc.password=passs**word
```

Just do this, we can see that the same place will also use the `application.properties` file content.
Different in the new environment configuration, you only need to add environmental parameters when starting up.

```bash
java -jar app.jar --app.env=prod
```