// 声明 User 构造器 
function User(pwd) { // 定义私有属性 
    var password = pwd;
    // 定义私有方法 
    function getPassword() { // 返回了闭包中的 password 
        return password;
    } // 特权函数声明，用于该对象其他公有方法能通过该特权方法访问到私有成员 
    this.passwordService = function () {
        return getPassword();
    }
} // 公有成员声明 
User.prototype.checkPassword = function (pwd) {
    return this.passwordService() ===
        pwd;
}; // 验证隐藏性 
var u = new User("123456"); // 打印 true 
console.log(u.checkPassword("123456")); // 打印 undefined 
console.log(u.password); // 打印 true 
console.log(typeof u.getPassword === "undefined");