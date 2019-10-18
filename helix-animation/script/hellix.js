import Ball from '../script/ball.js'

class Hellix{
    constructor(wrapper){
        this.wrapper = wrapper;
        //rows and column
        this.row=20;
        this.column=30;
        //ball
        this.balls=[];
        this.createBalls();
        this.animateBalls();
    }
    createBalls(){
        for (var i = 0; i < this.row ; i++) {
            for(var j=0; j< this.column; j++){
                this.balls.push(new Ball(this.wrapper,j,(i)*15*4,15));
            }
        }
    }
    animateBalls(){
        setInterval(()=>{
            for(var i=0;i<this.balls.length;i++){
                this.balls[i].animateBall();
            }
        },1000/60);
    }
}
export default Hellix