const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const miniCss = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        main: path.resolve(__dirname, './src/script.js'),
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].bundle.js',
        assetModuleFilename: 'assets/[name][ext]'
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Singolo',
            template: path.resolve(__dirname, './src/index.html'), // шаблон
            filename: 'index.html', // название выходного файла
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'src/image'),
                    to: path.resolve(__dirname, 'dist/image')
                }
            ]
        }),
        new miniCss({
            filename: 'main.css',
         }),

    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
            {
                test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
                type: 'asset/resource',
                use: [{
                    loader: 'url-loader',
                }]

            },
            {
                test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
                type: 'asset/inline',
                use: [{
                    loader: 'url-loader',
                }]

            },
            {
                test:/\.(s*)css$/,
                use: [
                   miniCss.loader,
                   'css-loader',
                   'sass-loader',
                ]
             }
        ],
    },
    mode: 'development',
    devServer: {
        historyApiFallback: true,
        contentBase: path.resolve(__dirname, './dist'),
        open: true,
        compress: true,
        hot: true,
        port: 8080,
    },
    experiments: {
        asset: true
    }
}