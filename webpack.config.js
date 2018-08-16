var path = require('path');
//const ExtractTextPlugin = require('extract-text-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const HtmlWebPackPlugin = require("html-webpack-plugin");

// const htmlWebpackPlugin = new HtmlWebPackPlugin({
//   // template: "./src/index.html",
//   // filename: "./index.html"
// });

module.exports = {
  //entry: './src/index.js',
  output: {
    //path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
    libraryTarget: 'commonjs2'
  },
  // plugins: [
  //   new ExtractTextPlugin({
  //     filename: 'md-inputfield.css',
  //   }),
  // ],
  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "md-inputfield.css",
      chunkFilename: "md-inputfield.css"
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        //include: path.resolve(__dirname, 'src'),
        exclude: /(node_modules|bower_components|build)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['react', 'es2015', 'stage-2'],
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // you can specify a publicPath here
              // by default it use publicPath in webpackOptions.output
              publicPath: '../'
            }
          },
          "css-loader"
        ]
      },
      // {
      //   test: /\.*css$/,
      //   //include: path.resolve(__dirname, 'src'),
      //   exclude: /(node_modules|bower_components|build)/,
      //   use: ExtractTextPlugin.extract({
      //     fallback: 'style-loader',
      //     use: [
      //       'css-loader',
      //       'sass-loader'
      //     ]
      //   })
      // }
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