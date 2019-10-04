var div = document.createElement('div');


var FPS=60;
var FRAME_LIMIT = 1000/FPS;

;(function(){

    //slider
    function Slider(parentEle,startIndex){
        this.parentEle = parentEle;
        //images
        this.images = null;
        this.noOfImages = null;
        this.widthOfImg = []; //array of individual width
        this.sumOfWidthOfImg = null;

        //firstImage to display
        this.startIndex = startIndex;

        this.currentIndex = null;

        this.widthOfWrapper = null;
        this.carouselWrapper = null;
        this.imageWrapper = null;
    
        this.posX = null;
        
        this.resizeImg = function(){
            var screenWd = screen.width;
            var screenHt = screen.height;

            this.images = this.parentEle.getElementsByTagName('img');
            this.noOfImages = this.images.length;

            for(var i=0;i<this.noOfImages;i++){
                this.images[i].style.width=screenWd/2+'px';
                this.images[i].style.height=screenHt/2+'px';
            }
        }
        this.imgInfo = function(){
            //widthOfAllimg and Storing the sum of all width
            this.sumOfWidthOfImg = 0;
            for(i=0;i<this.noOfImages;i++){
                var widthImg = parseInt(this.images[i].style.width);
                this.widthOfImg.push(widthImg);
                this.sumOfWidthOfImg += widthImg;
            }
        }

        this.assignWidthOfWrapper = function(){
            this.imageWrapper=this.parentEle.children[0];
            this.imageWrapper.style.width = this.sumOfWidthOfImg + 'px';

            this.posX =this.imageWrapper.getBoundingClientRect().left;

            // this.imageWrapper.style.position = 'relative';
        }

        this.floatImg = function(){
            for(var i =0; i< this.noOfImages; i++){
                this.images[i].style.float = 'left';
            }
        }
        this.setCSS = function(){
            //Carousel Wrapper
            this.carouselWrapper = this.parentEle;
            this.carouselWrapper.style.height = this.images[0].naturalHeight + 'px';
            this.carouselWrapper.style.overflow = 'hidden';
            this.carouselWrapper.style.float = 'left';
            var widthOfScreen = screen.width;
            this.carouselWrapper.style.width = 0.50 * widthOfScreen+'px';

            //ImageWrapper 
            this.imageWrapper=this.parentEle.children[0];
            this.imageWrapper.style.position='relative';
            //Row
            var row = this.carouselWrapper.parentElement;
            var widthOfScreen = screen.width;
            
            row.style.width=widthOfScreen+'px';
            row.style.margin='0 auto';
            row.style.boxSizing = 'border-box';
        
            
        }
        //image change to function
        var that = this;
        function imgChgTo(index){
            that.posX = index * that.widthOfImg[index];
            that.imageWrapper.style.left=posX+'px'; 

        }
        this.controller = function(){
            var div=document.createElement('div');
            var buttonLt=document.createElement('button');
            var buttonRt=document.createElement('button');
            var ul=document.createElement('ul')
            var li=document.createElement('li');
            


            var controllerBox=this.carouselWrapper.appendChild(div);
            controllerBox.setAttribute('class','controller-box');
            var ltBtn = controllerBox.appendChild(buttonLt);
            ltBtn.setAttribute('class','ltArrow');
            ltBtn.setAttribute('id','ltArrow');
            ltBtn.innerHTML = '<';

            var rtBtn = controllerBox.appendChild(buttonRt);
            rtBtn.setAttribute('class','rtArrow');
            rtBtn.setAttribute('id','rtArrow');
            rtBtn.innerHTML = '>';
            
            var indicator=controllerBox.appendChild(ul);
            indicator.setAttribute('class','indicator');
            for(var i=0; i<this.noOfImages; i++){
                var btn = document.createElement('button');
                btn.innerHTML = '0';
                btn.style.fontSize = '25px';
                btn.style.border = 'none';
                btn.style.padding='2px 5px';
                btn.style.background = 'none';
                btn.style.color = '#7a0707';
                btn.setAttribute('onclick', this.click.indexingPos(${i}));
                
                li.appendChild(btn);
                li.style.listStyle = 'none';
                li.style.padding = '7px 7px';
                
                indicator.appendChild(li);
            }

        }


        this.displayFirstImg = function(){
            this.currentIndex=this.startIndex;
            console.log(this.currentIndex);
            this.imageWrapper.style.left = -this.currentIndex * this.widthOfImg[this.currentIndex]+'px';
        }
        
        this.autoSlide= function(){

            this.posX =this.imageWrapper.getBoundingClientRect().left;
            //this.imageWrapper.style.left = '-1366px';

        }

        
        
        this.click = function(){
            var controllerBox = this.parentEle.children[1];
            var ltArrow = controllerBox.children[0];
            var rtArrow = controllerBox.children[1];
            var indexingBtn = controllerBox.children[2];
            
            var widthOfImg = this.widthOfImg[0];
            //var index = this.currentIndex;
            var that = this;
            //console.log(widthOfImg);

            var imgWrapperOfThis = controllerBox.parentElement.children[0];
            //console.log(controllerBox);
            console.log(ltArrow,"\n",rtArrow);
            ltArrow.onclick = function(){
                if(that.currentIndex != 4){
                    var chgVal = (that.currentIndex+1)*widthOfImg;
                    that.currentIndex = that.currentIndex +1;
                    imgWrapperOfThis.style.left= -chgVal +'px';
                    console.log(indexingBtn);
                    console.log(that.currentIndex);
                }
                else{
                    console.log("Cant Go");
                }
                //return chgVal;
            }
            rtArrow.onclick = function(){
                if(that.currentIndex != 0){
                    var chgVal = (that.currentIndex-1)*widthOfImg;
                    that.currentIndex = that.currentIndex -1;
                    imgWrapperOfThis.style.left= chgVal +'px';
                    console.log(that.currentIndex);
                }
                else{
                    console.log("Cant Go");
                }
                //return chgVal;
            }
            this.indexingPos = function(index){
                that.currentIndex = index;
                var chgVal = (that.currentIndex)*widthOfImg;
                imgWrapperOfThis.style.left= chgVal +'px';
                console.log(that.currentIndex);
            }
            this.currentIndex + 1;
            //console.log()
        }

        
        this.init = function(){
            
            this.resizeImg();
            this.imgInfo();
            this.assignWidthOfWrapper();
            this.floatImg();
            this.setCSS();
            
            this.controller();
            this.displayFirstImg()
        }

        this.init();
        setInterval(this.autoSlide(),1000);
        this.click();

    }
    new Slider(document.getElementsByClassName('carousel-wrapper')[0],startIndex=1);
    new Slider(document.getElementsByClassName('carousel-wrapper')[1],startIndex=3);
    new Slider(document.getElementsByClassName('carousel-wrapper')[2],startIndex=4);
    new Slider(document.getElementsByClassName('carousel-wrapper')[3],startIndex=2);
})();
