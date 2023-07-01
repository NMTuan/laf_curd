<template>
    <li class="p-4 hover:(bg-gray-100)">
        <NuxtLink :to="{
            name: 'app-appid-collection-collectionid', params: {
                appid: route.params.appid,
                collectionid: data.name
            }
        }">
            {{ data.name }}
        </NuxtLink>
        <!-- <pre>{{ data }}</pre> -->
    </li>
</template>
<script setup>
const route = useRoute()
const props = defineProps({
    data: {
        type: Object,
        default: () => { }
    }
})
</script>
