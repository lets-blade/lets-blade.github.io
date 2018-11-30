---
layout: faq
language: en
title: Upgrade Blade
---

## Upgrade from the `2.0.8.RELEASE` version to the latest version

- The `Signature` class has expired, and subsequent use of `RouteContext` instead of this class of responsibility
- The `BeanProcessor` interface has expired, and the `BladeLoader` interface is used instead of its responsibilities
- The `Blade.me` method has expired, using `Blade.of` instead of its responsibilities

Note that the previous `WebHook` is not compatible, you need to modify the parameter type in the `before` or `after` method.
Change `Signature` to `RouteContext` and leave the rest unchanged.