import babel from 'rollup-plugin-babel';
import scss from 'rollup-plugin-scss';

export default {
  input: './src/index.js',
  output: {
    file: './lib/index.js',
    format: 'cjs'
  },
  plugins: [babel(), scss()],
  external: ['react', 'antd']
}
