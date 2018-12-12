const fs = require('fs');

const JSPackager = require('parcel-bundler/src/packagers/JSPackager');
const generator = require('gas-entry-generator');

class Packager extends JSPackager {
    async end() {
        await super.end();
        const entries = generator(fs.readFileSync(this.bundle.name, { encoding: 'utf8' }));
        fs.appendFileSync(this.bundle.name, `\nvar global = this;\n${entries}`);
    }
}

module.exports = Packager;
