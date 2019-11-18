function printFunction(){
    alert("This alert is appearing because you " +
        "closed the print box or you are printing a document");
}

function resetFunction(){
    alert("This alert is appearing because you " +
        "reset the form");
}

function keyPressFunction(){
    alert("This alert is appearing because you " +
        "pressed a key in a text box");
}

function onclickFunction(x){
    x.style.height="100px";
    x.style.width="100px";
    x.style.background="red";
    
}

function onMouseOverFunction(x){
    x.style.height="100px";
    x.style.width="100px";
    x.style.background="blue";
    x.style.padding="0px";
    
}

function onMouseOutFunction(x){
    x.style.height="200px";
    x.style.width="200px";
    x.style.background="#79390C";
    x.style.padding="1em";
    
}

function onTouchFunction(x){
    x.style.height="250px";
    x.style.width="250px";
    x.style.background="blue";
    x.style.padding="1em";
    
}

function animationFunction(x){
    x.style.animation = "myAnimation 4s infinte";
    x.style.WebkitAnimation = "myAnimation 4s infinite";
}

