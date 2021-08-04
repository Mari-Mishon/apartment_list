const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    entry: __dirname + "/src/main.js",
    module: {
        rules: [
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                use: [
                    'url-loader?limit=10000',
                    'img-loader'
                ]
            },

            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "sass-loader",
                ],
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'fonts/'
                        }
                    }
                ]
            },
            { test: /\.(js)$/, use: 'babel-loader' },
            {
                test: /\.hbs/,
                loader: 'handlebars-loader',
                options: {
                    helperDirs: [
                        path.join(__dirname, "/src/helpers/"),
                    ]
                },
                exclude: /(node_modules|bower_components)/
            },


        ]
    },
    output: {
        path: path.resolve(__dirname + '/dist',),
        filename: 'bundle.js',
        publicPath: '/'
    },
    plugins: [
        new CopyWebpackPlugin({ patterns: [{ from: 'src/data', to: 'api' }] }),
        new HtmlWebpackPlugin({
            template: __dirname + "/public/index.html",
            inject: 'body'
        }),
        new MiniCssExtractPlugin()

    ],
    mode: process.env.NODE_ENV === 'production' ? 'production' : 'development'
}