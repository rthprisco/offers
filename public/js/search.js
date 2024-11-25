const search = document.querySelector('#search-input');

search.addEventListener('keydown', async function (event) {
    if (event.key === 'Enter') {
        window.location.href = `comp-price.html?produto=${encodeURIComponent(search.value)}`;
    }
});