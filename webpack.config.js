const path = require('path');

const prodConfig = {
  entry: './src/index.ts',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.ts'],
  },
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
    library: '@urdenko/print-wanted',
    libraryTarget: 'commonjs2',
  },
};

const devConfig = {
  entry: './src/index.ts',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js', '.html'],
    modules: ['src', 'node_modules'],
  },
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dev'),
    library: 'printWanted',
    libraryTarget: 'var',
  },
  devServer: {
    contentBase: path.join(__dirname, 'dev'),
    port: 8000,
  },
};

module.exports = (env, argv) => {
  if (argv.mode === 'production') {
    return prodConfig;
  }

  return devConfig;
};
