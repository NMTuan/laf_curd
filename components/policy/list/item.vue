<template>
    <div class="px-4 py-2 hover:(bg-gray-50) truncate cursor-pointer" :title="data.name" @click="handlerClick">
        {{ data.name }}
        {{ data.name === policy ? '√' : '' }}
    </div>
</template>
<script setup>
const route = useRoute()
const { appid } = route.params
const props = defineProps({
    data: {
        type: Object,
        default: () => { }
    }
})
const policy = useCookie(`laf_curd_policy_${appid}`)

const handlerClick = () => {
    if (policy.value === props.data.name) {
        return
    }
    policy.value = props.data.name

}
</script>
