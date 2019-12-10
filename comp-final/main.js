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
                //store response text to local storage to generate all tables
                var responseText = xhr.responseText;
                localStorage.setItem("searchResult",responseText);
    
                //print response text to console for troubleshooting
                console.log("Showing response text:");
                console.log(xhr.responseText); 

                //display results
                displayResults();
    
            if(xhr.status==404){
                console.log("File or resource not found");
            }
            }
        }
    };

    //trim whitespace and carriage returns from user input
    var symbol = document.getElementById("userInput").value.trim().replace(/[\n\r]/g, '');

    //add trimmed output variable 'symbol' in url and send request
    url = "https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol="
            +symbol+"&apikey=TXLZQ0VXP5QUYSXN";
    xhr.open('get',url,true);
    xhr.send();
    }

    /* ***** Functions ***** */

    //delete current results table if it exists so that only one table shows after stock search
    function deleteTable(tableId){
        if(document.getElementById(tableId) != null){
            document.getElementById(tableId).remove();
            console.log("Table deleted");
        }

    }

    //general create table function for all tables in app
    function createTable(elementId,tableId,rowId){

        var t = document.createElement('table');
        t.setAttribute("id", tableId);
        document.getElementById(elementId).appendChild(t);
      
        var r = document.createElement('tr');
        r.setAttribute("id", rowId);
        document.getElementById(tableId).appendChild(r);
      
        var c = document.createElement('td');
        var cinput = document.createTextNode("Symbol");
        c.appendChild(cinput);
        document.getElementById(rowId).appendChild(c);

        var c2 = document.createElement('td');
        var c2input = document.createTextNode("Date");
        c2.appendChild(c2input);
        document.getElementById(rowId).appendChild(c2);

        var c3 = document.createElement('td');
        var c3input = document.createTextNode("Current Price");
        c3.appendChild(c3input);
        document.getElementById(rowId).appendChild(c3);

        var c4 = document.createElement('td');
        var c4input = document.createTextNode("Previous Close");
        c4.appendChild(c4input);
        document.getElementById(rowId).appendChild(c4);

        var c5 = document.createElement('td');
        var c5input = document.createTextNode("Action");
        c5.appendChild(c5input);
        document.getElementById(rowId).appendChild(c5);

        console.log("Table created");

      }

      //display results from initial request to get stock information
      function displayResults(){
        var stockJson = JSON.parse(localStorage.getItem('searchResult'));
        var firstKey = Object.keys(stockJson)[0];
        var ticker = stockJson["Global Quote"]["01. symbol"];
        var currentPrice = stockJson["Global Quote"]["05. price"];
        var previousClose = stockJson["Global Quote"]["08. previous close"];
        var tradingDay = stockJson["Global Quote"]["07. latest trading day"];

        if(firstKey=="Error Message"){
            document.getElementById("dataDisplay").innerHTML="Invalid entry";

        }else{    

        //delete any output table if it exists
        deleteTable("outputTable");
         
        //create the display table for the new stock entered
        createTable("dataDisplay","outputTable","outputRow");

        //append table with data from api call      
        var tbl = document.getElementById("outputTable");
         var row = tbl.insertRow();
         var cell1 = row.insertCell();
         var cell2 = row.insertCell();
         var cell3 = row.insertCell();
         var cell4 = row.insertCell();
         var cell5 = row.insertCell();
         cell1.innerHTML = ticker;
         cell2.innerHTML = tradingDay;
         cell3.innerHTML = currentPrice;
         cell4.innerHTML = previousClose;
         cell5.innerHTML = "<input type='button' onclick='addToWatchlist()' \
            value='Add to Watchlist'></input>";
            
        };            

      }

 
      function addToWatchlist(){
        //verify if watchlist table exists
        if(document.getElementById("watchlistTable") == null){
            createTable("watchlist","watchlistTable","watchlistRow");
            console.log("Watchlist Table created");          
        } 

        //set watchlist variables
        var stockJson = JSON.parse(localStorage.getItem('searchResult'));
        var ticker = stockJson["Global Quote"]["01. symbol"];
        var currentPrice = stockJson["Global Quote"]["05. price"];
        var previousClose = stockJson["Global Quote"]["08. previous close"];
        var tradingDay = stockJson["Global Quote"]["07. latest trading day"];

        //set table variables
        var tbl = document.getElementById("watchlistTable");
        var row = tbl.insertRow();
        var cell1 = row.insertCell();
        var cell2 = row.insertCell();
        var cell3 = row.insertCell();
        var cell4 = row.insertCell();
        var cell5 = row.insertCell();
        cell1.innerHTML = ticker;
        cell2.innerHTML = tradingDay;
        cell3.innerHTML = currentPrice;
        cell4.innerHTML = previousClose;
        cell5.innerHTML = "<input type='button' onclick='removeFromWatchlist()' \
           value='Remove from Watchlist'></input>";

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
