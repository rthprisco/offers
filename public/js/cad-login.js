const box = document.querySelector('.caixa-modelo');
const btnClose = document.querySelector('.btn-close');
const btnOpen = document.querySelector('#open-login');
const filtro = document.querySelector('.filtro');


btnClose.addEventListener('click', () => {
    box.style.display = 'none';
    filtro.style.display = 'none';
});

btnOpen.addEventListener('click', () => {
    box.style.display = 'flex';
    filtro.style.display = 'flex';
});


document.querySelector('#login-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.querySelector('#email');
    const senha = document.querySelector('#senha');
    const spanEmail = document.querySelector('#span-email');
    const spanSenha = document.querySelector('#span-senha');

    try {
        const response = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: email.value, senha: senha.value })
        });

        const data = await response.json();

        if (response.ok) {
            window.location.href = data.redirectUrl;
        }
        else {
            if (data.message === 'Usuário não encontrado') {
                email.style.border = '1px solid red'
                spanEmail.innerHTML = data.message;
            }
            else {
                senha.style.border = '1px solid red'
                spanSenha.innerHTML = data.message;
            }
        }
    }
    catch (error) {
        alert('Erro no servidor');
        console.log(error)
    }
});