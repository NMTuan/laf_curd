<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2023-06-30 20:33:22
 * @LastEditTime: 2023-07-15 21:15:56
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \laf_curd\pages\welcome.vue
-->
<template>
    <NuxtLayout name="manager">
        <div class="welcome flex flex-col items-center justify-center flex-1 overflow-hidden">
            <div class="bg-white border border-solid border-gray-200 rounded p-10 shadow">
                <h2 class="text-center mb-16">Laf x DB</h2>
                <div class="mb-6 w-100">
                    <el-input size="large" placeholder="API URL" v-model="configStore.apiUrl"></el-input>
                </div>
                <div class="mb-10 w-100">
                    <el-input size="large" placeholder="PAT" v-model="configStore.pat"></el-input>
                </div>
                <div class="mb-6 w-100">
                    <el-button size="large" type="primary" class="w-full" @click="handlerLogin" :loading="loading">
                        Sign In
                    </el-button>
                </div>
            </div>
            <div class="text-xs mt-4">
                <a class="text-gray-400" href="https://github.com/NMTuan/laf_curd" target="_blank">Github</a>
            </div>
        </div>
    </NuxtLayout>
</template>
<script setup>
import { useConfigStore } from '@/stores/config'
const userStore = useUserStore()
const configStore = useConfigStore()
const loading = ref(false)

const handlerLogin = async () => {
    if (!configStore.apiUrl || !configStore.pat) {
        return
    }
    loading.value = true
    request({
        path: '/v1/auth/pat2token',
        method: 'POST',
        body: {
            pat: configStore.pat
        }
    })
        .then((res) => {
            if (res.data) {
                userStore.$patch({
                    token: res.data
                })
                navigateTo({ name: 'index' })
            }
        })
        .catch((err) => {
            // error.value = true
        })
        .finally(() => {
            loading.value = false
        })
}
</script>
<style scoped lang="scss">
.welcome {
    background-image: url('/texture.png');
}
</style>
