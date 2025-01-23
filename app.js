// 添加横屏检测
function checkOrientation() {
    const orientationTip = document.getElementById('orientation-tip');
    const storiesContainer = document.getElementById('stories-container');
    const gameContainer = document.getElementById('game-container');

    if (window.innerWidth <= 768 && window.innerHeight > window.innerWidth) {
        orientationTip.style.display = 'flex';
        storiesContainer.style.display = 'none';
        if (gameContainer.style.display === 'block') {
            gameContainer.style.display = 'none';
        }
    } else {
        orientationTip.style.display = 'none';
        storiesContainer.style.display = 'flex';
        if (gameContainer.dataset.wasVisible) {
            gameContainer.style.display = 'block';
        }
    }
}

// 监听屏幕旋转
window.addEventListener('orientationchange', () => {
    setTimeout(checkOrientation, 100);
});

// 监听窗口大小变化
window.addEventListener('resize', checkOrientation);

// 加载章节配置
async function loadChapters() {
    try {
        const response = await fetch('chapter.mwow');
        const content = await response.text();
        const chapters = content.match(/\[(.*?)\](\{.*?\}(?:\{.*?\})*)/g);
        
        const storiesContainer = document.getElementById('stories-container');
        let currentActiveChapter = null;

        // 添加备注章节
        const creditsContainer = document.createElement('div');
        creditsContainer.className = 'chapter-container';

        // 创建备注按钮
        const creditsButton = document.createElement('button');
        creditsButton.className = 'story-button chapter';
        creditsButton.innerHTML = `
            <span class="title">碎碎念</span>
            <span class="status">展开</span>
        `;

        // 创建备注内容容器
        const creditsContent = document.createElement('div');
        creditsContent.className = 'chapter-content credits-content';

        // 创建备注内容按钮
        const creditsInfoButton = document.createElement('button');
        creditsInfoButton.className = 'story-button credits-button';
        creditsInfoButton.style.width = '300px'; // 更宽的按钮
        creditsInfoButton.innerHTML = `
            <div class="credits-info" style="
                padding: 2rem;
                font-size: 1rem;
                line-height: 2;
                white-space: normal;
                writing-mode: horizontal-tb;
                display: flex;
                flex-direction: row;
                gap: 3rem;
                overflow-x: auto;
                overflow-y: hidden;
                width: max-content;
                height: 100%;
                padding-bottom: 2rem;
            ">
                <div style="text-align: center;">
                    <div style="font-size: 1.5rem; margin-bottom: 2rem; text-shadow: 0 0 10px rgba(255,255,255,0.5);">制作名单</div>
                </div>
                
                <div style="min-width: 200px;">
                    <div style="font-size: 1.2rem; margin-bottom: 1rem; color: #f0f0f0;">核心团队</div>
                    <div>总策划：AIBoB Team</div>
                    <div>剧本：BeiSea / 贝海</div>
                    <div>程序：Sulin / 苏淋</div>
                    <div>美术：Flux AI</div>
                    <div>音乐：Others</div>
                    <div>音效：Others</div>
                </div>

                <div style="min-width: 300px;">
                    <div style="font-size: 1.2rem; margin-bottom: 1rem; color: #f0f0f0;">特别鸣谢</div>
                    <div>感谢所有为游戏开发提供帮助的朋友们</div>
                    <div>感谢测试团队的反馈与建议</div>
                    <div>感谢玩家的支持与喜爱</div>
                    <div>感谢每一位给予建议的玩家</div>
                    <div>感谢每一位参与内测的玩家</div>
                    <div>感谢每一位支持我们的人</div>
                </div>

                <div style="min-width: 300px;">
                    <div style="font-size: 1.2rem; margin-bottom: 1rem; color: #f0f0f0;">关于游戏</div>
                    <div>本游戏是一个独立开发的视觉小说作品</div>
                    <div>融合了悬疑、恐怖与剧情后者搞笑元素</div>
                    <div>希望能带给玩家独特的游戏体验</div>
                    <div>游戏中的所有内容均为虚构</div>
                    <div>如有雷同纯属巧合</div>
                    <div>建议18岁以上玩家体验</div>
                </div>

                <div style="min-width: 250px;">
                    <div style="font-size: 1.2rem; margin-bottom: 1rem; color: #f0f0f0;">版本信息</div>
                    <div>当前版本：1.0.1</div>
                    <div>发布日期：2025年1月</div>
                    <div>更新日志请关注官方网站</div>
                    <div>后续将持续更新优化</div>
                    <div>欢迎反馈任何问题或建议</div>
                    <div>请关注我们的更新动态</div>
                </div>

                <div style="min-width: 250px;">
                    <div style="font-size: 1.2rem; margin-bottom: 1rem; color: #f0f0f0;">联系方式</div>
                    <div>官方网站：aibob.click</div>
                    <div>反馈邮箱：me@supage.eu.org</div>
                </div>

                <div style="text-align: center; margin-left: 2rem;">
                    <div style="font-size: 0.9rem; color: rgba(255, 255, 255, 0.7);">
                        © 2025 AIBoB Team<br>
                        All Rights Reserved<br>
                        本游戏所有内容均受著作权法保护
                    </div>
                </div>
            </div>
        `;

        creditsContent.appendChild(creditsInfoButton);
        
        // 备注点击事件
        creditsButton.onclick = () => {
            const isExpanding = !creditsContent.classList.contains('active');
            
            if (isExpanding) {
                // 隐藏其他章节
                document.querySelectorAll('.chapter-container').forEach(container => {
                    if (container !== creditsContainer) {
                        container.classList.add('hidden');
                    }
                });
                
                // 展开备注内容
                creditsContent.classList.remove('closing');
                creditsContent.classList.add('active');
                creditsButton.querySelector('.status').textContent = '收起';
            } else {
                // 收起操作
                creditsContent.classList.add('closing');
                creditsButton.querySelector('.status').textContent = '展开';
                
                setTimeout(() => {
                    creditsContent.classList.remove('active', 'closing');
                    
                    // 显示其他章节
                    document.querySelectorAll('.chapter-container.hidden').forEach(container => {
                        container.classList.remove('hidden');
                        container.classList.add('showing');
                        
                        setTimeout(() => {
                            container.classList.remove('showing');
                        }, 500);
                    });
                }, 500);
            }
        };

        creditsContainer.appendChild(creditsButton);
        creditsContainer.appendChild(creditsContent);
        storiesContainer.appendChild(creditsContainer);

        // 加载其他章节
        if (chapters) {
            for (const chapter of chapters) {
                const chapterMatch = chapter.match(/\[(.*?)\](.*)/);
                if (chapterMatch) {
                    const [_, chapterTitle, storiesStr] = chapterMatch;
                    // 匹配所有的故事配置
                    const storiesMatches = storiesStr.match(/\{(.*?)#(.*?)\}/g);
                    const stories = storiesMatches.map(s => {
                        const [title, id] = s.slice(1, -1).split('#');
                        return { title, id };
                    });

                    const chapterContainer = document.createElement('div');
                    chapterContainer.className = 'chapter-container';

                    // 创建章节按钮
                    const chapterButton = document.createElement('button');
                    chapterButton.className = 'story-button chapter';
                    chapterButton.innerHTML = `
                        <span class="title">${chapterTitle}</span>
                        <span class="status">展开</span>
                    `;

                    // 创建章节内容容器
                    const contentContainer = document.createElement('div');
                    contentContainer.className = 'chapter-content';

                    // 为每个故事创建按钮
                    for (const story of stories) {
                        const storyButton = document.createElement('button');
                        storyButton.className = 'story-button';
                        storyButton.innerHTML = `
                            <span class="title">${story.title}</span>
                            <span class="status">开始</span>
                        `;
                        
                        storyButton.onclick = () => startStory(`story/${story.id}.wow`);
                        contentContainer.appendChild(storyButton);
                    }

                    // 章节点击事件
                    chapterButton.onclick = () => {
                        const isExpanding = !contentContainer.classList.contains('active');
                        const isFirstChapter = !chapterContainer.previousElementSibling;
                        
                        if (isExpanding) {
                            // 隐藏其他章节
                            document.querySelectorAll('.chapter-container').forEach(container => {
                                if (container !== chapterContainer) {
                                    container.classList.add('hidden');
                                }
                            });

                            // 如果不是第一个章节，添加移动效果
                            if (!isFirstChapter) {
                                // 等待其他章节开始隐藏后，再移动当前章节
                                setTimeout(() => {
                                    chapterContainer.style.transform = 'translateX(-50px)';
                                    setTimeout(() => {
                                        chapterContainer.style.transform = 'translateX(0)';
                                        // 展开当前章节内容
                                        contentContainer.classList.remove('closing');
                                        contentContainer.classList.add('active');
                                    }, 300);
                                }, 100);
                            } else {
                                // 第一个章节直接展开，不需要移动效果
                                contentContainer.classList.remove('closing');
                                contentContainer.classList.add('active');
                            }
                            
                            chapterButton.querySelector('.status').textContent = '收起';
                        } else {
                            // 收起操作
                            contentContainer.classList.add('closing');
                            chapterButton.querySelector('.status').textContent = '展开';
                            
                            setTimeout(() => {
                                contentContainer.classList.remove('active', 'closing');
                                
                                // 显示其他章节
                                document.querySelectorAll('.chapter-container.hidden').forEach(container => {
                                    container.classList.remove('hidden');
                                    container.classList.add('showing');
                                    
                                    setTimeout(() => {
                                        container.classList.remove('showing');
                                    }, 500);
                                });
                            }, 500);
                        }
                    };

                    chapterContainer.appendChild(chapterButton);
                    chapterContainer.appendChild(contentContainer);
                    storiesContainer.appendChild(chapterContainer);
                }
            }
        }
    } catch (error) {
        console.error('加载章节失败:', error);
    }
}

// 全屏相关功能
function toggleFullScreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(err => {
            console.log(`全屏请求失败: ${err.message}`);
        });
    }
}

