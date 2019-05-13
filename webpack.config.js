const path = require('path');


module.exports = {
  mode: 'development',
  entry: {
    app: path.resolve(__dirname, './app.js'),
  },
  module: {
    rules: [
      {
        loader: "babel-loader",
        
        // Skip any files outside of your project's `frontend` directory
        include: [
          path.resolve(__dirname, 'angular-src'),
        ],
        
        // Only run `.js` files through Babel
        test: /\.js?$/,
      },
    ],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
};