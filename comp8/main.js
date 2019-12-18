function changeBackground(elementParam,colorParam){
    //1. Create an object from parameters
    var myElement = document.getElementById(elementParam);

    //2. properties of object now include "style" and "transition"
    /* 
    a. set property to change
    b. time of transition
    c. how it will transition
    d. delay time*/
    myElement.style.transition = "background 2.0s linear 0s";

    //3. Set the final product you'd like to see: 
    myElement.style.background = colorParam;

}

function fadeOut(elementParam){
    //1. create object
    var myElement = document.getElementById(elementParam);
    //2. name the property you want to change and add transition arguments
    myElement.style.transition = "opacity .5s linear 0s";
    //3. say what the final product should look like
    myElement.style.opacity = 0;

}

function fadeIn(elementParam){
    //1. create object
    var myElement = document.getElementById(elementParam);
    //2. name the property you want to change and add transition arguments
    myElement.style.transition = "opacity .5s linear 0s";
    //3. say what the final product should look like
    myElement.style.opacity = 1;

}

function slideIn(elementParam){
    var myElement = document.getElementById(elementParam);
    myElement.style.transition ="left 1.0s linear 0s";
    myElement.style.left="10%";
}

function slideMore(elementParam){
    var myElement = document.getElementById(elementParam);
    myElement.style.transition ="left 1.0s linear 0s";
    myElement.style.left="400px";
}

function slideOff(elementParam){
    var myElement = document.getElementById(elementParam);
    myElement.style.transition ="left 1.0s linear 0s";
    myElement.style.left="-400px";
}

function myAnimation(){
    document.getElementById("boxAnimate").style.animation="colorbox-new 1s infinite";
}

function transformAnimation(){
    document.getElementById("transformAnimate").style.animation="transformAnimation 3s infinite";
}

function stoptransformAnimation(){
    document.getElementById("transformAnimate").style.animation="none";
}