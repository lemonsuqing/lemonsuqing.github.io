# 项目概览

这是一个基于 Hexo 的个人博客项目，使用自定义主题 `my-theme`，具有现代化的深色/浅色主题切换功能和炫酷的宇宙星空背景效果。

## 技术栈

- **Hexo 8.1.1** - 静态博客生成器
- **hexo-admin** - 可视化博客管理后台
- **hexo-deployer-git** - Git 自动部署
- **hexo-generator-searchdb** - 本地搜索功能
- **Prism.js** - 代码高亮
- **Fancybox** - 图片灯箱效果

## 项目结构

```
myblog/
├── _config.yml              # Hexo 主配置文件
├── _admin-config.yml        # hexo-admin 配置
├── package.json             # npm 依赖和脚本
├── source/                  # 源文件目录
│   ├── _posts/             # 博客文章 (Markdown)
│   ├── _drafts/            # 草稿
│   ├── _discarded/         # 废弃文章
│   ├── categories/         # 分类页面
│   └── tags/               # 标签页面
├── themes/                  # 主题目录
│   └── my-theme/           # 自定义主题
│       ├── _config.yml     # 主题配置
│       ├── layout/         # EJS 模板
│       └── source/         # 主题资源 (CSS/JS)
├── scaffolds/               # 文章模板
├── public/                  # 生成的静态文件
└── .deploy_git/            # 部署缓存
```

## 核心功能

### 1. 主题系统
- **深色/浅色主题切换**: 通过 `data-theme` 属性控制，支持本地存储记忆
- **宇宙星空背景**: 仅在深色模式下显示，包含星星、星云、流星动画
- **响应式设计**: 适配桌面和移动设备

### 2. 博客管理
- **hexo-admin**: 本地开发时自动显示"写博客"按钮，提供可视化编辑界面
- **文章分类和标签**: 支持多级分类和标签云
- **归档页面**: 按时间归档文章

### 3. 用户体验
- **本地搜索**: 基于 hexo-generator-searchdb 的站内搜索
- **图片灯箱**: 使用 Fancybox 实现图片放大查看
- **代码高亮**: Prism.js 自动换行，无行号显示
- **目录导航**: 文章详情页右侧显示自动生成的目录

## 构建和运行

### 开发环境
```bash
# 安装依赖
npm install

# 启动本地服务器 (http://localhost:4000)
npm run server
# 或
hexo server

# 启动 hexo-admin 管理后台
# 访问 http://localhost:4000/admin
# 用户名: lemonsuqing
```

### 创建新文章
```bash
# 创建新文章
hexo new "文章标题"

# 创建新页面
hexo new page "页面名称"

# 创建草稿
hexo new draft "草稿标题"
```

### 构建和部署
```bash
# 清理缓存和生成的文件
npm run clean
# 或
hexo clean

# 生成静态文件
npm run build
# 或
hexo generate

# 部署到 GitHub Pages
npm run deploy
# 或
hexo deploy

# 一键清理、生成并部署
hexo clean && hexo generate && hexo deploy
```

## 配置文件说明

### _config.yml (Hexo 主配置)
- `url`: https://lemonsuqing.cn
- `theme`: my-theme
- `language`: zh-CN
- `deploy`: 部署到 GitHub Pages (gh-pages 分支)
- `search`: 本地搜索配置

### themes/my-theme/_config.yml (主题配置)
- `menu`: 导航菜单配置 (首页、归档等)

### _admin-config.yml
- hexo-admin 管理后台配置

## 开发约定

### 文章格式
- 使用 Markdown 编写
- Front Matter 必须包含 `title` 和 `date`
- 可选字段: `tags`, `categories`
- 文章文件名建议使用英文或拼音

### 文章模板 (scaffolds/post.md)
```markdown
---
title: {{ title }}
date: {{ date }}
tags:
---
```

### 主题开发
- 使用 EJS 模板引擎
- CSS 使用 CSS 变量实现主题切换
- JavaScript 用于主题切换、搜索、图片灯箱等交互

### 代码高亮
- 使用 Prism.js
- 自动换行，无行号
- 深色模式: prism-tomorrow
- 浅色模式: prism-one-light

## 部署流程

1. 修改文章或配置
2. 本地预览: `npm run server`
3. 构建静态文件: `npm run build`
4. 部署到 GitHub: `npm run deploy`

部署会自动推送到 `git@github.com:lemonsuqing/lemonsuqing.github.io.git` 的 `gh-pages` 分支。

## 重要提示

- 本地开发时，访问 `http://localhost:4000/admin` 可使用 hexo-admin 管理后台
- 管理后台仅在本地环境 (localhost/127.0.0.1) 显示
- 主题切换状态保存在 localStorage 中
- 宇宙星空背景仅在深色模式下显示