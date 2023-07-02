<template>
    <div class="item" :class="{
        current: queryStore.collection.name === data.name
    }" @click="handlerClick" :title="data.name">
        <div class="flex-1 truncate">{{ data.name }}</div>
        <div class="icon"></div>
    </div>
</template>
<script setup>
const queryStore = useQueryStore()
const props = defineProps({
    data: {
        type: Object,
        default: () => { }
    }
})
const handlerClick = () => {
    queryStore.$patch({ collection: props.data })
}
</script>
<style scoped lang="scss">
.item {
    @apply flex items-center justify-between;
    @apply px-4 py-2;
    @apply truncate cursor-pointer;
    --at-apply: hover:(bg-gray-50);

    .icon {
        @apply hidden;
    }
}

.current {
    @apply bg-teal-50 rounded;

    .icon {
        @apply i-ri-check-line;
        @apply text-lg font-bold;
        @apply block flex-shrink-0 text-teal-500;
    }
}
</style>
