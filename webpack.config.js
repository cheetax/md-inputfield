var path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
// const HtmlWebPackPlugin = require("html-webpack-plugin");

// const htmlWebpackPlugin = new HtmlWebPackPlugin({
//   // template: "./src/index.html",
//   // filename: "./index.html"
// });

module.exports = {
  // entry: './src/index.js',
  // output: {
  //   path: path.resolve(__dirname, 'build'),
  //   filename: 'index.js',
  //   libraryTarget: 'commonjs2'
  // },
  plugins: [
    new ExtractTextPlugin({
      filename: 'md-inputfield.css',
    }),
  ],
  
  module: {
    rules: [
      {
        test: /\.js$/,
       // include: path.resolve(__dirname, 'src'),
        exclude: /(node_modules|bower_components|build)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['react', 'es2015'],
          }
        }
      },
      {
        test: /\.*css$/,
        //include: path.resolve(__dirname, 'src'),
        exclude: /(node_modules|bower_components|build)/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader',
            'sass-loader'
          ]
        })
      }
    ],
    
  },
  //plugins: [htmlWebpackPlugin],
  
  externals: {
    // Don't bundle react or react-dom
    react: {
      commonjs: "react",
      commonjs2: "react",
      amd: "React",
      root: "React"
    },
    "react-dom": {
      commonjs: "react-dom",
      commonjs2: "react-dom",
      amd: "ReactDOM",
      root: "ReactDOM"
    }
  }
};