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

function getPosition(element) {
    var result = new Object();
    result.x = $(element).offsetTop;
    result.y = $(element).offsetLeft;
    return result
}

function traversal(element) {
    if (element === null) {
        return;
    } else {
        if(element.id != "" && element.id !== undefined){
            console.log("element.id: " + element.id);
        }
        
        if (element.childNodes.length > 0) {
            for (var i = 0; i < element.childNodes.length; i++) {
                traversal(element.childNodes[i]);
            }
        }
    }
}

function traversal1(){
    traversal(document.body);
}


traversal1();
initEvent();