// 监听全屏变化
document.addEventListener('fullscreenchange', () => {
    const fullscreenPrompt = document.querySelector('.fullscreen-prompt');
    const fullscreenOverlay = document.querySelector('.fullscreen-overlay');
    const gameContainer = document.getElementById('game-container');
    
    if (!document.fullscreenElement && gameContainer.style.display === 'block') {
        // 如果退出全屏且游戏正在运行，显示遮罩和提示
        fullscreenPrompt.classList.add('show');
        fullscreenOverlay.classList.add('show');
    } else {
        // 如果进入全屏，隐藏遮罩和提示
        fullscreenPrompt.classList.remove('show');
        fullscreenOverlay.classList.remove('show');
    }
});

// 监听F11键
document.addEventListener('keydown', (e) => {
    if (e.key === 'F11') {
        const fullscreenPrompt = document.querySelector('.fullscreen-prompt');
        const fullscreenOverlay = document.querySelector('.fullscreen-overlay');
        fullscreenPrompt.classList.remove('show');
        fullscreenOverlay.classList.remove('show');
    }
});

// 启动故事
async function startStory(storyPath) {
    const gameContainer = document.getElementById('game-container');
    const fullscreenPrompt = document.querySelector('.fullscreen-prompt');
    const fullscreenOverlay = document.querySelector('.fullscreen-overlay');
    
    gameContainer.style.display = 'block';
    gameContainer.dataset.wasVisible = 'true';
    
    // 显示全屏提示和遮罩
    fullscreenPrompt.classList.add('show');
    fullscreenOverlay.classList.add('show');
    
    // 添加全屏按钮点击事件
    const fullscreenButton = document.querySelector('.fullscreen-button');
    fullscreenButton.onclick = () => {
        toggleFullScreen();
        // 加载游戏内容
        loadGameContent(storyPath);
    };
    
    // 检查横屏状态
    if (window.innerWidth <= 768 && window.innerHeight > window.innerWidth) {
        gameContainer.style.display = 'none';
        return;
    }
}

