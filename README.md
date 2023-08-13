# Laf curd

一个 laf 的数据库管理工具。

- 访问 https://curd.muyi.dev/ 直接使用。
- 源码在这里 [NMTuan/laf_curd (github.com)](https://github.com/NMTuan/laf_curd)。

## 介绍

从名字不难看出，这是一个为 laf 云数据库设计的增删改查工具。

- 前端使用 `Nuxt v3` `Pinia` `Unocss`
- 后端对接 `laf api` `laf-client-sdk`

由于没有直接使用 UI 库，所以界面不咋好看。

为符合 MVP 最小可行性产品的方案，刚刚完成了 CURD 我就发了第一版 v0.1.0。

## 使用

首次打开后，是下面这么个样子，`api url` 就是你项目所在的 laf 地址，如果是 laf.dev 就修改一下。然后填写 `pat` 参数即可（[如何创建pat？](https://doc.laf.run/guide/cli/#登录)）。

![img](README/image-20230716135559277.png)

登录后是下面这个样子，左侧是主菜单，右侧是内容区域。值得说一句的是这次用了多tabs的模式。这也算是管理平台的标配了。

![img](README/image-20230716135635973.png)

下面这个是自定义查询界面，复杂的查询语句都可以在这里尝试。历史语句都保存在浏览器缓存中，放心使用。

这里支持 laf 的查询语句，支持 `_` 关键字。

![image-20230716135655742](README/image-20230716135655742.png)

### 如何查询？

> ```
> cloud.database().collection("user").where({ age: _.gt(18) }.get()
> ```

我们可以在左侧点击 `user`集合，然后数据框中填写 `where({ age: _.gt(18) }).get()` 点击前方的 `▶`即可。

> 注意：这里是支持`_`关键字的。具体查询语句可以参考[官方手册](https://doc.laf.run/guide/db/find.html)。

除了自定义查询外，我们也可以直接管理每个数据集合，如下图。创建、详情、编辑、删除、筛选，一应俱全。同样筛选记录会保存在浏览器缓存中。这里的查询支持：数据id、 laf where 或者 mongodb where 。

![image-20230716135712479](README/image-20230716135712479.png)

## 感谢

最后，感谢丰富的前端生态，感谢 laf 这个牛逼的产品。

- [Nuxt](https://github.com/nuxt/nuxt) MIT
- [Pinia](https://github.com/vuejs/pinia) MIT
- [Unocss](https://github.com/unocss/unocss) MIT
- [Laf](https://github.com/labring/laf) Apache License 2.0

如果你也喜欢 laf curd，或者本项目对你有所帮助。

可以[来这里点点 star🌟](https://github.com/NMTuan/laf_curd)。也或者[给作者加个鸡腿🍗🍗🍗](https://www.muyi.dev/sponsor)！
