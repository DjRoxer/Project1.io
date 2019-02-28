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
	if (element.length == 3)
	{
		
		if (op == '+')
		{
			return add(element[0], element[2]);
		}
		if (op == '-')
		{
			return sub(element[0], element[2]);
		}
		if (op == '/')
		{
			return div(element[0], element[2]);
		}
		if (op == '*')
		{
			return mult(element[0], element[2]);
		}
	}
	console.log("length is: " + element.length ); 
	if(element.length >=5)
	{
		var op2 = element[3];
		if (op == '+')
		{
			if(op2 == '*' || op2 == '/')
			{
				var mid = calc(element.splice(2,5));
				var end = [];
				
				end = element.splice(5,element.length)
				console.log("end: " + end );
				
				console.log(mid + " + " + end);
				end.unshift(mid);
				
				return (element[0] + calc(end));
			}
			else
			{
				var head = element[0]+element[2];
				var end = element.splice(3,element.length);
				console.log("end: " + end);
				console.log("elements: " + end.unshift(head));
				return calc(end.unshift(head));
			}
		}
		if (op == '-')
		{
			return sub(element[0], element[2]);
		}
		if (op == '/')
		{
			return div(element[0], element[2]);
		}
		if (op == '*')
		{
			return mult(element[0], element[2]);
		}
	}
	return (element);
}
function add(x, y)
{
	return x + y;
}
function sub(x, y)
{
	return x-y;
}
function mult(x,y)
{
	return x * y;
}
function div(x,y)
{
	return x/y;
}