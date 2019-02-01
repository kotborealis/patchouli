module.exports = {
	reset: text => "\x1b[0m" + (text ? text : ""),
	bright: text => "\x1b[1m" + (text ? text : "") + "\x1b[0m",
	dim: text => "\x1b[2m" + (text ? text : "") + "\x1b[0m",
	underscore: text => "\x1b[4m" + (text ? text : "") + "\x1b[0m",
	blink: text => "\x1b[5m" + (text ? text : "") + "\x1b[0m",
	reverse: text => "\x1b[7m" + (text ? text : "") + "\x1b[0m",
	hidden: text => "\x1b[8m" + (text ? text : "") + "\x1b[0m",

	black: text => "\x1b[30m" + text + "\x1b[0m",
	red: text => "\x1b[31m" + (text ? text : "") + "\x1b[0m",
	green: text => "\x1b[32m" + (text ? text : "") + "\x1b[0m",
	yellow: text => "\x1b[33m" + (text ? text : "") + "\x1b[0m",
	blue: text => "\x1b[34m" + (text ? text : "") + "\x1b[0m",
	magenta: text => "\x1b[35m" + (text ? text : "") + "\x1b[0m",
	cyan: text => "\x1b[36m" + (text ? text : "") + "\x1b[0m",
	white: text => "\x1b[37m" + (text ? text : "") + "\x1b[0m",

	bg: {
		black: text => "\x1b[40m" + text + "\x1b[0m",
		red: text => "\x1b[41m" + (text ? text : "") + "\x1b[0m",
		green: text => "\x1b[42m" + (text ? text : "") + "\x1b[0m",
		yellow: text => "\x1b[43m" + (text ? text : "") + "\x1b[0m",
		blue: text => "\x1b[44m" + (text ? text : "") + "\x1b[0m",
		magenta: text => "\x1b[45m" + (text ? text : "") + "\x1b[0m",
		cyan: text => "\x1b[46m" + (text ? text : "") + "\x1b[0m",
		white: text => "\x1b[47m" + (text ? text : "") + "\x1b[0m",
	}
};