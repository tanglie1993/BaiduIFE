var selectedProject = null;

function fillProjectsList() {
    while ($("projectList").hasChildNodes()) {
        $("projectList").removeChild($("projectList").lastChild);
    }
    var folderList = getFolderList();
    for (var i = 0; i < folderList.length; i++) {
        addFolderItem(folderList[i]);
    }
}

function addFolderItem(folder) {
    var folderItem = document.createElement("li");
    folderItem.className = "folderItem";
    addFolderItemHeader(folderItem, folder.name, folder.id);
    for (var i = 0; i < folder.projects.length; i++) {
        addProjectItem(folderItem, folder.projects[i].name, folder.projects[i].id);
    }
    $("projectList").appendChild(folderItem);
}

function addFolderItemHeader(folderItem, name, id) {
    var categoryNameDiv = document.createElement("div");
    categoryNameDiv.className = "categoryNameDiv";

    var categoryNameText = document.createElement("p");
    categoryNameText.className = "categoryNameText";
    categoryNameText.innerHTML = name;

    var folderImage = document.createElement("img");
    folderImage.className = "categoryNameImage";
    folderImage.src = "img/folder.png";
    categoryNameDiv.appendChild(folderImage);

    var deleteImage = document.createElement("img");
    deleteImage.className = "categoryDeleteImage";
    deleteImage.src = "img/delete_project.png";
    deleteImage.onclick = function () {
        var r = confirm("是否确定删除？");
        if (r == true) {
            deleteFolder(id);
            fillProjectsList();
        }
    };
    deleteImage.style.visibility = "hidden";
    categoryNameDiv.appendChild(deleteImage);

    var addImage = document.createElement("img");
    addImage.className = "categoryAddImage";
    addImage.src = "img/add_project.png";
    addImage.onclick = function () {
        var projectName = prompt("请输入项目名称");
        if(projectName !== null){
            addProject(projectName, id);
            fillProjectsList();   
        }
    };
    addImage.style.visibility = "hidden";
    categoryNameDiv.appendChild(addImage);

    categoryNameDiv.appendChild(categoryNameText);
    categoryNameDiv.onmouseover = function () {
        categoryNameDiv.className = "categoryNameDivSelected";
        deleteImage.style.visibility = "visible";
        addImage.style.visibility = "visible";
    }
    categoryNameDiv.onmouseout = function () {
        categoryNameDiv.className = "categoryNameDiv";
        deleteImage.style.visibility = "hidden";
        addImage.style.visibility = "hidden";
    }
    folderItem.appendChild(categoryNameDiv);
}

function addProjectItem(folderItem, name, projectId) {
    var projectName = document.createElement("li");
    projectName.className = "projectName";
    var projectNameImage = document.createElement("img");
    projectNameImage.className = "projectNameImage";
    projectNameImage.src = "img/task.png";
    var projectNameText = document.createElement("p");
    projectNameText.className = "projectNameText";
    projectNameText.innerHTML = name;
    projectName.appendChild(projectNameImage);
    projectName.appendChild(projectNameText);
    projectName.selected = false;
    projectName.deleteImage = document.createElement("img");
    projectName.deleteImage.className = "projectDeleteImage";
    projectName.deleteImage.src = "img/delete_project.png";
    projectName.deleteImage.onclick = function () {
        var r = confirm("是否确定删除？");
        if (r == true) {
            deleteProject(projectId);
            fillProjectsList();
        }
    };
    projectName.deleteImage.style.visibility = "hidden";
    projectName.appendChild(projectName.deleteImage);
    projectName.onclick = function(){
        if(projectName.selected == false){
            projectName.className = "projectNameSelected";
            projectName.selected = true;
            if(selectedProject === null){
               selectedProject = projectName;
               selectedProjectId = projectId;
            }else{
                selectedProject.className = "projectName";
                selectedProject.selected = false;
                selectedProject.deleteImage.style.visibility = "hidden";
                selectedProject = projectName;
                selectedProjectId = projectId;
            }
            fillTasksList("all");
        }else{
            projectName.className = "projectName";
            projectName.selected = false;
            projectName.deleteImage.style.visibility = "hidden";
        }
    }
    projectName.onmouseover = function () {
        if(projectName.selected == false){
            projectName.className = "projectNameSelected";
            projectName.deleteImage.style.visibility = "visible";
        }
    }
    projectName.onmouseout = function () {
        if(projectName.selected == false){
            projectName.className = "projectName";
            projectName.deleteImage.style.visibility = "hidden";
        }
        
    }
    folderItem.appendChild(projectName);
}