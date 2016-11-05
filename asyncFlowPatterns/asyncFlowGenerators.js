function asyncStaff(generatorFunction) {
	function callback(err) {
		if (err) return generator.throw(err);

		const result = [].slice.call(arguments, 1);
		generator.next(result.length > 1 ? result : result[0]);
	}

	const generator = generatorFunction(callback);
	generator.next();
}

const fs = require('fs');
const path = require('path');

asyncStaff(function* (callback) {
	const filename = path.basename(__filename);
	const myself = yield fs.readFile(filename, 'utf-8', callback);
	yield fs.writeFile(`clone_of_${filename}`, myself, callback);
	console.log('Clone created');
});