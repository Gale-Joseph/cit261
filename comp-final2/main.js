/* *************************** API CALL FUNCTIONS *************************** */

/* fetch stock for search results - store in "searchResults"
    Do this so user has option to add to watchlist */

function getStockData(symbol){

    //1. Create an XMLHttpRequest object (request object)
    const xhr = new XMLHttpRequest();
    //2.Define event listener
    xhr.onreadystatechange = function response(){
        if (xhr.readyState==4){
            if (xhr.status==200){
                //store response text to local storage to generate all tables
                insertRefreshTime();
                var responseText = xhr.responseText;
                localStorage.setItem("searchResult",responseText);
                console.log(symbol + "set in search result");
    
                //print response text to console for troubleshooting
                console.log("Showing response text:");
                console.log(xhr.responseText); 

                //display results for user
                displayResults();
    
            if(xhr.status==404){
                console.log("File or resource not found");
            }
            }
        }
    };
    //3.trim whitespace and carriage returns from user input
    //var symbol = document.getElementById("userInput").value.trim().replace(/[\n\r]/g, '');
    //4.add trimmed output variable 'symbol' in url and send request
    url = "https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol="
            +symbol+"&apikey=TXLZQ0VXP5QUYSXN";
    //5.prepare request
    xhr.open('get',url,true);
    //6.send request
    xhr.send();
}

/* fetch stock for updates - store ticker as key
    Do this so function can be up in a loop for refreshing price*/

    function updateStockData(symbol){

        //1. Create an XMLHttpRequest object (request object)
        const xhr = new XMLHttpRequest();
        //2.Define event listener
        xhr.onreadystatechange = function response2(){
            if (xhr.readyState==4){
                if (xhr.status==200){
                    
                    //store response text to local storage to generate all tables
                    var responseText = xhr.responseText;
                    localStorage.setItem(symbol,responseText);

                   
                    console.log(symbol + "set in search result");
                    console.log("updated at : " + new Date());
        
                    //print response text to console for troubleshooting
                    console.log("Showing response text:");
                    console.log(xhr.responseText); 
    
                            
                if(xhr.status==404){
                    console.log("File or resource not found");
                }
                }
            }
        };
        //3.trim whitespace and carriage returns from user input
        //var symbol = document.getElementById("userInput").value.trim().replace(/[\n\r]/g, '');
        //4.add trimmed output variable 'symbol' in url and send request
        url = "https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol="
                +symbol+"&apikey=TXLZQ0VXP5QUYSXN";
        //5.prepare request
        xhr.open('get',url,true);
        //6.send request
        xhr.send();
    }


/* *************************** DISPLAY & LOCAL STORAGE FUNCTIONS *************************** */

// MAIN DISPLAY - initial stock submission
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
     cell3.innerHTML = previousClose;
     cell4.innerHTML = currentPrice;   
     //set classes to animate cells based on price relative to previous close 
     if(currentPrice>previousClose){
        cell4.setAttribute("class","goodNews");
    }else{
        cell4.setAttribute("class","badNews");
    }  
     cell5.innerHTML = "<input type='button' onclick='addToWatchlist()' \
        value='Add to Watchlist'></input>";
        
    };            

  }

//MAIN DISPLAY HELPER FUNCTIONS: 
//1. delete table
function deleteTable(tableId){
if(document.getElementById(tableId) != null){
    document.getElementById(tableId).remove();
    console.log("Table deleted");
}
}

//2. create table
function createTable(elementId,tableId,rowId){

    var t = document.createElement('table');
    t.setAttribute("id", tableId);
    document.getElementById(elementId).appendChild(t);
    
    var r = document.createElement('thead');
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
    var c3input = document.createTextNode("Previous Close");
    c3.appendChild(c3input);
    document.getElementById(rowId).appendChild(c3);

    var c4 = document.createElement('td');
    var c4input = document.createTextNode("Current Price");
    c4.appendChild(c4input);
    document.getElementById(rowId).appendChild(c4);

    var c5 = document.createElement('td');
    var c5input = document.createTextNode("Action");
    c5.appendChild(c5input);
    document.getElementById(rowId).appendChild(c5);

    console.log("Table created");

    }

/* ****** WATCHLIST - MAIN - ***** */
function addToWatchlist(){
    var ticker = searchResultTicker();
    addToStockIndex(ticker);
    addStockToStorage(ticker);
    displayWatchlist();

}

//WATCHLIST - helper functions
//1.get ticker from searchResult
function searchResultTicker(){
    var storageArray = JSON.parse(localStorage.getItem('searchResult'));
    return storageArray['Global Quote']['01. symbol'];    
    
}
//2. add a ticker to index of stock tickers   
function addToStockIndex(ticker){
    stockIndex=[];
    var stockIndexObj = {ticker:ticker};

    if(localStorage.stockIndex){
        stockIndex = JSON.parse(localStorage.getItem("stockIndex"));
        stockIndex.push(stockIndexObj);
        localStorage.stockIndex = JSON.stringify(stockIndex);
        console.log("Ticker added to index in existence")
       
    } else {        
        stockIndex.push(stockIndexObj);
        localStorage.stockIndex = JSON.stringify(stockIndex);
        console.log("Ticker added to new index");
        

    }
}
//3. add stock info to local storage with ticker as key
function addStockToStorage(ticker){
    var info = localStorage.getItem("searchResult");
    localStorage.setItem(ticker,info);
}

//4. retrieve parsed stock info from local storage, ticker as key
function retrieveStockInfo(ticker){
    return JSON.parse(localStorage.getItem(ticker));
}

