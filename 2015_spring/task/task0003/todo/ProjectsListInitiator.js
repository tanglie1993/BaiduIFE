function fillProjectsList(){
    while ($("projectList").hasChildNodes()) {
        $("projectList").removeChild($("projectList").lastChild);
    }
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