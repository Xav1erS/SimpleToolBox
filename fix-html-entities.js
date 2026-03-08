const fs = require('fs');
const path = require('path');

function decodeHTMLEntities(text) {
    return text
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&amp;/g, '&')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/&nbsp;/g, ' ');
}

function processFile(filePath) {
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        const decodedContent = decodeHTMLEntities(content);
        
        if (content !== decodedContent) {
            fs.writeFileSync(filePath, decodedContent, 'utf8');
            console.log(`Fixed: ${filePath}`);
            return true;
        }
        return false;
    } catch (error) {
        console.error(`Error processing ${filePath}:`, error.message);
        return false;
    }
}

function walkDirectory(dir) {
    let fixedCount = 0;
    const files = fs.readdirSync(dir);
    
    for (const file of files) {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        
        if (stat.isDirectory()) {
            fixedCount += walkDirectory(filePath);
        } else if (file.endsWith('.html') || file.endsWith('.js')) {
            if (processFile(filePath)) {
                fixedCount++;
            }
        }
    }
    
    return fixedCount;
}

const publicDir = path.join(__dirname, 'public');
const fixedCount = walkDirectory(publicDir);
console.log(`\nTotal files fixed: ${fixedCount}`);
