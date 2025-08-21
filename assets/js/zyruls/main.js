document.addEventListener("DOMContentLoaded", () => {
    initPage("縮網址服務 - Zyreny", "Zyreny 提供的免費網址縮短服務，支援自訂連結、密碼保護、統計分析", "#2885e2"); 
    loadFonts(["Fira Code", "Huninn", "Noto Sans TC"]);
    loadNav([
        { id: "home", name: "首頁", href: "/" }, 
        { id: "projects", name: "作品", href: "/#Projects" },
    { id: "contact", name: "聯絡", href: "/#Contact" }
    ]);
});

const API_BASE_URL = 'https://api.zyreny.com/url_shortener';

async function apiRequest(endpoint, options = {}) {
    const defaultHeaders = {
        'Content-Type': 'application/json'
    };

    const config = {
        ...options,
        headers: {
            ...defaultHeaders,
            ...options.headers
        }
    };

    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    return response;
}

const tabButtons = document.querySelectorAll('.tab-button');
const tabContents = document.querySelectorAll('.tab-content');
const createForm = document.getElementById('createForm');
const createBtn = document.getElementById('createBtn');
const resultCard = document.getElementById('resultCard');
const resultUrl = document.getElementById('resultUrl');
const copyBtn = document.getElementById('copyBtn');
const copyStatus = document.getElementById('copyStatus');
const resultMeta = document.getElementById('resultMeta');
const urlList = document.getElementById('urlList');
const emptyState = document.getElementById('emptyState');
const refreshBtn = document.getElementById('refreshBtn');
const passwordToggle = document.getElementById('passwordToggle');
const passwordInput = document.getElementById('password');
const originalUrlInput = document.getElementById('originalUrl');
const metadataToggle = document.getElementById('metadataToggle');
const metadataSection = document.getElementById('metadataSection');
const metaTitleInput = document.getElementById('metaTitle');
const metaDescriptionInput = document.getElementById('metaDescription');
const metaImageInput = document.getElementById('metaImage');
const alertSuccess = document.getElementById('alertSuccess');
const alertError = document.getElementById('alertError');
const alertSuccessText = document.getElementById('alertSuccessText');
const alertErrorText = document.getElementById('alertErrorText');
const alertSuccess2 = document.getElementById('alertSuccess2');
const alertError2 = document.getElementById('alertError2');
const alertSuccessText2 = document.getElementById('alertSuccessText2');
const alertErrorText2 = document.getElementById('alertErrorText2');

let urls = [];

window.addEventListener('error', function(event) {
    console.error('JavaScript 錯誤:', event.error);
    if (event.error && event.error.message && event.error.message.includes('Cannot read properties of undefined')) {
        console.warn('檢測到 undefined 屬性存取錯誤，已自動處理');
    }
});

document.addEventListener('DOMContentLoaded', function() {
    initTabs();
    initPasswordToggle();
    initMetadataToggle();
    initFormSubmit();
    initCopyButton();
    initRefreshButton();
    initUrlValidation();
    initCustomCodeValidation();
    loadUrlList();
});

function initTabs() {
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabName = button.dataset.tab;
            switchTab(tabName);
        });
    });
}

function switchTab(tabName) {
    tabButtons.forEach(btn => btn.classList.remove('active'));
    document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');

    tabContents.forEach(content => content.classList.remove('active'));
    document.getElementById(tabName + 'Tab').classList.add('active');

    if (tabName === 'manage') {
        loadUrlList();
    }

    hideAlerts();
}

function initPasswordToggle() {
    passwordToggle.addEventListener('click', () => {
        const isPassword = passwordInput.type === 'password';
        passwordInput.type = isPassword ? 'text' : 'password';
        
        const svg = passwordToggle.querySelector('svg');
        if (isPassword) {
            svg.innerHTML = '<path d="m644-428-58-58q9-47-27-88t-93-32l-58-58q17-8 34.5-12t37.5-4q75 0 127.5 52.5T660-500q0 20-4 37.5T644-428Zm128 126-58-56q38-29 67.5-63.5T832-500q-50-101-143.5-160.5T480-720q-29 0-57 4t-55 12l-62-62q41-17 84-25.5t90-8.5q151 0 269 83.5T920-500q-23 59-60.5 109.5T772-302Zm20 246L624-222q-35 11-70.5 16.5T480-200q-151 0-269-83.5T40-500q21-53 53-98.5t73-81.5L56-792l56-56 736 736-56 56ZM222-624q-29 26-53 57t-41 67q50 101 143.5 160.5T480-280q20 0 39-2.5t39-5.5l-36-38q-11 3-21 4.5t-21 1.5q-75 0-127.5-52.5T300-500q0-11 1.5-21t4.5-21l-84-82Zm319 93Zm-151 75Z"/>';
        } else {
            svg.innerHTML = '<path d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Zm0-300Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z"/>';
        }
    });
}

