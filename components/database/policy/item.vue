<template>
    <div class="item" :class="{
        current: queryStore.policy === data.name
    }" @click="handlerClick">
        {{ data.name }}
        <div class="icon"></div>
    </div>
</template>
<script setup>
const queryStore = useQueryStore()
const props = defineProps({
    data: {
        tyep: Object,
        default: () => { }
    }
})
const handlerClick = () => {
    queryStore.$patch({
        policy: props.data.name
    })
}
</script>
<style lang="scss" scoped>
.item {
    @apply flex items-center;
    @apply border border-solid border-gray-200 rounded;
    @apply bg-gray-50;
    @apply px-2 py-1 mr-2;
    @apply text-sm leading-none;
    @apply cursor-pointer;
    --at-apply: hover:(bg-teal-50 border-teal-200 text-teal-500);

    .icon {
        @apply hidden;
    }
}

.current {
    @apply border-teal-500;
    @apply bg-teal-50;
    @apply text-teal-500;
    --at-apply: hover:(border-teal-500 text-teal-500);

    .icon {
        @apply block;
    }
}

.icon {
    @apply i-ri-check-line;
    @apply font-bold;
    @apply block flex-shrink-0 text-teal-500;
    @apply ml-2;
}
</style>
