<template>
    <div class="overflow-hidden flex-1 flex flex-col">
        <div class="p-4">
            <el-button type="primary" @click="createVisible = true">Create</el-button>
            <el-divider direction="vertical" />
            <el-button :disabled="currentRowIndex === -1" @click="detailVisible = true">Detail</el-button>
            <el-button :disabled="currentRowIndex === -1" @click="editVisible = true">Edit</el-button>
            <el-button :disabled="currentRowIndex === -1" @click="handlerDelete">Delete</el-button>
        </div>
        <div class="flex-1 overflow-hidden flex flex-col" v-loading="loading">
            <div class="flex-1 overflow-hidden mx-4 border">
                <el-auto-resizer>
                    <template #default="{ width, height }">
                        <el-table-v2 class="table" :row-class="handlerRowClass" fixed :columns="columns" :data="list"
                            :width="width" :height="height">
                            <template #cell="{ column, columns, columnIndex, depth, style, rowData, rowIndex }">
                                <div class="flex items-center flex-1 h-full text-sm overflow-hidden px-2"
                                    @click="handlerCellClick({ rowIndex })">
                                    <div class="truncate">{{ rowData[column.title] }}</div>
                                </div>
                            </template>
                        </el-table-v2>
                    </template>
                </el-auto-resizer>
            </div>
            <div class="px-4 pt-3 pb-4">
                <el-pagination v-model:current-page="page" background layout="prev, pager, next, jumper, ->, total, sizes"
                    :total="total" v-model:page-size="pageSize" />
            </div>
        </div>
        <ManagerDetail :data="list[currentRowIndex]" v-model:visible="detailVisible"></ManagerDetail>
        <ManagerEdit :id="list[currentRowIndex]?._id" v-model:visible="editVisible" @fetch="handlerFetch"></ManagerEdit>
        <ManagerCreate v-model:visible="createVisible" :fields="columns" @fetch="handlerFetch"></ManagerCreate>
    </div>
</template>
<script setup>
const { fetch, count, remove } = useCloud()
const columns = ref([]) // 表格列配置项
const list = ref([]) // 表格数据
const total = ref(0) // 总条数
const loading = ref(false)
const page = ref(1) // 当前页码
const pageSize = ref(20) // 每页数量
const currentRowIndex = ref(-1) // 当前行索引
const detailVisible = ref(false)
const editVisible = ref(false)
const createVisible = ref(false)

// 查询条件
const query = computed(() => {
    return {
        page: page.value,
        pageSize: pageSize.value
    }
})

// 获取数据
const handlerFetch = () => {
    currentRowIndex.value = -1  // 每次获取数据，清除掉选中的行
    fetch(query.value, loading).then(res => {
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
        list.value = res.data
        console.log('columns', columns)
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
            @apply bg-gray-100;
        }

        .el-table-v2__row-cell {
            @apply px-0;
        }
    }
}
</style>
