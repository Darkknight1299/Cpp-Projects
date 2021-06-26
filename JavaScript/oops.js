//allows to create object without defining class

//This is JSON-Javascript Object Notation
var bird={
	x:100,
	y:20,
	color:"blue",
	eggs:["one","two","three"],

	fly:function(){
		console.log("Bird is flying",this.x,this.y); //this has to be used to access objects defined in class within its function
	}
};

//for loop
for(let i=0;i<bird.eggs.length;i++){
	console.log(bird.eggs[i]);
}

//for each loop
bird.eggs.forEach(function(val,idx){
	console.log(idx,val);
})


//one way
var apple={
	taste:"sweet",
	color:"red",
}

//Another way
function Fruit(taste,color){
	this.color=color;
	this.taste=taste;
}

//new keyword
let mango= new Fruit("sweet","yellow");
let orange = new Fruit("sour","orange");

//Class Keyword(ECMAScript-2015)
//class Declaration(Not Hoisted)
class FruitClass{
	constructor(taste,color){
		this.color=color;
		this.taste=taste;
	}
};

let kiwi = new FruitClass("sour","green"); 

//Class Expression(Not Hoisted)
let FruitClass2 = class{
	constructor(taste,color){
		this.color=color;
		this.taste=taste;	
	}
};

let Kiwi = new FruitClass2("sour","green");