import { defineStore } from 'pinia'

export const useConfigStore = defineStore('useConfigStore', () => {
    const appid = ref('')
    const apiUrl = useCookie('laf_curd_apiUrl', {
        default: () => 'https://api.laf.run'
    })
    const pat = useCookie('laf_curd_pat')

    return {
        appid,
        apiUrl,
        pat
    }
})
