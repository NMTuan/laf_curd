<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2023-06-30 21:25:04
 * @LastEditTime: 2023-07-02 11:13:15
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \laf_curd\components\database\list.vue
-->
<template>
    <div class="relative h-full">
        <LayoutLoading :loading="loading"></LayoutLoading>
        <DatabaseListItem v-for="item in collectionStore.list" :data="item"></DatabaseListItem>
    </div>
</template>
<script setup>
const collectionStore = useCollectionStore()
const loading = ref(false)

const getList = async () => {
    loading.value = true
    await collectionStore.fetch()
    loading.value = false
}

getList()
</script>
