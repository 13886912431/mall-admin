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
    outputDir: "docs"
};
