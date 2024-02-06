import path from 'path';
import type {Configuration as DevServerConfiguration} from "webpack-dev-server";
import webpack from 'webpack';
// in case you run into any typescript error when configuring `devServer`
import 'webpack-dev-server';
import HtmlWebpackPlugin from "html-webpack-plugin";

type Mode = 'production' | 'development'

interface EnvVariables {
    mode: Mode,
    port: number
}

export default (env: EnvVariables) => {
    const isDev = env.mode === 'development'
    const config: webpack.Configuration = {
        mode: env.mode ?? "production",
        entry: path.resolve(__dirname, 'src', 'index.ts'),
        output: {
            path: path.resolve(__dirname, 'build'),
            filename: '[name].[contenthash].js',
            clean: true,
        },
        plugins: [new HtmlWebpackPlugin({template: path.resolve(__dirname, 'public', 'index.html')}), new webpack.ProgressPlugin()],
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/,
                },
            ],
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js'],
        },
        devtool: isDev ? 'inline-source-map' : false,
        devServer: isDev ? {
            port: env.port ?? 3000,
            open: true
        } : undefined,
    }
    return config
}