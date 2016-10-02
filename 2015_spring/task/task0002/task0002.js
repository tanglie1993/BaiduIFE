function $(id) {
    return document.getElementById(id);
}

function add(num1, num2) {
    return num1 + num2;
}

function renderResult(result) {
    $("result").innerHTML = result;
}

function addEventHandle() {
    var num1 = $("number1").value;
    var num2 = $("number2").value;
    var result = add(num1, num2);
    renderResult(result);
}

$.prototype.click11 = function(element, listener){
    $(element).addEventListener("click", listener, false);
}

new $().click11("result", function clicklistener() {
    alert("onclick");
});
