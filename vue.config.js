module.exports = {
    chainWebpack: config => {
        // 产品发布阶段默认打包入口
        config.when(process.env.NODE_ENV === 'production', config => {
            config.entry('app').clear().add('./src/main-prod.js')
            //  打包时排除指定包 手动添加 CDN
            config.set('externals', {
                vue: 'Vue',
                'vue-router': 'VueRouter',
                axios: 'axios',
                lodash: '_',
                echarts: 'echarts',
                nprogress: 'NProgress',
                'vue-quill-editor': 'VueQuillEditor'
            })

            config.plugin('html').tap(args =>{
                args[0].isProd = true
                return args
            })
        })

        // 产品开发阶段默认打包入口
        config.when(process.env.NODE_ENV === 'development', config => {
            config.plugin('html').tap(args =>{
                args[0].isProd = false
                return args
            })
            config.entry('app').clear().add('./src/main-dev.js')
        })
    }
}