function initMetadataToggle() {
    metadataToggle.addEventListener('click', () => {
        const isExpanded = metadataSection.classList.contains('expanded');
        
        if (isExpanded) {
            metadataSection.classList.remove('expanded');
            metadataToggle.classList.remove('expanded');
        } else {
            metadataSection.classList.add('expanded');
            metadataToggle.classList.add('expanded');
        }
    });
}

function initUrlValidation() {
    let urlValidationTimeout;
    let hasUrlUserInteracted = false;
    
    function debounce(func, wait) {
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(urlValidationTimeout);
                func(...args);
            };
            clearTimeout(urlValidationTimeout);
            urlValidationTimeout = setTimeout(later, wait);
        };
    }
    
    function validateUrl(url) {
        if (!url || !hasUrlUserInteracted) {
            originalUrlInput.classList.remove('invalid', 'valid');
            return;
        }
        
        try {
            const urlObj = new URL(url);
            if (urlObj.protocol === 'http:' || urlObj.protocol === 'https:') {
                originalUrlInput.classList.remove('invalid');
                originalUrlInput.classList.add('valid');
            } else {
                originalUrlInput.classList.remove('valid');
                originalUrlInput.classList.add('invalid');
            }
        } catch (e) {
            originalUrlInput.classList.remove('valid');
            originalUrlInput.classList.add('invalid');
        }
    }
    
    const debouncedValidate = debounce((url) => validateUrl(url), 500);
    
    originalUrlInput.addEventListener('input', (e) => {
        hasUrlUserInteracted = true;
        originalUrlInput.classList.remove('invalid', 'valid');
        debouncedValidate(e.target.value.trim());
    });
    
    originalUrlInput.addEventListener('blur', (e) => {
        if (hasUrlUserInteracted) {
            clearTimeout(urlValidationTimeout);
            validateUrl(e.target.value.trim());
        }
    });
    
    originalUrlInput.addEventListener('focus', () => {
        hasUrlUserInteracted = true;
        originalUrlInput.classList.remove('invalid', 'valid');
    });
}

function initCustomCodeValidation() {
    let customCodeValidationTimeout;
    let hasCustomCodeUserInteracted = false;
    const customCodeInput = document.getElementById('customCode');
    
    function debounce(func, wait) {
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(customCodeValidationTimeout);
                func(...args);
            };
            clearTimeout(customCodeValidationTimeout);
            customCodeValidationTimeout = setTimeout(later, wait);
        };
    }
    
    function validateCustomCode(code) {
        if (!code) {
            customCodeInput.classList.remove('invalid', 'valid');
            return;
        }
        
        if (!hasCustomCodeUserInteracted) {
            return;
        }
        
        const pattern = /^[a-zA-Z0-9-_]{3,20}$/;
        
        if (pattern.test(code)) {
            customCodeInput.classList.remove('invalid');
            customCodeInput.classList.add('valid');
        } else {
            customCodeInput.classList.remove('valid');
            customCodeInput.classList.add('invalid');
        }
    }
    
    const debouncedValidateCustomCode = debounce((code) => validateCustomCode(code), 500);
    
    customCodeInput.addEventListener('input', (e) => {
        hasCustomCodeUserInteracted = true;
        customCodeInput.classList.remove('invalid', 'valid');
        debouncedValidateCustomCode(e.target.value.trim());
    });
    
    customCodeInput.addEventListener('blur', (e) => {
        if (hasCustomCodeUserInteracted) {
            clearTimeout(customCodeValidationTimeout);
            validateCustomCode(e.target.value.trim());
        }
    });
    
    customCodeInput.addEventListener('focus', () => {
        hasCustomCodeUserInteracted = true;
        customCodeInput.classList.remove('invalid', 'valid');
    });
}

function initFormSubmit() {
    createForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        await createShortUrl();
    });
}

