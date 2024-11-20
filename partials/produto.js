export function createCardProduto(produto) {
    const card = document.createElement("div");
    card.className = "produto";
    card.innerHTML = `
        <img src="${produto.img}" alt="produto" width="120">
        <p class="titulo">${produto.titulo}</p>
        <div class="precos">
            <p class="preco-anterior">${produto.preco}</p>
            <p class="preco-promocao">R$ ${produto.promocao}</p>
        </div>
        <div class="footer">
            <span>Mercado: ${produto.mercado}</span>
        </div>
    `;
    return card;
}

// <img src="${produto.mercado}" alt="mercado" width="40">
// <span>Oferta válida até 28/06</span>