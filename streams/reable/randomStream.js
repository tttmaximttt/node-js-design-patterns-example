const RandomStream = require('./readableStream');
const randomStream = new RandomStream();

randomStream
	.on('readable', () => {
		let chunk;
		console.log('New data available.');
		while((chunk = randomStream.read()) !== null) {
			console.log(
				`Chunk read: (${chunk.length}) "${chunk.toString()}"`
			);
		};
	});