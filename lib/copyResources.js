function copyResources() {
    const args = require('chen.js').args();
    const fs = require('fs');
    const {dirname, resolve} = require('path');
    const resourcesDir = resolve(dirname(require.resolve('../')), 'resources');
    const configDir = resolve(require('os').homedir(), '.patchouli');

    if(!fs.existsSync(configDir))
        fs.mkdirSync(configDir);

    fs.readdirSync(resourcesDir).forEach((file) => {
        const source = resolve(resourcesDir, file);
        const target = resolve(configDir, file);

        console.log(`Copying ${source} => ${target}`);

        if(fs.existsSync(target) && !args['copy-resources-force']){
            console.warn(`Conflict: ${target} already exists, use --copy-resources-force to overwrite. Skipping.`);
            return;
        }

        fs.copyFileSync(source, target);
    });
}

module.exports = {copyResources};