function $(id) {
    return document.getElementById(id);
}

var isInEditMode = false;
var selectedTaskTitle = "title";
var selectedTaskContent = "content";
var selectedTaskDate = "2016-01-01";


function switchToEditMode(){
    $("selectedTaskTitleText").style.visibility = "hidden";
    $("tickImage").style.visibility = "hidden";
    $("writeImage").style.visibility = "hidden";
    $("selectedTaskNameInput").style.visibility = "visible";
    $("selectedTaskNameInput").value = selectedTaskTitle;
    

    $("selectedTaskTimeInput").style.visibility = "visible";
    $("selectedTaskTimeText").innerHTML = "任务日期";
    $("selectedTaskTimeInput").value = selectedTaskDate;
    
    $("selectedTaskContentText").style.visibility = "hidden";
    $("selectedTaskContentTextArea").style.visibility = "visible";
    $("selectedTaskContentTextArea").value = selectedTaskContent;
    
    
    $("saveContentDiv").style.visibility = "visible";
    $("cancelContentDiv").style.visibility = "visible";

    isInEditMode = true;
}

function switchToViewMode(){
    selectedTaskTitle = $("selectedTaskNameInput").value;
    $("selectedTaskTitleText").style.visibility = "visible";
    $("tickImage").style.visibility = "visible";
    $("writeImage").style.visibility = "visible";
    $("selectedTaskNameInput").style.visibility = "hidden";
    $("selectedTaskTitleText").innerHTML = selectedTaskTitle;
    
    selectedTaskDate = $("selectedTaskTimeInput").value;
    $("selectedTaskTimeInput").style.visibility = "hidden";
    $("selectedTaskTimeText").innerHTML = "任务日期：" + selectedTaskDate;
    
    selectedTaskContent = $("selectedTaskContentTextArea").value;
    $("selectedTaskContentText").style.visibility = "visible";
    $("selectedTaskContentText").innerHTML = selectedTaskContent;
    $("selectedTaskContentTextArea").style.visibility = "hidden";
    
    $("saveContentDiv").style.visibility = "hidden";
    $("cancelContentDiv").style.visibility = "hidden";
    
    isInEditMode = false;
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
}

initElements();
//switchToEditMode();
//switchToViewMode();