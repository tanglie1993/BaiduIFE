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

function initEvent() {
    $("addbtn").addEventListener("click", addEventHandle, false);
}

function addClass(element, newClassName) {
  $(element).className = newClassName;
}

function removeClass(element, oldClassName) {
    document.getElementById(element).removeClass(oldClassName); 
}

addClass("addbtn", "newclass");
removeClass("addbtn", "newclass");
initEvent();