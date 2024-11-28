import { linkCSS } from "../public/js/utils.js";

function userLogged() {
  const user = JSON.parse(localStorage.getItem('loggedInUser'));
  return user !== null ? `Olá, ${user.nome}!` : 'Faça seu login ou cadastre-se';
}

function createNavbar() {
  const card = document.createElement("nav");
  card.className = 'nav';
  card.innerHTML = `
        <div class="logo">
            <a href="/"><img src="/public/images/Logo.png" alt="Logo"></a>
        </div>
        <div class="search-form">
            <input type="text" placeholder="Pesquise pelo seu produto..." id="search-input" class="product-input">
            <img src="/public/images/icons/search.png" alt="ícone de pesquisa">
            <div id="result" class="result-container">
              <p id="cep-info" class="cep-info" onclick="openModalCEP()"><i class="fa-solid fa-location-dot"></i> ${hasCEP()}</p>
            </div>
        </div>
        <div class="hamburguer">
            <button></button>
        </div>
        <ul class="nav-list">
          <li class="nav-item" id="open-login">
            <a href="#">
              <img src="/public/images/icons/navbar/user.png" alt="ícone usuário">
              <span class="user">${userLogged()}</span>
            </a>
          </li>
          <li class="nav-item">
            <a href="criar-lista.html" title="Crie sua lista de compras">
              <img src="/public/images/icons/navbar/clipboard.png" alt="ícone criar lista">
              <span>Crie sua lista de compras</span>
            </a>
          </li>
          <li class="nav-item">
            <a href="encartes.html" title="Confira os encartes">
              <img src="/public/images/icons/navbar/journal.png" alt="ícone encartes">
              <span>Confira os encartes</span>
            </a>
          </li>
        </ul>
        
    `;

  linkCSS('public/css/navbar.css');

  return card;
}

document.querySelector('#header').appendChild(createNavbar());

// Adiciona o blackout da modal
const blackoutModal = document.createElement('div');
blackoutModal.className = 'blackout-modal';

document.body.appendChild(blackoutModal);

// Menu hamburguer
const hamburger = document.querySelector('.hamburguer');
const nav = document.querySelector('.nav');

hamburger.addEventListener('click', () => nav.classList.toggle('active'));


// CEP
function hasCEP() {
  const cep = JSON.parse(localStorage.getItem('userCep'));
  return !!cep ? `${cep.localidade} - ${cep.uf}` : 'Insira seu CEP';
}