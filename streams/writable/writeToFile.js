const ToFileStream = require('./writable');
const tfs = new ToFileStream();

tfs.write({ path: './fixtures/data1.txt', content: 'Hello world!!!' });
tfs.write({ path: './fixtures/data2.txt', content: 'Node JS!!!' });
tfs.write({ path: './fixtures/data3.txt', content: 'STREAMS!!!' });
tfs.end(() => {
	console.log('all file created');
});