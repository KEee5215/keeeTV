# 🎤 myKTV-react

配置llm, 输入歌手和歌名，即可获取歌曲LRC歌词。

基于react的纯前端项目, 所有配置均存储在浏览器本地存储中。

支持音乐播放，歌词同步，歌词高亮，歌词生成等功能。

## ✨ 主要功能

- **智能点歌**：输入歌手和歌名，一键获取歌曲LRC歌词。
- **AI 歌词生成**：集成 OpenAI API，获取歌曲元信息以搜索精准的 LRC 格式歌词[lrclib.net](https://lrclib.net/)。
- **实时歌词同步**：支持上传本地音频文件，实现歌词随音频进度自动滚动与高亮。

## 🛠️ 技术栈

- **核心框架**: React ^19.2.5
- **构建工具**: Vite ^8.0.10
- **路由管理**: React Router ^7.14.2
- **API 服务**: [lrclib.net](https://lrclib.net/)。。
- **样式方案**: 原生 CSS (模块化组织)

## 🚀 快速开始

### 前置要求

- Node.js >= 18.0.0
- pnpm (推荐)

### 安装依赖

```bash
pnpm install
```

### 启动开发服务器

```bash
pnpm run dev
```

访问终端输出的本地地址（通常是 `http://localhost:5173`）即可预览。

### 构建生产版本

```bash
pnpm run build
```

## 📂 项目结构

```text
myKTV-react/
├── src/
│   ├── components/      # 页面组件 (Home, Lyrics, Icons等)
│   ├── service/         # 业务逻辑层 (LRC获取与解析工具)
│   ├── style/           # 全局与组件样式
│   ├── routes/          # 路由配置
│   └── App.jsx          # 应用入口
├── public/              # 静态资源 (GIF动图, 静音音频等)
└── index.html
```
