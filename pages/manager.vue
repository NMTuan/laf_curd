<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2023-07-12 10:50:52
 * @LastEditTime: 2023-07-13 15:08:03
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \laf_curd\pages\manager.vue
-->
<template>
    <NuxtLayout name="manager">
        <div class="flex flex-1 overflow-hidden">
            <div class="flex flex-col w-280px flex-shrink-0 bg-gray-50">
                <div class="flex flex-shrink-0 h-18">
                    <div class="flex-1 border-b border-b-solid border-b-gray-200">
                        <NuxtLink to="/manager/">Laf 数据管理</NuxtLink>
                    </div>
                </div>
                <div class="flex-1 overflow-hidden">
                    <ScrollBox>
                        <ManagerSide></ManagerSide>
                    </ScrollBox>
                </div>
            </div>
            <div class="flex flex-1 overflow-hidden">
                <div class="flex flex-col flex-1 overflow-hidden">
                    <div class="flex-shrink-0 bg-gray-50 h-18 flex">
                        <ManagerHeader></ManagerHeader>
                    </div>

                    <div class="flex flex-1 overflow-hidden flex-col">
                        <NuxtPage keepalive></NuxtPage>
                    </div>
                </div>
            </div>
        </div>
    </NuxtLayout>
</template>
