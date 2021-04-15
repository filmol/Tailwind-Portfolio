import Highway from '@dogstudio/highway';
import {TimelineLite} from 'gsap';
import {gsap} from 'gsap';

gsap.config({nullTargetWarn: false});

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
const showProjects = function() {
    // Displays all projects with .show in classlist,
    // Transforms every other project into a slightly hortisonally displaced position with tailwind classes.
    const projectList = document.querySelectorAll(".show");
    for (let i = 0; i < projectList.length; i++) {
        projectList[i].classList.add("block", "sm:flex"); 
        projectList[i].classList.remove("sm:hidden", "hidden");
        if (i%2>0) {
            projectList[i].classList.add("sm:-translate-x-36");
        }
        else {                 
            projectList[i].classList.add("sm:translate-x-36");
        }
    }
}

let firstVisit = true
const resetSort = function() {
    // Resets to default value, or displays all projects if firstVisit
   
    const project = document.querySelectorAll(".project");
    
    //hide all projects
    for (let i = 0; i < project.length; i++) {
        project[i].classList.add("sm:hidden", "hidden");
        project[i].classList.remove("sm:-translate-x-36","sm:translate-x-36");
        project[i].classList.remove("show");
    }

    //Display all (if firstvisit)
    if (firstVisit == true) {
        for (let i = 0; i < project.length; i++) {
            project[i].classList.add("show");
        }
        firstVisit = false;
        showProjects();
    }
} 

const sort = function(type) {
    // Adds the .show class to all projects that matches the language value of "type".

    if (type == "all") {
        firstVisit = true;
        resetSort();
    }

    else {
        resetSort();
        const langs = document.querySelectorAll(".lang-used");
        for (let i = 0; i < langs.length; i++) {

            const children = langs[i].childElementCount;

            for (let x = 0; x < children; x++) {

                if (langs[i].children[x].nodeName == "DIV") {
                    switch(type) {
                        case langs[i].children[x].firstChild.alt:
                            let projectContainer = langs[i].children[x].parentElement.parentElement.parentElement;
                            projectContainer.classList.add("show"); 
                            break;
                        default:
                            break;
                    }
                }
            }          
        }
    }
    showProjects();
}

const addListener = function() {
    firstVisit = true;
    resetSort();

    const js = document.querySelector("#javascript");
    const sql = document.querySelector("#sql");
    const py = document.querySelector("#python");
    const all = document.querySelector("#all");

    all.addEventListener('click', function () {
        addActive(this);
        sort("all");
    })
    js.addEventListener('click', function () {
        addActive(this);
        sort("js");
    })
    sql.addEventListener('click', function () {
        addActive(this);
        sort("sql");
    })
    py.addEventListener('click', function () {
        addActive(this);
        sort("python");
    })
}

function addActive(lang) {
    let active = document.querySelector(".active");
    active.classList.remove("active", "bg-purple-200");
    lang.classList.add("active", "bg-purple-200");
};

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
        // Runs the right animations on the right page.
        if (to.classList.contains("home")) {
            setTimeout(addBar,3000)
            addKeys();
            document.querySelector("#nav-underline").classList.remove("margin-contact","margin-about","margin-skills", "margin-projects");           
            document.querySelector("#nav-underline").classList.add("margin-about");           
            waves();
        } 
        if (to.classList.contains("projects")) {
            addKeys();
            document.querySelector("#nav-underline").classList.remove("margin-contact","margin-about","margin-skills", "margin-projects");           
            document.querySelector("#nav-underline").classList.add("margin-projects");
            addListener();
            } 
        if (to.classList.contains("skills")) {
            addKeys();
            document.querySelector("#nav-underline").classList.remove("margin-contact","margin-about","margin-skills", "margin-projects");           
            document.querySelector("#nav-underline").classList.add("margin-skills");
            } 
        if (to.classList.contains("contact")) {
            addKeys();
            document.querySelector("#nav-underline").classList.remove("margin-contact","margin-about","margin-skills", "margin-projects");           
            document.querySelector("#nav-underline").classList.add("margin-contact");
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