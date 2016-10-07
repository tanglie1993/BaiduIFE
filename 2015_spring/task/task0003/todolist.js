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
}

function fillTasksList(type) {
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

function fillProjectsList(){
    var folderList = getFolderList();
    for(var i = 0; i < folderList.length; i++){
        addFolderItem(folderList[i]);
    }
}

function addFolderItem(folder){
    var folderItem = document.createElement("li");
    addFolderItemHeader(folderItem, folder.name);
    for(var i = 0; i < folder.projects.length; i++){
        addProjectItem(folderItem, folder.projects[i].name);
    }
    $("projectList").appendChild(folderItem);
}

function addFolderItemHeader(folderItem, name){
    var categoryNameDiv = document.createElement("div");
    categoryNameDiv.className = "categoryNameDiv";
    var folderImage = document.createElement("img");
    folderImage.className = "categoryNameImage";
    folderImage.src = "img/folder.png";
    var categoryNameText = document.createElement("p");
    categoryNameText.className = "categoryNameText";
    categoryNameText.innerHTML = name;
    categoryNameDiv.appendChild(folderImage);
    categoryNameDiv.appendChild(categoryNameText);
    folderItem.appendChild(categoryNameDiv);
}

function addProjectItem(folderItem, name){
    var projectName = document.createElement("li");
    projectName.className="projectName";
    var projectNameImage = document.createElement("img");
    projectNameImage.className = "projectNameImage";
    projectNameImage.src = "img/task.png";
    var projectNameText = document.createElement("p");
    projectNameText.className = "projectNameText";
    projectNameText.innerHTML = name;
    projectName.appendChild(projectNameImage);
    projectName.appendChild(projectNameText);
    folderItem.appendChild(projectName);
}

fillTasksList("all");
fillProjectsList();
initElements();
//switchToEditMode();
//switchToViewMode();