import typescript from 'rollup-plugin-typescript2'
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
      useTsconfigDeclarationDir: true,
      // sourceMap: true,
      // inlineSources: true,
    }),
    del({
      targets: 'lib/*',
      // hook: 'buildEnd',
    }),
  ],
}