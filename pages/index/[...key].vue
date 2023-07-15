<template>
    <div class="overflow-hidden flex-1 flex flex-col bg-gray-100" v-loading="loading">
        <div class="p-4 flex items-center justify-between">
            <el-button type="primary" @click="createVisible = true">Create</el-button>
            <el-button-group class="mx-3">
                <el-button :disabled="currentRowIndex === -1" @click="detailVisible = true">Detail</el-button>
                <el-button :disabled="currentRowIndex === -1" @click="editVisible = true">Edit</el-button>
                <el-button :disabled="currentRowIndex === -1" @click="handlerDelete">Delete</el-button>
            </el-button-group>
            <!-- 搜索 -->
            <el-input class="flex-1" v-model.trim="q" clearable @keyup.enter="handlerSearch"
                placeholder="document ID | Mongo where statement | Laf where statement">
                <template #prepend>
                    <el-button @click="handlerSearch">Search</el-button>
                </template>
                <template #append>
                    <el-button @click="historyVisible = true">
                        <div class="i-ri-history-line"></div>
                    </el-button>
                </template>
            </el-input>
        </div>
        <!-- 表格 -->
        <div class="flex-1 overflow-hidden mx-4 ">
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
        <!-- 分页 -->
        <div class="p-4">
            <el-pagination class="pager" v-model:current-page="page" background
                layout="prev, pager, next, jumper, ->, total, sizes" :total="total" v-model:page-size="pageSize" />
        </div>

        <ManagerDetail :data="list[currentRowIndex]" v-model:visible="detailVisible"></ManagerDetail>
        <ManagerEdit :id="list[currentRowIndex]?._id" v-model:visible="editVisible" @fetch="handlerFetch"></ManagerEdit>
        <ManagerCreate v-model:visible="createVisible" :fields="columns" @fetch="handlerFetch"></ManagerCreate>
        <ManagerHistory v-model:visible="historyVisible" @search="handlerHistorySearch"></ManagerHistory>
    </div>
</template>
<script setup>
import parse from 'ejson-shell-parser';
const { _, fetch, count, remove } = useCloud()
const columns = ref([]) // 表格列配置项
const list = ref([]) // 表格数据
const total = ref(0) // 总条数
const loading = ref(false)
const page = ref(1) // 当前页码
const pageSize = useCookie('laf_curd_pageSize', {
    default: () => (20)
}) // 每页数量
const currentRowIndex = ref(-1) // 当前行索引
const detailVisible = ref(false)
const editVisible = ref(false)
const createVisible = ref(false)
const historyVisible = ref(false)

const q = ref('')   // 搜索框的内容
const where = ref({})   // 由q经过处理后的查询条件
const history = useCookie('laf_curd_history', {
    default: () => []
})
// 查询条件
const query = computed(() => {
    return {
        page: page.value,
        pageSize: pageSize.value,
        query: where.value
    }
})

// 获取数据
const handlerFetch = () => {
    currentRowIndex.value = -1  // 每次获取数据，清除掉选中的行
    fetch(query.value, loading).then(res => {
        if (res.data.length === 0) {
            columns.value = [{ key: '_id', dataKey: '_id', title: '_id', width: 200 }]
        } else {
            columns.value = Object.keys(res.data[0]).reduce((total, key) => {
                total.push({
                    key: key,
                    dataKey: key,
                    title: key,
                    // minWidth: '200',
                    width: 200
                })
                return total
            }, [])
        }
        list.value = res.data
    })
}

// 获取数据总数
const handlerCount = () => {
    count(query.value).then(res => {
        total.value = res.total || 0
    })
}

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
            handlerFetch()
        })
        .catch(err => {
        })
}

// 按下搜索
const handlerSearch = () => {
    try {
        if (!q.value) {
            where.value = {}
        } else if (/^[^{}]*$/.test(q.value)) {
            // 没有花括号，当id处理
            where.value = { _id: q.value };
        } else if (/^{.*?_\..*?}$/.test(q.value)) {
            // 包含 _. 关键字当 laf 语句
            where.value = eval(`(${q.value})`)
        } else {
            // 否则当 mongodb 语句
            where.value = parse(q.value)
        }
    }
    catch (err) {
        ElMessage({
            message: 'Please enter the correct query.',
            type: 'error'
        })
        return
    }
    if (q.value) {
        history.value = history.value.filter(item => item.statement !== q.value) || []
        history.value.unshift({
            statement: q.value,
            date: Date.now()
        })
    }
    page.value = 1
    handlerFetch()
    handlerCount()
}
// 点击历史进行搜索
const handlerHistorySearch = (statement) => {
    q.value = statement
    handlerSearch()
}

// 每当页面或条数变化，重新获取数据
watch([page, pageSize], () => {
    handlerFetch()
})

// 进入页面，获取数据和条数
handlerFetch()
handlerCount()


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
</style>
