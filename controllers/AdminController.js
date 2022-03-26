const mongoose = require("mongoose");
require("../models/Admin");
const Admin = mongoose.model("admin");
const bcrypt = require("bcryptjs");
const passport = require("passport");

module.exports = class AdminController {
  static inicialAdmin(req, res) {
    res.render("administrador/inicialAdmin", {
      user: req.user, // get the user out of session and pass to template
      title: 'administracao',
    });
    console.log(req.user);
  }

  static registroAdmin(req, res) {
    res.render("administrador/registro",{
      title: 'administracao'
    });
  }

  static registroAdminPost(req, res) {
    var erros = [];
    if (
      !req.body.nome ||
      typeof req.body.nome == undefined ||
      req.body.nome == null
    ) {
      erros.push({ texto: "Nome inválido" });
    }
    if (
      !req.body.email ||
      typeof req.body.email == undefined ||
      req.body.email == null
    ) {
      erros.push({ texto: "E-mail inválido" });
    }
    if (
      !req.body.senha ||
      typeof req.body.senha == undefined ||
      req.body.senha == null ||
      req.body.senha < 4
    ) {
      erros.push({
        texto: "Senha inválida ou senha com menos de 4 algarismos",
      });
    }
    if (req.body.senha != req.body.senha2) {
      erros.push({ texto: "Senhas diferentes. Tente novamente" });
    }
    if (erros.length > 0) {
      res.render("administrador/listaAdmin", {
        erros: erros,
        title: 'administracao',
      });
    } else {
      const admin = {
        nome: req.body.nome,
        email: req.body.email,
        senha: req.body.senha,
      };
      bcrypt.genSalt(10, (erro, salt) => {
        bcrypt.hash(admin.senha, salt, (erro, hash) => {
          admin.senha = hash;
          new Admin(admin)
            .save()
            .then(() => {
              req.flash("success_msg", "Administrador salvo com sucesso!");
              res.redirect("/administrador/lista");
            })
            .catch((erro) => {
              req.flash("error_msg", `Erro ao salvar: ${erro}`);
              res.redirect("/administrador/lista");
            });
        });
      });
    }
  }

  static listarAdmin(req, res) {
    Admin.find().then((admin) => {
      res.render("administrador/listaAdmin", {
        admin: admin,
        title: 'administracao',
      });
    });
  }

  static deletarAdmin(req, res) {
    Admin.remove({ _id: req.body.id })
      .then(() => {
        req.flash("success_msg", `Administrador excuído com sucesso!`);
        res.redirect("/administrador/lista");
      })
      .catch((erro) => {
        req.flash("error_msg", `Erro ao deletar administrador: ${erro}`);
        res.redirect("/administrador/lista");
      });
  }

  static updateAdmin(req, res) {
    Admin.findOne({ _id: req.body.id })
      .then((admin) => {
        res.render("administrador/editarAdmin", {
          admin: admin,
          title: 'administracao',
        });
      })
      .catch((erro) => {
        req.flash("error_msg", "Admin inexistente.");
        res.redirect("/administrador");
      });
  }

  static updateAdminPost(req, res) {
    var erros = [];
    if (
      !req.body.senha ||
      typeof req.body.senha == undefined ||
      req.body.senha == null ||
      req.body.senha < 4
    ) {
      erros.push({
        texto: "Senha inválida ou senha com menos de 4 algarismos",
      });
    }
    if (req.body.senha != req.body.senha2) {
      erros.push({ texto: "Senhas diferentes. Tente novamente" });
    }
    if (erros.length > 0) {
      res.render("administrador/listaAdmin", { erros: erros });
    } else {
      const adminUpdate = {
        nome: req.body.nome,
        email: req.body.email,
        senha: req.body.senha,
      };
      bcrypt.genSalt(10, (erro, salt) => {
        bcrypt.hash(adminUpdate.senha, salt, (erro, hash) => {
          adminUpdate.senha = hash;
          Admin.updateOne({ _id: req.body.id }, adminUpdate)
            .then(() => {
              req.flash("success_msg", "Administrador editado com sucesso!");
              res.redirect("/administrador/lista");
            })
            .catch((erro) => {
              req.flash("error_msg", `Erro ao salvar: ${erro}`);
              res.redirect("/administrador/lista");
            });
        });
      });
    }
  }

  static login(req, res) {
    res.render("administrador/login",{
      title: 'login'
    });
  }
  static loginPost(req, res, next) {
    passport.authenticate("local", {
      successRedirect: "/administrador",
      failureRedirect: "/administrador/login", 
      failureFlash: true, 
    })(req, res, next);
  }

  static sair(req, res) {
    req.logout();
    req.flash("success_msg", "Administrador deslogado");
    res.redirect("/");
  }

};
