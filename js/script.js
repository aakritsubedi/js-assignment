var carouselContianer  = document.getElementsByClassName('carousel-container')[0];
var imageWrapper = document.getElementsByClassName('carousel-image-wrapper')[0];





//Required Elements 
var divLt = document.createElement('button');
var divRt = document.createElement('button');
var ul = document.createElement('ul');
var li = document.createElement('li');
var div = document.createElement('div');

//Counting Images
var images = imageWrapper.getElementsByTagName('img');
var imageCount = images.length;

//Getting Ht and Wd of an images
var imageHt=[];
var imageWd=[];
//var sliderImg = images.chi;
for(i=0;i<imageCount;i++){
    imageHt.push(images[i].clientHeight);
    imageWd.push(images[i].clientWidth);
}

//console.log("Height: ", imageHt);
//console.log("Width: ",imageWd);

//total required width of wrapper
var widthOfWrapper= imageWd.reduce((a,b) => a+b,0);
//console.log(widthOfWrapper);


//assigning the wrapper width and height
imageWrapper.style.width = widthOfWrapper+1 + 'px';
imageWrapper.style.height = imageHt[0] + 'px'; //assuming all images have equal height
//console.log(imageWrapper.style.width);


//adding element


//adding css and element on the span tag
    //adding controller 
    var controllerBox = carouselContianer.appendChild(div);
    controllerBox.setAttribute('class','controller-box');
    controllerBox.classList.add('clearfix');
    var ltArrow=controllerBox.appendChild(divLt);
    ltArrow.setAttribute('class','ltArrow');
    ltArrow.setAttribute('id','ltArrow');
    ltArrow.innerHTML = '<';

    var indicator=controllerBox.appendChild(ul);
    indicator.setAttribute('class','indicator');
    for(var i=0; i<imageCount; i++){
        var btn = document.createElement('button');
        btn.innerHTML = '0';
        btn.style.fontSize = '25px';
        btn.style.border = 'none';
        btn.style.padding='2px 5px';
        btn.style.background = 'none';
        btn.style.color = '#7a0707';
        btn.setAttribute('onclick', `imgChgTo(${i});`);
        
        li.appendChild(btn);
        li.style.cssFloat = 'left';
        li.style.listStyle = 'none';
        li.style.padding = '7px 7px';
        
        indicator.appendChild(li);
    }

    var rtArrow=controllerBox.appendChild(divRt);
    rtArrow.setAttribute('class','rtArrow');
    rtArrow.setAttribute('id','rtArrow');
    rtArrow.innerHTML='>';


//getting position of wrapper
// var imgPosX=[]; var imgPosY=[];
// for(i=0;i<imageCount;i++){
//     imgPosX.push(images[i].getBoundingClientRect().left);
//     imgPosY.push(images[i].getBoundingClientRect().top);
// }
//console.log(imgPosX);
//console.log(imgPosY);

var posX = parseInt(imageWrapper.getBoundingClientRect().left);
//console.log(posX);
//functions
//0.Btn Check
function disableBtn(){
    if(posX == 0){
        rtBtn.disabled = true;
        rtBtn.style.background="red";
        rtBtn.innerHTML = "-";
    }
    else{
        rtBtn.disabled = false;
        rtBtn.style.background="none";
        rtBtn.innerHTML = ">";
    }

    n= imageCount;
    var checkValLt = (n-1)*imageWd[0];

    if(posX == -checkValLt){
        ltBtn.disabled = true;
        ltBtn.style.background="red";
        ltBtn.innerHTML = "-";
    }
    else{
        ltBtn.disabled = false;
        ltBtn.style.background="none";
        ltBtn.innerHTML = "<";
    }
}

//a.Automatic
var slideAutomatic = setInterval(function(){
    console.log(posX);
    //disable btn
    disableBtn();
    n= imageCount;
    checkVal = (n-1)*imageWd[0];
    var val = -(imageWd[0]);
    if(posX < -checkVal ){
        imageWrapper.style.left='0px';
    } 
    imageWrapper.style.left=posX+'px';
    if(posX == -checkVal){
        posX=0;
        val=0;
    }
    posX += val;
},5000);



//b.Right Button
var rtBtn = document.getElementById('rtArrow');
rtBtn.onclick = function(){
    console.log("Before PosX: ",posX);
    
    if(posX < 0){
        posX += imageWd[0];
        imageWrapper.style.left=posX+'px';
        console.log("After PosX: ",posX);
        
    }
    else{
        rtBtn.disabled = true;
        rtBtn.style.background='red';
        rtBtn.innerHTML = '-';
    }
};

//c.left Button
var ltBtn = document.getElementById('ltArrow');
ltBtn.onclick = function(){
    console.log("Before PosX: ",posX);
    n= imageCount;
    checkValLt = (n-1)*imageWd[0];
    
    if(posX > -checkValLt){
        posX -= imageWd[0];
        imageWrapper.style.left=posX+'px';
        console.log("After PosX: ",posX);
    }
    else{
        ltBtn.disabled = true;
        ltBtn.style.background="red";
        ltBtn.innerHTML = "-";
    }
};

//image change to function
function imgChgTo(index){
    posX = index * -imageWd[index];
    imageWrapper.style.left=posX+'px'; 
}