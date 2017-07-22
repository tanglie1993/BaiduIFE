var selectedProjectId;
var selectedTasksType = "all";
var selectedProject = null;
var selectedTaskLi = null;
var selectedItem = null;
var isInEditMode = false;

function initData(){
    if(getFolderList().length === 0){
        addFolder("默认文件夹");
    }
}

function finishTask(task){
    task.type = "finished";
    window.localStorage.setItem(task.id, JSON.stringify(task));
}

function select(id){
    for (var i = 0; i <= window.localStorage.length - 1; i++) {
        var key = window.localStorage.key(i);
        if(parseInt(key) === id){
            var val = window.localStorage.getItem(key); 
            return JSON.parse(val);
        }
    }
    return null;
}

function addFolder(name){
    var folder = {};
    var maxId = getFolderMaxId();
    folder.id = maxId+1;
    folder.name = name;
    window.localStorage.setItem(folder.id, JSON.stringify(folder));
}

function addTask(name){
    var task = {};
    var maxId = getTaskMaxId();
    task.id = maxId+1;
    task.title = name;
    task.type = "unfinished";
    task.content = "";
    task.date = getFormattedDate();
    if(selectedProjectId === null){
        task.projectId = -1;
    }else{
        task.projectId = selectedProjectId;
    }
    
    
    window.localStorage.setItem(task.id, JSON.stringify(task));
}

function getFormattedDate() {
    var date = new Date();
    var year = date.getFullYear();

    var month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : '0' + month;

    var day = date.getDate().toString();
    day = day.length > 1 ? day : '0' + day;

    return  year + '-' + month + '-' + day;
}

function addProject(name, folderId){
    var project = {};
    var maxId = getProjectMaxId();
    project.id = maxId+1;
    project.name = name;
    project.folder = folderId;
    window.localStorage.setItem(project.id, JSON.stringify(project));
}

function getTaskMaxId(){
    var maxId = 0;
    for (var i = 0; i <= window.localStorage.length - 1; i++) {
        var key = window.localStorage.key(i);
        var val = window.localStorage.getItem(key); 
        val = JSON.parse(val);
        if(val.id < 10000 && val.id > maxId){
            maxId = val.id;
        }
    }
    return maxId;
}

function getProjectMaxId(){
    var maxId = 10000;
    for (var i = 0; i <= window.localStorage.length - 1; i++) {
        var key = window.localStorage.key(i);
        var val = window.localStorage.getItem(key); 
        val = JSON.parse(val);
        if(val.id >= 10000 && val.id < 20000 && val.id > maxId){
            maxId = val.id;
        }
    }
    return maxId;
}

function deleteFolder(id){
    window.localStorage.removeItem(id);
    var projects = {};
    for (var i = 0; i <= window.localStorage.length - 1; i++) {
        var key = window.localStorage.key(i);
        var val = window.localStorage.getItem(key); 
        val = JSON.parse(val);
        if(val.id >= 10000 && val.id < 20000 && val.folder === id){
            projects[val.id] = true;
            window.localStorage.removeItem(parseInt(key));
        }
    }
    for (var i = 0; i <= window.localStorage.length - 1; i++) {
        var key = window.localStorage.key(i);
        var val = window.localStorage.getItem(key); 
        val = JSON.parse(val);
        if(val.id < 10000 && projects[val.projectId] !== null){
            window.localStorage.removeItem(parseInt(key));
        }
    }
}

function deleteTask(id){
    window.localStorage.removeItem(id);
}

function deleteProject(id){
    window.localStorage.removeItem(id);
    for (var i = 0; i <= window.localStorage.length - 1; i++) {
        var key = window.localStorage.key(i);
        if(parseInt(key) < 10000){
            var val = window.localStorage.getItem(key);
            if(JSON.parse(val).projectId === id){
                window.localStorage.removeItem(parseInt(key));
            }
        }
    }
}

function getFolderMaxId(){
    var maxId = 20000;
    for (var i = 0; i <= window.localStorage.length - 1; i++) {
        var key = window.localStorage.key(i);
        var val = window.localStorage.getItem(key); 
        val = JSON.parse(val);
        if(val.id >= 20000 && val.id > maxId){
            maxId = val.id;
        }
    }
    return maxId;
}

function selectTasksSortByDate(type){
    if(type === null){
        type = selectedTasksType;
    }else{
        selectedTasksType = type;
    }
    
    var result = [];
    var resultDay = [];
    if(window.localStorage.length === 0){
        return result;
    }
    var storage = getSortedStorage();
    var lastTask = undefined; 
    for (var i = 0; i <= storage.length - 1; i++) {
        var val = storage[i]; 
        if(type === "finished" && val.type !== "finished"){
            continue;
        }
        if(type === "unfinished" && val.type !== "unfinished"){
            continue;
        }
        if(selectedProjectId !== null && selectedProjectId !== val.projectId){
            continue;
        }
        if(lastTask === undefined){
            lastTask = val;
        }
        if(!inSameDay(lastTask.date, val.date)){
            result.push(resultDay);
            resultDay = [];
            lastTask = val;
        }
        resultDay.push(val);
    }
    if(resultDay.length > 0){
        result.push(resultDay);
    }
    return result;
}

function getFolderList(){
    var result = [];
    var projects = {};
    for (var i = 0; i <= window.localStorage.length - 1; i++) {
        var key = window.localStorage.key(i);
        var val = window.localStorage.getItem(key); 
        val = JSON.parse(val);
        if(val.id >= 10000 && val.id < 20000){
            if(projects[val.folder] === undefined){
                projects[val.folder] = [];
            }
            projects[val.folder].push(val);
        }
    }
    for (var i = 0; i <= window.localStorage.length - 1; i++) {
        var key = window.localStorage.key(i);
        var val = window.localStorage.getItem(key); 
        val = JSON.parse(val);
        if(val.id < 20000){
            continue;
        }
        val.projects = projects[val.id];
        if(val.projects === undefined){
            val.projects = [];
        }
        result.push(val);
    }
    return result;
}

function getSortedStorage(){
    var result = [];
    for (var i = 0; i <= window.localStorage.length - 1; i++) {
        var key = window.localStorage.key(i);
        var val = window.localStorage.getItem(key); 
        val = JSON.parse(val);
        if(val.id > 9999){
            continue;
        }
        result.push(val);
    }
    result.sort(function(val1, val2){
        var dateArray1 = val1.date.split("-");
        var dateArray2 = val2.date.split("-");
        if(dateArray1[0] - dateArray2[0] > 0){
            return 1;
        }else if(dateArray1[0] - dateArray2[0] < 0){
            return -1;
        }else if(dateArray1[1] - dateArray2[1] > 0){
            return 1;
        }else if(dateArray1[1] - dateArray2[1] < 0){
            return -1;
        }else if(dateArray1[2] - dateArray2[2] > 0){
            return 1;
        }else if(dateArray1[2] - dateArray2[2] < 0){
            return -1;
        }else{
            return 0;
        }
    });
    return result;
}

function inSameDay(date1, date2){
    var dateArray1 = date1.split("-");
    var dateArray2 = date2.split("-");
    return dateArray1[0] === dateArray2[0] &&
        dateArray1[1] === dateArray2[1] &&
        dateArray1[2] === dateArray2[2];
}