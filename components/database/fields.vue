<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2023-08-08 07:34:55
 * @LastEditTime: 2023-08-08 07:42:48
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \laf_curd\components\database\fields.vue
-->
<template>
    <div>
        <span @click="insertFieldConfig">field</span>
    </div>
</template>
<script setup>
const { cloud, collectionName } = useCloud()
const collection = cloud.database().collection('lafDB_fields')

const insertFieldConfig = () => {
    console.log('insertColConfig')
    collection.add({
        fieldName: '_id',
        collectionName,
        width: 300,
        type: 'string',
        visible: true
    })
        .then(res => {
            console.log('res', res)
        })
}

</script>
