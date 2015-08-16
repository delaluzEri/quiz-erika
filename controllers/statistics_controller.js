var models = require('../models/models.js');

var statistics = {
	quizes: 0,
	comments: 0,
	commentsUnpublished: 0,
	commentedQuizes: 0,
};

var errors = [];

exports.calculate = function(req, res, next){
	models.Quiz.count()
	.then(function(numQuizes){ // numero de preguntas
		statistics.quizes = numQuizes;
		return models.Comment.count();
	})
	.then(function(numComments){ // numero de comentarios
		statistics.comments = numComments;
		return models.Comment.countUnpublished();
	})
	.then(function(numUnpublished){
		statistics.commentsUnpublished = numUnpublished;
		return models.Comment.countCommentedQuizes();
	})
	.then(function(numCommented){
		statistics.commentedQuizes = numCommented;
	})
	.catch(function(err){errors.push(err);})
	.finally(function(){
		next();
	});
};

// GET /quizes/statistics
exports.show = function(req, res){
	res.render('statistics/show', {statistics: statistics, errors: errors});
};