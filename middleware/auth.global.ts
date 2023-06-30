/*
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2023-06-29 21:14:49
 * @LastEditTime: 2023-06-29 21:28:45
 * @LastEditors: NMTuan
 * @Description:
 * @FilePath: \ezMemos\middleware\auth.global.ts
 */
export default defineNuxtRouteMiddleware((to, from) => {
    const userStore = useUserStore()
    console.log('to', to)
    console.log('userStore', userStore.whiteList)

    // 不在白名单, 而且没token
    if (!userStore.whiteList.includes(to.path) && !userStore.token) {
        return navigateTo('/welcome')
    }
})
