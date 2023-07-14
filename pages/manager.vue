<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2023-07-12 10:50:52
 * @LastEditTime: 2023-07-14 17:16:57
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \laf_curd\pages\manager.vue
-->
<template>
    <NuxtLayout name="manager">
        <div class="flex flex-1 overflow-hidden">
            <div class="flex flex-col w-240px flex-shrink-0 bg-cool-gray-100">
                <div class="flex flex-shrink-0 items-center justify-center h-18 bg-teal-500">
                    <NuxtLink to="/manager/" class="text-white text-xl font-bold no-underline">Laf x DB</NuxtLink>
                </div>
                <div class="flex-1 overflow-hidden">
                    <ScrollBox>
                        <ManagerSide></ManagerSide>
                    </ScrollBox>
                </div>
            </div>
            <div class="flex flex-1 overflow-hidden">
                <div class="flex flex-col flex-1 overflow-hidden">
                    <div class="flex-shrink-0 bg-teal-500 h-18 flex">
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
