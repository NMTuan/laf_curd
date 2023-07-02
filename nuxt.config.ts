/*
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2023-06-30 19:16:42
 * @LastEditTime: 2023-06-30 20:30:13
 * @LastEditors: NMTuan
 * @Description:
 * @FilePath: \laf_curd\nuxt.config.ts
 */
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
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
