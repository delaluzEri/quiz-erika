/**
 * Created by Erika on 15/08/2015.
 */
var models = require('../models/models');

// GET /quizes/:quizId/comments/new
exports.new = function(req, res) {
  res.render('comments/new.ejs', {quizid: req.params.quizId, errors: []});
};

// POST /quizes/:quizId/comments
exports.create = function(req, res) {
  var comment = models.Comment.build(
      { texto: req.body.comment.texto,
        QuizId: req.params.quizId
        });
    var errors = comment.validate();
  /*comment
  .validate()
  .then(
    function(err){
      if (err) {
        res.render('comments/new.ejs', {comment: comment, errors: err.errors});
      } else {
        comment // save: guarda en DB campo texto de comment
        .save()
        .then( function(){ res.redirect('/quizes/'+req.params.quizId)})
      }      // res.redirect: Redirección HTTP a lista de preguntas
    }
  ).catch(function(error){next(error)});*/
    if (errors){
        var i=0; var errores = new Array();
        for (var prop in errors) errores[i++] = {message: errors[prop]};
        res.render('comments/new.ejs', {comment: comment, errors: errores});
    } else {
        comment
            .save()
            .then( function(){ res.redirect('/quizes/'+req.params.quizId)})
    }

};