// 加载游戏内容
async function loadGameContent(storyPath) {
    // 加载游戏引擎
    const script = document.createElement('script');
    script.src = 'engine.js';
    document.body.appendChild(script);
    
    script.onload = async () => {
        try {
            const response = await fetch(storyPath);
            const content = await response.text();
            
            // 提取文档部分和配置
            const configMatch = content.match(/bgm\s*=\s*'([^']+)'\s*\nname\s*=\s*'([^']+)'\s*\nimg_base\s*=\s*'([^']+)'\s*\naudio_base\s*=\s*'([^']+)'/);
            const docMatch = content.match(/<document>([\s\S]*)<\/document>/);
            if (docMatch && configMatch) {
                const [_, bgm, name, imgBase, audioBase] = configMatch;
                const storyContent = docMatch[1].trim();

                // 创建音频加载提示
                const audioLoadingPrompt = document.createElement('div');
                audioLoadingPrompt.style.cssText = `
                    position: fixed;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    background: rgba(0, 0, 0, 0.9);
                    color: white;
                    padding: 1rem 2rem;
                    border-radius: 4px;
                    font-size: 1rem;
                    z-index: 2000;
                    display: none;
                    text-align: center;
                    border: 1px solid rgba(255, 255, 255, 0.2);
                    backdrop-filter: blur(10px);
                `;
                audioLoadingPrompt.textContent = '正在加载后续音频...';
                document.body.appendChild(audioLoadingPrompt);

                // 解析对话内容，预加载第一个音频
                const dialogues = storyContent.match(/\[(.*?)\]\[(.*?)\]\[(.*?)\]\[(.*?)\]\[(.*?)\](?:\[(.*?)\])?/g);
                if (dialogues && dialogues.length > 0) {
                    const firstDialogue = dialogues[0];
                    const audioMatch = firstDialogue.match(/\[(.*?)\]\[(.*?)\]\[(.*?)\]\[(.*?)\]\[(.*?)\](?:\[(.*?)\])?/);
                    if (audioMatch && audioMatch[6]) {
                        const firstAudioPath = `audio/${audioBase}/${audioMatch[6]}`;
                        await preloadAudio(firstAudioPath);
                    }
                }

                // 初始化游戏引擎
                window.initGame({
                    container: document.getElementById('game-container'),
                    content: storyContent,
                    bgm: `bgm/${bgm}`,
                    storyPath: storyPath,
                    imgBase: imgBase,
                    audioBase: `audio/${audioBase}`,
                    audioLoadingPrompt,
                    onComplete: () => {
                        // 游戏完成时退出全屏
                        if (document.fullscreenElement) {
                            document.exitFullscreen();
                        }
                        // 移除音频加载提示
                        document.body.removeChild(audioLoadingPrompt);
                    }
                });
            }
        } catch (error) {
            console.error('加载故事失败:', error);
        }
    };
}

