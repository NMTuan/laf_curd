/*
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2023-06-27 15:59:25
 * @LastEditTime: 2023-07-11 11:39:41
 * @LastEditors: NMTuan
 * @Description:
 * @FilePath: \laf_curd\composables\request.js
 */
export const request = (params) => {
    // let loading
    // const runtimeConfig = useRuntimeConfig()
    const userStore = useUserStore()
    const configStore = useConfigStore()

    const defaultParams = {
        url: undefined,
        method: 'GET',
        path: undefined,
        query: {},
        body: {},
        auth: true
    }

    params = { ...defaultParams, ...params }

    // 如果传了url则使用，否则用env中配置项。
    const url = (params.url || configStore.apiUrl) + params.path
    delete params.url
    delete params.path

    // get请求不需要body
    if (params.method === 'GET') {
        delete params.body
    }

    // 鉴权
    if (params.auth !== false) {
        params.headers = {
            Authorization: 'Bearer ' + userStore.token
        }
    }
    delete params.auth

    return new Promise((resolve, reject) => {
        if (!url) {
            reject({
                code: 40000,
                message: 'no url'
            })
        }
        $fetch(url, params)
            .then((res) => {
                if (res instanceof Blob) {
                    resolve(res)
                } else if (!res.error) {
                    resolve(res)
                } else {
                    alert(res.error)
                    reject(res)
                }
            })
            .catch((err) => {
                if (err.response.status === 401) {
                    alert('登录超时，请重新登录')
                    navigateTo({name: 'welcome'})
                }else if (err.response) {
                    alert(JSON.stringify(err.response.data, null, 2))
                }
                reject(err)
            })
    })
}
