let a=10;
console.log(a);

let b=[1,2,3,4,5];
console.log(b);

console.log("Hello World!");

//Variables

c=20;//global scope
var d=10;//function scope
let e=13;//blocck scope

//Function decalaration
function fun(){
	let a=5;
	if(a==5){
		let b=5;
		//var f=100;
		//f=100
		console.log("Inside",b); //change b to f
	}
	console.log("Inside",b); //change b to f
}

function Squart_root(n){
	console.log(Math.sqrt(n));
	return "Hello"; 
}

//Function Hoisting
//Function expression
var sqrt_n=function(n){
	return Math.sqrt(n);
}

//Arrays
let arr=["Apple","Mango","Banana"];
console.log(arr);

for(int i=0;i<arr.length;i++){
	console.log(arr[i]);
}

a.push("Guava");
a.pop();
a.shift();
a.unshift("Kiwi");
a.indexOf("Mango");

if(a[0]=="Apple"){
	console.log("Apple");
}
else{
	console.log("No it is not");
}
