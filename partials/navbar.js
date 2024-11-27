function userLogged() {
    const user = JSON.parse(localStorage.getItem('loggedInUser'));
    return user !== null ? `Olá, ${user.nome}!` : 'Faça seu login ou cadastre-se';
}

function createNavbar() {
    const card = document.createElement("nav");
    card.className = "nav";
    card.innerHTML = `
        <div class="logo">
            <a href="/"><img src="/public/images/Logo.png" alt="Logo"></a>
        </div>
        <div class="search-form">
            <input placeholder="Pesquise pelo seu produto..." id="search-input" class="product-input">
            <img src="/public/images/icons/search.png" alt="ícone de pesquisa">
            <div id="result" class="result-container">
            <p id="welcome" class="welcome-message" onclick="openModal()"><i class="fa-solid fa-location-dot"></i> Insira seu CEP</p>
            <p id="cep-info" class="cep-info hidden" onclick="openModal()"></p>
            </div>
        </div>
        <div class="hamburguer">
            <button></button>
        </div>
        <ul class="nav-list">
            <li class="nav-item">
                <a href="#" class="open-login">
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
    return card;
}

document.querySelector('#header').appendChild(createNavbar());


// Menu hamburguer
const hamburger = document.querySelector('.hamburguer');
const nav = document.querySelector('.nav');

hamburger.addEventListener('click', () => nav.classList.toggle('active'));