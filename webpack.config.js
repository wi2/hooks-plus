const webpack = require('webpack')
const path = require('path')
const externalReact = require('webpack-external-react')

const ROOT = __dirname
const DESTINATION = path.join(ROOT, '/dist')
const SRC = path.join(ROOT, '/src')
/** wepback resolve */
const RESOLVE = {
  extensions: ['.tsx', '.ts', '.js', '.jsx'],
}

/** webpack plugins */
const PLUGINS = []
const MODULE = {
  rules: [
    {
      test: /\.ts(x)?$/,
      exclude: [/node_modules/],
      loader: 'ts-loader',
      include: [SRC],
    },
  ],
}
const OUTPUT = {
  filename: '[name].js',
  libraryTarget: 'umd',
  library: '@wi2/hooks-plus',
  path: DESTINATION,
}

module.exports = {
  node: {
    fs: 'empty',
  },
  entry: {
    index: SRC + '/index.ts',
  },
  externals: {
    ...externalReact.externals,
  },
  module: {
    noParse: externalReact.noParse,
  },
  context: ROOT,
  resolve: RESOLVE,
  mode: 'production',
  module: MODULE,
  plugins: PLUGINS,
  devtool: 'source-map',
  devServer: {},
  output: OUTPUT,
}
