

var mainBody = document.querySelector('body');

//elements
var div = document.createElement('div');
var button = document.createElement('button');

//styling button
button.style.border='none';
button.style.position='fixed';
button.style.width='95px';
button.style.padding ='2px 15px';
button.style.lineHeight='35px';
button.style.marginLeft='-55px';
button.style.backgroundColor = '#222222';
button.style.color='#ffffff';
button.style.borderTopRightRadius='10px';
button.style.borderBottomRightRadius='10px';
button.style.borderRight='8px solid #01CBC6';
button.style.fontWeight='bolder';
button.style.textAlign='center';
button.innerHTML += 'Night ';
button.innerHTML += ' &nbsp;&nbsp; &#9790;';


mainBody.prepend(button);

button.addEventListener('mouseenter',function(){
    this.style.marginLeft='0';
});
button.addEventListener('mouseleave',function(){
    this.style.marginLeft='-55px';
});
var clickCount = 0;
//change to Dark Theme
function changeToDark(that){
    console.log(clickCount,"Night Mode On");
    
    that.style.backgroundColor = '#cdcdcd';
    that.style.color='#222222';
    that.innerHTML = 'Day ';
    that.innerHTML += ' &nbsp;&nbsp; &#9728;';

    mainBody.style.backgroundColor='#222222';
    mainBody.style.color='#ffffff';
    mainBody.classList.add('night-body');
    clickCount++;
}
//change to default theme
function changeToLight(that){
    console.log(clickCount,"Day Mode On");
    that.style.backgroundColor = '#222222';
    that.style.color='#ffffff';
    that.innerHTML = 'Night ';
    that.innerHTML += ' &nbsp;&nbsp; &#9790;';

    mainBody.style.backgroundColor='#ffffff';
    mainBody.style.color='#222222';
    mainBody.classList.remove('night-body');
    clickCount--;
}

button.onclick = function(){
    var that = this;    
    if(clickCount == 0){
     changeToDark(that);
    }
    else{
     changeToLight(that);
    }
 }