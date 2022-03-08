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

// Rota Home
app.get('/', (req, res) => {

    res.render('home/index',{frases:frases})  
  
  });

//rota admin
app.get('/admin', function(req, res){
  if (req.session.autorizado == true){
     res.render('admin/form_add_frase',{autorizado:req.session.autorizado,frases:frases})
     
  }else {
      res.render('admin/login')
  }
 

})

//Rota Autenticação 
app.post('/admin/autenticar',(req,res)=>{
  const{usuario,senha} = req.body
  console.log(usuario,senha)

  //usuario == root
  //senha == root

  if(usuario == 'root' && senha == 'root'){
      req.session.autorizado = true;
  }

  res.redirect('/admin')

})

///admin/sair Rota responsável pela saida do usuário
app.get('/admin/sair', function(req, res){
  req.session.destroy(erro => {/*console.log(erro)*/})
  res.redirect('/admin')

})

// Start Server
app.listen(process.env.PORT || 3000, () => {
    console.log('Servidor rodando com express')
    console.log('Pressione CTRL+C para encerrar')
  });