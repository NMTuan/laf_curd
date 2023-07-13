<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2023-07-13 17:22:21
 * @LastEditTime: 2023-07-13 17:47:46
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \laf_curd\components\manager\detail.vue
-->
<template>
    <el-drawer title="detail" :model-value="visible" direction="rtl" :before-close="handlerClose">
        <el-descriptions class="descriptions" direction="vertical" :column="1" border>
            <el-descriptions-item v-for=" (val, key) in data" :label="key">
                <pre v-if="(typeof val === 'object')">{{ val }}</pre>
                <span v-else>{{ val }}</span>
            </el-descriptions-item>
        </el-descriptions>
        <!-- <pre>{{ data }}</pre> -->
    </el-drawer>
</template>
<script setup>
const props = defineProps({
    visible: {
        type: Boolean,
        default: false
    },
    data: {
        type: Object,
        default: () => { }
    }
})
const emits = defineEmits(['update:visible'])
const handlerClose = () => {
    emits('update:visible', false)
}
</script>
<style lang="scss" scoped>
.descriptions {
    :deep() {
        .el-descriptions__label {
            @apply font-bold;
        }
    }
}
</style>
