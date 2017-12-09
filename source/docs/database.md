---
title: Database
categories: docs
comments: false
---

When you need to store or read data is likely to need to use the database, Blade does not limit what database framework you use,
To make development more efficient, Blade provides a simple class called ActiveRecord [blade-jdbc](https://github.com/lets-blade/blade-jdbc)
Used to manipulate relational databases, currently only tried at `MySQL`. 

If you have a more familiar database framework can also be their own.

## Database Table SQL

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


## Configuration Blade-JDBC

Introduce newer versions of `mysql-connector-java` and `blade-jdbc`.

```xml
<dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
    <version>5.1.41</version>
</dependency>
<dependency>
    <groupId>com.bladejava</groupId>
    <artifactId>blade-jdbc</artifactId>
    <version>0.2.2-RELEASE</version>
</dependency>
```

Load the database and configure the database.

```java
@Bean
public class LoadConfig implements BeanProcessor {
    
    @Override
    public void processor(Blade blade) {
        Base.open("jdbc:mysql://127.0.0.1:3306/app", "root", "123456");
    }
}
```

Create a database entity class `User.java`

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

There is a `@Table` annotation on the` User` class to identify the table name and primary key, which can not be configured when the primary key is `id`,
At the same time inherited the `ActiveRecord`, this gives the `User` the ability to manipulate the database.

## CRUD

**Insert**

```java
User user = new User();
user.setUsername("jack");
user.setPassword("123556");
user.setRealName("JackWang");
user.setAge(20);

// insert into t_user (id, username, password, age, real_name) values (?, ?, ?, ?, ?)
user.save();
```

**Delte**

```java
User user = new User();
user.where("id", 44).delete();
// delete from t_user where id = ?
user.delete("id", 44);
user.delete(44);
```

```java
// Delete all data, please be careful
User user = new User();
user.delete();
```

**Update**

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

**Query**

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

**Query Record Count**

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

**SQL Query List**

```java
User user = new User();
System.out.println(user.queryAll("select * from t_user"));
System.out.println(user.queryAll("select * from t_user where id = ?", 1));
```

**SQL Query Single Record**

```java
User user = new User();
System.out.println(user.query("select * from t_user order by id desc"));
System.out.println(user.query("select * from t_user where id = ?", 1));
```

## Paging query

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

**Transform the result set**

```java
User         user         = new User();
Page<User>   page         = user.page(1, 10);
Page<String> userNamePage = page.map(u -> u.getUsername());
System.out.println(userNamePage);
```

## Transaction

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