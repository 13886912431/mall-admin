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
    publicPath: "https://13886912431.github.io/mall-admin.github.io"
};
