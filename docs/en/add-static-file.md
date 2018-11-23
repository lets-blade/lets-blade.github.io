---
layout: doc
language: en
title: Add Static File
---

Dynamic `web` applications also require static files, typically `CSS` and `JavaScript` files. Ideally your server is already configured to serve your static files. Blade can do the job well during the development process. We create a static resource file in the `resources` directory called `static`, which is located in the `/static` of the application.

> Blade defaults to `static`, `assets`, `webjars`, `upload` folders as static resource directories.
> You can also customize a directory, here we use the `static` directory as the storage.

Prepare a few pictures or put `css`, `js` files in this directory to see my directory structure.

<img src="https://ooo.0o0.ooo/2017/06/23/594bf1203b47f.png" width="300" />

I saved an image in the `static` directory and we started the service access http://127.0.0.1:9000/static/1bd163bc88d4.png

<img src="https://ooo.0o0.ooo/2017/06/23/594bf1982ba40.png" width="500" />

A little excited, we don't have to configure anything, `Blade` has helped me complete the mapping of static resources.

## Custom resource directory

A brother said, I want to try to customize a directory, the name `static` is too low `23333. There are two types of postures for custom static resource directories:

- Set by encoding: `blade.addStatics("/zhuangbi")`
- Via configuration file: `mvc.statics=/zhuangbi`

Let's try:

```java
public static void main(String[] args) {
	Blade.me().addStatics("/zhuangbi").start();
}
```

<img src="https://ooo.0o0.ooo/2017/06/23/594bf3240b9fd.png" width="500" />

In fact, `Blade` provides a small function inside, the default is off, if you want to see the list in the static resource directory can open this skill, there are two ways:

- Set by encoding: `blade.showFileList(true)`
- Via configuration file: `mvc.statics.list=true`

What it looks like after it is turned on

<img src="https://ooo.0o0.ooo/2017/06/23/594bf3eaed28a.png" width="500" />


## What is webjars?

Classmates who have used `SpringBoot` may have used this thing. In fact, the way we refer to static resources can be a `jar` package.

<img src="https://ooo.0o0.ooo/2017/06/23/594bf47c5a532.jpg" width="200" />

The method of use is very simple, you need to add a dependency in `maven`, such as:

```xml
<dependency>
    <groupId>org.webjars</groupId>
    <artifactId>bootstrap</artifactId>
    <version>3.3.7</version>
</dependency>
```

Start service access at this time  http://127.0.0.1:9000/webjars/bootstrap/3.3.7/css/bootstrap.css

<img src="https://ooo.0o0.ooo/2017/06/23/594bf54d74703.png" width="500" />

Come, the time to witness the miracle is here. If you are interested in `webjars`, you can find more at [https://www.webjars.org/](https://www.webjars.org/).

We need to enter `http://127.0.0.1:9000/static/t2.png` to access static resources.
Used in the template is `/static/index.css`.