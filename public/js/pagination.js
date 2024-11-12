// const anterior = document.querySelector('#anterior');
// const posterior = document.querySelector('#posterior');
// const paginas = document.querySelector('.pag');

// let cont = 0;

// anterior.addEventListener('click', () => {
//     if (cont > 0) {
//         cont--;
//         paginas.children[cont + 1].classList.remove('pag-atual');
//         paginas.children[cont].classList.add('pag-atual');
//     }
// });

// posterior.addEventListener('click', () => {
//     paginas.children[cont + 1].classList.add('pag-atual');
//     paginas.children[cont].classList.remove('pag-atual');
//     cont++;
// });


let pagAtual = 1;
const itensPorPag = 12;

const produtos = fetch('./produtos.json').then(response => response.json())

async function displayItems() {
    
    const produtos = fetch('./produtos.json').then(response => response.json())

    console.log(produtos)

    const produtosContainer = document.querySelector('.produtos-container');
    produtosContainer.innerHTML = ""; // Limpa o container

    // Calcula o índice inicial e final dos itens da página atual
    const startIndex = (pagAtual - 1) * itensPorPag;
    const endIndex = startIndex + itensPorPag;
    const itemsToDisplay = produtos.slice(startIndex, endIndex);

    // Exibe os itens
    itemsToDisplay.forEach(item => {
        const itemElement = document.createElement("div");
        itemElement.textContent = item;
        produtosContainer.appendChild(itemElement);
    });

    // Atualiza a exibição do número da página
    // document.getElementById("pageInfo").textContent = `Página ${pagAtual} de ${Math.ceil(produtos.length / itensPorPag)}`;
}

function prevPage() {
    if (pagAtual > 1) {
        pagAtual--;
        displayItems();
    }
}

function nextPage() {
    if (pagAtual < Math.ceil(produtos.length / itensPorPag)) {
        pagAtual++;
        displayItems();
    }
}

document.addEventListener("DOMContentLoaded", displayItems);