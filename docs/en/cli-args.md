---
layout: doc
language: en
title: Terminal parmeters
---

For your convenience, we support modifying some configurations when running a Blade app, such as specifying a port at runtime:

```shell
java -jar blade-app.jar --server.port=9088
```

Of course, some other command line arguments are also supported. Take a look at the following table:

| Command line argument | Description   |  Example  |
| -------- | -----  | ----  |
| server.address | web server address, default is `0.0.0.0` | `--server.address=192.168.1.100` |
| server.port | web server port, default is `9000` | `--server.port=9088` |
| app.env | start the configuration file environment, the default is `application.properties` | `--app.env=prod` |
