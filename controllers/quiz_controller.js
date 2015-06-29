/**
 * Created by Erika on 04/06/2015.
 */
var models = require('../models/models');

//Autolad :id
exports.load = function(req, res, next, quizId) {
  models.Quiz.find(quizId).then(
      function(quiz) {
          if(quiz) {
              req.quiz = quiz;
              next();
          } else{next(new Error('No existe quizId=' + quizId))}
      }
  ).catch(function(error){next(error)});
};

//  GET /quizes
exports.index = function(req, res){
    var search="%";
    if(req.query.search && req.query.search.trim().length>0){
    	search=req.query.search.replace(/\s/g,"%");
    	search="%"+search+"%";
    	search=search.toUpperCase();
    }
    models.Quiz.findAll({where:["upper(pregunta) like ?",search], order:"pregunta" }).then(function(quizes){
        res.render("quizes/index.ejs",{quizes:quizes, search:req.query.search, errors: []});
    }).catch(function(error){next(error)});
};

//  GET /quizes/:id
exports.show = function(req, res){
    res.render('quizes/show', {quiz: req.quiz, errors: []});
};

//  GET /quizes/:id/answer
exports.answer = function(req, res) {
    var resultado = 'Incorrecto';
    if(req.query.respuesta === req.quiz.respuesta){
        resultado = 'Correcto';
    }
    res.render(
        'quizes/answer',
        {   quiz: req.quiz,
            respuesta: resultado,
            errors:[]
        });
};

// GET /quizes/new
exports.new = function(req, res) {
  var quiz = models.Quiz.build( //crea objeto Quiz
    {pregunta: "Pregunta", respuesta: "Respuesta"}
  );

  res.render('quizes/new', {quiz: quiz, errors: []});
};

// POST /quizes/create
exports.create = function(req, res) {
    var quiz = models.Quiz.build( req.body.quiz );

    var errors = quiz.validate();
    /*.then( // then no funcion� con validate
        function(err){
          if(err){
              res.render('quizes/new', {quiz: quiz, errors: err.errors});
          } else {
              quiz //save : guarda en DB campos pregunta y respuesta de quiz
              .save({fields: ['pregunta', 'respuesta']})
              .then( function() { res.redirect('/quizes')})
          } //res.redirect: Redirecci�n HTTP a lsita de preguntas
        }
    );*/
    if (errors)
    {
        var i=0; var errores=new Array();//se convierte en [] con la propiedad message por compatibilidad con layout
        for (var prop in errors) errores[i++]={message: errors[prop]};
        res.render('quizes/new', {quiz: quiz, errors: errores});
    } else {
        quiz // save: guarda en DB campos pregunta y respuesta de quiz
            .save({fields: ["pregunta", "respuesta"]})
            .then( function(){ res.redirect('/quizes')}) ;
    }
};