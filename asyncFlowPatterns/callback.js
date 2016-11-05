console.log(1);
function makeSomethingWithArgs(a, b, callback) {
	setTimeout(() => {
		console.log(callback(a, b));
	}, 1000);
};
console.log(2);
makeSomethingWithArgs(2, 2, (a, b) => {
	return a + b;
});
console.log(3);