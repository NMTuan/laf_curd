<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2023-07-12 20:27:09
 * @LastEditTime: 2023-07-15 19:31:27
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \laf_curd\components\manager\tab.vue
-->
<template>
    <div class="tabs w-full overflow-hidden">
        <el-tabs v-model="activeName" type="card" closable @tab-click="handleClick" @tab-remove="handleRemove">
            <el-tab-pane :label="item.name" :name="index" v-for="(item, index) in tabStore.list">
                <template #label>
                    <div class="h-9" v-if="Array.isArray(item.params?.key)">
                        <div class="appid">
                            {{ appName(item.params.key[0]) }}
                        </div>
                        <div class="collection">{{ item.params.key[1] }}</div>
                    </div>
                    <div class="h-9 flex items-center justify-center" v-else>{{ item.name.replace('index-', '') }}</div>
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
    const tab = tabStore.list[pane.index]
    navigateTo(tab)
}
const handleRemove = (index) => {
    console.log('remove', index, activeName.value)
    tabStore.remove(index, index === activeName.value)
}
const appName = (appid) => {
    return appStore.list.find(item => item.appid === appid)?.name || appid
}
watchEffect(() => {
    activeName.value = tabStore.list.findIndex(item => item.name === route.name && JSON.stringify(item.params) === JSON.stringify(route.params))
})
</script>
<style scoped lang="scss">
.tabs {
    :deep() {

        // tab 标签部分的区域
        .el-tabs__header {
            @apply m-0;
            @apply border-none;
            @apply h-auto;

        }

        .el-tabs__nav {
            @apply border-none;
        }

        // 标签项
        .el-tabs__item {
            @apply bg-teal-600/50;
            @apply border-teal-500;
            @apply text-white;
            @apply pt-2 pb-1;
            @apply h-auto;
            --at-apply: hover:(bg-teal-700/50);
            @apply transition-none;

            &:hover {
                @apply important-px-5;
            }

            .appid {
                @apply text-xs;
                @apply opacity-50;
                @apply mb-0.5;
            }

            &.is-active {
                @apply bg-gray-100;
                @apply border-none;
                @apply text-teal-600;
            }
        }

        // 关闭按钮
        .el-icon.is-icon-close {
            @apply absolute top-1 right-1;

            &:hover {
                @apply bg-teal-700/50;
            }
        }

        // 向前、向后的箭头
        .el-tabs__nav-prev,
        .el-tabs__nav-next {
            @apply bg-teal-700/50;
            @apply text-white text-base;
            @apply h-full;
            @apply flex items-center justify-center;

            &:hover {
                @apply bg-teal-600/50;
            }
        }

        // 用不到tab的内容区域，隐掉
        .el-tabs__content {
            @apply hidden;
        }
    }
}
</style>
