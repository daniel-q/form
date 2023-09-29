/*import mysql from 'mysql2'
import dotenv from 'dotenv'
import pkg from 'bcryptjs';
import express from 'express';
import bodyParser from 'body-parser'
const {genSaltSync,  hashSync } = pkg
*/
const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
const bcrypt = require('bcryptjs')
const cors = require('cors');




const app = express();
app.use(cors())

dotenv.config()

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var connection = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
})

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





const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});




