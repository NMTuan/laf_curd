<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2023-06-30 19:16:42
 * @LastEditTime: 2023-07-15 07:21:10
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \laf_curd\app.vue
-->
<template>
  <NuxtPage />
</template>
<script setup>
import { useConfigStore } from '@/stores/config'
import { useQueryStore } from '@/stores/query'
const configStore = useConfigStore()
const queryStore = useQueryStore()

// 每当appid变更时，清理掉当前appid中的暂存信息
watch(() => configStore.appid, (val) => {
  if (val) {
    queryStore.clear()
  }
})
</script>
<style>
html,
body {
  @apply m-0;
  @apply bg-white text-gray-600;
}
</style>
