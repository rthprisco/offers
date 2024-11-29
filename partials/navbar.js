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
          <li class="nav-item" id="theme-toggle">
            <a href="#" title="Alterar tema">
              <img id="icon-theme" src="/public/images/icons/navbar/${getTheme()}.png" alt="ícone tema">
              <span>Alterar tema</span>
            </a>
          </li>
        </ul>
        
    `;

  return card;
}

linkCSS('public/css/navbar.css')
  .then(() => {
    const navbar = createNavbar();
    document.querySelector('#header').appendChild(navbar)
  })
  .then(() => {
    // Adiciona o blackout da modal
    const blackoutModal = document.createElement('div');
    blackoutModal.className = 'blackout-modal';

    document.body.appendChild(blackoutModal);

    // Menu hamburguer
    const hamburger = document.querySelector('.hamburguer');
    const nav = document.querySelector('.nav');

    hamburger.addEventListener('click', () => nav.classList.toggle('active'));

    // Barra de pesquisa
    const search = document.querySelector('#search-input');

    search.addEventListener('keydown', async function (event) {
      if (event.key === 'Enter') {
        window.location.href = `comp-price.html?produto=${encodeURIComponent(search.value)}`;
      }
    });

    // Alterar Tema
    const toggleBtnTheme = document.querySelector('#theme-toggle');
    const savedTheme = localStorage.getItem('theme');
    const iconTheme = document.querySelector('#icon-theme');

    if (savedTheme === 'dark') document.documentElement.classList.add('dark-mode');

    toggleBtnTheme.addEventListener('click', () => {
      document.documentElement.classList.toggle('dark-mode');

      const isDarkMode = document.documentElement.classList.contains('dark-mode');

      if (isDarkMode) {
        iconTheme.src = '/public/images/icons/navbar/lua.png'
      }
      else {
        iconTheme.src = '/public/images/icons/navbar/ensolarado.png'
      }

      localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    });
  })
  .then(() => {
    document.dispatchEvent(new Event('navbarReady'));
  });


// CEP
function hasCEP() {
  const cep = JSON.parse(localStorage.getItem('userCep'));
  return !!cep ? `${cep.localidade} - ${cep.uf}` : 'Insira seu CEP';
}

function getTheme() {
  const theme = localStorage.getItem('theme');
  return theme === 'dark' ? 'lua' : 'ensolarado'
}