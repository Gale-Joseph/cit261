
function foo(input1,input2) {
    document.getElementById("demoP").innerHTML=input1 + " " + input2;
}

function myFunction(){
    //convert user input into variables
    var str = document.getElementById("inputText").value;
    var searchWord = document.getElementById("searchWord").value;

    //convert str into an array using split() method
    var splitStr = str.split(" ");
    
    //set loop variables & initiate loop:
    var loopCount = 0;
    var wordCount = 0;
    while(loopCount<splitStr.length){
        if(splitStr[loopCount]==searchWord.trim()){
            console.log("Word count = " + wordCount);
            wordCount++;
        }
        loopCount++;
    }
    if(searchWord==''){
        document.getElementById("demo").innerHTML = "Please enter a word to search."
    }else{
    document.getElementById("demo").innerHTML = "\'" + searchWord + "\'" + " appears " + 
        wordCount + " times.";
    }
}



function createDictionary(){ 
     //convert user input into variables
     var str = document.getElementById("inputText").value;
     
    //convert str into an array using split() method
    var splitStr = str.split(" ");
    var wordListArray = {}; 
    var sortedArray = [];
    var loopCount=0;
    

    while(loopCount<splitStr.length){
        sortedArray = splitStr.sort();
        //start word count for current splitStr[loopCount]
        var loopCount2=0;
        var wordFrequency = 0;
        //take each word and iterate through assorted array for wordFrequency
        while(loopCount2<splitStr.length){
            if(sortedArray[loopCount]==sortedArray[loopCount2]){
            wordFrequency++;
            }  
            loopCount2++;   
            wordListArray[sortedArray[loopCount]] = wordFrequency;                  
        }
        loopCount++;    
    }
    //print out contents of wordListArray by extracting keys and values

    text = '';
    for(var key in wordListArray){
        text+=key + ': ' + wordListArray[key] + '<br> ';
    }
    document.getElementById("demo2").innerHTML=text;

 
}

//next steps: use parameters in functions, nested within each other,
//idea: use a function for word count and call that function to return
//a value

