const hamburger = document.querySelector('.hamburguer');
const nav = document.querySelector('.nav');

hamburger.addEventListener('click', () => nav.classList.toggle('active'));
