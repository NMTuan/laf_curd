/*
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2023-06-29 21:14:49
 * @LastEditTime: 2023-07-15 20:46:57
 * @LastEditors: NMTuan
 * @Description:
 * @FilePath: \laf_curd\middleware\auth.global.ts
 */
export default defineNuxtRouteMiddleware((to, from) => {
    const userStore = useUserStore()
    const configStore = useConfigStore()
    const tabStore = useTabStore()

    // 不在白名单, 而且没token
    if (!userStore.whiteList.includes(to.path) && !userStore.token) {
        return navigateTo('/welcome')
    }

    // 随时切换 appid
    if (to.params.appid) {
        configStore.$patch({ appid: to.params.appid.toString() })
    }

    // tabs
    // console.log('to', to.name, to.params.key, /^index.*$/.test(to.name))
    // if (to.name === 'index-key') {
    //     tabStore.append(to.params.key.join('/'))
    // } else if (/^index.*$/.test(to.name)) {
    //     tabStore.append(to.params.name)
    // }
    // console.log(tabStore.list)

    if (!userStore.whiteList.includes(to.path)) {
        tabStore.append({
            name: to.name,
            params: to.params
        })
    }
})
