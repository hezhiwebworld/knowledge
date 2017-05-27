###Welcome to use MarkDown

### 一句话实现继承


-  function  F(){}

- F.prototype = Aaa.prototype

- Bbb.prototype = new F()   //类式继承 ，构造函数继承

- Bbb.prototype.constructor = Bbb    //修正指向

- 属性和方法分开继承

- 属性的继承通过   AAa.call(this)

### 继承的三种形式

#### 拷贝继承（通用）  有new 无new  的时候都可以

####  类式继承  有new  构造函数

####  原型继承 ：无new的对象


### 继承的原则与目的

-  属性和方法的复用

- 修改子类 ，不能影响父类

- 不要修改系统自动生成的属性 ：例如  Bbb.prototype = new F() 此时 Bbb.prototype.constructor 指向就被修改为F



