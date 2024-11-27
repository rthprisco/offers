import { isLogged, formatTime } from "./utils.js";
import { productId } from "./product.js";

const formPost = document.querySelector('#formPost');
const loggedUser = JSON.parse(localStorage.getItem('loggedInUser'));

formPost.addEventListener('submit', (e) => {
    e.preventDefault();

    const date = new Date();
    const h = date.getHours();
    const m = date.getMinutes();

    const text = document.querySelector('#textarea');
    const posts = document.querySelector('#posts');
    const allFeedback = JSON.parse(localStorage.getItem('feedback')) || [];

    const t = createPost(loggedUser.nome, text.value)

    posts.appendChild(t);

    const thisPost = allFeedback.find(elem => elem.id === productId) || [];

    if (thisPost.posts) {
        thisPost.posts.push({ user: loggedUser.nome, post: text.value });

        const feedback = allFeedback.map(elem => elem.id === productId ? thisPost : elem);

        localStorage.setItem('feedback', JSON.stringify(feedback));
    }
    else {
        const firstPost = {
            id: productId,
            posts: [{ user: loggedUser.nome, post: text.value }]
        };

        allFeedback.push(firstPost);
        localStorage.setItem('feedback', JSON.stringify(allFeedback));
    }



    text.value = '';
});

if (!isLogged()) {
    document.querySelector('.newpost').style.display = 'none'
}
else {
    const user = document.querySelector('#user');
    user.innerText = loggedUser.nome;
}

export function createPost(user, text) {

    const newPost = document.createElement("li");
    newPost.classList.add('post');
    newPost.innerHTML = `
        <div class="inforUserPost">
            <div class="imgUserPost"></div>

                <div class="nomeANDhora">
                    <strong>${user}</strong>
                    <!-- <p>Horário do post</p> -->
                </div>
            </div>
            <p> ${text} </p>

            <!-- <div class="btnPost">
                <button type="button" class="filePost" id="like">
                    <img src="./public/images/feedback/heart.svg" alt="Curtir">
                    Curtir
                </button>
                <button type="button" class="filePost" id="comment">
                    <img src="./public/images/feedback/comment.svg" alt="Comentar">
                    Comentar
                </button>
                <button type="button" class="filePost" id="compart">
                    <img src="./public/images/feedback/share.svg" alt="Compartilhar">
                    Compartilhar
                </button>
            </div> -->
    `;

    return newPost;
}