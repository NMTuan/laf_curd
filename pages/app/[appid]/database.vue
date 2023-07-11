<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2023-07-01 18:13:40
 * @LastEditTime: 2023-07-11 14:51:32
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \laf_curd\pages\app\[appid]\database.vue
-->
<template>
    <LayoutTwoColumn>
        <template #side>
            <DatabaseList></DatabaseList>
        </template>
        <div v-if="queryStore.collection.name">
            <DatabaseRun></DatabaseRun>
            <DatabaseResponse></DatabaseResponse>
        </div>
    </LayoutTwoColumn>
</template>
<script setup>
const queryStore = useQueryStore()
</script>
