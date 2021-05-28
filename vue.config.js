module.exports = {
    css: {
        loaderOptions: {
            less: {
                javascriptEnabled: true
            }
        }
    },
    devServer: {
        open: true
    },
    configureWebpack: {
        externals: {
            echarts: 'echarts',
            VeIndex: 'VeIndex'
        }
    },
    productionSourceMap: process.env.NODE_ENV !== 'production',
    outputDir: 'docs',
    publicPath: process.env.NODE_ENV === 'production' ? 'https://13886912431.github.io/mall-admin' : '/'
};
