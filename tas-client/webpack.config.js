const { ModuleFederationPlugin } = require("webpack").container;
const deps = require("./package.json").dependencies;

module.exports = {
  entry: "./src/index",
  mode: "development",
  devServer: {
    port: 3003,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    hot: true,
  },
  resolve: {
    extensions: [".js", ".tsx", ".ts"],
  },
  output: {
    publicPath: "auto",
  },
  module: {
    rules: [
      {
        test: /\.(js|ts)x?$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        options: {
          presets: ["@babel/preset-react", "@babel/preset-typescript"],
        },
      },
      {
        test: /\.png$/,
        use: {
          loader: "url-loader",
          options: { limit: 8192 },
        },
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "tas",
      filename: "remoteEntry.js",
      exposes: {
        ReactAppLoader: "./src/loader.ts",
      },
      shared: {
        react: {
          singleton: true,
          requiredVersion: deps.react,
        },
        "react-dom": {
          singleton: true,
          requiredVersion: deps["react-dom"],
        },
      },
    }),
  ],
};
