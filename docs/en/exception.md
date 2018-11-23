---
layout: doc
language: en
title: Exception
---

The Blade has an 'Exception Handler' built in. In Developer mode, it outputs the exception on the front page and prints the stack information on the console. The production environment is only printed on the console.
Sometimes we don't meet our needs. At this time, we need to customize the exception handling, such as special handling for a custom exception.
We use an example to explain how to operate.

A runtime exception class named `TipException` is defined to output an error message to the foreground.

According to the exception handling above, the stack information of this exception will be output to the console. In the production environment, the front end will only receive 500 error codes.

We want to do some special handling for this exception. The `ExceptionHandler` interface is defined in Blade to define a method for handling exceptions.
In order to facilitate the built-in [DefaultExceptionHandler] () class to do the default processing, we do not have to write an exception handler alone, only need to inherit `DefaultExceptionHandler`
You can complete your specific needs with a little modification. If you really want to handle the exception information completely, you can also refer to the implementation of this class.

```java
public class TipException extends RuntimeException {

    public TipException(String message) {
        super(message);
    }

    public TipException(String message, Throwable cause) {
        super(message, cause);
    }

    public TipException(Throwable cause) {
        super(cause);
    }
}

@Bean
public class GolbalExceptionHandler extends DefaultExceptionHandler {

    @Override
    public void handle(Exception e) {
        if (e instanceof TipException) {
            TipException tipException = (TipException) e;
            String msg = tipException.getMessage();
            WebContext.response().json(RestResponse.fail(msg));
        } else {
            super.handle(e);
        }
    }

}
```

This code is very succinct, we define a class called `GolbalExceptionHandler` to handle custom exceptions, which inherit from `DefaultExceptionHandler`, And as a `Bean` is managed by the Blade, the internal implementation is only a few lines of code, to determine the type of exception, special treatment can be done, otherwise it will be treated as before.