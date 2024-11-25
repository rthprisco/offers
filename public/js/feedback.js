export class FormPost {
    constructor(idForm, idTextarea, idUlPost) {
        this.form = document.getElementById(idForm);
        this.textarea = document.getElementById(idTextarea);
        this.ulPost = document.getElementById(idUlPost);
        this.addSubmit();
    }

    onSubmit(func){
        this.form.addEventListener('submit', func)
    }


    formValidade(value){
        if(value == '' || value == null || value == undefined || value.lenght < 3){
            return false 
        }
        return true 
    }

    getTime(){
        const time = new Date();
        const hour = time.getHours();
        const minutes= time.getMinutes();
        return `${hour}h ${minutes}min`
    }

    addSubmit(){
        const handleSubmit = (event) => {
            event.preventDefault();
            if(this.formValidade(this.textarea.value)){
                const time = this.getTime();
                const newPost = document.createElement("li");
                newPost.classList.add('post');
                newPost.innerHTML = `
                <div class="inforUserPost">
                    <div class="imgUserPost"></div>

                    <div class="nomeANDhora">
                        <strong>Araujo</strong>
                        <p>${time}</p>
                    </div>
                </div>
                <p>
                   ${this.textarea.value}
                </p>

                <div class="btnPost">
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
                </div>
                `;
                this.ulPost.append(newPost);
                this.textarea.value= "";
                

            } else {
                alert('Verifique o campo digitado.')
            }
    }


        this.onSubmit(handleSubmit)

    }
    
}
const postForm = new FormPost('formPost', 'textarea', 'posts')