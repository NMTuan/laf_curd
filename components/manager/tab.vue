<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2023-07-12 20:27:09
 * @LastEditTime: 2023-07-14 10:43:58
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \laf_curd\components\manager\tab.vue
-->
<template>
    <div class="tabs w-full overflow-hidden">
        <el-tabs v-model="activeName" type="border-card" closable @tab-click="handleClick">
            <el-tab-pane :label="item" :name="item" v-for="item in tabStore.list">
                <template #label>
                    <div>
                        <div class="text-xs text-gray-400 inline-block">
                            {{ appName(item.split('/')[0]) }}
                        </div>
                        <div class="text-sm">{{ item.split('/')[1] }}</div>
                    </div>
                </template>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script setup>
const route = useRoute()
const appStore = useAppStore()
const tabStore = useTabStore()
const activeName = ref('')
const handleClick = (pane) => {
    navigateTo(`/manager/${pane.paneName}`)
}
const appName = (appid) => {
    return appStore.list.find(item => item.appid === appid)?.name || appid
}
watchEffect(() => {
    activeName.value = route.params.key?.join('/') || ''
})
</script>
<style scoped lang="scss">
.tabs {
    @apply border-none;
    @apply -mb-1px;

    :deep() {
        .el-tabs--border-card {
            @apply border-b-0;
        }

        .el-tabs__header {
            @apply bg-gray-100;
            // @apply m-0;
            // @apply border-0 border-b border-solid border-gray-200;
            // @apply h-auto;
        }


        // .el-tabs__item.is-closable:hover {
        //     // @apply important-px-5;
        // }

        &.el-tabs__item {
            @apply py-5;
            // @apply bg-gray-100;
            // @apply border-t-0 border-solid;
            // @apply border-b border-gray-200;
            // @apply border-x border-x-transparent;
            // @apply text-gray-400;

            // @apply important-border-1 border-solid border-red-400;
            &:hover {
                @apply important-px-5;
            }

            &.is-active {
                // @apply bg-white;
                // @apply shadow-xl;
                // @apply border-x-gray-200;
                // @apply text-teal-500;
            }
        }

        .el-icon.is-icon-close {
            @apply absolute top-1 right-1;
        }

        .el-tabs__nav-prev,
        .el-tabs__nav-next {
            @apply bg-gray-100;
            @apply shadow-xl;

            &:hover {
                @apply text-teal-500;
            }
        }

        .el-tabs__content {
            @apply hidden;
        }


    }
}
</style>
