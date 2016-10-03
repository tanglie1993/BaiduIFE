function $(id) {
    return document.getElementById(id);
}

function renderResult(result) {
    $("result").innerHTML = result;
}
//
//换行、空格（全角/半角）、逗号（全角/半角）、顿号、分号

function getTextContent() {
    var regex = /[\n\s,，、;；]/;
    var array = $("hobby").value.split(regex);
    var map = new Object();
    for (var i = 0; i < array.length; i++) {
        map[array[i]] = 1;
    }
    return map;
}


$("button").onclick = function () {
     var map = getTextContent();
    var properties = Object.getOwnPropertyNames(map);
    var result = "";
        for(var i = 0; i < properties.length; i++){
            result += "<p><input type=\"checkbox\" name=\"category\"/>" + properties[i] + " </p> ";
        }
        $("result").innerHTML = result;
};

$("hobby").oninput = function () {
    var map = getTextContent();
    var properties = Object.getOwnPropertyNames(map);
    if (properties.length > 3) {
        $("hint").innerHTML = "error";
    } else {
        $("hint").innerHTML = "";
    }
};