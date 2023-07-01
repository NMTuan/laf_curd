<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2023-06-30 21:07:14
 * @LastEditTime: 2023-06-30 21:53:11
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \laf_curd\components\applications\list\item.vue
-->
<template>
    <li class="p-4 hover:(bg-gray-100)">
        <NuxtLink :to="{
            name: 'app-appid', params: {
                appid: data.appid
            }
        }">
            {{ data.name }} (appId: {{ data.appid }})
        </NuxtLink>
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
