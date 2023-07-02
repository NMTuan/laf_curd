<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2023-07-01 15:24:47
 * @LastEditTime: 2023-07-01 20:27:08
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \laf_curd\components\layout\loading.vue
-->
<template>
    <div v-if="loading" class="flex items-center justify-center absolute inset-0 bg-white/50 z-20">
        <div class="i-ri-loader-line animate-spin text-4xl text-gray-300"></div>
    </div>
</template>
<script setup>
const props = defineProps({
    loading: {
        type: Boolean,
        default: false
    }
})
</script>
