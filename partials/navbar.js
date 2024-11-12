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
        <div class="search-bar">
            <input type="text" placeholder="Pesquise pelo seu produto..." class="search">
            <!-- <img src="/public/images/icons/search.png" alt="ícone de pesquisa"> -->
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