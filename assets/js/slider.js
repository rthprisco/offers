const slide = document.querySelector('.first');
let margem = 0;
let step = 1;

function nextSlide() {
    margem -= 25;

    if (margem < -75) margem = 0;

    slide.style.marginLeft = margem + '%';

    nextStep();
}

function nextStep() {
    step++;

    if (step > 4) step = 1;

    document.querySelector(`#step-0${step}`).checked = true;
}

setInterval(nextSlide, 4000);