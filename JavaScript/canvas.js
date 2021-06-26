
canvas=document.getElementById("mycanvas");
canvas.width=500;
canvas.height=500;

//canvas is used to draw graphics
//object to draw--used  in console
pen=canvas.getContext('2d')

pen.fillStyle= "red";
pen.fillRect(20,20,40,40);
