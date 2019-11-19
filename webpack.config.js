const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    entry: "./src/index.ts",
    output: {
        path: path.resolve(__dirname, "./dist"),
        filename: "script/bundle.js"
    },
    resolve: {
        extensions: [".ts", ".js"]
    },
    module: {
        rules: [
            { 
                test: /\.ts?$/, 
                use: {
                    loader: "ts-loader",
                    options: {
                        transpileOnly: true
                    }
                }
            }
        ]
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: './public/index.html'
        }),
        new CleanWebpackPlugin()
    ],
    devServer: {
        open: true
    }
}