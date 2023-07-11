<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2023-07-01 16:51:11
 * @LastEditTime: 2023-07-12 07:39:09
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \laf_curd\components\database\run.vue
-->
<template>
    <div class="relative px-6 py-2">
        <LayoutLoading :loading="loading"></LayoutLoading>
        <div class="flex">
            <button @click="query">
                <div class="i-ri-play-fill text-2xl mx-2"></div>
            </button>
            <textarea ref="textarea" class="block flex-1 px-4 py-2 font-mono text-sm min-h-32"
                v-model="queryStore.statement" @keydown="handlerKeydown"></textarea>
            <button @click="showHistory">
                <div class="i-ri-history-fill text-2xl mx-2"></div>
            </button>
        </div>
        <LayoutDrawer v-model:visible="drawerVisible">
            <DatabaseHistory @close="closeDrawer"></DatabaseHistory>
        </LayoutDrawer>
    </div>
</template>
<script setup>
import { Cloud } from 'laf-client-sdk'
import { useConfigStore } from '@/stores/config'
import { useUserStore } from '@/stores/user';
const queryStore = useQueryStore()
const configStore = useConfigStore()
const useStore = useUserStore()
const loading = ref(false)
const textarea = ref()
const drawerVisible = ref(false)

const query = async () => {
    loading.value = true
    await queryStore.query()
    loading.value = false
}

const handlerKeydown = (e) => {
    const { key, ctrlKey, altKey, shiftKey } = e
    if (key.toLocaleLowerCase() === 'tab') {
        e.preventDefault()
        if (shiftKey) {
            return
        }
        const startPos = textarea.value.selectionStart;
        const endPos = textarea.value.selectionEnd;
        const value = queryStore.statement;
        queryStore.statement = value.slice(0, startPos) + '    ' + value.slice(endPos);

        // 将光标移动到插入空格后的位置
        nextTick(() => {
            textarea.value.selectionStart = startPos + 4;
            textarea.value.selectionEnd = startPos + 4;
        });
    }
    if (key.toLocaleLowerCase() === 'enter' && (ctrlKey || altKey)) {
        e.preventDefault()
        query()
    }
}

const showHistory = () => {
    drawerVisible.value = true
}
const closeDrawer = () => {
    drawerVisible.value = false
}
watchEffect(() => {
    const cloud = new Cloud({
        baseUrl: `${configStore.apiUrl}`,
        dbProxyUrl: `/v1/apps/${configStore.appid}/databases/proxy`,
        getAccessToken: () => {
            return useStore.token
        }
    })
    queryStore.updateCloud(cloud)
})

</script>
