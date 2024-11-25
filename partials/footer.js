import { linkCSS } from '../public/js/utils.js'

function createFooter() {
    const footer = document.querySelector('#footer');
    footer.innerHTML = `
        <p>© 2024 - OFFers</p>
        <div class="redes">
            <a href="https://www.instagram.com/darasautoservice/" target="_blank">
                <i class="fa-brands fa-instagram"></i>
            </a>
            <a href="#">
                <i class="fa-brands fa-facebook"></i>
            </a>
            <a href="#">
                <i class="fa-brands fa-x-twitter"></i>
            </a>
        </div>
    `;

    linkCSS('public/css/footer.css');
}

createFooter();