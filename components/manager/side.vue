<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2023-07-12 19:01:15
 * @LastEditTime: 2023-07-14 17:17:27
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \laf_curd\components\manager\side.vue
-->
<template>
    <div class="">
        <el-tree ref="tree" class="tree" :props="defaultProps" @node-click="handleNodeClick" lazy :load="handlerLoad"
            :indent="0" node-key="key" highlight-current :default-expanded-keys="defaultExpandedKeys">
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
const route = useRoute()
const appStore = useAppStore()
const collectionStore = useCollectionStore()
const defaultProps = {
    label: 'name',
    isLeaf: 'leaf',
    class: 'tree-item'
}
const tree = ref()
const defaultExpandedKeys = ref([])

// 点击节点的事件
const handleNodeClick = (data, node, tree, e) => {
    // console.log(data, node, tree, e)
    if (node.level === 2) {
        navigateTo(`/manager/${node.parent.data.appid}/${data.name}`)
    }
}

// 展开子节点的事件
const handlerLoad = (node, resolve) => {
    if (node.level === 0) {
        // 加载app list
        appStore.fetch()
            .then(res => {
                res.data.map((item) => {
                    item.key = item.appid
                })
                resolve(res.data)
                if (route.name === 'manager-key') {
                    // 展开当前app
                    defaultExpandedKeys.value = [route.params.key[0]]
                    // 高亮当前collection
                    setTimeout(() => {
                        tree.value.setCurrentKey(route.params.key[1])
                    }, 150)
                }
            })
    } else if (node.level === 1) {
        // 加载collection list
        const appid = node.data.appid
        collectionStore.fetch(appid)
            .then(res => {
                res.data.map((item) => {
                    item.key = item.name
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

watch(() => route.params.key, (val) => {
    // 展开当前app
    defaultExpandedKeys.value = [val[0]]
    // 高亮当前collection
    tree.value.setCurrentKey(val[1])
})

</script>
<style scoped lang="scss">
.tree {
    @apply bg-cool-gray-100;

    :deep(.tree-item) {
        .el-tree-node__content {
            @apply py-3;
        }

        &.is-current {
            >.el-tree-node__content {
                @apply bg-white;
            }
        }

        .el-tree-node__children {

            .el-tree-node__content {
                @apply py-1;
            }
        }
    }
}
</style>
