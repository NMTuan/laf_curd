/*
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2023-07-01 17:16:50
 * @LastEditTime: 2023-07-15 15:38:16
 * @LastEditors: NMTuan
 * @Description:
 * @FilePath: \laf_curd\stores\query.ts
 */
import { defineStore } from 'pinia'
interface History {
    statement: string
    date: number
}

export const useQueryStore = defineStore('useQueryStore', () => {
    // 当前实例
    const appid = ref('')
    // 当前集合
    const collection = ref({})
    // 查询语句
    const statement = ref('get()')
    const history: Ref<History[]> = ref([])
    // cloud 实例
    const cloud = ref()
    const updateCloud = (newCloud) => {
        cloud.value = newCloud
    }
    // 查询
    const query = () => {
        return new Promise((resolve, reject) => {
            if (!collection.value.name) {
                response.value = {
                    ok: false,
                    message: '请在左侧选择您要查询的集合'
                }
                return resolve('')
            }
            try {
                const _ = cloud.value.database().command
                eval(
                    `cloud.value.database().collection('${collection.value.name}').${statement.value}`
                )
                    .then((res) => {
                        response.value = res
                        addHistory()
                        resolve('')
                    })
                    .catch((err) => {
                        if (err.response) {
                            response.value = {
                                ok: false,
                                message: err.response.data.code,
                                data: err.response.data.error
                            }
                        } else {
                            response.value = {
                                ok: false,
                                message: err.message
                            }
                        }
                        resolve('')
                    })
            } catch (err) {
                response.value = {
                    ok: false,
                    message: err.message
                }
                resolve('')
            }
        })
    }
    // 查询结果
    const response = ref({})
    // 手工更新查询结果
    const updateResponse = (val: object) => {
        response.value = val
    }
    // 插入历史
    const addHistory = () => {
        history.value = history.value.filter((item) => {
            return item.statement !== statement.value
        })
        history.value.push({
            statement: statement.value,
            date: Date.now()
        })
    }

    // 切换appid的时候，清理暂存信息
    const clear = () => {
        collection.value = {}
        response.value = {}
    }

    const updateById = (payload: any) => {
        return new Promise(async (resolve, reject) => {
            const id = payload._id
            if (!id) {
                alert('no find _id')
                return resolve('')
            }
            delete payload._id
            await cloud.value
                .database()
                .collection(collection.value.name)
                .doc(id)
                .update(payload)
            await query()
            resolve('')
        })
    }

    // 删除
    const removeById = (id: string) => {
        return new Promise(async (resolve, reject) => {
            if (!id) {
                return resolve('')
            }
            const cfm = confirm('确定要删除么？')
            if (!cfm) {
                return resolve('')
            }
            await cloud.value
                .database()
                .collection(collection.value.name)
                .doc(id)
                .remove()
            await query()
            resolve('')
            // `cloud.value.database().collection('${collection.value.name}').${statement.value}`
        })
    }

    watchEffect(() => {
        if (history.value.length === 0) {
            history.value =
                JSON.parse(localStorage.getItem('laf_curd_query_history')) || []
        } else {
            localStorage.setItem(
                'laf_curd_query_history',
                JSON.stringify(history.value)
            )
        }
    })

    return {
        appid,
        collection,
        statement,
        query,
        cloud,
        updateCloud,
        response,
        updateResponse,
        clear,
        updateById,
        removeById,
        history
    }
})
