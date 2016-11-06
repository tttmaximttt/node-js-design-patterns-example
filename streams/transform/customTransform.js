const stream = require('stream');
const utils = require('util');

class ReplaceStream extends stream.Transform {
	constructor(searchString, replaceString) {
		super();
		this.searchString = searchString;
		this.reaplaceString = replaceString;
		this.tailPiece = '';
	}

	_transform(chunk, encoding, callback) {
		// TODO 181
	}
}