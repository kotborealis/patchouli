const fs = require('fs');
const assert = require('assert');
const replace = require('stream-replace');
const {runCmd} = require('../util/util');

describe.skip('literate document generation', () => {
    describe('tex', function() {
        this.timeout(100000);

        it('runs without errors', async function() {
            const {exitCode, stdout, stderr} = await runCmd('cd test/literate/env && patchouli --type=tex -l');
            assert.equal(stdout, ``);
            assert.equal(stderr, ``);
            assert.equal(exitCode, 0);
        });
    });
});