async function createShortUrl() {
    const originalUrl = document.getElementById('originalUrl').value;
    const customCode = document.getElementById('customCode').value;
    const password = document.getElementById('password').value;
    const expiration = document.getElementById('expiration').value;
    const metaTitle = metaTitleInput.value;
    const metaDescription = metaDescriptionInput.value;
    const metaImage = metaImageInput.value;

    if (!originalUrl) {
        showError('請輸入網址');
        return;
    }

    setLoading(true);
    hideAlerts();

    const metadata = {};
    if (metaTitle) metadata.title = metaTitle;
    if (metaDescription) metadata.description = metaDescription;
    if (metaImage) metadata.image = metaImage;

    // 將過期時間轉換為台北時區格式
    let formattedExpiration = undefined;
    if (expiration) {
        // datetime-local 輸入給出的是本地時間，我們需要將其轉換為台北時區
        const localDate = new Date(expiration);
        // 假設用戶在台北時區，將此時間視為台北時間並格式化為 +08:00 格式
        const taipeiOffset = 8 * 60; // 台北時區是 UTC+8
        const utcTime = localDate.getTime() - (localDate.getTimezoneOffset() * 60000);
        const taipeiTime = new Date(utcTime + (taipeiOffset * 60000));
        formattedExpiration = taipeiTime.toISOString().replace('Z', '+08:00');
    }

    try {
        const requestBody = {
            url: originalUrl,
            custom: customCode || undefined,
            password: password || undefined,
            expiration: formattedExpiration,
        };

        if (Object.keys(metadata).length > 0) {
            requestBody.metadata = metadata;
        }

        const response = await apiRequest('/shorten', {
            method: 'POST',
            body: JSON.stringify(requestBody),
        });

        const data = await response.json();

        if (response.ok) {
            showResult(data);
            createForm.reset();
            metadataSection.classList.remove('expanded');
            metadataToggle.classList.remove('expanded');
            showSuccess('短網址建立成功！');
        } else {
            showError(data.message || '建立失敗');
        }
    } catch (error) {
        showError('網路錯誤，請稍後再試');
    } finally {
        setLoading(false);
    }
}

function showResult(data) {
    if (!data) return;
    
    resultUrl.value = data.shortUrl || '';
    
    let metaHtml = `<span>建立時間：${formatDate(data.created)}</span>`;
    if (data.hasPassword) {
        metaHtml += `<span><svg class="icon-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="#2885e2"><path d="M240-80q-33 0-56.5-23.5T160-160v-400q0-33 23.5-56.5T240-640h40v-80q0-83 58.5-141.5T480-920q83 0 141.5 58.5T680-720v80h40q33 0 56.5 23.5T800-560v400q0 33-23.5 56.5T720-80H240Zm0-80h480v-400H240v400Zm240-120q33 0 56.5-23.5T560-360q0-33-23.5-56.5T480-440q-33 0-56.5 23.5T400-360q0 33 23.5 56.5T480-280ZM360-640h240v-80q0-50-35-85t-85-35q-50 0-85 35t-35 85v80ZM240-160v-400 400Z"/></svg> 密碼保護</span>`;
    }
    if (data.expiration) {
        metaHtml += `<span><svg class="icon-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="#d97706"><path d="m612-292 56-56-148-148v-184h-80v216l172 172ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-400Zm0 320q133 0 226.5-93.5T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160Z"/></svg> 過期時間：${formatDate(data.expiration)}</span>`;
    }
    if (data.metadata) {
        metaHtml += `<span><svg class="icon-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="#10b981"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-480H200v480Zm80-40h400L545-420 440-280l-65-87-95 127Zm-80 40v-560 560Z"/></svg> 社群媒體預覽</span>`;
    }
    
    resultMeta.innerHTML = metaHtml;
    resultCard.classList.add('show', 'fade-in');
}

function initCopyButton() {
    copyBtn.addEventListener('click', () => {
        copyToClipboard(resultUrl.value);
    });
}

async function copyToClipboard(text) {
    try {
        await navigator.clipboard.writeText(text);
        showCopyStatus('已複製到剪貼簿！', 'success');
    } catch (error) {
        try {
            const textArea = document.createElement('textarea');
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            showCopyStatus('已複製到剪貼簿！', 'success');
        } catch (fallbackError) {
            showCopyStatus('複製失敗，請手動複製', 'error');
        }
    }
}

