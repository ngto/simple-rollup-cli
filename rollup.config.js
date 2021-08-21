import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { eslint } from 'rollup-plugin-eslint';
import { terser } from 'rollup-plugin-terser';
import clear from 'rollup-plugin-clear';
import babel from 'rollup-plugin-babel';
import { name, version, author } from './package.json';

const banner =
  '/*!\n' +
  ` * ${name} v${version}\n` +
  ` * (c) 2021-${new Date().getFullYear()} ${author}\n` +
  ' * Released under the MIT License.\n' +
  ' */';

export default [
  {
    input: 'src/index.js',
    output: [
      {
        file: `dist/${name}.umd.js`,
        format: 'umd',
        name,
        plugins: [terser()],
        banner,
      },
      {
        file: `dist/${name}.cjs.js`,
        format: 'cjs',
        name,
        banner,
        plugins: [terser()],
      },
      {
        file: `dist/${name}.esm.js`,
        format: 'esm',
        banner,
        plugins: [terser()],
      },
    ],
    plugins: [
      resolve(),
      commonjs(),
      eslint({
        include: ['src/**'],
        exclude: ['node_modules/**'],
      }),
      clear({
        targets: ['dist'],
        watch: true,
      }),
      babel({
        exclude: 'node_modules/**',
        runtimeHelpers: true,
        extensions: ['.js', '.ts'],
      }),
    ],
  },
];
