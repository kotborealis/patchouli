const fs = require('fs');

module.exports = (files, dest) => {
    fs.unlink(dest, () =>
        fs.writeFileSync(dest, files
            .filter(_ => fs.existsSync(_))
            .map(_ => fs.readFileSync(_))
            .map(_ => _.toString())
            .join('\n\n'))
    );
};