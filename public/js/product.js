import { createPost } from './feedback.js';

const params = new URLSearchParams(window.location.search);
const product = params.get('product');
const productObj = JSON.parse(product);

export const productId = productObj.id;

document.querySelector('#title').innerText = productObj.title;
document.querySelector('#market').innerText = productObj.official_store_name || productObj.seller.nickname;

if (productObj.original_price) {
    document.querySelector('#original-price').innerText = `R$ ${(productObj.original_price).toFixed(2)}`;
}

document.querySelector('#price').innerText = `R$ ${(productObj.price).toFixed(2)}`;
document.querySelector('#link-buy').href = productObj.permalink;
document.querySelector('#product-img').src = productObj.thumbnail.replace(/(\w+)\.jpg/gi, 'W.jpg');


const allFeedback = JSON.parse(localStorage.getItem('feedback'));
const posts = allFeedback.find(elem => elem.id === productId);
const postsList = document.querySelector('#posts');

if (posts) {
    posts.posts.forEach(elem => {
        postsList.appendChild(createPost(elem.user, elem.post));
    });
}


// Avaliação e descrição
const tabs = document.querySelectorAll('.tab');
const contents = {
    rating: document.getElementById('rating-content'),
    description: document.getElementById('desc-content'),
    price_history: document.getElementById('price-history-content')
};

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        console.log(Object.values(contents));
        Object.values(contents).forEach(content => content.classList.remove('active'));

        tab.classList.add('active');
        contents[tab.id].classList.add('active');
    });
});


// Descontômetro
