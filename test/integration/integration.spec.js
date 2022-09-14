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
    });

    describe('pdf', () => {
        it('runCmds without errors', async function() {
            this.timeout(100000);
            const {exitCode} = await runCmd('cd test/integration/env && patchouli --type=pdf');
            assert.equal(exitCode, 0);
        });
    });

    describe('html', () => {
        it('runCmds without errors', async function() {
            this.timeout(100000);
            const {exitCode} = await runCmd('cd test/integration/env && patchouli --type=html');
            assert.equal(exitCode, 0);
        });
    });

    describe('revealjs', () => {
        it('runCmds without errors', async function() {
            this.timeout(100000);
            const {exitCode} = await runCmd('cd test/integration/env && patchouli --type=revealjs');
            assert.equal(exitCode, 0);
        });
    });
});
