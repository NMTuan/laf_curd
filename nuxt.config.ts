/*
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2023-06-30 19:16:42
 * @LastEditTime: 2023-07-03 15:06:46
 * @LastEditors: NMTuan
 * @Description:
 * @FilePath: \laf_curd\nuxt.config.ts
 */
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    app: {
        head: {
            script: [
                {
                    src: 'https://hm.baidu.com/hm.js?c7a27417fb3ca4a77c2486d1d1d51a0c'
                }
            ]
        }
    },
    css: ['@unocss/reset/normalize.css'],
    modules: ['@unocss/nuxt', '@pinia/nuxt'],
    devtools: { enabled: true },
    runtimeConfig: {
        public: {
            requestUrl: 'https://api.laf.run',
            pat: ''
        }
    },
    experimental: {
        viewTransition: true
    },
    imports: {
        dirs: ['stores']
    }
})
