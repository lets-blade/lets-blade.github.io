---
layout: doc
language: en
title: Component
---

The concept in the Blade is that the component is a type of `Bean` or object, and the framework has a simple `IOC` container built in to help you host them.
In this way, users can achieve object reuse when they use it, without having to use the `new` keyword infinitely to bring memory leaks. Then we are using components
There are two things to do: 1. Create a component 2. Let the Blade host the component.

## Core feature

Resident memory, our components are actually stored in the cache pool as a singleton after being hosted by the framework, and can be taken out when used.

## Component type

For the simpler aspect of the user, there are several component types built into the Blade, `BladeLoader`, `WebHook`, and controller.
So let's take a look at what these are doing here?

**BladeLoader**

In a web development we often use some **configuration** or some other things when the project starts.
In the Blade design an interface `BladeLoader`, you only need to create a class to implement this interface to complete the initialization of the loading action.
For example, I want to set the template engine when the project starts:

```java
@Order(1)
@Bean
public class TemplateConfig implements BladeLoader {
    
    @Override
    public void load(Blade blade) {
        JetbrickTemplateEngine templateEngine = new JetbrickTemplateEngine();
        blade.templateEngine(templateEngine);
    }

}
```

So a few lines of code help us implement such a function, we can notice that the `processor` method is implemented here.
And there are 2 annotations on the component, we use the `@Bean` annotation to tell the framework that this is a component, you will help it host it for me.
In the IOC container. But I have multiple components, I hope they are executed in order, so I added a `@Order` annotation.
At the same time, the order of this component is specified as `1`, then the framework will execute the `processor` methods of all components in order.

**WebHook**

`WebHook` is an interface in the Blade that can perform some custom actions before and after intercepting a route. Users can use this interface to perform some operations such as login interception, log record, and permission verification.
There are 2 methods `before` and `after` in this interface, and the `after` method is a **default method** (this concept appears in Java8) because we
It is found that in most cases, the `after` method is not used, then the user only needs to implement `before` when implementing the interface.
Let's write a simple example to experience:

```java
@Bean
public class MyHook implements WebHook {
    
    @Override
    public boolean before(Signature signature) {
        Request request = signature.request();
        String  uri     = request.uri();
        log.info("{}\t{}", request.method(), uri);
        return true;
    }

}
```

Here is a simple log of the log, we can see a `WebHook` (hook) method has a `Signature`. We packaged the context parameters of the current route in this class.
These context parameters include: `Request`, `Response`, `Action` for the user to use.

**Controller**

Identifying a class in Blade is a very simple controller class. You only need to add a `@Path` annotation to the class. In order not to make the configuration of the class too complicated, we allow the user to not have `@Bean on the class. `
  The annotation is actually the framework to help you. The advantage of this is that you can use `@Path` to configure some features of this controller, such as `namespace`, `restful` parameters, and so on.

```java
@Path
public class IndexController {
    
}
```

This `IndexController` is considered by the Blade to be a controller, which is hosted at startup. When you access a route, it will find the object and get reused.
 
**Custom component**

Many times we have some of our own business, we need to customize some services like `Service`. Simplify the concept in Blade and think that all components are a `Bean`.

Then I can create a component like this:

```java
@Bean
public class UserService {
    
    public String sayHi(){
        return "Hi blade";    
    }
    
}
```

When I want to use this component in the controller it is also very simple:

```java
@Path
public class IndexController {
    
    @Inject
    private UserService userService;
    
    @GetRoute("/sayhi")
    public void sayHi(){
        userService.sayHi();
    }
    
}
```

Inject a component we defined with the `@Inject` annotation, as well as the calling of components and components.

## Built-in component
 
In order to allow developers to spend less time developing core business, Blade has built-in ** components** for you to use.

1. `DefaultExceptionHandler`: Exception handler, you can inherit it if you have custom exception handling.
2. `BasicAuthMiddleware`: Basic authentication, if used, can be used directly.
3. `CsrfMiddleware`: Helps you verify `CSRF Token`