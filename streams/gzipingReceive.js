const http = require('http');const fs = require('fs');const zlib = require('zlib');const crypto = require('crypto');const server = http.createServer((req, res) => {	const filename = req.headers.filename;	req		.pipe(crypto.createDecipher('aes192', 'secret'))		.pipe(zlib.createGunzip())		.pipe(fs.createWriteStream(`./streams/_${filename}`))		.on('finish', () => {			res.writeHead(201, {'Content-Type': 'text/plain'});			res.end('That\'s it\n');			console.log(`File saved _${filename}`);		})	console.log(`File request received: ${filename}`);});server.listen(3000, () => {	console.log('Listening');});