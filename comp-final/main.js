/* *************************** API CALL FUNCTIONS *************************** */

;


/* ***** uses API based off of user input on HTML form ***** */
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


/* ***** uses API based internally to update stock data ***** */
function getStockData2(symbol){
    //this will return an array of info about ONE stock
    var responseText;

    //do not write the array to local storage in this function
    const xhr = new XMLHttpRequest();
    console.log("getStockData2: xhr object created")
    xhr.onreadystatechange = function getStockData (){
        if (xhr.readyState==4){
            if (xhr.status==200){
                console.log("getStockData2: connected to api")
                responseText = xhr.responseText;  
                
                console.log("getStockData2: Showing xhr.responsetext:");
                console.log(xhr.responseText); 
                
               
                
    
            if(xhr.status==404){
                console.log("getStockData2: File or resource not found");
            }

            console.log("getStockData2: showing new response text variable: ");
            console.log(responseText);

            console.log("getStockData2: returning response text as parsed json");
            return JSON.parse(responseText);

            }
        }
    };
    console.log("getStockData2: url is getting set here with symbol:")
    url = "https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol="
            +symbol+"&apikey=TXLZQ0VXP5QUYSXN";
    console.log("getStockData2: get request is being created: ")
    xhr.open('get',url,true);
    console.log("getStockData2: get request is being sent: ")
    xhr.send();

}
/* ********* simplified xmlhttprequest ********** */

stockArray = []
permanentStockArray = []
var xhr = new XMLHttpRequest();
var responseText;


function getSimple(symbol){
    console.log("Now processing");
    console.log(symbol);
    url = "https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol="+symbol+"&apikey=TXLZQ0VXP5QUYSXN";
    xhr.open('get',url,true);
    xhr.onreadystatechange = response;
    xhr.send();

}

// localStorage.setItem('indexArray','{"ticker:dummy"}');
function response(){
    if(xhr.readyState==4){
        if(xhr.status==200){

            console.log("Response text created")
            responseText = xhr.responseText; 
            
            //get ticker symbol from stock
            
            responseTextObject = JSON.parse(responseText);
            console.log("ResponseTextObject created");
            ticker = responseTextObject["Global Quote"]['01. symbol'];
            console.log("Ticker set");
            
            //save ticker symbol to an array index in storage if indexArray.length < 2; (see add to watchlist)
            //we will cycle through this array later to modify the storage value of the key matching the stock
            //having a storage array ensures that only 2 stocks are added to watch list
            //our goal is to put this function in a loop 
            
            indexArray=[];
            if(localStorage.indexArray){
                console.log("add to array");
            }else{
                console.log("creating an indexArray and object");
                var indexArrayObj = {ticker:ticker};
                indexArray.push(indexArrayObj);
                console.log(indexArray);
                localStorage.indexArray = JSON.stringify(indexArray);
                localStorage.setItem(ticker,responseText);
            }
            //next quest: see if you can replace CVX local storage
            //get a list of tickers in local storage (iterate through indexArray)
            
            //if ticker shows up in indexArray, just rewrite it using method above
            //then see if this behaves in a loop with indexArray.length iterations

            //write an updateMethod with button to see if it updates

           /*Iterating through indexArray*/
           var iterateObject;
           iterateObject = JSON.parse(localStorage.getItem('indexArray'));
           console.log("Iterate this");
           console.log(iterateObject.length);
           //iterateObject.forEach(each => console.log(each['ticker']));
            // iterateObject.forEach(myFunction);
            // function myFunction(index,item){
            //     console.log(item);
            //     console.log(index);
            // }
            for (var each of iterateObject){
                console.log(each['ticker']);
            }

                       
                //save that ticker symbol as the name of the storage for that stock

        } else {
            alert(xmlHttp.statusText);
        }
    }
}

/* ************attempt to make several calls from a loop **************/
//attempt 2: 
function loopSimple(){
    for(var i=0;i<2;i++){
        getSimple("cvx");
        
    }
    ///parsedArray = JSON.parse(permanentStockArray);
    //console.log(parsedArray);
    console.log(permanentStockArray);
    //console.log(stockArray);
}



//attemp 1:
// //i want to see if can run getSimple(symbol) in a loop to replace storage with 2 new symbols
// function loopSimple(){
//     //declare empty array
//     //start loop for each item in storage:
//         //get a new symbol
//         //run the symbol through getSimple()
//     //see if the full array got stored to local storage
//     stockArray = []
//     permanentStockArray = []
//     var xhr = new XMLHttpRequest();
//     var responseText;


//     var storageObject = JSON.parse(localStorage.getItem('watchlist'));
//     var symbol;
//     for (var item in storageObject){
//         console.log("Loop cycle: " + item);
//         console.log("Loop ticker: ");
//         console.log(storageObject[item]['ticker']);
//         symbol = storageObject[item]['ticker'];
//         console.log("The symbol going to getSimple() is:");
//         console.log(symbol);
//         getSimple(symbol);
//     }

//     console.log("Loop simple has ended with: ");
//     console.log(permanentStockArray);


    


