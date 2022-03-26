//sistema de autenticação
// npm install --save passport
// npm install --save passport-local

const estrategia = require('passport-local').Strategy
const mongoose = require("mongoose")// qualquer banco de dados
const bcrypt = require('bcryptjs')// para fazer a comparação das senhas

//model de administrador
require('../models/Admin')
const Admin = mongoose.model("admin")

module.exports = (passport)=>{

    passport.use(new estrategia({usernameField: 'email', passwordField: "senha"}, (email, senha, done)=>{
        // usernameField: campo para verificar
        // (email, senha, done): função de callback
        Admin.findOne({email: email}).then((admin)=>{
            //procura email igual a do usernameField
            if(!admin){
                return done(null, false, {mesage: "Conta inexistente"})
                            //1º parâmetro: dados da conta autenticado, null porque nenhuma conta foi autenticada
                            //2º parâmetro: se a autenticação ocorreu com sucesso ou não
                            //3ª parâmetro: mensagem
            }
            bcrypt.compare(senha, admin.senha, (error, senhaIgual)=>{
                //vai comparar senha com a admin.senha
                if(senhaIgual) return done(null, admin)// se a senha equivalem
                else return done(null, false, {mensage: "senha incorreta"})
            })
        })
    }))

    passport.serializeUser((admin, done)=>{// serve para salvar os dados na sessão
        done(null, admin.id)
        const autenticado = admin.id
        //console.log(admin.nome)
    })
    passport.deserializeUser((id, done)=>{
         Admin.findById(id, (error, admin)=>{
             done(error, admin)
         })
    })
}

