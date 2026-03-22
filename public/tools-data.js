// Shared tool data — used by index.html and hub pages for search
// Maintain this file whenever a new tool is added to public/tools/
const SITE_TOOLS = [
  { name: 'Base64 Encode / Decode', href: 'tools/base64.html', tag: 'encode', icon: '📦', desc: 'Encode or decode text and files to Base64' },
  { name: 'JSON Formatter',               href: 'tools/json-formatter.html',          tag: 'format',      icon: '🧾', desc: 'Prettify, minify, validate JSON; convert to CSV or SQL' },
  { name: 'Password Generator',           href: 'tools/password-generator.html',      tag: 'generate',    icon: '🔑', desc: 'Generate strong random passwords locally' },
  { name: 'Timestamp Converter', href: 'tools/timestamp.html', tag: 'convert', icon: '⏱️', desc: 'Convert Unix timestamps to readable dates' },
  { name: 'URL Encode / Decode',          href: 'tools/url-encode.html',              tag: 'encode',      icon: '🔗', desc: 'Encode or decode URL parameters and components' },
  { name: 'UUID Generator', href: 'tools/uuid-generator.html', tag: 'generate', icon: '🆔', desc: 'Generate UUID v1/v4 identifiers in bulk' },
  { name: 'Word Counter', href: 'tools/word-counter.html', tag: 'text', icon: '🔢', desc: 'Count words, characters, and estimate reading time' },
  { name: 'Random Number Generator', href: 'tools/random-number-generator.html', tag: 'generate', icon: '🎲', desc: 'Generate random numbers, shuffle lists, roll dice' },
  { name: 'Unit Converter', href: 'tools/unit-converter.html', tag: 'convert', icon: '📐', desc: 'Convert length, weight, temperature, speed and more' },
  { name: 'Image Resizer', href: 'tools/image-resizer.html', tag: 'image', icon: '🖼️', desc: 'Resize images client-side with preset dimensions' },
  { name: 'Image Compressor', href: 'tools/image-compressor.html', tag: 'image', icon: '🗜️', desc: 'Reduce image file size with quality control' },
  { name: 'WebP Converter', href: 'tools/webp-converter.html', tag: 'image', icon: '🔄', desc: 'Convert images to WebP, PNG, or JPEG format' },
  { name: 'YouTube Thumbnail Downloader', href: 'tools/youtube-thumbnail.html', tag: 'image', icon: '📺', desc: 'Download YouTube video thumbnails in all resolutions' },
  { name: 'QR Code Generator',            href: 'tools/qr-code-generator.html',        tag: 'generate',    icon: '📷', desc: 'Create QR codes for URLs, WiFi, contacts, email' },
  { name: 'URL Slug Generator', href: 'tools/slug-generator.html', tag: 'text', icon: '🏷️', desc: 'Convert titles to clean SEO-friendly URL slugs' },
  { name: 'Lorem Ipsum Generator', href: 'tools/lorem-ipsum-generator.html', tag: 'text', icon: '📄', desc: 'Generate placeholder text in multiple themes' },
  { name: 'Color Picker', href: 'tools/color-picker.html', tag: 'convert', icon: '🎨', desc: 'Convert colors between HEX, RGB, HSL, and CMYK' },
  { name: 'Regex Tester', href: 'tools/regex-tester.html', tag: 'text', icon: '🔍', desc: 'Test regular expressions with live match highlighting' },
  { name: 'Markdown Preview', href: 'tools/markdown-preview.html', tag: 'text', icon: '👀', desc: 'Write Markdown and see a live rendered preview' },
  { name: 'Cron Expression Builder', href: 'tools/cron-builder.html', tag: 'generate', icon: '⏰', desc: 'Build cron expressions visually with descriptions' },
  { name: 'JWT Decoder / Inspector', href: 'tools/jwt-decoder.html', tag: 'encode', icon: '🔐', desc: 'Decode JWT header, payload, signature and inspect claims' },
  { name: 'HTML Entity Encode / Decode', href: 'tools/html-entities.html', tag: 'encode', icon: '🏷️', desc: 'Encode or decode HTML entities — named and numeric formats' },
  { name: 'Hash Generator', href: 'tools/hash-generator.html', tag: 'generate', icon: '#️⃣', desc: 'Generate MD5, SHA-1, SHA-256, SHA-512 from text or file' },
  { name: 'Date Calculator', href: 'tools/date-calculator.html', tag: 'calculator', icon: '📅', desc: 'Calculate date differences, business days, and exact age' },
  { name: 'BMI Calculator',               href: 'tools/bmi-calculator.html',           tag: 'calculator',  icon: '⚖️', desc: 'Calculate Body Mass Index with Metric or Imperial units' },
  { name: 'Loan Calculator',              href: 'tools/loan-calculator.html',          tag: 'calculator',  icon: '🏦', desc: 'Calculate monthly loan payments and amortization schedule' },
  { name: 'CSS Minifier', href: 'tools/css-minifier.html', tag: 'format', icon: '⚡', desc: 'Compress CSS by removing comments and whitespace' },
  { name: 'JS Minifier', href: 'tools/js-minifier.html', tag: 'format', icon: '⚡', desc: 'Compress JavaScript using Terser — mangle and minify' },
  { name: 'TOML ↔ JSON Converter', href: 'tools/toml-json.html', tag: 'convert', icon: '🔄', desc: 'Convert between TOML and JSON format instantly' },
  { name: 'JWT Builder / Generator', href: 'tools/jwt-builder.html', tag: 'encode', icon: '🔑', desc: 'Build and sign JWT tokens with HMAC (HS256/HS384/HS512)' },
  { name: 'Color Blindness Simulator', href: 'tools/color-blindness.html', tag: 'design', icon: '👁️', desc: 'Simulate protanopia, deuteranopia, tritanopia on any image' },
  { name: 'ASCII Table',                  href: 'tools/ascii-table.html',              tag: 'reference',   icon: '🔣', desc: 'Full ASCII 0-127 reference with Dec, Hex, Oct, Binary values' },
  { name: 'Text Cleaner',                 href: 'tools/text-cleaner.html',             tag: 'text',        icon: '🧹', desc: 'Remove extra spaces, blank lines, HTML tags and more' },
  { name: 'XML ↔ JSON Converter', href: 'tools/xml-json.html', tag: 'format', icon: '🔄', desc: 'Convert between XML and JSON format instantly' },
  { name: 'Number Formatter', href: 'tools/number-format.html', tag: 'convert', icon: '🔢', desc: 'Format numbers with separators, currency, and scientific notation' },
  { name: 'Port Reference', href: 'tools/port-reference.html', tag: 'reference', icon: '🔌', desc: 'Search common TCP/UDP port numbers by port or service name' },
  { name: 'MIME Types Reference', href: 'tools/mime-types.html', tag: 'reference', icon: '🏷️', desc: 'Find the correct Content-Type header for any file extension' },
  { name: 'Contrast Checker (WCAG)', href: 'tools/color-contrast-aa.html', tag: 'design', icon: '♿', desc: 'Test color pairs against WCAG AA/AAA accessibility standards' },
  { name: 'AES Encrypt / Decrypt', href: 'tools/aes.html', tag: 'encode', icon: '🔐', desc: 'Encrypt and decrypt text with AES-256-GCM — runs entirely in browser' },
  { name: 'Base32 Encoder / Decoder', href: 'tools/base32.html', tag: 'encode', icon: '🔡', desc: 'Encode or decode text using RFC 4648 Base32 alphabets' },
  { name: 'Base58 Encoder / Decoder', href: 'tools/base58.html', tag: 'encode', icon: '🔢', desc: 'Encode or decode Base58 strings for Bitcoin, IPFS and more' },
  { name: 'Bcrypt Hash Generator', href: 'tools/bcrypt.html', tag: 'encode', icon: '🔒', desc: 'Generate and verify bcrypt password hashes in browser' },
  { name: 'Binary to Text Converter', href: 'tools/binary-text.html', tag: 'encode', icon: '💾', desc: 'Convert text to binary and binary back to text' },
  { name: 'Blur Image', href: 'tools/blur-image.html', tag: 'image', icon: '🌫️', desc: 'Apply Gaussian blur effect to images locally' },
  { name: 'chmod Calculator', href: 'tools/chmod-calculator.html', tag: 'reference', icon: '🔐', desc: 'Calculate Unix file permissions and octal values visually' },
  { name: 'Color Format Converter', href: 'tools/color-converter.html', tag: 'design', icon: '🎨', desc: 'Convert colors between HEX, RGB, HSL, OKLCH formats' },
  { name: 'Color Palette Generator', href: 'tools/color-palette.html', tag: 'design', icon: '🎨', desc: 'Generate complementary, analogous and triadic color palettes' },
  { name: 'Compress Image to 100KB', href: 'tools/compress-to-100kb.html', tag: 'image', icon: '🎯', desc: 'Compress images to a specific target file size (100KB, 50KB…)' },
  { name: 'WCAG Contrast Checker', href: 'tools/contrast-checker.html', tag: 'design', icon: '♿', desc: 'Check WCAG AA and AAA color contrast ratios for accessibility' },
  { name: 'Countdown Timer', href: 'tools/countdown.html', tag: 'convert', icon: '⏱️', desc: 'Create countdown timers to any future date and time' },
  { name: 'CSS Formatter',               href: 'tools/css-formatter.html',             tag: 'format',      icon: '🧾', desc: 'Beautify or minify CSS code with customizable formatting' },
  { name: 'Text Diff Viewer',             href: 'tools/diff-viewer.html',              tag: 'text',        icon: '🔍', desc: 'Compare two texts and highlight differences line by line' },
  { name: 'CSS Gradient Generator', href: 'tools/gradient-generator.html', tag: 'design', icon: '🌈', desc: 'Build CSS linear and radial gradients with live preview' },
  { name: 'Grayscale Image Converter', href: 'tools/grayscale-image.html', tag: 'image', icon: '⬛', desc: 'Convert photos to grayscale or black and white in browser' },
  { name: 'HMAC Generator', href: 'tools/hmac.html', tag: 'encode', icon: '🔐', desc: 'Generate HMAC signatures with SHA-256, SHA-512 and more' },
  { name: 'HTML Formatter', href: 'tools/html-formatter.html', tag: 'format', icon: '🧾', desc: 'Beautify or minify HTML with customizable indentation' },
  { name: 'HTTP Status Codes Reference', href: 'tools/http-status.html', tag: 'reference', icon: '📡', desc: 'Complete reference of HTTP status codes with descriptions' },
  { name: 'Image Rotate & Flip', href: 'tools/image-rotate.html', tag: 'image', icon: '🔃', desc: 'Rotate or flip images 90°, 180°, 270° in browser' },
  { name: 'IP Address Lookup', href: 'tools/ip-lookup.html', tag: 'reference', icon: '🌐', desc: 'Look up IP address geolocation and network information' },
  { name: 'JPG to PNG Converter', href: 'tools/jpg-to-png.html', tag: 'image', icon: '🖼️', desc: 'Convert JPG/JPEG images to PNG format instantly' },
  { name: 'JS Formatter',                 href: 'tools/js-formatter.html',             tag: 'format',      icon: '🧾', desc: 'Beautify or minify JavaScript code with Prettier-style formatting' },
  { name: 'JSON to CSV Converter', href: 'tools/json-csv.html', tag: 'convert', icon: '🔄', desc: 'Convert JSON arrays to CSV and CSV back to JSON' },
  { name: 'JSONPath Tester',              href: 'tools/jsonpath-tester.html',          tag: 'format',      icon: '🔍', desc: 'Test JSONPath expressions against JSON data with live results' },
  { name: 'Line Tools',                   href: 'tools/line-tools.html',               tag: 'text',        icon: '📋', desc: 'Sort lines, remove duplicates, reverse order, strip blanks' },
  { name: 'Markdown to HTML', href: 'tools/markdown-to-html.html', tag: 'convert', icon: '📝', desc: 'Convert Markdown text to clean HTML code' },
  { name: 'Morse Code Translator', href: 'tools/morse-code.html', tag: 'encode', icon: '📡', desc: 'Encode text to Morse code or decode Morse back to text' },
  { name: 'Number Base Converter', href: 'tools/number-base.html', tag: 'convert', icon: '🔢', desc: 'Convert numbers between binary, octal, decimal and hex' },
  { name: 'PNG to JPG Converter', href: 'tools/png-to-jpg.html', tag: 'image', icon: '🔄', desc: 'Convert PNG images to JPG with adjustable quality' },
  { name: 'Remove EXIF Data', href: 'tools/remove-exif.html', tag: 'image', icon: '🛡️', desc: 'Strip GPS location and EXIF metadata from photos' },
  { name: 'Resize for Instagram', href: 'tools/resize-for-instagram.html', tag: 'image', icon: '📸', desc: 'Resize images to exact Instagram dimensions (feed, story, reel)' },
  { name: 'Roman Numeral Converter', href: 'tools/roman-numerals.html', tag: 'convert', icon: '🏛️', desc: 'Convert between Arabic numbers and Roman numerals' },
  { name: 'SQL Formatter',                href: 'tools/sql-formatter.html',            tag: 'format',      icon: '🗄️', desc: 'Format and beautify SQL queries for MySQL, PostgreSQL and more' },
  { name: 'String Escape / Unescape', href: 'tools/string-escape.html', tag: 'encode', icon: '✏️', desc: 'Escape or unescape strings for JSON, JavaScript and HTML' },
  { name: 'Text Case Converter', href: 'tools/text-case.html', tag: 'text', icon: '🔤', desc: 'Convert text between camelCase, snake_case, PascalCase and more' },
  { name: 'Timezone Converter', href: 'tools/timezone-converter.html', tag: 'convert', icon: '🌐', desc: 'Convert date and time between any two time zones' },
  { name: 'URL Builder', href: 'tools/url-builder.html', tag: 'encode', icon: '🔗', desc: 'Build URLs by composing scheme, host, path and query parameters' },
  { name: 'URL Parser', href: 'tools/url-parser.html', tag: 'encode', icon: '🔗', desc: 'Parse URLs into protocol, host, path, query and hash components' },
  { name: 'User Agent Parser', href: 'tools/user-agent.html', tag: 'reference', icon: '🌐', desc: 'Parse User Agent strings to identify browser, OS and device' },
  { name: 'WebP to JPG Converter', href: 'tools/webp-to-jpg.html', tag: 'image', icon: '🔄', desc: 'Convert WebP images to JPG or PNG format' },
  { name: 'XML Formatter', href: 'tools/xml-formatter.html', tag: 'format', icon: '🧾', desc: 'Beautify and validate XML with syntax highlighting' },
  { name: 'YAML to JSON Converter', href: 'tools/yaml-json.html', tag: 'convert', icon: '🔄', desc: 'Convert between YAML and JSON format instantly' },
  { name: 'Email Extractor', href: 'tools/email-extractor.html', tag: 'text', icon: '✉️', desc: 'Extract email addresses from pasted text, logs, or exports' },
  { name: 'URL Extractor', href: 'tools/url-extractor.html', tag: 'text', icon: '🔗', desc: 'Extract links from pasted text and normalize plain www URLs' },
  { name: 'Phone Number Extractor', href: 'tools/phone-extractor.html', tag: 'text', icon: '📞', desc: 'Extract phone numbers from text, notes, or lead lists' },
  { name: 'Duplicate Line Remover', href: 'tools/duplicate-line-remover.html', tag: 'text', icon: '??', desc: 'Remove repeated lines while keeping the first occurrence' },
  { name: 'Line Sorter', href: 'tools/line-sorter.html', tag: 'text', icon: '??', desc: 'Sort one-item-per-line text lists A-Z or Z-A with natural order' },
  { name: 'List Deduplicator', href: 'tools/list-deduplicator.html', tag: 'text', icon: '??', desc: 'Deduplicate comma, newline, tab, or semicolon separated lists' },
  { name: 'Whitespace Trimmer', href: 'tools/whitespace-trimmer.html', tag: 'text', icon: '??', desc: 'Trim spaces and tabs from each line and clean blank rows' },
  { name: 'Sentence Counter', href: 'tools/sentence-counter.html', tag: 'text', icon: '??', desc: 'Count sentences and estimate average words per sentence' },
  { name: 'Keyword Density Checker', href: 'tools/keyword-density-checker.html', tag: 'text', icon: '??', desc: 'Measure keyword frequency and density in pasted text' },
  { name: 'PNG to WebP Converter', href: 'tools/png-to-webp.html', tag: 'image', icon: '🔄', desc: 'Convert PNG images to smaller WebP files with adjustable quality' },
  { name: 'SVG to PNG Converter', href: 'tools/svg-to-png.html', tag: 'image', icon: '📐', desc: 'Convert SVG files to raster PNG images at 1x to 4x scale' },
  { name: 'BMP to PNG Converter', href: 'tools/bmp-to-png.html', tag: 'image', icon: '🗂️', desc: 'Convert BMP bitmap files into portable PNG images instantly' },
  { name: 'Crop Image', href: 'tools/crop-image.html', tag: 'image', icon: '✂️', desc: 'Crop photos and screenshots to an exact area with presets' },
  { name: 'Favicon Generator', href: 'tools/favicon-generator.html', tag: 'design', icon: '🔖', desc: 'Generate favicon PNG files in standard website icon sizes' },
  { name: 'Color Picker From Image', href: 'tools/color-picker-from-image.html', tag: 'design', icon: '🎨', desc: 'Pick HEX and RGB colors from uploaded images instantly' },
  { name: 'Merge Images', href: 'tools/merge-images.html', tag: 'image', icon: '🧩', desc: 'Combine multiple images into one vertical or horizontal layout' },
  { name: 'Image Palette Extractor', href: 'tools/image-palette-extractor.html', tag: 'image', icon: '🎨', desc: 'Extract a compact palette of dominant HEX colors from an image' },
  { name: 'Pixelate Image', href: 'tools/pixelate-image.html', tag: 'image', icon: '🟪', desc: 'Apply a mosaic-style pixelation effect with adjustable block size' },
  { name: 'Circle Crop Image', href: 'tools/circle-crop-image.html', tag: 'image', icon: '🟣', desc: 'Turn photos into circular avatar PNGs with adjustable size' },
  { name: 'Invert Image', href: 'tools/invert-image.html', tag: 'image', icon: '🔄', desc: 'Reverse image colors with adjustable inversion strength' },
  { name: 'Add Image Border', href: 'tools/add-image-border.html', tag: 'image', icon: '🖼️', desc: 'Add colored padding or a frame around any uploaded image' },
  { name: 'Rounded Corners Image', href: 'tools/rounded-corners-image.html', tag: 'image', icon: '🔲', desc: 'Round image corners and export a transparent PNG result' },
  { name: 'Posterize Image', href: 'tools/posterize-image.html', tag: 'image', icon: '🖍️', desc: 'Reduce color levels for a bold posterized image effect' },
  { name: 'Duotone Image', href: 'tools/duotone-image.html', tag: 'image', icon: '🌓', desc: 'Map image shadows and highlights to two custom colors' },
  { name: 'Image Brightness Contrast', href: 'tools/image-brightness-contrast.html', tag: 'image', icon: '☀️', desc: 'Adjust photo brightness and contrast with instant preview' },
];

