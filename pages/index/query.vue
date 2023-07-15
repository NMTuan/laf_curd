<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2023-07-15 09:39:54
 * @LastEditTime: 2023-07-15 19:12:13
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \laf_curd\pages\index\query.vue
-->
<template>
    <div class="overflow-hidden flex-1 flex flex-col bg-gray-100" v-loading="loading">
        <div class="p-4 pb-0">
            <el-input ref="textarea" type="textarea" v-model="q" clearable @keydown="handlerKeydown"
                :autosize="{ minRows: 4 }"></el-input>
        </div>
        <div class="p-4 flex items-center justify-between">
            <el-select v-model="currentAppid" class="mr-2 w-48" placeholder="Select App">
                <el-option v-for="item in appStore.list" :key="item._id" :label="item.name" :value="item.appid" />
            </el-select>
            <el-select v-model="currentCollection" class="mr-2 w-72" placeholder="Select Collection">
                <el-option v-for="item in collectionStore.list" :key="item.info.uuid" :label="item.name"
                    :value="item.name" />
            </el-select>
            <el-button-group class="mr-2 flex-shrink-0">
                <el-button type="primary" @click="handlerRun">
                    <div class="i-ri-play-fill mr-1"></div>
                    Run <span class="text-xs opacity-75 ml-2">( Ctrl+Enter | Alt+Enter )</span>
                </el-button>
                <el-button title="History" @click="historyVisible = true">
                    <div class="i-ri-history-line"></div>
                </el-button>
            </el-button-group>

            <div class="flex-1"></div>
            <el-button-group class="ml-2 flex-shrink-0">
                <el-button :disabled="currentRowIndex === -1" @click="detailVisible = true">Detail</el-button>
                <el-button :disabled="currentRowIndex === -1" @click="editVisible = true">Edit</el-button>
                <el-button :disabled="currentRowIndex === -1" @click="handlerDelete">Delete</el-button>
            </el-button-group>
        </div>
        <template v-if="Object.keys(res).length > 0">
            <el-scrollbar class="mx-4 bg-white">
                <el-descriptions class="description" :column="1" border>
                    <el-descriptions-item :label="key" v-for="(val, key) in res">
                        <pre v-if="(typeof val === 'object')">{{ val }}</pre>
                        <span v-else>{{ val }}</span>
                    </el-descriptions-item>
                </el-descriptions>
            </el-scrollbar>
        </template>
        <!-- 表格 -->
        <div v-else class="flex-1 overflow-hidden mx-4 ">
            <el-auto-resizer>
                <template #default="{ width, height }">
                    <el-table-v2 class="table" :row-class="handlerRowClass" fixed :columns="columns" :data="list"
                        :width="width" :height="height">
                        <template #cell="{ column, columns, columnIndex, depth, style, rowData, rowIndex }">
                            <div class="flex items-center flex-1 h-full text-sm overflow-hidden px-2"
                                @click="handlerCellClick({ rowIndex })" @dblclick="handlerCellDblclick()">
                                <div class="truncate">{{ rowData[column.title] }}</div>
                            </div>
                        </template>
                    </el-table-v2>
                </template>
            </el-auto-resizer>
        </div>

        <div class="h-4"></div>

        <ManagerDetail :data="list[currentRowIndex]" v-model:visible="detailVisible"></ManagerDetail>
        <ManagerEdit :id="list[currentRowIndex]?._id" v-model:visible="editVisible" @fetch="handlerRun"
            :appid="currentAppid" :collection-name="currentCollection"></ManagerEdit>
        <ManagerRunHistory v-model:visible="historyVisible" @search="handlerHistorySearch"></ManagerRunHistory>
    </div>
</template>
<script setup>
let remove, run;
const appStore = useAppStore()
const collectionStore = useCollectionStore()

const loading = ref(false)
const currentAppid = useCookie('laf_curd_currentAppid')
const currentCollection = useCookie('laf_curd_currentCollection')

const columns = ref([]) // 表格列配置项
const res = ref({}) // 返回数据,非array
const list = ref([]) // 表格数据
const currentRowIndex = ref(-1) // 当前行索引
const detailVisible = ref(false)
const editVisible = ref(false)
const historyVisible = ref(false)
const textarea = ref()


// 搜索框的内容
const q = useCookie('laf_curd_q', {
    default: () => 'get()'
})
const history = useCookie('laf_curd_runHistory', {
    default: () => []
})

