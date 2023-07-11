<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2023-07-02 21:23:08
 * @LastEditTime: 2023-07-11 14:58:59
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \laf_curd\components\layout\drawer.vue
-->
<template>
    <div class="drawer" v-if="visible" @click="hide">
        <div class="drawer_container" @click.stop>
            <slot></slot>
        </div>
    </div>
</template>
<script setup>
const props = defineProps({
    visible: {
        type: Boolean,
        default: false
    }
})
const emits = defineEmits(['update:visible'])

const hide = () => {
    emits('update:visible', false)
}

watch(() => props.visible, (val) => {
    if (val) {
        document.querySelector('body').style.overflow = 'hidden'
    } else {
        document.querySelector('body').style.overflow = ''
    }
})

</script>
<style lang="scss" scoped>
// @keyframes rtl-drawer-in {
//     0% {
//         transform: translate(100%)
//     }

//     to {
//         transform: translate(0)
//     }
// }

.drawer {
    @apply fixed inset-0 z-30;
    @apply bg-gray-600/50;

    &_container {
        // animation: rtl-drawer-in .3s 1ms;
        @apply bg-white;
        @apply w-30% min-w-640px h-full overflow-auto;
        @apply ml-auto;
    }
}
</style>
