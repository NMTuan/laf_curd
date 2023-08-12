<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2023-07-13 09:34:02
 * @LastEditTime: 2023-07-15 20:50:35
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \laf_curd\components\manager\header.vue
-->
<template>
    <div class="flex-1 flex flex-col justify-between overflow-hidden">
        <div class="flex items-center justify-end flex-1 overflow-hidden text-sm px-4 text-teal-200">
            <div class="flex items-center justify-center">
                <div v-for="group in urls" class="ml-6 flex items-center">
                    [
                    <a :href="item.url" target="_blank" v-for="item in group" class="mx-2 flex items-center">
                        <img v-if="item.img" :src="item.img" />
                        <span v-else>{{ item.label }}</span>
                    </a>
                    ]
                </div>
            </div>
            <div class="flex items-center ml-6">
                [
                <i class="inline-block i-ri-user-fill mr-1 ml-3"></i>
                <span class="mr-4">{{ username }}</span>
                <span class="mr-3 hover:underline cursor-pointer" @click="handlerLogout">Sign out</span>
                ]
            </div>
        </div>
        <div class="ml-4 flex-shrink-0">
            <ManagerTab></ManagerTab>
        </div>
    </div>
</template>
<script setup>
const useStore = useUserStore()
const urls = [
    [
        { label: 'Laf', url: 'https://laf.run/' },
        { label: 'Docs', url: 'https://doc.laf.run/guide/' },
        { label: 'Forum', url: 'https://forum.laf.run/' },

    ], [
        { label: 'Laf x DB', url: 'https://curd.muyi.dev/' },
        { label: 'Old', url: '/old/' },
        {
            label: 'GitHub', url: 'https://github.com/NMTuan/laf_curd',
            img: 'https://img.shields.io/github/stars/NMTuan/laf_curd?style=flat-square&label=Github&labelColor=%2311a697&color=%2399f6e4'
        },
        { label: 'Author', url: 'https://www.muyi.dev/' },
    ]
]
const username = ref('')

const fetchProfile = () => {
    request({
        path: '/v1/user/profile'
    }).then(res => {
        username.value = res.data.username || res.data.name
        // console.log('res', res)
    })
        .catch(() => { })
}

const handlerLogout = () => {
    ElMessageBox.confirm(
        'Are you sure you want to sign out?',
        'Warning',
        {
            confirmButtonText: 'Exit',
            cancelButtonText: 'Cancel',
        }
    ).then(() => {
        useStore.clearToken()
        navigateTo({ name: 'welcome' }, {
            replace: true
        })
    })

}

fetchProfile()
</script>
<style lang="scss" scoped>
a {
    @apply text-teal-200;
    @apply no-underline;
    // @apply ml-4;

    &:hover {
        @apply underline;
    }
}
</style>
