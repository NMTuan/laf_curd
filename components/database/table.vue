<template>
    <div class="overflow-auto">
        <LayoutLoading :loading="loading"></LayoutLoading>
        <table class="table">
            <thead>
                <tr>
                    <th></th>
                    <th v-for="item in fields">{{ item }}</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in data">
                    <td class="whitespace-nowrap">
                        <div v-if="item._id" @click="detail(item._id)" class="detail">【详情】</div>
                        <div v-if="item._id" @click="edit(item._id)" class="edit">【编辑】</div>
                        <div v-if="item._id" @click="remove(item._id)" class="remove">【删除】</div>
                    </td>
                    <td v-for="field in fields">{{ item[field] }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script setup>
const queryStore = useQueryStore()
const props = defineProps({
    data: {
        type: Array,
        default: () => []
    }
})
const loading = ref(false)

const fields = computed(() => {
    return props.data[0] ? Object.keys(props.data[0]) : []
})

const detail = () => { }
const edit = () => { }
const remove = async (id) => {
    if (!id) {
        return
    }
    loading.value = true
    await queryStore.removeById(id)
    loading.value = false

}

</script>
<style scoped lang="scss">
.table {

    thead {

        th {
            @apply bg-gray-100;
            @apply py-2
        }
    }

    tbody {
        @apply text-sm leading-6;

        tr {
            --at-apply: hover:(bg-gray-50);
        }

        td {
            @apply p-2;
            @apply border-b border-b-solid border-b-gray-200;
        }
    }

    .detail {
        @apply text-blue-500;
        @apply cursor-pointer;
        --at-apply: hover:(opacity-75);
    }

    .edit {
        @apply text-teal-500;
        @apply cursor-pointer;
        --at-apply: hover:(opacity-75);
    }

    .remove {
        @apply text-red-500;
        @apply cursor-pointer;
        --at-apply: hover:(opacity-75);
    }
}
</style>