// 单元格的点击事件
const handlerCellClick = ({ rowIndex }) => {
    currentRowIndex.value = rowIndex
}

// 单元格的双击事件 
const handlerCellDblclick = () => {
    // 如果未选择内容，则打开详情
    const selected = window.getSelection().toString()
    if (selected.trim() === '') {
        detailVisible.value = true
    }
}

// 处理row的样式
const handlerRowClass = ({ rowIndex }) => {
    if (currentRowIndex.value === rowIndex) {
        return 'bg-teal-50 hover:important-bg-teal-50'
    } else {
        return ''
    }
}

// 删除数据
const handlerDelete = () => {
    remove(list.value[currentRowIndex.value]._id)
        .then(res => {
            handlerRun()
        })
        .catch(err => {
        })
}

// 处理表格列
const handlerColumns = (data) => {
    if (!data) {
        columns.value = []
        return
    }
    let item
    if (Array.isArray(data) && data.length > 0) {
        item = data[0]
    } else if (typeof data === 'object') {
        item = data
    }
    if (item) {
        columns.value = Object.keys(item).reduce((total, key) => {
            total.push({
                key: key,
                dataKey: key,
                title: key,
                width: 200
            })
            return total
        }, [])
    } else {
        columns.value = []
    }
}

// 按下搜索
const handlerRun = () => {
    if (!currentAppid.value) {
        ElMessage({
            message: 'Please select App first',
            type: 'error'
        })
        return
    }
    if (!currentCollection.value) {
        ElMessage({
            message: 'Please select Collection first',
            type: 'error'
        })
        return
    }
    currentRowIndex.value = -1
    list.value = []
    res.value = {}
    run(q.value, loading)
        .then(response => {
            handlerColumns(response.data)
            history.value = history.value.filter(item => item.statement !== q.value) || []
            history.value.unshift({
                statement: q.value,
                date: Date.now()
            })

            if (!response.data) {
                return
            }
            if (Array.isArray(response.data)) {
                list.value = response.data
            } else {
                res.value = response.data
            }
        })
}
// 点击历史进行搜索
const handlerHistorySearch = (statement) => {
    q.value = statement
    // 点击历史不一定是想要直接查询，所以这里先去掉
    // handlerRun()
}

// 处理文本域按键
const handlerKeydown = (e) => {
    const { key, ctrlKey, altKey, shiftKey } = e
    if (key.toLocaleLowerCase() === 'tab') {
        e.preventDefault()
        if (shiftKey) {
            return
        }
        const startPos = e.target.selectionStart;
        const endPos = e.target.selectionEnd;
        const value = q.value;
        q.value = value.slice(0, startPos) + '    ' + value.slice(endPos);
        // 将光标移动到插入空格后的位置
        nextTick(() => {
            e.target.selectionStart = e.target.selectionEnd = startPos + 4
            // textarea.value.selectionStart = startPos + 4;
            // textarea.value.selectionEnd = startPos + 4;
        });
    }
    if (key.toLocaleLowerCase() === 'enter' && (ctrlKey || altKey)) {
        e.preventDefault()
        handlerRun()
    }
}

// 监听选择 appid
watch(currentAppid, (val) => {
    currentCollection.value = ''
    collectionStore.fetch(currentAppid.value)
})
// 上面watch如果用immediate,则会导致cookie中的collection丢失,所以单独fetch一下.
if (currentAppid.value) {
    collectionStore.fetch(currentAppid.value)
}

// 监听选择 collection
watch(currentCollection, (val) => {
    if (val) {
        const cloud = useCloud({
            appid: currentAppid.value,
            collectionName: val
        })
        remove = cloud.remove
        run = cloud.run
    } else {
        remove = undefined
        run = undefined
    }
}, {
    immediate: true
})

</script>
<style lang="scss" scoped>
.table {
    :deep() {

        .el-table-v2__header,
        .el-table-v2__header-cell {
            @apply bg-white;
        }

        .el-table-v2__row-cell {
            @apply px-0;
        }
    }
}

.pager {
    :deep() {

        button,
        li:not(.is-active) {
            @apply important-bg-white;
        }
    }
}

.description {
    :deep() {
        .el-descriptions__table.is-bordered .el-descriptions__cell {
            @apply border-x-0;
        }


        .el-descriptions__label.el-descriptions__cell.is-bordered-label {
            @apply bg-white;
            @apply font-bold;
            @apply text-right;
            // @apply w-64;
        }
    }
}
</style>
