var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/client'));
app.use(bodyParser.json());

Genre = require('./models/genre');
Book = require('./models/book');

var port = 3000;
//connect to mongoose
//mongoose.connect('mongodb://localhost/bookstore',{useMongoClient: true; });

mongoose.connect('mongodb://localhost/bookstore', function (err, data){
	if (err) return err;
});
var db = mongoose.connection;

//home page view
app.get('/', function(req, res){
	res.send('Please use /api/books or /api/genres');
});

//api genres view
app.get('/api/genres', function(req, res){
	Genre.getGenres(function(err, genres){
		if (err) return err;
		res.json(genres);
	});
});

//view genre byID
app.get('/api/genres/:_id', function(req, res){
	Genre.getGenreById(req.params._id,function(err, genre){
		if (err) return err;
		res.json(genre);
	});
});

//add a genre
app.post('/api/genres', function(req, res){
	var genre = req.body;
	Genre.addGenre(genre, function(err, genre){
		if (err) return err;
		res.json(genre);
	});
});

//put or update genre
app.put('/api/genres/:_id', function(req, res){
	var id = req.params._id;
	var genre = req.body;
	Genre.updateGenre(id, genre, {},  function(err, genre){
		if (err) return err;
		res.json(genre);
	});
});

//delete genre
app.delete('/api/genres/:_id', function(req, res){
	var id = req.params._id;
	Genre.delGenre(id, function(err, genre){
		if (err) return err;
		res.json(genre);
	});
});

app.get('/api/books', function(req, res){
	Book.getBooks(function(err, books){
		if (err) return err;
		res.json(books);
	});
});

app.get('/api/books/:_id', function(req, res){
	Book.getBookById(req.params._id,function(err, book){
		if (err) return err;
		res.json(book);
	});
});

//add book
app.post('/api/books', function(req, res){
	var book = req.body;
	Book.addBook(book, function(err, book){
		if (err) return err;
		res.json(book);
	});
});

//put or update book
app.put('/api/books/:_id', function(req, res){
	var id = req.params._id;
	var book = req.body;
	Book.updateBook(id, book, {},  function(err, book){
		if (err) return err;
		res.json(book);
	});
});

//delete book
app.delete('/api/books/:_id', function(req, res){
	var id = req.params._id;
	Book.delBook(id, function(err, book){
		if (err) return err;
		res.json(book);
	});
});

app.listen(port);
console.log('Running on port' + port + '....');