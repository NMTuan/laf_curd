<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2023-07-01 10:35:31
 * @LastEditTime: 2023-07-15 07:23:07
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \laf_curd\components\layout\header.vue
-->
<template>
    <div class="bg-white shadow">
        <div class="container mx-auto">
            <div class="h-12 px-4 flex items-center justify-between">
                <div class="logo">
                    <NuxtLink :to="{ name: 'old' }">laf CURD</NuxtLink>
                </div>
                <div>
                    github
                </div>
            </div>
        </div>
    </div>
</template>
