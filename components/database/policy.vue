<template>
    <div class="flex items-center">
        <LayoutLoading :loading="loading"></LayoutLoading>
        <DatabasePolicyItem v-for="item in policyStore.list" :data="item"></DatabasePolicyItem>
        <div class="add" @click="addPolicy">
            <div class="i-ri-add-line"></div>
        </div>
    </div>
</template>
<script setup>
import { usePolicyStore } from '@/stores/policy';
const policyStore = usePolicyStore()
const loading = ref(false)

const getList = async () => {
    loading.value = true
    await policyStore.fetch()
    loading.value = false
}

const addPolicy = async () => {
    const cfm = confirm('该操作会创建一个以laf_curd开头的随机策略，确定要创建么？')
    if (!cfm) {
        return
    }
    loading.value = true
    policyStore.create()
        .then(res => {
            return policyStore.fetch()
        })
        .finally(() => {
            loading.value = false
        })
}

getList()
</script>
<style scoped lang="scss">
.add {
    @apply flex items-center;
    @apply border border-solid border-gray-200 rounded;
    @apply bg-gray-50;
    @apply px-1 py-1 mr-2;
    @apply text-sm leading-none;
    @apply cursor-pointer;
    --at-apply: hover:(bg-teal-50 border-teal-200 text-teal-500);
}
</style>