// 预加载音频
async function preloadAudio(audioPath) {
    try {
        const response = await fetch(audioPath);
        const arrayBuffer = await response.arrayBuffer();
        const audioBuffer = await window.gameAudioContext.decodeAudioData(arrayBuffer);
        return audioBuffer;
    } catch (error) {
        console.error('音频预加载失败:', error);
        return null;
    }
}

// 预加载资源
async function preloadResources() {
    try {
        // 预加载章节配置
        await fetch('chapter.mwow');
        
        // 预加载游戏引擎
        const engineScript = document.createElement('script');
        engineScript.src = 'engine.js';
        document.body.appendChild(engineScript);
        
        await new Promise(resolve => engineScript.onload = resolve);

        // 创建音频上下文（用于后续音频处理）
        window.AudioContext = window.AudioContext || window.webkitAudioContext;
        window.gameAudioContext = new AudioContext();
    } catch (error) {
        console.error('预加载资源失败:', error);
    }
}

// 显示启动画面
async function showSplashScreen() {
    const splashScreen = document.getElementById('splash-screen');
    const storiesContainer = document.getElementById('stories-container');

    // 预加载资源
    await preloadResources();

    // 等待3秒
    await new Promise(resolve => setTimeout(resolve, 3000));

    // 淡出启动画面
    splashScreen.classList.add('fade-out');
    
    // 显示主界面
    storiesContainer.style.opacity = '1';

    // 移除启动画面
    setTimeout(() => {
        splashScreen.style.display = 'none';
    }, 500);

    // 加载章节
    loadChapters();
}

// 初始检查
window.addEventListener('load', () => {
    checkOrientation();
    showSplashScreen();
    initDragScroll();
});

// 初始化拖动滚动
function initDragScroll() {
    // 为所有可滚动容器添加拖动功能
    document.addEventListener('mousedown', handleDragStart);
    document.addEventListener('mousemove', handleDragMove);
    document.addEventListener('mouseup', handleDragEnd);
    document.addEventListener('mouseleave', handleDragEnd);

    // 触摸事件
    document.addEventListener('touchstart', handleDragStart);
    document.addEventListener('touchmove', handleDragMove);
    document.addEventListener('touchend', handleDragEnd);

    let isDragging = false;
    let startX;
    let scrollLeft;
    let activeContainer;

    function handleDragStart(e) {
        const container = e.target.closest('.chapter-content, .credits-info');
        if (!container) return;

        isDragging = true;
        activeContainer = container;
        container.classList.add('dragging');

        // 获取起始位置
        startX = e.type === 'mousedown' ? e.pageX : e.touches[0].pageX;
        scrollLeft = container.scrollLeft;

        // 防止文本选中
        e.preventDefault();
    }

    function handleDragMove(e) {
        if (!isDragging || !activeContainer) return;

        // 计算移动距离
        const x = e.type === 'mousemove' ? e.pageX : e.touches[0].pageX;
        const walk = (startX - x) * 2; // 乘2使滚动更快

        // 应用滚动
        activeContainer.scrollLeft = scrollLeft + walk;
    }

    function handleDragEnd() {
        if (!activeContainer) return;
        
        isDragging = false;
        activeContainer.classList.remove('dragging');
        activeContainer = null;
    }
}

// 动态调整字体和元素大小
function adjustLayout() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const scaleFactor = Math.min(width / 1920, height / 1080); // 基于1920x1080的比例

    // 调整字体大小
    document.documentElement.style.fontSize = `${16 * scaleFactor}px`;

    // 调整平行四边形等元素大小
    const elements = document.querySelectorAll('.parallelogram, .dialog-box, .button');
    elements.forEach(el => {
        el.style.transform = `scale(${scaleFactor})`;
    });
}

// 初始化布局调整
adjustLayout();

// 监听窗口大小变化
window.addEventListener('resize', adjustLayout);
