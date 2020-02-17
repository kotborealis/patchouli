const path = require('path');

module.exports = (filename, type) => {
    let output = `${path.join(path.dirname(filename), path.parse(filename).name)}${path.parse(filename).ext || ('.' + type)}`;
    if(output && path.isAbsolute(output))
        output = path.relative(process.cwd(), output);
    return output;
};
