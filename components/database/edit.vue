<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2023-07-02 22:18:45
 * @LastEditTime: 2023-07-03 06:42:04
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \laf_curd\components\database\edit.vue
-->
<template>
    <div class="detail">
        <LayoutLoading :loading="loading"></LayoutLoading>
        <!-- <div class="mb-4" v-for="(item, index) in formData">
            <div class="mb-1">{{ item.label }}</div>
            <div class="flex">
                <textarea class="flex-1 h-18 text-base" v-model="formData[index].value"></textarea>
            </div>
        </div> -->
        <div class="p-4 flex-1 flex flex-col">
            <textarea class="flex-1 text-base p-2" v-model="formData"></textarea>
            <div class="flex mt-4 bg-white/50">
                <pre>{{ submitData }}</pre>
                <button @click="submit"
                    class="flex-1 py-3 bg-teal-500 text-white text-sm border-none rounded leading-none">修改</button>
            </div>
        </div>
    </div>
</template>
<script setup>
import { useQueryStore } from '@/stores/query'
const queryStore = useQueryStore()
const props = defineProps({
    data: {
        type: Object,
        default: () => { }
    }
})
const emits = defineEmits(['close'])
const loading = ref(false)
const formData = ref([])

formData.value = JSON.stringify(props.data, null, 4)

const submit = async () => {
    try {
        // console.log(JSON.parse(formData.value))
        loading.value = true
        await queryStore.updateById(JSON.parse(formData.value))
        loading.value = false
        emits('close')
    } catch (err) {
        alert(err.message)
        loading.value = false
    }
}

// const submitData = computed(() => {
//     return formData.value.reduce((total, item) => {
//         console.log(item.label, item.value, item.type)
//         if (item.type === 'number') {
//             total[item.label] = Number(item.value)
//         } else if (item.type === 'object') {
//             total[item.label] = JSON.parse(item.value)
//         } else {
//             total[item.label] = item.value
//         }
//         return total
//     }, {})
// })


// formData.value = Object.keys(props.data).reduce((total, key) => {
//     total.push({
//         label: key,
//         value: props.data[key] ? JSON.stringify(props.data[key]) : '',
//         type: typeof props.data[key]
//     })
//     return total
// }, [])
</script>
<style scoped lang="scss">
.detail {
    @apply border break-words h-full;
    @apply flex flex-col relative;

    th {
        @apply bg-gray-200;
        @apply p-2;
    }

    td {
        @apply p-2;
    }
}
</style>
