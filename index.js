let play=document.querySelector('.play');
let restart=document.querySelector('.restart');
const restartGame=()=>{
restart.addEventListener('click',()=>{
    let gameOver=document.querySelector('.gameOver');
    let dino=document.querySelector('.dyno');
    let obstacle=document.querySelector('.obstacle');
    obstacle.classList.add('dragonRace');
gameOver.style.visibility='hidden';
dino.style.bottom=0;
score = 0;
updateScore(score);
// Delay the playGame function to ensure it is called after the restart logic
setTimeout(() => {
    playGame(); // Start the game again
},10);
});
}
restartGame();
const updateScore=(score)=>{
    scoreCount.innerText=`Your Score is : ${score}`;
}
//function when click play button then game start
function playGame(){
    let scoreTrue=true;
    let score=0;
    let start=new Audio('start.mp3');
    start.loop=true;
    let dino=document.querySelector('.dyno');
start.play();
// key press up key left or right arrow key 
document.onkeydown= function(e){
    // up key presss then jump  dino up key code is 38
    if(e.keyCode=='38'){
       dino.classList.add("animateDino");
       setTimeout(()=>{
        dino.classList.remove("animateDino");
       },800);
    }
    // right key presss then dino go to right side   right key code is 39
    if(e.keyCode=='39'){
        let dinox=parseInt(window.getComputedStyle(dino,null).getPropertyValue('left'));
        dino.style.left=dinox+70+'px';
        dino.style. transform= `scaleX(${1})`;
    }
    // left key presss then dino go to left side  rigleftht key code is 37
    if(e.keyCode=='37'){
        let dinox=parseInt(window.getComputedStyle(dino,null).getPropertyValue('left'));
        dino.style.left=dinox-70+'px';
        // dino.style. transform= `scaleX(${-1})`;
    }
}
// check every time when start game ,that dino and dragon touch each other
setInterval(()=>{
    let gameOver=document.querySelector('.gameOver');
    let obstacle=document.querySelector('.obstacle');
// calculate distance between dino and dragon
let dx =parseInt(window.getComputedStyle(dino,null).getPropertyValue('left'));
let dy=parseInt(window.getComputedStyle(dino,null).getPropertyValue('top'));
let ox =parseInt(window.getComputedStyle(obstacle,null).getPropertyValue('left'));
let oy=parseInt(window.getComputedStyle(obstacle,null).getPropertyValue('top'));
offsetX=Math.abs(dx-ox);
offsetY=Math.abs(dy-oy);
// if touch dino and dragon then stop the game 
if(offsetX<30&&offsetY<60){
    score=0;
gameOver.style.visibility='visible';
obstacle.classList.remove('dragonRace');
let gameOverVoice=new Audio('gameover.mp3')
// play music game when stop the game 
gameOverVoice.play();
// stop start game  music  when stop the game 
start.pause();
// end of dino when collaite with dragon  
dino.style.bottom=-90+'px';
// stop the game over music 
setTimeout(()=>{
    gameOverVoice.pause();
},3000);
restart.style.display='block';
}//end of if which is check collation of dino and dragon 
// and if dino and dragon not touch each other the count score 
else if(scoreTrue&&offsetX<30){
    score+=1;
    scoreTrue=false;
    // scoreCount.innerText=`Your Score is : ${score}`;
    updateScore(score);
    setTimeout(()=>{
  scoreTrue=true;
    },100)
// speed of dragon grow with duration
setTimeout(()=>{
    let aniDuration=parseInt(window.getComputedStyle(obstacle,null).getPropertyValue('animation-duration'));
 let newDuration=aniDuration-0.009;
    obstacle.style.animationDuration=newDuration+'s';
},650);
}
},100);
// restartGame();
// end of event listner 
}
play.addEventListener('click',()=>{
    play.style.display='none';
    playGame();
});

