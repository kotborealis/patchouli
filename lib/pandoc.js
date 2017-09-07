const pandoc = require('node-pandoc');

module.exports = (...args) => new Promise((resolve, reject) => {
    pandoc(...args, (err, res) => {
        if(err) reject(err);
        else resolve(res);
    });
});