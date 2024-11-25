const scripts = [
    // Componentes
    './partials/navbar.js',
    './partials/footer.js',


    'public/js/login.js'
];

scripts.forEach(src => {
    const script = document.createElement('script');

    script.src = src;
    script.type = 'module';
    script.defer = true;

    document.head.appendChild(script);
})