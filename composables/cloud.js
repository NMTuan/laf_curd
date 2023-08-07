/*
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2023-07-13 10:34:44
 * @LastEditTime: 2023-07-16 13:44:46
 * @LastEditors: NMTuan
 * @Description:
 * @FilePath: \laf_curd\composables\cloud.js
 */
import { Cloud } from 'laf-client-sdk'

export const useCloud = (payload) => {
    const route = useRoute()
    const configStore = useConfigStore()
    const useStore = useUserStore()
    // const [appid, collectionName] = route.params.key
    const appid = payload?.appid || route.params.key[0]
    const collectionName = payload?.collectionName || route.params.key[1]
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
            query = query || {}
            page = page || 1
            pageSize = pageSize || 10
            collection
                .where(query)
                .skip((page - 1) * pageSize)
                .limit(pageSize)
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

    // 查询一条数据
    const fetchOne = ({ query }, loading) => {
        return new Promise((resolve, reject) => {
            if (loading) {
                loading.value = true
            }
            query = query || {}
            collection
                .where(query)
                .getOne()
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

    // 更新数据
    const update = ({ id, payload }, loading) => {
        return new Promise((resolve, reject) => {
            if (!id) {
                reject()
            }
            if (loading) {
                loading.value = true
            }
            payload = payload || {}
            collection
                .doc(id)
                .update(payload)
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

    // 删除数据
    const remove = (id) => {
        return new Promise((resolve, reject) => {
            if (!id) {
                reject()
            }
            ElMessageBox.confirm(
                'Are you sure you want to "remove" item ?',
                'Warning',
                {
                    cancelButtonClass: 'is-text',
                    confirmButtonClass: 'el-button--danger',
                    beforeClose: async (action, ctx, done) => {
                        if (action !== 'confirm') {
                            ctx.confirmButtonLoading = false
                            done()
                            return
                        }
                        ctx.confirmButtonLoading = true
                        collection
                            .doc(id)
                            .remove()
                            .then((res) => {
                                done()
                                ElMessage({
                                    message: 'remove success',
                                    type: 'success'
                                })

                                resolve(res)
                            })
                            .catch((error) => {
                                ElMessage({
                                    message: 'err',
                                    type: 'error'
                                })
                                reject(error)
                            })
                            .finally(() => {
                                ctx.confirmButtonLoading = false
                            })
                    }
                }
            )
                .then((action) => {
                    resolve(action)
                })
                .catch((action) => {
                    reject(action)
                })
        })
    }

    // 添加数据
    const create = (payload, loading) => {
        return new Promise((resolve, reject) => {
            loading.value = true
            collection
                .add(payload)
                .then((res) => {
                    ElMessage({
                        message: 'created success',
                        type: 'success'
                    })

                    resolve(res)
                })
                .catch((error) => {
                    ElMessage({
                        message: 'err',
                        type: 'error'
                    })
                    reject(error)
                })
                .finally(() => {
                    loading.value = false
                })
        })
    }

    // 执行语句
    const run = (statement, loading) => {
        return new Promise((resolve, reject) => {
            if (loading) {
                loading.value = true
            }
            try {
                eval(`collection.${statement}`)
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
            } catch (error) {
                ElMessage({
                    message: error.message,
                    type: 'error'
                })
                if (loading) {
                    loading.value = false
                }
                reject(error)
            }
        })
    }

    // 获取索引
    const fetchIndex = (loading) => {
        return new Promise((resolve, reject) => {
            if (loading) {
                loading.value = true
            }
            // console.log('cc', cc.mongo.db.collection)

            // cc.mongo.db.collection(collectionName).getIndex()
            // db.collection(collectionName).getIndexes()
            // // collection
            //     // .doc(id)
            //     // .update(payload)
            //     .then((res) => {
            //         resolve(res)
            //     })
            //     .catch((error) => {
            //         reject(error)
            //     })
            //     .finally(() => {
            //         if (loading) {
            //             loading.value = false
            //         }
            //     })
        })
    }

    return {
        _,
        collection,
        fetch,
        count,
        fetchOne,
        update,
        remove,
        create,
        run,
        fetchIndex
    }
}
