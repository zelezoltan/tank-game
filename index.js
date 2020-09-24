const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
//const button = document.querySelectorAll('button')[0];
ctx.fillStyle = 'rgb(0,0,0)';
ctx.fillRect(0,0,1024,768);

const points = [];
const ground = [];
const explosions = [];
let bluePlayer = null;
let redPLayer = null;
let pol = null;

let aDown = false;
let sDown = false;
let dDown = false;
let wDown = false;
let rightDown = false;
let leftDown = false;
let upDown = false;
let downDown = false;

//const points = [new Point(300,700),new Point(100,600), new Point(400,600), new Point(600,400), new Point(800,600), new Point(1024,200)];
function draw(){
    const lagrange = new Lagrange(points);
    pol = lagrange.interpolate(); 
    console.log(pol.coefficients);

    ctx.fillStyle = 'rgb(0,0,0)';
    ctx.fillRect(0,0,1024,768);

    for(let i = 0; i < 1024; i++){
        ctx.beginPath();
        ctx.strokeStyle = 'white';
        const x1 = i;
        let y1 = pol.at(x1);
        if(y1 > 700){
            y1 = 700;
        }else if(y1 < 100){
            y1 = 100;
        }
    
        const x2 = i+1;
        let y2 = pol.at(x2);
    
        if(y2 > 700){
            y2 = 700;
        }else if(y2 < 100){
            y2 = 100;
        }
        
        /*const x1 = i;
        const y1 = Math.sin(i/50)*100+400;
        const x2 = i+1;
        const y2 = Math.sin(x2/50)*100+400;*/
        ctx.moveTo(x1,y1);
        ctx.lineTo(x2,y2);
        ctx.stroke();
        ctx.closePath();
    }
    
    for(let i = 0; i< points.length; ++i){
        ctx.beginPath();
        ctx.strokeStyle = 'red';
        ctx.moveTo(points[i].x-3, points[i].y-3);
        ctx.lineTo(points[i].x+3, points[i].y+3);
        ctx.stroke();
        ctx.closePath();
    
        ctx.beginPath();
        ctx.strokeStyle = 'red';
        ctx.moveTo(points[i].x+3, points[i].y-3);
        ctx.lineTo(points[i].x-3, points[i].y+3);
        ctx.stroke();
        ctx.closePath();
    }
}

function startRandomGame(){
    const maps = JSON.parse(localStorage.getItem('maps'));
    const mapNr = Math.floor(Math.random()*maps.length);
    console.log(maps, mapNr);

    pol = new Polynomial(maps[mapNr].coefficients);
    console.log(pol);
    drawPolynomial(pol);
    //drawGround();
    let tankPos = Math.floor(Math.random()*500)+12;
    let height = pol.at(tankPos);
    bluePlayer = new Tank(tankPos, height, 0);
    drawTank(bluePlayer, 'blue');
    //drawTangent(tankPos);
    tankPos = Math.floor(Math.random()*500) + 512;
    height = pol.at(tankPos);
    redPlayer = new Tank(tankPos, height, 0);
    drawTank(redPlayer, 'red');
    //drawTangent(tankPos);
}

function drawGround(){
    for(let i = 0; i < ground.length; ++i){
        ctx.fillStyle = 'brown';
        ctx.fillRect(i, ground[i].y, 1, 768-ground[i].y);
    }
}

function drawTangent(x){
    const derivative = pol.derivative();
    const slope = derivative.at(x);
    const y = pol.at(x);
    const tangent = new Polynomial([slope*(-x)+y, slope]);
    drawTangentLine(tangent,x);
}

function drawTangentLine(pol,x){
    for(let i = x-100; i < x+100; i++){
        ctx.beginPath();
        ctx.strokeStyle = 'white';
        const x1 = i;
        let y1 = pol.at(x1);
        if(y1 > 700){
            y1 = 700;
        }else if(y1 < 100){
            y1 = 100;
        }
    
        const x2 = i+1;
        let y2 = pol.at(x2);
    
        if(y2 > 700){
            y2 = 700;
        }else if(y2 < 100){
            y2 = 100;
        }
        ground.push(new Point(x1,y1));
        ctx.moveTo(x1,y1);
        ctx.lineTo(x2,y2);
        ctx.stroke();
        ctx.closePath();
    }
}

