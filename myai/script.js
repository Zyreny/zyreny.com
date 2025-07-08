console.log('script.js 開始載入');

// 全局變數
let aiModel;
let isTrainingMode = false;
let trainingData = {};
let currentQuestion = '';

// 顯示狀態訊息
function showStatus(message, showLoader = false) {
    const statusMessage = document.getElementById('statusMessage');
    const loader = document.getElementById('loader');
    if (statusMessage) statusMessage.textContent = message;
    if (loader) loader.style.display = showLoader ? 'block' : 'none';
}

// 添加訊息到聊天室
function addMessage(text, isUser, isSystem = false) {
    const chatContainer = document.getElementById('chatContainer');
    if (!chatContainer) return;

    const messageDiv = document.createElement('div');
    if (isSystem) {
        messageDiv.className = 'system-message';
    } else {
        messageDiv.className = `message ${isUser ? 'user-message' : 'ai-message'}`;
    }
    messageDiv.textContent = text;
    chatContainer.appendChild(messageDiv);
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

// 添加歡迎訊息
function addWelcomeMessage() {
    const chatContainer = document.getElementById('chatContainer');
    if (!chatContainer) return;

    const welcomeDiv = document.createElement('div');
    welcomeDiv.className = 'welcome-message';
    welcomeDiv.innerHTML = `
        <h2>來做出自己的AI吧！</h2>
        <ol>
            <li>點擊「切換至訓練模式」按鈕進入訓練模式</li>
            <li>在訓練模式下：
                <ul>
                    <li>首先輸入問題</li>
                    <li>然後輸入對應的答案</li>
                    <li>重複此步驟來增加更多訓練資料</li>
                </ul>
            </li>
            <li>完成訓練資料輸入後，點擊「訓練AI模型」按鈕</li>
            <li>等待模型訓練完成</li>
            <li>切換回聊天模式即可開始對話</li>
            <li>您可以隨時：
                <ul>
                    <li>導出訓練資料保存</li>
                    <li>導入之前的訓練資料</li>
                </ul>
            </li>
        </ol>
    `;
    chatContainer.appendChild(welcomeDiv);
}

// 處理發送訊息
async function handleSend() {
    const userInput = document.getElementById('userInput');
    const text = userInput.value.trim();
    if (!text) return;

    addMessage(text, true);
    userInput.value = '';

    if (isTrainingMode) {
        if (!currentQuestion) {
            currentQuestion = text;
            addMessage('請輸入這個問題的答案：', false);
            showStatus('請輸入答案');
        } else {
            if (!trainingData) {
                trainingData = {};
            }
            
            trainingData[currentQuestion] = text;
            
            // 保存訓練資料到 localStorage
            try {
                localStorage.setItem('aiTrainingData', JSON.stringify(trainingData));
                console.log('訓練資料已保存到 localStorage');
            } catch (saveError) {
                console.error('保存訓練資料時發生錯誤:', saveError);
                showStatus('保存訓練資料失敗: ' + saveError.message);
            }
            
            const dataCount = Object.keys(trainingData).length;
            console.log('目前訓練資料：', trainingData);
            console.log('訓練資料數量：', dataCount);
            
            addMessage(`已學習！目前已有 ${dataCount} 組訓練資料`, false);
            showStatus(`已儲存 ${dataCount} 組訓練資料`);
            
            currentQuestion = '';
            addMessage('請輸入新的問題', false);
        }
    } else {
        try {
            if (!aiModel || !aiModel.model) {
                addMessage('AI還沒有訓練好，請先切換到訓練模式並進行訓練。點擊上方的「切換至訓練模式」按鈕，輸入一些問答對，然後點擊「訓練AI模型」按鈕。', false);
                showStatus('請先訓練模型');
                return;
            }
            
            showStatus('正在生成回應...', true);
            const response = await aiModel.generateResponse(text);
            showStatus('');
            addMessage(response, false);
        } catch (error) {
            console.error('生成回應時發生錯誤:', error);
            addMessage('生成回應時發生錯誤: ' + error.message + '。請確保模型已正確訓練。', false);
            showStatus('生成回應失敗');
        }
    }
}

// 添加 trainAIModel 函數
async function trainAIModel() {
    try {
        showStatus('開始訓練模型...', true);
        
        if (Object.keys(trainingData).length === 0) {
            throw new Error('沒有訓練資料，請先在訓練模式下輸入一些問答對');
        }

        console.log('當前訓練資料:', trainingData);
        
        const questions = Object.keys(trainingData);
        const answers = Object.values(trainingData);
        
        if (questions.length < 2) {
            throw new Error('訓練資料太少，請至少輸入兩組問答對');
        }

        const texts = [...questions, ...answers];
        console.log('處理後的訓練文本:', texts);

        // 嘗試切換到 CPU 後端
        try {
            console.log('嘗試切換到 CPU 後端...');
            await tf.setBackend('cpu');
            console.log('當前後端:', tf.getBackend());
        } catch (backendError) {
            console.warn('切換後端失敗:', backendError);
        }

        try {
            aiModel.createVocabulary(texts);
            console.log('詞彙表大小:', aiModel.vocabSize);
        } catch (error) {
            throw new Error('創建詞彙表失敗: ' + error.message);
        }

        // 減少模型複雜度
        aiModel.model = tf.sequential({
            layers: [
                tf.layers.embedding({
                    inputDim: aiModel.vocabSize,
                    outputDim: 8, // 減少維度
                    inputLength: aiModel.sequenceLength
                }),
                tf.layers.lstm({
                    units: 16, // 減少單元數
                    returnSequences: false
                }),
                tf.layers.dense({
                    units: aiModel.vocabSize,
                    activation: 'softmax'
                })
            ]
        });

        aiModel.model.compile({
            optimizer: tf.train.adam(0.01),
            loss: 'categoricalCrossentropy',
            metrics: ['accuracy']
        });

        let trainingSet;
        try {
            trainingSet = aiModel.prepareTrainingData(texts);
            console.log('訓練資料準備完成');
        } catch (error) {
            console.error('準備訓練資料時的詳細錯誤:', error);
            throw new Error('準備訓練資料失敗: ' + error.message);
        }

        aiModel.onTrainingProgress = (progress, loss) => {
            const progressPercent = Math.round(progress * 100);
            const lossValue = loss ? loss.toFixed(4) : 'N/A';
            showStatus(`訓練進度: ${progressPercent}%, Loss: ${lossValue}`, true);
            console.log(`訓練進度: ${progress}, Loss: ${lossValue}`);
        };

        console.log('開始訓練...');
        // 減少訓練輪次
        const result = await aiModel.trainModel(trainingSet, 5);
        console.log('訓練結果:', result);
        
        // 保存模型和訓練資料
        try {
            showStatus('正在保存模型和訓練資料...', true);
            
            // 保存訓練資料到 localStorage
            localStorage.setItem('aiTrainingData', JSON.stringify(trainingData));
            console.log('訓練資料已保存到 localStorage');
            
            // 保存模型
            await aiModel.saveModel();
            console.log('模型已保存到 localStorage');
            
            showStatus('模型和訓練資料已保存！');
        } catch (saveError) {
            console.error('保存模型或訓練資料時發生錯誤:', saveError);
            showStatus('模型訓練完成，但保存失敗: ' + saveError.message);
        }
        
        showStatus('模型訓練完成！');
        addMessage('AI模型訓練完成，現在可以開始對話了！', false, true);
    } catch (error) {
        console.error('訓練過程中發生錯誤:', error);
        showStatus('訓練失敗: ' + error.message);
        addMessage(`訓練失敗：${error.message}`, false, true);
    }
}

// 設置事件監聽器
function setupEventListeners() {
    const elements = {
        modeToggle: document.getElementById('modeToggle'),
        modeIndicator: document.getElementById('modeIndicator'),
        sendButton: document.getElementById('sendButton'),
        userInput: document.getElementById('userInput'),
        trainAIButton: document.getElementById('trainAI'),
        exportDataButton: document.getElementById('exportData'),
        importDataButton: document.getElementById('importData'),
        importFile: document.getElementById('importFile'),
        clearDataButton: document.getElementById('clearData')
    };

    // 檢查所有元素是否存在
    for (const [key, element] of Object.entries(elements)) {
        if (!element) {
            console.error(`找不到元素: ${key}`);
            return;
        }
    }

    // 模式切換
    elements.modeToggle.onclick = () => {
        isTrainingMode = !isTrainingMode;
        currentQuestion = '';
        elements.modeToggle.textContent = isTrainingMode ? '切換至聊天模式' : '切換至訓練模式';
        elements.modeIndicator.textContent = isTrainingMode ? '訓練模式' : '聊天模式';
        addMessage(isTrainingMode ? '已切換至訓練模式。請輸入一個問題' : '已切換至聊天模式', false, true);
    };

    // 發送訊息
    elements.sendButton.onclick = handleSend;
    elements.userInput.onkeypress = (e) => {
        if (e.key === 'Enter') handleSend();
    };

    // 訓練AI
    elements.trainAIButton.onclick = trainAIModel;

    // 導出數據
    elements.exportDataButton.onclick = () => {
        const dataStr = JSON.stringify(trainingData, null, 2);
        const blob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'ai-training-data.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    // 導入數據
    elements.importDataButton.onclick = () => {
        // 重置 importFile 元素的 value，確保能夠重複導入相同的文件
        elements.importFile.value = '';
        elements.importFile.click();
    };

    elements.importFile.onchange = (e) => {
        const file = e.target.files[0];
        if (file) {
            showStatus('正在讀取文件...', true);
            const reader = new FileReader();
            reader.onload = (event) => {
                try {
                    const importedData = JSON.parse(event.target.result);
                    
                    // 檢查導入的數據格式是否正確
                    if (typeof importedData !== 'object' || importedData === null) {
                        throw new Error('導入的數據格式不正確，應為JSON對象');
                    }
                    
                    // 檢查是否有有效的問答對
                    const dataCount = Object.keys(importedData).length;
                    if (dataCount === 0) {
                        throw new Error('導入的數據不包含任何問答對');
                    }
                    
                    // 更新訓練資料
                    trainingData = importedData;
                    
                    // 保存導入的訓練資料到 localStorage
                    localStorage.setItem('aiTrainingData', JSON.stringify(trainingData));
                    
                    showStatus(`已導入 ${dataCount} 組訓練資料`);
                    addMessage(`已成功導入 ${dataCount} 組訓練資料`, false, true);
                    
                    // 提示用戶可以訓練模型
                    if (dataCount >= 2) {
                        addMessage('現在可以點擊「訓練AI模型」按鈕來訓練模型', false, true);
                    } else if (dataCount === 1) {
                        addMessage('需要至少2組問答對才能訓練模型，請再添加至少1組', false, true);
                    }
                } catch (error) {
                    console.error('導入數據失敗:', error);
                    showStatus('導入失敗: ' + error.message);
                    addMessage('導入失敗: ' + error.message, false, true);
                }
                
                // 重置 importFile 元素的 value
                elements.importFile.value = '';
            };
            reader.onerror = () => {
                showStatus('讀取文件失敗');
                addMessage('讀取文件失敗，請檢查文件格式', false, true);
                elements.importFile.value = '';
            };
            reader.readAsText(file);
        }
    };
    
    // 清除訓練資料
    elements.clearDataButton.onclick = () => {
        if (confirm('確定要清除所有訓練資料和模型嗎？此操作無法撤銷。')) {
            clearTrainingData();
        }
    };
}

// 修改 init 函數
async function init() {
    console.log('init 函數開始執行');
    try {
        if (typeof AIModel === 'undefined') {
            throw new Error('AIModel 未定義，請確認 model.js 是否正確載入');
        }
        
        // 設置 TensorFlow.js 的後端為 CPU
        try {
            console.log('初始化 TensorFlow.js 後端...');
            await tf.ready();
            console.log('TensorFlow.js 已準備就緒，當前後端:', tf.getBackend());
            
            // 嘗試切換到 CPU 後端
            if (tf.getBackend() !== 'cpu') {
                console.log('嘗試切換到 CPU 後端...');
                await tf.setBackend('cpu');
                console.log('已切換到 CPU 後端');
            }
            
            // 設置記憶體管理
            tf.env().set('WEBGL_DELETE_TEXTURE_THRESHOLD', 0);
            tf.env().set('WEBGL_FORCE_F16_TEXTURES', false);
        } catch (tfError) {
            console.warn('TensorFlow.js 初始化警告:', tfError);
        }

        aiModel = new AIModel();
        console.log('AI 模型實例已創建');

        addWelcomeMessage();
        setupEventListeners();

        // 初始化訓練資料
        trainingData = {};
        
        // 嘗試載入已保存的模型
        let modelLoaded = false;
        try {
            // 檢查 localStorage 中是否存在模型
            const modelInfo = localStorage.getItem('tensorflowjs_models/ai-chat-model/info');
            if (modelInfo) {
                showStatus('嘗試載入已保存的模型...', true);
                try {
                    modelLoaded = await aiModel.loadModel();
                    if (modelLoaded) {
                        console.log('已成功載入模型');
                        showStatus('已成功載入模型');
                        addMessage('已載入之前訓練的模型', false, true);
                    } else {
                        console.log('模型載入失敗');
                        showStatus('模型載入失敗，需要重新訓練');
                    }
                } catch (loadError) {
                    console.warn('載入模型時發生錯誤:', loadError);
                    showStatus('載入模型失敗，需要重新訓練');
                }
            } else {
                console.log('沒有找到已保存的模型');
                showStatus('沒有找到已保存的模型，需要訓練新模型');
            }
        } catch (modelError) {
            console.warn('檢查模型時發生錯誤:', modelError);
            showStatus('檢查模型失敗，需要訓練新模型');
        }
        
        // 嘗試載入訓練資料
        try {
            const loadedData = localStorage.getItem('aiTrainingData');
            if (loadedData) {
                trainingData = JSON.parse(loadedData);
                const dataCount = Object.keys(trainingData).length;
                console.log(`已載入 ${dataCount} 組訓練資料`);
                showStatus(`已載入 ${dataCount} 組訓練資料`);
                if (!modelLoaded) {
                    addMessage(`已載入 ${dataCount} 組訓練資料，但模型尚未訓練。請點擊「訓練AI模型」按鈕進行訓練。`, false, true);
                }
            } else {
                console.log('沒有找到已存在的訓練資料');
                if (!modelLoaded) {
                    showStatus('請開始輸入訓練資料');
                }
            }
        } catch (dataError) {
            console.error('載入訓練資料失敗:', dataError);
            showStatus('載入訓練資料失敗');
        }

        console.log('初始化完成');
    } catch (error) {
        console.error('初始化錯誤:', error);
        showStatus('初始化時發生錯誤，請重新載入頁面');
    }
}

// 確保在 DOM 完全載入後才初始化
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOMContentLoaded 事件觸發');
    setTimeout(() => {
        console.log('延遲初始化開始');
        init();
    }, 100);
});

