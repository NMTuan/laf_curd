<template>
    <LayoutPanel :title="configStore.appid">
        <template #description>
            <ApplicationsListFunc :appid="configStore.appid"></ApplicationsListFunc>
        </template>
        <div class="flex flex-col flex-1">
            <NuxtPage></NuxtPage>
        </div>
    </LayoutPanel>
</template>
<script setup>
import { useConfigStore } from '@/stores/config';
const configStore = useConfigStore()
</script>
