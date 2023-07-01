<template>
    <div>
        <h1>applications</h1>
        <div v-if="error">error</div>
        <ApplicationsListItem v-for="item in list" :data="item"></ApplicationsListItem>
    </div>
</template>
<script setup>
const error = ref(false)
const list = ref([])

request({
    path: '/v1/applications'
})
    .then(res => {
        list.value = res.data
    })
    .catch(err => {
        error.value = true
    })
</script>
