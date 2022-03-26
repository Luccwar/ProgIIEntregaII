const express = require('express');
const router = express.Router();

const AdminController = require('../controllers/AdminController')

const { usuarioAdmin } = require("../helpers/usuarioAdmin")//{ usuarioAdmin } este objeto está pegando somente a função usuarioAdmin


router.get('/', usuarioAdmin,  AdminController.inicialAdmin)
router.get('/registro', usuarioAdmin,   AdminController.registroAdmin)
router.post('/registroAdminPost', usuarioAdmin,  AdminController.registroAdminPost)
router.get('/lista', usuarioAdmin,  AdminController.listarAdmin)
router.post('/deletarAdmin', usuarioAdmin, AdminController.deletarAdmin)
// 
router.get('/login', AdminController.login)
router.post('/loginPost',  AdminController.loginPost)
// 
router.get('/sair', usuarioAdmin, AdminController.sair)
router.post('/editarAdmin', usuarioAdmin, AdminController.updateAdmin)
router.post('/editarAdminPost', usuarioAdmin, AdminController.updateAdminPost)


module.exports = router;
