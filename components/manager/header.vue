<template>
    <div class="flex-1 flex flex-col justify-between overflow-hidden">
        <div>header</div>
        <ManagerTab></ManagerTab>
    </div>
</template>
<script setup>
const tabStore = useTabStore()
</script>
