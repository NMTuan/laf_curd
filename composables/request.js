/*
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2023-06-27 15:59:25
 * @LastEditTime: 2023-06-30 20:55:06
 * @LastEditors: NMTuan
 * @Description:
 * @FilePath: \laf_curd\composables\request.js
 */
export const request = (params, disabledLoading) => {
    // let loading
    const runtimeConfig = useRuntimeConfig()
    const userStore = useUserStore()

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
    const url = (params.url || runtimeConfig.public.requestUrl) + params.path
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
        // if (!disabledLoading) {
        //     loading = ElLoading.service()
        // }
        $fetch(url, params)
            // .finally(() => {
            //     if (!disabledLoading) {
            //         loading.close()
            //     }
            // })
            .then((res) => {
                if (res instanceof Blob) {
                    resolve(res)
                } else if (!res.error) {
                    if (res.message) {
                        // ElMessage({
                        //     message: res.message,
                        //     type: 'success'
                        // })
                    }
                    resolve(res)
                } else {
                    if (res.code && res.message) {
                        // ElMessageBox.alert(res.message, {
                        //     title: `Error ${res.code}`
                        // })
                    }
                    reject(res)
                }
            })
            .catch((res) => {
                if (res.response && res.response.status) {
                    // ElMessageBox.alert('网络异常，请稍后重试！', {
                    //     title: `Error ${res.response.status}`
                    // })
                }
                reject(res)
            })
    })
}
