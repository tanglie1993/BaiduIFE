var selectedTaskDiv = null;

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
    innerListItemContent.selected = false;
    innerListItemContent.onclick = function(){
        if(innerListItemContent.selected == false){
            innerListItemContent.className = "todoNameTextSelected";
            innerListItemContent.selected = true;
            if(selectedTaskDiv !== null){
                selectedTaskDiv.className = "todoNameText";
                selectedTaskDiv.selected = false;
            }
            selectedTaskDiv = innerListItemContent;
        }else{
            innerListItemContent.className = "todoNameText";
            innerListItemContent.selected = false;
        }
    }
    innerListItemContent.onmouseover = function () {
        if(innerListItemContent.selected == false){
            innerListItemContent.className = "todoNameTextSelected";
        }
    }
    innerListItemContent.onmouseout = function () {
        if(innerListItemContent.selected == false){
            innerListItemContent.className = "todoNameText";
        }
        
    }
    innerListItem.appendChild(innerListItemContent);
    innerList.appendChild(innerListItem);
}