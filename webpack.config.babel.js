var path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'index.js',
    //libraryTarget: 'commonjs2'
  },
  devtool: 'source-map',

  plugins: [
    new ExtractTextPlugin({
      filename: 'md-InputField.css',
    }),
  ],
  module: {
    // rules: [
    //   {
    //     test: /\.js$/,
    //     include: path.resolve(__dirname, 'src'),
    //     exclude: /(node_modules|bower_components|build)/,
    //     use: {
    //       loader: 'babel-loader',
    //       options: {
    //         presets: ['react', ['es2015']],
    //       }
    //     }
    //   },
    //   {
    //     test: /\.*css$/,
    //     use : ExtractTextPlugin.extract({
    //         fallback : 'style-loader',
    //         use : [
    //             'css-loader',
    //             'sass-loader'
    //         ]
    //     })
    // }
    // ],
    loaders: [
      {
        test: /\.js$/,
        //exclude: /(node_modules|bower_components|build)/,
        exclude: /node_modules/, 
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'stage-0', 'react']
        },
        // options: {
        //   presets: ['es2015', 'stage-0', 'react']
        // }
      },
      {
        test: /\.*css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader',
            'sass-loader'
          ]
        })
      }
    ]
  },
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