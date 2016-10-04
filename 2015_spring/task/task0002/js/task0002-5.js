var isDragging = false;
var offsetX = 0;
var offsetY = 0;

function mouseMove(ev) {
    console.log("mouseMove");
    if (isDragging) {
        Ev = ev || window.event;
        var mousePos = mouseCoords(ev);
        document.getElementById("xxx").value = mousePos.x;
        document.getElementById("yyy").value = mousePos.y;
        document.getElementById("pic").style.top = mousePos.y - offsetY;
        document.getElementById("pic").style.left = mousePos.x - offsetX;
    }
}

function mouseDown(ev) {
    ev.target.parentNode.removeChild(ev.target);
    if (!isDragging) {
        Ev = ev || window.event;
        var mousePos = mouseCoords(ev);
        var top = document.getElementById("pic").offsetTop;
        var left = document.getElementById("pic").offsetLeft;
        document.getElementById("xxx").value = mousePos.x - left;
        document.getElementById("yyy").value = mousePos.y - top;
        offsetX = mousePos.x - left;
        offsetY = mousePos.y - top;
        isDragging = true;
    } else {
        isDragging = false;
    }
}

function mouseUp(ev) {
    isDragging = false;
}

function mouseCoords(ev) {
    if (ev.pageX || ev.pageY) {
        return {
            x: ev.pageX,
            y: ev.pageY
        };
    }
    return {
        x: ev.clientX + document.body.scrollLeft - document.body.clientLeft,
        y: ev.clientY + document.body.scrollTop - document.body.clientTop
    };
}

document.onmousemove = mouseMove;
document.getElementById("pic").onmousedown = mouseDown;
document.getElementById("pic").onmouseup = mouseUp;