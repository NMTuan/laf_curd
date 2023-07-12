/*
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2023-07-01 22:51:38
 * @LastEditTime: 2023-07-02 14:17:09
 * @LastEditors: NMTuan
 * @Description:
 * @FilePath: \project\laf_curd\stores\collection.ts
 */
import { defineStore } from 'pinia'

export const useCollectionStore = defineStore('useCollectionStore', () => {
    // 列表
    const list = ref([])

    // 获取列表
    const fetch = (appid) => {
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
        list,
        fetch
    }
})
