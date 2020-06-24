const {exec} = require('child_process');
const fs = require('fs');
const assert = require('assert');

const run = (cmd) => new Promise((resolve) =>
    exec(cmd.replace(/\n/g, '\\\n'), (error, stdout, stderr) =>
        resolve({stdout, stderr, exitCode: error ? error.code : 0}))
);

describe('document generation', () => {
    describe('tex', () => {
        it('runs without errors', async function () {
            this.timeout(100000);
            const {exitCode} = await run('cd test/integration/env && patchouli --type=tex');
            assert.equal(exitCode, 0);
        });

        it('renders as in the reference', async () => {
            const {exitCode} = await run(`
                cmp
                ./test/integration/fixtures/reference_build.tex
                ./test/integration/env/build.tex
            `);
            assert.equal(exitCode, 0);

            fs.createReadStream('./test/integration/fixtures/reference_build.tex')
                .pipe(fs.createWriteStream('./test/integration/artifacts/reference_build.tex'));

            fs.createReadStream('./test/integration/env/build.tex')
                .pipe(fs.createWriteStream('./test/integration/artifacts/build.tex'));
        });
    });

    describe('pdf', () => {
        it('runs without errors', async function () {
            this.timeout(100000);
            const {exitCode} = await run('cd test/integration/env && patchouli --type=pdf');
            assert.equal(exitCode, 0);
        });

        fs.createReadStream('./test/integration/fixtures/reference_build.pdf')
            .pipe(fs.createWriteStream('./test/integration/artifacts/reference_build.pdf'));

        fs.createReadStream('./test/integration/env/build.pdf')
            .pipe(fs.createWriteStream('./test/integration/artifacts/build.pdf'));

        it('renders as in the reference', async () => {
            const {stderr} = await run(`
                compare
                ./test/integration/fixtures/reference_build.pdf
                ./test/integration/env/build.pdf
                -compose src
                -metric AE
                ./test/integration/artifacts/diff.pdf
            `);
            assert.equal(stderr.trim(), '0');
        });
    });

    describe('html', () => {
        it('runs without errors', async function () {
            this.timeout(100000);
            const {exitCode} = await run('cd test/integration/env && patchouli --type=html');
            assert.equal(exitCode, 0);
        });

        fs.createReadStream('./test/integration/fixtures/reference_build.html')
            .pipe(fs.createWriteStream('./test/integration/artifacts/reference_build.html'));

        fs.createReadStream('./test/integration/env/build.html')
            .pipe(fs.createWriteStream('./test/integration/artifacts/build.html'));

        it('renders as in the reference', async () => {
            const {exitCode} = await run(`
                cmp
                ./test/integration/fixtures/reference_build.html
                ./test/integration/env/build.html
            `);
            assert.equal(exitCode, 0);
        });
    });

    describe('revealjs', () => {
        it('runs without errors', async function () {
            this.timeout(100000);
            const {exitCode} = await run('cd test/integration/env && patchouli --type=revealjs');
            assert.equal(exitCode, 0);
        });

        fs.createReadStream('./test/integration/fixtures/reference_build.revealjs.html')
            .pipe(fs.createWriteStream('./test/integration/artifacts/reference_build.revealjs.html'));

        fs.createReadStream('./test/integration/env/build.revealjs.html')
            .pipe(fs.createWriteStream('./test/integration/artifacts/build.revealjs.html'));

        it('renders as in the reference', async () => {
            const {exitCode} = await run(`
                cmp
                ./test/integration/fixtures/reference_build.revealjs.html
                ./test/integration/env/build.revealjs.html
            `);
            assert.equal(exitCode, 0);
        });
    });
});