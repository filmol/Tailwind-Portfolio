import Highway from '@dogstudio/highway'
import Fade from './transition'
import { changeText } from './transition'
import { waves } from './transition'
import { top } from './transition'
import { checkDarkMode } from './transition'

const H = new Highway.Core({
  transitions: {
    default: Fade,
  },
})

// Variabels and functions for mobile menu
const mobileBtn = document.querySelector('#mobile-btn')
mobileBtn.addEventListener('click', showMenu, false)
const topBtn = document.querySelector('#top-function')
topBtn.addEventListener('click', top, false)
const blurContent = document.querySelector('.blur-content')
const mainContent = document.querySelector('#main-container')
const navList = document.querySelector('.nav-list')
const navWidth = document.querySelector('#nav-width')
const mobileMenu = document.querySelector('#mobile-menu')
mobileMenu.addEventListener('click', hideMenu, false)
mobileMenu.addEventListener('click', showCard)

function showCard() {
  const stukkort = document.querySelector('#stukkort')
  stukkort.classList.toggle('hidden')
}

const stuk1 = document.querySelector('#stuk1')
const stuk2 = document.querySelector('#stuk2')
stuk1.addEventListener('click', flipCard)
stuk2.addEventListener('click', flipCard)
const closeCard = document.querySelector('#closeCard')
closeCard.addEventListener('click', showCard)
closeCard.addEventListener('click', hideMenu)

function flipCard() {
  stuk1.classList.toggle('hidden')
  stuk2.classList.toggle('hidden')
}

function showMenu(e) {
  navList.classList.add('h-96', 'absolute')
  blurContent.classList.add('blur')
  navWidth.classList.remove('w-3/4')
  mobileMenu.classList.remove('hidden')
  mainContent.classList.add('relative')
}

function hideMenu(e) {
  navList.classList.remove('h-96', 'absolute')
  navWidth.classList.add('w-3/4')
  mobileMenu.classList.add('hidden')
  blurContent.classList.remove('blur')
  mainContent.classList.remove('relative')
  e.stopPropagation()
}

document.addEventListener('scroll', function (e) {
  //Displays top-arrow if scroll is below 300.
  window.scrollY > 300
    ? topBtn.classList.remove('hidden')
    : topBtn.classList.add('hidden')
})

let darkModeBtn = document.querySelector('#toggleB')
darkModeBtn.addEventListener('click', function (e) {
  let html = document.querySelector('#html')
  if (darkModeBtn.checked) {
    html.classList.add('dark')
    checkDarkMode()
  } else {
    html.classList.remove('dark')
    checkDarkMode()
  }
})

//Displays progress bar and waves when content is loaded.
document.addEventListener('DOMContentLoaded', () => changeText(), waves())
