<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2023-07-01 10:36:06
 * @LastEditTime: 2023-07-01 22:57:56
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \laf_curd\layouts\default.vue
-->
<template>
    <div>
        <LayoutHeader></LayoutHeader>
        {{ route.params }} configStore:{{ configStore.appid }}
        <slot></slot>
        <LayoutFooter></LayoutFooter>
    </div>
</template>
<script setup>
const route = useRoute()
const configStore = useConfigStore()

</script>
