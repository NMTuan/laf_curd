import { defineStore } from 'pinia'

export const useTabStore = defineStore('useTabStore', () => {
    const list: Ref<String[]> = ref([])
    const append = (routeName: string) => {
        const index = list.value.findIndex((item) => item === routeName)
        if (routeName && index === -1) {
            list.value.push(routeName)
        }
    }

    return {
        list,
        append
    }
})
