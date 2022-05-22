document.addEventListener("DOMContentLoaded", movePictures, true);

var pos = 0;
var bilder = new Array();

function movePictures() {
    let j = 0;
    for (let i = 1; i < 3; i++) {
        if (screen.width > 900) bilder[j] = "./img/homepage-topimg/" + i + "-pc.png";
        else bilder[j] = "./img/homepage-topimg/" + i + "-handy.png";
        j++;
    }
    console.log(bilder);
    setInterval(function () { nextPic(bilder) }, 10000);
}

function nextPic(a) {
    if (screen.width > 900 && bilder[0] == "./img/homepage-topimg/1-handy.png") rePlacer(a, "pc");
    else if (screen.width <= 900 && bilder[0] == "./img/homepage-topimg/1-pc.png") rePlacer(a, "handy");
    if (pos >= a.length) pos = 0;
    let refimg = null;
    if (screen.width > 900) refimg = document.getElementById("refimgpc");
    else refimg = document.getElementById("refimghandy");

    refimg.setAttribute("src", a[pos]);

    pos++;
}

function rePlacer(bilder, handyorpc) {
    let j = 0;
    for (let i = 1; i < 3; i++) {
        if (screen.width > 900) bilder[j] = "./img/homepage-topimg/" + i + "-pc.png";
        else bilder[j] = "./img/homepage-topimg/" + i + "-handy.png";
        j++;
    }
    return null;
}