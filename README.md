# vue-vite-template

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