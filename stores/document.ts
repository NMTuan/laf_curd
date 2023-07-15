/*
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2023-07-13 10:03:50
 * @LastEditTime: 2023-07-13 10:04:15
 * @LastEditors: NMTuan
 * @Description:
 * @FilePath: \laf_curd\stores\document.ts
 */
import { defineStore } from 'pinia'
export const useDocumentStore = defineStore('useDocumentStore', () => {
    // 列表

    // 获取列表
    const fetch = (appid, collection) => {
        const configStore = useConfigStore()
        return new Promise((resolve, reject) => {
            request({
                path: `/v1/apps/${configStore.appid || appid}/collections`
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
        fetch
    }
})
