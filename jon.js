var jons = [
    'jon1.jpg',
    'jon2.png',
    'jon3.jpg',
    'jon4.png',
    'jon5.png',
    'jon6.png',
    'jon7.jpg',
    'jon8.png',
    'jon9.png',
    'jon10.png',
    'jon11.png',
    'jon12.png',
    'jon13.png',
    'jon14.png',
    'jon15.png',
    'jon16.jpg'
];
var jonsToChange = 5; // how many jons to change each round
var jonsToChangeInterval = 3000; // the timer for how long to wait before changing jons (in milliseconds)

var jonEls;
var jonPics;
var numberPerRow;
var numberOfSquares;
var jonEl = document.getElementById('jons');

function jonJonJon() {
    while(jonEl.firstChild) {
        jonEl.removeChild(jonEl.firstChild);
    }
    var docHeight = Math.max(jonEl.scrollHeight, jonEl.offsetHeight);
    var docWidth = Math.max(jonEl.scrollWidth, jonEl.offsetWidth);

    var idealSquarePx = 200;
    var actualSquarePx = docWidth / Math.round(docWidth / idealSquarePx);
    numberPerRow = Math.ceil(docWidth / actualSquarePx);
    numberOfSquares = numberPerRow * Math.ceil(docHeight / actualSquarePx);

    jonEls = [];
    jonPics = [];

    for (var i = 0; i < numberOfSquares; i++) {
        var newJon = document.createElement('div');
        jonEls.push(newJon);

        var jonPic = null;
        do {
            jonPic = jons[Math.floor(Math.random() * jons.length)];
        }
        while (isJonSurroundedBySame(jonPic, jonPics.length));

        jonPics.push(jonPic);

        newJon.style.height = actualSquarePx + 'px';
        newJon.style.width = actualSquarePx + 'px';
        newJon.classList.add('jon');
        newJon.dataset.jonNumber = i;
        setJon(newJon, jonPic);
        jonEl.appendChild(newJon);
    }
}

jonJonJon();

window.onresize = function(e) {
    jonJonJon();
}

setInterval(changeJon, jonsToChangeInterval);

jonEl.addEventListener('click', function(e) {
    changeJon(e.target.dataset.jonNumber);
});

function setJon(jonToChange, jonPic) {
    jonToChange.style.backgroundImage = 'url(' + jonPic + ')';
    jonToChange.dataset.jonPic = jonPic;
}

function isJonSurroundedBySame(newPic, jonIndex) {
    jonIndex = parseInt(jonIndex);
    if (newPic === jonPics[jonIndex]) {
        return true;
    }

    var numJons = jonPics.length;
    if (numJons > 0) {
        var foundJons = [
            jonPics[jonIndex - 1], // left
            jonPics[jonIndex + 1], // right
            jonPics[(jonIndex - numberPerRow)], // above
            jonPics[(jonIndex + numberPerRow)] // below
        ];

        for (var j = 0; j < foundJons.length; j++) {
            if (newPic === foundJons[j]) return true;
        }
    }
    return false;
}

function changeJon(changeMe) {
    var changeNo = changeMe ? 1 : jonsToChange;
    for (var i = 0; i < changeNo; i++) {
        var jonPic = null;
        var jonToChangeIndex = changeMe ? changeMe : Math.floor(Math.random() * numberOfSquares);
        do {
            jonPic = jons[Math.floor(Math.random() * jons.length)];
        }
        while (isJonSurroundedBySame(jonPic, jonToChangeIndex));
        var jonToChange = jonEls[jonToChangeIndex];
        setJon(jonToChange, jonPic);
        jonPics[jonToChangeIndex] = jonPic;
    }
}