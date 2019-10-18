function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
class Ball{
    constructor(wrapper,row,x,y){
        this.wrapper = wrapper;

        //ball
        this.ball=null;
        this.height=15;
        this.width=15;
        this.row=row;
        this.x = x/2;
        this.y = (row*y);
        this.val = y;
        this.color=getRandomColor();

        this.createBall();
    }
    createBall(){
        let ball = document.createElement('div');
        //styling div
        ball.style.height = this.height + 'px';
        ball.style.width = this.width + 'px';
        ball.style.top = this.y + 'px';
        ball.style.left = this.x + 'px';
        ball.style.borderRadius = '50%';
        ball.style.position='absolute';
        ball.style.backgroundColor=this.color;

        this.ball=this.wrapper.appendChild(ball);
    }
    animateBall() {
        //Just to create the number inbetween -1 and 1
        var no1 = Math.sin(this.val - (this.row/2));
        var no2 = Math.sin(this.val - (this.row/2));
        this.ball.style.transform = `scale(${(no1 > 0) ? (no1) : (no2)})`;
        this.val += 0.025;
    }
}
export default Ball