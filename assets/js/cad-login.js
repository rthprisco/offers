const box = document.querySelector('.caixa-modelo');
const btnClose = document.querySelector('.btn-close');
const btnOpen = document.querySelector('.open-login');
const filtro = document.querySelector('.filtro');


btnClose.addEventListener('click', () => {
    box.style.display = 'none';
    filtro.style.display = 'none';
});

btnOpen.addEventListener('click', () => {
    box.style.display = 'flex';
    filtro.style.display = 'flex';
});