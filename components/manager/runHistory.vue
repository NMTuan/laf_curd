<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2023-07-14 14:40:50
 * @LastEditTime: 2023-07-15 19:03:41
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \laf_curd\components\manager\runHistory.vue
-->
<template>
    <el-drawer title="History" :model-value="visible" direction="rtl" :before-close="handlerClose">
        <el-timeline class="pl-0">
            <el-timeline-item v-for="item in history" :key="item.date" placement="top"
                :timestamp="new Date(item.date).toLocaleString()">
                <div @click="handlerClick(item.statement)"
                    class=" border border-solid border-gray-200 rounded cursor-pointer hover:(border-teal-500 bg-teal-50)">

                    <el-scrollbar class="p-4">
                        <pre>{{ item.statement }}</pre>
                    </el-scrollbar>
                </div>
            </el-timeline-item>
        </el-timeline>
    </el-drawer>
</template>
<script setup>
const props = defineProps({
    visible: {
        type: Boolean,
        default: false
    }
})
const emits = defineEmits(['search'])
const history = useCookie('laf_curd_runHistory', {
    default: () => []
})

const handlerClose = () => {
    emits('update:visible', false)
}
const handlerClick = (statement) => {
    emits('search', statement)
    handlerClose()
}
</script>
