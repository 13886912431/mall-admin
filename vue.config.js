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
            echarts: "echarts",
            VeIndex: "VeIndex"
        }
    },
    productionSourceMap: false,
    outputDir: "docs",
    publicPath: "https://sereinlyl.gitee.io/mall-admin"
};
