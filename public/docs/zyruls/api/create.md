---
title: "建立短網址"
description: "Zyruls 縮網址服務的 API 文檔 - 建立短網址"
lastEdited: 2025/9/30
---

# 建立短網址 
你可以使用 `POST /create` 端點來建立一個新的短網址，以下是這個 API 的詳細說明。

## 請求參數 (JSON)
|參數|類型|說明|
|----|----|----|
|url|string|必填，要縮短的原始網址|
|custom|string|自訂代碼，若有指定自訂代碼則短網址格式為 zye.me/{custom} (限定 3-20 字符、大小寫英文、下底線和連字號)|
|password|string|密碼保護|
|exp|string|過期時間 (ISO 8601 格式)|
|meta.title|string|自訂標題 (最多 100 字符)|
|meta.description|string|自訂描述 (最多 300 字符)|
|meta.image|string|縮圖網址|
> 備注 : 只有 `url` 是必填參數。

請求範例 :
```json
{
    "url": "https://example.zyreny.com/your/long/url",
    "custom": "custom_link",
    "password": "secret123",
    "exp": "2025-12-31T23:59:59Z",
    "meta": {
        "title": "Zyruls 縮網址",
        "description": "Zyruls 是一個用來縮短網址的工具，把原本非常多字的連結縮短成大約 10 個字符，甚至更少！",
        "image": "https://zyreny.com/og_img.png"
    }
}
```

## 回傳參數 (JSON)
|參數|類型|說明|
|----|----|----|
|success|boolean|是否成功|
|message|string|回應訊息|
|data.shortUrl|string|生成出來的短網址|
|data.code|string|短網址的代碼|
|data.originalUrl|string|原始網址|
|data.createdAt|string|建立時間 (ISO 8601 格式)|
|data.hasPassword|boolean|是否有密碼保護|
|data.exp|string \| null|過期時間 (ISO 8601 格式)|
|data.meta.title|string \| null|自訂標題|
|data.meta.description|string \| null|自訂描述|
|data.meta.image|string \| null|縮圖網址|
> 備注 : 需要操作成功才會回傳 `data` 物件。
> 
回應範例 :
```json
{
    "success": true,
    "message": "短網址建立成功",
    "data": {
        "shortUrl": "https://zye.me/custom_link",
        "code": "custom_link",
        "originalUrl": "https://example.zyreny.com/your/long/url",
        "createdAt": "2025-09-28T12:34:56Z",
        "hasPassword": true,
        "exp": "2025-12-31T23:59:59Z",
        "meta": {
            "title": "Zyruls 縮網址",
            "description": "Zyruls 是一個用來縮短網址的工具，把原本非常多字的連結縮短成大約 10 個字符，甚至更少！",
            "image": "https://zyreny.com/og_img.png"
        }
    }
}
```

## 錯誤代碼
|代碼|說明|
|----|----|
|400|請求參數錯誤 (如缺少必填參數、參數格式錯誤等)|
|403|沒有存取權限|
|409|自訂代碼已被使用|
|500|伺服器內部錯誤|
|503|服務暫時無法使用|

錯誤回應範例 :
```json
{
    "success": false,
    "message": "自訂代碼 \"custom_link\" 已被使用"
}
```

## 串接範例
### 1. curl
```bash
curl -X POST h`ttps://api.zyreny.com/create \
-H "Content-Type: application/json" \
-d "{
    "url": "https://example.zyreny.com/your/long/url",
    "custom": "custom_link",
    "password": "secret123",
    "exp": "2025-12-31T23:59:59Z",
    "meta": {
        "title": "Zyruls 縮網址",
        "description": "Zyruls 是一個用來縮短網址的工具，把原本非常多字的連結縮短成大約 10 個字符，甚至更少！",
        "image": "https://zyreny.com/og_img.png"
    }
}"
```
### 2. JavaScript (Fetch API)
```javascript
fetch("https://api.zyreny.com/create", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        url: "https://example.zyreny.com/your/long/url",
        custom: "custom_link",
        password: "secret123",
        exp: "2025-12-31T23:59:59Z",
        meta: {
            title: "Zyruls 縮網址",
            description: "Zyruls 是一個用來縮短網址的工具，把原本非常多字的連結縮短成大約 10 個字符，甚至更少！",
            image: "https://zyreny.com/og_img.png"
        }
    })
});
.then(res => res.json())
.then(data => console.log(data))
.catch(err => console.error("Error:", err));
```