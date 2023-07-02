<template>
    <div class="h-full flex flex-col items-center justify-center relative">
        <LayoutLoading :loading="loading"></LayoutLoading>
        <div class="i-ri-shield-keyhole-line text-8xl text-gray-200"></div>
        <div class="text-lg mt-6">第一次使用，请初始化访问策略</div>
        <div>
            <button @click="handlerInit" class="button">初始化访问策略</button>
        </div>
    </div>
</template>
<script setup>
const route = useRoute()
const policy = useCookie(`laf_curd_${route.params.appid}_policy`)
const loading = ref(false)

const emits = defineEmits(['updatePolicy'])

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const handlerInit = () => {
    const cfm = confirm(`
注意：

此操作会在当前应用创建一个以laf_curd_开头的随机策略。
并将策略名称临时保存在你当前浏览器。
该策略拥有完全控制数据库的权限，请勿泄露。
`)
    if (!cfm) {
        return
    }

    // 生成一个策略名字
    const policyStr = `laf_curd_${route.params.appid}_${getRandomInt(479890, 1679615).toString(36)}`

    loading.value = true
    request({
        method: 'POST',
        path: `/v1/apps/${route.params.appid}/policies`,
        body: {
            name: policyStr
        }
    }).
        then(response => {
            emits('updatePolicy', policyStr)
        })
        .catch(err => {
            alert('error')
        })
        .finally(() => {
            loading.value = false
        })
}
</script>
<style scoped lang="scss">
.button {
    @apply text-base;
    @apply bg-teal-500 text-white;
    @apply px-4 py-2 mt-4;
    @apply rounded border-none;
    @apply cursor-pointer;
    --at-apply: hover:(bg-teal-600);

}
</style>
