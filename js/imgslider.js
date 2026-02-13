document.addEventListener("DOMContentLoaded", initSlider, true);

var slideIndex = 1;
var isAnimating = false;

function initSlider() {
  var x = document.getElementsByClassName("mySlides");
  if (x.length === 0) return;
  
  showDivs(slideIndex);
}

function plusDivs(n) {
  if (isAnimating) return;
  showDivs(slideIndex += n);
}

function currentDiv(n) {
  if (isAnimating) return;
  showDivs(slideIndex = n);
}

function showDivs(n) {
  var i;
  var x = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("demo");
  
  if (x.length === 0) return;
  
  if (n > x.length) { slideIndex = 1; }
  if (n < 1) { slideIndex = x.length; }
  
  isAnimating = true;
  
  for (i = 0; i < x.length; i++) {
    x[i].style.opacity = "0";
    x[i].style.position = "absolute";
    x[i].style.top = "0";
    x[i].style.left = "0";
    x[i].style.width = "100%";
    x[i].style.display = "block";
  }
  
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" w3-white", "");
  }
  
  if (x[slideIndex - 1]) {
    x[slideIndex - 1].style.opacity = "1";
    x[slideIndex - 1].style.position = "relative";
  }
  
  if (dots[slideIndex - 1]) {
    dots[slideIndex - 1].className += " w3-white";
  }
  
  setTimeout(function() {
    isAnimating = false;
  }, 500);
}
