const {exec} = require('child_process');
const fs = require('fs');
const assert = require('assert');
const {runCmd} = require('../util/util');

describe('document generation', () => {
    describe('tex', () => {
        it('runCmds without errors', async function() {
            this.timeout(100000);
            const {exitCode} = await runCmd('cd test/integration/env && patchouli --type=tex');
            assert.equal(exitCode, 0);
        });

        it('renders as in the reference', async () => {
            fs.createReadStream('./test/integration/fixtures/reference_build.tex')
                .pipe(fs.createWriteStream('./test/integration/artifacts/reference_build.tex'));

            fs.createReadStream('./test/integration/env/build.tex')
                .pipe(fs.createWriteStream('./test/integration/artifacts/build.tex'));

            const {exitCode} = await runCmd(`
                cmp
                ./test/integration/artifacts/reference_build.tex
                ./test/integration/artifacts/build.tex
            `);
            assert.equal(exitCode, 0);
        });
    });

    describe('pdf', () => {
        it('runCmds without errors', async function() {
            this.timeout(100000);
            const {exitCode} = await runCmd('cd test/integration/env && patchouli --type=pdf');
            assert.equal(exitCode, 0);
        });

        it('renders as in the reference', async function () {
            this.timeout(100000);

            fs.createReadStream('./test/integration/fixtures/reference_build.pdf')
                .pipe(fs.createWriteStream('./test/integration/artifacts/reference_build.pdf'));

            fs.createReadStream('./test/integration/env/build.pdf')
                .pipe(fs.createWriteStream('./test/integration/artifacts/build.pdf'));

            const {stderr} = await runCmd(`
                compare
                ./test/integration/artifacts/reference_build.pdf
                ./test/integration/artifacts/build.pdf
                -compose src
                -metric AE
                ./test/integration/artifacts/diff.pdf
            `);
            assert.equal(stderr.trim(), '0');
        });
    });

    describe('html', () => {
        it('runCmds without errors', async function() {
            this.timeout(100000);
            const {exitCode} = await runCmd('cd test/integration/env && patchouli --type=html');
            assert.equal(exitCode, 0);
        });

        it('renders as in the reference', async () => {
            fs.createReadStream('./test/integration/fixtures/reference_build.html')
                .pipe(fs.createWriteStream('./test/integration/artifacts/reference_build.html'));

            fs.createReadStream('./test/integration/env/build.html')
                .pipe(fs.createWriteStream('./test/integration/artifacts/build.html'));

            const {exitCode} = await runCmd(`
                cmp
                ./test/integration/artifacts/reference_build.html
                ./test/integration/artifacts/build.html
            `);
            assert.equal(exitCode, 0);
        });
    });

    describe('revealjs', () => {
        it('runCmds without errors', async function() {
            this.timeout(100000);
            const {exitCode} = await runCmd('cd test/integration/env && patchouli --type=revealjs');
            assert.equal(exitCode, 0);
        });

        it('renders as in the reference', async () => {
            fs.createReadStream('./test/integration/fixtures/reference_build.revealjs.html')
                .pipe(fs.createWriteStream('./test/integration/artifacts/reference_build.revealjs.html'));

            fs.createReadStream('./test/integration/env/build.revealjs.html')
                .pipe(fs.createWriteStream('./test/integration/artifacts/build.revealjs.html'));

            const {exitCode} = await runCmd(`
                cmp
                ./test/integration/artifacts/reference_build.revealjs.html
                ./test/integration/artifacts/build.revealjs.html
            `);
            assert.equal(exitCode, 0);
        });
    });
});