function drawPolynomial(pol){
    ctx.fillStyle = 'rgb(0,0,0)';
    ctx.fillRect(0,0,1024,768);
    ctx.lineWidth = 1;
    for(let i = 0; i < 1024; i++){
        ctx.beginPath();
        ctx.strokeStyle = 'white';
        const x1 = i;
        let y1 = pol.at(x1);
        if(y1 > 700){
            y1 = 700;
        }else if(y1 < 100){
            y1 = 100;
        }
    
        const x2 = i+1;
        let y2 = pol.at(x2);
    
        if(y2 > 700){
            y2 = 700;
        }else if(y2 < 100){
            y2 = 100;
        }
        if(ground.length < 1024){
            ground.push(new Point(x1,y1));
        }
       
        ctx.moveTo(x1,y1);
        ctx.lineTo(x2,y2);
        ctx.stroke();
        ctx.closePath();
    }
}

function drawTank(player, color){
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.arc(player.x, player.y-7, 7, 0, Math.PI*2);
    ctx.fill();
    ctx.closePath();
    //drawTangent(player.x);

    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.moveTo(player.x, player.y-7);
    ctx.lineWidth = 5;
    ctx.lineTo(player.x + 15*Math.cos(player.gunAngle), player.y-7 + 15*Math.sin(player.gunAngle));
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.strokeStyle = 'green';
    ctx.lineWidth = 3;
    ctx.moveTo(player.x-15, player.y-25);
    ctx.lineTo(player.x-15 + player.health/100 * 30, player.y-25);
    ctx.stroke();
    ctx.closePath();
}

function handleKeys(){
    const blueY = ground[bluePlayer.x].y;
    const redY = ground[redPlayer.x].y;
    if(aDown){
        if(bluePlayer.x<=10) return;
        bluePlayer.move(-1,blueY);
    }
    if(dDown){
        if(bluePlayer.x>=1014) return;
        bluePlayer.move(1,blueY);
    }
    if(wDown){
        bluePlayer.moveGunUp();
    }
    if(sDown){
        bluePlayer.moveGunDown();
    }
    if(leftDown){
        if(redPlayer.x<=10) return;
        redPlayer.move(-1,redY);
    }
    if(rightDown){
        if(redPlayer.x>=1014) return;
        redPlayer.move(1,redY);
    }
    if(upDown){
        redPlayer.moveGunUp();
    }
    if(downDown){
        redPlayer.moveGunDown();
    }
}

function drawExplosions(){
    for(let i = 0; i<explosions.length; ++i){
        if(explosions[i].rem < 0){
            explosions.splice(i,1);
            continue;
        }
        explosions[i].step();
        ctx.beginPath();
        ctx.fillStyle = explosions[i].color;
        ctx.arc(explosions[i].x, explosions[i].y, 20, 0, Math.PI*2);
        ctx.fill();
        ctx.closePath();
        let angle = -Math.PI;
        for(let j = Math.floor(explosions[i].x)-20; j < Math.floor(explosions[i].x)+20; ++j){
            if(j > 0 && j < 1024 && ground[j].y < 650){
                if(ground[j].y < explosions[i].y - Math.sin(angle)*10){
                    ground[j].y = explosions[i].y - Math.sin(angle)*10;
                    if(bluePlayer.x == ground[j].x){
                        bluePlayer.y = ground[j].y;
                    }
                    if(redPlayer.x == ground[j].x){
                        redPlayer.y = ground[j].y;
                    }
                }
            }
            angle += Math.PI/40;
        }
        
    }
    
}

function drawBullets(){
    for(let i = 0; i < bluePlayer.bullets.length; ++i){
        bluePlayer.bullets[i].step();
        if(bluePlayer.bullets[i].x < 0 || bluePlayer.bullets[i].x > 1024 || bluePlayer.bullets[i].y - ground[Math.floor(bluePlayer.bullets[i].x)].y > 0){
            explosions.push(new Explosion(bluePlayer.bullets[i].x, bluePlayer.bullets[i].y));
            bluePlayer.bullets.splice(i,1);
            console.log('asd');
            continue;
        }
        ctx.beginPath();
        ctx.fillStyle = 'white';
        ctx.arc(bluePlayer.bullets[i].x, bluePlayer.bullets[i].y, 2, 0, Math.PI*2);
        ctx.fill();
        ctx.closePath();
    }

    for(let i = 0; i < redPlayer.bullets.length; ++i){
        redPlayer.bullets[i].step();
        ctx.beginPath();
        ctx.fillStyle = 'white';
        ctx.arc(redPlayer.bullets[i].x, redPlayer.bullets[i].y, 2, 0, Math.PI*2);
        ctx.fill();
        ctx.closePath();
    }
}

