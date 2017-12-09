---
title: Blade kit
categories: docs
comments: false
---

Within the framework of the Blade, there are many tools available to help developers get their functionality done faster,
In most cases you do not need to introduce a library like `commons-lang`.

## StringKit

```java
StringKit.isBlank(String str);                          // Whether the string is an empty string
StringKit.isNotBlank(String str);                       // String is not an empty string
StringKit.isNumber(String str);                         // Whether the string is numeric, including decimals
StringKit.rand(int size);                               // Randomly get N string numbers
StringKit.rand(int min, int max);                       // Randomly get N string numbers, and specify the range
StringKit.alignLeft(String str, int width, char c);     // Fill in the left side of the string a certain number of special characters
StringKit.alignRight(String str, int width, char c);    // Fill in the right side of the string a certain number of special characters
```

[StringKit API](http://static.javadoc.io/com.bladejava/blade-mvc/2.0.3/com/blade/kit/StringKit.html) | [TestCode](https://github.com/biezhi/blade/blob/master/src/test/java/com/blade/kit/StringKitTest.java)

## EncryptKit

```java
EncryptKit.md5(String str);                         // Md5 on the string
EncryptKit.md5(byte[] bytes);                       // Md5 on the byte array
EncryptKit.md5File(File file);                      // Md5 on the file
EncryptKit.SHA1(String str);                        // SHA1 the string
EncryptKit.SHA1(byte[] bytes);                      // SHA1 the byte array
EncryptKit.SHA256(String str);                      // SHA256 the string
EncryptKit.SHA256(byte[] bytes);                    // SHA256 byte array
EncryptKit.SHA512(String str);                      // SHA512 on the string
EncryptKit.SHA512(byte[] bytes);                    // SHA512 byte array
EncryptKit.hmacMd5(String str);                     // HmacMd5 on the string
EncryptKit.hmacMd5(byte[] bytes);                   // HmacMd5 the byte array
EncryptKit.hmacSHA1(String str);                    // HmacSHA1 on the string
EncryptKit.hmacSHA1(byte[] bytes);                  // HmacSHA1 on the byte array
EncryptKit.hmacSHA256(String str);                  // HmacSHA256 on the string
EncryptKit.hmacSHA256(byte[] bytes);                // HmacSHA256 on the byte array
EncryptKit.hmacSHA512(String str);                  // HmacSHA512 on the string
EncryptKit.hmacSHA512(byte[] bytes);                // HmacSHA512 on the byte array
EncryptKit.DES(byte[] data, byte[] key);            // DES
EncryptKit.decryptDES(byte[] data, byte[] key);     // DES decryption
EncryptKit.encrypt3DES(byte[] data, byte[] key);    // 3DES
EncryptKit.decrypt3DES(byte[] data, byte[] key);    // 3DES decryption
EncryptKit.encryptAES(byte[] data, byte[] key);     // AES
EncryptKit.decryptAES(byte[] data, byte[] key);     // AES decryption
```

[EncryptKit API](http://static.javadoc.io/com.bladejava/blade-mvc/2.0.3/com/blade/kit/EncryptKit.html) | [TestCode](https://github.com/biezhi/blade/blob/master/src/test/java/com/blade/kit/EncryptKitTest.java)

## JsonKit

```java
JsonKit.toString(Object object);                        // Serialize the object to a JSON string
JsonKit.toString(Object object, SerializeMapping s);    // Serialize the object into a JSON string and specify the mapping rules
JsonKit.toAson(String json);                            // Deserialize JSON strings to Ason objects
JsonKit.formJson(String json, Class<T> cls);            // Deserialize JSON strings to Java classes
```

[JsonKit API](http://static.javadoc.io/com.bladejava/blade-mvc/2.0.3/com/blade/kit/JsonKit.html) | [TestCode](https://github.com/biezhi/blade/blob/master/src/test/java/com/blade/kit/JsonKitTest.java)

## UUID

```java
UUID.UU64();                                            // Return a UUID, and convert it to a compact form of string, in hexadecimal format [\\ - 0-9a-zA-Z_]
UUID.UU32();                                            // Return a UUID, and convert it to a compact form of string [32-inch] [\\ - 0-9a-zA-Z_]
UUID.UU16();                                            // Return a UUID, and in compact hexadecimal format UUID
UUID.UU16FromUU64();                                    // A compact string represented by UU64 becomes a character string represented by UU16
UUID.captchaChar(int length);                           // Returns a string of the specified length consisting of a random number + lowercase letters
UUID.captchaChar(int length, boolean caseSensitivity);  // Returns a string of random numbers + letters (case-sensitive) of the specified length
UUID.captchaNumber(int length);                         // Returns a string of random numbers of the specified length
```

[UUID API](http://static.javadoc.io/com.bladejava/blade-mvc/2.0.3/com/blade/kit/UUID.html) | [TestCode](https://github.com/biezhi/blade/blob/master/src/test/java/com/blade/kit/UUIDTest.java)

## ReflectKit

```java
ReflectKit.newInstance(Class<T> cls);                                       // Create a typeless constructor instance based on the type  
ReflectKit.convert(Class<?> type, String value);                            // Convert value to type
ReflectKit.Object invokeMethod(Object bean, Method method, Object... args); // Reflection invoke a method
ReflectKit.hasInterface(Class<?> cls, Class<?> inter);                      // Determine whether cls inter interface
ReflectKit.isNormalClass(Class<?> cls);                                     // Determine whether cls non-abstract and not a common interface type
ReflectKit.getMethod(Class<?> cls, String methodName, Class<?>... types);   // According to the type and name, method parameters for a Method object
ReflectKit.isPrimitive(Class<?> cls);                                       // Determine whether cls is a basic type
ReflectKit.isPrimitive(Object object);                                      // Determine whether the object is the basic type
ReflectKit.form(String typeName);                                           // Load Class by typeName
```

[ReflectKit API](http://static.javadoc.io/com.bladejava/blade-mvc/2.0.3/com/blade/kit/ReflectKit.html) | [TestCode](https://github.com/biezhi/blade/blob/master/src/test/java/com/blade/kit/ReflectKitTest.java)

## PatternKit

```java
PatternKit.isEmail(String str);     // Whether the mailbox format
PatternKit.isMobile(String str);    // Is it a cell phone format?
PatternKit.isPhone(String str);     // Whether it is a phone format
PatternKit.isIpAddress(String str); // Is it an IP address?
PatternKit.isChinese(String str);   // Is it Chinese?
PatternKit.isBirthday(String str);  // Whether it is a birthday format
PatternKit.isDecimals(String str);  // Whether it is an integer or a floating-point number
PatternKit.isNumber(String str);    // Is it a number?
PatternKit.isIdCard18(String str);  // Is it an 18-digit ID number?
PatternKit.isIdCard15(String str);  // Is it a 15-digit ID number?
PatternKit.isURL(String str);       // Is it a URL?
PatternKit.isImage(String str);     // Whether the suffix is ​​a picture format
```

[API Doc](http://static.javadoc.io/com.bladejava/blade-mvc/2.0.3/com/blade/kit/PatternKit.html) | [TestCode](https://github.com/biezhi/blade/blob/master/src/test/java/com/blade/kit/PatternKitTest.java)

## DateKit

```java
DateKit.toString(Date date, String pattern);                // Convert Date type to string date
DateKit.toString(long time, String pattern);                // Convert Unix timestamp to string date
DateKit.toString(LocalDateTime dateTime, String pattern);   // Convert LocalDateTime to string date
DateKit.gmtDate(Date date);                                 // Get the GMT date based on Date
DateKit.gmtDate(LocalDateTime dateTime);                    // Get the GMT date based on LocalDateTime
DateKit.toDate(String dateStr, String pattern);             // Convert a string to a Date type (excluding hours and minutes seconds)
DateKit.toDateTime(String dateStr, String pattern);         // Convert a string to a Date type (including hour and minute seconds)
DateKit.toLocalDate(String dateStr, String pattern);        // Convert string to LocalDate type
DateKit.toLocalDateTime(String dateStr, String pattern);    // Convert string to LocalDateTime type
DateKit.toUnix(Date date);                                  // Convert a Date type to a Unix timestamp
DateKit.toUnix(String dateTime);                            // Converts the string type to a timestamp in the format: yyyy-MM-dd HH:mm:ss
DateKit.toUnix(String dateTime, String pattern);            // Convert string type to timestamp, specify format
DateKit.nowUnix();                                          // Returns the current Unix timestamp
```

[DateKit API](http://static.javadoc.io/com.bladejava/blade-mvc/2.0.3/com/blade/kit/DateKit.html) | [TestCode](https://github.com/biezhi/blade/blob/master/src/test/java/com/blade/kit/DateKitTest.java)

## HashIds

Blade built `Hashids` class, the use of methods see [hashids](https://github.com/jiecao-fm/hashids-java)
