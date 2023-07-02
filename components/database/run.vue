<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2023-07-01 16:51:11
 * @LastEditTime: 2023-07-02 21:03:41
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
            <input class="block flex-1  px-4 py-2 text-base font-mono" v-model="queryStore.statement" />
        </div>
    </div>
</template>
<script setup>
import { Cloud } from 'laf-client-sdk'
const queryStore = useQueryStore()
const route = useRoute()
const { appid } = route.params
const loading = ref(false)

const query = async () => {
    loading.value = true
    await queryStore.query()
    loading.value = false
}

watchEffect(() => {
    if (!queryStore.policy) {
        return
    }
    const cloud = new Cloud({
        baseUrl: `https://${appid}.laf.run`,
        dbProxyUrl: `/proxy/${queryStore.policy}`
    })
    queryStore.updateCloud(cloud)
})

</script>
