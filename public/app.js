
// Hambuger menu Functions
var hambugerIcon = document.querySelector("#hambugerIcon");
hambugerIcon.addEventListener("click", showMenu, false);

var flyoutMenu = document.querySelector("#flyoutMenu");
flyoutMenu.addEventListener("click", hideMenu, false);

var container = document.querySelector("#container");

function showMenu(e) {
    flyoutMenu.classList.remove("translate-x-full");
    container.style.display = "none";

    console.log("Hej")
    document.body.style.overflow = "hidden";

}

function hideMenu(e) {
    flyoutMenu.classList.add("translate-x-full");
    container.style.display = "flex";
    e.stopPropagation();

    document.body.style.overflow = "auto";
}   