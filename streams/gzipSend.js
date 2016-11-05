const http = require('http');
const fs = require('fs');
const zlib = require('zlib');
const path = require('path');
const file = process.argv[2];
const server = process.argv[3];
const crypto = require('crypto');

const options = {
	host: server,
	port: 3000,
	path: '/',
	method: 'PUT',
	headers: {
		filename: path.basename(file),
		'Content-Type': 'application/octet-stream',
		'Content-Encoding': 'gzip'
	}
};

const req = http.request(options, (res) => {
	console.log(`Server response: ${res.statusCode}`);
});

fs.createReadStream(file)
	.pipe(zlib.createGzip())
	.pipe(crypto.createCipher('aes192', 'secret'))
	.pipe(req)
	.on('finish', () => {
		console.log('File successfully sent');
	});