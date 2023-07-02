<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2023-07-01 18:14:11
 * @LastEditTime: 2023-07-01 21:04:47
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \laf_curd\pages\app\[appid]\policy.vue
-->
<template>
    <div class="flex items-center justify-around flex-1">
        <LayoutLoading :loading="loading"></LayoutLoading>
        <div class="item">
            <!-- <div class="item_content"> -->
            <div class="title">选择一个策略：</div>
            <p>
                <PolicyList></PolicyList>
            </p>
            <!-- </div> -->

        </div>
        <div class="item">
            <!-- <div class="item_content"> -->
            <div class="title">或者：</div>
            <p>
                <button @click="createPolicy">创建管理员策略</button>
            </p>
            <!-- </div> -->

        </div>

        <!-- <LayoutTwoColumn>
            <div class="">main</div>
            <template #side>
                <PolicyList></PolicyList>
            </template>
        </LayoutTwoColumn> -->
    </div>
</template>
<script setup>
const loading = ref(false)
const route = useRoute()
const { appid } = route.params

function getRandomInt(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min
}

const createPolicy = () => {
    // 生成一个策略名字
    const policy = `laf_curd_${appid}_${getRandomInt(
        479890,
        1679615
    ).toString(36)}`
    loading.value = true
    // 创建策略
    request({
        method: 'POST',
        path: `/v1/apps/${appid}/policies`,
        body: {
            name: policy
        }
    })
        // .then(() => {
        //     // 拉取所有集合
        //     return request({
        //         path: `/v1/apps/${appid}/collections`
        //     })
        // })
        // .then(() => {
        //     // 循环写入策略规则
        //     return request({
        //         path: `/v1/apps/${appid}/collections`
        //     })
        // })
        .then((response) => {
            window.location.reload()
        })
        .catch((err) => {
            alert(err.message)
        })
        .finally(() => {
            loading.value = false
        })
}

</script>
<style scoped lang="scss">
.item {
    @apply flex flex-col items-center justify-center;
    @apply w-35% h-40%;
    @apply border;

    .title {
        @apply text-xl font-blod;
    }
}
</style>
