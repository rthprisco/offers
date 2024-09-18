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

// const btnCreateUser = document.querySelector('#criar-cadastro');

// document.addEventListener('DOMContentLoaded', () => {
//     const users = []

//     btnCreateUser.addEventListener('click', () => {
//         const nome = document.querySelector('#nome').value;
//         const email = document.querySelector('#email').value;
//         const tel = document.querySelector('#tel').value;
//         const senha = document.querySelector('#senha').value;
//         const senha2 = document.querySelector('#senha2').value;

//         if (senha !== senha2) {
//             alert('As senhas não são iguais.')
//         }

        
//         users.push({id: users.length + 1, nome, email, tel, senha});
        
//         localStorage.setItem('users', users)

//         console.log(users);
//     })
// });

// id, nome, email, tel, senha