const HUB_PAGE_CONFIG = {
  image: {
    sections: [
      ['webp-converter', 'jpg-to-png', 'png-to-jpg', 'webp-to-jpg', 'png-to-webp', 'svg-to-png', 'bmp-to-png'],
      ['image-resizer', 'image-compressor', 'compress-to-100kb', 'resize-for-instagram'],
      ['image-rotate', 'grayscale-image', 'blur-image', 'remove-exif', 'youtube-thumbnail', 'crop-image', 'pixelate-image'],
      ['merge-images', 'image-palette-extractor', 'circle-crop-image', 'invert-image', 'add-image-border', 'rounded-corners-image', 'posterize-image', 'duotone-image', 'image-brightness-contrast']
    ]
  },
  developer: {
    sections: [
      ['json-formatter', 'css-formatter', 'css-minifier', 'js-formatter', 'js-minifier', 'sql-formatter', 'html-formatter', 'xml-formatter'],
      ['base64', 'base32', 'base58', 'hash-generator', 'hmac', 'aes', 'bcrypt', 'jwt-decoder', 'jwt-builder', 'html-entities', 'string-escape', 'morse-code', 'binary-text'],
      ['yaml-json', 'toml-json', 'xml-json', 'json-csv', 'number-base', 'markdown-to-html', 'url-encode', 'url-parser'],
      ['password-generator', 'uuid-generator', 'qr-code-generator', 'cron-builder', 'random-number-generator', 'lorem-ipsum-generator'],
      ['regex-tester', 'jsonpath-tester', 'http-status', 'chmod-calculator', 'port-reference', 'mime-types', 'ip-lookup', 'user-agent', 'ascii-table', 'timestamp']
    ]
  },
  text: {
    sections: [
      ['word-counter', 'text-case', 'text-cleaner', 'line-tools', 'diff-viewer', 'regex-tester', 'markdown-preview', 'slug-generator', 'lorem-ipsum-generator', 'jsonpath-tester', 'string-escape', 'email-extractor', 'url-extractor', 'phone-extractor', 'duplicate-line-remover', 'line-sorter', 'list-deduplicator', 'whitespace-trimmer', 'sentence-counter', 'keyword-density-checker']
    ]
  }
};

function hubToolCount(key) {
  const config = HUB_PAGE_CONFIG[key];
  if (!config) return 0;
  return [...new Set(config.sections.flat())].length;
}

// Returns tools matching a given tag, with matching tools listed first.
// Usage: siteToolsByTag('image') — for hub pages to surface relevant tools first.
function siteToolsByTag(tag) {
  const match = SITE_TOOLS.filter(t => t.tag === tag);
  const rest  = SITE_TOOLS.filter(t => t.tag !== tag);
  return [...match, ...rest];
}
