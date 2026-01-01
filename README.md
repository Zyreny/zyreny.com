# 新年快樂！

# 🌟 Zyreny 個人網站

> 一個現代化的個人作品集網站，使用 React 19 + TypeScript + Vite + SSG 建構

[![React](https://img.shields.io/badge/React-19.1.1-61dafb?style=flat-square&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-3178c6?style=flat-square&logo=typescript)](https://typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-7.1.2-646cff?style=flat-square&logo=vite)](https://vitejs.dev/)
[![vite-react-ssg](https://img.shields.io/badge/SSG-vite--react--ssg-00d8ff?style=flat-square)](https://github.com/antfu/vite-react-ssg)

## 🚀 專案特色

### ✨ 現代化技術棧
- **React 19** - 最新的 React 版本，支援最新特性
- **TypeScript** - 完整的類型安全支援
- **Vite** - 極速的開發體驗
- **vite-react-ssg** - 靜態站點生成，SEO 友善
- **React Router v6** - 現代化的路由管理

### 🎨 用戶體驗
- **響應式設計** - 完美適配桌面端、平板和手機
- **深色主題** - 現代化的視覺設計
- **打字動畫** - 終端風格的 404 頁面
- **動態主題** - 每個頁面可自訂背景色彩
- **快速載入** - SSG 預渲染提供極速載入體驗

### 🔧 開發體驗
- **自動路由生成** - 基於檔案系統的路由
- **CSS Modules** - 組件級樣式隔離
- **ESLint** - 程式碼品質保證
- **熱重載** - 開發時即時更新

## 🚀 技術棧

| 分類 | 技術 | 版本 | 用途 |
|------|------|------|------|
| **前端框架** | React | 19.1.1 | UI 組件庫 |
| **路由** | React Router | 6.30.1 | 客戶端路由 |
| **建構工具** | Vite | 7.1.2 | 開發與建構 |
| **SSG** | vite-react-ssg | 0.8.8 | 靜態站點生成 |
| **語言** | TypeScript | 5.8.3 | 類型安全 |
| **樣式** | CSS Modules | - | 樣式隔離 |
| **程式碼品質** | ESLint | 9.33.0 | 程式碼檢查 |

## 🚀 快速開始

### 📋 環境需求

- **Node.js** >= 18.0.0
- **npm** >= 8.0.0

### 📥 安裝與運行

1. **Clone 專案**
   ```bash
   git clone https://github.com/Zyreny/zyreny.com.git
   cd zyreny.com/rebuild/zyreny.com
   ```

2. **安裝依賴**
   ```bash
   npm install
   ```

3. **啟動開發伺服器**
   ```bash
   npm run dev
   ```
   
   🌐 開啟瀏覽器訪問 `http://localhost:5173`

### 📦 建構與部署

```bash
# 建構靜態網站
npm run build

# 預覽建構結果
npm run preview

# 程式碼檢查
npm run lint
```

## 🎯 頁面功能

### 🏠 首頁 (`/`)
- 個人介紹和技能展示
- 最新專案預覽
- 響應式設計

### 📁 專案頁 (`/projects`)
- 專案作品集展示
- 專案詳細資訊
- 技術標籤

### 🚫 404 頁面
- 終端風格設計
- 打字動畫效果
- 自動路徑檢測

## ⚡ 核心特性

### 🔄 自動路由生成
使用 `routes.tsx` 基於檔案系統自動生成路由：
```typescript
// routes.tsx - 自動掃描 pages 目錄
const modules = import.meta.glob('./pages/**/!(*.module).{tsx,jsx}', { eager: true })
```

### 🎨 動態主題系統
每個頁面可以自訂背景顏色：
```typescript
// 使用 SEO 組件設定頁面主題
<SEO
  title="404 - 找不到頁面"
  bodyBg="#1a1a1a"
  navBg="#2a2a2a"
  footerBg="#333333"
/>
```

### 📊 SEO 最佳化
- 每頁獨立的 meta 標籤
- Open Graph 支援
- 靜態站點生成 (SSG)

## 🔧 開發指令

```bash
# 🚀 開發模式 (熱重載)
npm run dev

# 🏗️ 建構生產版本
npm run build

# 👀 預覽建構結果
npm run preview

# 🔍 程式碼檢查
npm run lint
```

## 🎨 自訂化

### 🎯 添加新頁面
1. 在 `src/pages/` 目錄下建立新的 `.tsx` 檔案
2. 路由會自動生成
3. 使用 `SEO` 組件設定 meta 資訊

### 🌈 修改主題
編輯 `src/assets/css/main.css` 中的 CSS 變數：
```css
:root {
  --primary-color: #2885e2;
  --bg-color: #0a0a0a;
  --text-color: #ffffff;
}
```

## 🤝 貢獻指南

歡迎提交 Issue 和 Pull Request！

1. **Fork** 此專案
2. 建立功能分支 (`git checkout -b feature/amazing-feature`)
3. 提交變更 (`git commit -m 'Add amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 開啟 **Pull Request**

## 📄 開源授權

本專案採用 [MIT License](LICENSE) 授權條款

## 📞 聯絡方式

<div align="center">

**Zyreny** - 專注於網頁開發的國中生開發者

[![GitHub](https://img.shields.io/badge/GitHub-Zyreny-181717?style=flat-square&logo=github)](https://github.com/Zyreny)
[![Website](https://img.shields.io/badge/Website-zyreny.com-2885e2?style=flat-square&logo=firefox)](https://zyreny.com)
[![Email](https://img.shields.io/badge/Email-hi@zyreny.com-181717?style=flat-square&logo=gmail)](mailto:hi@zyreny.com)
[![Discord](https://img.shields.io/badge/Discord-Zyreny_Studio-5865F2?style=flat-square&logo=discord)](https://discord.gg/XdedtvmPZ6)
[![Instagram](https://img.shields.io/badge/Instagram-zyrenyy-E4405F?style=flat-square&logo=instagram)](https://www.instagram.com/zyrenyy)
[![Threads](https://img.shields.io/badge/Threads-@zyrenyy-000000?style=flat-square&logo=threads)](https://www.threads.net/@zyrenyy)
[![Medium](https://img.shields.io/badge/Medium-Zyreny-000000?style=flat-square&logo=medium)](https://zyreny.medium.com/)
[![X](https://img.shields.io/badge/X-@zyrenyy-1DA1F2?style=flat-square&logo=x)](https://x.com/zyrenyy)

---

⭐ **如果這個專案對您有幫助，請給個 Star！**

*`這份文檔由 Claude 生成，詳細資訊可能有誤`*

</div>
