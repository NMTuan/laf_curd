<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2023-07-12 19:01:15
 * @LastEditTime: 2023-07-15 19:21:31
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
                        <i class="block mr-2" :class="data.icon ? data.icon : 'i-ri-apps-line'"></i>
                        {{ data.name }}
                    </div>
                    <!-- <div v-if="data.appid">
                        <i class="block i-ri-refresh-line"></i>
                    </div> -->
                </div>
                <div v-if="node.level === 2"
                    class="flex-1 h-full flex items-center justify-between text-sm overflow-hidden">
                    <div class="flex-1 overflow-hidden flex items-center">
                        <i class="flex-shrink-0 block i-ri-file-list-line mr-2"></i>
                        <div class="flex-1 truncate">{{ data.name }}</div>
                    </div>
                    <!-- <div class="flex-shrink-0 ml-2 font-normal" @click.stop="handlerClickX">x</div> -->
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
    if (node.level === 1 && data.to) {
        navigateTo(data.to)
    } else if (node.level === 2) {
        navigateTo(`/${node.parent.data.appid}/${data.name}`)
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
                resolve([
                    {
                        key: 'index-query',
                        name: 'query',
                        leaf: true,
                        icon: 'i-ri-search-line',
                        to: '/query'
                    },
                    ...res.data
                ])
                if (route.name === 'index-key') {
                    // 展开当前app
                    defaultExpandedKeys.value = [route.params.key[0]]
                    // 高亮当前collection
                    // TODO 这里不可靠
                    setTimeout(() => {
                        tree.value.setCurrentKey(route.params?.key[1])
                    }, 1000)
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

watchEffect(() => {
    if (!tree.value) {
        return
    }
    if (route.params.key) {
        // 展开当前app
        defaultExpandedKeys.value = [route.params.key[0]]
        // 高亮当前collection
        tree.value.setCurrentKey(route.params.key?.[1] || null)
    } else {
        tree.value.setCurrentKey(route.name === 'index' ? null : route.name || null)
    }
})

</script>
<style scoped lang="scss">
.tree {
    @apply bg-cool-gray-100;
    // @apply ml-4;

    :deep(.tree-item) {
        .el-tree-node__content {
            @apply py-3;

            &:hover {
                @apply bg-transparent;
                @apply text-teal-500;
            }
        }



        &.is-current {
            >.el-tree-node__content {
                @apply text-teal-500 font-bold;
                @apply bg-transparent;
            }
        }

        .el-tree-node__children {

            .el-tree-node__content {
                @apply py-1;

                // @apply border-b border-b-solid border-b-gray-200;
            }
        }
    }
}
</style>
