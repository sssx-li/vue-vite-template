# vue-vite-template

### 特色功能

```
  基于vite、vue3

  集成vue-router、vueuse、pinia、typescript、mockjs

  集成ESlint、Prettie、Stylelint代码规范工具。

  集成commitlint git信息提交规范工具

  集成国际化vue-i18n

  集成主题切换功能(cssVar)

  集成多种动态svg图标使用：封装SvgIcon组件、集成unplugin-icons

```

### 项目结构说明

- generate  
  目前用于生成静态资源图片路径，即 src/assets/imgs 目录下的图片资源(为 src/utils/getImgUrl 函数参数提供类型声明)

- mock  
  用于 mock 数据供项目使用

- typing  
  存放全局变量/属性声明

- src(核心代码存放位置)

  - assets(静态资源文件)  
     存放图片、字体等资源文件

  - components  
    存放全局通用组件

  - constants  
    存放全局常量

  - directives
    存放全局指令函数

  - filters  
    存放全局过滤函数

  - hooks  
    存放全局 hook

  - i18n  
    存放国际化配置

  - router  
    存放路由配置

  - service  
    存放网络请求相关内容

  - store  
    存放状态管理

  - styles  
    存放全局样式

  - typing  
    存放公用变量/属性类型声明及类型转换函数

  - utils  
    存放全局工具函数

  - views
    存放页面组件

#### 分支管理

```base
  main/master: 用于基础功能开发
  element-template: 集成element-plus
  antd-template: 集成ant-design-vue
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

### vueuse 使用相关系列文章

#### [1.vueuse-useLocalStorage 在项目中的使用](https://blog.csdn.net/weixin_42386379/article/details/130059649?spm=1001.2014.3001.5501)

#### [2.vueuse-useCssVar 实现主题色切换功能](https://blog.csdn.net/weixin_42386379/article/details/130193843?spm=1001.2014.3001.5502)

#### [3.vueuse-createFetch 实现接口请求及其封装(代替 axios)](https://blog.csdn.net/weixin_42386379/article/details/130216301?spm=1001.2014.3001.5502)

#### [4.vueuse-useFullscreen 优雅的使用全屏及退出全屏](https://blog.csdn.net/weixin_42386379/article/details/130598170?spm=1001.2014.3001.5502)

#### [5.vueuse-useDark 实现暗黑主题及浅亮主题及 Element-Plus 暗黑模式](https://blog.csdn.net/weixin_42386379/article/details/131285114?spm=1001.2014.3001.5502)