function showCopyStatus(message, type = 'success') {
    copyStatus.textContent = message;
    copyStatus.className = `copy-status show ${type}`;
    
    setTimeout(() => {
        copyStatus.classList.remove('show');
        setTimeout(() => {
            if (!copyStatus.classList.contains('show')) {
                copyStatus.textContent = '';
            }
        }, 300);
    }, 3000);
}

async function copyUrlToClipboard(text, code) {
    try {
        await navigator.clipboard.writeText(text);
        showUrlCopyStatus(code, '已複製！', 'success');
    } catch (error) {
        try {
            const textArea = document.createElement('textarea');
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            showUrlCopyStatus(code, '已複製！', 'success');
        } catch (fallbackError) {
            showUrlCopyStatus(code, '複製失敗', 'error');
        }
    }
}

function showUrlCopyStatus(code, message, type = 'success') {
    const statusElement = document.getElementById(`copyStatus-${code}`);
    if (statusElement) {
        statusElement.textContent = message;
        statusElement.className = `copy-status show ${type}`;
        
        setTimeout(() => {
            statusElement.classList.remove('show');
            setTimeout(() => {
                if (!statusElement.classList.contains('show')) {
                    statusElement.textContent = '';
                }
            }, 300);
        }, 2000);
    }
}

async function loadUrlList() {
    try {
        const response = await apiRequest('/list');
        const data = await response.json();

        if (response.ok) {
            urls = data.urls || [];
            renderUrlList();
        } else {
            if (!urls) urls = [];
            showError(data.error || '載入列表失敗');
        }
    } catch (error) {
        if (!urls) urls = [];
        showError(error.error || '網路錯誤');
    }
}

function renderUrlList() {
    if (!urls || !Array.isArray(urls)) {
        urls = [];
    }
    
    if (urls.length === 0) {
        urlList.style.display = 'none';
        emptyState.style.display = 'block';
        return;
    }

    urlList.style.display = 'block';
    emptyState.style.display = 'none';

    urlList.innerHTML = urls.map(url => {
        if (!url || typeof url !== 'object') return '';
        
        const code = url.code || '';
        const originalUrl = url.url || '';
        const created = url.created || '';
        const hasPassword = url.hasPassword || false;
        const expiration = url.expiration || null;
        const hasMetadata = url.metadata || false;
        
        return `
        <div class="url-item fade-in">
            <div class="url-item-header">
                <div class="url-item-content">
                    <div class="short-url">
                        zye.me/${code}
                        <button type="button" class="btn btn-small btn-secondary" onclick="copyUrlToClipboard('https://zye.me/${code}', '${code}')">
                            <svg class="icon-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="#174879">
                                <path d="M360-240q-33 0-56.5-23.5T280-320v-480q0-33 23.5-56.5T360-880h360q33 0 56.5 23.5T800-800v480q0 33-23.5 56.5T720-240H360Zm0-80h360v-480H360v480ZM200-80q-33 0-56.5-23.5T120-160v-560h80v560h440v80H200Zm160-240v-480 480Z"/>
                            </svg>
                        </button>
                    </div>
                    <div id="copyStatus-${code}" class="copy-status"></div>
                    <div class="original-url" title="${originalUrl}">${truncateUrl(originalUrl, 60)}</div>
                    <div class="url-meta">
                        <span>建立時間：${formatDate(created)}</span>
                        ${hasPassword ? '<span><svg class="icon-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="#2885e2"><path d="M240-80q-33 0-56.5-23.5T160-160v-400q0-33 23.5-56.5T240-640h40v-80q0-83 58.5-141.5T480-920q83 0 141.5 58.5T680-720v80h40q33 0 56.5 23.5T800-560v400q0 33-23.5 56.5T720-80H240Zm0-80h480v-400H240v400Zm240-120q33 0 56.5-23.5T560-360q0-33-23.5-56.5T480-440q-33 0-56.5 23.5T400-360q0 33 23.5 56.5T480-280ZM360-640h240v-80q0-50-35-85t-85-35q-50 0-85 35t-35 85v80ZM240-160v-400 400Z"/></svg> 密碼保護</span>' : ''}
                        ${expiration ? `<span><svg class="icon-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="#d97706"><path d="m612-292 56-56-148-148v-184h-80v216l172 172ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-400Zm0 320q133 0 226.5-93.5T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160Z"/></svg> 過期：${formatDate(expiration)}</span>` : ''}
                        ${hasMetadata ? '<span><svg class="icon-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="#10b981"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm40-80h480L570-480 450-320l-90-120-120 160Zm-40 80v-560 560Z"/></svg> 社群媒體預覽</span>' : ''}
                    </div>
                </div>
                <div class="url-item-actions">
                    <button type="button" class="btn btn-small btn-danger" onclick="deleteUrl('${code}')" title="刪除">
                        <svg class="icon-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="#ffffff">
                            <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
        `;
    }).filter(Boolean).join('');

}


async function deleteUrl(code) {
    if (!confirm('確定要刪除這個短網址嗎？此操作無法復原。')) {
        return;
    }

    try {
        const response = await apiRequest(`/delete/${code}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            showSuccess('短網址已刪除');
            loadUrlList();
        } else {
            const data = await response.json();
            showError(data.error || '刪除失敗');
        }
    } catch (error) {
        showError('網路錯誤');
    }
}

