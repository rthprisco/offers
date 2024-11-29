import { linkCSS } from '../public/js/utils.js'

linkCSS('public/css/footer.css');

function createFooter() {
    const footer = document.querySelector('#footer');
    footer.innerHTML = `
        <p>© 2024 - OFFers</p>
        <div class="redes">
            <a href="https://www.instagram.com/offers_brasil/" target="_blank">
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
}

createFooter();