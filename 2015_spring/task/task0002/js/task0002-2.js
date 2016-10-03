function $(id) {
    return document.getElementById(id);
}

function renderResult(result) {
    $("result").innerHTML = result;
}
//
//换行、空格（全角/半角）、逗号（全角/半角）、顿号、分号

function renderCountdown(myDate) {
    var currentTime = new Date().getTime();
    var inputTime = myDate.getTime();
    var result = new Object();
    result.day = (inputTime - currentTime) / (1000 * 86400);
    result.day = Math.floor(result.day);
    result.hour = ((inputTime - currentTime) % (1000 * 86400)) / (3600 * 1000);
    result.hour = Math.floor(result.hour);
    result.minute = ((inputTime - currentTime) % (1000 * 3600)) / (60 * 1000);
    result.minute = Math.floor(result.minute);
    result.second = ((inputTime - currentTime) % (60 * 1000)) / (1000);
    result.second = Math.floor(result.second);
    $("result").innerHTML = "" + result.day + ":" + result.hour + ":" + result.minute + ":" + result.second;
}

function readDate() {
    var array = $("date").value.split("-");
    var myDate = new Date();
    myDate.setFullYear(array[0]);
    myDate.setMonth(parseInt(array[1]) - 1);
    myDate.setDate(array[2]);
    myDate.setHours(0);
    myDate.setMinutes(0);
    myDate.setSeconds(0);
    myDate.setMilliseconds(0);
    return myDate;
}


$("button").onclick = timedCount();

function timedCount() {
    var date = readDate();
    renderCountdown(date);
    setTimeout("timedCount()", 1000)
}