<template>
    <div class="text-sm">
        <span class="button button--disabled">云函数</span>
        <NuxtLink class="button" :to="{
            name: 'app-appid-database', params: {
                appid
            }
        }">数据库</NuxtLink>
        <NuxtLink class="button" :to="{
            name: 'app-appid-policy', params: {
                appid
            }
        }">访问策略</NuxtLink>
        <span class="button button--disabled">云存储</span>
    </div>
</template>
<script setup>
const props = defineProps({
    appid: {
        type: String,
        default: ''
    }
})

</script>

<style lang="scss" scoped>
.button {
    @apply px-2 py-1 ml-4 rounded;
    @apply bg-teal-500 text-white;
    @apply no-underline;
    --at-apply: hover:(bg-teal-600);

    &--disabled {
        @apply bg-gray-200 text-gray-400;
        @apply cursor-not-allowed;
        --at-apply: hover:(bg-gray-300);
    }
}
</style>
