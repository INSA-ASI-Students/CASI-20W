var express = require('express');

var app = express();

var Datastore = require('nedb');
//  , db = new Datastore();
db = {};
db.tasks = new Datastore("./tasks.db");
db.tasks.loadDatabase();

db.taskLists = new Datastore("./taskLists.db");
db.taskLists.loadDatabase();

db.users = new Datastore("./users.db");
db.users.loadDatabase();

var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));


//var Task = require('./objects/Task.js');

// compte le nombre de de taches
// db.tasks.count({}, function (err, count) {
//   console.log(count);
// });


// ajout d'une tache
app.post('/task', function(req, res){
  console.log(req.body);
  db.tasks.insert(req.body, function (err, newDoc) {
   // Callback is optional
		if(err){
			res.status(400);
		}else{
			res.status(200).send({_id : newDoc._id});
			console.log('Inserted');
		}
    	
    db.tasks.count({}, function (err, count) {
      console.log(count);
    });
  });
});

// obtention des taches
app.get('/task', function(req, res){
  db.tasks.find({}, function (err, docs) {
		if(err)
			res.status(400);
		else{
			res.setHeader('Content-Type', 'text/json');
    	res.status(200).send(docs);
		}
	});
});

//suppresion d'une tache
// /task/:id
app.delete('/task/:id', function(req, res){
  db.tasks.remove({_id: req.params.id}, function (err, docs) {
		if(err)
			res.status(404);
		else{
			res.status(204);
    	console.log('Removed');
		}
	});
});

app.put("/task", function(req, res){
	db.update({ _id: req.body._id }, {$set: {"title": req.body.title, "description": req.body.description, "taskListId" : req.body.taskListId}}, {}, function (err, numReplaced) {
		if(err){
			res.status(400);
		}else{
			res.status(200);
			console.log('Updated');
		}
	});
});


// ajout d'une liste de taches
app.post('/taskList', function(req, res){
  console.log(req.body);
  db.taskLists.insert(req.body, function (err, newDoc) {   // Callback is optional
    if(err){
			res.status(400);
		}else{
			res.status(200).send({_id : newDoc._id});
			console.log('Inserted');
		}
    db.taskLists.count({}, function (err, count) {
      console.log(count);
    });
  });
});

// obtention des listes de taches
app.get('/taskList', function(req, res){
  db.taskLists.find({}, function (err, docs) {
		if(err)
			res.status(400);
		else{
			res.setHeader('Content-Type', 'text/json');
    	res.status(200).send(docs);
		}
	});
});


//suppresion d'une liste de taches
// /taskList/:id
app.delete('/taskList/:id', function(req, res){
  db.taskLists.remove({_id: req.params.id}, function (err, docs) {
    if(err)
			res.status(404);
		else{
			res.status(204);
    	console.log('Removed');
		}
	});
});



// ajout d'un user
app.post('/user', function(req, res){
  console.log(req.body);
  db.users.insert(req.body, function (err, newDoc) {   // Callback is optional
    if(err){
			res.status(400);
		}else{
			res.status(200).send({_id : newDoc._id});
			console.log('Inserted');
		}
    db.users.count({}, function (err, count) {
      console.log(count);
    });
  });
});

// obtention des users
app.get('/user', function(req, res){
  db.users.find({}, function (err, docs) {
		if(err)
			res.status(400);
		else{
			res.setHeader('Content-Type', 'text/json');
    	res.status(200).send(docs);
		}
	});
});

//suppresion d'un user
// /user/:id
app.delete('/user/:id', function(req, res){
  db.users.remove({_id: req.params.id}, function (err, docs) {
    if(err)
			res.status(404);
		else{
			res.status(204);
    	console.log('Removed');
		}
	});
});




app.listen(8080);
