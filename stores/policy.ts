/*
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2023-07-01 19:13:03
 * @LastEditTime: 2023-07-02 17:24:19
 * @LastEditors: NMTuan
 * @Description:
 * @FilePath: \laf_curd\stores\policy.ts
 */
import { defineStore } from 'pinia'

// 管理员权限规则
const rule = {
    read: true,
    count: true,
    update: true,
    remove: true,
    add: true
}

function getRandomInt(min: number, max: number) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min
}

export const usePolicyStore = defineStore('usePolicyStore', () => {
    const configStore = useConfigStore()
    const policy = useCookie(`laf_curd_policy_${configStore.appid}`)
    const queryStore = useQueryStore()

    // 列表
    const list = ref([])

    const fetch = () => {
        return new Promise((resolve, reject) => {
            request({
                path: `/v1/apps/${configStore.appid}/policies`
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

    // 创建一个策略
    const create = () => {
        const policy = `laf_curd_${getRandomInt(479890, 1679615).toString(36)}`
        return new Promise((resolve, reject) => {
            request({
                method: 'POST',
                path: `/v1/apps/${configStore.appid}/policies`,
                body: {
                    name: policy
                }
            })
                .then((res) => {
                    resolve(res)
                })
                .catch((err) => {
                    reject(err)
                })
        })
    }

    // 创建规则
    const createRule = () => {
        return new Promise((resolve, reject) => {
            request({
                path: `/v1/apps/${configStore.appid}/policies/${policy.value}/rules`,
                method: 'POST',
                body: {
                    collectionName: queryStore.collection.name,
                    value: JSON.stringify(rule)
                }
            })
                .then((res) => {
                    if (res.error) {
                        reject(res)
                    } else {
                        resolve(res)
                    }
                })
                .catch((err) => {
                    reject(err)
                })
        })
    }
    // 更新规则
    const updateRule = () => {
        return new Promise((resolve, reject) => {
            request({
                path: `/v1/apps/${configStore.appid}/policies/${policy.value}/rules/${queryStore.collection.name}`,
                method: 'PATCH',
                body: {
                    // collectionName: queryStore.collection.name,
                    value: JSON.stringify(rule)
                }
            })
                .then((res) => {
                    resolve(res)
                })
                .catch((err) => {
                    reject(err)
                })
        })
    }

    return {
        list,
        fetch,
        create,
        createRule,
        updateRule
    }
})
