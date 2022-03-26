const mongo = require("mongoose");
const opn = require("opn");

mongo.Promise = global.Promise;

mongo
  .connect("mongodb://localhost/Entrega4", {
    //useMongoClient: true
  })
  .then(() => {
    console.log(
      "********* Conectado ao Banco de Dados NoSQL MongoDB ****************"
    );
    console.log("http://localhost:8083");
    opn("http://localhost:8083");
  })
  .catch((erro) => {
    console.log("Erro ao conectar ao MongoDB" + erro);
  });

module.exports = mongo;
