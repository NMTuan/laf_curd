<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2023-07-12 10:50:52
 * @LastEditTime: 2023-07-12 23:05:05
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \laf_curd\pages\manager.vue
-->
<template>
    <NuxtLayout name="manager">
        <div class="flex h-screen overflow-hidden">
            <div class="flex flex-col w-280px flex-shrink-0 bg-gray-50">
                <div class="flex-shrink-0 h-18">
                    <NuxtLink to="/manager/">logo</NuxtLink>
                </div>
                <div class="flex-1 overflow-hidden">
                    <ScrollBox>
                        <ManagerSide></ManagerSide>
                    </ScrollBox>
                </div>
            </div>
            <div class="flex-1 overflow-hidden">
                <div class="flex flex-col h-full">
                    <div class="flex-shrink-0 bg-gray-50 h-18 flex">
                        <ManagerHeader></ManagerHeader>
                    </div>

                    <div class="flex-1 overflow-hidden">
                        <ScrollBox>
                            <NuxtPage keepalive class="p-6"></NuxtPage>
                        </ScrollBox>
                    </div>
                </div>
            </div>
        </div>
    </NuxtLayout>
</template>
