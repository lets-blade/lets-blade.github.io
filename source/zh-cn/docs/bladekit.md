---
title: Blade工具类
categories: docs
comments: false
---


在Blade框架内部，已经提供了很多工具类帮助开发者更快速的完成功能，
大多数情况下你不必引入类似 `commons-lang` 这样的库。

## 字符串操作

```java
StringKit.isBlank(String str);                          // 判断字符串是否是空串
StringKit.isNotBlank(String str);                       // 判断字符串是否不是空串
StringKit.isNumber(String str);                         // 判断字符串是否为数值型，包括小数
StringKit.rand(int size);                               // 随机获取 N 个字符串数字
StringKit.rand(int min, int max);                       // 随机获取 N 个字符串数字，并指定范围
StringKit.alignLeft(String str, int width, char c);     // 在字符串左侧填充一定数量的特殊字符
StringKit.alignRight(String str, int width, char c);    // 在字符串右侧填充一定数量的特殊字符
```

[StringKit API](http://static.javadoc.io/com.bladejava/blade-mvc/2.0.3/com/blade/kit/StringKit.html) | [TestCode](https://github.com/biezhi/blade/blob/master/src/test/java/com/blade/kit/StringKitTest.java)

## 加解密操作

```java
EncryptKit.md5(String str);                         // 对字符串进行md5
EncryptKit.md5(byte[] bytes);                       // 对字节数组进行md5
EncryptKit.md5File(File file);                      // 对文件进行md5
EncryptKit.SHA1(String str);                        // 对字符串进行SHA1
EncryptKit.SHA1(byte[] bytes);                      // 对字节数组进行SHA1
EncryptKit.SHA256(String str);                      // 对字符串进行SHA256
EncryptKit.SHA256(byte[] bytes);                    // 对字节数组进行SHA256
EncryptKit.SHA512(String str);                      // 对字符串进行SHA512
EncryptKit.SHA512(byte[] bytes);                    // 对字节数组进行SHA512
EncryptKit.hmacMd5(String str);                     // 对字符串进行hmacMd5
EncryptKit.hmacMd5(byte[] bytes);                   // 对字节数组进行hmacMd5
EncryptKit.hmacSHA1(String str);                    // 对字符串进行hmacSHA1
EncryptKit.hmacSHA1(byte[] bytes);                  // 对字节数组进行hmacSHA1
EncryptKit.hmacSHA256(String str);                  // 对字符串进行hmacSHA256
EncryptKit.hmacSHA256(byte[] bytes);                // 对字节数组进行hmacSHA256
EncryptKit.hmacSHA512(String str);                  // 对字符串进行hmacSHA512
EncryptKit.hmacSHA512(byte[] bytes);                // 对字节数组进行hmacSHA512
EncryptKit.DES(byte[] data, byte[] key);            // DES操作
EncryptKit.decryptDES(byte[] data, byte[] key);     // 解DES
EncryptKit.encrypt3DES(byte[] data, byte[] key);    // 3DES操作
EncryptKit.decrypt3DES(byte[] data, byte[] key);    // 解3DES
EncryptKit.encryptAES(byte[] data, byte[] key);     // AES操作
EncryptKit.decryptAES(byte[] data, byte[] key);     // 解AES操作
```

[EncryptKit API](http://static.javadoc.io/com.bladejava/blade-mvc/2.0.3/com/blade/kit/EncryptKit.html) | [TestCode](https://github.com/biezhi/blade/blob/master/src/test/java/com/blade/kit/EncryptKitTest.java)

## Json操作

```java
JsonKit.toString(Object object);                        // 将对象序列化为JSON字符串
JsonKit.toString(Object object, SerializeMapping s);    // 将对象序列化为JSON字符串，并指定映射规则
JsonKit.toAson(String json);                            // 将JSON字符串反序列化为Ason对象
JsonKit.formJson(String json, Class<T> cls);            // 将JSON字符串反序列化为Java类
```

[JsonKit API](http://static.javadoc.io/com.bladejava/blade-mvc/2.0.3/com/blade/kit/JsonKit.html) | [TestCode](https://github.com/biezhi/blade/blob/master/src/test/java/com/blade/kit/JsonKitTest.java)

## UUID操作

```java
UUID.UU64();                                            // 返回一个 UUID ，并用 64 进制转换成紧凑形式的字符串，内容为 [\\-0-9a-zA-Z_]
UUID.UU32();                                            // 返回一个 UUID ，并用 32 进制转换成紧凑形式的字符串，内容为 [\\-0-9a-zA-Z_]
UUID.UU16();                                            // 返回一个 UUID，并用 16进制表示的紧凑格式的 UUID
UUID.UU16FromUU64();                                    // 将一个 UU64 表示的紧凑字符串，变成 UU16 表示的字符串
UUID.captchaChar(int length);                           // 返回指定长度由随机数字+小写字母组成的字符串
UUID.captchaChar(int length, boolean caseSensitivity);  // 返回指定长度随机数字+字母(大小写敏感)组成的字符串
UUID.captchaNumber(int length);                         // 返回指定长度随机数字组成的字符串
```

[UUID API](http://static.javadoc.io/com.bladejava/blade-mvc/2.0.3/com/blade/kit/UUID.html) | [TestCode](https://github.com/biezhi/blade/blob/master/src/test/java/com/blade/kit/UUIDTest.java)

## 反射操作

```java
ReflectKit.newInstance(Class<T> cls);                                       // 根据类型创建一个无参构造函数的实例  
ReflectKit.convert(Class<?> type, String value);                            // 将value转换为type类型
ReflectKit.Object invokeMethod(Object bean, Method method, Object... args); // 反射执行一个方法
ReflectKit.hasInterface(Class<?> cls, Class<?> inter);                      // 判断cls是否实现了inter接口
ReflectKit.isNormalClass(Class<?> cls);                                     // 判断cls是否是非抽象并且不是接口的普通类
ReflectKit.getMethod(Class<?> cls, String methodName, Class<?>... types);   // 根据类型和名称、方法参数获取一个Method对象
ReflectKit.isPrimitive(Class<?> cls);                                       // 判断cls是否是基本类型
ReflectKit.isPrimitive(Object object);                                      // 判断object是否是基本类型
ReflectKit.form(String typeName);                                           // 根据typeName加载Class
```

[ReflectKit API](http://static.javadoc.io/com.bladejava/blade-mvc/2.0.3/com/blade/kit/ReflectKit.html) | [TestCode](https://github.com/biezhi/blade/blob/master/src/test/java/com/blade/kit/ReflectKitTest.java)

## 正则匹配

```java
PatternKit.isEmail(String str);     // 是否是邮箱格式
PatternKit.isMobile(String str);    // 是否是手机格式
PatternKit.isPhone(String str);     // 是否是电话格式
PatternKit.isIpAddress(String str); // 是否是IP地址
PatternKit.isChinese(String str);   // 是否是中文
PatternKit.isBirthday(String str);  // 是否是生日格式
PatternKit.isDecimals(String str);  // 是否是整数或浮点数
PatternKit.isNumber(String str);    // 是否是数字
PatternKit.isIdCard18(String str);  // 是否是18位身份证号码
PatternKit.isIdCard15(String str);  // 是否是15位身份证号码
PatternKit.isURL(String str);       // 是否是URL
PatternKit.isImage(String str);     // 后缀是否是图片
```

[API Doc](http://static.javadoc.io/com.bladejava/blade-mvc/2.0.3/com/blade/kit/PatternKit.html) | [TestCode](https://github.com/biezhi/blade/blob/master/src/test/java/com/blade/kit/PatternKitTest.java)

## 日期操作

```java
DateKit.toString(Date date, String pattern);                // 将Date类型转换为字符串日期
DateKit.toString(long time, String pattern);                // 将Unix时间戳转换为字符串日期
DateKit.toString(LocalDateTime dateTime, String pattern);   // 将LocalDateTime转换为字符串日期
DateKit.gmtDate(Date date);                                 // 根据Date获得GMT日期
DateKit.gmtDate(LocalDateTime dateTime);                    // 根据LocalDateTime获得GMT日期
DateKit.toDate(String dateStr, String pattern);             // 将字符串转换为Date类型（不包含时分秒）
DateKit.toDateTime(String dateStr, String pattern);         // 将字符串转换为Date类型（包含时分秒）
DateKit.toLocalDate(String dateStr, String pattern);        // 将字符串转换为LocalDate类型
DateKit.toLocalDateTime(String dateStr, String pattern);    // 将字符串转换为LocalDateTime类型
DateKit.toUnix(Date date);                                  // 将Date类型转换为Unix时间戳
DateKit.toUnix(String dateTime);                            // 将字符串类型转换为时间戳，格式: yyyy-MM-dd HH:mm:ss
DateKit.toUnix(String dateTime, String pattern);            // 将字符串类型转换为时间戳，指定格式
DateKit.nowUnix();                                          // 返回当前Unix时间戳
```

[DateKit API](http://static.javadoc.io/com.bladejava/blade-mvc/2.0.3/com/blade/kit/DateKit.html) | [TestCode](https://github.com/biezhi/blade/blob/master/src/test/java/com/blade/kit/DateKitTest.java)

## HashIds

Blade内置了 `Hashids` 类，使用方法见 [hashids](https://github.com/jiecao-fm/hashids-java)
