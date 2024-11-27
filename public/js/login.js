const loginForm = document.querySelector('#login-form');
const btnOpen = document.querySelector('#open-login');
const btnClose = document.querySelector('.btn-close');
const blackoutModal = document.querySelector('.blackout-modal');

btnOpen.addEventListener('click', () => {
    const isLoggedIn = JSON.parse(localStorage.getItem('loggedInUser'));

    console.log(!!isLoggedIn)

    if (isLoggedIn) {
        window.location.href = 'minha-conta.html';
    } else {
        loginForm.style.display = 'flex';
        blackoutModal.style.display = 'flex';
    }
});

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = document.querySelector('#emailLogin').value;
    const senha = document.querySelector('#senhaLogin').value;

    const users = JSON.parse(localStorage.getItem('users'));

    if (users) {
        const user = users.find(u => u.email === email && u.senha === senha);

        if (user) {
            localStorage.setItem('loggedInUser', JSON.stringify({ email: email, nome: user.nome, telefone: user.telefone }));
            window.location.href = 'index.html';
        }
        else {
            document.querySelector('#error-login').style.display = 'block';
        }
    }
});

btnClose.addEventListener('click', () => {
    loginForm.style.display = 'none';
    blackoutModal.style.display = 'none';
});