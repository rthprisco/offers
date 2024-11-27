document.querySelector('.btn-share').addEventListener('click', async () => {
    console.log(navigator)

    if (navigator.share) {
        try {
            await navigator.share({
                title: 'Teste',
                text: 'será  q foi',
                url: window.location.href
            });
        }
        catch(error) {
            console.error('Erro:', error)
        }
    }
});