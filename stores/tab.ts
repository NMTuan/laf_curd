/*
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2023-07-12 20:08:25
 * @LastEditTime: 2023-07-15 19:05:24
 * @LastEditors: NMTuan
 * @Description:
 * @FilePath: \laf_curd\stores\tab.ts
 */
import { defineStore } from 'pinia'
interface Route {
    name: string
    params?: string[]
}
export const useTabStore = defineStore('useTabStore', () => {
    const list: Ref<Route[]> = ref([])
    const append = (route: Route) => {
        const exits = list.value.find(
            (item) =>
                item.name === route.name &&
                JSON.stringify(item.params) === JSON.stringify(route.params)
        )
        if (!exits) {
            list.value.push(route)
        }
        // const index = list.value.findIndex((item) => item === route)
        // console.log(index, route)
        // if (route && index === -1) {
        //     list.value.push(route)
        // }
    }

    return {
        list,
        append
    }
})
