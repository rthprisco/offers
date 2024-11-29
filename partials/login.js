import { linkCSS } from "../public/js/utils.js";

function createLoginModal() {
    const loginModal = document.querySelector('#login-form');
    loginModal.innerHTML = `
        <span class="btn-close" style="cursor: pointer;"><img src="./public/images/icons/close.png"
                alt="ícone close"></span>
        <h1>Faça seu login</h1>
        <div class="input">
            <p>E-mail</p>
            <input type="text" id="emailLogin" name="emailLogin">
        </div>
        <div class="input">
            <p>Senha</p>
            <input type="password" id="senhaLogin" name="senhaLogin" autocomplete="off">
            <a href="#" class="esq-sehna">Esqueceu sua senha?</a>
        </div>
        <span id="error-login" class="span-error-box">Usuário ou senha incorreto.</span>
        <button type="submit" class="btn-enviar">Entrar</button>

        <div class="link-cadastro">
            <p>Ainda não tem cadastro?<a href="cadastro.html"> Cadastre-se</a></p>
        </div>
    `;
}

linkCSS('public/css/cad-login.css')
    .then(() => createLoginModal())
    .then(() => document.dispatchEvent(new Event('modalLoginReady')));