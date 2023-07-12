<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2023-07-12 19:01:15
 * @LastEditTime: 2023-07-12 22:31:54
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \laf_curd\components\manager\side.vue
-->
<template>
    <div class="">
        <el-tree class="tree" :props="defaultProps" @node-click="handleNodeClick" lazy :load="handlerLoad" :indent="24"
            node-key="_key" highlight-current>
            <template #default="{ node, data }">
                <div v-if="node.level === 1" class="flex-1 h-full flex items-center justify-between text-base">
                    <div class="flex items-center">
                        <i class="block i-ri-apps-line mr-2"></i>
                        {{ data.name }}
                    </div>
                    <div>
                        <i class="block i-ri-refresh-line"></i>
                    </div>
                </div>
                <div v-if="node.level === 2" class="flex-1 h-full flex items-stretch justify-between text-sm">
                    <div class="flex items-center">
                        <i class="block i-ri-file-list-line mr-2"></i>
                        {{ data.name }}
                    </div>
                    <div @click.stop="handlerClickX">x</div>
                </div>
            </template>
        </el-tree>
    </div>
</template>
<script setup>
const appStore = useAppStore()
const collectionStore = useCollectionStore()
const defaultProps = {
    label: 'name',
    isLeaf: 'leaf',
    class: 'tree-item'
}
const handleNodeClick = (data, node, tree, e) => {
    // console.log(data, node, tree, e)
    if (node.level === 2) {
        navigateTo(`/manager/${node.parent.data.appid}/${data.name}`)
    }
}
const handlerLoad = (node, resolve) => {
    if (node.level === 0) {
        appStore.fetch()
            .then(res => {
                res.data.map((item) => {
                    item._key = item._id
                })
                resolve(res.data)
            })
    } else if (node.level === 1) {
        const appid = node.data.appid
        collectionStore.fetch(appid)
            .then(res => {
                res.data.map((item) => {
                    item._key = item.name
                    item.leaf = true
                })
                resolve(res.data)
            })
    } else {
        resolve([])
    }
}

const handlerClickX = () => {
    console.log('xxx')
}

</script>
<style scoped lang="scss">
.tree {
    :deep(.tree-item) {
        .el-tree-node__content {
            @apply py-3;
        }

        .el-tree-node__children {
            .el-tree-node__content {
                @apply py-1;
            }
        }
    }
}
</style>
