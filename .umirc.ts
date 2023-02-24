import { defineConfig } from 'umi';
const CompressionPlugin = require('compression-webpack-plugin');

export default defineConfig({
  hash: true,
  layout: false,
  nodeModulesTransform: {
    type: 'none',
  },
  fastRefresh: {},
  dynamicImport: {
    loading: '@/components/pageLoading',
  },
  favicon: '/images/g5.ico',
  proxy: {
    '/api': {
      target: 'http://127.0.0.1:5600/',
      changeOrigin: true,
      ws: true,
    },
  },
  chainWebpack: (config) => {
    config.plugin('compression-webpack-plugin').use(
      new CompressionPlugin({
        algorithm: 'gzip',
        test: new RegExp('\\.(js|css)$'),
        threshold: 10240,
        minRatio: 0.6,
      }),
    );
  },
  externals: {
    react: 'window.React',
    'react-dom': 'window.ReactDOM',
    darkreader: 'window.DarkReader',
    codemirror: 'window.CodeMirror',
    'sockjs-client': 'window.SockJS',
  },
  scripts: [
    'https://lf9-cdn-tos.bytecdntp.com/cdn/expire-1-M/react/18.2.0/umd/react.production.min.js',
    'https://lf26-cdn-tos.bytecdntp.com/cdn/expire-1-M/react-dom/16.13.1/umd/react-dom.production.min.js',
    'https://lf9-cdn-tos.bytecdntp.com/cdn/expire-1-M/darkreader/4.9.44/darkreader.min.js',
    'https://lf9-cdn-tos.bytecdntp.com/cdn/expire-1-M/codemirror/5.65.2/codemirror.min.js',
    'https://lf6-cdn-tos.bytecdntp.com/cdn/expire-1-M/codemirror/5.65.2/mode/php/php.js',
    'https://lf26-cdn-tos.bytecdntp.com/cdn/expire-1-M/codemirror/5.65.2/mode/shell/shell.js',
    'https://lf3-cdn-tos.bytecdntp.com/cdn/expire-1-M/codemirror/5.65.2/mode/python/python.js',
    'https://lf26-cdn-tos.bytecdntp.com/cdn/expire-1-M/codemirror/5.65.2/mode/javascript/javascript.min.js',
    'https://lf26-cdn-tos.bytecdntp.com/cdn/expire-1-M/sockjs-client/1.6.0/sockjs.min.js.map',
  ],
});