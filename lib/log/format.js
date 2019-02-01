const color = require('./colors');

const theme = {
	error: text => color.bg.red(color.black(text)),
	warning: text => color.bg.yellow(color.black(text)),
	typesetting: text => color.bg.blue(color.black(text))
};

const format = logs => {
	let text = ``;

	for(const {level, line, file, message, content} of logs){
		let _ = theme[level];

		const banner = _(` ${level} `);
		let at = !file ? `` : file + (!line ? `` : `@${line}`);

		text += `[${color.underscore(color.dim(at))}]\n${banner} ${message}${(content && content.length) ? `\n${content.strip()}` : ``}\n`;
	}

	return text;
};

module.exports = ({all, errors, warnings, typesetting}) =>
	errors.length ? 
		format(errors)
	:
		format([...typesetting, ...warnings]);

// line        : null,
// file        : this.currentFilePath,
// level       : "error",
// message     : this.currentLine.slice(2),
// content     : "",

// var all         = [];
// var errors      = [];
// var warnings    = [];
// var typesetting = [];