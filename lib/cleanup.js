const fs = require('fs');
const config = require('./config');

module.exports = targets => {
    if(!config.args['keep-sources']){
        targets.forEach(_ => fs.unlink(_, () => null));
    }
};