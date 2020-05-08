const path = require('path');
const config = require('./config');
const debug = require('./debug').extend('outputFilename');

module.exports = (filename, type) => {
	const basename = path.join(path.dirname(filename), path.parse(filename).name);

    let output = 
    	`${basename}.${config.output_ext_mapping[type] || type}`;

    if(output && path.isAbsolute(output))
        output = path.relative(process.cwd(), output);

    debug("outputFilename output", {filename, type, output});

    return output;
};
