const loginForm = document.querySelector('#login-form');

const btnOpen = document.querySelector('.open');


const btnClose = document.querySelector('.btn-close');
const filtro = document.querySelector('.filtro');

btnOpen.addEventListener('click', () => {
    const isLoggedIn = localStorage.getItem('loggedInUser');

    if (isLoggedIn) {
        window.location.href = 'minha-conta.html';
    } else {
        loginForm.style.display = 'flex';
        filtro.style.display = 'flex';
    }
});

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = document.querySelector('#email').value;
    const senha = document.querySelector('#senha').value;

    fetch('./users.json')
        .then(response => response.json())
        .then(users => {
            const user = users.find(u => u.email === email && u.senha === senha);
            
            if (user) {
                localStorage.setItem('loggedInUser', JSON.stringify({ email: email, nome: user.nome }));
                window.location.href = 'minha-conta.html';
            }
            else {
                document.querySelector('#error-login').style.display = 'block';
            }
        })
        .catch(error => console.error('Erro ao carregar o arquivo JSON:', error));
});

btnClose.addEventListener('click', () => {
    loginForm.style.display = 'none';
    filtro.style.display = 'none';
});