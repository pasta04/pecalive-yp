import webpack from 'webpack';
import webpackDevServer from 'webpack-dev-server';
import TerserPlugin from 'terser-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import path from 'path';
import CopyWebpackPlugin from 'copy-webpack-plugin';

interface Configuration extends webpack.Configuration {
  devServer?: webpackDevServer.Configuration;
}

const isProduction = process.env.NODE_ENV === 'production';

const commonConfig: Partial<Configuration> = {
  mode: isProduction ? 'production' : 'development',
  devtool: isProduction ? 'source-map' : 'cheap-source-map',
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
  },
};

// webpack-dev-serverの設定
const devServerConfig: webpackDevServer.Configuration = {
  contentBase: 'docs',
  host: 'localhost',
  open: true,
  hot: true,
};

const config: Configuration = {
  ...commonConfig,
  devServer: devServerConfig,

  entry: path.resolve('./js/index.tsx'),
  output: {
    path: path.resolve(`docs/`),
    filename: 'main.js',
  },
  module: {
    rules: [
      // TypeScript
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: {
          transpileOnly: true,
        },
      },
      // CSS
      {
        test: /\.css/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              url: false,
            },
          },
        ],
      },
      // 画像ファイル
      {
        test: /\.png/,
        use: ['url-loader'],
      },
    ],
  },
  node: {
    fs: 'empty',
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          ecma: 6,
          warnings: false,
          parse: {},
          compress: {},
          mangle: true, // Note `mangle.properties` is `false` by default.
          module: false,
          // output: null,
          toplevel: false,
          // nameCache: null,
          ie8: false,
          keep_classnames: undefined,
          keep_fnames: false,
          safari10: true,
        },
      }),
    ],
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin({
      useTypescriptIncrementalApi: true,
      tsconfig: './tsconfig.json',
      checkSyntacticErrors: true,
      reportFiles: ['src/**'],
    }),
    new CopyWebpackPlugin([
      {
        from: './static',
        to: '',
      },
    ]) as any,
  ],
};

export default [config];
