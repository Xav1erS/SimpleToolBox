
const fs = require('fs');
const path = require('path');

const toolsDir = path.join(__dirname, 'public', 'tools');

// 需要更新的工具页面
const toolPages = [
    'index.html',
    'image-background-remover/index.html',
    'random-number-generator/index.html',
    'pdf-to-word-converter/index.html',
    'youtube-thumbnail-downloader/index.html',
    'word-counter-tool/index.html',
    'password-generator/index.html',
    'unit-converter/index.html',
    'json-formatter-tool/index.html',
    'image-resizer-online/index.html'
];

console.log('Starting to update tool pages...\n');

toolPages.forEach((relativePath) => {
    const fullPath = path.join(toolsDir, relativePath);
    
    if (!fs.existsSync(fullPath)) {
        console.log(`❌ Skipping ${relativePath} - file not found`);
        return;
    }
    
    try {
        let content = fs.readFileSync(fullPath, 'utf8');
        let modified = false;
        
        // 检查是否已经有 pageLoaded 监听器
        if (content.includes('pageLoaded')) {
            console.log(`✅ ${relativePath} already has pageLoaded listener`);
            return;
        }
        
        // 查找 DOMContentLoaded 监听器并添加 pageLoaded 监听器
        const domContentLoadedPattern = /document\.addEventListener\(['"]DOMContentLoaded['"],\s*(\(\s*\)\s*=>|function\s*\(\s*\))\s*\{/;
        
        if (domContentLoadedPattern.test(content)) {
            // 查找是否有初始化函数
            let hasInitFunction = false;
            let initFunctionName = 'init';
            
            // 检查常见的初始化函数名
            const initFunctionPatterns = [
                /function\s+initToolPage\s*\(/,
                /function\s+init\s*\(/,
                /const\s+init\s*=\s*function/,
                /let\s+init\s*=\s*function/,
                /const\s+init\s*=\s*\(/,
                /let\s+init\s*=\s*\(/
            ];
            
            for (const pattern of initFunctionPatterns) {
                if (pattern.test(content)) {
                    hasInitFunction = true;
                    if (pattern.source.includes('initToolPage')) {
                        initFunctionName = 'initToolPage';
                    }
                    break;
                }
            }
            
            // 如果有 init 函数，添加 pageLoaded 监听器来调用它
            if (hasInitFunction) {
                const pageLoadedListener = `
        // 监听pageLoaded事件（SPA导航）
        document.addEventListener('pageLoaded', function(event) {
            console.log('pageLoaded event received on ${relativePath}:', event.detail);
            if (typeof ${initFunctionName} === 'function') {
                ${initFunctionName}();
            }
        });
`;
                
                // 在 DOMContentLoaded 监听器之后添加
                const domContentLoadedEndPattern = /document\.addEventListener\(['"]DOMContentLoaded['"][^}]*\}[^}]*\};\s*$/m;
                
                if (domContentLoadedEndPattern.test(content)) {
                    // 查找脚本结束标签之前添加
                    const scriptEndPattern = /<\/script>\s*(?=<\/body>|$)/;
                    if (scriptEndPattern.test(content)) {
                        content = content.replace(scriptEndPattern, pageLoadedListener + '\n    </script>');
                        modified = true;
                    }
                }
            } else {
                // 如果没有明确的 init 函数，我们需要把 DOMContentLoaded 的代码提取出来
                console.log(`⚠️  ${relativePath} - No clear init function found, needs manual check`);
            }
        }
        
        if (modified) {
            fs.writeFileSync(fullPath, content, 'utf8');
            console.log(`✅ Updated ${relativePath}`);
        } else {
            console.log(`ℹ️  ${relativePath} - No changes needed or requires manual update`);
        }
        
    } catch (error) {
        console.log(`❌ Error processing ${relativePath}:`, error.message);
    }
});

console.log('\nDone!');
