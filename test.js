const fs = require('fs');
const path = require('path');
const Bundler = require('parcel-bundler');
const gasify = require('./lib');

test('should gasify source', async () => {
    let bundler = new Bundler('./fixtures/sample.js', {
        outDir: path.join(__dirname, 'dist'),
        watch: false,
        cache: false,
        hmr: false,
        logLevel: 0,
    });
    gasify(bundler);
    await bundler.bundle();
    const got = fs.readFileSync('./dist/sample.js').toString();
    const want = fs.readFileSync('./fixtures/want.js').toString();
    expect(got).toBe(want);
});
