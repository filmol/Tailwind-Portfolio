import Highway from '@dogstudio/highway';
import {TimelineLite} from 'gsap';

export const addBar = function(){
    // Animates and fills up the university progress bar gradually.
    let progress = 0;
    const graduationDay = new Date("June 30, 2022")
    const msPerDay = 24 * 60 * 60 * 1000 ; // amount of milliseconds/day
    let daysLeft = (graduationDay.getTime() - new Date().getTime()) / msPerDay;
    daysLeft = Math.round(daysLeft);
    let completed = ((1060-daysLeft)/1060)*100
    completed = completed.toFixed(0)

    const bar = document.getElementById('bar');
    let progressInterval = setInterval(function(){
        progress += 0.4;
        bar.style.width = progress + "%";
        if(progress >= completed){
            clearInterval(progressInterval);
        }
    }, 8);
}

export const waves = function(){
    // Hand animation that waves once the document is loaded.
    const wave = document.querySelector(".wave");
    setTimeout(letsWave,3000)
   
    const removeRotate = () => wave.classList.remove("rotate-12");

    function letsWave() {
    wave.classList.add("rotate-12");
        setTimeout(removeRotate,300)
    }}

export const top = function () {
        // Scrolls back to navigation top
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }

const addKeys = function(){
    // Animation that slides in the projects name when loaded.
    setTimeout(function(){
        const replacers = document.querySelectorAll('[data-replace]');
        for(let i=0; i<replacers.length; i++){
            console.log('data replaced');
            let replaceClasses = JSON.parse(replacers[i].dataset.replace.replace(/'/g, '"'));
            Object.keys(replaceClasses).forEach(function(key) {
                replacers[i].classList.remove(key);
                replacers[i].classList.add(replaceClasses[key]);
            });
        }
    }, 1);
}

const removeUnderline = function(){
    document.querySelector(".aboutBtn").classList.remove("underline");
    document.querySelector(".skillsBtn").classList.remove("underline");
    document.querySelector(".projectsBtn").classList.remove("underline");
    document.querySelector(".contactBtn").classList.remove("underline");
}

class Fade extends Highway.Transition{
    // Animation to change between subpages without reloading the doc, also includes an added animation transition.
    in({from, to, done}){
    const tl = new TimelineLite();
    tl.fromTo(to, 0.5, {left:'0%', top: '-100%'}, {top:'5rem',})
    .fromTo( 
    to,
    0.5,
    {height:'0vh'},
    {height:'90vh', top:'5rem', 
    onComplete: function(){
        if (to.classList.contains("home")) {
            setTimeout(addBar,3000)
            addKeys();
            removeUnderline();
            document.querySelector(".aboutBtn").classList.add("underline");           
            waves();
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
            addKeys();
            removeUnderline();
            document.querySelector(".contactBtn").classList.add("underline");
        }
        
        //Scroll to top as default for each page
        top();

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