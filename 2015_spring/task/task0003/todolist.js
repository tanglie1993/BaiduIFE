function $(id) {
    return document.getElementById(id);
}

var isInEditMode = false;
var selectedItem = selectData();

function switchToEditMode(){
    $("selectedTaskTitleText").style.visibility = "hidden";
    $("tickImage").style.visibility = "hidden";
    $("writeImage").style.visibility = "hidden";
    $("selectedTaskNameInput").style.visibility = "visible";
    $("selectedTaskNameInput").value = selectedItem.title;
    

    $("selectedTaskTimeInput").style.visibility = "visible";
    $("selectedTaskTimeText").innerHTML = "任务日期";
    $("selectedTaskTimeInput").value = selectedItem.date;
    
    $("selectedTaskContentText").style.visibility = "hidden";
    $("selectedTaskContentTextArea").style.visibility = "visible";
    $("selectedTaskContentTextArea").value = selectedItem.content;
    
    
    $("saveContentDiv").style.visibility = "visible";
    $("cancelContentDiv").style.visibility = "visible";

    isInEditMode = true;
}

function switchToViewMode(){
    selectedItem.title = $("selectedTaskNameInput").value;
    $("selectedTaskTitleText").style.visibility = "visible";
    $("tickImage").style.visibility = "visible";
    $("writeImage").style.visibility = "visible";
    $("selectedTaskNameInput").style.visibility = "hidden";
    $("selectedTaskTitleText").innerHTML = selectedItem.title;
    
    selectedItem.date = $("selectedTaskTimeInput").value;
    $("selectedTaskTimeInput").style.visibility = "hidden";
    $("selectedTaskTimeText").innerHTML = "任务日期：" + selectedItem.date;
    
    selectedItem.content = $("selectedTaskContentTextArea").value;
    $("selectedTaskContentText").style.visibility = "visible";
    $("selectedTaskContentText").innerHTML = selectedItem.content;
    $("selectedTaskContentTextArea").style.visibility = "hidden";
    
    $("saveContentDiv").style.visibility = "hidden";
    $("cancelContentDiv").style.visibility = "hidden";
    
    isInEditMode = false;
    
    window.localStorage.setItem(selectedItem.id, JSON.stringify(selectedItem));
}

function initElements(){
    $("saveContentDiv").onclick = function () { 
        switchToViewMode();
    };
    $("cancelContentDiv").onclick = function () { 
        switchToViewMode();
    };
    $("writeImage").onclick = function () { 
        switchToEditMode();
    };
    
    $("selectedTaskNameInput").style.visibility = "hidden";
    $("selectedTaskTitleText").innerHTML = selectedItem.title;
    
    $("selectedTaskTimeInput").style.visibility = "hidden";
    $("selectedTaskTimeText").innerHTML = "任务日期：" + selectedItem.date;
    
    $("selectedTaskContentText").innerHTML = selectedItem.content;
    $("selectedTaskContentTextArea").style.visibility = "hidden";
    
    $("saveContentDiv").style.visibility = "hidden";
    $("cancelContentDiv").style.visibility = "hidden";
}

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

initElements();
//switchToEditMode();
//switchToViewMode();