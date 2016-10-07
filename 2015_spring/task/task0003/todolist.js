function $(id) {
    return document.getElementById(id);
}

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
        fillList("finished");
    }
    $("unfinishedTasksButton").onclick = function(){
        $("finishedTasksButton").className = "unselectTasksDiv";
        $("unfinishedTasksButton").className = "selectTasksDiv border";
        $("allTasksButton").className = "unselectTasksDiv";
        fillList("unfinished");
    }
    $("allTasksButton").onclick = function(){
        $("finishedTasksButton").className = "unselectTasksDiv";
        $("unfinishedTasksButton").className = "unselectTasksDiv";
        $("allTasksButton").className = "selectTasksDiv border";
        fillList("all");
    }
    $("finishedTasksButton").className = "unselectTasksDiv";
    $("unfinishedTasksButton").className = "unselectTasksDiv";
    $("allTasksButton").className = "selectTasksDiv border";
}

function fillList(type) {
    $("dateTaskList").innerHTML = "";
    var tasksByDate = selectTasksSortByDate(type);
    for(var i = 0; i < tasksByDate.length; i++){
        addOuterListItem(tasksByDate[i]);
    } 
}

function addOuterListItem(tasksInDate){
    var outerListItem = document.createElement("li");
    addOuterListItemTitle(outerListItem, tasksInDate[0].date);
    for(var i = 0; i < tasksInDate.length; i++){
        var innerList = document.createElement("ul");
        addInnerListItem(innerList, tasksInDate[i].title);
        outerListItem.appendChild(innerList);
    } 
    $("dateTaskList").appendChild(outerListItem);
}

function addOuterListItemTitle(outerListItem, date){
    var outerListItemTitleDiv = document.createElement("div");
    outerListItemTitleDiv.className = "dateDiv";
    var outerListItemTitleContent = document.createElement("p");
    outerListItemTitleContent.className = "dateText";
    outerListItemTitleContent.innerHTML = date;
    outerListItemTitleDiv.appendChild(outerListItemTitleContent);
    outerListItem.appendChild(outerListItemTitleDiv);
}

function addInnerListItem(innerList, title){
    var innerListItem = document.createElement("li");
    innerListItem.className = "todoName";
    var innerListItemContent = document.createElement("p");
    innerListItemContent.className = "todoNameText";
    innerListItemContent.innerHTML = title;
    innerListItem.appendChild(innerListItemContent);
    innerList.appendChild(innerListItem);
}

fillList("all");
initElements();
//switchToEditMode();
//switchToViewMode();