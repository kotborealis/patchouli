const fs = require('fs');
const assert = require('assert');
const replace = require('stream-replace');
const {runCmd} = require('../util/util');

describe('literate document generation', () => {
    describe('tex', function() {
        this.timeout(100000);

        it('runs without errors', async function() {
            const {exitCode} = await runCmd('cd test/literate/env && patchouli --type=tex -l');
            assert.equal(exitCode, 0);
        });

        it('renders as in the reference', async () => {
            fs.createReadStream('./test/literate/fixtures/reference_build.tex')
                .pipe(replace(/\/tmp\/tmp-[^.]+\.pdf/ig, "/tmp/tmp.pdf"))
                .pipe(fs.createWriteStream('./test/literate/artifacts/reference_build.tex'));

            fs.createReadStream('./test/literate/env/build.tex')
                .pipe(replace(/\/tmp\/tmp-[^.]+\.pdf/ig, "/tmp/tmp.pdf"))
                .pipe(fs.createWriteStream('./test/literate/artifacts/build.tex'));

            const {exitCode} = await runCmd(`
                cmp
                ./test/literate/artifacts/reference_build.tex
                ./test/literate/artifacts/build.tex
            `);
            assert.equal(exitCode, '0');
        });
    });
});
