<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2023-07-01 11:13:04
 * @LastEditTime: 2023-07-01 15:40:35
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \laf_curd\components\layout\panel.vue
-->
<template>
    <div class="container mx-auto">
        <div class="mt-4 p-6 bg-white shadow rounded min-h-75vh flex flex-col">
            <div class="header">
                <div class="title">
                    <slot name="title">{{ title }}</slot>
                </div>
                <slot name="description"></slot>
            </div>
            <div class="flex-1 flex flex-col relative">
                <LayoutLoading v-if="loading" :loading="loading"></LayoutLoading>
                <slot></slot>
            </div>
        </div>
    </div>
</template>
<script setup>
const props = defineProps({
    title: {
        type: String,
        default: ''
    },
    loading: {
        type: Boolean,
        defaul: false
    }
})

</script>
<style lang="scss" scoped>
.header {
    @apply mb-4 px-2;
    @apply border-b-1 border-gray-200 border-b-solid;
    @apply flex items-center justify-between;

}

.title {
    @apply text-lg font-bold leading-10;
}
</style>
