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
    addFolderItemHeader(folderItem, folder.name, folder.id);
    for (var i = 0; i < folder.projects.length; i++) {
        addProjectItem(folderItem, folder.projects[i].name);
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
    deleteImage.src = "img/delete.png";
    deleteImage.onclick = function () {
        var r = confirm("是否确定删除？");
        if (r == true) {
            deleteFolder(id);
            fillProjectsList();
        }
    };
    deleteImage.style.visibility = "hidden";
    categoryNameDiv.appendChild(deleteImage);

    categoryNameDiv.appendChild(categoryNameText);
    categoryNameDiv.onmouseover = function () {
        categoryNameDiv.className = "categoryNameDivSelected";
        deleteImage.style.visibility = "visible";
    }
    categoryNameDiv.onmouseout = function () {
        categoryNameDiv.className = "categoryNameDiv";
        deleteImage.style.visibility = "hidden";
    }
    folderItem.appendChild(categoryNameDiv);
}

function addProjectItem(folderItem, name) {
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
    folderItem.appendChild(projectName);
}