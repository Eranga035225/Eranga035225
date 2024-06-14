function getHistory(){  //for retrieving the current history value
	return document.getElementById("history-value").innerText;
}
function setHistory(num){ // sets the history value to the provided num 
	document.getElementById("history-value").innerText=num;
}
function getOutput(){   //retrieves the current output value 
	return document.getElementById("output-value").innerText;
}
function setOutput(num){ // for setting the output value to the provided num
	if(num==""){
		document.getElementById("output-value").innerText=num;
	}
	else{
		document.getElementById("output-value").innerText=getFormattedNumber(num);
	}	
}



function getFormattedNumber(num){  //formts numbers with commas
	if(num=="-"){
		return "";
	}
	var n = Number(num); //for treating the inout as a numeric value
	var value = n.toLocaleString("en"); //for adding thousand seperators
	return value;
}



function reverseNumberFormat(num){
	return Number(num.replace(/,/g,'')); //converts back by removing commas in globally
}


//event listeners
// operators 

var operator = document.getElementsByClassName("operator"); // select operators
for(var i =0;i<operator.length;i++){
	operator[i].addEventListener('click',function(){
		if(this.id=="clear"){
			setHistory("");
			setOutput("");
		}
		else if(this.id=="backspace"){
			var output=reverseNumberFormat(getOutput()).toString();
			if(output){//if output has a value
				output= output.substr(0,output.length-1);  //removes last character and updates the output
				setOutput(output);
			}
		}
		
		//other operators
		else{
			var output=getOutput();
			var history=getHistory();
			if(output==""&&history!=""){
				if(isNaN(history[history.length-1])){
					history= history.substr(0,history.length-1);
				}
			}
			if(output!="" || history!=""){
				output= output==""?output:reverseNumberFormat(output);
				history=history+output;
				if(this.id=="="){
					var result=eval(history);
					setOutput(result);
					setHistory("");
				}
				else{
					history=history+this.id;
					setHistory(history);
					setOutput("");
				}
			}
		}
		
	});
}





//for numbers
var number = document.getElementsByClassName("number");
for(var i =0;i<number.length;i++){
	number[i].addEventListener('click',function(){
		var output=reverseNumberFormat(getOutput());
		if(output!=NaN){ //if output is a number
			output=output+this.id;
			setOutput(output);
		}
	});
}