function $(id) {
    return document.getElementById(id);
}

function switchToEditMode(){
    $("selectedTaskTitleText").style.visibility = "hidden";
    $("tickImage").style.visibility = "hidden";
    $("writeImage").style.visibility = "hidden";
    $("selectedTaskNameInput").style.visibility = "visible";

    $("selectedTaskTimeInput").style.visibility = "visible";
    $("selectedTaskTimeText").innerHTML = "任务日期";
    
    $("selectedTaskContentText").style.visibility = "hidden";
    $("selectedTaskContentTextArea").style.visibility = "visible";
}

function switchToViewMode(){
    $("selectedTaskTitleText").style.visibility = "visible";
    $("tickImage").style.visibility = "visible";
    $("writeImage").style.visibility = "visible";
    $("selectedTaskNameInput").style.visibility = "hidden";
    
    $("selectedTaskTimeInput").style.visibility = "hidden";
    $("selectedTaskTimeText").innerHTML = "任务日期：2015-04-30";
    
    $("selectedTaskContentText").style.visibility = "visible";
    $("selectedTaskContentTextArea").style.visibility = "hidden";
}

switchToEditMode();
//switchToViewMode();