/* *************************** FUNCTIONS *************************** */

    function showStorage(){
        //document.getElementById("storedData").innerHTML="Stored data";
        console.log("Function working properly");     

        var storageArray = JSON.parse(localStorage.getItem('watchlist'));
        var arraylength = storageArray.length;
        console.log("Attempting to print array length: ");
        console.log(storageArray);
        console.log(storageArray[0]);
        console.log("Test of array notation: " + storageArray[0]['ticker']);
        for (var item in storageArray){
            console.log("Item:" + item);
            console.log(storageArray[item]['ticker'])
            if(storageArray[item]['ticker']=='AAPL'){
                console.log("Deleting this from memory")
                storageArray.splice(item,1);
                console.log("item deleted from array");
            }
        }
        console.log("Rewriting local storage");
        localStorage.watchlist = JSON.stringify(storageArray);
        //localStorage.setItem("watchlist",storageArray);

    }

    function deleteItem(){
        //work on later
    }

    function refreshData(){
        //get one symbol at time from watchlist
        //use that symbol to call updated data
        //stick that updated data in an array
        //cycle through entire watchlist
        //store the updated info to watchlist
        console.log("refreshData: refreshData() working properly"); 
        var storageObject = JSON.parse(localStorage.getItem('watchlist'));
        var symbol;
        var storageArray = [];
;
        for (var item in storageObject){
            console.log("refreshData: cycling through item" + item);
            //get a symbol from watchlist
            symbol = storageObject[item]['ticker'];
            console.log("refreshData: The symbol selected is: " + symbol);    
            
            //use that symbol to call updated data
            console.log("refreshData: Api called and stored in an array")
            tempStorage = getStockData2(symbol);
            // storageArray.push(getStockData(symbol));
            console.log("refreshData: Temp storage is: ")
            console.log(typeof(tempStorage));
            
           
        }
        console.log("refreshData: Rewriting local storage");
        //localStorage.watchlist = JSON.stringify(storageArray);
        //localStorage.setItem("watchlist",storageArray);

    }



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

      //create watchlist object for storing watchlist objects
      var watchlistArray = []

      //initialize local storage if it exists;  open it onload in body
      function init(){ 
        deleteTable("watchlistTable");  
          if(localStorage.watchlist){            
                watchlistArray = JSON.parse(localStorage.watchlist);
                createTable("watchlist","watchlistTable","watchlistRow");
                console.log("Watchlist Table created");          
                for(var i=0; i<watchlistArray.length;i++){
                    var index = i+1;
                    var ticker = watchlistArray[i].ticker;
                    var tradingDay = watchlistArray[i].tradingDay
                    var currentPrice = watchlistArray[i].currentPrice;
                    var previousClose = watchlistArray[i].previousClose;

                    //set table variables
                    var tbl = document.getElementById("watchlistTable");
                    var row = tbl.insertRow();
                    var cell1 = row.insertCell();
                    var cell2 = row.insertCell();
                    var cell3 = row.insertCell();
                    var cell4 = row.insertCell();
                    var cell5 = row.insertCell();
                    row.setAttribute("id",ticker);
                    cell1.innerHTML = ticker;
                    cell2.innerHTML = tradingDay;
                    cell3.innerHTML = currentPrice;
                    cell4.innerHTML = previousClose;
                    cell5.innerHTML = "<input type='button' onclick='removeFromWatchlist("+ticker+")' \
                    value='Remove from Watchlist'></input>";                  
                    
                }
          }
      }
      
      function addToWatchlist(){
        //verify if watchlist table exists
        // if(document.getElementById("watchlistTable") == null){
        //     createTable("watchlist","watchlistTable","watchlistRow");
        //     console.log("Watchlist Table created");          
        // } 

        var storageArray = JSON.parse(localStorage.getItem('watchlist'));
        if(storageArray==null || storageArray.length<2){
        //set watchlist variables
        var stockJson = JSON.parse(localStorage.getItem('searchResult'));
        var ticker = stockJson["Global Quote"]["01. symbol"];
        var tradingDay = stockJson["Global Quote"]["07. latest trading day"];
        var currentPrice = stockJson["Global Quote"]["05. price"];
        var previousClose = stockJson["Global Quote"]["08. previous close"];        

        //create object and store new object to array
        var watchlistObj = {ticker:ticker,tradingDay:tradingDay,currentPrice:currentPrice,previousClose:previousClose};
        watchlistArray.push(watchlistObj);
        console.log(watchlistArray);
        //completely replace watchlist key/value with new array
        localStorage.watchlist = JSON.stringify(watchlistArray);
        }else{
            console.log("Two items in watchlist")
            document.getElementById("messageDiv").innerHTML = "You need to subscribe "/
                "to our service to add more items to the watchlist.";
        }

        init();

        //set table variables
        // var tbl = document.getElementById("watchlistTable");
        // var row = tbl.insertRow();
        // var cell1 = row.insertCell();
        // var cell2 = row.insertCell();
        // var cell3 = row.insertCell();
        // var cell4 = row.insertCell();
        // var cell5 = row.insertCell();
        // cell1.innerHTML = ticker;
        // cell2.innerHTML = tradingDay;
        // cell3.innerHTML = currentPrice;
        // cell4.innerHTML = previousClose;
        // cell5.innerHTML = "<input type='button' id = watchlistArray[0] onclick='removeFromWatchlist()' \
        //    value='Remove from Watchlist'></input>";

    }

    function removeFromWatchlist(index){
        //get rid of elementbyidindex which is currently ticker
        var tbl = document.getElementById("watchlistTable");
        tbl.deleteRow(index);

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
