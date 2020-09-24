class Explosion{
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.rem = 1;
        this.color = 'rgba(255,255,255,1)';
    }

    step(){
        this.rem -= 0.1;
        this.color = 'rgba(255,255,255,'+this.rem+')';
    }

}