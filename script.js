let hour1 = document.getElementById('hour-1');
let hour2 = document.getElementById('hour-2');
let min1 = document.getElementById('min-1');
let min2 = document.getElementById('min-2');
let sec1 = document.getElementById('sec-1');
let sec2 = document.getElementById('sec-2');
let expContainerEl = document.getElementById('expand-container');
let expandEl = document.getElementById('expand-button');
let toggleEl = document.querySelector('.toggle');
let toggleDotEl = document.querySelector('.toggle-handle');
let twelve = true;


setInterval(function() {
    
    updateClock();

}, 1000);

function updateClock() {
    let now = new Date();
    
    updateSeconds(now);
    updateMinutes(now);
    updateHours(now);
}

function updateSeconds(time) {
    let sec = time.getSeconds();
    let tens = Math.floor(sec/10);
    let ones = sec%10;
    changeColors(sec1.children, clockBinaryConvert(tens));
    changeColors(sec2.children, clockBinaryConvert(ones));
}

function updateMinutes(time) {
    let min = time.getMinutes();
    let tens = Math.floor(min/10);
    let ones = min%10;
    changeColors(min1.children, clockBinaryConvert(tens));
    changeColors(min2.children, clockBinaryConvert(ones));
}

function updateHours(time) {
    let hour = time.getHours();

    if (twelve) {
        if (hour > 12) {
            hour -=12;
        }
    }

    let tens = Math.floor(hour/10);
    let ones = hour%10;
    changeColors(hour1.children, clockBinaryConvert(tens));
    changeColors(hour2.children, clockBinaryConvert(ones));
}


function clockBinaryConvert(num) {
    
    let bin = [];

    for (let i = 8; i >= 1; i /= 2) {
        if (num/[i] >= 1) {
            num -= [i];
            bin.push(1);
        } else bin.push(0);
    }
    
    return bin;
}

function changeColors(childArr, binArr) {

    for (let i = 0; i < 4; i++) {
        if(childArr[i].classList.contains('dotColored')) {
            childArr[i].classList.remove('dotColored');
        }
        if(binArr[i] === 1) {
            childArr[i].classList.add('dotColored');
        }
    }
}

expandEl.addEventListener("click", function(event) {
    expContainerEl.classList.toggle('hidden');
})

toggleEl.addEventListener("click", function() {
    
    toggleDotEl.classList.toggle("twelve");
    toggleDotEl.classList.toggle("twenty-four");
    if (twelve) {
        twelve = false;
    } else {
        twelve = true;
    }
    updateClock();
})