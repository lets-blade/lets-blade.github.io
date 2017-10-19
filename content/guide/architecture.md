---
name: architecture
permalink: '/guide/architecture'
---

# 架构介绍
n
Blade是无意间起的一个名字，始于 2015 年 9 月，目的为个人开发者提供一个除 Spring 系列框架的一个选择。

学习 Blade 搭建 Web 程序，只需要 1 小时，如果你是一个Web开发的老手，也许`20`分钟就够了。

## Blade 是什么? (What is Blade)

1. 一个高效的 MVC 开发框架
2. 是一个自带WebServer的库
3. 帮助开发者快速构建Web程序
4. 源代码不到 `500KB` 的开源框架
5. 简洁优雅的 `API`
6. 好的代码抽象和思维碰撞
7. 你认为是什么就是什么

> 总的来说 Blade 是一款帮助你快速搭建一个 Web 应用程序的开源框架，它的代码简洁，风格优雅，API用起来还不错。
> 如果你愿意阅读它的代码，也花不了你多长时间。

那么问题来了，**Blade 不是什么？**

1. 不是 J2EE 体系下的产物（也就是没有遵循Servlet规范）
2. 不是全家桶（它负责了Web的周边，但更多扩展功能需要自行实现）

## 设计理念 (Design concept)

Blade 的设计参考了诸多语言的Web框架，Node 的 [Express](http://expressjs.com/)，
Python 的 [Flask](http://flask.pocoo.org/)，
Golang 的 [Martini](https://github.com/go-macaron/macaron)。

Blade 秉承 **小而美**、**约定优于配置**、**低耦合、可复用**、**提高生产力** 的设计哲学。

<!-- ### 为什么是 Blade? (Why Blade) -->

<!-- 我们举一个计算机之外的例子，假设你准备要去 -->

### 约定优于配置 (Convention over configuration)

Blade 繁多的配置选项在初始状况下都有一个明智的默认值，并会遵循一些惯例。 
例如，按照惯例，模板和静态文件分别存储在 `ClassPath` 下面的 `templates` 和 `static` 目录中。
虽然这个配置可以修改，但你通常不必这么做，尤其是在刚开始的时候。

## 架构图 (Architecture diagram)

<center>
    <img src="/assets/architecture.png" width="400"/>
</center>

## 生命周期 (The life cycle)

1. 接收客户的请求
2. 执行中间件（如果有的话）
3. 执行WebHook（如果有的话）
4. 执行路由方法
5. 向客户端发送响应
6. 移除当前线程Request、Response

## 框架原理(Framework principle)

这套框架非常简单，能够让你保持良好的代码风格。为了使用Blade完成功能，你需要了解几个概念。

当开发Blade程序时，你作为开发者的责任，是写出能够迎合用户请求（比如：http://localhost:9000 ）的代码，
并将与请求相对应的资源显示出来。（首页页面）

用户请求所执行的代码，被定义于**控制器类**的方法之中。这些方法被称为**路由**（你也可以理解为SpringMvc中的RequestMapping），
而类则称作controller（控制器，一般会用 `@Path` 注解标识）。
用户请求和代码之间的映射关系使用像 `@GetRoute` 这样的注解关联。
浏览器显示的内容一般是通过 `templates`（模板）来输出的。

在下面章节中你将学习Blade控制器、路由、模板中的内部工作流的细节部分。

### Controller 和 路由

```java
@Path
public class IndexController {
    
    @GetRoute("/")
    public String index(){
        return "index.html";
    }

}
```

在Blade程序中，控制器通常是命名中包含`Controller`字样的Java类。

控制器中的方法，被称为路由（Route），它们通常关联着程序中的某个URL，
本例中，`Index`控制器只有一个路由名为`/`，其对应的方法是`index`。

在路由中的代码通常很短，只有10-15行，因为他们只是调用程序的其他部分，
来生成所需的信息，并且负责渲染模板，把结果显示给用户。

在本例中只写了一行，将渲染 `index.html`，程序将在 `templates` 目录下寻找这个模板文件。

**路由**

Blade路由把每一个请求递交给对应的方法来执行，这是通过把程序中的配置好的路由路径，来与请求中的URL进行匹配来实现的。

**模板**

Blade内置了简单的Html模板，但一般不足以应付灵活的Web开发，笔者一般使用 [jetbrick-template](https://github.com/subchen/jetbrick-template-2x) 这款模板引擎作为支持。
当然你可以扩展其他你喜欢的模板引擎。

我们使用了 `return "index.html"` 告诉程序去寻找 `templates/index.html` 模板文件，
你也可以使用 `Response` 对象的 `render` 方法渲染。

