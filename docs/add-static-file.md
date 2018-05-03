---
layout: doc
language: cn
title: 添加静态文件
---

动态的 `web` 应用也需要静态文件，一般是 `CSS` 和 `JavaScript` 文件。理想情况下你的 服务器已经配置好了为你的提供静态文件的服务。在开发过程中， Blade 也能做好这个工作。我们在 `resources` 目录下创建一个名为 `static` 的文件夹存储静态资源文件，静态文件位于 应用的 `/static` 中。

> Blade 默认设置了 `static`、`assets`、`webjars`、`upload` 文件夹皆为静态资源目录。
> 你也可以自定义设置某个目录，这里我们就使用 `static` 目录作为存储。

准备几张图片或者 `css`、`js` 文件放在该目录下，来看看我的目录结构

<img src="https://ooo.0o0.ooo/2017/06/23/594bf1203b47f.png" width="300" />

我在 `static` 目录下存了一张图片，我们来启动服务访问 http://127.0.0.1:9000/static/1bd163bc88d4.png

<img src="https://ooo.0o0.ooo/2017/06/23/594bf1982ba40.png" width="500" />

是不是有点小激动，我们什么都不用配置，`Blade`已经帮我完成了静态资源的映射。

## 自定义资源目录

有位兄弟说了，我想试试自定义一个目录，`static` 这个名字太 `low` 了 23333。自定义静态资源目录的姿势有2种：

- 通过编码设置：`blade.addStatics("/zhuangbi")`
- 通过配置文件：`mvc.statics=/zhuangbi`

我们来试试：

```java
public static void main(String[] args) {
	Blade.me().addStatics("/zhuangbi").start();
}
```

<img src="https://ooo.0o0.ooo/2017/06/23/594bf3240b9fd.png" width="500" />

实际上 `Blade` 内部提供了一个小功能，默认的关闭的，如果你希望看到静态资源目录下的列表可以开启这项技能，也是两种方式：

- 通过编码设置：`blade.showFileList(true)`
- 通过配置文件：`mvc.statics.list=true`

开启之后的样子

<img src="https://ooo.0o0.ooo/2017/06/23/594bf3eaed28a.png" width="500" />


## webjars是什么鬼？

使用过 `SpringBoot` 的同学可能用过这个东西，实际上我们引用静态资源的方式可以是一个 `jar` 包。

<img src="https://ooo.0o0.ooo/2017/06/23/594bf47c5a532.jpg" width="200" />

使用方法非常简单，你需要在 `maven` 的中加入一个依赖，比如:

```xml
<dependency>
    <groupId>org.webjars</groupId>
    <artifactId>bootstrap</artifactId>
    <version>3.3.7</version>
</dependency>
```

这时候启动服务访问 http://127.0.0.1:9000/webjars/bootstrap/3.3.7/css/bootstrap.css

<img src="https://ooo.0o0.ooo/2017/06/23/594bf54d74703.png" width="500" />

来，见证奇迹的时刻到了。如果你对 `webjars` 感兴趣，可以在 https://www.webjars.org/ 找到更多。

我们访问静态资源需要输入 `http://127.0.0.1:9000/static/t2.png` 即可，
在模板中使用则是 `/static/index.css`。