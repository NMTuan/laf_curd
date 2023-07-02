/*
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2023-07-01 19:13:03
 * @LastEditTime: 2023-07-02 15:02:59
 * @LastEditors: NMTuan
 * @Description:
 * @FilePath: \laf_curd\stores\policy.ts
 */
import { defineStore } from 'pinia'

interface PolicyObj {
    appid: string
    name: string
}

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

    // 本地记录的所有测录名称
    let policies: Ref<PolicyObj[]> = useCookie('laf_curd_policies')
    policies.value = policies.value === undefined ? [] : policies.value

    // 创建策略
    // const createPolicy = async (appid: string) => {
    //     if (!appid) {
    //         return
    //     }
    //     const exist = policies.value.find(
    //         (item: PolicyObj) => appid === item.appid
    //     )
    //     if (exist) {
    //         alert('找到历史策略，无需再次创建')
    //         return
    //     }
    //     // 生成一个策略名字
    //     const policy = `laf_curd_${appid}_${getRandomInt(
    //         479890,
    //         1679615
    //     ).toString(36)}`

    //     request({
    //         method: 'POST',
    //         path: `/v1/apps/${appid}/policies`,
    //         body: {
    //             name: policy
    //         }
    //     })
    //         .then((response) => {
    //             console.log(1, policies.value)
    //             policies.value.push({ appid, name: policy })
    //             console.log(2, policies.value)
    //         })
    //         .catch((err) => {
    //             alert(err.message)
    //         })
    // }
    // 获取策略
    // const getPolicy = async (appid: string) => {
    //     const exist = policies.value.find(
    //         (item: PolicyObj) => appid === item.appid
    //     )
    //     if (!exist) {
    //         alert('没找到历史记录，请重新创建')
    //     }

    //     request({
    //         path: `/v1/apps/${appid}/policies`
    //     })
    //         .then((response) => {
    //             console.log('res', response)
    //         })
    //         .catch((err) => {
    //             alert(err.message)
    //         })
    // }

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

    const create = () => {
        // 生成一个策略名字
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
        // createPolicy,
        // getPolicy,
        list,
        fetch,
        create,
        createRule,
        updateRule
    }
})
