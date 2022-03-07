// Iniciar o NPM
// npm init
// git init
// npm install express
// npm install -g nodemon
// npm install ejs
// npm install pg
// npm install express-session

const app = require('./config/server');
//cons db = require('./dbConnection')

//recuperando o modulo mockup
const frases = require('./mockup')

// Rotas
// ---------------------------------------------
app.get('/', (req, res) => {

    res.render('home/index',{frases:frases})  
  
  });


// Start Server
app.listen(process.env.PORT || 3000, () => {
    console.log('Servidor rodando com express')
    console.log('Pressione CTRL+C para encerrar')
  });