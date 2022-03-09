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

//Recuperado Database
const db = require('./config/dbConnection')


// Rota Home
app.get('/', (req, res) => {

    res.render('home/index',{frases:frases})  
  
  });

//rota admin
app.get('/admin', function(req, res){
  if (req.session.autorizado == true){
    //Fazendo consulta na base de dados
    db.query('SELECT * FROM frases ORDER BY id_frase DESC',function(error,result){
      //console.log(result.rows)
      res.render('admin/form_add_frase',{autorizado:req.session.autorizado,frases:result.rows})

    })
    //redenrizando a pagina para usar respostas na requisição com mockup
    //  res.render('admin/form_add_frase',{autorizado:req.session.autorizado,frases:frases})  

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

//Rota responsável por para salvar frase
app.post('/admin/salvar-frase',function(req,res){

  //Recuperação das informações passada por POST
  let {frase} = req.body

  //Método para inserir dados na tabela
  db.query('insert into frases(frase) VALUES ($1)',[frase], function(erroe, result){
    //redirecionar para a mesma pagina. 
    res.redirect('/admin')
  })


})

//Rota para deletar frase

app.get('/frase', function(req, res){

const id = req.query.id;

console.log(id)

  db.query('DELETE FROM frases WHERE id_frase = $1',[id], function(error,result){
    //redirecionar para a mesma pagina. 
    console.log("erro: "+error)
    console.log("Retorno"+result)
    res.redirect('/admin')
  })

})





// Start Server
app.listen(process.env.PORT || 3000, () => {
    console.log('Servidor rodando com express')
    console.log('Pressione CTRL+C para encerrar')
  });