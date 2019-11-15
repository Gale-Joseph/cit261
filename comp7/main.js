function changeBackground(){
    var myClass = document.getElementsByClassName("subsection");
    myClass[0].style.backgroundColor = "red";
}

function changeP(){
    var myClass = document.getElementsByClassName("paragraphDiv");
    myClass[0].style.backgroundColor = "green";
    myClass[0].style.borderColor = "black";
    myClass[1].style.color = "white";
    myClass[1].style.border="none";
}

function changePadding(){
    var myClass = document.getElementsByClassName("paragraphDiv");
    myClass[2].style.padding="2em";
    myClass[2].style.margin="2em";
    myClass[2].style.width="30%";
}