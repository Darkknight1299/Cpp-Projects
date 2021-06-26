function f(){
	console.log("You clicked on the document");
}

document.addEventListener('click',f);//document can be changed to canvasto check if canvas is clicked or not

function f2(e){
	console.log("A key got pressed",e.key); //e can be omitted,e is the key that is pressed
}

document.addEventListener('keydown',f2);