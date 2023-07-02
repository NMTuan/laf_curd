/*
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2023-07-01 17:16:50
 * @LastEditTime: 2023-07-02 16:34:37
 * @LastEditors: NMTuan
 * @Description:
 * @FilePath: \laf_curd\stores\query.ts
 */
import { defineStore } from 'pinia'

export const useQueryStore = defineStore('useQueryStore', () => {
    // 当前集合
    const collection = ref({})
    // 当前策略
    const policy = ref('') //useCookie(`laf_curd_policy`)
    // 查询语句
    const query = ref("where({_id: '64980b1c9fd1dd9bcf58fc3e'}).get()")
    // 查询结果
    const response = ref({})

    const clear = () => {
        collection.value = {}
        policy.value = ''
        response.value = {}
    }

    return {
        collection,
        policy,
        query,
        response,
        clear
    }
})
