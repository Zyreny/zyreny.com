class AIModel {
    constructor() {
        this.model = null;
        this.tokenizer = null;
        this.vocabSize = 0;
        this.sequenceLength = 10;
        this.wordToIndex = {};
        this.indexToWord = {};
    }

    // 創建詞彙表
    createVocabulary(texts) {
        // 將所有文本分詞並建立詞彙表
        const words = new Set();
        texts.forEach(text => {
            text.split(' ').forEach(word => words.add(word.toLowerCase()));
        });
        this.vocabulary = Array.from(words);
        this.vocabSize = this.vocabulary.length + 1; // +1 for padding
        
        // 建立索引映射
        this.wordToIndex = {};
        this.indexToWord = {};
        this.vocabulary.forEach((word, index) => {
            this.wordToIndex[word] = index + 1; // 保留 0 為 padding
            this.indexToWord[index + 1] = word;
        });
        
        console.log('詞彙表大小:', this.vocabSize);
        console.log('詞彙表:', this.vocabulary);
    }

    // 文本轉換為序列
    textToSequence(text) {
        const words = text.toLowerCase().split(' ');
        const sequence = words.map(word => this.wordToIndex[word] || 0);
        
        // 確保序列長度固定
        if (sequence.length > this.sequenceLength) {
            return sequence.slice(0, this.sequenceLength);
        } else {
            while (sequence.length < this.sequenceLength) {
                sequence.push(0); // padding
            }
        }
        return sequence;
    }

    // 創建訓練數據
    prepareTrainingData(texts) {
        const sequences = [];
        const nextWords = [];

        texts.forEach(text => {
            const words = text.toLowerCase().split(' ');
            if (words.length < 2) return; // 跳過太短的文本

            for (let i = 0; i < words.length - 1; i++) {
                const sequence = [];
                // 取前面的詞作為輸入序列
                for (let j = Math.max(0, i - this.sequenceLength + 1); j <= i; j++) {
                    sequence.push(this.wordToIndex[words[j]] || 0);
                }
                // padding to sequenceLength
                while (sequence.length < this.sequenceLength) {
                    sequence.unshift(0);
                }
                sequences.push(sequence);
                nextWords.push(this.wordToIndex[words[i + 1]] || 0);
            }
        });

        console.log('訓練序列數量:', sequences.length);
        console.log('序列示例:', sequences[0]);
        console.log('目標詞示例:', nextWords[0]);

        return {
            sequences: tf.tensor2d(sequences, [sequences.length, this.sequenceLength]),
            nextWords: tf.oneHot(nextWords, this.vocabSize)
        };
    }

    // 創建模型
    createModel() {
        this.model = tf.sequential();
        
        this.model.add(tf.layers.embedding({
            inputDim: this.vocabSize,
            outputDim: 16,
            inputLength: this.sequenceLength
        }));

        this.model.add(tf.layers.lstm({
            units: 32,
            returnSequences: false
        }));

        this.model.add(tf.layers.dense({
            units: this.vocabSize,
            activation: 'softmax'
        }));

        this.model.compile({
            optimizer: tf.train.rmsprop(0.01),
            loss: 'categoricalCrossentropy',
            metrics: ['accuracy']
        });
    }

    // 訓練模型
    async trainModel(trainingSet, epochs = 10) {
        return await this.model.fit(trainingSet.sequences, trainingSet.nextWords, {
            epochs: epochs,
            batchSize: 16,
            shuffle: true,
            callbacks: {
                onEpochEnd: async (epoch, logs) => {
                    if (this.onTrainingProgress) {
                        this.onTrainingProgress((epoch + 1) / epochs, logs.loss);
                    }
                    if (epoch % 2 === 0) {
                        await tf.nextFrame();
                        tf.tidy(() => {});
                    }
                }
            }
        });
    }

    // 生成回應
    async generateResponse(inputText) {
        try {
            if (!this.model) {
                throw new Error('模型尚未訓練');
            }

            const sequence = this.textToSequence(inputText);
            const prediction = await this.model.predict(tf.tensor2d([sequence])).array();
            
            // 取得前 3 個最可能的詞
            const topK = 3;
            const indices = Array.from(prediction[0].entries())
                .sort((a, b) => b[1] - a[1])
                .slice(0, topK)
                .map(x => x[0]);
            
            // 從前 3 個詞中隨機選擇一個
            const selectedIndex = indices[Math.floor(Math.random() * indices.length)];
            const predictedWord = this.indexToWord[selectedIndex];

            if (!predictedWord) {
                return '對不起，我需要更多訓練資料才能更好地回答這個問題。';
            }

            // 檢查是否有對應的完整答案
            const questions = Object.keys(trainingData);
            const bestMatch = questions.find(q => 
                q.toLowerCase().includes(inputText.toLowerCase())
            );

            if (bestMatch) {
                return trainingData[bestMatch];
            }

            return predictedWord;
        } catch (error) {
            console.error('生成回應時發生錯誤:', error);
            return '對不起，我現在無法正確理解。請提供更多訓練資料。';
        }
    }

    // 從預測分布中採樣
    sampleFromDistribution(distribution) {
        const sum = distribution.reduce((a, b) => a + b);
        const normalized = distribution.map(p => p / sum);
        const random = Math.random();
        let cumSum = 0;
        
        for (let i = 0; i < normalized.length; i++) {
            cumSum += normalized[i];
            if (random < cumSum) return i;
        }
        
        return normalized.length - 1;
    }

    // 保存模型
    async saveModel() {
        if (!this.model) return;
        await this.model.save('localstorage://ai-chat-model');
        localStorage.setItem('ai-chat-vocabulary', JSON.stringify({
            wordToIndex: this.wordToIndex,
            indexToWord: this.indexToWord,
            vocabSize: this.vocabSize
        }));
    }

    // 載入模型
    async loadModel() {
        try {
            // 檢查 localStorage 中是否存在模型
            const modelInfo = localStorage.getItem('tensorflowjs_models/ai-chat-model/info');
            if (!modelInfo) {
                console.log('localStorage 中沒有找到模型');
                return false;
            }
            
            // 嘗試載入模型
            try {
                this.model = await tf.loadLayersModel('localstorage://ai-chat-model');
                console.log('模型載入成功');
                
                // 載入詞彙表
                const vocabData = localStorage.getItem('ai-chat-vocabulary');
                if (!vocabData) {
                    console.log('找不到詞彙表數據');
                    return false;
                }
                
                const vocabJson = JSON.parse(vocabData);
                this.wordToIndex = vocabJson.wordToIndex;
                this.indexToWord = vocabJson.indexToWord;
                this.vocabSize = vocabJson.vocabSize;
                console.log('詞彙表載入成功，詞彙量:', this.vocabSize);
                
                return true;
            } catch (loadError) {
                console.error('載入模型時發生錯誤:', loadError);
                return false;
            }
        } catch (e) {
            console.warn('檢查模型時發生錯誤:', e);
            return false;
        }
    }
} 