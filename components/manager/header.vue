<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2023-07-13 09:34:02
 * @LastEditTime: 2023-07-14 16:16:47
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \laf_curd\components\manager\header.vue
-->
<template>
    <div class="flex-1 flex flex-col justify-between overflow-hidden">
        <div>header</div>
        <div class="ml-4">
            <ManagerTab></ManagerTab>
        </div>
    </div>
</template>
<script setup>
const tabStore = useTabStore()
</script>
