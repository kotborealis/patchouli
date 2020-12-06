const debug = require('debug')("patchouli:concat_markdown");
const {
    existsSync,
    readFileSync,
    unlink,
    writeFileSync
} = require('fs');

module.exports = (files, dest, middleware = []) => new Promise((resolve) => {
    unlink(dest, async () => {
        let data = files
            .filter(_ => existsSync(_))
            .map(_ => readFileSync(_))
            .map(_ => _.toString())
            .join('\n\n');

        for await (const mw of middleware){
            debug("Applying mw", mw);
            data = await mw(data);
            debug("Done");
        }

        writeFileSync(dest, data);
        resolve();
    });
});