var BOXHEIGHT = 500;
var BOXWIDTH = 80;
var FRAME_LIMIT = 1000;
var FPS = 60;
var FRAME_RATE = FRAME_LIMIT/FPS;


function randomNo(lower,upper) {
    let randNo = Math.floor(Math.random() * (upper-lower + 1 ) + lower);
    return randNo;
}

class Ant{
    constructor(parentEle){
        this.parentEle=parentEle;


        this.dx = null;
        this.dy = null;
        this.radius = 50;
        this.ant=null;
        this.left=null;
        this.top=null;

        this.boxWidth=null;
    }
    create(){
        this.ant = document.createElement('div')
        this.ant.style.backgroundImage = 'url(\' ../images/ant.png \')';
        this.ant.style.height = this.radius+'px';
        this.ant.style.width = this.radius+'px';
        this.ant.style.borderRadius = '50%';
        //this.ant.style.border='4px dashed black';
        this.ant.style.position = 'absolute';
        this.top = this.ant.style.top=randomNo(10,(BOXHEIGHT-2*this.radius))+'px';
        this.top = parseInt(this.top);
        this.left = this.ant.style.left=randomNo(20,(this.boxWidth-2*this.radius))+'px';
        this.left = parseInt(this.left);
        this.ant.style.textAlign='center';
        
        this.parentEle.appendChild(this.ant);
    }
    direction(){
        this.dx = 1;
        this.dy = 1;
    }
    reverseX(ant){
        this.dx *=-1;
    }
    reverseY(ant){
        this.dy *=-1;
    } 
    update(){
        this.ant.style.left = this.left + 'px';
        this.ant.style.top = this.top + 'px';   
    }
    move(){
        this.left = parseInt(this.left) + this.dx;
        this.top = parseInt(this.top) + this.dy;
        this.update();
    }
    checkBorderCollisionX(){
        if((this.left <= 0 ) || (this.left+(2*this.radius))>=(this.boxWidth+this.radius)){
            return true;
        }
        return false;
        
    }
    checkBorderCollisionY(){
        if((this.top <= 0 ) || (this.top+(2*this.radius))>=(BOXHEIGHT+this.radius)){
            return true;
        }
        return false;
    }
}

class Game{
    constructor(container,no){
        this.container = null;
        this.ants = [];
        this.noOfant=no;
        this.score = 0;
        this.createBox(container);
        this.killAnt();
        
    }
    createBox(){
        this.container = container;
        var box = document.createElement('div');
        box.style.height = BOXHEIGHT+'px';
        box.style.width = (BOXWIDTH/100 * window.innerWidth)+'px';
        box.style.margin = '15px auto';
        box.style.borderLeft = '5px solid red';
        box.style.borderRight = '5px solid red';
        box.style.borderTop = '5px solid yellow';
        box.style.borderBottom = '5px solid yellow';
        box.style.position = 'relative';
        box.style.backgroundImage = 'url(\'../images/grass.jpg\')';
        box.setAttribute('class','clearfix');
        this.container.appendChild(box);
        
        this.createAnt();
    }//creates the borderBox
    createAnt(){
        for(var i=0;i<this.noOfant;i++){
            var ant = new Ant(this.container.children[2]); //Ant
            ant.boxWidth = (BOXWIDTH/100 * window.innerWidth);
            ant.create();
            ant.direction();
            this.ants.push(ant);
        }
    }

    twoAntCollision(firstant,secondant){

        let radiusSum = (firstant.radius +secondant.radius)/2;
        let x1 = firstant.left + (firstant.radius/2);
        let x2 = secondant.left + (secondant.radius/2);
        let y1 = firstant.top + (firstant.radius/2);
        let y2 = secondant.top + (secondant.radius/2);
        let distance = Math.sqrt(Math.pow((x1-x2),2) + Math.pow((y1-y2),2));

    
        if(distance <= radiusSum){
            return true;
        }
        else{
            return false;
        }
    }

    allCollision(){
            for(var i=0; i <(this.ants.length); i++){
                for(var j=1; j<(this.ants.length);j++){
                    if(i != j){
                        if(this.twoAntCollision(this.ants[i],this.ants[j])){
                            this.ants[i].reverseX(this.ants[j]);
                            this.ants[i].reverseY(this.ants[j]);
                        }
                    }
                }
    
            }
    }

    killAnt(){
        let kamila = this.container.children[2];
        let kamilaCount= kamila.children.length;
        var that = this;
        console.log(kamila);
        for(var i=0;i<kamilaCount;i++){
            kamila.children[i].onclick= function(){
                this.parentNode.removeChild(this);
                that.score++;
                document.getElementById('score-value').innerHTML = that.score;
                if(kamila.children.length == 0){
                    alert("Congratulation. You Won.");
                }
            }
        }
    }
    
    moveAnts(){
        let that=this;
        setInterval(function(){
            //console.log(that.ants);
            for(var i = 0; i < that.noOfant; i++) {
                if(that.ants[i].checkBorderCollisionX()){
                    that.ants[i].reverseX();
                }
                if(that.ants[i].checkBorderCollisionY()){
                    that.ants[i].reverseY();
                }
                that.ants[i].move();
            }  
            //that.killAnt();
            that.allCollision();
        }, FRAME_RATE);
    }
}
var container = document.getElementById('container');
var game= new Game(container,15);
game.moveAnts();