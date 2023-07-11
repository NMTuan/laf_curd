<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2023-06-30 20:33:22
 * @LastEditTime: 2023-07-03 07:04:37
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \laf_curd\pages\welcome.vue
-->
<template>
    <LayoutPanel title="welcome !">
        <LayoutLoading :loading="loading"></LayoutLoading>
        <div v-if="error">error</div>

        <p>请先配置以下信息：</p>


        <p>api url: <input type="text" v-model="configStore.apiUrl"></p>
        <p>pat: <input type="text" v-model="configStore.pat"></p>


        <!-- <p>requestUrl：{{ requestUrl }}</p> -->

        <!-- <p>pat：{{ pat }}</p> -->

        <p><button @click="handlerLogin">login</button></p>
    </LayoutPanel>
</template>
<script setup>
import { useConfigStore } from '@/stores/config';
// const runtimeConfig = useRuntimeConfig()
const userStore = useUserStore()
const configStore = useConfigStore()
// const { requestUrl, pat } = runtimeConfig.public
const error = ref(false)
const loading = ref(false)

const handlerLogin = async () => {
    if (!configStore.apiUrl || !configStore.pat) {
        error.value = true
        return
    }
    error.value = false
    loading.value = true
    request({
        path: '/v1/auth/pat2token',
        method: 'POST',
        body: {
            pat: configStore.pat
        }
    })
        .then(res => {
            if (res.data) {
                userStore.$patch({
                    token: res.data
                })
                navigateTo({ name: 'index' })
            }
        })
        .catch(err => {
            error.value = true
        })
        .finally(() => {
            loading.value = false
        })
}

</script>
