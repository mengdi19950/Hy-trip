const { VantResolver } = require('unplugin-vue-components/resolvers');
const ComponentsPlugin = require('unplugin-vue-components/webpack');

const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    plugins: [
      ComponentsPlugin({
        resolvers: [VantResolver()],
      }),
    ],
  },
  devServer: {
    proxy: {//配置本地代理
      "^/api": {
        target: "https://m.tujia.com",
        changeOrigin: true,//是否跨域  开启代理，在本地创建一个虚拟服务器
        rewrite: (path) => path.replace(/^\/api/, ""),
        //pathRewrite意味着当我们请求本地http://localhost:8080/
        // 地址时，实际访问的是https://m.tujia.com
        // 注意：必须把env文件的VUE_APP_WEB_API=http://localhost:8080/api改为本地的
      },
    },
  },
})


