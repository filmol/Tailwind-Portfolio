import Highway from '@dogstudio/highway';
import Fade from './transition';
import { addBar } from './transition';
import { waves } from './transition';
import { top } from './transition';
import { checkDarkMode } from './transition';
import axios from "axios";

const H = new Highway.Core({
    transitions: {
        default: Fade
    }
});

// Variabels and functions for mobile menu
const mobileBtn = document.querySelector("#mobile-btn");
mobileBtn.addEventListener("click", showMenu, false);
const topBtn = document.querySelector("#top-function");
topBtn.addEventListener("click", top, false);
const blurContent = document.querySelector(".blur-content");
const mainContent = document.querySelector("#main-container");
const navList = document.querySelector(".nav-list");
const navWidth = document.querySelector("#nav-width");
const mobileMenu = document.querySelector("#mobile-menu");
mobileMenu.addEventListener("click", hideMenu, false);

function showMenu(e) {
    navList.classList.add("h-96", "absolute")
    blurContent.classList.add("blur")
    navWidth.classList.remove("w-3/4")
    mobileMenu.classList.remove("hidden")
    mainContent.classList.add("relative")
}

function hideMenu(e) {
    navList.classList.remove("h-96", "absolute")
    navWidth.classList.add("w-3/4")
    mobileMenu.classList.add("hidden")
    blurContent.classList.remove("blur")
    mainContent.classList.remove("relative")
    e.stopPropagation();
}   

document.addEventListener('scroll', function(e) {
    //Displays top-arrow if scroll is below 300.
    window.scrollY > 300 ? topBtn.classList.remove("hidden") : topBtn.classList.add("hidden");
})

let darkModeBtn = document.querySelector("#toggleB")
darkModeBtn.addEventListener('click', function(e) {
    let html = document.querySelector("#html");
    if (darkModeBtn.checked) {
        html.classList.add("dark");
        checkDarkMode();
    }    
    else {
        html.classList.remove("dark");
        checkDarkMode();
    }
})


const ApiContainer = document.querySelector("#API-container");

const options = {
    method: 'GET',
    url: 'https://instagram47.p.rapidapi.com/user_posts',
    params: {username: 'filipmoltzer'},
    headers: {
      'x-rapidapi-key': '83323e95f4msh2d60f0bc908b61ep12f88cjsn1fee7db11e56',
      'x-rapidapi-host': 'instagram47.p.rapidapi.com'
    }
  };
  
  axios.request(options).then(function (response) {
      document.querySelector("#API-container").children[0].href = "https://www.instagram.com/p/"+response.data.body.items[0].code
      document.querySelector("#API-header").innerHTML=response.data.body.items[0].caption.text

      //   ApiContainer.
  }).catch(function (error) {
      console.error(error);
  });

//Displays progress bar and waves when content is loaded.
document.addEventListener("DOMContentLoaded", () => addBar(), waves());