//5. delete a table if it exists: 
function deleteTable(tableId){
    if(document.getElementById(tableId) != null){
        document.getElementById(tableId).remove();
        console.log("Table deleted");
    }

}
//6. display watchlist heading and contents
function displayWatchlist(){
    deleteTable("watchlistTb");
    createTable("watchlistDiv","watchlistTb","watchlistRw");
    

    stockIndexObject = JSON.parse(localStorage.stockIndex);
    for(var i=0;i<stockIndexObject.length;i++){
       
        var ticker = stockIndexObject[i].ticker;
        var stockObject = retrieveStockInfo(ticker);
        var tradingDay = stockObject["Global Quote"]["07. latest trading day"];
        var currentPrice = stockObject["Global Quote"]["05. price"];
        var previousClose = stockObject["Global Quote"]["08. previous close"];

        //set table variables
        var tbl = document.getElementById("watchlistTb");
        var row = tbl.insertRow();
        var cell1 = row.insertCell();
        var cell2 = row.insertCell();
        var cell3 = row.insertCell();
        var cell4 = row.insertCell();
        var cell5 = row.insertCell();
        row.setAttribute("id",ticker);
        cell1.innerHTML = ticker;
        cell2.innerHTML = tradingDay;
        cell3.innerHTML = previousClose;
        cell4.innerHTML = currentPrice;  
        //set classes to animate cells based on price relative to previous close 
        if(currentPrice>previousClose){
            cell4.setAttribute("class","goodNews");
        }else{
            cell4.setAttribute("class","badNews");
        }
         
        cell5.innerHTML = "<input type='button' onclick='removeFromWatchlist("+ticker+")' \
        value='Remove'></input>";  
    }
}

//7. remove items from watchlist and watchlist display
function removeFromWatchlist(ticker){
    //remove from local storage (ticker comes in as object, not string):
    
    tickerString = ticker.attributes.id.nodeValue

    //remove from index
    stockIndexObject = JSON.parse(localStorage.stockIndex);
    
    /*start iteration from end of Object since index values will get deleted, and 
        going forward will cause a skip or out of index bounds error*/
    console.log('starting loop')
    for (var i = (stockIndexObject.length-1); i>=0;i--){

        if (stockIndexObject[i]['ticker']==tickerString){            
            stockIndexObject.splice(i,1);
        }  
        console.log(stockIndexObject);      
    }
    localStorage.removeItem(tickerString);
    localStorage.stockIndex = JSON.stringify(stockIndexObject);
    
    //refresh table so that a new index order can be established if more deletions
    displayWatchlist();
}

function refreshQuotes(){
    
   

    //pull each stock from stockIndex
   
    var stockIndexObject = JSON.parse(localStorage.stockIndex);
    console.log(stockIndexObject);
    for (var each of stockIndexObject){       
        var ticker = each.ticker
        updateStockData(ticker);    

    }
    
    insertRefreshTime();

     //animate div
     refreshQuotes();
    
    displayWatchlist();
   
}

function insertRefreshTime(){
    var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    var d = new Date();
    var month = months[d.getMonth()];
    var day = days[d.getDay()];
    var hr = d.getHours();
    var min = d.getMinutes();
    if(min<10){
        min = "0" + min;
    }
    var refreshTime = day + " " + month + " " + d.getDate() + " " + hr + ":" + min
    document.getElementById("lastUpdatedDiv").innerHTML=refreshTime;

}

/* *************************** Animation Functions *************************** */


/* ***Bar Graph - Market Volum *** */
function seeVolume(volumeBar){
    //average spy volume is 60M
    const spyAverageVolume = 60000000;
    
    //make API call to spy if not in local storage
    if(!localStorage.spy){
        console.log("no spy exists...calling stock & storing");
        updateStockData("spy");
    }

    //retrieve volume from spy and create a percentage: 
    var spyVolume = JSON.parse(localStorage.getItem("SPY"))["Global Quote"]["06. volume"]
    var spyVolumePercent = Math.round((spyVolume/spyAverageVolume*100));
    if(spyVolumePercent>100){
        spyVolumePercent=100;
    }
    console.log(spyVolumePercent);
    volumeBar.style.width = spyVolumePercent +  "%";
}

/* ***Bar Graph - Market Volume - Make Bar disappear/reappear *** */
function toggleVolume(){
    var barchart = document.getElementById("volumeDiv");    
    barchart.style.transition ="opacity 1.0s linear 0s";

    //if opacity property doesn't exist, assign it 1
    if(!barchart.style.opacity){
        barchart.style.opacity = 1;
    }
   
    //if opacity 1, then make opacity 0 and change button value
    if(barchart.style.opacity==1){
        console.log("first if statement reached");
        barchart.style.opacity=0;
        var button = document.getElementById("toggleButton");
        button.value = "See Volume";
        console.log("Opacity value:");
        console.log(barchart.style.opacity);
    }else{
        console.log("else statement reached");
        barchart.style.opacity=1;
        var button = document.getElementById("toggleButton");
        button.value = "Remove Volume";
        console.log("Opacity value:");
        console.log(barchart.style.opacity);

    }
    
}

/* ***Makes update button, time and message do a series of animations *** */

//note: this function adds an animation to the div watchlistUpdate
// function animateUpdate(){
//     document.getElementById("watchlistUpdate").style.animation=
//     "updateAnimation 1s 1";
//     document.getElementById("watchlistUpdate").style.animation=
//     "none";
// }
