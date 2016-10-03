function $(id) {
    return document.getElementById(id);
}

function renderResult(result) {
    $("result").innerHTML = result;
}
//
//换行、空格（全角/半角）、逗号（全角/半角）、顿号、分号


$("button").onclick = function () {
    var regex=/[\n\s,，、;；]/;
    var array = $("hobby").value.split(regex);
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