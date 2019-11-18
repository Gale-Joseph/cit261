// Code for Safari 3.1 to 6.0
document.getElementById("transitionBox").addEventListener("webkitTransitionEnd", tFunction);

// Standard syntax
document.getElementById("transitionBox").addEventListener("transitionend", tFunction);

function tFunction() {
  this.innerHTML = "transitionend event occured - The transition has completed";
  this.style.backgroundColor = "pink";
}