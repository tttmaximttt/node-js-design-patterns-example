/*unleashing Zalgo*/
const readFile = require('fs').readFile;
const cache = {};

function inconsistentRead(filendame, cb) {
	if (cache[filendame]) {
		process.nextTick(() => { // or can be using setImmediate() run behind any I/O
			cb(cache[filendame]);
		});
	} else {
		readFile(filendame, 'utf-8', (err, data) => {
			cache[filendame] = data;
			cb(data);
		});
	}
}

function createFileReader(filename) {
	const listeners = [];
	inconsistentRead(filename, data => {
		listeners.forEach(listener => listener(data));
	});

	return {
		onDataReady: listener => listeners.push(listener)
	}
}

const reader1 = createFileReader('./fixtures/data.txt');
reader1.onDataReady(data => {
	console.log('reader1', data);

	const reader2 = createFileReader('./fixtures/data.txt');
	reader2.onDataReady(data2 => {
		console.log('reader2', data2);
	})
});