<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2023-07-12 14:54:31
 * @LastEditTime: 2023-07-12 19:19:39
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \laf_curd\components\scrollBox.vue
-->
<template>
    <simplebar class="h-full outline-none">
        <slot></slot>
    </simplebar>
</template>
<script setup>
import simplebar from 'simplebar-vue'
</script>
<style lang="scss" scoped>
:deep(.simplebar-content-wrapper) {
    @apply outline-none;
}
</style>
