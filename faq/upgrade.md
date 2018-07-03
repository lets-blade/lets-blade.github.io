---
layout: faq
language: cn
title: 升级 Blade
---

## 从 `2.0.8.RELEASE` 版本升级到最新版本

- `Signature` 类已过期，后续使用 `RouteContext` 代替该类职责
- `BeanProcessor` 接口已过期，后续使用 `BladeLoader` 接口代替其职责
- `Blade.me` 方法已过期，使用 `Blade.of` 代替其职责

需注意之前的 `WebHook` 不兼容，需修改 `before` 或 `after` 方法中的参数类型。
将 `Signature` 修改为 `RouteContext`，其他不变。
