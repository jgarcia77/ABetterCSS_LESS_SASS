var path = require("path");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var extractSASS = new ExtractTextPlugin({
    filename: "styles.css",
    disable: process.env.NODE_ENV === "development"
});

module.exports = {
    context: path.resolve("src"),
    entry: "./js/app",
    output: {
        path: path.resolve("dist/"),
        publicPath: "/",
        filename: "bundle.js"
    },
    watch: true,
    plugins: [
        extractSASS
    ],
    devServer: {
        contentBase: "src/public"
    },
    module: { 
        rules: [
            {
                test: /\.scss$/,
                use: extractSASS.extract({
                    use: [{
                        loader: "css-loader"
                    }, {
                        loader: "sass-loader"
                    }],
                    // use style-loader in development
                    fallback: "style-loader"
                })
            }
        ]
    },
    resolve: {
        extensions: [".js"]
    }
}