//HELPERS são pequenos códigos para axuliar em alguma permissão
// são pequenos middlewares
module.exports = {
  usuarioAdmin: (req, res, next) => {
    if (req.isAuthenticated()) {
      console.log(req.user.email);
      return next();
    } else {
      req.flash("error_msg", "Sem privilégios de administrador");
      res.redirect("/");
    }
  },
};
