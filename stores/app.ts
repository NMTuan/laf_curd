/*
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2023-07-01 23:01:05
 * @LastEditTime: 2023-07-02 14:35:48
 * @LastEditors: NMTuan
 * @Description:
 * @FilePath: \laf_curd\stores\app.ts
 */
import { defineStore } from 'pinia'

interface App {
    [key: string]: any
}

export const useAppStore = defineStore('useAppStore', () => {
    // 列表
    const list: Ref<App[]> = ref([])

    // 获取列表
    const fetch = () => {
        return new Promise((resolve, reject) => {
            request({
                path: '/v1/applications'
            })
                .then((res) => {
                    list.value = res.data
                    resolve(res)
                })
                .catch((err) => {
                    reject(err)
                })
        })
    }
    return {
        list,
        fetch
    }
})
