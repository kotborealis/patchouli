function showVersion() {
    const package_info = require('../package.json');
    console.log(`
${package_info.name} \t v.${package_info.version}
\t* github: \t ${package_info.repository.url}
\t* author: \t ${package_info.author}
    `.trim());
}

function showUsage() {
    const {dirname, resolve} = require('path');
    console.log(`
Patchouli: converts markdown files in working directory to specified type.
Uses .patchouli.js from working directory as config,
see ${resolve(dirname(require.resolve('../')), '.patchouli.js')} for reference
Usage:
\t-v, --version \t\t View version info.
\t-h, --help \t\t View this guide.
\t-t=name, --type=name \t Convert markdown to specified type.
\t\t\t\t Supports: tex, pdf, revealjs, html, docx
\t--config=file \t\t Specify full path to configuration file
\t--copy-resources \t Copy default resources into ~/.patchouli/
\t\t\t\t Runs on installation, needed for rendering documents.
\t--copy-resources-force \t Force-copy default resources into ~/.patchouli/
\t\t\t\t If there's conflicts, you can force copying of new files via this argument
    `.trim());
}

module.exports = {showUsage, showVersion};