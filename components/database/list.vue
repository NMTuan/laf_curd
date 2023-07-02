<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2023-06-30 21:25:04
 * @LastEditTime: 2023-07-02 17:51:05
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \laf_curd\components\database\list.vue
-->
<template>
    <div class="relative h-full">
        <LayoutLoading :loading="loading"></LayoutLoading>
        <DatabaseListItem v-for="item in collectionStore.list" :data="item"></DatabaseListItem>
        <div v-if="!loading && collectionStore.list.length === 0" class="h-full flex items-center justify-center">
            <div class="i-ri-database-2-line text-5xl text-gray-100"></div>
        </div>
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
