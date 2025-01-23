# AIBoB 视觉小说引擎

一个轻量级的视觉小说引擎，支持多章节故事、背景音乐、音效、图片等多媒体元素。让创作视觉小说变得简单而有趣！

## ✨ 特性

- 📱 响应式设计，支持移动端和桌面端
- 🎮 强制横屏模式，确保最佳游戏体验
- 🎵 支持背景音乐和音效，提供沉浸式体验
- 🖼️ 支持图片和过渡效果，画面流畅自然
- 💾 自动保存游戏进度，随时继续游戏
- 📚 多章节故事支持，轻松构建复杂剧情
- 🌐 支持 GitHub 页面部署，一键分享游戏
- 🎨 优雅的界面设计，美观且易用
- 🔄 平滑的过渡动画，提升游戏体验
- 📱 移动端优化，触控操作流畅

## 🎯 快速开始

1. 克隆仓库：
```bash
git clone https://github.com/alltobebetter/WowGame.git
cd WowGame
```

2. 创建你的第一个故事（在 `story` 目录下创建 `mystory.wow`）：
```
bgm = 'peaceful.ogg'
name = '我的第一个故事'
img_base = 'mystory'
audio_base = 'mystory'

<document>

# main
[主角][站在山顶，我深深地吸了一口气。][继续#next][mountain.jpg][#FFFFFF][breath.mp3]

# next
[主角][这里的风景真美啊...][欣赏风景#view|下山#leave][view.jpg][#E6E6FA][wind.mp3]

</document>
```

3. 启动本地服务器：
```bash
# 使用 Python
python -m http.server

# 或使用 Node.js
npx http-server
```

4. 打开浏览器访问 `http://localhost:8000` 即可开始游戏！

## 📁 目录结构

```
WowGame/
├── index.html          # 主页面
├── app.js             # 主要游戏逻辑
├── engine.js          # 游戏引擎核心
├── styles.css         # 样式表
├── favicon.ico        # 网站图标
├── audio/             # 音效文件目录
│   ├── ch1/          # 第一章音效
│   └── ch2/          # 第二章音效
├── bgm/              # 背景音乐目录
│   ├── peaceful.ogg  # 平静场景音乐
│   └── tense.ogg     # 紧张场景音乐
├── img/              # 图片资源目录
│   ├── ch1/         # 第一章图片
│   └── ch2/         # 第二章图片
└── story/            # 故事脚本目录
    ├── chapter1.wow  # 第一章剧本
    └── chapter2.wow  # 第二章剧本
```

## 📝 故事脚本格式

故事脚本使用 .wow 格式，支持丰富的多媒体元素和交互选项。

### 基本语法

```
bgm = '背景音乐文件名'     # 设置背景音乐
name = '章节名称'         # 设置章节标题
img_base = '图片目录'     # 设置图片基础路径
audio_base = '音效目录'   # 设置音效基础路径

<document>              # 故事内容开始标记

# 场景ID               # 场景标识符
[角色名]              # 说话的角色
[对话内容]            # 角色的对话
[选项1#场景1|选项2#场景2]  # 玩家选项及跳转目标
[背景图片]            # 场景背景图片
[文字颜色]            # 对话文字颜色
[音效文件]            # 场景音效

</document>           # 故事内容结束标记
```

### 示例剧本

这是一个简单的恐怖故事示例：

```
bgm = 'horror.ogg'
name = '医院惊魂'
img_base = 'hospital'
audio_base = 'horror'

<document>

# main
[旁白][深夜的医院里，一片寂静。][继续#wake][corridor.jpg][#CCCCCC][silence.mp3]

# wake
[我][这里是...医院？为什么这么安静？][查看四周#look|离开病房#escape][room.jpg][#E6E6FA][heartbeat.mp3]

# look
[旁白][你打开手机的手电筒，环顾四周。墙上布满了诡异的痕迹，病房里的其他床位都空空如也。][继续观察#investigate|返回#wake][wall.jpg][#FF6B6B][creepy.mp3]

# investigate
[我][等等，那是什么声音？][躲起来#hide|装睡#sleep|离开病房#escape][dark.jpg][#FF0000][footsteps.mp3]

</document>
```

## 🎨 特殊效果

### 文字颜色
- 使用十六进制颜色代码
- 例如：`[#FF0000]` 红色、`[#00FF00]` 绿色
- 支持透明度：`[#FF000088]` 半透明红色

### 音效使用
- 支持 .mp3, .ogg, .wav 格式
- 背景音乐会循环播放
- 音效支持一次性播放和循环播放
- 可以通过音量控制情绪渲染

### 图片效果
- 支持 .jpg, .png, .webp 格式
- 图片会自动适应屏幕大小
- 支持渐变过渡效果
- 可以设置背景模糊效果

## 🚀 高级功能

### 自动存档
- 游戏进度自动保存在浏览器本地存储
- 支持多个存档点
- 可以随时读取历史存档

### 全屏模式
- 支持 F11 快捷键切换
- 移动端支持手势控制
- 自动适应屏幕方向

### 移动端优化
- 横屏提示
- 触控优化
- 自适应界面

## 🌟 最佳实践

1. 故事编写
   - 使用简洁明了的场景ID
   - 合理安排剧情分支
   - 注意音效和背景的配合

2. 资源管理
   - 压缩图片和音频文件
   - 按章节组织资源文件
   - 使用统一的命名规范

3. 性能优化
   - 预加载关键资源
   - 合理使用音效
   - 控制图片大小

## 🔧 故障排除

常见问题及解决方案：

1. 图片不显示
   - 检查文件路径是否正确
   - 确认图片格式是否支持
   - 查看浏览器控制台报错

2. 音效不播放
   - 检查音频文件格式
   - 确认浏览器音频权限
   - 验证文件路径正确性

3. 存档问题
   - 清除浏览器缓存
   - 检查本地存储限制
   - 导出备份存档

## 🌐 浏览器兼容性

- Chrome 80+ ✅
- Firefox 75+ ✅
- Safari 13.1+ ✅
- Edge 80+ ✅
- Opera 67+ ✅

## 📄 许可证

© 2024 AIBoB Team. All rights reserved.

本项目采用 MIT 许可证。详见 [LICENSE](LICENSE) 文件。

## 🤝 贡献指南

我们欢迎所有形式的贡献，包括但不限于：

- 🐛 报告问题
- 💡 提出新功能建议
- 📝 改进文档
- 🔧 提交代码修复
- 🎨 优化用户界面

## 📞 联系我们

- 🌐 网站：[https://aibob.click](https://aibob.click)
- 📂 GitHub：[https://github.com/alltobebetter/WowGame](https://github.com/alltobebetter/WowGame)
- 📧 邮箱：support@aibob.click

## 🙏 致谢

感谢所有为这个项目做出贡献的开发者和用户。你们的支持是我们前进的动力！
