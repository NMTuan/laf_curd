<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2023-06-30 21:25:04
 * @LastEditTime: 2023-06-30 21:54:01
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \laf_curd\components\database\list.vue
-->
<template>
    <div>
        <h2>database</h2>
        <div v-if="error">error</div>
        <DatabaseListItem v-for="item in list" :data="item"></DatabaseListItem>
    </div>
</template>
<script setup>
const error = ref(false)
const route = useRoute()
const list = ref([])
request({
    path: `/v1/apps/${route.params.appid}/collections`,
})
    .then(res => {
        list.value = res.data
    })
    .catch(err => {
        error.value = true
    })
</script>
