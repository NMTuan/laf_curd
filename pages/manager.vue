<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2023-07-12 10:50:52
 * @LastEditTime: 2023-07-12 17:32:36
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \laf_curd\pages\manager.vue
-->
<template>
    <NuxtLayout name="manager">
        <div class="flex h-screen overflow-hidden">
            <div class="flex flex-col w-280px flex-shrink-0 bg-gray-200">
                <div class="flex-shrink-0">logo</div>
                <div class="flex-1 overflow-hidden">
                    <ScrollBox>
                        <ManagerSide></ManagerSide>
                    </ScrollBox>
                </div>
            </div>
            <div class="flex-1">
                <div class="flex flex-col h-full">
                    <div class="flex-shrink-0">header</div>
                    <div class="flex-1 overflow-hidden">
                        <ScrollBox>
                        </ScrollBox>
                    </div>
                </div>
            </div>
        </div>
    </NuxtLayout>
</template>
