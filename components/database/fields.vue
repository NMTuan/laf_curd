<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2023-08-08 07:34:55
 * @LastEditTime: 2023-08-12 15:05:11
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \laf_curd\components\database\fields.vue
-->
<template>
    <div>
        <!-- 按钮 -->
        <el-button @click="dialogVisible = true">
            <div class="i-ri-table-line text-base"> </div>
        </el-button>
        <!-- 弹窗 -->
        <el-dialog v-model="dialogVisible" title="Fields" :close-on-click-modal="false" :close-on-press-escape="false"
            @open="handlerOpen" width="80%">
            <el-table :data="fields" class="w-full" :row-class-name="handlerRowClass">
                <el-table-column :label="col.label" :key="col.key" :width="col.width" v-for="col in columns">
                    <template #default="{ row, column, $index }">
                        <span v-if="column.rawColumnKey === 'key'">{{ row[column.rawColumnKey] }}</span>
                        <el-input-number v-else-if="column.rawColumnKey === 'width'" size=""
                            v-model="fields[$index][column.rawColumnKey]" :min="150" :step="10" />
                        <el-radio-group v-else-if="column.rawColumnKey === 'align'" size=""
                            v-model="fields[$index][column.rawColumnKey]">
                            <el-radio-button label="">居左</el-radio-button>
                            <el-radio-button label="center">居中</el-radio-button>
                            <el-radio-button label="right">居右</el-radio-button>
                        </el-radio-group>
                        <el-radio-group v-else-if="column.rawColumnKey === 'fixed'" size=""
                            v-model="fields[$index][column.rawColumnKey]">
                            <el-radio-button label="">不浮</el-radio-button>
                            <el-radio-button label="left">左浮</el-radio-button>
                            <el-radio-button label="right">右浮</el-radio-button>
                        </el-radio-group>
                        <el-switch v-else-if="column.rawColumnKey === 'hidden'" size=""
                            v-model="fields[$index][column.rawColumnKey]" inline-prompt :active-value="false"
                            active-text="显示" :inactive-value="true" inactive-text="隐藏" />
                        <el-input v-else size="" v-model="fields[$index][column.rawColumnKey]"></el-input>
                    </template>
                </el-table-column>
            </el-table>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogVisible = false">取消</el-button>
                    <el-button :loading="loading" type="primary" @click="handlerSubmit">
                        提交
                    </el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>
<script setup>
const { updateFieldConfig } = useCloud()
const props = defineProps({
    id: {
        type: String,
        default: ''
    },
    columns: {
        type: Array,
        default: () => []
    }
})
const emits = defineEmits(['update:columns'])
const dialogVisible = ref(false)
const loading = ref(false)
const fields = ref([])
const columns = [
    { key: 'key', label: '字段' },
    { key: 'title', label: '名称' },
    { key: 'align', label: '对齐方式', width: 210 },    // 对齐方式
    { key: 'fixed', label: '固定列', width: 210 },    // 固定列
    { key: 'width', label: '列宽', width: 180 },
    { key: 'hidden', label: '显示', width: 80 }, // 隐藏
]

// 打开弹窗
const handlerOpen = () => {
    fields.value = JSON.parse(JSON.stringify(props.columns))
}

// 隐藏时,该行变淡
const handlerRowClass = ({ row }) => {
    return row.hidden ? 'opacity-50' : ''
}

// 提交表单
const handlerSubmit = async () => {
    loading.value = true
    await updateFieldConfig(props.id, JSON.parse(JSON.stringify(fields.value)))
    emits('update:columns', JSON.parse(JSON.stringify(fields.value)))
    loading.value = false
    dialogVisible.value = false
}
</script>
