document.addEventListener("DOMContentLoaded", conf, true);

var slideIndex1 = 1;
var slideIndex2 = 1;
var slideIndex3 = 1;
var isAnimating = { 1: false, 2: false, 3: false };

function conf() {
  initSlider(1);
  initSlider(2);
  initSlider(3);
}

function initSlider(id) {
  var ss = "mySlides" + id;
  var ds = "demo" + id;
  var x = document.getElementsByClassName(ss);
  var dots = document.getElementsByClassName(ds);
  
  if (x.length === 0) return;
  
  for (var i = 0; i < x.length; i++) {
    x[i].style.transition = "opacity 0.5s ease-in-out";
    x[i].style.position = "absolute";
    x[i].style.top = "0";
    x[i].style.left = "0";
    x[i].style.width = "100%";
    x[i].style.opacity = "0";
    x[i].style.display = "block";
  }
  
  if (x[0]) {
    x[0].style.position = "relative";
    x[0].style.opacity = "1";
  }
  
  if (dots[0]) {
    dots[0].className += " w3-white";
  }
}

function plusDivs(n, id) {
  if (isAnimating[id]) return;
  switch (id) {
    case 1: showDivs(slideIndex1 += n, id, slideIndex1); break;
    case 2: showDivs(slideIndex2 += n, id, slideIndex2); break;
    case 3: showDivs(slideIndex3 += n, id, slideIndex3); break;
  }
}

function currentDiv(n, id) {
  if (isAnimating[id]) return;
  switch (id) {
    case 1: showDivs(slideIndex1 = n, id, slideIndex1); break;
    case 2: showDivs(slideIndex2 = n, id, slideIndex2); break;
    case 3: showDivs(slideIndex3 = n, id, slideIndex3); break;
  }
}

function showDivs(n, id, si) {
  var i;
  var ss = "mySlides" + id;
  var ds = "demo" + id;
  var x = document.getElementsByClassName(ss);
  var dots = document.getElementsByClassName(ds);
  
  if (x.length === 0) return;
  
  if (n > x.length) { si = 1; }
  if (n < 1) { si = x.length; }
  
  switch (id) {
    case 1: slideIndex1 = si; break;
    case 2: slideIndex2 = si; break;
    case 3: slideIndex3 = si; break;
  }
  
  isAnimating[id] = true;
  
  for (i = 0; i < x.length; i++) {
    x[i].style.opacity = "0";
    x[i].style.position = "absolute";
  }
  
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" w3-white", "");
  }
  
  if (x[si - 1]) {
    x[si - 1].style.opacity = "1";
    x[si - 1].style.position = "relative";
  }
  
  if (dots[si - 1]) {
    dots[si - 1].className += " w3-white";
  }
  
  setTimeout(function() {
    isAnimating[id] = false;
  }, 500);
}