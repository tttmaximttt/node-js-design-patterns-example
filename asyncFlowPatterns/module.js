const fs = require('fs');

function loadModule(filename, module, require) {
	const wrappedSrc = `(function (module, exports, require) {
		${fs.readFileSync(filename, 'utf-8')}
	})(module, module.exports, require);`;
	eval(wrappedSrc);
}

/* REQUIRE */
const require = (moduleName) => {
	console.log(`require invoked for module ${moduleName}`);
	const id = require.resolve(moduleName);
	
	if (require.cache[id]) {
		return require.cache[id].exports;
	}
	
	// module metadata
	const module = {
		exports: {},
		id: id // path to file
	};
	
	// update cache
	require.cache[id] = module;
	
	// load module
	loadModule(id, module, require);
	
	// return exported variable
	return module.exports;
};

require.cache = {};
require.resolve = (moduleName) => {};
/* REQUIRE END */
// TODO PAGE 50 MODULE DEFINE