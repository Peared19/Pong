let backgroundData;
let ctx;
let szamolo=0;
const keysPressed = {};

let player={
    xPos:20,yPos:20,width:25,height:100,speed:10
}
let ball={
    xPos:400,yPos:400,radius:10,xDirection:false,yDirection:false,xSpeed:10,ySpeed:3
}


$(document).ready(function () {

    console.log("ready!");
    const canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");

    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, 500, 500);

    for (let i = 0; i < 500; i++) {
        for (let j = 0; j < 500; j++) {

            if(Math.random()<0.01){
                ctx.fillStyle="white";
                ctx.fillRect(i, j, 1, 1);
            }


        }

    }
    backgroundData = ctx.getImageData(0, 0, 500, 500);
    window.requestAnimationFrame(gameLoop);

    $(document).on("keydown", function (e) {
        keysPressed[e.key] = true;
    });

    $(document).on("keyup", function (e) {
        keysPressed[e.key] = false;
    });









});
function handleMovement(){
    if (keysPressed["ArrowUp"]) {
        player.yPos -= player.speed;
        if (player.yPos < 0) player.yPos = 0;
    }

    if (keysPressed["ArrowDown"]) {
        player.yPos += player.speed;
        if (player.yPos + player.height > 500) {
            player.yPos = 500 - player.height;
        }
    }
}

function draw(){
    setBackg();
    drawPlayer();
    handleBall();


}
function gameLoop() {

    handleMovement();
    draw();
    window.requestAnimationFrame(gameLoop);
}
function handleBall(){
    console.log("x: "+ball.xPos+" y: "+ball.yPos);
    ballCollision();
    ctx.beginPath();
    ctx.arc(ball.xPos,ball.yPos,ball.radius,0,2*Math.PI);
    ctx.fillStyle="yellow";
    ctx.fill();





}
function ballCollision(){

    if(!ball.xDirection){
        ball.xPos-=ball.xSpeed;
    }
    if(ball.xDirection){
        ball.xPos+=ball.xSpeed;
    }

    if(!ball.yDirection){
        ball.yPos-=ball.ySpeed;
    }if(ball.yDirection){
        ball.yPos+=ball.ySpeed;
    }


    if(ball.xPos-ball.radius<0){
        ball.xPos=ball.radius
        ball.xDirection= !ball.xDirection;
    }
    if(ball.xPos+ball.radius>500){
        ball.xPos=500-ball.radius
        ball.xDirection= !ball.xDirection;
    }

    if(ball.yPos-ball.radius<0){
        ball.yPos=ball.radius
        ball.yDirection= !ball.yDirection;
    }
    if(ball.yPos+ball.radius>500){
        ball.yPos=500-ball.radius;
        ball.yDirection= !ball.yDirection;
    }


}

function setBackg(){

    ctx.putImageData(backgroundData,0,0);


}
function drawPlayer(){
    ctx.fillStyle="pink"
    ctx.fillRect(player.xPos,player.yPos,player.width,player.height);
}


