const createError = require('http-errors')
const express = require("express")
const path = require('path')
const app = express()
const port = 8083
const moment = require("moment")
const handlebars = require("express-handlebars")
const logger = require('morgan');
const passport = require('passport')
require('./config/auth')(passport)
const flash = require('connect-flash')
const session = require('express-session')
const cookieParser = require('cookie-parser');

const clienteRouter = require('./routes/ClienteRotas');
const adminRouter = require('./routes/AdminRotas');

app.engine("handlebars", handlebars({
    
    defaultLayout: 'main',
    helpers:{
        formatDate: (date)=>{
            return moment(date).format('DD/MM/YYYY')
        } 
    }
}))

var hbs = require('hbs');
hbs.registerPartials(path.join(__dirname + '/views/partials'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//sessão
app.use(session({
  secret: "medeumaboanotaprof",//Palavra secreta necessária para acessar o sistema 
  resave: true,
  saveUninitialized: true,
  cookie: {
    // A sessão expirará após 10 minutos.
    expires: 600000// Dez minutos em milissegundos
  }
}))

app.use(passport.initialize())
app.use(passport.session())

app.use(flash())

app.use((req, res, next)=>{
    res.locals.success_msg = req.flash('success_msg')// res.locals são variáveis globais, visíveis em todo o projeto 
    res.locals.error_msg = req.flash('error_msg')
    res.locals.error = req.flash("error")
    res.locals.user = req.user || null // req.user criado pelo passport
    next()
})

app.use('/', clienteRouter);
app.use('/administrador', adminRouter);

app.get('/', (req, res)=>{
    res.render('index')
})

app.use(function(req, res, next) {
    next(createError(404));
});

app.use(function(err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    res.status(err.status || 500);
    res.render('error');
});

hbs.registerHelper( "when",function(operand_1, operator, operand_2, options) {
    var operators = {
     'eq': function(l,r) { return l == r; },
     'noteq': function(l,r) { return l != r; },
     'gt': function(l,r) { return Number(l) > Number(r); },
     'or': function(l,r) { return l || r; },
     'and': function(l,r) { return l && r; },
     '%': function(l,r) { return (l % r) === 0; }
    }
    , result = operators[operator](operand_1,operand_2);
  
    if (result) return options.fn(this);
    else  return options.inverse(this);
  });
  
module.exports = app;



app.listen(port, function() {
    console.log("Servidor rodando.")
})