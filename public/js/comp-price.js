import { createCardProduto } from '../../partials/produto.js';

const productList = document.querySelector('.produtos-container')
const priceChart = document.querySelector('.price-chart')

const params = new URLSearchParams(window.location.search);
const produto = params.get('produto');

let offset = 0;

let myChart = ""

async function fetchProducts() {
    const data = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${produto}&limit=24&offset=${offset}`)
        .then(response => response.json());

    const products = data.results;

    displayItems(products)
}

// document.addEventListener('DOMContentLoaded', async function (event) {
//     const data = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${produto}&limit=24&offset=${offset}`)
//         .then(response => response.json());

//     const products = data.results

//     displayItems(products)
// });

function displayItems(products) {
    productList.innerHTML = '';

    products.forEach(p => {
        const produto = {
            img: p.thumbnail.replace(/(\w+)\.jpg/gi, 'W.jpg'),  
            titulo: p.title,
            mercado: p.seller.nickname,
            preco_original: p.original_price,
            promocao: p.price
        };

        productList.appendChild(createCardProduto(produto));
    });
}

fetchProducts();

function nextPage() {
    offset += 24;
    fetchProducts();
}

function prevPage() {
    if (offset > 0) {
        offset -= 24;
        fetchProducts();
    }
}

document.getElementById('prev-btn').addEventListener('click', prevPage);
document.getElementById('next-btn').addEventListener('click', nextPage);

// function updatePriceChart(products) {
//     const ctx = priceChart.getContext('2d');
//     if (myChart) {
//         myChart.destroy();
//     }
//     myChart = new Chart(ctx, {
//         type: 'bar',
//         data: {
//             labels: products.map(p => p.title.substring(0, 20) + '...'),
//             datasets: [{
//                 label: 'Preço (R$)',
//                 data: products.map(p => p.price),
//                 backgroundColor: 'rgba(46, 204, 113, 0.6)',
//                 borderColor: 'rgba(46, 204, 113, 1)',
//                 borderWidth: 1
//             }]
//         },
//         options: {
//             responsive: true,
//             scales: {
//                 y: {
//                     beginAtZero: true,
//                     ticks: {
//                         callback: function (value) {
//                             console.log(value)

//                             return 'R$ ' + value.toFixed(2);
//                         }
//                     }
//                 }
//             },
//             plugins: {
//                 legend: {
//                     display: false
//                 },
//                 title: {
//                     display: true,
//                     text: 'Comparação de Preços',
//                     font: {
//                         size: 18
//                     }
//                 }
//             }
//         }
//     });
// }





