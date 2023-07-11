<template>
    <div>
        <div v-for="item in history" class="p-4">
            <div class="text-sm text-gray-400">{{ new Date(item.date).toLocaleString() }}</div>
            <pre class="border border-solid border-gray-300 m-0 p-4 pb-0 rounded cursor-pointer hover:bg-gray-50"
                @click="handlerClick(item)">{{ item.statement }}
        </pre>
        </div>
    </div>
</template>
<script setup>
const queryStore = useQueryStore()
const emits = defineEmits(['close'])
const history = computed(() => {
    const history = JSON.parse(JSON.stringify(queryStore.history))
    return history.sort((a, b) => {
        return b.date - a.date
    })
})
const handlerClick = (item) => {
    queryStore.statement = item.statement
    emits('close')
}
</script>
