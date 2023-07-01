<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2023-06-30 21:51:32
 * @LastEditTime: 2023-07-01 00:07:54
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \laf_curd\pages\app\[appid]\collection\[collectionId].vue
-->
<template>
    <div>
        <div v-if="error">error</div>
        collection id
        <pre>{{ route.params }}</pre>
        <textarea v-model="querySentence"></textarea>
        <button @click="query">submit</button>
        <pre>{{ list }}</pre>
    </div>
</template>
<script setup>
import { Cloud } from 'laf-client-sdk'

const route = useRoute()
const { appid, collectionid } = route.params
const error = ref(false)
// const collection = ref()
const list = ref([])
let cloud
// request({
//     path: `/v1/apps/${appid}/collections/${collectionid}`
// })
//     .then(response => {
//         list.value = response.data
//     })
//     .catch(err => {
//         error.value = true
//     })
const querySentence = ref(`collection('memos_test_requestIp').where({_id: '64980b1c9fd1dd9bcf58fc3e'}).get()`)
const query = () => {
    error.value = false
    eval(`cloud.database().${querySentence.value}`)
        .then(response => {
            if (!response.code) {
                list.value = response.data
            }
        })
        .catch(err => {
            error.value = true
        })
}

onMounted(() => {
    cloud = new Cloud({
        baseUrl: `https://${appid}.laf.run`,
        dbProxyUrl: '/proxy/laf_curd'
    })
    // collection.value = cloud.database().collection(collectionid)
    // cloud.database().collection(collectionid).get()
    //     .then((response) => {
    //         console.log(response)
    //         if (!response.code) {
    //             console.log(1, response.data)
    //             list.value = response.data
    //         }
    //     })
    //     .catch(err => {
    //         error.value = true
    //     })
})
</script>
