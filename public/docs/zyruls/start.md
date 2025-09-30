---
title: "快速開始"
description: "Zyruls 縮網址服務的快速開始指南"
lastEdited: 2025/9/30
---

# 快速開始
快速使用 Zyruls 縮網址服務來建立你的短網址，這份文檔會介紹如何使用我的網站介面來建立短網址，還有如何使用 API 來把這項服務整合到你自己的應用程式中。
如果想要深入了解更多功能和設定的話，你可以參考其他的文檔。

## 使用方式
你可以透過以下方式來使用 Zyruls 縮網址服務 :
### 1. 我的網站
直接前往 [Zyruls 縮網址](https://zyreny.com/zyruls) 的頁面，就可以使用現有的視覺化見面來建立短網址。
### 2. API
底下的 [串接 API](#串接-api) 會介紹如何使用 API 來建立短網址，這樣你就可以把縮網址服務整合到你自己的應用程式或網站中。

## 串接 API
Zyruls API 的根網址是 `api.zyreny.com/zyruls` 。這裡會介紹怎麼用 JavaScript 來串接 API 達成**建立**、**列出**和**刪除**短網址， API 的詳細說明可以到 [API 文檔](api) 查看。

### 1. 建立短網址
請求 : `POST /create`

串接範例 :
```javascript
async function createUrl(
    originalUrl,
    customCode = null,
    password = null,
    exp = null,
    title = null,
    desc = null,
    image = null
) {
    const res = await fetch("https://api.zyreny.com/zyruls/create", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
        url: originalUrl,
        custom: customCode,
        password: password,
        exp: exp,
        meta: {
            title: title,
            description: desc,
            image: image
        }})
    });

    const data = await res.json();
    if (res.success) {
    return data;
    } else {
    throw new Error(data.message);
    }
}

// 使用範例
createUrl(
    "https://example.zyreny.com/your/long/url",
    "custom_link",
    "secret123",
    "2025-12-31T23:59:59Z",
    "Zyruls 縮網址",
    "Zyruls 是一個用來縮短網址的工具，把原本非常多字的連結縮短成大約 10 個字符，甚至更少！",
    "https://zyreny.com/og_img.png"
)
.then(data => console.log(data))
.catch(err => console.error(err));
```
> 備注 : 回傳參數或詳細資訊可以看 [Zyruls API 建立短網址文檔](api/create) 。

### 2. 列出短網址
請求 : `GET /list`

串接範例 :
```javascript
async function listUrls() {
    const res = await fetch("https://api.zyreny.com/zyruls/list", {
        headers: {
            "Content-Type": "application/json"
        }
    });

    const data = await res.json();
    if (res.success) {
        return data;
    } else {
        throw new Error(data.message);
    }
}

// 使用範例
listUrls()
.then(data => console.log(data))
.catch(err => console.error(err));
```
> 備注 : 回傳參數或詳細資訊可以看 [Zyruls API 列出短網址文檔](api/list) 。

### 3. 刪除短網址
請求 : `DELETE /delete`

串接範例 :
```javascript
async function deleteUrl(code) {
    const res = await fetch(`https://api.zyreny.com/zyruls/del/${code}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    });

    const data = await res.json();
    if (res.success) {
        return data;
    } else {
        throw new Error(data.message);
    }
}

// 使用範例
deleteUrl("custom_link")
.then(data => console.log(data))
.catch(err => console.error(err));
```
> 備注 : 回傳參數或詳細資訊可以看 [Zyruls API 刪除短網址文檔](api/delete) 。