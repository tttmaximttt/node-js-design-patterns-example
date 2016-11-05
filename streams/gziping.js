/* Bad case using of gzip, because when file is bigger than 1GB we will have an RangeError Error
	const fs = require('fs');
	const zlib = require('zlib');

	const file = process.argv[2];

	fs.readFile(file, (err, buffer) => {
		zlib.gzip(buffer, (err, buffer) => {
			fs.writeFile(`${file}.gz`, buffer, (err) => {
				console.log('File successfully compressed');
			});
		});
	});
*/

/* Good case with using streams */

const fs = require('fs');
const zlib = require('zlib');

const file = process.argv[2];

fs.createReadStream(file)
	.pipe(zlib.createGzip())
	.pipe(fs.createWriteStream(`${file}.gz`))
	.on('finish', () => {console.log('File successfully compressed');});

// TODO 149