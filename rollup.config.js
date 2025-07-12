import typescript from '@rollup/plugin-typescript'
import del from 'rollup-plugin-delete'
export default {
  input: 'src/index.ts',
  output: [
    {
      file: 'lib/index.cjs',
      format: 'cjs',
      // sourcemap: true,
    },
    {
      file: 'lib/index.esm.js',
      format: 'esm',
      // sourcemap: true,
    }
  ],
  plugins: [
    typescript({
      // tsconfig: './tsconfig.json',
      // sourceMap: true,
      // inlineSources: true,
    }),
    del({
      targets: 'lib/*',
      // hook: 'buildEnd',
    }),
  ],
}