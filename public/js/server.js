const express = require('express');
const fs = require('fs');
const app = express();

// Middleware para interpretar JSON
app.use(express.json());

// Função para ler o arquivo users.json
const getUsers = () => {
  const data = fs.readFileSync('users.json', 'utf-8');
  return JSON.parse(data);
}

// Função para salvar dados no users.json
const saveUsers = (users) => {
  fs.writeFileSync('users.json', JSON.stringify(users, null, 2));
}

// Rota de cadastro
app.post('/register', (req, res) => {
  const { username, password } = req.body;
  const users = getUsers();

  // Verifica se o usuário já existe
  const userExists = users.find((user) => user.username === username);
  if (userExists) {
    return res.status(400).json({ message: 'Usuário já cadastrado!' });
  }

  // Adiciona o novo usuário
  const newUser = {
    id: users.length + 1,
    username,
    password,
  };
  users.push(newUser);
  saveUsers(users);

  res.status(201).json({ message: 'Usuário cadastrado com sucesso!' });
});

// Rota de login
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const users = getUsers();

  // Verifica se o usuário existe e a senha está correta
  const user = users.find((user) => user.username === username && user.password === password);
  if (!user) {
    return res.status(400).json({ message: 'Usuário ou senha inválidos!' });
  }

  res.status(200).json({ message: 'Login bem-sucedido!' });
});

// Iniciar o servidor
app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});