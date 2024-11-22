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
            <div class="box-app">
                <div class="icon" onclick="openModal()">Digite seu cep</div>
                <div id="result" class="result-container"></div>
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


// Função para abrir o modal
function openModal() {
    document.getElementById('modal').style.display = 'flex';
}

// Função para fechar o modal
function closeModal() {
    document.getElementById('modal').style.display = 'none';
}

// Função para buscar o CEP
async function buscarCep() {
    const cep = document.getElementById('cep').value;
    const resultDiv = document.getElementById('result');

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

        resultDiv.innerHTML = `<p>${data.localidade || 'N/A'} - ${data.uf || 'N/A'}</p>`;
        closeModal(); // Fecha o modal após a busca
    } catch (error) {
        resultDiv.innerHTML = `<p style='color: red;'>Erro: ${error.message}</p>`;
    }
}