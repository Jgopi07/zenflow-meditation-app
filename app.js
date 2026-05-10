const audio = document.querySelector(".main-audio");

const video = document.querySelector(".background-video");

const playButton = document.querySelector(".play-button");

const playIcon = document.querySelector(".play-button i");

const timeDisplay = document.querySelector(".time-display");

const progressCircle = document.querySelector(".ring-progress");

const timerButtons = document.querySelectorAll(".timer-btn");

const soundCards = document.querySelectorAll(".sound-card");

const volumeSlider = document.querySelector(".volume-slider");

const musicName = document.querySelector(".music-name");

const sessionTitle = document.querySelector(".session-title");

const navButton = document.querySelector(".nav-button");

const startButton = document.querySelector(".start-btn");

const exploreButton = document.querySelector(".explore-btn");

const mobileMenu = document.querySelector(".mobile-menu");

const navMenu = document.querySelector(".nav-menu");

const quoteBox = document.querySelector(".quote-box h2");

let fakeDuration = 600;

let isPlaying = false;

let timerStarted = false;

const radius = 145;

const circumference = 2 * Math.PI * radius;

progressCircle.style.strokeDasharray = circumference;

progressCircle.style.strokeDashoffset = circumference;

audio.volume = 0.5;

const formatTime = (seconds) => {

const mins = Math.floor(seconds / 60);

const secs = Math.floor(seconds % 60);

return `${mins}:${secs < 10 ? "0" : ""}${secs}`;

};

timeDisplay.textContent = formatTime(fakeDuration);

const playMeditation = async () => {

try{

await audio.play();

video.play();

isPlaying = true;

timerStarted = true;

playIcon.classList.remove("fa-play");

playIcon.classList.add("fa-pause");

document.body.classList.add("playing-mode");

}
catch(error){

console.log(error);

}

};

const pauseMeditation = () => {

audio.pause();

video.pause();

isPlaying = false;

playIcon.classList.remove("fa-pause");

playIcon.classList.add("fa-play");

document.body.classList.remove("playing-mode");

};

playButton.addEventListener("click", () => {

if(isPlaying){

pauseMeditation();

}
else{

playMeditation();

}

});

startButton.addEventListener("click", () => {

window.scrollTo({

top:0,

behavior:"smooth"

});

if(isPlaying){

pauseMeditation();

}
else{

playMeditation();

}

});

timerButtons.forEach((button) => {

button.addEventListener("click", () => {

timerButtons.forEach((btn) => {

btn.classList.remove("active-timer");

});

button.classList.add("active-timer");

fakeDuration = Number(button.dataset.time);

audio.currentTime = 0;

timeDisplay.textContent = formatTime(fakeDuration);

progressCircle.style.strokeDashoffset = circumference;

});

});

soundCards.forEach((card,index) => {

card.addEventListener("click", async () => {

soundCards.forEach((item) => {

item.classList.remove("active-sound");

});

card.classList.add("active-sound");

const sound = card.dataset.sound;

const bgVideo = card.dataset.video;

audio.pause();

video.pause();

audio.src = sound;

video.src = bgVideo;

audio.load();

video.load();

const titles = [

"Rain Forest Relaxation",

"Ocean Healing Waves",

"Warm Fireplace Therapy"

];

const sessions = [

"Deep Relax Session",

"Ocean Healing Session",

"Warm Peace Session"

];

musicName.textContent = titles[index];

sessionTitle.textContent = sessions[index];

audio.currentTime = 0;

timeDisplay.textContent = formatTime(fakeDuration);

progressCircle.style.strokeDashoffset = circumference;

if(isPlaying){

setTimeout(async () => {

await audio.play();

video.play();

},300);

}

});

});

volumeSlider.addEventListener("input",(e)=>{

audio.volume = e.target.value;

});

