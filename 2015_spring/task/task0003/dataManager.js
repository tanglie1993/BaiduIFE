function selectData(){
    var result = new Array();
    for (var i = 0; i <= window.localStorage.length - 1; i++) {
        var key = window.localStorage.key(i);
        var val = window.localStorage.getItem(key); 
        result.push(val);
    }
    if(result.length > 0){
        console.log("result[0]");
        return JSON.parse(result[0]);
    }else{
        var item = new Object();
        item.id = 1000;
        item.title = "title";
        item.date = "2016-01-01";
        item.content = "content";
        console.log("item");
        return item;
    }
}

function selectAllTasksSortByDate(){
    var result = new Array();
    var resultDay = new Array();
    if(window.localStorage.length == 0){
        result.push(resultDay);
        return result;
    }
    var lastTaskKey = window.localStorage.key(0);
    var lastTask = window.localStorage.getItem(lastTaskKey); 
    lastTask = JSON.parse(lastTask);
    for (var i = 0; i <= window.localStorage.length - 1; i++) {
        var key = window.localStorage.key(i);
        var val = window.localStorage.getItem(key); 
        val = JSON.parse(val);
        if(!inSameDay(lastTask.date, val.date)){
            result.push(resultDay);
            resultDay = new Array();
        }
        resultDay.push(val);
    }
    result.push(resultDay);
    return result;
}

function inSameDay(date1, date2){
    var dateArray1 = date1.split("-");
    var dateArray2 = date2.split("-");
    return dateArray1[0] == dateArray2[0] &&
        dateArray1[1] == dateArray2[1] &&
        dateArray1[2] == dateArray2[2];
}