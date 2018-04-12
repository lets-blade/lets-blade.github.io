---
title: Configuration
categories: docs
comments: false
---

Configuration in the Web development is a very common feature, I think there is no absolute zero configuration, even if the encoding also belongs to the configuration,
And the configuration of encoding and writing in the Java language need to re-encoding can be modified, and to modify the code in the production environment is a very troublesome thing.

Bla e in the configuration of the concept more streamlined, of course, even if you do not use the configuration file can also fully guarantee the normal operation of your project,
But the development process landed on the hands of each engineer is like magic, Paul missing who will have a bold idea, we meet you.

## Create a profile

We agreed earlier, create the configuration file named 'app.properties`, located in the `classpath` under.

```bash
app.name=My cute program
app.version=0.0.1
jdbc.url=jdbc:mysql://127.0.0.1:3306/app
jdbc.username=root
jdbc.password=123456
com.blade.logger.logFile=./logs/app.log
```

This is a simple, common configuration that we specify in this configuration file Program name, version, JDBC configuration, and log file storage location.

## Get the configuration

Sometimes we need to get the configuration in the program, for example, I need `app.version` In the version number displayed on the page,
Then only need to get the configuration when the route is executed or at startup, and then stored in `Request.attribute`.

**Get configuration on startup**

```java
Blade.me()
    .onStarted(blade -> {
        String version = blade.environment().get("app.version", "0.0.1");
        // Then store the version variable in a constant field for long-term use
    });
```

**Route Execution Get**

```java
public void someRoute(){
    String version = WebContext.blade().environment().get("app.version", "0.0.1");
}
```

The above wording more rude, and sometimes we are more accustomed to loading the template engine configuration or database configuration to do,
For example, I will load the database configuration and template configuration, write a configuration class that implements the `BeanProcessor` interface.

```java
@Bean
public class LoadConfig implements BeanProcessor {

    @Override
    public void processor(Blade blade) {
        String version = blade.environment().get("app.version", "0.0.1");

        // configure the database
        DruidDataSource dataSource = new DruidDataSource();

        dataSource.setDriverClassName("jdbc.driver");
        dataSource.setUrl("jdbc.url");
        dataSource.setUsername("jdbc.username");
        dataSource.setPassword("jdbc.password");

        dataSource.setInitialSize(5);
        dataSource.setMaxActive(5);
        dataSource.setMinIdle(2);
        dataSource.setMaxWait(6000);

        Base.open(dataSource);

        // Configure the template engine
        JetbrickTemplateEngine templateEngine = new JetbrickTemplateEngine();
        templateEngine.getGlobalContext().set("version", version);
        blade.templateEngine(templateEngine);
    }
}
```

> Database used `druid` connection pool, template engine `blade-template-jetbrick`

The `version` we will read in is stored in the template engine context object and is used with `${version}` in all templates.

## configuration list

### basic configuration

| Configuration | Description | Default |
| -------- | ----- | ---- |
| server.address | web service address | `0.0.0.0` |
| server.port | web service port | `9000` |
| app.devMode | is it developer mode | `true` |
| app.name | application name | `blade` |
| app.thread-name | start Thread Name | `_ (: 3 "∠) _` |
| app.banner-path | start banner path | `NULL` |
| app.context-path | app context path | / |
| app.task.thread-count | task execution thrad | CPU core * 2 + 1 |

> Developer mode exception will be output on the page, and the production environment should be avoided

### MVC configuration

| Configuration | Description | Default |
| -------- | ----- | ---- |
| mvc.view.404 | 404 Page Address | None |
| mvc.view.500 | 500 Page Address | None |
| mvc.statics | Static resource directories, separated by commas. | /static/, /upload/ |
| mvc.statics.show-list | Whether to display a file list that looks similar to the FTP service | false |
| mvc.template.path | Template file directory, located in classpath | templates |

### HTTP configuration

| Configuration | Description | Default |
| -------- | ----- | ---- |
| http.gzip.enable | Whether to turn gzip compression on | false |
http.cors.enable | Whether to turn on cors | false |
| http.session.key | session id in the cookie | SESSION |
| http.session.timeout | session timeout period in minutes | 1800 |
http.auth.username | basic Authentication user name, required when opening Basic authentication | None |
http.auth.password | basic authentication password, when opening Basic authentication required | no |

### SSL configuration

When you want to use Blade directly to build a `https` Site can use this configuration, but I do not specifically recommend this approach.
If your server has only one site you can do it, or obediently use `nginx` such a professional it.

| Configuration | Description | Default |
| -------- | ----- | ---- |
| server.ssl.enable | Whether to enable SSL | false |
| server.ssl.cert-path | X.509 certificate chain file, such as cert.pem | NULL |
| server.ssl.private-key-path | private key path, such as private.pem | NULL |
| server.ssl.private-key-pass | private key password (if any) | NULL |

### Log configuration

Blade uses `slf4j-api` as the logging interface. For your convenience, the` slf4j-simple` implementation has been built in by default, with minor changes.
The maven coordinate name is `blade-log`, source [here](https://github.com/bladejava/blade-log)

```bash
# Configure the log level
# Log level options ("trace", "debug", "info", "warn", or "error").
# If you do not configure the default is "info".
# com.blade.logger.rootLevel=info

# Configure the log level of a package or class
# com.blade.logger.xxxxx=
# com.blade.logger.org.sql2o.Query=debug

# Display date and time
# com.blade.logger.showDate=false

# Date formatting
# com.blade.logger.datePattern=yyyy-MM-dd HH:mm:ss:SSS Z

# Show thread name
# com.blade.logger.showThread=true

# Set to true if you want to include the Logger instance name in the output message.
# Default is true
# com.blade.logger.showLogName=true

# Set to true if you want to include the last component of the name in the output message.
# The default is true
# com.blade.logger.shortName=true

# Set the log file path
# com.blade.logger.dir=./logs

# Set the log file name, default get app.name
# com.blade.logger.name=sample
```

## Best Practices

We through the above explanations and examples of the configuration file is clear how the fun, there are some tips to tell you.

1. The magic parameter prefix
2. Configuration environment distinction

**parameter prefix magic**

We can feel in the previous example read the configuration file is a simple matter, in the case of too many parameters below we can use different prefix to identify different configuration scenarios.
For example using `jdbc` At the beginning that the database configuration, `mail` at the beginning that mail-related configuration and so on.

In the Blade support prefix configuration based on the prefix, as in the previous example we can modify as follows:

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
}
```

Java language is an object-oriented language, a lot of time we will convert the data into objects for management, so in front of `jdbc` The beginning of the configuration can use the above code.
When the type of configuration, write a class specialized read configuration, object operation.

**Configuration Environment Division**

Sometimes the local environment configuration and production are different, such as database configuration, then the most stupid way is to After changing the configuration of the production environment.
In order to solve this problem, Blade uses environment configuration to improve its usage. We think `app.properties` Is a default configuration file,
The user can extend it, then your environment configuration overrides the default configuration at startup.

Suppose my production environment database configuration and local different, but the other is the same, then how to do it?

_Keep the current configuration Create a production configuration_ Named `app-prod.properties`, it is in the same directory as the` app.properties` file.

```bash
jdbc.url=jdbc:mysql://10.33.**.44:3328/app
jdbc.username=username
jdbc.password=passs**word
```

Only need to do this, we can see the same place will use `app.properties` file content,
And different in the new environment configuration reflected in the startup as long as the environment parameters can be added.

```bash
java -jar app.jar --blade.env=prod
```