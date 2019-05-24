const path = require('path')
const resolve = dir => path.join(__dirname, dir)
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
module.exports = {
    //基本路径
    publicPath: './',
    //输出文件目录
    outputDir: 'dist',
    // eslint-loader是否在保存的时候检查
    lintOnSave: false,
    //静态资源目录
    assetsDir: 'assets',
    //webpack配置   
    configureWebpack: config => {
        // 入口文件
        config.entry.app = ['babel-polyfill', './src/main.js'];
        if (process.env.NODE_ENV === 'production') {
            //生产环境
        }
    },
    chainWebpack: config => {
        config.resolve.alias
            .set('@', resolve('src'))
            .set('src', resolve('src'))
            .set('_c', resolve('src/components/'))
            .set('_images', resolve('src/assets/images/'))
    },
    devServer: {
        open: true,
        host: process.env.HOST || '0.0.0.0',
        port: 8999,
        hotOnly: false,
        // proxy: {
        //     '/api': {
        //         target: 'http://10.3.38.58:8092/api',
        //         changeOrigin: true,
        //         pathRewrite: {
        //             '^/api': ''
        //         }
        //     }
        // }
    }
} 
