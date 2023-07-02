<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2023-07-01 17:34:07
 * @LastEditTime: 2023-07-02 14:25:43
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \laf_curd\components\database\response.vue
-->
<template>
    <div class="break-words px-6 py-2">
        <div v-if="!queryStore.response.ok && queryStore.response.message === 'Request failed with status code 404'">
            404 !!!
        </div>
        <div v-if="!queryStore.response.ok && queryStore.response.message === 'permission denied'">
            <div v-if="/^collection.*?not found$/.test(queryStore.response.data[0].error)">
                权限不足，<span @click="createPolicy">一键创建策略</span>
            </div>
            <div v-if="queryStore.response.data[0].error === 'the expression evaluated to a falsy value'">
                权限不足，<span @click="updatePolicy">一键更新策略</span>
            </div>
        </div>
        <pre v-else>{{ queryStore.response }}</pre>

    </div>
</template>
<script setup>
const route = useRoute()
const { appid } = route.params
const queryStore = useQueryStore()
const policyStore = usePolicyStore()
const currentPolicy = useCookie(`laf_curd_policy_${appid}`)


const createPolicy = async () => {
    policyStore.createRule()
}
const updatePolicy = async () => {
    policyStore.updateRule()
}
</script>
