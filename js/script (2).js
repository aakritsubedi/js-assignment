var container = document.querySelector('.container');

var button = container.children[0];
var span = document.createElement('span');
span.setAttribute('class','fa fa-moon-o');
button.innerHTML = 'Night &nbsp; ';
button.classList.add('night');
button.appendChild(span);

var timeHolder = document.querySelector('.time-holder');
var clickCount = 0;
function changeToDark(){
    console.log(clickCount,"Night Mode On");
    button.innerHTML = 'Day &nbsp; ';
    timeHolder.classList.remove('night');
    timeHolder.classList.add('day');
    button.classList.remove('night');
    button.classList.add('day');
    button.innerHTML += "<span class='fa fa-sun-o'></span>";
    document.getElementsByTagName('body')[0].style.backgroundColor='#222222';
    document.getElementsByTagName('body')[0].style.color='#ffffff';
    clickCount++;
}
function changeToLight(){
    console.log(clickCount,"Day Mode On");
    button.innerHTML = 'Night &nbsp; ';
    timeHolder.classList.remove('day');
    timeHolder.classList.add('night');
    button.classList.remove('day');
    button.classList.add('night');
    button.innerHTML += "<span class='fa fa-moon-o'></span>";
    document.getElementsByTagName('body')[0].style.backgroundColor='';
    document.getElementsByTagName('body')[0].style.color='';
    clickCount--;
}
var today = new Date();
var currentTime = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
var time = document.getElementById('time');
time.innerHTML = currentTime;
if(today.getHours()>=14){
    changeToDark();
}

button.onclick = function(){    
   if(clickCount == 0){
    changeToDark();
   }
   else{
    changeToLight();
   }
}




