<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2023-07-01 16:51:11
 * @LastEditTime: 2023-07-02 14:43:30
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
let cloud, _
const route = useRoute()
const { appid } = route.params
const loading = ref(true)
const currentPolicy = useCookie(`laf_curd_policy_${appid}`)

const query = () => {
    if (!queryStore.collection.name) {
        queryStore.response = {
            ok: false,
            message: '请在左侧选择您要查询的集合'
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

onMounted(() => {
    cloud = new Cloud({
        baseUrl: `https://${appid}.laf.run`,
        dbProxyUrl: `/proxy/${currentPolicy.value}`
    })
    _ = cloud.database().command
    loading.value = false
})
</script>
