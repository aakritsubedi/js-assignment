;(function(){
    function Box(parentElement){
        this.parentElement = parentElement;
        this.element=null;
        this.x=null;
        this.y=null;
        this.dx = 1;
        this.dy = 1;


        this.init = function(){
            this.element =document.createElement('div');
            this.element.classList.add('box');
            this.parentElement.appendChild(this.element);
        }
        
        this.init();//to create box
        
        
        this.setPosition = function(x,y){
            this.x = x;
            this.y = y;
        }

        this.draw = function(){
            this.element.style.top = this.y + 'px';
            this.element.style.left = this.x + 'px';
        }


        //this.move =move.bind(this);
        function move(){
            this.y += this.dy;
            this.x += this.dx;

            draw(this.y,this.x);
        }
    }

    function Game(boxCount){
        var GAME_WIDTH = 500;
        var GAME_HEIGHT = 500;
        this.boxes = [];
        this.boxCount=boxCount;
        this.parentElement = document.getElementById('app');

        this.moveBoxes = function() {
            for(var i=0; i< this.boxCount; i++) {
              this.boxes[i].move()
            }
        }

        this.init = function(){
          this.createBoxes();
          setInterval(this.moveBoxes.bind(this), 1000);
          return this;
        }

        this.createBoxes = function(){
            for(var i = 0;i< boxCount; i++){
                var box = new Box(this.parentElement);
                var randomX = 50+i*100;
                var randomY = 50+i*100;

                box.setPosition(randomX,randomY);

                box.draw();
                this.boxes.push(box);
            }
            //console.log(this.boxes);
        }
    }
    new Game(5).init();
})()

