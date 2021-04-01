import Highway from '@dogstudio/highway';
import Fade from './transition';

const H = new Highway.Core({
    transitions: {
        default: Fade
    }
});

// Hambuger menu variabels & EventListeners
var mobileBtn = document.querySelector("#mobileBtn");
mobileBtn.addEventListener("click", showMenu, false);
var topBtn = document.querySelector("#top-function");
topBtn.addEventListener("click", TOP, false);
var blurContent = document.querySelector(".blur-content");
var mainContent = document.querySelector("#main-container");
var navList = document.querySelector(".nav-list");
var navWidth = document.querySelector("#nav-width");
var mobileMenu = document.querySelector("#mobileMenu");
mobileMenu.addEventListener("click", hideMenu, false);

function showMenu(e) {
    navList.classList.add("h-96")
    navList.classList.add("absolute")
    blurContent.classList.add("blur")
    navWidth.classList.remove("w-3/4")
    mobileMenu.classList.remove("hidden")
    mainContent.classList.add("relative")
}

function hideMenu(e) {
    navList.classList.remove("h-96")
    navList.classList.remove("absolute")
    navWidth.classList.add("w-3/4")
    mobileMenu.classList.add("hidden")
    blurContent.classList.remove("blur")
    mainContent.classList.remove("relative")
    e.stopPropagation();
}   

let addBar = function(){
    // Animates and fills up the university progress bar gradually.
    let progress = 0;
    let invervalSpeed = 1;
    let incrementSpeed = 0.4;
    let todaysDate = new Date()
    let graduationDay = new Date("June 30, 2022")
    let msPerDay = 24 * 60 * 60 * 1000 ; // amount of milliseconds/day
    let daysLeft = (graduationDay.getTime() - todaysDate.getTime()) / msPerDay;
    daysLeft = Math.round(daysLeft);
    let completed = ((1060-daysLeft)/1060)*100
    completed = completed.toFixed(0)

    let bar = document.getElementById('bar');
    let progressInterval = setInterval(function(){
        progress += incrementSpeed;
        bar.style.width = progress + "%";
        if(progress >= completed){
            clearInterval(progressInterval);
        }
    }, invervalSpeed);
}

let waves = function(){
    // Hand animation that waves once the document is loaded.
    let wave = document.querySelector(".wave");
    setTimeout(letsWave,3000)
    
    function removeRotate() {
        wave.classList.remove("rotate-12");
    } 

    function letsWave() {
        wave.classList.add("rotate-12");
        setTimeout(removeRotate,300)
    }}

function TOP() {
    // Scrolls back to navigation top
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

document.addEventListener('scroll', function(e) {
    //Shows top-arrow if scroll is below 300.
    if (window.scrollY > 300) {
        topBtn.classList.remove("hidden")
    }
    else {
        topBtn.classList.add("hidden")
    }
})
    
document.addEventListener("DOMContentLoaded", function(){
    addBar();  
    waves();
});