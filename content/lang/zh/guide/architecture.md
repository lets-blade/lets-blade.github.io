---
name: architecture
permalink: '/guide/architecture'
---

# 架构介绍

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

## 路由概念(Route Concept)

在 Blade 路由是一个请求的最小单位，可以理解为 SpringMvc 中的 RequestMapping。

<!-- ## 组件概览 (Overview of the components) -->

<!-- | 生命周期方法                  | 什么时候被调用                                    | -->
<!-- |-----------------------------|--------------------------------------------------| -->
<!-- | `componentWillMount`        | 在一个组件被渲染到 DOM 之前                         | -->
<!-- | `componentDidMount`         | 在一个组件被渲染到 DOM 之后      					 | -->
<!-- | `componentWillUnmount`      | 在一个组件在 DOM 中被清除之前                       | -->
<!-- | `componentWillReceiveProps` | 在新的 props 被接受之前                              | -->
<!-- | `shouldComponentUpdate`     | 在 `render()` 之前. 若返回 `false`，则跳过 render   | -->
<!-- | `componentWillUpdate`       | 在 `render()` 之前                                | -->
<!-- | `componentDidUpdate`        | 在 `render()` 之后                                | -->

