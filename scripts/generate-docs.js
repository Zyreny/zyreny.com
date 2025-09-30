import fs from 'fs';
import path from 'path';

function generateDocsStructure(docsDir) {
    function scanDirectory(dir, relativePath = '') {
        const result = {};
        const items = fs.readdirSync(dir);

        for (const item of items) {
            const fullPath = path.join(dir, item);
            const stat = fs.statSync(fullPath);

            if (stat.isDirectory()) {
                // 遞歸處理子目錄
                const subResult = scanDirectory(fullPath, relativePath ? `${relativePath}/${item}` : item);
                if (Object.keys(subResult).length > 0) {
                    result[item] = subResult;
                }
            } else if (item.endsWith('.md')) {
                const fileName = item.replace('.md', '');

                if (fileName === 'index') {
                    result.index = relativePath ? `${relativePath}/${item}` : item;
                } else {
                    result[fileName] = relativePath ? `${relativePath}/${item}` : item;
                }
            }
        }

        return result;
    }

    const structure = {};
    const topLevelItems = fs.readdirSync(docsDir);

    for (const item of topLevelItems) {
        const fullPath = path.join(docsDir, item);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            const subResult = scanDirectory(fullPath);
            if (Object.keys(subResult).length > 0) {
                structure[item] = subResult;
            }
        }
    }

    return structure;
}

// 如果直接執行此腳本
if (import.meta.url === `file://${process.argv[1]}`) {
    const publicDocsDir = path.join(process.cwd(), 'public', 'docs');
    const outputFile = path.join(process.cwd(), 'src', 'data', 'docs.json');

    // 確保輸出目錄存在
    const outputDir = path.dirname(outputFile);
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    const structure = generateDocsStructure(publicDocsDir);

    fs.writeFileSync(outputFile, JSON.stringify(structure, null, 4), 'utf-8');
    console.log(`✅ 已生成文檔結構：${outputFile}`);
}