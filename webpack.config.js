const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin")

module.exports = (env) => {
    return {
        entry: __dirname + "/src/main.js",
        module: {
            rules: [
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
            publicPath: env.production ? '/apartment_list' : '/'
        },
        plugins: [
            new CopyWebpackPlugin({ patterns: [{ from: 'public/style/img', to: 'img' }] }),
            new HtmlWebpackPlugin({
                template: __dirname + "/public/index.html",
                inject: 'body'
            }),
            new MiniCssExtractPlugin()

        ],
        mode: env.production  ? 'production' : 'development'
    }
}