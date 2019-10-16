const CAR_AUDIO = new Audio();
const vechicle = ['Audi.png','Black_viper.png','Car.png','Ambulance.png','Mini_truck.png','Mini_van.png','Police.png','taxi.png','truck.png'];

function randomNo(lower,upper) {
    let randNo = Math.floor(Math.random() * (upper-lower + 1 ) + lower);
    return randNo;
}

class Car{
    constructor(parentEle,type){
        this.parentEle = parentEle;
        this.type = type;
        this.car = null;
        this.carName=null;
        this.carLane = null;
        this.factor = null;
        this.score = 0;
        this.carTop=null;
        this.carLeft=null;
        this.gameStatus=true;
        this.createCar();
        
        
    }
    createCar(){
        this.carLane = randomNo(1,3);
        this.car = document.createElement('div');
        if(this.type == 'player'){
            this.carTop = (screen.height - 175)+'px';
            this.carName =vechicle[randomNo(0,2)];
            this.car.style.bottom = '0';
        }
        else if(this.type == 'opponent'){
            this.carTop = '-50px';
            this.carName =vechicle[randomNo(0,8)];
            this.car.style.top = '-50px';
            this.car.style.transform = 'rotate(180deg)';
    
            this.moveOpponent();        
        }
        
        this.car.style.backgroundImage = 'url(\' images/'+this.carName+' \')';
        //this.car.style.backgroundColor='green';
        this.car.style.backgroundRepeat='no-repeat';
        this.car.style.backgroundSize='contain';
        this.car.style.backgroundPosition='center';
        this.car.style.height = '175px';
        this.car.style.width = '150px';
        this.car.style.position = 'absolute';
        this.factor = (this.carLane == 1) ? 110 : (this.carLane == 2) ? 135 : 145;
        this.car.style.left = (this.carLane) * this.factor + 'px';
        this.carLeft = this.car.style.left;
        this.parentEle.appendChild(this.car);   
    }
    gameOverState(){
        setTimeout(()=>{
            //this.car.style.backgroundImage='none';
            this.car.style.backgroundImage='url(\' images/fire.gif\')';
        },100);
        setTimeout(()=>{
            this.car.style.backgroundImage='none';
        },3000);
    }
    moveOpponent(){
        let top = 0;
        let factor = 3;
        let opponentInterval = setInterval(()=>{
            this.car.style.top = top+'px';
            top += factor;
            //console.log(this.car.style.top);
            if((top-175) >= screen.height){
                console.log('Crossed');
                this.carLane = randomNo(1,3);
                top = (this.carLane == 1) ? -50: -350;
                factor = (this.carLane == 1) ? 2: (this.carLane == 2) ? 3 : 4;
                this.carName =vechicle[randomNo(3,8)];
                this.car.style.backgroundImage = 'url(\' images/'+this.carName+' \')';
                
                this.factor = (this.carLane == 1) ? 110 : (this.carLane == 2) ? 135 : 145;
                this.car.style.left = (this.carLane) * this.factor + 'px';
                this.score++;  
            }
            this.carTop= this.car.style.top;
            this.carLeft = this.car.style.left;
            //this.opponentInterval = opponentInterval;
       },10);
    }
    getScore(){
        return this.score;
    }
    playSound(type){
        if(type == 'horn'){
            CAR_AUDIO.src = 'audio/horn.mp3';
        }
        else if(type == 'bump'){
            CAR_AUDIO.src = 'audio/bump.mp3';
        }
        else if(type == 'brake'){
            CAR_AUDIO.src = 'audio/brake.wav';
        }
        else if(type == 'running'){
            CAR_AUDIO.src = 'audio/car_running.mp3';            
        }
        else if(type == 'attack'){
            CAR_AUDIO.src = 'audio/attack.mp3';            
        }
        CAR_AUDIO.play();
    }
    update(){
        this.car.style.transition='all 0.5s';
        this.factor = (this.carLane == 1) ? 110 : (this.carLane == 2) ? 135 : 145;
        this.car.style.left = (this.carLane) * this.factor + 'px';
        this.carLeft = this.car.style.left;
    }
    keyPress(action){
        if(action == 'left'){
            if(this.carLane == 1){
                this.carLane = 1;
                this.playSound('bump');
            }
            else{
                this.carLane--;
            }
        }
        else if(action == 'right'){
            if(this.carLane == 3){
                this.carLane = 3;
                this.playSound('bump');
            }
            else{
                this.carLane++;
            }
        }
        else if(action == 'up'){
            this.playSound('running');
        }
        else if(action == 'down'){
            this.playSound('brake');
        }
        else if(action == 'enter'){
            this.playSound('horn');
        }
        else if(action == 'attack'){
            this.playSound('attack');
        }
        this.update();
    }

}

