//get stock data ====================

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
                console.log("Showing response text:");
                console.log(xhr.responseText); 

                //set variables for stockdata
                var stockJson = JSON.parse(xhr.responseText);
                var firstKey = Object.keys(stockJson)[0];
                var ticker = stockJson["Global Quote"]["01. symbol"];
                var currentPrice = stockJson["Global Quote"]["05. price"];
                var previousClose = stockJson["Global Quote"]["08. previous close"];
                var tradingDay = stockJson["Global Quote"]["07. latest trading day"];

 
                

                //validate entry
                if(firstKey=="Error Message"){
                    document.getElementById("dataDisplay").innerHTML="Invalid entry";

                }else{
                 //set table variables
                 var tbl = document.getElementById("mainDisplay");
                 var row = tbl.insertRow();
                 var cell1 = row.insertCell();
                 var cell2 = row.insertCell();
                 var cell3 = row.insertCell();
                 var cell4 = row.insertCell();
                 cell1.innerHTML = ticker;
                 cell2.innerHTML = tradingDay;
                 cell3.innerHTML = currentPrice;
                 cell4.innerHTML = previousClose;
                    
                };                
                
    
                //store JSON string to local storage
                //var responseText = JSON.stringify(xhr.responseText);
                //localStorage.setItem("myData",responseText);
    
                //display incoming JSON data            
                //document.getElementById("dataDisplay").innerHTML=responseText;
    
            if(xhr.status==404){
                console.log("File or resource not found");
            }
            }
        }
    };
    
    //Personal api key: TXLZQ0VXP5QUYSXN

    //trim whitespace and carriage returns from user input
    var symbol = document.getElementById("userInput").value.trim().replace(/[\n\r]/g, '');

    //put trimmed output in url
    url = "https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol="+symbol+"&apikey=TXLZQ0VXP5QUYSXN";
    xhr.open('get',url,true);
    xhr.send();
    }

    /*
    Full data comes in like this:

{
    "Global Quote": {
        "01. symbol": "AAPL",
        "02. open": "267.4800",
        "03. high": "271.0000",
        "04. low": "267.3000",
        "05. price": "270.7100",
        "06. volume": "25447644",
        "07. latest trading day": "2019-12-06",
        "08. previous close": "265.5800",
        "09. change": "5.1300",
        "10. change percent": "1.9316%"
    }
}

    */
