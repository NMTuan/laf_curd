<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2023-07-01 18:13:40
 * @LastEditTime: 2023-07-02 16:43:40
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \laf_curd\pages\app\[appid]\database.vue
-->
<template>
    <LayoutTwoColumn>
        <template #side>
            <DatabaseList></DatabaseList>
        </template>
        <div>
            <div class="flex items-center mx-6 py-1">
                <div>当前策略：</div>
                <DatabasePolicy></DatabasePolicy>
            </div>
            <DatabaseRun></DatabaseRun>
            <DatabaseResponse></DatabaseResponse>
        </div>
    </LayoutTwoColumn>
</template>
<script setup>
const route = useRoute()
</script>
