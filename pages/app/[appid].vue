<template>
    <div>
        <h1>{{ id }}</h1>

        <div class="flex">
            <DatabaseList></DatabaseList>
            <NuxtPage></NuxtPage>


        </div>
    </div>
</template>
<script setup>
const route = useRoute()

const { id } = route.params

</script>
