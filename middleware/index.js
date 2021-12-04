const restify = require('restify');
const corsMiddleware = require('restify-cors-middleware');

const cors = corsMiddleware({
	preflightMaxAge: 5,
	origins: ['*']
});

const server = restify.createServer({
	name: 'Teste Prático'
});

server.use(restify.plugins.bodyParser());
server.use(restify.plugins.queryParser());
server.pre(cors.preflight);
server.use(cors.actual);

const mysql = require('mysql');

const connectionUri = {
    host: 'localhost',
    user: 'root',
    password: 'rootroot',
    database: 'C216-L1'
};

function insert(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('content-type','application/json');
	res.charSet('UTF-8');
	
	let encomenda = {
		origem : req.body.origem,
		destino : req.body.destino,
		peso : req.body.peso,
		data : req.body.data
	};

	let connection = mysql.createConnection(connectionUri);
	let strQuery = `INSERT INTO encomenda (origem, destino, peso, data) VALUES` +
	        	   `('${encomenda.origem}', '${encomenda.destino}', '${encomenda.peso}', '${encomenda.data}');`
	console.log(strQuery);
	connection.query(strQuery, function(err, rows, fields) {
		if (!err) {
			res.json(rows);
		} else {
			res.json(err);
		}
	});
	connection.end();
};

function list(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('content-type','application/json');
	res.charSet('UTF-8');

	let connection = mysql.createConnection(connectionUri);
	let strQuery = 'SELECT * FROM encomenda;';
	console.log(strQuery);
	connection.query(strQuery, function(err, rows, fields) {
		if (!err) {
			res.json(rows);
		} else {
			res.json(err);
		}
	});
	connection.end();
};

function update(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('content-type','application/json');
	res.charSet('UTF-8');

	let encomenda = {
		id : req.body.id,
		origem : req.body.origem,
		destino : req.body.destino,
		peso : req.body.peso,
		data : req.body.data
	};

	let connection = mysql.createConnection(connectionUri);
	let strQuery = `UPDATE encomenda SET ` + 
	                `origem = '${encomenda.origem}', ` +
					`destino = '${encomenda.destino}', ` +
					`peso = '${encomenda.peso}', ` +
					`data = '${encomenda.data}' ` +
					`WHERE id = '${encomenda.id}';`
	
	console.log(strQuery);
	connection.query(strQuery, function(err, rows, fields) {
		if (!err) {
			res.json(rows);
		} else {
			res.json(err);
		}
	});
	connection.end();
};

function exclude(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('content-type','application/json');
	res.charSet('UTF-8');

	let connection = mysql.createConnection(connectionUri);
	let strQuery = `DELETE FROM encomenda WHERE id = '${req.body.id}';`
	
	console.log(strQuery);
	connection.query(strQuery, function(err, rows, fields) {
		if (!err) {
			res.json(rows);
		} else {
			res.json(err);
		}
	});
	connection.end();
};

function search(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('content-type','application/json');
	res.charSet('UTF-8');
	
	let connection = mysql.createConnection(connectionUri);
	let strQuery = `SELECT * FROM encomenda WHERE id = ${req.query.id};`
	console.log(strQuery);
	connection.query(strQuery, function(err, rows, fields) {
		if (!err) {
			res.json(rows);
		} else {
			res.json(err);
		}
	});
	connection.end();
};

const prefix = '/encomenda';

server.post(prefix + '/insert', insert);
server.get(prefix + '/list', list);
server.put(prefix + '/update', update);
server.del(prefix + '/exclude', exclude);
server.get(prefix + '/search', search);

const port = process.env.PORT || 5001;

server.listen(port, function() {
	console.log('%s running', server.name);
});