function initRefreshButton() {
    refreshBtn.addEventListener('click', async function() {
        const originalHtml = refreshBtn.innerHTML;
        refreshBtn.disabled = true;
        refreshBtn.innerHTML = '<span class="loading"></span> 載入中...';
        try {
            await loadUrlList();
        } finally {
            refreshBtn.disabled = false;
            refreshBtn.innerHTML = originalHtml;
        }
    });
}

function setLoading(loading) {
    if (loading) {
        createBtn.disabled = true;
        createBtn.innerHTML = '<span class="loading"></span> 建立中...';
    } else {
        createBtn.disabled = false;
        createBtn.innerHTML = '建立短網址';
    }
}

function showSuccess(message) {
    const isCreateTab = document.getElementById('createTab').classList.contains('active');
    const successElement = isCreateTab ? alertSuccess : alertSuccess2;
    const successTextElement = isCreateTab ? alertSuccessText : alertSuccessText2;
    
    hideAlerts();
    
    successTextElement.textContent = message;
    
    requestAnimationFrame(() => {
        successElement.classList.add('show');
    });
    
    setTimeout(() => {
        successElement.classList.remove('show');
        setTimeout(() => {
            if (!successElement.classList.contains('show')) {
                successTextElement.textContent = '';
            }
        }, 400);
    }, 5000);
}

function showError(message) {
    const isCreateTab = document.getElementById('createTab').classList.contains('active');
    const errorElement = isCreateTab ? alertError : alertError2;
    const errorTextElement = isCreateTab ? alertErrorText : alertErrorText2;
    
    hideAlerts();
    
    errorTextElement.textContent = message;
    
    requestAnimationFrame(() => {
        errorElement.classList.add('show');
    });
    
    setTimeout(() => {
        errorElement.classList.remove('show');
        setTimeout(() => {
            if (!errorElement.classList.contains('show')) {
                errorTextElement.textContent = '';
            }
        }, 400); 
    }, 5000);
}

function hideAlerts() {
    alertSuccess.classList.remove('show');
    alertError.classList.remove('show');
    alertSuccess2.classList.remove('show');
    alertError2.classList.remove('show');
    
    setTimeout(() => {
        if (!alertSuccess.classList.contains('show')) {
            alertSuccessText.textContent = '';
        }
        if (!alertError.classList.contains('show')) {
            alertErrorText.textContent = '';
        }
        if (!alertSuccess2.classList.contains('show')) {
            alertSuccessText2.textContent = '';
        }
        if (!alertError2.classList.contains('show')) {
            alertErrorText2.textContent = '';
        }
    }, 400); 
}

function formatDate(dateString) {
    if (!dateString) return '未設定';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return '無效日期';
    
    // 如果日期字符串包含 +08:00，則直接使用；否則假設為 UTC 並轉換為台北時區
    let displayDate = date;
    if (!dateString.includes('+08:00') && !dateString.includes('+0800')) {
        // 假設為 UTC 時間，轉換為台北時區顯示
        displayDate = new Date(date.getTime() + (8 * 60 * 60 * 1000));
    }
    
    return displayDate.toLocaleString('zh-TW', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'Asia/Taipei'
    }) + ' (台北時間)';
}

function truncateUrl(url, maxLength) {
    if (!url || typeof url !== 'string') return '';
    if (url.length <= maxLength) return url;
    return url.substring(0, maxLength - 3) + '...';
}

window.copyToClipboard = copyToClipboard; 
window.copyUrlToClipboard = copyUrlToClipboard; 
window.deleteUrl = deleteUrl;