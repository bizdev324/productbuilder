const path = require('path');
const webpack = require('webpack');

var plugins = [
	new webpack.ProvidePlugin({
		THREE: "three"
	})
]

module.exports = {
	entry: './src/index.js',
	module: {

		rules: [

			{
				test: /node_modules/,
				exclude: [
					path.resolve(__dirname, "node_modules/resize-observer")
				], 
		        loader: 'ify-loader'

			},

			{
				test: /\.glsl$/,
				use: 'webpack-glsl-loader'
				
			},

		],

	},
	output: {
		filename: 'main.js',
		path: path.resolve(__dirname, 'dist')
	},
	plugins: plugins

};