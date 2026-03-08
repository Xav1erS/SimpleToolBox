
const fs = require('fs');
const path = require('path');

const toolsDir = path.join(__dirname, 'public', 'tools');

// 需要更新的工具页面
const toolPages = [
    'random-number-generator/index.html',
    'pdf-to-word-converter/index.html',
    'youtube-thumbnail-downloader/index.html',
    'word-counter-tool/index.html',
    'password-generator/index.html',
    'json-formatter-tool/index.html',
    'image-resizer-online/index.html'
];

console.log('Starting quick fix for tool pages...\n');

toolPages.forEach((relativePath) => {
    const fullPath = path.join(toolsDir, relativePath);
    
    if (!fs.existsSync(fullPath)) {
        console.log(`❌ Skipping ${relativePath} - file not found`);
        return;
    }
    
    try {
        let content = fs.readFileSync(fullPath, 'utf8');
        
        // 检查是否已经有 pageLoaded 监听器
        if (content.includes('pageLoaded')) {
            console.log(`✅ ${relativePath} already has pageLoaded listener`);
            return;
        }
        
        // 查找脚本结束标签
        const scriptEndPattern = /\s*<\/script>\s*(?=\s*<script[^>]*src=|\s*<\/body>)/;
        
        if (scriptEndPattern.test(content)) {
            const pageLoadedCode = `
        // 监听pageLoaded事件（SPA导航）
        document.addEventListener('pageLoaded', function(event) {
            console.log('pageLoaded event received on ${relativePath}:', event.detail);
            // 如果页面有init函数，调用它
            if (typeof init === 'function') {
                init();
            }
            if (typeof initToolPage === 'function') {
                initToolPage();
            }
        });
`;
            
            content = content.replace(scriptEndPattern, pageLoadedCode + '\n    </script>');
            fs.writeFileSync(fullPath, content, 'utf8');
            console.log(`✅ Added pageLoaded listener to ${relativePath}`);
        } else {
            console.log(`⚠️  Could not find script end in ${relativePath}`);
        }
        
    } catch (error) {
        console.log(`❌ Error processing ${relativePath}:`, error.message);
    }
});

console.log('\nDone!');
