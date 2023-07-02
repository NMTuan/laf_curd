<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2023-07-02 22:18:45
 * @LastEditTime: 2023-07-02 22:29:57
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \laf_curd\components\database\detail.vue
-->
<template>
    <div class="detail p-4 break-words">
        <table>
            <template v-for="(val, key) in data">
                <tr>
                    <th>{{ key }}</th>
                </tr>
                <tr>
                    <td>{{ val }}</td>
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
