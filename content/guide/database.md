---
name: 数据库操作
permalink: '/guide/database'
---

# 数据库操作

当你需要存储或读取数据的时候很可能就需要用到数据库了，Blade不限制你使用什么数据库框架，
为了让开发更高效，Blade提供了一款简单的类 `ActiveRecord` 框架 [blade-jdbc](https://github.com/lets-blade/blade-jdbc) 
用于操作关系型数据库，目前只在 `MySQL` 尝试过。如果你有更熟悉的数据库框架也可以自行取决。

## 数据库表脚本 (DB SQL)

```sql
CREATE TABLE `t_user` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(20) DEFAULT NULL,
  `password` varchar(50) DEFAULT NULL,
  `real_name` varchar(20) DEFAULT NULL,
  `age` int(10) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

INSERT INTO `t_user` (`id`, `username`, `password`, `real_name`, `age`)
VALUES
	(1, 'aaa', 'aaa', 'aaa', 32),
	(2, 'jack', '999', '杰克65', 29),
	(3, 'jack_up', '123556', 'aaa', 19),
	(4, 'jack', '123556', '杰克', 20),
	(5, 'jack', '123556', '杰克', 20);
```


## 配置 Blade-JDBC

先引入 `mysql-connector-java` 和 `blade-jdbc` 的较新版本。

```xml
<dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
    <version>5.1.41</version>
</dependency>
<dependency>
    <groupId>com.bladejava</groupId>
    <artifactId>blade-jdbc</artifactId>
    <version>0.2.2-beta</version>
</dependency>
```

加载数据库并配置数据库

```java
@Bean
public class LoadConfig implements BeanProcessor {
    
    @Override
    public void processor(Blade blade) {
        Base.open("jdbc:mysql://127.0.0.1:3306/app", "root", "123456");
    }
}
```

创建一个数据库实体类 `User.java`

```java
@Table(value = "t_user")
public class User extends ActiveRecord {

    private Integer id;
    private String  username;
    private String  password;
    private Integer age;
    private String  realName;
    
    // getter and setter
}
```

在 `User` 类上有个 `@Table` 注解来标识表名和主键，当主键为 `id` 的时候可以不配置，
同时继承了 `ActiveRecord`，这样就赋予了 `User` 操作数据库的能力。

## CRUD

**插入数据**

```java
User user = new User();
user.setUsername("jack");
user.setPassword("123556");
user.setRealName("杰克");
user.setAge(20);

// insert into t_user (id, username, password, age, real_name) values (?, ?, ?, ?, ?)
user.save();
```

**删除数据**

```java
User user = new User();
user.where("id", 44).delete();
// delete from t_user where id = ?
user.delete("id", 44);
user.delete(44);
```

```java
// 删除所有数据，请慎用
User user = new User();
user.delete();
```

**更新数据**

```java
User user = new User();
user.setUsername("jack_up");
// update t_user set username = ? where id = ?
user.where("id", 43).update();
```

```java
User user = new User();
user.setAge(19);
// update t_user set age = ? where id = ?
user.update(43);
```

```java
User user = new User();
user.setAge(32);
// update t_user set age = ? where age < ?
user.where("age", "<", 20).update();
```

```java
new User().execute("update t_user set age = 22 where age < 20");
```

**查询数据**

```java
User       user  = new User();
List<User> users = user.findAll();
System.out.println(users);

user.setId(1);
users = user.findAll();
System.out.println(users);

user.where("id", 2);
users = user.findAll();
System.out.println(users);

user.where("id", "<", 2);
users = user.findAll();
System.out.println(users);
```

```java
User user = new User();
// select * from t_user where id = ?
User u1 = user.find(1);
System.out.println(u1);
```

```java
User       user = new User();
List<User> list = user.where("username", "jack").findAll();
System.out.println(list);

// user.where(User::getUsername).is("jack").findAll();

list = user.findAll(Fields.of("username"), OrderBy.desc("id"));
System.out.println(list);
```

```java
User       user  = new User();
List<User> users = user.like("username", "%jac%").and("age", ">", 18).findAll();
System.out.println(users);
```

**查询记录数**

```java
User user  = new User();
long count = user.count();
System.out.println(count);
```

```java
User user = new User();
user.where("username", "jack").or("real_name", "jack");
long count = user.count();
System.out.println("count=" + count);
```

**写SQL查询列表**

```java
User user = new User();
System.out.println(user.queryAll("select * from t_user"));
System.out.println(user.queryAll("select * from t_user where id = ?", 1));
```

**写SQL查询单条**

```java
User user = new User();
System.out.println(user.query("select * from t_user order by id desc"));
System.out.println(user.query("select * from t_user where id = ?", 1));
```

## 分页查询 (Page Query)

```java
User       user = new User();
Page<User> page = user.page(1, 3);
System.out.println(page);
```

```java
User       user = new User();
Page<User> page = user.page(new PageRow(1, 2));
System.out.println(page);
```

**转换结果集**

```java
User         user         = new User();
Page<User>   page         = user.page(1, 10);
Page<String> userNamePage = page.map(u -> u.getUsername());
System.out.println(userNamePage);
```

## 事务操作 (Transaction)

```java
Base.atomic(() -> {
    User user = new User();
    user.setPassword("999");
    user.update(42);
    // int a = 1 / 0;
    System.out.println("aasdasd");
    return true;
});
```
