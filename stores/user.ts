/*
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2023-06-30 20:30:22
 * @LastEditTime: 2023-07-02 14:45:26
 * @LastEditors: NMTuan
 * @Description:
 * @FilePath: \laf_curd\stores\user.ts
 */
import { defineStore } from 'pinia'

export const useUserStore = defineStore('useUserStore', () => {
    const token = useCookie('laf_curd_token')
    const whiteList = ['/welcome'] // 不需要鉴权的url路径
    const clearToken = () => {
        token.value = ''
    }
    return {
        token,
        whiteList,
        clearToken
    }
})
