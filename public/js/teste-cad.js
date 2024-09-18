// Form Cadastro
document.querySelector('#form-cad').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const nome = document.querySelector('#nome').value;
    const email = document.querySelector('#email').value;
    const tel = document.querySelector('#tel').value;
    const senha  = document.querySelector('#senha ').value;

    alert(cadastrarUsuario(nome, email, tel, senha))
})

function cadastrarUsuario(nome, email, tel, senha) {
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const usuarioExistente = usuarios.find(elem => elem.email === email);

    if (usuarioExistente) return 'Este email já está cadastrado.'

    usuarios.push({nome, email, tel, senha});

    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    localStorage.setItem('usuarioAtual', usuarios.slice(-1)[0].email)

    window.location.href = 'index.html'
}