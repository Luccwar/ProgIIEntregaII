const mongoose = require("mongoose");
require("../models/Cliente");
const Cliente = mongoose.model("clientes");

module.exports = class ClienteController {
  static paginaInicial(req, res) {
    res.render("cliente/index",{
      title: 'paginaInicial'
    });
  }
  static cadastroCliente(req, res) {
    res.render("cliente/cadastroCliente",{
      title: 'cadastroCliente'
    });
  }
  static listaAnimais(req, res) {
    res.render("cliente/listaAnimais",{
      title: 'listaAnimais'
    });
  }
  static listaBrinquedos(req, res) {
    res.render("cliente/listaBrinquedos",{
      title: 'listaBrinquedos'
    });
  }
  static listaHigiene(req, res) {
    res.render("cliente/listaHigiene",{
      title: 'listaHigiene'
    });
  }
  static listarCliente(req, res) {
    Cliente.find().then((clientes) => {
      res.render("cliente/clientes", {
        clientes: clientes,
        title: 'administracao'
      });
    });
  }
  static cadastrarCliente(req, res) {
    var erros = [];
    if(!req.body.nome || req.body.nome.length < 3 || typeof req.body.nome == undefined || req.body.nome == null){
      erros.push({texto: "Nome inválido, certifique-se de que preencheu o campo corretamente."})
    }
    if(!req.body.sobrenome || req.body.sobrenome.length < 3 || typeof req.body.sobrenome == undefined || req.body.sobrenome == null){
        erros.push({texto: "Sobrenome inválido, certifique-se de que preencheu o campo corretamente."})
    }
    if(!req.body.email || typeof req.body.email == undefined || req.body.email == null || req.body.email.indexOf("@") == -1){
        erros.push({texto: "E-mail inválido, certifique-se de que preencheu o campo corretamente."})
    }
    if(!req.body.telefone || typeof req.body.telefone == undefined || req.body.telefone == null){
        erros.push({texto: "Telefone inválido, certifique-se de que preencheu o campo corretamente."})
    }
    else if(req.body.telefone.length != 11 && req.body.telefone.length != 13){
        erros.push({texto: "Seu telefone deve ter onze (11) ou treze (13) dígitos, certifique-se que colocar seu DDD, você também pode inserir seu código de país."})
    }
    if (erros.length > 0) {
      res.render("cliente/cadastroCliente", {
        erros: erros,
        title: 'cadastroCliente',
      });
    } else {
      const cliente = {
        nome: req.body.nome,
        sobrenome: req.body.sobrenome,
        email: req.body.email,
        telefone: req.body.telefone,
      };
      new Cliente(cliente)
        .save()
        .then(() => {
          req.flash("success_msg", "Cliente salvo com sucesso!");
          res.redirect("/");
        })
        .catch((erro) => {
          req.flash("error_msg", `Erro ao salvar: ${erro}`);
          res.redirect("/");
        });
    }
  }
  static updateCliente(req, res) {
    Cliente.findOne({ _id: req.body.id }).then((cliente) => {
        res.render("cliente/editarCliente", {
          cliente: cliente,
          title: 'administracao',
        });
      })
      .catch((erro) => {
        req.flash("error_msg", "Cliente inexistente.");
        res.redirect("/clientes");
      });
  }
  static updateClientePost(req, res) {
    var erros = [];
    if(!req.body.nome || req.body.nome.length < 3 || typeof req.body.nome == undefined || req.body.nome == null){
      erros.push({texto: "Nome inválido, certifique-se de que preencheu o campo corretamente."})
    }
    if(!req.body.sobrenome || req.body.sobrenome.length < 3 || typeof req.body.sobrenome == undefined || req.body.sobrenome == null){
        erros.push({texto: "Sobrenome inválido, certifique-se de que preencheu o campo corretamente."})
    }
    if(!req.body.email || typeof req.body.email == undefined || req.body.email == null || req.body.email.indexOf("@") == -1){
        erros.push({texto: "E-mail inválido, certifique-se de que preencheu o campo corretamente."})
    }
    if(!req.body.telefone || typeof req.body.telefone == undefined || req.body.telefone == null){
        erros.push({texto: "Telefone inválido, certifique-se de que preencheu o campo corretamente."})
    }
    else if(req.body.telefone.length != 11 && req.body.telefone.length != 13){
        erros.push({texto: "Seu telefone deve ter onze (11) ou treze (13) dígitos, certifique-se que colocar seu DDD, você também pode inserir seu código de país."})
    }
    const clienteUpdate = {
      nome: req.body.nome,
      sobrenome: req.body.sobrenome,
      email: req.body.email,
      telefone: req.body.telefone,
    };
    if(erros.length > 0){
      Cliente.findOne({ where: { id } }).then(client => {
          res.render("editarCliente", {
            erros: erros,
            form: client,
          })
      })
    }else{ 
      Cliente.updateOne({ _id: req.body.id }, clienteUpdate).then(() => {
          req.flash("success_msg", "Cliente editado com sucesso!");
          res.redirect("/clientes");
        }).catch((erro) => {
          req.flash("error_msg", `Erro ao editar: ${erro}`);
          res.redirect("/clientes");
        });
      }
  }

  static deletarCliente(req, res) {
    Cliente.remove({ _id: req.body.id })
      .then(() => {
        req.flash("success_msg", `Cliente excuído com sucesso!`);
        res.redirect("/clientes");
      })
      .catch((erro) => {
        req.flash("error_msg", `Erro ao deletar cliente: ${erro}`);
        res.redirect("/clientes");
      });
  }
};
