/*
Part 1----------------------------------------------
This JavaScript file does the following: (Fluency 4, 5)
1. Make an http request to alphavantage stock
2. Downloads a JSON string from alphavantage stock
3. Stores the JSON string to local storage
4. Prints the string to the index.html
5. Retrieves the local storage
6. Parses the string into a useable object
7. Prints select data from the object

Part 2---------------------------------------------
This file also does the following (Fluency 6):
1. Uses createElement to create a stock data information list
2. Uses appendChild to add stock data to a list
3. Uses insertBefore to add stock data to a list
4. Uses removeChild to reduce stock info on display
5. Uses replaceChild to swap values in stock display

Part 3------------------------------------------------
Finally, this file does the following for Fluency 5: 
1. Stores basic data, a basic array and an associative array to local storage after stringifying them
2. Retrives the data, parses it, and prints it for the user
*/


//Part 1-------------------------------------------------------
function getStockData(){

//1. Create an XMLHttpRequest object (request object)
const xhr = new XMLHttpRequest();

//2. Of the 5 stages of ready state, check for ready state '4' or done
/*3. Define an event listener or handler: onreadystatechange
    Explanation: if the state changes, call the function below*/
xhr.onreadystatechange = function getStockData (){
    if (xhr.readyState==4){
        if (xhr.status==200){

            //display in console the response text for troubleshooting
            console.log("Showing response text:")
            console.log(xhr.responseText); 

            //store JSON string to local storage
            var responseText = JSON.stringify(xhr.responseText);
            localStorage.setItem("myData",responseText);

            //display incoming JSON data            
            document.getElementById("dataDisplay").innerHTML=responseText;

        if(xhr.status==404){
            console.log("File or resource not found");
        }
        }
    }
};

//Personal api key: TXLZQ0VXP5QUYSXN
url = "https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=MSFT&apikey=TXLZQ0VXP5QUYSXN";
xhr.open('get',url,true);
xhr.send();
}

//Part 2-------------------------------------------------------------------
function seeTickerFunction(){
    //retrieve stored stock
    var readStockData = JSON.parse(localStorage.getItem("myData"));
    //parse twice because it was stringified twice
    var parseReadStockData = JSON.parse(readStockData);
    //verify type for troubleshooting
    console.log("Verify retrieved data type:");
    console.log(typeof parseReadStockData);

    //1. create node 
    var stockInfoList = document.createElement("LI");
    //2. create the textnode or text to be inserted into element
    var stockInfoTicker = document.createTextNode(parseReadStockData['Global Quote']['01. symbol']);
    //3. append the textnode to the node
    stockInfoList.appendChild(stockInfoTicker);
    //4. append the node to the element
    document.getElementById("stockInfoList").appendChild(stockInfoTicker);

}

function removeTickerFunction(){
    //demonstrate use of removeChild
    var stockInfoList = document.getElementById("stockInfoList");
    stockInfoList.removeChild(stockInfoList.childNodes[0]);
}

function addPriceFunction(){
    //retrieve stored stock
    var readStockData = JSON.parse(localStorage.getItem("myData"));
    //parse twice because it was stringified twice
    var parseReadStockData = JSON.parse(readStockData);
    //verify type for troubleshooting
    console.log("Verify retrieved data type:");
    console.log(typeof parseReadStockData);

    //demonstrate use of insertBefore
    var stockInfoList = document.createElement("LI");
    var priceInfo = document.createTextNode(parseReadStockData['Global Quote']['05. price']);
    stockInfoList.appendChild(priceInfo);

    var list = document.getElementById("stockInfoList");
    list.insertBefore(stockInfoList, list.childNodes[0]);
}

//replace the price
function replaceFunction(){
    var replacement = document.createTextNode("Replacement Value");
    var stockInfoList = document.getElementById("stockInfoList").childNodes[0];
    stockInfoList.replaceChild(replacement,stockInfoList.childNodes[0]);
}

//Part 3-------------------------------------------------------------------------------
//function for storing and retreiving data locally
function storeData(){
    var myName = "Joe";
    var myPetArray = ['cat','dog','fish','bird'];
    var myAssocArray = {"mystock":"spy","myPrice":300,"myDate":"Nov 23, 2019"};

    localStorage.setItem("myName",myName);
    localStorage.setItem("myPetArray",JSON.stringify(myPetArray));
    localStorage.setItem("myAssocArray",JSON.stringify(myAssocArray));

    document.getElementById("savedInfo").textContent = "myName, myPetArray, and myAssocArray are saved to local storage";

}

function retrieveData(){
    var name = localStorage.getItem("myName");
    var pets = JSON.parse(localStorage.getItem("myPetArray"));
    var myAssoc = JSON.parse(localStorage.getItem("myAssocArray"));

    document.getElementById("retrieveName").innerHTML=name;
    console.log(name)
    document.getElementById("retrievePets").innerHTML=pets;
    console.log(pets)
    document.getElementById("retrieveAssoc").textContent= 
        myAssoc.mystock + " " + myAssoc.myPrice + " " + myAssoc.myDate;
    console.log(myAssoc)
}
