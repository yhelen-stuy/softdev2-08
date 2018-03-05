var pic = document.getElementById("vimage");
var funB = document.getElementById("fun");
var dvdB = document.getElementById("dvd");
var stopB = document.getElementById("stop");

var h = pic.getAttribute("height");
var w = pic.getAttribute("width");
var r = h / 25;

var x = null;
var y = null;
var xChange = 1;
var yChange = 2;
var MAX_CHANGE = 2;

var pi = Math.PI;

var a = -1;
var b = -1;

var drawCircle = function(x, y) {
    var circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute("cx", x);
    circle.setAttribute("cy", y);
    circle.setAttribute("r", h / 25);
    circle.setAttribute("fill", "red");
    circle.setAttribute("stroke", "black");

    pic.appendChild(circle);
}

var animateDVD = function() {
    if (b > -1) {
        stopFrame(b);
    }
    clear();
    if (x == null || y == null) {
        x = w / 2;
        y = h / 2;
    }
    var logo_w = 90;
    var logo_h = 42;
    var image = document.createElementNS("http://www.w3.org/2000/svg", "image");
    image.setAttribute("x", x);
    image.setAttribute("y", y);
    image.setAttribute("height", logo_h);
    image.setAttribute("width", logo_w);
    image.setAttribute("xlink:href", "DVD.png");

    pic.appendChild(image);
    x += xChange;
    y += yChange;
    if (x > w - logo_w/2) {
        xChange = Math.floor(Math.random() * MAX_CHANGE) * -1;
    } else if (x < logo_w/2) {
        xChange = Math.floor(Math.random() * (MAX_CHANGE)) + 1;
    }
    if (y > h - logo_h/2) {
        yChange = Math.floor(Math.random() * MAX_CHANGE) * -1;
    } else if (y < logo_h/2) {
        yChange = Math.floor(Math.random() * (MAX_CHANGE)) + 1;
    }
}

var animateFun = function() {
    if (a > -1) {
        stopFrame(b);
    }
    clear();
    if (x == null || y == null) {
        x = Math.floor(Math.random() * w);
        y = Math.floor(Math.random() * h);
    }
    drawCircle(x, y);
    x = (x + 2) % w;
    y = (y + 2) % h;
}

var dvd = function(e) {
    a = setInterval(animateDVD, 30)
}

var fun = function(e) {
    b = setInterval(animateFun, 30)
}

var reset = function() {
    x = null;
    y = null;
    a = -1;
    b = -1;
}

var clear = function() {
    pic.innerHTML = '';
}

var stopFrame = function(frame) {
    if (frame > -1) {
        clearInterval(frame);
        reset();
    }
}

var stopCanvas = function(e) {
    stopFrame(b);
    stopFrame(a);
    reset();
}

funB.addEventListener('click', fun);
dvdB.addEventListener('click', dvd);
stopB.addEventListener('click', stopCanvas);
