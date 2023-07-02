<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2023-06-30 21:03:04
 * @LastEditTime: 2023-07-02 17:13:58
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \project\laf_curd\components\applications\list.vue
-->
<template>
    <LayoutPanel title="Application" :loading="loading">
        <ApplicationsListItem v-for="item in appStore.list" :data="item"></ApplicationsListItem>
    </LayoutPanel>
</template>
<script setup>
import { useAppStore } from '@/stores/app'
const appStore = useAppStore()
const loading = ref(false)

const getList = async () => {
    loading.value = true
    await appStore.fetch()
    loading.value = false
}

getList()
</script>
