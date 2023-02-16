const path = require('path');
const mode= process.env.mode;
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin= require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const TerserPlugin = require("terser-webpack-plugin");
const DuplicatePackageCheckerPlugin = require("duplicate-package-checker-webpack-plugin");

module.exports={
    entry: './src/index.js',
    output:{
        path: path.join(__dirname,'public'),
        filename: 'bundle.js',
        publicPath: '/',
    },
    module:{
        rules:[
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader', 'postcss-loader'],
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                loader: 'file-loader',
            },
            {
                test: /\.svg$/,
                use: [
                  {
                    loader: 'svg-url-loader',
                    options: {
                      limit: 10000,
                    },
                  },
                ],
            }
        ]
    },
    
    devtool: mode === 'development' ? 'cheap-module-eval-source-map' : false,
    plugins:[
        new HtmlWebpackPlugin({
            template:'./public/index.html'
        }),
        new BundleAnalyzerPlugin(),
        new DuplicatePackageCheckerPlugin(),
       // new webpack.optimize.TerserPlugin()
        //new webpack.optimize.DedupePlugin(), //dedupe similar code 
        // new webpack.optimize.UglifyJsPlugin(), //minify everything
        // new webpack.optimize.AggressiveMergingPlugin()//Merge chunks 
    ],

    resolve: {
        alias: {
            react: path.resolve(__dirname, 'node_modules/react'),
        }
    },
    optimization: { minimize: true, minimizer: [new TerserPlugin()], },
}