const {describe, it} = require('mocha');
const pandoc = require('../lib/pandoc');
const expect = require('chai').expect;

describe('pandoc wrapper', () => {
    it('just works', async () => {
        expect(await pandoc("**ass we can**", `--from markdown --to html`)).to.equal('<p><strong>ass we can</strong></p>\n');
        expect(await pandoc("**ass we can**", `--from markdown --to html -o /tmp/asswecan`)).to.equal(true);
    });
});