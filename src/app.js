const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

require('./models/Artigo')
const Artigo = mongoose.model('artigo'); 

const app = express();
const porta = 8081

app.use(express.json());

app.use( (req,res,next) =>{ //função middleware vem antes de executar qualquer instrução
    //console.log('Acessou o middleware')
    res.header("Access-Control-Allow-Origin", "*") // * indica que qualquer aplicação pode estar fazendo uma requisição
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    app.use(cors());
    next();
})

// Conexao com o MongoDB
mongoose.connect('mongodb://localhost/NameDatabase', {
    useNewUrlParser:true,
    useUnifiedTopology:true,
})
    .then(() => {
        console.log('Conexão com MongoDB realizada com sucesso')
    }).catch( err => {
        console.log('Erro: Conexão com MongoDB não realiada ')
    });


app.get('/', (req,res) =>{
    //return res.json({titulo:'Como criar API'})
    //res.send('Introdução a Api');

    Artigo.find({})
        .then( artigo => {
            return res.json(artigo)
        }).catch(err => {
            return res.status(400).json({
                error:true,
                message:'Nenhum artigo encontrado'
            })
        })
})

app.get('/artigo/:id', (req,res) =>{
    //console.log(req.params.id)
    Artigo.findOne({_id:req.params.id})
        .then(artigo =>{
            return res.json(artigo);
        }).catch( err =>{
            return res.status(400).json({
                error:true,
                menssage:'Nenhum artigo encontrado'
            })
        })
    //return res.json({id:req.params.id})
})

app.post('/artigo', (req,res) => {
    /*console.log(req.body);
    return res.json({titulo: 'como criar API/POST'})*/ // Testar com a Api se esta recebendo dados
    const artigo = Artigo.create(req.body, (err) =>{
        if(err) return res.status(400).json({
            erro:true,
            menssage:'Error: Artigo não cadastrado com sucesso'
        })
        return res.status(200).json({
            erro:false,
            menssage:'Artigo cadastrado com sucesso'
        })
    })
} )

app.put('/artigo/:id', (req,res) =>{
    const artigo = Artigo.updateOne({_id: req.params.id}, req.body, err =>{
        if(err) return res.status(400).json({
            error:true,
            menssage:'Error: Artigo não foi editado com sucesso!'
        })
        return res.json({
            error:false,
            menssage:'Artigo editado com sucesso!'
        })
    })

})

app.delete('/artigo/:id', (req,res) => {
    const artigo = Artigo.deleteOne({_id: req.params.id}, err =>{
        if(err) return res.status(400).json({
            error:true,
            menssage:'Artigo não foi deletado com sucesso'
        })
        return res.json({
            error:false,
            menssage:'Artigo apagado com sucesso'
        })
    })
})

app.listen(porta, () =>{
    console.log(`Servidor rodando na porta - ${porta}`)
})
