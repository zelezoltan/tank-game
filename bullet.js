class Bullet{
    constructor(x, y, dx, dy){
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
    }

    step(){
        this.dy += 0.05;
        this.x += this.dx;
        this.y += this.dy;
    }
}