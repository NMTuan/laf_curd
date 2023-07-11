<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2023-07-02 22:18:45
 * @LastEditTime: 2023-07-11 14:57:24
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \laf_curd\components\database\detail.vue
-->
<template>
    <div class="detail p-4 break-words">
        <table class="w-full">
            <template v-for="(val, key) in data">
                <tr>
                    <th>{{ key }}</th>
                </tr>
                <tr class="text-sm">
                    <td v-if="typeof val==='object'"><pre>{{ JSON.stringify(val, null, 2) }}</pre></td>
                    <td v-else>{{ val }}</td>
                </tr>
            </template>
        </table>
    </div>
</template>
<script setup>
const props = defineProps({
    data: {
        type: Object,
        default: () => { }
    }
})
</script>
<style scoped lang="scss">
.detail {
    @apply border;

    th {
        @apply bg-gray-200;
        @apply p-2;
    }

    td {
        @apply p-2;
    }
}
</style>
