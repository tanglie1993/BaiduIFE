##基于类的面向对象和基于原型的面向对象方式比较
在基于类的面向对象方式中，对象（object）依靠 类（class）来产生。而在基于原型的面向对象方式中，对象（object）则是依靠 构造器（constructor）利用 原型（prototype）构造出来的。举个客观世界的例子来说明二种方式认知的差异。例如工厂造一辆车，一方面，工人必须参照一张工程图纸，设计规定这辆车应该如何制造。这里的工程图纸就好比是语言中的 类 (class)，而车就是按照这个 类（class）制造出来的；另一方面，工人和机器 ( 相当于 constructor) 利用各种零部件如发动机，轮胎，方向盘 ( 相当于 prototype 的各个属性 ) 将汽车构造出来。

事实上关于这两种方式谁更为彻底地表达了面向对象的思想，目前尚有争论。但笔者认为原型式面向对象是一种更为彻底的面向对象方式，理由如下：

- 首先，客观世界中的对象的产生都是其它实物对象构造的结果，而抽象的“图纸”是不能产生“汽车”的，也就是说，类是一个抽象概念而并非实体，而对象的产生是一个实体的产生；- 
- 其次，按照一切事物皆对象这个最基本的面向对象的法则来看，类 (class) 本身并不是一个对象，然而原型方式中的构造器 (constructor) 和原型 (prototype) 本身也是其他对象通过原型方式构造出来的对象。
- 再次，在类式面向对象语言中，对象的状态 (state) 由对象实例 (instance) 所持有，对象的行为方法 (method) 则由声明该对象的类所持有，并且只有对象的结构和方法能够被继承；而在原型式面向对象语言中，对象的行为、状态都属于对象本身，并且能够一起被继承（参考资源），这也更贴近客观实际。
- 最后，类式面向对象语言比如 Java，为了弥补无法使用面向过程语言中全局函数和变量的不便，允许在类中声明静态 (static) 属性和静态方法。而实际上，客观世界不存在所谓静态概念，因为一切事物皆对象！而在原型式面向对象语言中，除内建对象 (build-in object) 外，不允许全局对象、方法或者属性的存在，也没有静态概念。所有语言元素 (primitive) 必须依赖对象存在。

##原型链
在 ECMAScript 中，每个由构造器创建的对象拥有一个指向构造器 prototype 属性值的 隐式引用（implicit reference），这个引用称之为 原型（prototype）。进一步，每个原型可以拥有指向自己原型的 隐式引用（即该原型的原型），如此下去，这就是所谓的 原型链（prototype chain）。在具体的语言实现中，每个对象都有一个 __proto__ 属性来实现对原型的 隐式引用。

```
 // 声明 Animal 对象构造器 
 function Animal() {} 
// 将Animal 的 prototype 属性指向一个对象， 
// 亦可直接理解为指定 Animal 对象的原型 
 Animal.prototype = {
         name: "animal",
         weight: 0,
         eat: function () {
             alert("Animal is eating!");
         }
     } 
// 声明 Mammal 对象构造器 
 function Mammal() {
         this.name = "mammal";
     } 
// 指定 Mammal 对象的原型为一个 Animal 对象。 
// 实际上此处便是在创建 Mammal 对象和Animal 对象之间的原型链 
 Mammal.prototype = new Animal(); 
// 声明 Horse 对象构造器 
 function Horse(height, weight) {
     this.name = "horse";
     this.height = height;
     this.weight = weight;
 } 
// 将 Horse对象的原型指定为一个 Mammal 对象， 继续构建 Horse 与 Mammal 之间的原型链 
 Horse.prototype = new Mammal();
 // 重新指定 eat方法, 此方法将覆盖从 Animal 原型继承过来的 eat 方法 
 Horse.prototype.eat = function () {
         alert("Horse is eating grass!");
     } // 验证并理解原型链 
 var horse = new Horse(100, 300);
 console.log(horse.__proto__ === Horse.prototype);
 console.log(Horse.prototype.__proto__ === Mammal.prototype);
 console.log(Mammal.prototype.__proto__ === Animal.prototype);
```

##JavaScript 类式继承的实现方法
目前一些主流的 JS 框架都提供了这种转换机制，也即类式声明方法，比如 Dojo.declare()、Ext.entend() 等等。用户使用这些框架，可以轻易而友好地组织自己的 JS 代码。

```
// 声明 Person 类 
var Person = Class.extend({
    _issleeping: true,
    init: function (name) {
        this._name = name;
    },
    isSleeping: function () {
        return
        this._issleeping;
    }
}); // 声明 Programmer 类，并继承 Person 
var Programmer = Person.extend({
    init: function (name, issleeping) { // 调用父类构造函数 
        this._super(name); // 设置自己的状态
        this._issleeping = issleeping;
    }
});
var person = new Person("张三");
var diors = new Programmer("张江男", false); // 打印 true 
console.log(person.isSleeping()); // 打印 false
console.log(diors.isSleeping()); // 此处全为 true，故打印 true 
console.log(person instanceof Person && person instanceof Class && diors instanceof Programmer &&
    diors instanceof Person && diors instanceof Class);
```

##JavaScript 私有成员实现
```
// 声明 User 构造器 
function User(pwd) { 
    // 定义私有属性 
    var password = pwd;
    // 定义私有方法 
    function getPassword() { 
    // 返回了闭包中的 password 
        return password;
    } 
    // 特权函数声明，用于该对象其他公有方法能通过该特权方法访问到私有成员 
    this.passwordService = function () {
        return getPassword();
    }
} 
// 公有成员声明 
User.prototype.checkPassword = function (pwd) {
    return this.passwordService() === pwd;
}; 
// 验证隐藏性 
var u = new User("123456"); 
// 打印 true 
console.log(u.checkPassword("123456")); 
// 打印 undefined 
console.log(u.password); 
// 打印 true 
console.log(typeof u.getPassword === "undefined");
```



























