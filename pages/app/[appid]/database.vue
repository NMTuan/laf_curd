<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2023-07-01 18:13:40
 * @LastEditTime: 2023-07-01 21:12:10
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \laf_curd\pages\app\[appid]\database.vue
-->
<template>
    <LayoutTwoColumn>
        <template #side>
            <DatabaseList></DatabaseList>
        </template>
        <div>
            <div v-if="!currentPolicy">
                <p>还没有选择访问策略，请<NuxtLink :to="{
                    name: 'app-appid-policy', params: {
                        appid
                    }
                }">先去选择</NuxtLink>
                </p>
            </div>
            <div v-else>
                当前策略：{{ currentPolicy }}
                <DatabaseRun></DatabaseRun>
                <DatabaseResponse></DatabaseResponse>
            </div>

        </div>

    </LayoutTwoColumn>
</template>
<script setup>
const route = useRoute()
const { appid } = route.params
const currentPolicy = useCookie(`laf_curd_policy_${appid}`)

</script>
