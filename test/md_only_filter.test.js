const {describe, it} = require('mocha');
const filter = require('../lib/md_only_filter');
const expect = require('chai').expect;

describe('md files only filter', () => {
   it('should filter out all non-md files', () => {
        expect(filter('ass.md')).to.eql(true);
        expect(filter('ass.pdf')).to.eql(false);
   });
});