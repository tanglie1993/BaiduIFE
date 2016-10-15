var selectedTaskLi = null;

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
        addInnerListItem(innerList, tasksInDate[i].title, tasksInDate[i].id);
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

function addInnerListItem(innerList, title, taskId){
    var innerListItem = document.createElement("li");
    innerListItem.className = "todoName";
    var innerListItemContent = document.createElement("p");
    innerListItemContent.className = "todoNameText";
    innerListItemContent.innerHTML = title;
    innerListItem.selected = false;
    innerListItem.onclick = function(){
        if(innerListItem.selected == false){
            innerListItem.className = "todoNameSelected";
            innerListItem.selected = true;
            innerListItem.deleteImage.style.visibility = "visible";
            if(selectedTaskLi !== null){
                selectedTaskLi.className = "todoName";
                selectedTaskLi.selected = false;
                selectedTaskLi.deleteImage.style.visibility = "hidden";
            }
            selectedTaskLi = innerListItem;
        }else{
            innerListItem.className = "todoName";
            innerListItem.selected = false;
            innerListItem.deleteImage.style.visibility = "hidden";
            selectedTaskLi = null;
        }
    }
    innerListItem.onmouseover = function () {
        if(innerListItem.selected == false){
            innerListItem.className = "todoNameSelected";
            innerListItem.deleteImage.style.visibility = "visible";
        }
    }
    innerListItem.onmouseout = function () {
        if(innerListItem.selected == false){
            innerListItem.className = "todoName";
            innerListItem.deleteImage.style.visibility = "hidden";
        }
        
    }
    
    innerListItem.deleteImage = document.createElement("img");
    innerListItem.deleteImage.className = "projectDeleteImage";
    innerListItem.deleteImage.src = "img/delete_task.png";
    innerListItem.deleteImage.style.visibility = "hidden";
    innerListItem.deleteImage.onclick = function () {
        var r = confirm("是否确定删除？");
        if (r == true) {
            deleteTask(taskId);
            fillTasksList(selectedTasksType);
        }
    }
    innerListItem.appendChild(innerListItem.deleteImage);
    innerListItem.appendChild(innerListItemContent);
    innerList.appendChild(innerListItem);
}