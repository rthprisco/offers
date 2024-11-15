import { createCardProduto } from '../../partials/produto.js';

const itemsPerPage = 12;
let currentPage = 1;
let produtos = [];

async function fetchProdutos() {
    try {
        const data = await fetch('../../produtos.json').then(response => response.json());
        produtos = data || [];
        displayProdutos();
    } catch (error) {
        console.error('Erro ao buscar dados:', error);
    }
}

function displayProdutos() {
    const produtosContainer = document.querySelector('.produtos-container');
    produtosContainer.innerHTML = '';

    if (!produtos || produtos.length === 0) {
        console.error('Nenhum produto encontrado.');
        produtosContainer.textContent = 'Nenhum produto encontrado.';
        return;
    }

    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const paginatedProdutos = produtos.slice(start, end);

    paginatedProdutos.forEach(produto => {
        const itemElement = createCardProduto(produto);
        produtosContainer.appendChild(itemElement);
    });
}

function nextPage() {
    if (currentPage < Math.ceil(produtos.length / itemsPerPage)) {
        currentPage++;
        displayProdutos();
    }
}

function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        displayProdutos();
    }
}

document.getElementById('prev-btn').addEventListener('click', prevPage);
document.getElementById('next-btn').addEventListener('click', nextPage);

fetchProdutos();
