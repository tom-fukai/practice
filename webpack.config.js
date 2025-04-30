const path = require('path');

module.exports = {
  entry: './_src/js/index.js', // あなたのエントリーポイントに合わせる
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/', // これも大事
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name][ext]',
        },
      },
    ],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'static'),
      publicPath: '/',
    },
    port: 3000,
    open: true,
  },
};
