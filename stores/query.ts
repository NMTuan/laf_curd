/*
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2023-07-01 17:16:50
 * @LastEditTime: 2023-07-02 17:54:31
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
    const query = ref('get()')
    // 查询结果
    const response = ref({})
    // 手工更新查询结果
    const updateResponse = (val: object) => {
        response.value = val
    }

    // 切换appid的时候，清理暂存信息
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
        updateResponse,
        clear
    }
})
