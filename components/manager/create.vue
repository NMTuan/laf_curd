<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2023-07-13 17:22:21
 * @LastEditTime: 2023-07-14 10:23:01
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \laf_curd\components\manager\create.vue
-->
<template>
    <el-drawer title="Create" :model-value="visible" direction="rtl" :before-close="handlerClose" @open="handlerOpen">
        <el-input type="textarea" v-model="formData" class="h-full"></el-input>
        <template #footer>
            <el-button class="w-full" type="primary" :loading="loading" @click="handlerSubmit">submit</el-button>
        </template>
    </el-drawer>
</template>
<script setup>
const { create } = useCloud()
const props = defineProps({
    visible: {
        type: Boolean,
        default: false
    },
    fields: {
        type: Array,
        default: () => []
    }
})
const emits = defineEmits(['update:visible', 'fetch'])
const loading = ref(false)
const formData = ref('')
const handlerClose = () => {
    emits('update:visible', false)
}
const handlerOpen = () => {
    const fields = props.fields.reduce((total, item) => {
        if (item.key !== '_id') {
            total[item.key] = ''
        }
        return total
    }, {})
    formData.value = JSON.stringify(fields, null, 2)
}

const handlerSubmit = () => {
    const data = JSON.parse(formData.value)
    delete data._id
    create(data, loading).then(res => {
        handlerClose()
        emits('fetch')
    })
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

:deep() {
    .el-textarea__inner {
        @apply h-full;
    }
}
</style>
