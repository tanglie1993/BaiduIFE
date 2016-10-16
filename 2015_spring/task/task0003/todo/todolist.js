
var isInEditMode = false;

function switchToEditMode() {
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

function switchToViewMode() {
    
    $("selectedTaskTitleText").style.visibility = "visible";
    $("tickImage").style.visibility = "visible";
    $("writeImage").style.visibility = "visible";
    $("selectedTaskNameInput").style.visibility = "hidden";
    $("selectedTaskTitleText").innerHTML = selectedItem.title;

    
    $("selectedTaskTimeInput").style.visibility = "hidden";
    $("selectedTaskTimeText").innerHTML = "任务日期：" + selectedItem.date;

    
    $("selectedTaskContentText").style.visibility = "visible";
    $("selectedTaskContentText").innerHTML = selectedItem.content;
    $("selectedTaskContentTextArea").style.visibility = "hidden";

    $("saveContentDiv").style.visibility = "hidden";
    $("cancelContentDiv").style.visibility = "hidden";

    isInEditMode = false;
}

function initElements() {
    $("saveContentDiv").onclick = function () {
        selectedItem.title = $("selectedTaskNameInput").value;
        selectedItem.date = $("selectedTaskTimeInput").value;
        selectedItem.content = $("selectedTaskContentTextArea").value;
        switchToViewMode();
        window.localStorage.setItem(selectedItem.id, JSON.stringify(selectedItem));
        fillTasksList(selectedTasksType);
        
    };
    $("cancelContentDiv").onclick = function () {
        switchToViewMode();
        fillTasksList(selectedTasksType);
    };
    $("writeImage").onclick = function () {
        if(selectedItem !== null && !isInEditMode){
            switchToEditMode();
        }
    };
    $("tickImage").onclick = function () {
        if(selectedItem.id !== null){
            var finish = confirm("是否将任务标记为已完成？");
            if(finish == true){
                finishTask(selectedItem);
                fillTasksList(selectedTasksType);
            }
        }
    }

    $("selectedTaskNameInput").style.visibility = "hidden";

    $("selectedTaskTimeInput").style.visibility = "hidden";

    $("selectedTaskContentTextArea").style.visibility = "hidden";

    $("saveContentDiv").style.visibility = "hidden";
    $("cancelContentDiv").style.visibility = "hidden";
    
    $("finishedTasksButton").onclick = function(){
        if(!isInEditMode){
            $("finishedTasksButton").className = "selectTasksDiv border";
            $("unfinishedTasksButton").className = "unselectTasksDiv";
            $("allTasksButton").className = "unselectTasksDiv";
            fillTasksList("finished");
        }
    }
    $("unfinishedTasksButton").onclick = function(){
        if(!isInEditMode){
            $("finishedTasksButton").className = "unselectTasksDiv";
            $("unfinishedTasksButton").className = "selectTasksDiv border";
            $("allTasksButton").className = "unselectTasksDiv";
            fillTasksList("unfinished");
        }
    }
    $("allTasksButton").onclick = function(){
        if(!isInEditMode){
            $("finishedTasksButton").className = "unselectTasksDiv";
            $("unfinishedTasksButton").className = "unselectTasksDiv";
            $("allTasksButton").className = "selectTasksDiv border";
            fillTasksList("all");
        }
    }
    $("finishedTasksButton").className = "unselectTasksDiv";
    $("unfinishedTasksButton").className = "unselectTasksDiv";
    $("allTasksButton").className = "selectTasksDiv border";
    
    $("addCategoryImage").onclick = function(){
        if(isInEditMode){
            return;
        }
        var newFolderName = prompt("请输入分类名称");
        if(newFolderName !== null){
            addFolder(newFolderName);
            fillProjectsList();
        }
    }
    
    $("addTaskImage").onclick = function(){
        if(isInEditMode){
            return;
        }
        var taskName = prompt("请输入任务名称");
        if(taskName !== null){
            addTask(taskName);
            fillTasksList(selectedTasksType);
        }
    }
}

initData();
fillTasksList("all");
fillProjectsList();
initElements();
//switchToEditMode();
//switchToViewMode();