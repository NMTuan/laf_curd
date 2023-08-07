<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2023-07-16 12:23:49
 * @LastEditTime: 2023-07-16 13:16:52
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \laf_curd\components\manager\keys.vue
-->
<template>
    <el-dialog :model-value="visible" :before-close="handlerClose" titke="Keys" @open="handlerOpen">
        123
    </el-dialog>
</template>
<script setup>
import cc from '@lafjs/cloud'
// const { fetchIndex } = useCloud()
const props = defineProps({
    visible: {
        type: Boolean,
        default: false
    }
})
const emits = defineEmits(['update:visible'])
const handlerClose = () => {
    console.log(111)
    emits('update:visible', false)
}

const handlerOpen = () => {
    console.log(1, cc.mongo)
    // fetchIndex()
}
</script>
