const express = require('express');
const session = require('express-session')
const path = require('path');
const fs = require('fs');

const app = express();

// Configurando o EJS como motor de templates
app.set('view engine', 'ejs'); 

app.use(express.json());                         // Para processar dados JSON
app.use(express.urlencoded({ extended: true })); // Para processar dados de formulário codificados em URL

// Configurando as sessões
app.use(session({
    secret: 'kkkk',  // Use uma chave secreta forte em produção
    resave: false,
    saveUninitialized: true
}));

// Servir arquivos estáticos da pasta 'public'
app.use(express.static(path.join(__dirname, 'public')));

const getUsers = () => {
    const data = fs.readFileSync('users.json');
    return JSON.parse(data);
}

// Rotas
app.get('/', (req, res) => {
    fs.readFile('produtos.json', 'utf8', (err, data) => {
        if (err) {
            console.error("Erro ao ler o arquivo JSON:", err);
            return res.status(500).send("Erro ao carregar os dados.");
        }
        
        const produtos = JSON.parse(data);

        res.render('index', { produtos, nome: req.session.nome });
    });
});

app.get('/cadastro', (req, res) => {
    res.render('cadastro');
});

app.post('/enviar-cadastro', (req, res) => {
    const { nome, email, tel, senha, senha2 } = req.body;

    const filePath = path.join(__dirname, 'users.json');
    let usuarios = [];
    
    if (fs.existsSync(filePath)) {
        const data = fs.readFileSync(filePath);
        usuarios = JSON.parse(data);
    }

    if (usuarios.find(user => user.email === email)) {
        return res.status(400).json({ msg: 'Este email já está em uso.'});
    }

    usuarios.push({ nome, email, tel, senha });

    fs.writeFileSync(filePath, JSON.stringify(usuarios, null, 2));

    req.session.nome = nome;

    return res.redirect('/');
});

app.post('/login', (req, res) => {
    const { email, senha } = req.body;

    const users = getUsers();
    const user = users.find(u => u.email === email);

    if (!user) {
       return res.status(401).json({ message: 'Usuário não encontrado' });
    }
    else if (user.senha !== senha) {
        return res.status(401).json({ message: 'Senha incorreta' });
    }

    req.session.nome = user.nome;
    
    return res.status(200).json({ redirectUrl: '/' });
});

app.get('/criar-lista', (req, res) => {
    return res.render('criar-lista', { nome: req.session.nome })
});

app.get('/comparar-produtos', (req, res) => {
    return res.render('comparar-produtos', { nome: req.session.nome })
});

app.get('/feijao', (req, res) => {
    return res.render('feijao', { nome: req.session.nome })
});

app.get('/minha-conta', (req, res) => {
    return res.render('minha-conta', { nome: req.session.nome })
});

// Inicia o servidor

const port = 3000;
app.listen(port, '0.0.0.0', () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
