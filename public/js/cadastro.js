const form = document.querySelector('#form-cad');

form.addEventListener('submit', (e) => {
    e.preventDefault();
})

function cadastrar() {
    const nome = document.querySelector('#nome').value.trim();
    const email = document.querySelector('#email').value.trim();
    const telefone = document.querySelector('#telefone').value;
    const senha = document.querySelector('#senha').value;
    const confirmarSenha = document.querySelector('#confirmar-senha').value;

    const newUser = { nome, email, telefone, senha, confirmarSenha };

    limparMensagensErro();

    if (validar(newUser)) {
        const users = JSON.parse(localStorage.getItem("users")) || [];
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('loggedInUser', JSON.stringify({ email: email, nome: nome, telefone: telefone }));
        window.location.href = '/';
    }
}

function validar({ nome, email, telefone, senha, confirmarSenha }) {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const errors = [];

    const campos = { nome, email, telefone, senha, confirmarSenha };
    Object.entries(campos).forEach(([key, value]) => {
        if (!value) errors.push({ id: `${key}-erro`, msg: `Preencha o campo ${key.replace('-', ' ')}.` });
    })

    if (users.some(u => u.email === email)) errors.push({ id: 'email-erro', msg: 'Esse email já está sendo utilizado.' });
    if (users.some(u => u.telefone === telefone)) errors.push({ id: 'telefone-erro', msg: 'Esse número de telefone já está sendo utilizado.' });
    if (senha !== confirmarSenha) errors.push({ id: 'senha-erro', msg: 'As senhas não correspondem.' });
    if (!isValidEmail(email)) errors.push({ id: 'email-erro', msg: 'Insira um email válido.' });

    errors.forEach(({ id, msg }) => mostrarErro(id, msg));
    return errors.length === 0;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function mostrarErro(id, mensagem) {
    const span = document.getElementById(id);
    if (span) {
        span.innerHTML += `${mensagem} <br>`;
        span.style.display = 'block';
    }
}

function limparMensagensErro() {
    const errorMessages = document.querySelectorAll('.span-error');
    errorMessages.forEach(span => span.innerHTML = '');
}

// Máscara de telefone
document.querySelector('#telefone').addEventListener('input', (e) => mascaraTel(e.target));

function mascaraTel(input) {
    let telefone = input.value.replace(/\D/g, "");

    if (telefone.length > 10) {
        telefone = telefone.replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3");
    } else if (telefone.length > 6) {
        telefone = telefone.replace(/^(\d{2})(\d{4})(\d{0,4})$/, "($1) $2-$3");
    } else if (telefone.length > 2) {
        telefone = telefone.replace(/^(\d{2})(\d{0,5})$/, "($1) $2");
    } else {
        telefone = telefone.replace(/^(\d{0,2})$/, "($1");
    }

    input.value = telefone;
}