document.addEventListener("DOMContentLoaded", initSlider, true);

let pos = 0;
let imagePaths = [];
let preloadCache = []; 
let isMobile = false;

function initSlider() {
    checkScreenSize();

    generateImagePaths();

    setInterval(nextPic, 10000);
}

function checkScreenSize() {
    isMobile = window.innerWidth <= 900;
}

function generateImagePaths() {
    imagePaths = [];
    preloadCache = []; 
    
    const totalImages = 2; 
    
    const suffix = isMobile ? "-handy.png" : "-pc.png"; 

    for (let i = 1; i <= totalImages; i++) {
        const path = "./img/homepage-topimg/" + i + suffix;
        imagePaths.push(path);
        
        const imgObj = new Image();
        imgObj.src = path;
        preloadCache.push(imgObj);
    }
}

function nextPic() {
    const wasMobile = isMobile;
    checkScreenSize();
    
    if (wasMobile !== isMobile) {
        generateImagePaths();
        pos = 0;
    }

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
        
        requestAnimationFrame(() => {
            refImg.style.opacity = "1";
        });
    }, 800);
}