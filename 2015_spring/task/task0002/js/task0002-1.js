function $(id) {
    return document.getElementById(id);
}

function renderResult(result) {
    $("result").innerHTML = result;
}


$("button").onclick = function () {
    var array = $("hobby").value.split(",");
    var map = new Object();
    for (var i = 0; i < array.length; i++) {
        map[array[i]] = 1;
    }
    var result = new String();
    for(var key in map){
        result += key + "</br>";
    }
    $("result").innerHTML = result;
};