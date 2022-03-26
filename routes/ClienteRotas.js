const express = require('express');
const router = express.Router();

const ClienteController = require('../controllers/ClienteController')

const { usuarioAdmin } = require("../helpers/usuarioAdmin")//{ usuarioAdmin } este objeto está pegando somente a função usuarioAdmin


router.get('/cadastroCliente', ClienteController.cadastroCliente)
router.get('/', ClienteController.paginaInicial)
router.get('/clientes', ClienteController.listarCliente)
router.get('/listaAnimais', ClienteController.listaAnimais)
router.get('/listaBrinquedos', ClienteController.listaBrinquedos)
router.get('/listaHigiene', ClienteController.listaHigiene)
router.post('/cadastrarCliente', ClienteController.cadastrarCliente)
//
router.post('/deletarCliente', usuarioAdmin, ClienteController.deletarCliente)
router.post('/editarCliente', usuarioAdmin, ClienteController.updateCliente)
router.post('/editarClientePost',usuarioAdmin,  ClienteController.updateClientePost)

module.exports = router;
