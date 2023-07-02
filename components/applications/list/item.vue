<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2023-06-30 21:07:14
 * @LastEditTime: 2023-07-01 13:25:51
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \laf_curd\components\applications\list\item.vue
-->
<template>
    <li class="flex items-center justify-between rounded p-4 hover:(bg-gray-50)">
        <div>
            {{ data.name }} (appId: {{ data.appid }})
        </div>
        <ApplicationsListFunc :appid='data.appid'></ApplicationsListFunc>
    </li>
</template>
<script setup>
const props = defineProps({
    data: {
        type: Object,
        default: () => { }
    }
})
</script>
