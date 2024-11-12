export function createCardProduto(produto) {
    const card = document.createElement("div");
    card.className = "produto";
    card.innerHTML = `
        <img src="${produto.img}" alt="produto" width="120">
        <p class="titulo">${produto.titulo}</p>
        <div class="precos">
            <p class="preco-anterior">${produto.preco}</p>
            <p class="preco-promocao">${produto.promocao}</p>
        </div>
        <div class="footer">
            <img src="${produto.mercado}" alt="mercado" width="40">
            <span>Oferta válida até 28/06</span>
        </div>
    `;
    return card;
}

// fetch('./produtos.json')
//     .then(response => response.json())
//     .then(data => {
//         const produtosContainer = document.querySelector('.produtos-container');
//         data.forEach(item => {   
//             const card = createCardProduto(item.img, item.titulo, item.preco, item.promocao, item.mercado);
//             produtosContainer.appendChild(card);
//         });
//     })
//     .catch(error => console.error("Erro ao carregar o JSON:", error));