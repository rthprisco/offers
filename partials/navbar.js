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
            <div id="result" class="result-container">
            <p id="welcome" class="welcome-message" onclick="openModal()"><i class="fa-solid fa-location-dot"></i> Insira seu CEP</p>
            <p id="cep-info" class="cep-info hidden" onclick="openModal()"></p>
            </div>
        </div>
        <div class="hamburguer">
            <button></button>
        </div>
        <ul class="nav-list">
          <li class="nav-item" class="meu">
            <a href="#" class="open">
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
            <a href="#" title="Confira os encartes">
              <img src="/public/images/icons/navbar/journal.png" alt="ícone encartes">
              <span>Confira os encartes</span>
            </a>
          </li>
        </ul>
        
    `;

  linkCSS('public/css/navbar.css')

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

function openModal() {
  document.getElementById('modal').style.display = 'flex';
}

function closeModal() {
  document.getElementById('modal').style.display = 'none';
}

function formatarCep(input) {
  let cep = input.value.replace(/\D/g, ''); // Remove tudo que não é número
  if (cep.length > 5) {
    cep = `${cep.slice(0, 5)}-${cep.slice(5, 8)}`; // Adiciona o hífen
  }
  input.value = cep;
}

async function buscarCep() {
  const cep = document.getElementById('cep').value.replace('-', ''); // Remove o hífen para busca
  const resultDiv = document.getElementById('result');
  const welcomeMessage = document.getElementById('welcome');
  const cepInfo = document.getElementById('cep-info');

  if (!cep) {
    resultDiv.innerHTML = "<p style='color: red;'>Por favor, digite um CEP.</p>";
    return;
  }

  try {
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    if (!response.ok) throw new Error('Erro ao buscar o CEP');
    const data = await response.json();

    if (data.erro) {
      resultDiv.innerHTML = "<p style='color: red;'>CEP não encontrado.</p>";
      return;
    }

    localStorage.setItem('userCep', JSON.stringify(data));

    welcomeMessage.classList.add('hidden');
    cepInfo.classList.remove('hidden');
    cepInfo.textContent = `${data.localidade || 'N/A'} - ${data.uf || 'N/A'}`;
    closeModal();
  } catch (error) {
    resultDiv.innerHTML = `<p style='color: red;'>Erro: ${error.message}</p>`;
  }
}

function carregarCepSalvo() {
  const savedCep = localStorage.getItem('userCep');
  if (savedCep) {
    const data = JSON.parse(savedCep);
    const welcomeMessage = document.getElementById('welcome');
    const cepInfo = document.getElementById('cep-info');

    welcomeMessage.classList.add('hidden');
    cepInfo.classList.remove('hidden');
    cepInfo.textContent = `${data.localidade || 'N/A'} - ${data.uf || 'N/A'}`;
  }
}

document.addEventListener('DOMContentLoaded', carregarCepSalvo);  