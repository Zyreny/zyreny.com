---
title: "Zyruls API"
description: "Zyruls 縮網址服務的 API 文檔"
lastEdited: 2025/9/30
---

# Zyruls API 文檔
這裡是 Zyruls 縮網址服務的 API 文檔，包含了所有可用的端點和使用說明，讓你可以輕鬆地將縮網址功能整合到你的應用程式或網站中。

## API 基本資訊
- **API 根網址** : `https://api.zyreny.com/zyruls`
- **端點** :
    - 建立 : `POST /create`
    - 列出 : `GET /list`
    - 刪除 : `DELETE /del/{code}`
- **請求格式** : JSON
- **回應格式**:  JSON
- **認證**: 目前不需要認證即可使用 API

## 端點文檔
- ### [建立短網址](api/create)
- ### [列出短網址](api/list)
- ### [刪除短網址](api/delete)

## 錯誤代碼
|代碼|說明|
|----|----|
|400|請求參數錯誤|
|403|沒有存取權限|
|404|找不到存取內容|
|409|自訂代碼已被使用|
|500|伺服器錯誤|
|503|服務暫時無法使用|