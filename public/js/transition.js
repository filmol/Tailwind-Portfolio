import Highway from '@dogstudio/highway';
import {TimelineLite} from 'gsap';

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

let addKeys = function(){
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

let removeUnderline = function(){
    document.querySelector(".aboutBtn").classList.remove("underline");
    document.querySelector(".skillsBtn").classList.remove("underline");
    document.querySelector(".projectsBtn").classList.remove("underline");
    document.querySelector(".contactBtn").classList.remove("underline");
}

class Fade extends Highway.Transition{
    in({from, to, done}){
    const tl = new TimelineLite();
    tl.fromTo(to, 0.5, {left:'0%', top: '-100%'}, {top:'10%',})
    .fromTo( 
    to,
    0.5,
    {height:'0vh'},
    {height:'90vh', top:'10%', 
    onComplete: function(){
        console.log(to)
        console.log(to.classList)
       if (to.classList.contains("home")) {
            addBar();
            addKeys();
            removeUnderline();
            document.querySelector(".aboutBtn").classList.add("underline");
            
            // Wave func
            let wave = document.querySelector(".wave");
            setTimeout(letsWave,3000)

            function removeRotate() {
                wave.classList.remove("rotate-12");
            } 
            function letsWave() {
                wave.classList.add("rotate-12");
                setTimeout(removeRotate,300)
            }
        } 
       if (to.classList.contains("projects")) {
            addKeys();
            removeUnderline();
            document.querySelector(".projectsBtn").classList.add("underline");
        } 
       if (to.classList.contains("skills")) {
            addKeys();
            removeUnderline();
            document.querySelector(".skillsBtn").classList.add("underline");
        }        
        if (to.classList.contains("contact")) {
            removeUnderline();  
            document.querySelector(".contactBtn").classList.add("underline");
        } 

       from.remove();
       done(); 
    }}
    )
    .fromTo(to.children[0], 2, {opacity: 0},{opacity: 1})
    .fromTo(to.children[1], 2, {opacity: 0},{opacity: 1})
    }
    out({from,done}){
        done();
    }
}



export default Fade;