audio.addEventListener("timeupdate", () => {

const currentTime = audio.currentTime;

const elapsed = fakeDuration - currentTime;

if(elapsed >= 0){

timeDisplay.textContent = formatTime(elapsed);

}

const progress =
circumference -
(currentTime / fakeDuration) * circumference;

progressCircle.style.strokeDashoffset = progress;

if(currentTime >= fakeDuration){

pauseMeditation();

audio.currentTime = 0;

timeDisplay.textContent = formatTime(fakeDuration);

progressCircle.style.strokeDashoffset = circumference;

showCompletionPopup();

}

});

const showCompletionPopup = () => {

const popup = document.createElement("div");

popup.className = "completion-popup";

popup.innerHTML = `

<div class="popup-card">

<div class="popup-glow"></div>

<div class="popup-icon">

✨

</div>

<h1>

Meditation Completed

</h1>

<p>

You completed your peaceful meditation session successfully.
Relax your mind and continue your calm healing journey.

</p>

<button class="popup-close">

Continue Journey

</button>

</div>

`;

document.body.appendChild(popup);

setTimeout(() => {

popup.classList.add("show-popup");

},100);

popup
.querySelector(".popup-close")
.addEventListener("click", () => {

popup.classList.remove("show-popup");

setTimeout(() => {

popup.remove();

},400);

});

};

const floatingQuotes = [

"Peace begins with silence.",

"Relax your body and free your mind.",

"Breathe deeply. Live calmly.",

"Stillness creates clarity.",

"Inner peace starts within.",

"Mindfulness changes everything.",

"Relax your thoughts.",

"Silence heals the soul.",

"Calm energy creates beautiful life.",

"Meditation heals the heart."

];

let quoteIndex = 0;

const rotateQuotes = () => {

quoteBox.style.opacity = "0";

setTimeout(() => {

quoteBox.textContent = floatingQuotes[quoteIndex];

quoteBox.style.opacity = "1";

quoteIndex++;

if(quoteIndex >= floatingQuotes.length){

quoteIndex = 0;

}

},400);

};

setInterval(rotateQuotes,5000);

navButton.addEventListener("click", () => {

window.scrollTo({

top:0,

behavior:"smooth"

});

});

exploreButton.addEventListener("click", () => {

document.querySelector(".sound-options")
.scrollIntoView({

behavior:"smooth"

});

});

mobileMenu.addEventListener("click", () => {

navMenu.classList.toggle("show-mobile-menu");

});

const particlesContainer = document.createElement("div");

particlesContainer.className = "particles-container";

document.body.appendChild(particlesContainer);

for(let i = 0; i < 70; i++){

const particle = document.createElement("span");

particle.className = "particle";

particle.style.left = Math.random() * 100 + "vw";

particle.style.animationDuration =
Math.random() * 10 + 12 + "s";

particle.style.animationDelay =
Math.random() * 5 + "s";

particle.style.width =
Math.random() * 6 + 2 + "px";

particle.style.height = particle.style.width;

particlesContainer.appendChild(particle);

}

const dynamicStyles = document.createElement("style");

