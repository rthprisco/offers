const searchForm = document.querySelector('#search-input');

searchForm.addEventListener('keydown', async function (event) {
    if (event.key === 'Enter') {
        window.location.href = `comp-price.html?produto=${encodeURIComponent(searchForm.value)}`;
    }
});