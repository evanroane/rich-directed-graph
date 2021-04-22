import typescript from '@rollup/plugin-typescript';

export default {
  input: 'src/index.ts',
  output: {
    dir: 'lib',
    exports: 'default',
    format: 'cjs',
  },
  plugins: [typescript()],
};