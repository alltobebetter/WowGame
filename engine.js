// 游戏引擎
window.initGame = function({ container, content, bgm, storyPath, imgBase }) {
    // 游戏状态
    let currentScene = 'main';
    let isTyping = false;
    let audio = null;

    // 获取存档
    const saveKey = `save_${storyPath}`;
    const savedScene = localStorage.getItem(saveKey);
    
    if (savedScene) {
        // 显示继续游戏的对话框
        container.innerHTML = `
            <div style="
                width: 100%;
                height: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                background: #000;
            ">
                <div style="
                    background: rgba(0, 0, 0, 0.8);
                    padding: 2rem;
                    border: 1px solid rgba(255, 255, 255, 0.3);
                    text-align: center;
                ">
                    <div style="
                        color: white;
                        font-size: 1.2rem;
                        margin-bottom: 2rem;
                        text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
                    ">已记录本故事的游玩记录，是否要继续游玩？</div>
                    <div style="
                        display: flex;
                        gap: 1.5rem;
                        justify-content: center;
                    ">
                        <button id="continue-game" style="
                            background: none;
                            color: white;
                            border: 1px solid rgba(255, 255, 255, 0.3);
                            padding: 1rem 2rem;
                            font-size: 0.96rem;
                            cursor: pointer;
                            transition: all 0.3s ease;
                            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
                            backdrop-filter: blur(5px);
                            min-width: 150px;
                        ">继续游戏</button>
                        <button id="new-game" style="
                            background: none;
                            color: white;
                            border: 1px solid rgba(255, 255, 255, 0.3);
                            padding: 1rem 2rem;
                            font-size: 0.96rem;
                            cursor: pointer;
                            transition: all 0.3s ease;
                            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
                            backdrop-filter: blur(5px);
                            min-width: 150px;
                        ">从头开始</button>
                    </div>
                </div>
            </div>
        `;

        const continueButton = container.querySelector('#continue-game');
        const newGameButton = container.querySelector('#new-game');

        continueButton.addEventListener('mouseover', () => {
            continueButton.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
        });
        continueButton.addEventListener('mouseout', () => {
            continueButton.style.backgroundColor = 'transparent';
        });
        newGameButton.addEventListener('mouseover', () => {
            newGameButton.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
        });
        newGameButton.addEventListener('mouseout', () => {
            newGameButton.style.backgroundColor = 'transparent';
        });

        continueButton.addEventListener('click', () => {
            currentScene = savedScene;
            initGameUI();
        });

        newGameButton.addEventListener('click', () => {
            localStorage.removeItem(saveKey);
            currentScene = 'main';
            initGameUI();
        });

        return;
    }

    initGameUI();

    function initGameUI() {
        // 创建游戏界面
        container.innerHTML = `
            <div id="game-screen" style="
                width: 100%;
                height: 100%;
                position: relative;
                background: #000;
                overflow: hidden;
            ">
                <div id="scene-image" style="
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background-size: cover;
                    background-position: center;
                    transition: opacity 0.5s ease;
                "></div>
                <div id="scene-overlay" style="
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.5);
                "></div>
                <div id="dialog-box" style="
                    position: absolute;
                    bottom: 0;
                    width: 100%;
                    min-height: 30%;
                    background: rgba(0, 0, 0, 0.6);
                    padding: 20px;
                    box-sizing: border-box;
                    backdrop-filter: blur(5px);
                ">
                    <div id="speaker" style="
                        color: #fff;
                        font-size: 1.2em;
                        margin-bottom: 10px;
                        text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
                    "></div>
                    <div id="text" style="
                        color: #fff;
                        font-size: 1.1em;
                        line-height: 1.6;
                        text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
                    "></div>
                    <div id="choices" style="
                        margin-top: 20px;
                        display: flex;
                        gap: 1.5rem;
                        flex-wrap: wrap;
                        justify-content: flex-start;
                    "></div>
                </div>
                <div id="audio-control" style="
                    position: absolute;
                    top: 20px;
                    right: 20px;
                    z-index: 1000;
                    opacity: 0.8;
                    transition: opacity 0.3s;
                ">
                    <button id="bgm-button" style="
                        background: rgba(0, 0, 0, 0.3);
                        border: 1px solid rgba(255, 255, 255, 0.5);
                        color: white;
                        padding: 0.5rem 1rem;
                        cursor: pointer;
                        transition: all 0.3s ease;
                        backdrop-filter: blur(5px);
                        min-width: 80px;
                        text-align: center;
                        text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
                        font-family: "SimSun", serif;
                        font-size: 0.9rem;
                        border-radius: 4px;
                    ">音乐开</button>
                </div>
                <div id="exit-button" style="
                    position: absolute;
                    top: 20px;
                    left: 20px;
                    z-index: 1000;
                    opacity: 0.8;
                    transition: opacity 0.3s;
                ">
                    <button style="
                        background: rgba(0, 0, 0, 0.3);
                        border: 1px solid rgba(255, 255, 255, 0.5);
                        color: white;
                        padding: 0.5rem 1rem;
                        cursor: pointer;
                        transition: all 0.3s ease;
                        backdrop-filter: blur(5px);
                        min-width: 80px;
                        text-align: center;
                        text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
                        font-family: "SimSun", serif;
                        font-size: 0.9rem;
                        border-radius: 4px;
                    ">返回</button>
                </div>
            </div>
        `;

        // 退出按钮
        const exitButton = container.querySelector('#exit-button');
        exitButton.addEventListener('mouseover', () => {
            exitButton.style.opacity = '1';
        });
        exitButton.addEventListener('mouseout', () => {
            exitButton.style.opacity = '0.8';
        });
        exitButton.querySelector('button').addEventListener('click', (e) => {
            e.stopPropagation();
            // 保存当前进度
            localStorage.setItem(saveKey, currentScene);
            // 停止音乐
            if (audio) {
                audio.pause();
                audio = null;
            }
            // 隐藏游戏容器
            container.style.display = 'none';
            // 刷新页面回到主界面
            window.location.reload();
        });

        // 解析故事内容
        const scenes = {};
        const lines = content.split('\n').filter(line => line.trim());
        let currentSceneId = null;

        for (const line of lines) {
            if (line.startsWith('#')) {
                currentSceneId = line.substring(1).trim();
                scenes[currentSceneId] = [];
            } else if (currentSceneId && line.trim()) {
                const match = line.match(/\[(.*?)\]\[(.*?)\]\[(.*?)\]\[(.*?)\]\[(.*?)\]/);
                if (match) {
                    const [_, speaker, text, choices, image, color] = match;
                    scenes[currentSceneId].push({
                        speaker,
                        text,
                        choices: choices ? choices.split('|').map(choice => {
                            const [text, target] = choice.split('#');
                            return { text, target };
                        }) : [],
                        image,
                        color
                    });
                }
            }
        }

        // 音频控制
        const audioControl = container.querySelector('#audio-control');
        const bgmButton = container.querySelector('#bgm-button');
        audio = new Audio(bgm);
        audio.loop = true;

        audioControl.addEventListener('mouseover', () => {
            audioControl.style.opacity = '1';
        });

        audioControl.addEventListener('mouseout', () => {
            audioControl.style.opacity = '0.8';
        });

        bgmButton.addEventListener('click', (e) => {
            e.stopPropagation();
            if (audio.paused) {
                audio.play();
                bgmButton.textContent = '音乐开';
            } else {
                audio.pause();
                bgmButton.textContent = '音乐关';
            }
        });

        // 添加按钮悬停效果
        const buttons = [bgmButton, exitButton.querySelector('button')];
        buttons.forEach(button => {
            button.addEventListener('mouseover', () => {
                button.style.background = 'rgba(255, 255, 255, 0.2)';
                button.style.borderColor = 'rgba(255, 255, 255, 0.8)';
                button.parentElement.style.opacity = '1';
            });
            button.addEventListener('mouseout', () => {
                button.style.background = 'rgba(0, 0, 0, 0.3)';
                button.style.borderColor = 'rgba(255, 255, 255, 0.5)';
                button.parentElement.style.opacity = '0.8';
            });
        });

        // 打字机效果
        function typeWriter(element, text, color, callback) {
            isTyping = true;
            element.style.color = color || '#fff';
            let i = 0;
            element.textContent = '';
            
            function type() {
                if (i < text.length) {
                    element.textContent += text.charAt(i);
                    i++;
                    setTimeout(type, 30);
                } else {
                    isTyping = false;
                    if (callback) callback();
                }
            }
            
            type();
        }

        // 显示场景
        function showScene(sceneId) {
            currentScene = sceneId;
            // 保存进度
            localStorage.setItem(saveKey, currentScene);
            
            const scene = scenes[sceneId][0];
            if (!scene) return;

            const speaker = container.querySelector('#speaker');
            const text = container.querySelector('#text');
            const choices = container.querySelector('#choices');
            const sceneImage = container.querySelector('#scene-image');

            // 设置场景图片
            if (scene.image) {
                sceneImage.style.backgroundImage = `url(img/${imgBase}/${scene.image})`;
            } else {
                sceneImage.style.backgroundImage = 'none';
            }

            // 显示说话者
            speaker.textContent = scene.speaker;

            // 显示文本（打字机效果）
            typeWriter(text, scene.text, scene.color, () => {
                // 显示选项
                choices.innerHTML = '';
                if (scene.choices.length > 0) {
                    scene.choices.forEach(choice => {
                        const button = document.createElement('button');
                        button.textContent = choice.text;
                        button.style.cssText = `
                            background: none;
                            color: white;
                            border: 1px solid rgba(255, 255, 255, 0.3);
                            padding: 1rem 2rem;
                            font-size: 0.96rem;
                            cursor: pointer;
                            transition: all 0.3s ease;
                            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
                            backdrop-filter: blur(5px);
                            min-width: 150px;
                        `;
                        button.addEventListener('mouseover', () => {
                            button.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                        });
                        button.addEventListener('mouseout', () => {
                            button.style.backgroundColor = 'transparent';
                        });
                        button.addEventListener('click', () => {
                            if (!isTyping) {
                                showScene(choice.target);
                            }
                        });
                        choices.appendChild(button);
                    });
                }
            });
        }

        // 点击继续
        container.addEventListener('click', (e) => {
            // 如果音频暂停，尝试播放
            if (audio.paused) {
                audio.play().then(() => {
                    bgmButton.textContent = '音乐开';
                }).catch(() => {
                    // 如果自动播放失败，不做处理
                });
            }

            // 如果点击的是按钮，不处理后续逻辑
            if (e.target.tagName === 'BUTTON') return;
            
            const scene = scenes[currentScene][0];
            if (!scene) return;

            // 如果正在打字，立即显示全部文本
            if (isTyping) {
                isTyping = false;
                const text = container.querySelector('#text');
                text.textContent = scene.text;
                // 显示选项
                const choices = container.querySelector('#choices');
                choices.innerHTML = '';
                if (scene.choices.length > 0) {
                    scene.choices.forEach(choice => {
                        const button = document.createElement('button');
                        button.textContent = choice.text;
                        button.style.cssText = `
                            background: none;
                            color: white;
                            border: 1px solid rgba(255, 255, 255, 0.3);
                            padding: 1rem 2rem;
                            font-size: 0.96rem;
                            cursor: pointer;
                            transition: all 0.3s ease;
                            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
                            backdrop-filter: blur(5px);
                            min-width: 150px;
                        `;
                        button.addEventListener('mouseover', () => {
                            button.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                        });
                        button.addEventListener('mouseout', () => {
                            button.style.backgroundColor = 'transparent';
                        });
                        button.addEventListener('click', () => {
                            if (!isTyping) {
                                showScene(choice.target);
                            }
                        });
                        choices.appendChild(button);
                    });
                }
            }
        });

        // 开始游戏
        showScene('main');
        audio.play();
    }
}; 