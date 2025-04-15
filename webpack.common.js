const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");


module.exports = {
  entry: "./frontend/src/js/index.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  
  plugins: [
    new HtmlWebpackPlugin({
      template: "./frontend/src/index.html",
    }),
  ],
  module: {
    rules: [
    
      {
        test: /\.(woff|woff2)$/i,
        type: 'asset/resource',  
        generator: {
          filename: 'fonts/[name][hash][ext][query]' 
        }
      },
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      {
        test: /\.(png|svg|jpg)$/i,
        type: "asset/resource",
        generator: {
          filename: 'img/[name][hash][ext][query]' 
        }
      },
    ],
  },

  
};