function createCardProduto(img, titulo, preco, promocao, mercado) {
    const card = document.createElement("div");
    card.className = "produto";
    card.innerHTML = `
        <img src="${img}" alt="produto" width="120">
        <p class="titulo">${titulo}</p>
        <div class="precos">
            <p class="preco-anterior">${preco}</p>
            <p class="preco-promocao">${promocao}</p>
        </div>
        <div class="footer">
            <img src="${mercado}" alt="mercado" width="50">
            <span>Oferta válida até 28/06</span>
        </div>
    `;
    return card;
}

fetch('./produtos.json')
    .then(response => response.json())
    .then(data => {
        const produtosContainer = document.querySelector('.produtos-container');
        data.forEach(item => {
            if (produtosContainer.children.length > 11) return;
            const card = createCardProduto(item.img, item.titulo, item.preco, item.promocao, item.mercado);
            produtosContainer.appendChild(card);
        });
    })
    .catch(error => console.error("Erro ao carregar o JSON:", error));