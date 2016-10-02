// 判断arr是否为一个数组，返回一个bool值
function isArray(arr) {
    return Object.prototype.toString.call(arr) === '[object Array]';
}

// 判断fn是否为一个函数，返回一个bool值
function isFunction(fn) {
    return typeof test == 'function';
}

function clone(obj) {
    var o;
    if (typeof obj == "object") {
        if (obj === null) {
            o = null;
        } else {
            if (obj instanceof Array) {
                o = [];
                for (var i = 0, len = obj.length; i < len; i++) {
                    o.push(clone(obj[i]));
                }
            } else {
                o = {};
                for (var j in obj) {
                    o[j] = clone(obj[j]);
                }
            }
        }
    } else {
        o = obj;
    }
    return o;
}

// 对数组进行去重操作，只考虑数组中元素为数字或字符串，返回一个去重后的数组
function uniqArray(arr) {
    var map = new Object();
    var result = new Array();
    for (var i = 0, len = arr.length; i < len; i++) {
        var str = new String(arr[i]);
        if (map[str] != "1") {
            result.push(arr[i]);
            map[str] = "1";
        }
    }
    return result;
}

// 使用示例
var a = [1, 3, 5, 7, 5, 3];
var b = uniqArray(a);
console.log(b); // [1, 3, 5, 7]


function simpleTrim(str) {
  var result = new String();
  for(var i = 0; i < str.toString().length; i++){
    var char = str.toString().charAt(i);
    console.log(char);
    if(char != " "){
     result = result + char;
    }
  }
  return result;
}

function trim(str) {
    str.match(/^\s+(\S+)\s+$/)[1]
}

function each(arr, fn) {
  for(var i = 0; i < arr.length; i++){
    fn(arr[i], i);
  }
}

function getObjectLength(obj) {
  var count = 0;
  for(var i in obj){
    count++;
  }
  return count;
}

function isEmail(emailStr) {
  var pattern =new RegExp("^.+@.+\..+$");
  return pattern.test(emailStr);
}