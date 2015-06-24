/**
 * Created by Erika on 04/06/2015.
 */
var models = require('../models/models');

//Autolad - factoriza el código si ruta incluhe :quizId
exports.load = function(req, res, next, quizId) {
  models.Quiz.find(quizId).then(
      function(quiz) {
          if(quiz) {
              req.quiz = quiz;
              next();
          } else {next(new Error('No existe quizId=' + quizId));}
      }
  ).catch(function(error) {next(error);});
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
        res.render("quizes/index",{quizes:quizes, search:req.query.search});
    }).catch(function(error){next(error)});
};

//  GET /quizes/:id
exports.show = function(req, res){
    res.render('quizes/show', {quiz: req.quiz});
};

//  GET /quizes/:id/answer
exports.answer = function(req, res) {
    var resultado = 'Incorrecto';
<<<<<<< HEAD
=======
    //  if(req.query.respuesta.toUpperCase() === req.quiz.respuesta.toUpperCase()){
>>>>>>> 324cb5fd95d24d6cc057048e02db4043d722ed7e
    if(req.query.respuesta === req.quiz.respuesta){
        resultado = 'Correcto';
    }
    res.render('quizes/answer', {quiz: req.quiz, respuesta: resultado});
};

<<<<<<< HEAD
// GET /quizes/new
exports.new = function(req, res) {
  var quiz = models.Quiz.build(
    {pregunta: "Pregunta", respuesta: "Respuesta"}
  );

  res.render('quizes/new', {quiz: quiz});
};

// POST /quizes/create
exports.create = function(req, res) {
  var quiz = models.Quiz.build( req.body.quiz );

// guarda en DB los campos pregunta y respuesta de quiz
    quiz.save({fields: ["pregunta", "respuesta"]}).then(function(){
        res.redirect('/quizes');
    })   // res.redirect: Redirección HTTP a lista de preguntas
=======
//  GET /quizes/new
exports.new = function(req, res) {
    var quiz = models.Quiz.build(
        {pregunta: 'Pregunta', respuesta: 'Respuesta'}  
    );
    res.render('quizes/new', {quiz: quiz});
};

//  POST /quizes/create
exports.create = function (req, res) {
    var quiz = models.Quiz.build( req.body.quiz);

    //guarda en DB los campos pregunta y respuesta de quiz
    quiz.save({fields: ['pregunta', 'respuesta']}).then(function(){
        res.redirect('/quizes');
    }) //   res.redirect: Redirección HTTP a lista de preguntas
>>>>>>> 324cb5fd95d24d6cc057048e02db4043d722ed7e
};