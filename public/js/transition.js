import Highway from '@dogstudio/highway'
import { TimelineLite } from 'gsap'
import { gsap } from 'gsap'

gsap.config({ nullTargetWarn: false })

export const waves = function () {
  // Hand animation that waves once the document is loaded.
  const wave = document.querySelector('.wave')
  setTimeout(letsWave, 3000)
  setInterval(() => {
    letsWave()
  }, 20000)
  const removeRotate = () => wave.classList.remove('rotate-12')

  function letsWave() {
    wave.classList.add('rotate-12')
    setTimeout(removeRotate, 300)
  }
}

export const changeText = function () {
  // Hand animation that waves once the document is loaded.
  let contentArray = [
    'Filip Moltzer',
    'a developer',
    'a computer scientist',
    'a tech-head',
    'a pizza enthusiast',
    'a front-end developer',
    'Filip Moltzer',
  ]

  let counter = 0

  const introText = document.querySelector('#introContent')
  setInterval(function () {
    if (counter > 6) {
      clearInterval(ID)
    } else {
      ;(introText.innerHTML = contentArray[counter]), (counter = counter + 1)
    }
  }, 2500)
}

export const top = function () {
  // Scrolls back to navigation top
  document.body.scrollTop = 0
  document.documentElement.scrollTop = 0
}

const addKeys = function () {
  // Animation that slides in the projects name when loaded.
  setTimeout(function () {
    const replacers = document.querySelectorAll('[data-replace]')
    for (let i = 0; i < replacers.length; i++) {
      let replaceClasses = JSON.parse(
        replacers[i].dataset.replace.replace(/'/g, '"')
      )
      Object.keys(replaceClasses).forEach(function (key) {
        replacers[i].classList.remove(key)
        replacers[i].classList.add(replaceClasses[key])
      })
    }
  }, 1)
}

const showProjects = function () {
  // Displays all projects with .show in classlist,
  // Transforms every other project into a slightly hortisonally displaced position with tailwind classes.
  const projectList = document.querySelectorAll('.show')
  console.log(projectList)
  for (let i = 0; i < projectList.length; i++) {
    projectList[i].classList.add('block', 'sm:flex')
    projectList[i].classList.remove('sm:hidden', 'hidden')
    if (i % 2 > 0) {
      projectList[i].classList.add('sm:-translate-x-36')
    } else {
      projectList[i].classList.add('sm:translate-x-36')
    }
  }
}

let firstVisit = true
const resetSort = function () {
  // Resets to default value, or displays all projects if firstVisit

  const project = document.querySelectorAll('.project')

  //hide all projects
  for (let i = 0; i < project.length; i++) {
    project[i].classList.add('sm:hidden', 'hidden')
    project[i].classList.remove('sm:-translate-x-36', 'sm:translate-x-36')
    project[i].classList.remove('show')
  }

  //Display all (if firstvisit)
  if (firstVisit == true) {
    for (let i = 0; i < project.length; i++) {
      project[i].classList.add('show')
    }
    firstVisit = false
    showProjects()
  }
}

const sort = function (type) {
  // Adds the .show class to all projects that matches the language value of "type".

  if (type == 'all') {
    firstVisit = true
    resetSort()
  } else {
    resetSort()
    const langs = document.querySelectorAll('.lang-used')
    for (let i = 0; i < langs.length; i++) {
      const children = langs[i].childElementCount

      for (let x = 0; x < children; x++) {
        if (langs[i].children[x].nodeName == 'DIV') {
          switch (type) {
            case langs[i].children[x].firstElementChild.alt:
              let projectContainer =
                langs[i].children[x].parentElement.parentElement.parentElement
              projectContainer.classList.add('show')
              break
            default:
              break
          }
        }
      }
    }
  }
  showProjects()
}

const addListener = function () {
  firstVisit = true
  resetSort()

  const js = document.querySelector('#javascript')
  const py = document.querySelector('#python')
  const all = document.querySelector('#all')

  all.addEventListener('click', function () {
    addActive(this)
    sort('all')
  })
  js.addEventListener('click', function () {
    addActive(this)
    sort('js')
  })
  py.addEventListener('click', function () {
    addActive(this)
    sort('python')
  })
}

const addActive = function (lang) {
  let active = document.querySelector('.active')
  active.classList.remove('active', 'bg-purple-200', 'text-gray-800')
  lang.classList.add('active', 'bg-purple-200', 'text-gray-800')
}

export function checkDarkMode() {
  // Func should be called when darkmode is toggled. add eventlistener.
  let html = document.querySelector('#html').classList
  let svg = document.getElementsByClassName('dark:gray-svg')

  if (html.contains('dark')) {
    for (let i = 0; i < svg.length; i++) {
      svg[i].style.fill = 'rgba(209, 213, 219'
    }
  } else {
    for (let i = 0; i < svg.length; i++) {
      svg[i].style.fill = 'black'
    }
  }
}

class Fade extends Highway.Transition {
  // Animation to change between subpages without reloading the doc, also includes an added animation transition.
  in({ from, to, done }) {
    const tl = new TimelineLite()
    tl.fromTo(to, 0.5, { left: '0%', top: '-100%' }, { top: '5rem' })
      .fromTo(
        to,
        0.5,
        { height: '0vh' },
        {
          height: '90vh',
          top: '5rem',
          onComplete: function () {
            // Runs the right animations on the right page.
            if (to.classList.contains('home')) {
              document.querySelector('#html').classList.add('overflow-hidden')
              setTimeout(changeText(), 3000)
              addKeys()
              document
                .querySelector('#nav-underline')
                .classList.remove(
                  'margin-contact',
                  'margin-about',
                  'margin-skills',
                  'margin-projects'
                )
              document
                .querySelector('#nav-underline')
                .classList.add('margin-about')
              waves()
            }
            if (to.classList.contains('projects')) {
              document
                .querySelector('#html')
                .classList.remove('overflow-hidden')
              addKeys()
              document
                .querySelector('#nav-underline')
                .classList.remove(
                  'margin-contact',
                  'margin-about',
                  'margin-skills',
                  'margin-projects'
                )
              document
                .querySelector('#nav-underline')
                .classList.add('margin-projects')
              addListener()
              checkDarkMode()
            }
            if (to.classList.contains('skills')) {
              addKeys()
              document
                .querySelector('#nav-underline')
                .classList.remove(
                  'margin-contact',
                  'margin-about',
                  'margin-skills',
                  'margin-projects'
                )
              document
                .querySelector('#nav-underline')
                .classList.add('margin-skills')
              checkDarkMode()
            }
            if (to.classList.contains('contact')) {
              addKeys()
              document
                .querySelector('#nav-underline')
                .classList.remove(
                  'margin-contact',
                  'margin-about',
                  'margin-skills',
                  'margin-projects'
                )
              document
                .querySelector('#nav-underline')
                .classList.add('margin-contact')
              checkDarkMode()
            }

            //Scroll to top as default for each page
            top()

            from.remove()
            done()
          },
        }
      )
      .fromTo(to.children[0], 2, { opacity: 0 }, { opacity: 1 })
      .fromTo(to.children[1], 2, { opacity: 0 }, { opacity: 1 })
  }
  out({ from, done }) {
    done()
  }
}

export default Fade
