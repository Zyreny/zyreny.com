---
title: "列出短網址"
description: "Zyruls 縮網址服務的 API 文檔 - 列出短網址"
lastEdited: 2025/9/30
---

# 列出短網址
你可以使用 `GET /list` 端點來取得與請求裝置於同一個 IP 所建立的短網址列表。

## 回傳參數 (JSON)
|參數|類型|說明|
|----|----|----|
|success|boolean|是否成功|
|urls[].code|string|短網址代碼|
|urls[].url|string|原始網址|
|urls[].createdAt|string|建立時間 (ISO 8601 格式)|
|urls[].hasPassword|boolean|是否有密碼保護|
|urls[].exp|string \| null|過期時間 (ISO 8601 格式)|
|urls[].meta.title|string \| null|自訂標題|
|urls[].meta.description|string \| null|自訂描述|
|urls[].meta.image|string \| null|縮圖網址|
|total|number|短網址總數|
> 備注：不會顯示已刪除或已過期的短網址

回應範例：
```json
{
    "success": true,
    "urls": [
        {
            "code": "home",
            "url": "https://zyreny.com/",
            "createdAt": "2025-09-28T15:02:40.712+08:00",
            "hasPassword": false,
            "exp": null,
            "meta": {
                "title": null,
                "description": null,
                "image": null
            }
        },
        {
            "code": "ZyrNT",
            "url": "https://chromewebstore.google.com/detail/zyrnt/ipeioiohfjiohgndlhoglhloipocenoj",
            "createdAt": "2025-09-20T15:40:47.830+08:00",
            "hasPassword": false,
            "exp": null,
            "meta": {
                "title": null,
                "description": null,
                "image": null
            }
        }
    ],
    "total": 2
}
```