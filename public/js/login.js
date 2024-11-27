const loginForm = document.querySelector('#login-form');
const btnOpen = document.querySelector('.open');
const btnClose = document.querySelector('.btn-close');
const blackoutModal = document.querySelector('.blackout-modal');

btnOpen.addEventListener('click', () => {
    const isLoggedIn = localStorage.getItem('loggedInUser');

    if (isLoggedIn) {
        window.location.href = 'minha-conta.html';
    } else {
        loginForm.style.display = 'flex';
        blackoutModal.style.display = 'flex';
    }
});

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = document.querySelector('#email').value;
    const senha = document.querySelector('#senha').value;

    const users = JSON.parse(localStorage.getItem('users'));

    const user = users.find(u => u.email === email && u.senha === senha);
    
    if (user) {
        localStorage.setItem('loggedInUser', JSON.stringify({ email: email, nome: user.nome }));
        window.location.href = 'index.html';
    }
    else {
        document.querySelector('#error-login').style.display = 'block';
    }
});

btnClose.addEventListener('click', () => {
    loginForm.style.display = 'none';
    blackoutModal.style.display = 'none';
});