import Highway from '@dogstudio/highway';
import Fade from './transition';

const H = new Highway.Core({
    transitions: {
        default: Fade
    }
});

// Hambuger menu NEW
var mobileBtn = document.querySelector("#mobileBtn");
mobileBtn.addEventListener("click", showMenu, false);
var blurContent = document.querySelector(".blur-content");
var navList = document.querySelector(".nav-list");
var navWidth = document.querySelector("#nav-width");
var mobileMenu = document.querySelector("#mobileMenu");
mobileMenu.addEventListener("click", hideMenu, false);

// Scroll to Top
var TopBtn = document.querySelector("#top-function");
TopBtn.addEventListener("click", topFunction);


function showMenu(e) {
    navList.classList.add("h-96")
    blurContent.classList.add("blur")
    navWidth.classList.remove("w-3/4")
    mobileMenu.classList.remove("hidden")
}

function hideMenu(e) {
    navList.classList.remove("h-96")
    navWidth.classList.add("w-3/4")
    mobileMenu.classList.add("hidden")
    blurContent.classList.remove("blur")
    e.stopPropagation();
}   


let addBar = function(){
    let progress = 0;
    let invervalSpeed = 1;
    let incrementSpeed = 0.4;
    let todaysDate = new Date()
    let graduationDay = new Date("June 30, 2022")
    let msPerDay = 24 * 60 * 60 * 1000 ; // Number of milliseconds per day
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

    // document.getElementById("grad").innerHTML += "University studies completed: " + completed + "%"
}

let addProject = function(){
    setTimeout(function(){
        var replacers = document.querySelectorAll('[data-replace]');
        for(var i=0; i<replacers.length; i++){
            console.log('hit here2');
            let replaceClasses = JSON.parse(replacers[i].dataset.replace.replace(/'/g, '"'));
            Object.keys(replaceClasses).forEach(function(key) {
                replacers[i].classList.remove(key);
                replacers[i].classList.add(replaceClasses[key]);
            });
        }
    }, 1);
};


let waves = function(){
    let wave = document.querySelector(".wave");
    setTimeout(letsWave,3000)
    
    function removeRotate() {
        wave.classList.remove("rotate-12");
    } 
    function letsWave() {
        wave.classList.add("rotate-12");
        setTimeout(removeRotate,300)
    }}
    
    document.addEventListener("DOMContentLoaded", function(){
        addBar();  
        addProject();
        waves();
    });

let topFunction = function() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}