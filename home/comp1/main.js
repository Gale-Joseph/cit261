var cars = ["Saab","Volvo","BMW"];
function checkMyCar(){
    var carCheck = parseInt(document.getElementById("carNum").value);
    if(carCheck>cars.length-1){
        document.getElementById("checkCarDiv").innerHTML="Number too high." +
        "Choose a number less than "+ String(cars.length) + ".";
    }else{
    document.getElementById("checkCarDiv").innerHTML=cars[carCheck];
    }
}

function seeCarTotal(){
    document.getElementById("totalCarsOutput").innerHTML="There are " + 
    String(cars.length) + " cars on the list."
}


//print out array
function printArray(){
    document.getElementById("inventoryOutput").innerHTML=cars.join(" ");
}

//search with for loop
function checkByCar(){
    var carInQuestion = document.getElementById("carCheck").value;
    console.log("var established");
    for(var i=0;i<cars.length;i++){
        if(cars[i].toLowerCase==carInQuestion.toLowerCase){
            document.getElementById("checkByCarOutput").innerHTML = carInQuestion + " has been found."
            break;
        }else{
            document.getElementById("checkByCarOutput").innerHTML = carInQuestion + " has not been found."

        }
    }
}

//while loop

//switch statement

//associate array

//conditional statements