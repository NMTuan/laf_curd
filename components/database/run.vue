<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2023-07-01 16:51:11
 * @LastEditTime: 2023-07-02 16:45:13
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \laf_curd\components\database\run.vue
-->
<template>
    <div class="relative px-6 py-2">
        <LayoutLoading :loading="loading"></LayoutLoading>
        <div class="flex">
            <button @click="query">
                <div class="i-ri-play-fill text-2xl mx-2"></div>
            </button>
            <input class="block flex-1  px-4 py-2 text-base font-mono" v-model="queryStore.query" />
        </div>
    </div>
</template>
<script setup>
import { Cloud } from 'laf-client-sdk'
const queryStore = useQueryStore()
let cloud = reactive()
let _ = reactive()
const route = useRoute()
const { appid } = route.params
const loading = ref(false)

const query = () => {
    if (!queryStore.collection.name) {
        queryStore.response = {
            ok: false,
            message: '请在左侧选择您要查询的集合'
        }
        return
    }
    if (!queryStore.policy) {
            queryStore.response = {
            ok: false,
            message: '请在上方选择访问策略'
        }
        return
    
    }
    try {
        loading.value = true
        eval(`cloud.database().collection('${queryStore.collection.name}').${queryStore.query}`)
            .then(response => {
                console.log(1)
                queryStore.response = response
            })
            .catch(err => {
                if (err.response) {
                    queryStore.response = {
                        ok: false,
                        message: err.response.data.code,
                        data: err.response.data.error
                    }
                } else {
                    queryStore.response = {
                        ok: false,
                        message: err.message
                    }
                }

            })
            .finally(() => {
                loading.value = false
            })
    } catch (err) {
        loading.value = false
        queryStore.response = {
            ok: false,
            message: err.message
        }
    }
}

watchEffect(() => {
    if (!queryStore.policy) {
        return
    }
    cloud = new Cloud({
        baseUrl: `https://${appid}.laf.run`,
        dbProxyUrl: `/proxy/${queryStore.policy}`
    })
    _ = cloud.database().command


})

</script>
