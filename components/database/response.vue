<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2023-07-01 17:34:07
 * @LastEditTime: 2023-07-02 20:30:50
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \laf_curd\components\database\response.vue
-->
<template>
    <div class="break-words px-6 py-2">
        <LayoutLoading :loading="loading"></LayoutLoading>
        <div v-if="!queryStore.response.ok">
            <div v-if="queryStore.response.message">
                {{ queryStore.response.message }}
            </div>
        </div>
        <div v-if="queryStore.response.ok">
            <div v-if="queryStore.response.message">
                {{ queryStore.response.message }}
            </div>
            <DatabaseTable v-else-if="Array.isArray(queryStore.response.data)" :data="queryStore.response.data">
            </DatabaseTable>
            <pre v-else>{{ queryStore.response }}</pre>
        </div>
    </div>
</template>
<script setup>
const loading = ref(false)
const queryStore = useQueryStore()
</script>
<style scoped lang="scss">
.a {
    @apply text-teal-500;
    @apply cursor-pointer;
    @apply ml-2;
    --at-apply: hover:(text-teal-600);
}
</style>
