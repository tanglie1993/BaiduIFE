function $(id) {
    return document.getElementById(id);
}

function add(num1, num2) {
    return num1 + num2;
}

function renderResult(result) {
    $("result").innerHTML = result;
}

function addEventHandle() {
    var num1 = $("number1").value;
    var num2 = $("number2").value;
    var result = add(num1, num2);
    renderResult(result);
}

 function getCookieValue(cookieName)  
{  
    var cookieValue = document.cookie;  
    var cookieStartAt = cookieValue.indexOf(""+cookieName+"=");  
    if(cookieStartAt==-1)  
    {  
        cookieStartAt = cookieValue.indexOf(cookieName+"=");  
    }  
    if(cookieStartAt==-1)  
    {  
        cookieValue = null;  
    }  
    else  
    {  
        cookieStartAt = cookieValue.indexOf("=",cookieStartAt)+1;  
        cookieEndAt = cookieValue.indexOf(";",cookieStartAt);  
        if(cookieEndAt==-1)  
        {  
            cookieEndAt = cookieValue.length;  
        }  
        cookieValue = unescape(cookieValue.substring(cookieStartAt,cookieEndAt));//解码latin-1  
    }  
    return cookieValue;  
}  


$("result").innerHTML = document.cookie;
