
var isInEditMode = false;
var selectedItem = selectData();

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

function initElements() {
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
    
    $("finishedTasksButton").onclick = function(){
        $("finishedTasksButton").className = "selectTasksDiv border";
        $("unfinishedTasksButton").className = "unselectTasksDiv";
        $("allTasksButton").className = "unselectTasksDiv";
        fillTasksList("finished");
    }
    $("unfinishedTasksButton").onclick = function(){
        $("finishedTasksButton").className = "unselectTasksDiv";
        $("unfinishedTasksButton").className = "selectTasksDiv border";
        $("allTasksButton").className = "unselectTasksDiv";
        fillTasksList("unfinished");
    }
    $("allTasksButton").onclick = function(){
        $("finishedTasksButton").className = "unselectTasksDiv";
        $("unfinishedTasksButton").className = "unselectTasksDiv";
        $("allTasksButton").className = "selectTasksDiv border";
        fillTasksList("all");
    }
    $("finishedTasksButton").className = "unselectTasksDiv";
    $("unfinishedTasksButton").className = "unselectTasksDiv";
    $("allTasksButton").className = "selectTasksDiv border";
    
    $("addCategoryImage").onclick = function(){
        var newFolderName = prompt("请输入分类名称");
        if(newFolderName !== null){
            addFolder(newFolderName);
            fillProjectsList();
        }
    }
    
    $("addTaskImage").onclick = function(){
        var taskName = prompt("请输入任务名称");
        if(taskName !== null){
            addTask(taskName);
            fillTasksList("all");
        }
    }
}

initData();
fillTasksList("all");
fillProjectsList();
initElements();
//switchToEditMode();
//switchToViewMode();