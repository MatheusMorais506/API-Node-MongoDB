const mongoose = require('mongoose');

const Artigo = new mongoose.Schema({
    titulo:{
        type:String,
        required:true
    },
    conteudo:{
        type: String,
        required:true
    }
},
{
    timestamps: true, // cria createdAt e updatedAt automaticamente no banco
})

mongoose.model('artigo', Artigo)//exportar esse model mongoose

//Adicionar valores na tabela 'artigo' por aqui
/*const novoArtigo = mongoose.model('artigo');
new novoArtigo({
    titulo:"PostagemTeste",
    conteudo:"Testando Mongoose"
}).save()
    .then(() => (
        console.log('Usuario adicionado com sucesso')
    ))
    .catch( err => (
        console.log('Erro ao adicionar valores' + err)
    ))*/