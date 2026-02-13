document.addEventListener("DOMContentLoaded", initSlider, true);

let pos = 0;
let imagePaths = [];
let isMobile = false;
let sliderTimerId = null;

function initSlider() {
    checkScreenSize();

    generateImagePaths();

    if (imagePaths.length > 1) {
        preloadImage(imagePaths[1]);
    }

    if (sliderTimerId) {
        clearInterval(sliderTimerId);
    }
    sliderTimerId = setInterval(nextPic, 10000);
}

function checkScreenSize() {
    isMobile = window.innerWidth <= 900;
}

function generateImagePaths() {
    imagePaths = [];
    
    const totalImages = 2; 
    
    const suffix = isMobile ? "-handy.png" : "-pc.png"; 

    for (let i = 1; i <= totalImages; i++) {
        const path = "./img/homepage-topimg/" + i + suffix;
        imagePaths.push(path);
    }
}

function preloadImage(path) {
    if (!path) return;

    const imgObj = new Image();
    imgObj.src = path;
}

function nextPic() {
    const wasMobile = isMobile;
    checkScreenSize();
    
    if (wasMobile !== isMobile) {
        generateImagePaths();
        pos = 0;
    }

    if (imagePaths.length === 0) return;

    const refImg = isMobile 
        ? document.getElementById("refimghandy") 
        : document.getElementById("refimgpc");

    if (!refImg) return;

    pos++;
    if (pos >= imagePaths.length) pos = 0;

    refImg.style.transition = "opacity 0.8s ease-in-out";
    refImg.style.opacity = "0";

    setTimeout(function() {
        refImg.src = imagePaths[pos];
        const nextPos = (pos + 1) % imagePaths.length;
        preloadImage(imagePaths[nextPos]);
        
        requestAnimationFrame(() => {
            refImg.style.opacity = "1";
        });
    }, 800);
}
