<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2023-08-08 07:34:55
 * @LastEditTime: 2023-08-13 11:16:19
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
                        <div v-if="column.rawColumnKey === 'key' && exitsCol(row.key)">{{ row[column.rawColumnKey] }}</div>
                        <div v-else-if="column.rawColumnKey === 'position'" class="flex items-center justify-around">
                            <el-link :underline="false" @click="handlerSort('top', $index)"
                                :disabled="sortDisabled('top', $index)">
                                <div class="i-ri-skip-up-line text-lg"></div>
                            </el-link>
                            <el-link :underline="false" @click="handlerSort('up', $index)"
                                :disabled="sortDisabled('up', $index)">
                                <div class="i-ri-arrow-up-s-line text-lg"></div>
                            </el-link>
                            <el-link :underline="false" @click="handlerSort('down', $index)"
                                :disabled="sortDisabled('down', $index)">
                                <div class="i-ri-arrow-down-s-line text-lg"></div>
                            </el-link>
                            <el-link :underline="false" @click="handlerSort('end', $index)"
                                :disabled="sortDisabled('end', $index)">
                                <div class="i-ri-skip-down-line text-lg"></div>
                            </el-link>
                        </div>
                        <el-popconfirm v-else-if="column.rawColumnKey === 'remove'" confirm-button-text="删除"
                            confirm-button-type="danger" cancel-button-text="取消" cancel-button-type="default" hide-icon
                            :title="`确定要删除“${row.title || row.key || '此字段'}”吗？`" width="240"
                            @confirm="handlerRemove($index)">
                            <template #reference>
                                <div class="i-ri-close-line text-lg cursor-pointer" hover="text-red-600"></div>
                            </template>
                        </el-popconfirm>
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
                <el-link type="primary" class="mr-4" @click="addField">
                    <div class="i-ri-add-line"></div>
                    新增字段
                </el-link>
                <el-button @click="dialogVisible = false">取消</el-button>
                <el-button :loading="loading" type="primary" @click="handlerSubmit">
                    提交
                </el-button>
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
    { key: 'position', label: '', width: 200 },
    { key: 'remove', label: '', width: 42 },
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

// 增加字段
const addField = () => {
    fields.value.push({
        key: '',
        title: '',
        width: 200
    })
}

// 判断是否为新增字段, 新增字段可以编辑 key
const exitsCol = (key) => {
    if (key === '') {
        return false
    }
    return props.columns.find(item => item.key === key) ? true : false
}

// 移除字段
const handlerRemove = (index) => {
    fields.value.splice(index, 1)
}

// 排序
const handlerSort = (action, index) => {
    const handler = {
        top: () => {
            return 0
        },
        up: () => {
            return index - 1
        },
        down: () => {
            return index + 1
        },
        end: () => {
            return fields.value.length - 1
        }
    }
    let position = handler[action]()
    const item = fields.value.splice(index, 1)[0]
    fields.value.splice(position, 0, item)
}

// 排序按钮的禁用状态
const sortDisabled = (action, index) => {
    if (index === 0 && ['top', 'up'].includes(action)) {
        return true
    }
    if (index === fields.value.length - 1 && ['end', 'down'].includes(action)) {
        return true
    }

    return false
}
</script>
