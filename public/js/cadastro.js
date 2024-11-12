const nome = document.querySelector('#nome');
const email = document.querySelector('#email') ;
const tel = document.querySelector('#tel');
const senha = document.querySelector('#senha');
const confirmarSenha = document.querySelector('#senha2');

const form = document.querySelector('#form-cad');

form.addEventListener('submit', (e) => {
    e.preventDefault();


})

async function cadastrar() {
    fetch('./users.json')
        .then(response => response.json())
        .then(users => {
            // const user = users.find(users.email === email)

            console.log(users.find(users.email === email))
        });
}

cadastrar();