<template>
    <LayoutPanel :title="route.params.appid" :loading="loading">
        <template #description>
            <ApplicationsListFunc :appid="route.params.appid"></ApplicationsListFunc>
        </template>
        <div class="flex flex-col flex-1">
            <NuxtPage></NuxtPage>
        </div>
    </LayoutPanel>
</template>
<script setup>
const route = useRoute()
const loading = ref(false)
const appStore = useAppStore()
const policy = useCookie(`laf_curd_${route.params.appid}_policy`)

const updatePolicy = (value) => {
    policy.value = value
}

// 当策略存在时，更新策略规则
// watch(policy, async (val) => {
//     if (!val) {
//         return
//     }
//     request({

//     })

// })
</script>
