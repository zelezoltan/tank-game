class Tank {
    constructor(x, y, angle){
        this.x = x;
        this.y = y;
        this.angle = angle;
        this.gunAngle = 0;
        this.locked = false;
        this.power = 5;
        this.bullets = [];
        this.health = 100;
        this.gas = 100;
    }

    move(x, y){
        if(this.locked) return;
        this.x += x*2;
        this.y = y;
        this.gas -= 1;
    }

    moveGunUp(){
        if(this.locked) return;
        this.gunAngle += 0.05;
    }

    moveGunDown(){
        if(this.locked) return;
        this.gunAngle -= 0.05;
    }

    lock(){
        this.locked = true;
    }

    shoot(){
        //if(!this.locked) return;
        this.bullets.push(new Bullet(this.x + 15*Math.cos(this.gunAngle), 
                                    this.y-7 + 15*Math.sin(this.gunAngle),
                                    Math.cos(this.gunAngle)*this.power, 
                                    Math.sin(this.gunAngle)*this.power));
    }

    unLock(){
        this.locked = false;
    }
}