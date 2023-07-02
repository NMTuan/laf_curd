import { defineStore } from 'pinia'

export const useConfigStore = defineStore('useConfigStore', () => {
    const appid = ref('')
    const apiUrl = useCookie('laf_curd_apiUrl', {
        default: () => 'https://api.laf.run'
    })
    const pat = useCookie('laf_curd_pat')
    const baseDomain = useCookie('laf_curd_baseDomain', {
        default: () => 'laf.run'
    })

    // apiUrl.value = apiUrl.value || ''

    return {
        appid,
        apiUrl,
        pat,
        baseDomain
    }
})
