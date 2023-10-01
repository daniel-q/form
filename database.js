const express = require('express');
const mysql = require('mysql2');
const dotenv = require('dotenv')
const bcrypt = require('bcryptjs')
const cors = require('cors');

//Importa os dados do sistema
dotenv.config()


const app = express();
app.use(cors()) // Abilita a transmição de informações entre origens
app.use(express.json()); // Abilita o uso de Json


//Conecção com o mysql
var connection = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
})

//teste de conecção

connection.connect((err) => {
    if (err) {
      console.log(err)
      return
    }
    console.log('Database connected')
})



// Rota para receber dados do usuário e inserir no banco de dados

app.post('/adicionar-usuario', (req, res) => {
  
  const { usernamevalue, emailvalue, passwordvalue,cepvalue,estadovalue,cidadevalue,bairrovalue,ruavalue,numerovalue,complementovalue} = req.body;
  console.log(passwordvalue)
  hashing = bcrypt.hashSync(passwordvalue, bcrypt.genSaltSync(10))
  const sql = `INSERT INTO ${process.env.MYSQL_TABLE} (nome, email, senha,cep,estado,cidade,bairro,rua,numero,complemento) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  connection.query(sql, [usernamevalue, emailvalue,hashing,cepvalue,estadovalue,cidadevalue,bairrovalue,ruavalue,numerovalue,complementovalue], (err, result) => {
    if (err) {
      console.error('Erro ao inserir usuário: ' + err);
      res.status(500).json({ error: 'Erro interno do servidor' });
      return;
    }
    console.log('Usuário inserido com sucesso');
    res.status(200).json({ message: 'Usuário inserido com sucesso' });
  });
});



//define a porta a ser escutada

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});




