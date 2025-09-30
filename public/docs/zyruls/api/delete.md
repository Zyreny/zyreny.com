---
title: "刪除短網址"
description: "Zyruls 縮網址服務的 API 文檔 - 刪除短網址"
lastEdited: 2025/9/30
---

# 刪除短網址
使用 `DELETE /del/{code}` 端點可以用來刪除短網址。

## 路徑參數
|參數|類型|說明|
|----|----|----|
|code|string|必填，要刪除的短網址代碼|

## 回傳參數 (JSON)
|參數|類型|說明|
|----|----|----|
|success|boolean|是否成功|
|message|string|回應訊息|

回應範例 :
```json
{
    "success": true,
    "message": "短網址刪除成功"
}
```

## 錯誤代碼
|代碼|說明|
|----|----|
|404|找不到指定的短網址|
|403|沒有存取權限|
|500|伺服器錯誤|
|503|服務暫時無法使用|

錯誤回應範例 :
```json
{
    "success": false,
    "message": "找不到該短網址"
}
```

## 串接範例
### 1. curl
```bash
curl -X DELETE "https://api.zyreny.com/zyruls/del/custom_link"
```

### 2. JavaScript (Fetch API)
```javascript
fetch("https://api.zyreny.com/zyruls/del/custom_link", {
    method: "DELETE"
})
.then(res => res.json())
.then(data => console.log(data))
.catch(err => console.error("Error:", err));
```