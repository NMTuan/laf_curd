<template>
    <p v-for="i in x">
        <span v-for="j in y" class="whitespace-nowrap" @click="handler">
            {{ i }} | {{ j }}
        </span>
    </p>
</template>
<script setup>
const x = ref(100)
const y = ref(100)
const handler = () => {
    x.value = parseInt(Math.random() * 100)
    y.value = parseInt(Math.random() * 100)
}
</script>
