##What is Scope?
In JavaScript, scope refers to the current context of your code.(https://toddmotto.com/everything-you-wanted-to-know-about-javascript-scope/)

###Global Scope
Before you write a line of JavaScript, you’re in what we call the Global Scope. 

###Local Scope
A local scope refers to any scope defined past the global scope. There is typically one global scope, and each function defined has its own (nested) local scope.
<code>
// Scope A: Global scope out here
var myFunction = function () {
  // Scope B: Local scope in here
};
</code>

###Function scope
All scopes in JavaScript are created with Function Scope only, they aren’t created by for or while loops or expression statements like if or switch. New functions = new scope - that’s the rule.

###Lexical Scope
Whenever you see a function within another function, the inner function has access to the scope in the outer function, this is called Lexical Scope or Closure - also referred to as Static Scope

```
// Scope A
var myFunction = function () {
  // Scope B
  var name = 'Todd'; // defined in Scope B
  var myOtherFunction = function () {
    // Scope C: `name` is accessible here!
  };
};
```

##Scope Chain
Each function defined has its own nested scope as we know, and any function defined within another function has a local scope which is linked to the outer function - this link is called the chain.

##Closures
Inside our scope, we can return things so that they’re available in the parent scope:

```
var sayHello = function (name) {
  var text = 'Hello, ' + name;
  return function () {
    console.log(text);
  };
};
```
The function returns a function, which means it needs assignment, and then calling:

```
var helloTodd = sayHello('Todd');
helloTodd(); // will call the closure and log 'Hello, Todd'
```
A function doesn’t have to return in order to be called a closure though. Simply accessing variables outside of the immediate lexical scope creates a closure.

##Scope and ‘this’
Each scope binds a different value of this depending on how the function is invoked.

```
var myFunction = function () {
  console.log(this); // this = global, [object Window]
};
myFunction();

var myObject = {};
myObject.myMethod = function () {
  console.log(this); // this = Object { myObject }
};

var nav = document.querySelector('.nav'); // <nav class="nav">
var toggleNav = function () {
  console.log(this); // this = <nav> element
};
nav.addEventListener('click', toggleNav, false);
```
Even inside the same function the scope can be changed and the this value can be changed:

```
var nav = document.querySelector('.nav'); // <nav class="nav">
var toggleNav = function () {
  console.log(this); // <nav> element
  setTimeout(function () {
    console.log(this); // [object Window]
  }, 1000);
};
nav.addEventListener('click', toggleNav, false);
```

##Changing scope with .call(), .apply() and .bind()
The .call() and .apply() methods are really sweet, they allows you to pass in a scope to a function, which binds the correct this value. 
<code>
var links = document.querySelectorAll('nav li');
for (var i = 0; i < links.length; i++) {
  (function () {
    console.log(this);
  }).call(links[i]);
}
</code>
*.call(scope, arg1, arg2, arg3) takes individual arguments, comma separated, whereas .apply(scope, [arg1, arg2]) takes an Array of arguments.
Unlike the above, using .bind() does not invoke a function, it merely binds the values before the function is invoked.

##Private and Public Scope
In many programming languages, you’ll hear about public and private scope, in JavaScript there is no such thing. We can, however, emulate public and private scope through things like Closures.
A simple way to create private scope, is by wrapping our functions inside a function.
<code>
(function () {
  var myFunction = function () {
    // do some stuff here
  };
})();
</code>
But what if I want the function to be public?
<code>
// define module
var Module = (function () {
  return {
    myMethod: function () {
      console.log('myMethod has been called.');
    }
  };
})();
// call module + methods
Module.myMethod();
</code>











