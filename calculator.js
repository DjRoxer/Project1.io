$(document).ready(function() { // do this when the document is loaded
	
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
		// if(i==str.length-1)
		// {
		// 	console.log("Last single element");
		// 	console.log(str[i]+ "\n");
		// 	elements[ind] = parseInt(str[i]);
		// 	break;
		// }
		for (var j=i; j<str.length;j++)
		{
			if(str[j]=='*' || str[j]=='/' || str[j]=='-' || str[j]=='+')
			{
				elements[ind] = parseInt(str.substring(i,j));
				

				elements[ind +1] = str[j];
			
				ind = ind +2;
				i=j;

				break;

			}
			if (j==str.length-1)
			{
				elements[ind]= parseInt(str.substring(i,str.length));
			
				i = str.length;
				break;
			}
		}

	}
	console.log(elements);


		var ans = calc(elements);
		$("#number_input").val(ans);
	

	//$("#number_input").val(elements[1]);
}

//arr.slice(x,y) will RETURN an array starting at x to y-1
function calc(elements)
{


	if (elements.length == 3)
		{
			return base(elements);
		}


	var length = elements.length;
	var ind = 1;
	var newArr = elements;
	var high_orders = 1;


	while (high_orders)
	{
		console.log("index: "+ ind + ", length: "+ newArr.length);
		if (newArr.length == 3)
		{
			return base(newArr);
		}

		if (ind >= newArr.length)
		{
			high_orders = 0;
			ind =1 ; 
			break;
		}
		

		if((newArr[ind] == '*' || newArr[ind]== '/') && ((newArr.length-ind) >= 2) )
		{
			console.log("Higher Order Operating: " + newArr[ind]);
			var subArr = newArr.slice(ind-1,ind+2);
			var subAns = base (subArr);
			var head = newArr.slice(0,ind-1);
			var tail = newArr.slice(ind+1, newArr.length);
			tail[0] = subAns;
			newArr = head.concat(tail);
			ind = ind -2;
		}


		ind = ind +2;
	}

	ind =1;
	while (ind<newArr.length)
	{
		if (newArr.length == 3)
		{
			return base(newArr);
		}
		console.log("operating: " + newArr[ind]);
		var subArr = newArr.slice(ind-1,ind+2);
		var subAns = base (subArr);
		var head = newArr.slice(0,ind-1);
		var tail = newArr.slice(ind+1, newArr.length);
		tail[0] = subAns;
		newArr = head.concat(tail);
			
	}
	return newArr;
}
function base(elements)
{
	console.log(elements);
	var op = elements[1];
	if (op == '+')
	{
		return elements[0] + elements[2];
	}
	if (op == '-')
	{
		return elements[0] - elements[2];
	}
	if (op == '/')
	{
		return elements[0] / elements[2];
	}
	if (op == '*')
	{
		return elements[0] * elements[2];
	}
	return elements;
}