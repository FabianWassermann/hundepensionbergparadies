var howmanyareopen = 0;

function mehrlesenteam1() {
    howmanyareopen++;
    // getmargin();
    document.getElementById("wenigerlesenteam1").style.display = "none";
    // document.getElementById("contentid").style.paddingBottom = marginB;
    document.getElementById("mehrlesenteam1").style.display = "block";
    document.getElementById("team2id").style.marginTop = "200px";

}

function wenigerlesenteam1() {
    howmanyareopen--;
    // getmargin();
    document.getElementById("wenigerlesenteam1").style.display = "block";
    document.getElementById("mehrlesenteam1").style.display = "none";
    // document.getElementById("contentid").style.paddingBottom = marginB;
    document.getElementById("team2id").style.marginTop = "50px";
}


function mehrlesenteam2() {
    howmanyareopen++;
    // getmargin();
    document.getElementById("wenigerlesenteam2").style.display = "none";
    // document.getElementById("contentid").style.paddingBottom = marginB;
    document.getElementById("mehrlesenteam2").style.display = "block";
    document.getElementById("team2id").style.marginBottom = "200px";
}

function wenigerlesenteam2() {
    howmanyareopen--;
    // getmargin();
    document.getElementById("wenigerlesenteam2").style.display = "block";
    document.getElementById("mehrlesenteam2").style.display = "none";
    // document.getElementById("contentid").style.paddingBottom = marginB;
    document.getElementById("team2id").style.marginBottom = "50px";
}


function mehrlesenteam3() {
    howmanyareopen++;
    // getmargin();
    document.getElementById("wenigerlesenteam3").style.display = "none";
    document.getElementById("contentid").style.paddingBottom = "150px";
    document.getElementById("mehrlesenteam3").style.display = "block";
}

function wenigerlesenteam3() {
    howmanyareopen--;
    // getmargin();
    document.getElementById("wenigerlesenteam3").style.display = "block";
    document.getElementById("mehrlesenteam3").style.display = "none";
    document.getElementById("contentid").style.paddingBottom = "0px";
}