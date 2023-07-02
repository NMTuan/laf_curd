/*
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2023-07-01 17:16:50
 * @LastEditTime: 2023-07-02 11:44:42
 * @LastEditors: NMTuan
 * @Description:
 * @FilePath: \laf_curd\stores\query.ts
 */
import { defineStore } from 'pinia'

export const useQueryStore = defineStore('useQueryStore', () => {
    // 当前集合
    const collection = ref({})
    // 查询语句
    const query = ref("where({_id: '64980b1c9fd1dd9bcf58fc3e'}).get()")
    // 查询结果
    const response = ref({})

    return {
        collection,
        query,
        response
    }
})
