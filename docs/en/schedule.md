---
layout: doc
language: en
title: Schedule Task
---

The cron expression was added after the Blade `2.0.8` version to complete the task of timing the task.
You only need to add a `@Schedule` annotation to the method that handles the task, and then write the cron expression.

Blade's mission system provides an API for creating, stopping, and getting task lists.

## Create task

```java
@Bean
public class SimpleTask {

   @Schedule(cron = "* * * * * ?")
    public void syncRelate() {
        System.out.println("executed");
    }

}
```

This will create a scheduled task that is executed every second. The name of the scheduled task created at this time is `task-0`, when you don't specify a task name, the system will name them starting from `0` in numerical order, if you want to be dynamic.

To turn them off, be sure to add `name` to the `@Schedule` annotation to name it, like this.

```java
@Bean
public class SimpleTask {

   @Schedule(name = "task1", cron = "* * * * * ?")
    public void syncRelate() {
        System.out.println("execute once");
    }

}
```

## TaskManager

The task can be managed by calling the static method of `TaskManager`. The following is the API of `TaskManager`.

- `getTask(name)`: Get a task based on the task name.
- `getTasks()`: Get all tasks of the system
- `stopTask(name)`: Stop a running task based on the task name

The way to close a task is implemented inside `Task`, each task will have a context, you see in the previous creation task
Each method has no parameters, and Blade supports you to pass a parameter of type `TaskContext` to manipulate the current task.
(may not be used in most cases).

```java
private AtomicInteger run1 = new AtomicInteger();

@Schedule(cron = "* * * * * ?")
public void run1(TaskContext context) {
    if (run1.get() == 5) {
        context.stop();
        return;
    }
    run1.getAndIncrement();
    log.info(LocalDateTime.now() + ": Hello task1. " + Thread.currentThread());
}
```

This way you can close a task when a condition is triggered.

## Common Cron expressions

- `*/5 * * * * ?`: Execute every 5 seconds
- `0 */1 * * * ?`: Execute every 1 minute
- `0 0/5 * * * ?`: Execute every 5 minutes
- `0 0 23 * * ?`: Execute once every day at 23
- `0 0 1 * * ?`: Execute once a day at 1am
- `0 0 1 1 * ?`: Execute once a day at 1 am on the 1st of the month
- `0 0 23 L * ?`: Execute once at 23 o'clock on the last day of each month
- `0 0 1 ? * L`: Implemented once a week on Sunday at 1 am
- `0 26,29,33 * * * ?`: Execute once at 26, 29, and 33
- `0 0 0,13,18,21 * * ?`: Execute once every day at 0, 13, 18, and 21
- `0 0 12 * * ?`: Trigger every day at 12 noon
- `0 15 10 ? * *`: Trigger every day at 10:15 am
- `0 15 10 * * ?`: Trigger every day at 10:15 am
- `0 15 10 * * ? *`: Trigger every day at 10:15 am
- `0 15 10 * * ? 2005`: Every day at 10:15 am in 2005
- `0 * 14 * * ?`: Trigger every 1 minute between 2 pm and 2:59 pm
- `0 0/5 14 * * ?`: Trigger every 5 minutes between 2 pm and 2:55 pm
- `0 0/5 14,18 * * ?`: Trigger every 5 minutes between 2 pm and 2:55 pm and 6 pm to 6:55 pm
- `0 0-5 14 * * ?`: Trigger every 1 minute between 2 pm and 2:05 pm
- `0 10,44 14 ? 3 WED`: Triggered at 2:10 pm and 2:44 pm on Wednesday of March each year
- `0 15 10 ? * MON-FRI`: Triggered at 10:15 am Monday to Friday
- `0 15 10 15 * ?`: Trigger at 10:15 am on the 15th of each month
- `0 15 10 L * ?`: Trigger at 10:15 am on the last day of each month
- `0 15 10 ? * 6L`: Trigger at 10:15 am on the last Friday of each month
- `0 15 10 ? * 6L 2002-2005`: Trigger at 10:15 am on the last Friday of each month from 2002 to 2005
- `0 15 10 ? * 6#3`: Trigger at 10:15 am on the third Friday of each month
- `0 15 10 ? * 6#3`: Trigger at 10:15 am on the third Friday of each month

online [cron generator](https://crontab-generator.org/).
