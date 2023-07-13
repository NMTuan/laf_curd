/*
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2023-07-13 10:34:44
 * @LastEditTime: 2023-07-13 14:52:36
 * @LastEditors: NMTuan
 * @Description:
 * @FilePath: \laf_curd\composables\cloud.js
 */
import { Cloud } from 'laf-client-sdk'

export const useCloud = () => {
    const route = useRoute()
    const configStore = useConfigStore()
    const useStore = useUserStore()
    const [appid, collectionName] = route.params.key
    const cloud = new Cloud({
        baseUrl: `${configStore.apiUrl}`,
        dbProxyUrl: `/v1/apps/${appid}/databases/proxy`,
        getAccessToken: () => {
            return useStore.token
        }
    })
    const collection = cloud.database().collection(collectionName)
    const _ = cloud.database().command

    // 根据query条件获取数据列表
    const fetch = ({ query, page, pageSize }, loading) => {
        return new Promise((resolve, reject) => {
            if (loading) {
                loading.value = true
            }
            collection
                .where(query || {})
                .skip(((page || 1) - 1) * pageSize)
                .limit(pageSize || 10)
                .get()
                .then((res) => {
                    resolve(res)
                })
                .catch((error) => {
                    reject(error)
                })
                .finally(() => {
                    if (loading) {
                        loading.value = false
                    }
                })
        })
    }
    // 根据query条件获取数据总条数
    const count = ({ query }, loading) => {
        return new Promise((resolve, reject) => {
            if (loading) {
                loading.value = true
            }
            collection
                .where(query || {})
                .count()
                .then((res) => {
                    resolve(res)
                })
                .catch((error) => {
                    reject(error)
                })
                .finally(() => {
                    if (loading) {
                        loading.value = false
                    }
                })
        })
    }

    return {
        _,
        collection,
        fetch,
        count
    }
}
