import { babel } from '@rollup/plugin-babel';

const config = {
    input: 'methods/vanilla-js-methods.js',
    output: {
        dir: 'demo/output',
        name: '$utils',
        format: 'umd',
    },
    watch: {
        include: 'methods/**',
    },
    plugins: [babel({ babelHelpers: 'bundled' })],
};

export default config;
