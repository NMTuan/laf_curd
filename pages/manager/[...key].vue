<template>
    <div>
        {{ route.params.key }}
        <input type="text" v-model="input">
    </div>
</template>
<script setup>
const route = useRoute()
const input = ref('123')
</script>
