<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2023-07-13 09:34:02
 * @LastEditTime: 2023-07-15 10:12:53
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \laf_curd\components\manager\header.vue
-->
<template>
    <div class="flex-1 flex flex-col justify-between overflow-hidden">
        <div class="flex items-center justify-end flex-1 overflow-hidden text-sm px-4">
            <a :href="item.url" target="_blank" v-for="item in urls">
                {{ item.label }}</a>
        </div>
        <div class="ml-4 flex-shrink-0">
            <ManagerTab></ManagerTab>
        </div>
    </div>
</template>
<script setup>
const urls = [
    // { label: 'Laf', url: 'https://laf.run/' },
    { label: 'GitHub', url: 'https://github.com/NMTuan/laf_curd' }
]
</script>
<style lang="scss" scoped>
a {
    @apply text-teal-200;
    @apply no-underline;
    @apply ml-4;

    &:hover {
        @apply underline underline-teal-200;
    }
}
</style>
