document.addEventListener("DOMContentLoaded", movePictures, true);

var pos = 0;
var bilder = [];

function movePictures() {
    let j = 0;
    for (let i = 1; i <= 2; i++) {
        if (screen.width > 900) bilder[j] = "./img/homepage-topimg/" + i + "-pc.png";
        else bilder[j] = "./img/homepage-topimg/" + i + "-handy.png";
        j++;
    }
    setInterval(function () { nextPic(bilder); }, 10000);
}

function nextPic(a) {
    if (screen.width > 900 && bilder[0] === "./img/homepage-topimg/1-handy.png") rePlacer(a, "pc");
    else if (screen.width <= 900 && bilder[0] === "./img/homepage-topimg/1-pc.png") rePlacer(a, "handy");
    
    var refimg = null;
    if (screen.width > 900) refimg = document.getElementById("refimgpc");
    else refimg = document.getElementById("refimghandy");

    if (refimg && a[pos]) {
        refimg.style.transition = "opacity 0.8s ease-in-out";
        refimg.style.opacity = "0";
        
        setTimeout(function() {
            refimg.setAttribute("src", a[pos]);
            refimg.style.opacity = "1";
            pos++;
            if (pos >= a.length) pos = 0;
        }, 800);
    } else {
        pos = 0;
    }
}

function rePlacer(bilder, handyorpc) {
    let j = 0;
    for (let i = 1; i <= 2; i++) {
        if (screen.width > 900) bilder[j] = "./img/homepage-topimg/" + i + "-pc.png";
        else bilder[j] = "./img/homepage-topimg/" + i + "-handy.png";
        j++;
    }
}