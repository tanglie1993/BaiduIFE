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

function selectTasksSortByDate(type){
    var result = new Array();
    var resultDay = new Array();
    if(window.localStorage.length == 0){
        result.push(resultDay);
        return result;
    }
    var storage = getSortedStorage();
    var lastTask = undefined; 
    for (var i = 0; i <= storage.length - 1; i++) {
        var val = storage[i]; 
        if(type == "finished" && val.type != "finished"){
            continue;
        }
        if(type == "unfinished" && val.type != "unfinished"){
            continue;
        }
        if(lastTask === undefined){
            lastTask = val;
        }
        if(!inSameDay(lastTask.date, val.date)){
            result.push(resultDay);
            resultDay = new Array();
            lastTask = val;
        }
        resultDay.push(val);
    }
    result.push(resultDay);
    return result;
}

function getFolderList(){
    var result = new Array();
    var projects = new Object();
    for (var i = 0; i <= window.localStorage.length - 1; i++) {
        var key = window.localStorage.key(i);
        var val = window.localStorage.getItem(key); 
        val = JSON.parse(val);
        if(val.id >= 10000 && val.id < 20000){
            if(projects[val.folder] === undefined){
                projects[val.folder] = new Array();
            }
            projects[val.folder].push(val);
        }
    }
    for (var i = 0; i <= window.localStorage.length - 1; i++) {
        var key = window.localStorage.key(i);
        var val = window.localStorage.getItem(key); 
        val = JSON.parse(val);
        if(val.id < 20000){
            continue;
        }
        val.projects = projects[val.id];
        result.push(val);
    }
    return result;
}

function getSortedStorage(){
    var result = new Array();
    for (var i = 0; i <= window.localStorage.length - 1; i++) {
        var key = window.localStorage.key(i);
        var val = window.localStorage.getItem(key); 
        val = JSON.parse(val);
        if(val.id > 9999){
            continue;
        }
        result.push(val);
    }
    result.sort(function(val1, val2){
        var dateArray1 = val1.date.split("-");
        var dateArray2 = val2.date.split("-");
        if(dateArray1[0] - dateArray2[0] > 0){
            return 1;
        }else if(dateArray1[0] - dateArray2[0] < 0){
            return -1;
        }else if(dateArray1[1] - dateArray2[1] > 0){
            return 1;
        }else if(dateArray1[1] - dateArray2[1] < 0){
            return -1;
        }else if(dateArray1[2] - dateArray2[2] > 0){
            return 1;
        }else if(dateArray1[2] - dateArray2[2] < 0){
            return -1;
        }else{
            return 0;
        }
    })
    return result;
}

function inSameDay(date1, date2){
    var dateArray1 = date1.split("-");
    var dateArray2 = date2.split("-");
    return dateArray1[0] == dateArray2[0] &&
        dateArray1[1] == dateArray2[1] &&
        dateArray1[2] == dateArray2[2];
}