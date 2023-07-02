<template>
    <div class="">
        <LayoutLoading :loading="loading"></LayoutLoading>
        <PolicyListItem v-for="item in list" :data="item"></PolicyListItem>
    </div>
</template>
<script setup>

const loading = ref(false)
const list = ref([])
const route = useRoute()

const getList = async () => {
    loading.value = true
    request({
        path: `/v1/apps/${route.params.appid}/policies`
    }).then(response => {
        list.value = response.data
    }).catch((err) => {
        alert(err.message)
    }).finally(() => {
        loading.value = false
    })
}

getList()
</script>
