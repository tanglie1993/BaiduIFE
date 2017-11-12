 The prototype object of JavaScript, introduced starting in JavaScript 1.1, is a prebuilt object that simplifies the process of adding custom properties/ methods to all instances of an object.
 
 A custom property added this way only exists for that instance of the object.

```
 //adding a custom property to a prebuilt object
var myimage=new Image()
myimage.size="26k"
 
/*adding a custom property to the custom object "circle"*/
//First, create the custom object "circle"
function circle(){
}
 
var smallcircle=new circle()
smallcircle.pi=3.14159
```
 
 Let's define the custom property "pi" in the above in a way so it's a default property of all instances of circle():

 ```
 //First, create the custom object "circle"
function circle(){
}
circle.prototype.pi=3.14159
```

 Let's extend our circle object so it contains a default method that does something simple, like alert the value of PI:

```
//First, create the custom object "circle"
function circle(){
}
circle.prototype.pi=3.14159
 
// create the object method
function alertmessage(){
    alert(this.pi)
}
circle.prototype.alertpi=alertmessage
```

Now, all instances of the circle object contain a alertmessage() method.