class Game{
    constructor(htmlBody,speed){
        this.htmlBody = htmlBody;
        this.speed = speed; //for changing speed
        this.minSpeed = speed; //to set minimum speed 

        // Road Image
        this.roadImg = null;
        this.roadImgHt = null;
        this.roadTop = null;

        //Car
        this.car = null;

        //Opponent 
        this.opponent=[];
        
        //Score and Timing  
        this.seconds = 0;
        this.secondCounter = null;
        this.score = 0;
        this.isGameOver = false;

        //intervals
        this.survivalTime=null;
        this.roadInterval=null;
        this.collisionInterval=null;

        this.styleHtmlBody();
        this.createRoad();        
    }
    styleHtmlBody(){
        this.htmlBody.style.backgroundColor = '#5c5c5c';
    }
    updateSpeed(){
        if(this.speed >= 25){
            document.getElementById('speed').innerHTML=this.speed+'KM/Hrs'+"<font color='red'> (Speed) </font>";
        }
        else if(this.speed <= 5){
            document.getElementById('speed').innerHTML=this.speed+'KM/Hrs'+"<font color='green'> (Min) </font>";
        }
        else{
            document.getElementById('speed').innerHTML=this.speed+'KM/Hrs';
        }
        
    }
    updateScore(){
        document.getElementById('score').innerHTML=this.opponent[0].getScore();
    }
    checkKeyPress(){
        var that = this;
        document.addEventListener ('keydown', function (event){
            if(event.keyCode == 37 || event.keyCode == 65){
                that.car.keyPress('left');
            }
            else if(event.keyCode == 39 || event.keyCode == 68){
                that.car.keyPress('right');
            }
            else if(event.keyCode == 38 || event.keyCode == 87){
                that.speed++;
                that.updateSpeed();
                that.car.keyPress('up');
            }
            else if(event.keyCode == 40 || event.keyCode == 83){
                if(that.speed > that.minSpeed){
                    that.speed--;
                    that.updateSpeed();
                }
                that.car.keyPress('down');
            }
            else if(event.keyCode == 13){
                that.car.keyPress('enter');
            }
            else if(event.keyCode == 32){
                that.car.keyPress('attack');
            }
        }); 
    }
    //Count total time survived
    incrementSeconds() {
        var that = this;
        this.survivalTime=setInterval(function(){
            that.seconds += 1;
            document.getElementById('survival-time').innerHTML = that.seconds +'sec';
            that.updateScore();
        },1000);
       
    }
    moveImg(){
        var that = this;
        let top = that.roadTop;
        this.roadInterval=setInterval(function(){
            top += that.speed;
            that.roadImg.style.top =  top +'px';
            top = parseInt(that.roadImg.style.top);
        
            if(parseInt(that.roadImg.style.top) >= 0){
                that.roadImg.style.top = (that.roadTop)+'px';
                top = that.roadTop;
            }
        },10);
    }
    createScoreBoard(){
        let scoreBoard = document.createElement('div');
        
        
        scoreBoard.style.height='auto';
        scoreBoard.style.width='250px';
        scoreBoard.style.position='fixed';
        scoreBoard.style.backgroundColor='#2C3335';
        scoreBoard.style.marginLeft='-3px';
        scoreBoard.style.borderTopRightRadius='25px';
        scoreBoard.style.borderBottomRightRadius='25px';
        scoreBoard.style.borderRight='5px solid #F5C469'; 
        scoreBoard.style.top='30%';
        scoreBoard.style.padding='10px';
        scoreBoard.style.transition='all 0.5s';
        scoreBoard.style.color='#ffffff';

        let carInfo = document.createElement('span');
        carInfo.style.lineHeight='45px';
        carInfo.style.borderBottom='0.5px solid #EAF0F1';
        carInfo.style.display='block';
        carInfo.style.fontWeight='bold';
        carInfo.style.fontSize='18px';
        carInfo.innerHTML="Vechicle: "+this.car.carName.toUpperCase().substr(0,this.car.carName.indexOf('.',0)).replace("_"," ");

        let score = document.createElement('span');
        score.style.lineHeight='45px';
        score.style.borderBottom='0.5px solid #EAF0F1';
        score.style.display='block';
        score.style.fontWeight='bold';
        score.style.fontSize='18px';
        score.innerHTML="Score: <span id='score'>00</span>";

        let survivalTime = document.createElement('span');
        survivalTime.style.lineHeight='45px';
        survivalTime.style.borderBottom='0.5px solid #EAF0F1';
        survivalTime.style.display='block';
        survivalTime.style.fontWeight='bold';
        survivalTime.style.fontSize='18px';
        survivalTime.innerHTML="Survival Time: <span id='survival-time'>00sec</span>";

        let speed = document.createElement('span');
        speed.style.lineHeight='45px';
        speed.style.borderBottom='0.5px solid #EAF0F1';
        speed.style.display='block';
        speed.style.fontWeight='bold';
        speed.style.fontSize='18px';
        speed.innerHTML="Speed: <span id='speed'>"+this.speed+"KM/Hrs</span>";

        scoreBoard.appendChild(carInfo);
        scoreBoard.appendChild(score);
        scoreBoard.appendChild(survivalTime);
        scoreBoard.appendChild(speed);

        

        let clickCount = 0;
        scoreBoard.addEventListener('click',function(){
            if(clickCount == 0){
                scoreBoard.style.marginLeft='-3px';
                clickCount++;
            }
            else{
                scoreBoard.style.marginLeft='-200px';
                clickCount--;
            }
        });
        this.htmlBody.prepend(scoreBoard);
    }

