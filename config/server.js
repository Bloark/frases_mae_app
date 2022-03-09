//modulo de configuração do servidor

//incorporando a biblioteca express a nossa aplicação
const express = require('express');
const session = require('express-session')

const app = express();

//definir o motor de views como sendo o EJS
app.set('view engine','ejs');

//setar o diretorio de view do ejs
app.set('views','./app/views');

// o caminho dos arquivos estáticos
app.use(express.static('./app/public'));

//Configuração do bodyparser do express (método post)
app.use(express.urlencoded({extended:true}));

// configurar o express-session no App
app.use(session({
    secret: '2h[3v4qRCBL9z9}+', //chave / assinatura da sessão
    resave: false, // não salva sessões a cada requisição
    saveUninitialized: false // não sessão não iniciada ou vazia
}))


module.exports = app;