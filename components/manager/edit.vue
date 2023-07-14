<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2023-07-13 17:22:21
 * @LastEditTime: 2023-07-14 14:42:22
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \laf_curd\components\manager\edit.vue
-->
<template>
    <el-drawer title="Edit" :model-value="visible" direction="rtl" :before-close="handlerClose" @open="handlerOpen">
        <el-input type="textarea" v-model="formData" class="h-full"></el-input>
        <template #footer>
            <el-button class="w-full" type="primary" :loading="loading" @click="handlerSubmit">update</el-button>
        </template>
    </el-drawer>
</template>
<script setup>
const { fetchOne, update } = useCloud()
const props = defineProps({
    visible: {
        type: Boolean,
        default: false
    },
    id: {
        type: String,
        default: ''
    }
})
const emits = defineEmits(['update:visible', 'fetch'])
const loading = ref(false)
const formData = ref('')
const handlerClose = () => {
    emits('update:visible', false)
}
const handlerOpen = () => {
    fetchOne({
        query: {
            _id: props.id
        }
    }, loading).then(res => {
        if (res.ok) {
            delete res.data._id
            formData.value = JSON.stringify(res.data, null, 2)
        }
    })
}

const handlerSubmit = () => {
    const data = JSON.parse(formData.value)
    delete data._id
    update({
        id: props.id,
        payload: data
    }, loading).then(res => {
        handlerClose()
        emits('fetch')
    })
}
</script>
<style lang="scss" scoped>
:deep() {
    .el-textarea__inner {
        @apply h-full;
    }
}
</style>