    createRoad(){
        let div = document.createElement('div');
        let img = document.createElement('img');
        let startGame = document.createElement('button');

        // Container div styling 
        div.style.height = '100vh';
        div.style.width = "700px";//div.style.width = "80%";
        div.style.backgroundImage = 'url(\' images/road.png  \')'; //backup
        div.style.backgroundRepeat = 'no-repeat';
        div.style.backgroundSize = 'cover';
        div.style.overflow = 'hidden';
        div.style.margin = '0 auto';
        div.style.position='relative';

        //Road Image
        img.setAttribute('src','images/road.png');
        img.style.width='700px';
        img.style.height = '2555px';
        img.style.position='absolute';
        
        this.roadImgHt = 2555;
        this.roadTop = screen.height - parseInt(img.style.height);
        img.style.top = this.roadTop+'px' ;
        // console.log("Screen Height: "+screen.height);
        // console.log("Image Height: "+this.roadImgHt);
        // console.log("Difference: "+this.roadTop);
        
        this.roadImg = div.appendChild(img);
        
        //Start Game
        startGame.style.border='none';
        startGame.style.fontSize ='22px';
        startGame.style.fontWeight='bolder';
        startGame.style.opacity='0.6';
        startGame.style.lineHeight='50px';
        startGame.style.width='60%';
        startGame.style.backgroundColor = '#75DA8B';
        startGame.style.position='absolute';
        startGame.style.margin='5%';
        startGame.innerHTML = 'Start Game';
        startGame.setAttribute('id','start-game');
        div.appendChild(startGame);

        this.htmlBody.appendChild(div);

        this.startGame();
        //this.createCar();        
    }
    startGame(){
        let startGame = document.getElementById('start-game');
        startGame.addEventListener('click',()=>{
            startGame.style.display='none';
            if(!this.isGameOver){
                this.createCar();
                this.createScoreBoard();
                this.checkKeyPress();
                this.incrementSeconds();
                this.moveImg();
                this.checkCollision();
            }
        });
    }
    createCar(){
        this.car = new Car(this.roadImg.parentElement,'player');
        
        for(var i=0;i<2;i++){
            this.opponent.push(new Car(this.roadImg.parentElement,'opponent'));
        }
    }
    checkCollision(){
        let ht = 5;
        let wd = 150;
        
        this.collisionInterval = setInterval(()=>{
            let y1 = parseInt(this.car.carTop);
            let x1 = parseInt(this.car.carLeft);
            for(var i=0;i<this.opponent.length;i++){
                let y2 = parseInt(this.opponent[i].carTop);
                let x2 = parseInt(this.opponent[i].carLeft);
                if(y2 <= 600){
                    if(this.car.carLane == this.opponent[i].carLane){
                        if((x1<(x2+wd)&&(x1+wd)>x2)&&(y1<(y2+ht)&&(y1+ht)>y2)){
                            console.log("Collision");
                            this.gameOver();
                        }
                    }
                }
            }
        },10)
    }
    gameOver(){
       this.isGameOver = true;
       if(this.isGameOver){
           clearInterval(this.survivalTime);
           clearInterval(this.roadInterval);
           clearInterval(this.collisionInterval);
           this.car.gameOverState();

           let playAgain = document.createElement('button');
            //Play Again
            playAgain.style.border='none';
            playAgain.style.fontSize ='22px';
            playAgain.style.fontWeight='bolder';
            playAgain.style.opacity='0.6';
            playAgain.style.lineHeight='50px';
            playAgain.style.width='60%';
            playAgain.style.backgroundColor = '#BA2F16';
            playAgain.style.position='absolute';
            playAgain.style.margin='5%';
            playAgain.innerHTML = 'Play Again';
            playAgain.addEventListener('click',()=>{
                location.reload();
            });
            
            this.htmlBody.children[2].appendChild(playAgain);
       }
    }
}
htmlBody = document.querySelector('body');
var game = new Game(htmlBody,speed=2);