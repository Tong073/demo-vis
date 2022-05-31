'use strict'
const path = require('path');

// const webpack = require('webpack');

function resolve(dir) {
    return path.join(__dirname, dir)
}

module.exports = {
    publicPath: '/',
    outputDir: 'dist',
    assetsDir: 'static',
    css: {
        loaderOptions: {
            sass: {
                sassOptions: {
                    outputStyle: "expanded"
                }
            }
        }
    },
    configureWebpack: {
        name: '变电站可视化系统',
        resolve: {
            alias: {
                '@': resolve('src')
            }
        },
    },
}
// const {defineConfig} = require('@vue/cli-service')
// module.exports = defineConfig({
//     transpileDependencies: true
// })
