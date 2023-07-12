<template>
    <div class="">
        <el-tree class="tree" :props="defaultProps" @node-click="handleNodeClick" lazy :load="handlerLoad" :indent="24"
            highlight-current>
            <template #default="{ node, data }">
                <div v-if="node.level === 1" class="flex-1 h-full flex items-center justify-between text-base bg-green-200">
                    <div class="flex items-center bg-purple-200" @click="handlerClick(node, data)">
                        <i class="block i-ri-apps-line mr-2"></i>
                        {{ data.name }}
                    </div>
                    <div>
                        <i class="block i-ri-refresh-line"></i>
                    </div>
                </div>
                <div v-if="node.level === 2" class="flex-1 h-full flex items-stretch justify-between text-sm bg-sky-200">
                    <div class="flex items-center bg-red-200" @dblclick="clickCollection(node, data)">
                        <i class="block i-ri-file-list-line mr-2"></i>
                        {{ data.name }}
                    </div>
                    <div>x</div>
                </div>
            </template>
        </el-tree>
        <!-- {{ appStore.list }} -->
    </div>
</template>
<script setup>
const appStore = useAppStore()
const collectionStore = useCollectionStore()
const defaultProps = {
    label: 'name',
    isLeaf: 'leaf',
    'node-icon': (data, a, b) => {
        console.log(1, data, a, b)
    },
    class: 'tree-item'
}
const handleNodeClick = (data) => {
    console.log(data)
}
const handlerLoad = (node, resolve) => {
    if (node.level === 0) {
        appStore.fetch()
            .then(res => {
                console.log('app fetch', res)
                resolve(res.data)
            })
    } else if (node.level === 1) {
        const appid = node.data.appid
        collectionStore.fetch(appid)
            .then(res => {
                res.data.map((item) => {
                    item.leaf = true
                })
                resolve(res.data)
            })
    } else {
        resolve([])
    }
}

const handlerClick = (node, data) => {
    console.log('node', node)
    console.log('data', data)
}

const clickCollection = (node, data) => {
    console.log('dblclick', node, data)
}

// data.value = [
//     {
//         label: 'Level one 1',
//         children: [
//             {
//                 label: 'Level two 1-1',
//                 children: [
//                     {
//                         label: 'Level three 1-1-1',
//                     },
//                 ],
//             },
//         ],
//     },
//     {
//         label: 'Level one 2',
//         children: [
//             {
//                 label: 'Level two 2-1',
//                 children: [
//                     {
//                         label: 'Level three 2-1-1',
//                     },
//                 ],
//             },
//             {
//                 label: 'Level two 2-2',
//                 children: [
//                     {
//                         label: 'Level three 2-2-1',
//                     },
//                 ],
//             },
//         ],
//     },
//     {
//         label: 'Level one 3',
//         children: [
//             {
//                 label: 'Level two 3-1',
//                 children: [
//                     {
//                         label: 'Level three 3-1-1',
//                     },
//                 ],
//             },
//             {
//                 label: 'Level two 3-2',
//                 children: [
//                     {
//                         label: 'Level three 3-2-1',
//                     },
//                 ],
//             },
//         ],
//     },
// ]
</script>
<style scoped lang="scss">
.tree {
    @apply select-none;

    ::v-deep {
        .tree-item {
            @apply text-base;
            @apply bg-yellow-200;

            .el-tree-node__content {
                @apply py-1;
            }
        }
    }
}
</style>
