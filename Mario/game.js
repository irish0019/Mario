var grid = document.getElementById("gamebg");
var ctx = grid.getContext("2d");
var no;
var movement;
mushroom = new Image();
mushroom.src = "mushroom.png";
mario = new Image();
mario.src = "mario2.png";
mario.onload = function () {
    ctx.drawImage(mario, (cx * 50) + 12.5, (cy * 50) + 12.5, 25, 25);
}
var fill = 0;
var steps = 0;
var cx = 0;
var cy = 0;
var dx = 1;
dy = 0;
var visit = new Array(5);
for (var j = 0; j < visit.length; j++)
    visit[j] = new Array(5);
for (var k = 0; k < 5; k++)
    for (var j = 0; j < 5; j++)
        visit[k][j] = 0;
play();
//To make the grids
function makegrids() {
    for (var i = 0; i <= 250; i = i + 50) {
        ctx.moveTo(i, 0);
        ctx.lineTo(i, 250);
        ctx.moveTo(0, i);
        ctx.lineTo(250, i);
        ctx.stroke();
    }
    for (var i = 0; i < 5; i++) {
        for (var j = 0; j < 5; j++) {
            if ((i + j) % 2 == 0)
                ctx.fillStyle = "white";
            else
                ctx.fillStyle = "cyan";
            ctx.fillRect(j * 50, i * 50, 50, 50);
        }
    }
}

//To draw mario and his movements
function draw_mario() {
    steps++;
    var px = cx;
    var py = cy;
    cx = cx + dx;
    cy = cy + dy;
    if (fill == 0) {
        ctx.fillStyle = "white";
        fill = 1;
    }
    else {
        fill = 0;
        ctx.fillStyle = "cyan";
    }
    ctx.drawImage(mario, (cx * 50) + 12.5, (cy * 50) + 12.5, 25, 25);
    ctx.clearRect((px) * 50, (py) * 50, 50, 50);
    ctx.fillRect((px) * 50, (py) * 50, 50, 50);
    if (cx == 4 && dx == 1)
        dx = -1;
    if (cy == 4 && dy == 1)
        dy = -1;
    if (cx == 0 && dx == -1)
        dx = 1;
    if (cy == 0 && dy == -1)
        dy = 1;
    if (visit[cx][cy] == 1) {
        no--;
        visit[cx][cy] = 0;
    }
    if (no == 0) {
        if (fill == 0)
            ctx.fillStyle = "white";
        else
            ctx.fillStyle = "cyan";
        ctx.clearRect((cx) * 50, (cy) * 50, 50, 50);
        ctx.fillRect((cx) * 50, (cy) * 50, 50, 50);
        ctx.drawImage(mario, (cx * 50) + 12.5, (cy * 50) + 12.5, 25, 25);
        alert("Game Completed. " + steps + " Steps taken.");
        clearInterval(movement);
    }
}
//To draw the mushrooms and implement the motion of Mario
function play() {
    makegrids();
    no = Math.floor(Math.random() * 12) + 1;
    var c = 0;
    for (var k = 0; k < 5; k++)
        for (var j = 0; j < 5; j++)
            visit[k][j] = 0;
    mushroom.onload = function () {
        for (var i = 1; i <= no; i++) {
            var posx = Math.floor(Math.random() * 5);
            if (posx == 0)
                var posy = Math.floor(Math.random() * 4) + 1;
            else
                var posy = Math.floor(Math.random() * 5);
            if (visit[posx][posy] == 1) {
                i--;
                continue;
            }
            else if (c >= no)
                break;
            else {
                ctx.drawImage(mushroom, 100, 30, 620, 580, (posx * 50) + 12.5, (posy * 50) + 12.5, 25, 25);
                visit[posx][posy] = 1;
                c++;
            }
        }
        movement = setInterval(draw_mario, 1000);
    }
}
//To give control to arrow keys
window.addEventListener("keydown", keyControl, false);
function keyControl(e) {
    if (e.keyCode == 40) {
        dx = 0;
        dy = 1;
        if (cy == 4 && dy == 1)
            dy = -1;

    }
    if (e.keyCode == 39) {
        dx = 1;
        dy = 0;
        if (cx == 4 && dx == 1)
            dx = -1;
    }
    if (e.keyCode == 37) {
        dx = -1;
        dy = 0;
        if (cx == 0 && dx == -1)
            dx = 1;
    }
    if (e.keyCode == 38) {
        dx = 0;
        dy = -1;
        if (cy == 0 && dy == -1)
            dy = 1;
    }
    e.preventDefault();
}