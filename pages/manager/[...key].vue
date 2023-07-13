<template>
    <div class="overflow-hidden flex-1 flex flex-col">
        <div>collection</div>
        <div class="flex-1 overflow-hidden flex flex-col" v-loading="loading">
            <div class="flex-1 overflow-hidden">
                <el-auto-resizer>
                    <template #default="{ width, height }">
                        <el-table-v2 fixed :columns="columns" :data="list" :width="width" :height="height">
                            <template #cell="{ column, rowData }">
                                <div class="text-sm truncate">
                                    {{ rowData[column.title] }}
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
    </div>
</template>
<script setup>
const { fetch, count } = useCloud()
const columns = ref([])
const list = ref([])
const total = ref(0)
const loading = ref(false)
const page = ref(1)
const pageSize = ref(10)


const query = computed(() => {
    return {
        page: page.value,
        pageSize: pageSize.value
    }
})
const handlerFetch = () => {
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
    })
}
const handlerCount = () => {
    count(query.value).then(res => {
        total.value = res.total || 0
    })
}

watch([page, pageSize], () => {
    handlerFetch()
})

handlerFetch()
handlerCount()


</script>
