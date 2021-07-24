// initial data
let currentColor = 'black';
let canDraw = false;
let mouseX, mouseY = 0;

let screen = document.querySelector("#tela");
let context = screen.getContext("2d");

// events
document.querySelectorAll(".colorArea .color").forEach(item => {
    item.addEventListener("click", colorClickEvent);
});

screen.addEventListener("mousedown", mouseDownEvent);
screen.addEventListener("mousemove", mouseMoveEvent);
screen.addEventListener("mouseup", mouseUpEvent);
document.querySelector(".clear").addEventListener("click", clearScreen);
document.querySelector(".borracha").addEventListener("click", eraserActive);

/*
    passo a passo:
    - quando o click do mouse abaixar, ative o modo desenho;
    - quando o mouse se mover, se o modo desenho estiver ativado, desenhe;
    - quando o click do mouse levantar, desative o modo desenho;
*/

// functions
function colorClickEvent(e){
    let color = e.target.getAttribute('data-color');
    currentColor = color;

    document.querySelector(".color.active").classList.remove("active");
    e.target.classList.add("active");
}
function mouseDownEvent(e){
    canDraw = true;
    mouseX = e.pageX - screen.offsetLeft;
    mouseY = e.pageY - screen.offsetTop;
}
function mouseMoveEvent(e){
    if(canDraw){
        draw(e.pageX, e.pageY)
    }
}
function mouseUpEvent(){
    canDraw = false;
}
function draw(x, y){
    let pointX = x - screen.offsetLeft;
    let pointY = y - screen.offsetTop;

    if(currentColor == "white"){
        context.lineWidth = 30;
    } else {
        context.lineWidth = 5;
    }

    context.beginPath();
    // context.lineWidth = 5;
    context.lineJoin = "round";
    context.moveTo(mouseX, mouseY);
    context.lineTo(pointX, pointY);
    context.closePath();
    context.strokeStyle = currentColor;
    context.stroke();

    mouseX = pointX;
    mouseY = pointY;
}
function clearScreen(){
    context.setTransform(1, 0, 0, 1, 0, 0);
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
}
function eraserActive(){
    currentColor = "white";
}