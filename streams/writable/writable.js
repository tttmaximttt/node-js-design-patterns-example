const stream = require('stream');
const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');

class ToFileStream extends stream.Writable {
	constructor() {
		super({ objectMode: true });
	}

	_write(chunc, encoding, callback) {
		mkdirp(path.dirname(chunc.path), err => {
			if (err) {
				return callback(err);
			}

			fs.writeFile(chunc.path, chunc.content, callback);
 		})
	}
}

module.exports = ToFileStream;