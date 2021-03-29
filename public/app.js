
// About page rendering
var aboutIcon = document.querySelector("#aboutIcon");
aboutIcon.addEventListener("click", showAbout, false);
aboutIcon.addEventListener("scroll", showAbout, false);

var aboutPage = document.querySelector("#aboutPage");

function showAbout(e) {
    var gray = document.querySelector("#gray");
    var lightGray = document.querySelector("#light-gray");

    setTimeout(addGray, 0)
    setTimeout(addLightGray, 200)
    setTimeout(addAbout, 400)

    function addGray() {
        gray.classList.remove("translate-y-full");
    }   
    function addLightGray() {
        lightGray.classList.remove("translate-y-full");
    }   
    function addAbout() {
        aboutPage.classList.remove("translate-y-full");
        container.style.display = "none";
        document.body.style.overflow = "hidden";
        console.log("Hej")
    }
}

setInterval(letsWave, 4000)
var wave = document.querySelector("#wave");

function removeRotate() {
    wave.classList.remove("rotate-12");
} 
function letsWave() {
    wave.classList.add("rotate-12");
    setTimeout(removeRotate,300)
}
