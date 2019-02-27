$(document).ready(function() { // do this when the document is loaded
	
});

input.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
   event.preventDefault();
   inputEqual();
  }
});
function form (str){
	for (var i =0; i<str.length;i++)
	{
		if (str[i] == '*' | str[i] == '+' | str[i] == '-' | str[i] == '/' )
		{
			if (i+1 == str.length)
			{
				return false;
			} 
			if ( str[i+1] == '*'| str[i+1] == '/'| str[i+1] == '+'| str[i+1] == '-' )
			{
				return false;
			}
		}

	}
	return true;
}


function inputFunc(str){
	$("#number_input").val($("#number_input").val() + str);
}
function inputClear()
{
	$("#number_input").val("");
}
function inputEqual()
{
	var elements = [];
	var ind =0;
	var str= $("#number_input").val()
	


	//The fallowing for loop goes through the string and save each number and op in a new array in the order they appear. 
	for (var i=0; i <str.length;i++)
	{
		if(i==str.length-1)
		{
			console.log(str[i]+ "\n");
			elements[ind] = parseInt(str[i]);
			break;
		}
		for (var j=i; j<str.length;j++)
		{
			if(str[j]=='*' || str[j]=='/' || str[j]=='-' || str[j]=='+')
			{
				elements[ind] = parseInt(str.substring(i,j));
				console.log(elements[ind]+ "\n")

				elements[ind +1] = str[j];
				console.log(elements[ind+1]+ "\n")
				ind = ind +2;
				i=j;	
				break;

			}
			// if (j==str.length-1)
			// {
			// 	elements[ind]= parseInt(str.substring(i,str.length));
			// 	i = str.length;
			// 	break;
			// }
		}
	}


		var ans = calc(elements);
		$("#number_input").val(ans);
	

	//$("#number_input").val(elements[1]);
}
function calc(element)
{
	var op = element[1];
	var ans, a;
	if(element.length == 3)
	{
		if (op == '*')
			ans = element[0] * element[2];
		if (op == '/')
			ans = element[0] / element[2];
		if (op == '+')
			ans = element[0] + element[2];
		if (op == '-')
			ans = element[0] - element[2];
		console.log("here is the ans value " + ans);
		return ans;

	}
	if (element.length==0)
	{
		return element[0];
	}
	switch(op){
		case '*':
			var head = element[0] * element[2];
			// var tail = element.splice(0,3);
			console.log("Element befor splice: "+ element +"\n");
			var tail = element.splice(3,element.length);
			console.log("the tail is: " + tail + "\n");
			tail.unshift(head);
			console.log("new element list is: " + tail + "\n");
			var ans = calc(tail);
			console.log(element[0]+ " " +element[1] + " "+ element[2]);
			console.log("solution from above: " + ans);
			return ans;
		break;
		case '/':
			var head = element[0] / element[2];
			// var tail = element.splice(0,3);
			console.log("Element befor splice: "+ element +"\n");
			var tail = element.splice(3,element.length);
			console.log("the tail is: " + tail + "\n");
			tail.unshift(head);
			console.log("new element list is: " + tail + "\n");
			var ans = calc(tail);
			console.log(element[0]+ " " +element[1] + " "+ element[2]);
			console.log("solution from above: " + ans);
			return ans;
		case '+':
			var head = element[0];
			var tail = [];
			tail = element.splice(2,element.length);
			tail = calc(tail);
			return head + tail;
		break;
		case '-':
			var head = element[0];
			var tail = [];
			var newTail=[];
			var ind = 0;
			var mid;
			var op;
			tail = element.splice(2,element.length);
			for (var i = 3; i < tail.length; i=i+2)
			{
				if(tail[i]=='+'|| tail[i] == '-')
				{
					op = tail[i];
					mid = calc (tail.splice(0,i));
					newTail=tail.splice(i-2,tail.length);
					console.log("mid " + mid);
					console.log("tail" + newTail);

					break;
				}
			}
			if (op == '+')
			{
				return head - mid + parseInt(calc(newTail));
			}
			else{
				return head - mid - parseInt(calc(newTail));
			}
		break;
	}

	return (element);
}