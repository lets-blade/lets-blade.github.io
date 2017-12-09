---
title: Component
categories: docs
comments: false
---

In Blade, a component is considered a type of bean or object, and the framework has built-in simple IOC containers to help you host them.
This user can reuse the object when using, do not have to unlimited use `new` Keywords bring memory leaks. Then we are using components
Time to do two things: 1, create a component 2, let the Blade host this component

## Core Features

Resident memory, our components are managed by the framework is actually stored in a singleton way in the cache pool, when used to remove it.

## Component Type

In terms of the user more simple aspect, in the Blade There are several built-in component types, BeanProcessor, WebHook, and Controller.
So let's take a look at these several were to do what?

**BeanProcessor**

On a web We often use the development project to start loading some **configuration** or do some other things, in the Blade designed an interface `BeanProcessor`, you only need to create an own class to implement this interface to complete the initialization load action.
For example, I want to set the template engine when the project starts:

```java
@Order (1)
@Bean
public class TemplateConfig implements BeanProcessor {
    
    @Override
    public void processor (Blade blade) {
        JetbrickTemplateEngine templateEngine = new JetbrickTemplateEngine (); blade.templateEngine (templateEngine);
    }

}
```

Then such a few lines of code to help us to achieve such a function, we can notice that here to achieve the `processor` method,
And there are 2 comments on the component, we use the @ Bean annotation to tell the framework that this is a component that you will host it for
IOC container it. But I have multiple components, I hope they are executed in order, so they added a `@ Order` annotation,
At the same time the order of this component is specified as `1`, then the framework executes the` processor` method of all components in order at startup.

**WebHook**

`WebHook` Is a Blade in the interception of a route before and after the interface can do some custom actions, the user can use the interface to complete some login interception, logging, permissions authentication and other operations.
There are 2 methods `before` and` after` in this interface, and `after` method is a **default method** (this concept appears in Java8) because we
Found that most of the time not to use `after` method, then users in the realization of the interface only need to achieve` before` can be.
Here we write a simple example you can experience:

```java
@Bean
public class MyHook implements WebHook {
    
    @Override public boolean before (Signature signature) {
        Request request = signature.request ();
        String uri = request.uri ();
        log.info ("{} \ t {}", request.method (), uri);
        return true;
    }

}
```

Here is a simple record of the log, we can see a `WebHook` (hook) method has a `Signature`. We package the context parameters of the current route in this class,
These context parameters include: `Request`,` Response`, `Action` for your convenience.

**controller**

In identifying a class in a Blade as a controller class is as easy as adding a `@Path` annotation to the class, and in order not to overcommit the configuration of that class we allow the user to have no` @ Bean` Annotation, in fact, the framework to help you do it. The benefit of this is that @ Path can be used to configure some of the controller's properties, such as `namespace`, `restful`, and so on.

 
```java
@Path
public class IndexController {
    
}
```

This `IndexController` is the Blade Think of it as a controller, hosting it at startup, and when you visit a route, it finds the object and gets reused.
 
**Custom Component**

Many times we have some of our own business, we need to customize some `Service` Such service. Simplify the concept in the Blade, that all components are a `Bean`.
So I can create a component like this:

```java
@Bean
public class UserService {
    
    public String sayHi () {
        return "Hi blade";
    } }
```

When i want to use this component in the controller is also very simple:

```java
@Path
public class IndexController {
    
    @Inject
    private UserService userService;
    
    @GetRoute ("/ sayhi")
    public void sayHi () { userService.sayHi ();
    }
    
}
```

Use the @Inject annotation to inject a component we defined, of course, as well as the invocation of components and components.

## Built-in component

In order to allow developers to spend less time in the development of core business above, Blade built some **components** for you to use.

1. `DefaultExceptionHandler`: Exception handler, if you have a custom exception handling can inherit it.
2. `BasicAuthMiddleware`: Basic certification, if used to the words can be used directly.
3. `CsrfMiddleware`: to help you verify `CSRF Token`
