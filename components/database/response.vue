<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2023-07-01 17:34:07
 * @LastEditTime: 2023-07-02 20:30:50
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \laf_curd\components\database\response.vue
-->
<template>
    <div class="break-words px-6 py-2">
        <LayoutLoading :loading="loading"></LayoutLoading>
        <div v-if="!queryStore.response.ok">
            <template v-if="queryStore.response.message === 'permission denied'">
                <div v-if="/^collection.*?not found$/.test(queryStore.response.data[0].error)">
                    权限不足，一键<span @click="createPolicy" class="a">创建策略规则</span>
                </div>
                <div v-if="queryStore.response.data[0].error === 'the expression evaluated to a falsy value'">
                    权限不足，一键<span @click="updatePolicy" class="a">更新策略规则</span>
                </div>
            </template>
            <div v-else-if="queryStore.response.message">
                {{ queryStore.response.message }}
            </div>
        </div>
        <div v-if="queryStore.response.ok">
            <div v-if="queryStore.response.message">
                {{ queryStore.response.message }}
            </div>
            <DatabaseTable v-else-if="Array.isArray(queryStore.response.data)" :data="queryStore.response.data">
            </DatabaseTable>
            <pre v-else>{{ queryStore.response }}</pre>
        </div>
    </div>
</template>
<script setup>
import { usePolicyStore } from '@/stores/policy';
const loading = ref(false)
const queryStore = useQueryStore()
const policyStore = usePolicyStore()


const createPolicy = () => {
    loading.value = true
    policyStore.createRule()
        .then(() => {
            queryStore.updateResponse({
                ok: true,
                message: '策略已创建，请片刻后重新执行查询'
            })
        })
        .catch(() => { })
        .finally(() => {
            loading.value = false
        })
}
const updatePolicy = () => {
    loading.value = true
    policyStore.updateRule()
        .then(() => {
            queryStore.updateResponse({
                ok: true,
                message: '策略已更新，请片刻后重新执行查询'
            })
        })
        .catch(() => { })
        .finally(() => {
            loading.value = false
        })
}
</script>
<style scoped lang="scss">
.a {
    @apply text-teal-500;
    @apply cursor-pointer;
    @apply ml-2;
    --at-apply: hover:(text-teal-600);
}
</style>