dynamicStyles.innerHTML = `

.playing-mode .circle-animation{
animation-duration:3s;
}

.completion-popup{
position:fixed;
inset:0;
background:rgba(0,0,0,0.72);
backdrop-filter:blur(10px);
display:flex;
justify-content:center;
align-items:center;
z-index:99999;
opacity:0;
visibility:hidden;
transition:0.4s;
}

.show-popup{
opacity:1;
visibility:visible;
}

.popup-card{
width:90%;
max-width:520px;
padding:55px;
border-radius:40px;
background:
linear-gradient(
135deg,
rgba(15,23,42,0.96),
rgba(30,41,59,0.95)
);
border:1px solid rgba(255,255,255,0.08);
position:relative;
overflow:hidden;
text-align:center;
}

.popup-glow{
position:absolute;
width:260px;
height:260px;
background:#00d4ff;
filter:blur(140px);
top:-120px;
right:-120px;
opacity:0.25;
}

.popup-icon{
width:90px;
height:90px;
border-radius:50%;
background:
linear-gradient(
135deg,
#6d5dfc,
#00d4ff
);
display:flex;
justify-content:center;
align-items:center;
font-size:38px;
margin:auto;
margin-bottom:28px;
position:relative;
z-index:5;
box-shadow:
0 15px 40px rgba(0,212,255,0.35);
}

.popup-card h1{
font-size:42px;
margin-bottom:20px;
position:relative;
z-index:5;
}

.popup-card p{
font-size:17px;
line-height:1.9;
color:rgba(255,255,255,0.7);
margin-bottom:35px;
position:relative;
z-index:5;
}

.popup-close{
padding:18px 38px;
border:none;
border-radius:60px;
background:
linear-gradient(
135deg,
#6d5dfc,
#00d4ff
);
color:white;
font-size:16px;
font-weight:600;
cursor:pointer;
transition:0.4s;
position:relative;
z-index:5;
}

.popup-close:hover{
transform:translateY(-5px);
box-shadow:
0 15px 45px rgba(0,212,255,0.35);
}

.particles-container{
position:fixed;
inset:0;
pointer-events:none;
overflow:hidden;
z-index:-2;
}

.particle{
position:absolute;
bottom:-20px;
background:rgba(255,255,255,0.35);
border-radius:50%;
animation:particleFloat linear infinite;
filter:blur(1px);
}

@keyframes particleFloat{

0%{
transform:
translateY(0)
translateX(0);
opacity:0;
}

20%{
opacity:1;
}

100%{
transform:
translateY(-120vh)
translateX(100px);
opacity:0;
}

}

.show-mobile-menu{
position:absolute;
top:95px;
left:0;
width:100%;
padding:30px;
background:rgba(2,6,23,0.96);
display:flex !important;
flex-direction:column;
gap:25px;
backdrop-filter:blur(20px);
border-bottom:1px solid rgba(255,255,255,0.06);
}

.cursor-glow{
position:fixed;
width:320px;
height:320px;
border-radius:50%;
background:
radial-gradient(
circle,
rgba(0,212,255,0.16),
transparent 70%
);
pointer-events:none;
transform:translate(-50%,-50%);
z-index:-1;
filter:blur(20px);
transition:
left 0.08s linear,
top 0.08s linear;
}

@media(max-width:700px){

.popup-card{
padding:35px 25px;
}

.popup-card h1{
font-size:30px;
}

.popup-card p{
font-size:15px;
}

}

`;

document.head.appendChild(dynamicStyles);

document.addEventListener("keydown",(e)=>{

if(e.code === "Space"){

e.preventDefault();

if(isPlaying){

pauseMeditation();

}
else{

playMeditation();

}

}

});

window.addEventListener("load",()=>{

timeDisplay.textContent = formatTime(fakeDuration);

});

window.addEventListener("scroll",()=>{

const navbar = document.querySelector(".main-header");

if(window.scrollY > 50){

navbar.style.background =
"rgba(2,6,23,0.85)";

navbar.style.backdropFilter =
"blur(25px)";

}
else{

navbar.style.background =
"rgba(255,255,255,0.03)";

}

});

const stats = document.querySelectorAll(".stat-box h2");

stats.forEach((stat)=>{

const original = stat.textContent;

let count = 0;

const target = parseFloat(original);

const increment = target / 80;

const counter = setInterval(()=>{

count += increment;

if(count >= target){

stat.textContent = original;

clearInterval(counter);

}
else{

if(original.includes("K")){

stat.textContent =
Math.floor(count) + "K+";

}
else if(original.includes("★")){

stat.textContent =
count.toFixed(1) + "★";

}
else{

stat.textContent =
Math.floor(count) + "+";

}

}

},20);

});

audio.addEventListener("ended",()=>{

pauseMeditation();

});

const cursorGlow = document.createElement("div");

cursorGlow.className = "cursor-glow";

document.body.appendChild(cursorGlow);

document.addEventListener("mousemove",(e)=>{

cursorGlow.style.left = e.clientX + "px";

cursorGlow.style.top = e.clientY + "px";

});