function updateStats(){
    document.querySelector('#blueHealth').innerHTML = bluePlayer.health;
    document.querySelector('#blueGas').innerHTML = bluePlayer.gas;
    document.querySelector('#bluePower').innerHTML = bluePlayer.power;
    document.querySelector('#redHealth').innerHTML = redPlayer.health;
    document.querySelector('#redGas').innerHTML = redPlayer.gas;
    document.querySelector('#redPower').innerHTML = redPlayer.power;
}

function draw(){
    //drawPolynomial(pol);
    drawFromGround();
    drawGround();
    drawTank(bluePlayer, "blue");
    drawTank(redPlayer, "red");
    drawBullets();
    drawExplosions();
    updateStats();
}

function drawFromGround(){
    ctx.fillStyle = 'rgb(0,0,0)';
    ctx.fillRect(0,0,1024,768);
    ctx.lineWidth = 1;
    //console.log(ground);
    for(let i = 0; i < 1023; i++){
        ctx.beginPath();
        ctx.strokeStyle = 'white';
        const x1 = i;
        let y1 = ground[x1].y;
        if(y1 > 700){
            y1 = 700;
        }else if(y1 < 100){
            y1 = 100;
        }
    
        const x2 = i+1;
        let y2 = ground[x2].y;
    
        if(y2 > 700){
            y2 = 700;
        }else if(y2 < 100){
            y2 = 100;
        }
        
        ctx.moveTo(x1,y1);
        ctx.lineTo(x2,y2);
        ctx.stroke();
        ctx.closePath();
    }
}

function step(){
    handleKeys();
    draw();
    requestAnimationFrame(step);
}

startRandomGame();
step();

document.addEventListener('keydown', (e) => {
    switch(e.key){
        case "a": aDown = true; break;
        case "d": dDown = true; break;
        case "w": wDown = true; break;
        case "s": sDown = true; break;
        case "ArrowLeft": leftDown = true; break;
        case "ArrowRight": rightDown = true;  break;
        case "ArrowUp": upDown = true;  break;
        case "ArrowDown": downDown = true;  break;
        case "+" : bluePlayer.power+=0.1; break;
        case "-" : bluePlayer.power-=0.1; break;
    }

    if(e.code == "Space"){
        bluePlayer.shoot();
    }
});

document.addEventListener('keyup', (e) => {
    switch(e.key){
        case "a": aDown = false; break;
        case "d": dDown = false; break;
        case "w": wDown = false; break;
        case "s": sDown = false; break;
        case "ArrowLeft": leftDown = false; break;
        case "ArrowRight": rightDown = false; break;
        case "ArrowUp": upDown = false; break;
        case "ArrowDown": downDown = false;  break;
    }
});

document.addEventListener('keydown', (e) => {
//    console.log(e);
});

// map creation
/*canvas.addEventListener('click', (e) => {
    console.log(e.layerX, e.layerY);
    points.push(new Point(e.layerX, e.layerY));

    ctx.beginPath();
        ctx.strokeStyle = 'red';
        ctx.moveTo(e.layerX-3, e.layerY-3);
        ctx.lineTo(e.layerX+3, e.layerY+3);
        ctx.stroke();
        ctx.closePath();
    
        ctx.beginPath();
        ctx.strokeStyle = 'red';
        ctx.moveTo(e.layerX+3, e.layerY-3);
        ctx.lineTo(e.layerX-3, e.layerY+3);
        ctx.stroke();
        ctx.closePath();
});

button.addEventListener('click', () => {
    draw();
});

document.querySelector('input').addEventListener('click', () => {
    console.log(JSON.parse(localStorage.getItem('maps')));
    let maps;
    if(!localStorage.maps){
        maps = [];
    }else{
        maps = JSON.parse(localStorage.getItem('maps'));
    }
    maps.push(pol);
    localStorage.setItem('maps', JSON.stringify(maps));
});*/





