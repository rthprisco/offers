export function createCardProduto(produto) {
    const card = document.createElement("div");
    card.className = "produto";
    card.innerHTML = `
        <img src="${produto.img}" alt="produto" width="120">
        <p class="titulo">${produto.titulo}</p>
        <div class="precos">
            <p class="preco-anterior" ${isOriginalPrice(produto.preco_original)}>R$ ${(produto.preco_original)}</p>
            <p class="preco-promocao">R$ ${(produto.promocao).toFixed(2)}</p>
        </div>
        <div class="footer">
            <span>${produto.mercado}</span>
        </div>
    `;
    return card;
}

function isOriginalPrice(price) {
    if (!price) return 'style="display: none;"';
}