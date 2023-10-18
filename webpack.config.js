const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const buildFolderName = "build";

module.exports = {
    mode: "development",
    entry: ["./src/js/index.js", "./src/css/index.css"],
    devtool: "inline-source-map",
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                loader: "babel-loader"
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader"
                ]
            },
            {
                test: /\.(jpg|jpeg|gif|png|ico|svg)$/,
                loader: "file-loader",
                options: {
                    limit: 1024,
                    name: "[name].[ext]"
                }
            },
            {
                test: /\.(html)$/,
                loader: "file-loader",
                options: {
                    limit: 1024,
                    name: "[name].[ext]"
                }
            }
        ]
    },
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, buildFolderName),
        publicPath: "/"
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "bundle.css"
        }),
        new ESLintPlugin({}),
        new CopyPlugin({
            patterns: [
                "src/index.html",
                "src/favicon.svg"
            ]
        })
    ],
    devServer: {
        host: "127.0.0.1",
        port: 8000,
        hot: false,
        open: false,
        historyApiFallback: true,
        watchFiles: ["src/**/*"],
        static: {
            directory: path.join(__dirname, buildFolderName),
            publicPath: "/",
            watch: false
        },
        client: {
            overlay: {
                errors: true,
                warnings: false
            },
            progress: true,
            reconnect: true
        }
    }
};