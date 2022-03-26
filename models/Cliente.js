const mongoose = require("../db/bancoMongoDB");
const Schema = mongoose.Schema;

const Cliente = new Schema({
  nome: {
    type: String,
    required: true,
  },
  sobrenome: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  telefone: {
    type: String,
    required: true,
  },
});
//Cliente.sync({force: true})

mongoose.model("clientes", Cliente);
