# vue-vite-template

### 特色功能

```
  基于vite、vue3

  集成vue-router、vueuse、pinia、typescript、mockjs

  集成ESlint、Prettie、Stylelint等代码规范工具。

  集成commitlint git提交信息规范工具

  集成vue-i18n国际化及主题色切换功能

```

#### 分支管理

```base
  main/master: 用于基础功能开发
  element-template: 集成element-plus
  *-scope: 用于cli工具模板生成
```

## 安装依赖

```
pnpm install
```

### 开发环境编译运行

```
pnpm run dev
```

### mock 环境

```
pnpm run dev:mock
```

### 生产环境编译打包

```
pnpm run build
```

### 代码格式检测及修复

```
pnpm run lint
```

### commit 信息规范

e.g.: git commit -m "docs: update README.md"

| Type     |                                                   作用 |
| :------- | -----------------------------------------------------: |
| feat     |                                               新增特性 |
| fix      |                                               bug 修复 |
| perf     |                                               改善性能 |
| test     |                                                   测试 |
| docs     |                                               修改文档 |
| style    |                                           代码格式修改 |
| refactor |                                               代码重构 |
| build    |                                 变更项目构建或外部依赖 |
| ci       | 更改持续集成软件的配置文件和 package 中的 scripts 命令 |
| chore    |                                 变更构建流程或辅助工具 |
| revert   |                                               代码回退 |

### svg 及 iconify 图标的使用使用

```base
  1. 下载svg文件，并存放在src/assets/svgs目录下(该项目指定在此目录，可以在vite.config.js文件中进行修改)

  2. 使用: i-sy-{{svgName}}
    <!-- i 及 sy (前缀名)均可在vite.config.js进行修改，根据个人喜好设置(具体请查看使用说明:https://github.com/antfu/unplugin-icons) -->
    <i-sy-vue />
```

#### iconify 使用及 iconify([访问地址](https://icon-sets.iconify.design/))

```
  项目中引入的图集unplugin-icons会自动进行安装，可直接使用

  1. 在官方网站找到想用的图标

  2. 复制图集及icon名, 例： clarity:accessibility-1-solid; 图集为clarity，图标名为accessibility-1-solid
  <i-clarity:accessibility-1-solid/>
  or
  <i-clarity-accessibility-1-solid/>
```

### 动态 svg 使用 SvgIcon

```
  // 动态使用的svg存放在src/assets/svgs 目录下。根据svg图标名传入相应的参数, 同时支持修改图标颜色(修改颜色前请先删除svg代码里的fill属性，否则color属性将失效)。例:
  <svg-icon name="vue" style="color: #f60" />
```

### vueuse 中部分方法使用说明

[1. vueuse-useLocalStorage 在项目中的使用](https://blog.csdn.net/weixin_42386379/article/details/130059649)

[2. vueuse-useCssVar 实现主题色切换功能](https://blog.csdn.net/weixin_42386379/article/details/130193843)

[3. vueuse-createFetch 实现接口请求及其封装(代替 axios)](https://blog.csdn.net/weixin_42386379/article/details/130216301)

[4. vueuse-useFullscreen 优雅的使用全屏及退出全屏](https://blog.csdn.net/weixin_42386379/article/details/130598170)
