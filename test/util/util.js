const {exec} = require('child_process');

const runCmd = (cmd) => new Promise((resolve) =>
    exec(cmd.replace(/\n/g, '\\\n'), (error, stdout, stderr) =>
        resolve({stdout, stderr, exitCode: error ? error.code : 0}))
);

module.exports = {runCmd};