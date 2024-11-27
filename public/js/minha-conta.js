const user = JSON.parse(localStorage.getItem("loggedInUser"));

const inputNome = document.getElementById("ipt-nome");
const inputEmail = document.getElementById("ipt-email");
const inputTelefone = document.getElementById("ipt-telefone");
const textNome = document.querySelector(".profile-title")
const textEmail = document.querySelector(".profile-email")

inputNome.value = user.nome 
inputEmail.value = user.email
inputTelefone.value = user.telefone

textNome.innerText = user.nome
textEmail.innerText = user.email

//OPÇOES MINHA CONTA
const menu = document.querySelectorAll('.menu-link');
// const contents = {
//     rating: document.getElementById(''),
//     description: document.getElementById('desc-content'),
//     price_history: document.getElementById('price-history-content')
// };

menu.forEach(tab => {
    tab.addEventListener('click', () => {
        menu.forEach(t => t.classList.remove('active'));
        // Object.values(contents).forEach(content => content.classList.remove('active'));

        tab.classList.add('active');
        // contents[tab.id].classList.add('active');
    });
});