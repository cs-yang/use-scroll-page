const pkg = require('./package.json');
module.exports = {
    input: 'src/index.js',
    output: [
        {
            file: pkg.module,
            format: 'es',
        },
    ],
    external: ['react']
}
