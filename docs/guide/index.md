---
title: 快速开始
order: -1
nav:
  title: 文档
  path: /docs
---

## 包划分(packages)

- [Antd](/antds) [antd](https://ant-design.antgroup.com/index-cn) 二次封装
- [Utils](/utils) 工具库，常用的工具函数或者 hooks 等
- [Components](/components) 存放功能性组件，提供更高级别的抽象支持，更偏向系统功能,如 TzFilter、权限，包含 proComponent 的二次封装，Eachrts、Activity 等
- [Translate](/translates) 其他相关通用性的东西

### 安装

当前 @tz 下 每一个组件都是一个独立的包，你需要在你的项目中安装对应的 npm 包并使用。

```shell
$ pnpm i @tz/xxx --save  --registry http://xxx.xxx.xxx.xxx:xxxx/
```

当前 @tz 提供了如下组件(包)可直接使用：

- `@tz/antd `
- `@tz/utils `
- `@tz/translate `
- `@tz/components `

## package 相关

#### 调试 Lib

本地开发项目调试 Lib，以调试@tz/components 为例：
1、进入 packages/components 目录下：，运行`pnpm link:global`
2、在本地开发项目中，运行 `pnpm link --global @tz/components`

发布 beta 版后：

在本地开发项目中更改包版本号为上面发布的版本号，直接运行`pnpm i`即可，

## 开发工作流

- `npm run dev` # 运行 dumi
- `npm run build` # 构建

## 发版流程

#### beta 版--部署上线之前都为 beta 版

- `pnpm changeset` # 选择要发布的包及版本，初期建议用 minor
- `pnpm release:beta` # 发布 beta 版本

#### 正式版--部署上线时发布

- `pnpm changeset` # 选择要发布的包及版本
- `pnpm publish`

#### 快照版--线上 bug 需要紧急修复时

- `pnpm changeset` # 选择要发布的包及版本
- `pnpm release:snapshot`

##### 以上版本发版后，提交代码和 tag 到 gitlab

- 手动修改 CHANGELOG.md
- `git add .`
- `git commit -m "Enter prerelease mode and version packages"`
- `git push`
- `git push --follow-tags`

## 文档规范

- 每个包下的同名且小写的 md 文件为该包的总览，描述改包如何单独安装和该包下的所有东西的 demo 或者总体的展示出来， 如[components](/components)。
- 我们规定每一个组件下的 README.md 文件为该组件的文档,这样不用写文档和组件一直跳来跳去，也很麻烦，可以参考 Activity 组件的文档写法[Activity 组件文档](/components/activity)

## 组件文件结构

在`.dumirc.ts`中， 我们会自动扫描当前组件下的文档路径，并自动配置路由菜单，所以只要加个相同的文档路由即可，在文档的组件中就可以渲染出来了

### 组件代码结构

```
|-- tensor-front-lib
    |-- packages
        |--  components
          |-- CHANGELOG.md // 变更日志，不用默认生成的，每次需手动修改
          |--  src
            |--  README.md // 总览说明
            |--  Activity
                |--  README.md // 组件说明文档
```

- 上述的对应文件新增后我们就可以去重新跑下文档，在`.dumirc.ts` 中 ctrl + s 或者重新启动文档命令`npm run dev`，就可以看到我们的组件文档被渲染出来了

## 一些约定

@tz 基于 antd 和 proComponent 之上来开发，为了与 antd 的生态保持兼容性，我们要求覆盖 antd 的样式必须要使用 `.@{tz-prefix}` 变量来生成类名,并不需要在组件中使用类似 module 模块化样式编译，会导致每次发包后的 css 类名都会被修改，无法在组件外修改 css 样式，否则下一次组件更新就失效了，所以在写你的组件的时候请尽可能使用`tz-${packageName}`开头的 css 类名开头切包在改类名内

#### 组件书写规范

```tsx | pure
import { ConfigProvider } from 'antd';
import { useContext } from 'react';
import './index.less';
export default () => {
  const prefixCls = 'tz-world-cloud'; // tz-{packageName}
  return <div className={prefixCls}>Test Component</div>;
};
```

#### Less:

```less
// ./index.less
@tz-worldCloud-prefix-cls: ~'tz-world-cloud';

.@{tz-worldCloud-prefix-cls} {
  border: solid 1px greenyellow;
}
```