// 添加清除訓練資料的功能
function clearTrainingData() {
    // 清除訓練資料
    trainingData = {};
    localStorage.removeItem('aiTrainingData');
    
    // 清除保存的模型
    try {
        localStorage.removeItem('tensorflowjs_models/ai-chat-model/info');
        localStorage.removeItem('tensorflowjs_models/ai-chat-model/model_topology');
        localStorage.removeItem('tensorflowjs_models/ai-chat-model/weight_specs');
        localStorage.removeItem('tensorflowjs_models/ai-chat-model/weight_data');
        localStorage.removeItem('ai-chat-vocabulary');
        
        // 重新初始化模型
        aiModel = new AIModel();
        
        // 重置導入文件元素
        const importFile = document.getElementById('importFile');
        if (importFile) {
            importFile.value = '';
        }
        
        // 重置當前問題
        currentQuestion = '';
        
    } catch (error) {
        console.error('清除模型時發生錯誤:', error);
    }
    
    showStatus('訓練資料和模型已清除');
    addMessage('所有訓練資料和模型已清除', false, true);
    addMessage('您可以開始添加新的訓練資料，或者導入已有的訓練資料', false, true);
}

const menu_Btn = document.querySelector(".menu_Btn"); 
const menu = document.querySelector(".menu"); 
const menu_aTags = document.querySelectorAll(".menu a"); 
const close_Btn = document.querySelector(".close_Btn"); 
const overlay = document.querySelector('.overlay');

menu_Btn.addEventListener("click", function () {
    menu.style.left = "0"; 
    menu.classList.toggle('open'); 
    overlay.classList.toggle('active'); 
})

close_Btn.addEventListener("click", function () {
    close_Menu(); 
})

overlay.addEventListener('click', () => {
    close_Menu(); 
});

menu_aTags.forEach(buttom => {
    buttom.addEventListener("click", function () {
        close_Menu(); 
    })
})

function close_Menu() {
    menu.style.left = "-350px"; 
    menu.classList.remove('open'); 
    overlay.classList.remove('active');
}