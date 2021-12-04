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

// function atualizar(req, res, next) {
// 	res.setHeader('Access-Control-Allow-Origin', '*');
// 	res.setHeader('content-type','application/json');
// 	res.charSet('UTF-8');

// 	let aluno = {
// 		id : req.body.id,
// 		nome : req.body.nome,
// 		curso : req.body.curso,
// 		nascimento : req.body.nascimento
// 	};

// 	let connection = mysql.createConnection(connectionUri);
// 	let strQuery = `UPDATE aluno SET ` + 
// 	                `nome = '${aluno.nome}', ` +
// 					`curso = '${aluno.curso}', ` +
// 					`nascimento = '${aluno.nascimento}' ` +
// 					`WHERE id = '${aluno.id}';`
	
// 	console.log(strQuery);
// 	connection.query(strQuery, function(err, rows, fields) {
// 		if (!err) {
// 			res.json(rows);
// 		} else {
// 			res.json(err);
// 		}
// 	});
// 	connection.end();
// };

// function excluir(req, res, next) {
// 	res.setHeader('Access-Control-Allow-Origin', '*');
// 	res.setHeader('content-type','application/json');
// 	res.charSet('UTF-8');

// 	let connection = mysql.createConnection(connectionUri);
// 	let strQuery = `DELETE FROM aluno WHERE id = '${req.body.id}';`
	
// 	console.log(strQuery);
// 	connection.query(strQuery, function(err, rows, fields) {
// 		if (!err) {
// 			res.json(rows);
// 		} else {
// 			res.json(err);
// 		}
// 	});
// 	connection.end();
// };

const prefix = '/encomenda';

server.post(prefix + '/insert', insert);
server.get(prefix + '/list', list);
// server.put(prefix + '/atualizar', atualizar);
// server.del(prefix + '/excluir', excluir);

const port = process.env.PORT || 5001;

server.listen(port, function() {
	console.log('%s running', server.name);
});