import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * 自動生成 index.ts 檔案的工具
 * 掃描指定資料夾中的組件並生成對應的 export 語句
 */

// 配置設定
const config = {
    // 需要生成 index.ts 的資料夾
    directories: [
        {
            path: "./src/components",
            outputFile: "./src/components/index.ts",
        },
        {
            path: "./src/layout",
            outputFile: "./src/layout/index.ts",
        }, 
    ],
    // 支援的檔案副檔名
    supportedExtensions: [".ts", ".tsx", ".js", ".jsx"],
    // 排除的檔案
    excludeFiles: ["index.ts", "index.js", ".d.ts"],
    // 排除的資料夾
    excludeDirs: ["node_modules", ".git", "dist", "build"],
};

// 檢查檔案是否應該被包含
function shouldIncludeFile(fileName, isDirectory) {
    if (isDirectory) {
        return (
            !config.excludeDirs.includes(fileName) && !fileName.startsWith(".")
        );
    }

    // 檢查是否為排除的檔案
    if (config.excludeFiles.some((exclude) => fileName.includes(exclude))) {
        return false;
    }

    // 檢查副檔名
    return config.supportedExtensions.some((ext) => fileName.endsWith(ext));
}

// 從檔案路徑獲取組件名稱
function getComponentName(fileName) {
    // 移除副檔名
    const nameWithoutExt = fileName.replace(/\.(ts|tsx|js|jsx)$/, "");

    // 將 kebab-case 或 snake_case 轉換為 PascalCase
    return nameWithoutExt
        .split(/[-_]/)
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join("");
}

// 掃描資料夾並獲取所有組件
function scanDirectory(dirPath, basePath = "") {
    const components = [];

    try {
        const items = fs.readdirSync(dirPath);

        for (const item of items) {
            const fullPath = path.join(dirPath, item);
            const stats = fs.statSync(fullPath);

            if (stats.isDirectory()) {
                if (shouldIncludeFile(item, true)) {
                    // 遞迴掃描子資料夾
                    const subComponents = scanDirectory(
                        fullPath,
                        path.join(basePath, item)
                    );
                    components.push(...subComponents);
                }
            } else if (shouldIncludeFile(item, false)) {
                const componentName = getComponentName(item);
                const relativePath = basePath
                    ? `./${basePath}/${item}`
                    : `./${item}`;

                components.push({
                    name: componentName,
                    path: relativePath.replace(/\.(ts|tsx|js|jsx)$/, ""),
                    originalFileName: item,
                });
            }
        }
    } catch (error) {
        console.warn(`無法讀取資料夾 ${dirPath}:`, error.message);
    }

    return components;
}

// 生成 export 語句
function generateExports(components) {
    if (components.length === 0) {
        return "// 目前沒有可匯出的組件\n";
    }

    const exports = components.map((component) => {
        // 檢查是否為預設匯出 (通常組件名稱與檔案名稱相同)
        const fileNameWithoutExt = component.originalFileName.replace(
            /\.(ts|tsx|js|jsx)$/,
            ""
        );
        const isDefaultExport =
            component.name === getComponentName(fileNameWithoutExt);

        if (isDefaultExport) {
            return `export { default as ${component.name} } from '${component.path}';`;
        } else {
            return `export { ${component.name} } from '${component.path}';`;
        }
    });

    // 按字母順序排序
    exports.sort();

    return exports.join("\n") + "\n";
}

// 生成檔案頭部註解
function generateHeader() {
    const timestamp = new Date().toLocaleString("zh-TW");
    return `/**
 * 自動生成的 index.ts 檔案
 * 生成時間(UTC+8): ${timestamp}
 * 
 * 此檔案由 scripts/generate-index.js 自動生成
 * 請勿手動修改，執行 npm run generate-index 重新生成
 */

`;
}

// 寫入 index.ts 檔案
function writeIndexFile(outputPath, content) {
    try {
        // 確保輸出目錄存在
        const dir = path.dirname(outputPath);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        const fullContent = generateHeader() + content;
        fs.writeFileSync(outputPath, fullContent, "utf8");
        console.log(`✅ 已生成: ${outputPath}`);
    } catch (error) {
        console.error(`❌ 無法寫入檔案 ${outputPath}:`, error.message);
    }
}

// 主函數
function generateIndexFiles() {
    console.log("🚀 開始生成 index.ts 檔案...\n");

    for (const dir of config.directories) {
        console.log(`📁 掃描資料夾: ${dir.path}`);

        if (!fs.existsSync(dir.path)) {
            console.warn(`⚠️  資料夾不存在: ${dir.path}`);
            continue;
        }

        const components = scanDirectory(dir.path);
        console.log(`   找到 ${components.length} 個組件`);

        if (components.length > 0) {
            components.forEach((comp) => {
                console.log(`   - ${comp.name} (${comp.originalFileName})`);
            });
        }

        const exportContent = generateExports(components);
        writeIndexFile(dir.outputFile, exportContent);
        console.log("");
    }

    console.log("✨ 所有 index.ts 檔案生成完成！");
}

// 執行腳本
if (import.meta.url === `file://${process.argv[1]}`) {
    generateIndexFiles();
}

export { generateIndexFiles, config };