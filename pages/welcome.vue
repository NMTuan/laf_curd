<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2023-06-30 20:33:22
 * @LastEditTime: 2023-06-30 20:53:15
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \laf_curd\pages\welcome.vue
-->
<template>
    <div>
        <div v-if="error">error</div>
        welcome !

        <p>requestUrl：{{ requestUrl }}</p>

        <p>pat：{{ pat }}</p>

        <p><button @click="handlerLogin">login</button></p>
    </div>
</template>
<script setup>
const runtimeConfig = useRuntimeConfig()
const userStore = useUserStore()
const { requestUrl, pat } = runtimeConfig.public
const error = ref(false)

const handlerLogin = async () => {
    if (!requestUrl || !pat) {
        error.value = true
        return
    }
    error.value = false
    request({
        path: '/v1/auth/pat2token',
        method: 'POST',
        body: {
            pat
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
}

</script>
