const path = require('path');
const ts = require('@rollup/plugin-typescript');
const pkg = require('./package.json');

module.exports = {
    input: 'src/index.ts',
    output: [
        {
            file: pkg.module,
            format: 'es',
        },
    ],
    plugins: [
        ts(),
    ],
    external: ['react']
}
