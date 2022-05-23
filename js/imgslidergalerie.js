document.addEventListener("DOMContentLoaded", conf, true);

var slideIndex1 = 1;
var slideIndex2 = 1;
var slideIndex3 = 1;

function conf() {
  showDivs(slideIndex1, 1, slideIndex1);
  showDivs(slideIndex2, 2, slideIndex2);
  showDivs(slideIndex3, 3, slideIndex3);
}

function plusDivs(n, id) {
  switch (id) {
    case 1: showDivs(slideIndex1 += n, id, slideIndex1); break;
    case 2: showDivs(slideIndex2 += n, id, slideIndex2); break;
    case 3: showDivs(slideIndex3 += n, id, slideIndex3); break;
  }
}

function currentDiv(n, id) {
  switch (id) {
    case 1: showDivs(slideIndex1 = n, id, slideIndex1); break;
    case 2: showDivs(slideIndex2 = n, id, slideIndex2); break;
    case 3: showDivs(slideIndex3 = n, id, slideIndex3); break;
  }

}

function showDivs(n, id, si) {
  var i;
  let ss = `mySlides${id}`;
  let ds = `demo${id}`;
  var x = document.getElementsByClassName(ss);
  var dots = document.getElementsByClassName(ds);
  if (n > x.length) { si = 1 }
  if (n < 1) { si = x.length }
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" w3-white", "");
  }
  x[si - 1].style.display = "block";
  dots[si - 1].className += " w3-white";
}