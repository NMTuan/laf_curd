import { defineStore } from 'pinia'

export const useConfigStore = defineStore('useConfigStore', () => {
    const appid = ref('')

    return {
        appid
    }
})
