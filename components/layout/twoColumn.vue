<template>
    <div class="flex items-stretch flex-1">
        <!-- 侧边 -->
        <div class="flex-shrink-0 border-r-1 border-r-solid border-r-gray-200 w-60 pr-4 relative">
            <slot name="side"></slot>
        </div>
        <!-- 主体 -->
        <div class="flex-1 overflow-hidden relative">
            <slot></slot>
        </div>
    </div>
</template>
