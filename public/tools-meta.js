/**
 * tools-meta.js
 * Rich metadata for each tool — used for validation, future SEO tooling,
 * and as the single source of truth for tool content.
 *
 * This file is NOT loaded by tool pages directly.
 * It is used by scripts/validate-tools.py and future metadata-driven workflows.
 *
 * @typedef {Object} ToolMeta
 * @property {string}   slug          - matches the HTML filename without .html
 * @property {string}   title         - full display title
 * @property {string}   description   - 120-160 char SEO meta description
 * @property {string}   category      - matches tag in tools-data.js
 * @property {string[]} relatedTools  - slugs of 3 related tools
 * @property {Array<{q:string,a:string}>} faq - at least 3 FAQ items
 * @property {string[]} [useCases]    - 2+ use-case phrases
 * @property {{input:string,output:string}} [example] - representative example
 */

const TOOLS_META = [
  {
    slug: 'base64',
    title: 'Base64 Encoder / Decoder',
    description: 'Encode text or files to Base64 and decode Base64 strings instantly. Supports URL-safe Base64 and binary file encoding. Runs entirely in your browser.',
    category: 'encode',
    relatedTools: ['url-encode', 'hash-generator', 'aes'],
    useCases: [
      'Embed images in HTML/CSS as data URIs',
      'Encode binary data for JSON or email transmission',
      'Decode Base64-encoded API responses',
      'Encode configuration files for environment variables',
    ],
    example: {
      input: 'Hello, World!',
      output: 'SGVsbG8sIFdvcmxkIQ==',
    },
    faq: [
      { q: 'Is Base64 the same as encryption?', a: 'No. Base64 is encoding, not encryption. Anyone can decode it without a key. Use AES or similar for actual security.' },
      { q: 'What is URL-safe Base64?', a: 'URL-safe Base64 replaces + with - and / with _ so the encoded string can be used in URLs without percent-encoding.' },
      { q: 'Does this tool support file encoding?', a: 'Yes. Switch to the File tab to encode binary files like images, PDFs, or executables to Base64.' },
      { q: 'Is my data sent to a server?', a: 'No. All encoding and decoding runs entirely in your browser using JavaScript. Nothing is uploaded.' },
    ],
  },
  {
    slug: 'json-formatter',
    title: 'JSON Formatter',
    description: 'Prettify, minify, and validate JSON online. Convert JSON to CSV, SQL INSERT statements, or CSV back to JSON. 100% browser-side.',
    category: 'format',
    relatedTools: ['yaml-json', 'xml-formatter', 'toml-json'],
    useCases: [
      'Prettify minified API responses for debugging',
      'Validate JSON before committing to a config file',
      'Convert a JSON array to SQL INSERT statements',
      'Transform JSON data to CSV for spreadsheet import',
    ],
    example: {
      input: '{"name":"Alice","age":30}',
      output: '{\n  "name": "Alice",\n  "age": 30\n}',
    },
    faq: [
      { q: 'What JSON standards does this support?', a: 'Standard JSON (RFC 8259). JSONC (with comments) is not supported. Remove comments before pasting.' },
      { q: 'How do I convert JSON to CSV?', a: 'Paste a JSON array of objects into the input, then click the "JSON → CSV" tab. Each key becomes a column.' },
      { q: 'Is there a size limit?', a: 'No hard limit, but very large files (>10 MB) may slow down your browser. For large data, consider a dedicated CLI tool.' },
    ],
  },
  {
    slug: 'password-generator',
    title: 'Password Generator',
    description: 'Generate strong random passwords locally. Choose length, character sets, and quantity. No passwords are transmitted to any server.',
    category: 'generate',
    relatedTools: ['hash-generator', 'uuid-generator', 'bcrypt'],
    useCases: [
      'Create a strong master password for a password manager',
      'Generate temporary passwords for new user accounts',
      'Produce random API keys or secrets',
    ],
    example: {
      input: '16 chars, uppercase + lowercase + digits + symbols',
      output: 'Example: P@k#9mXv2rL!dQeA',
    },
    faq: [
      { q: 'Is this truly random?', a: 'Yes. The generator uses the browser\'s Crypto.getRandomValues() API, which is cryptographically secure.' },
      { q: 'Are generated passwords stored?', a: 'No. Passwords are generated entirely in-browser and never sent to any server.' },
      { q: 'What is a good password length?', a: 'NIST recommends at least 12–16 characters. For high-value accounts, 20+ characters is better.' },
    ],
  },
  {
    slug: 'url-encode',
    title: 'URL Encoder / Decoder',
    description: 'Encode or decode URL parameters and components online. Supports percent-encoding, full URL encoding, and component encoding. Works with Unicode and Chinese characters.',
    category: 'encode',
    relatedTools: ['base64', 'url-builder', 'url-parser'],
    useCases: [
      'Encode query string parameters before appending to a URL',
      'Decode percent-encoded URLs from log files',
      'Fix double-encoded URLs',
    ],
    example: {
      input: 'hello world & more=yes',
      output: 'hello%20world%20%26%20more%3Dyes',
    },
    faq: [
      { q: 'What is the difference between encodeURI and encodeURIComponent?', a: 'encodeURI encodes a complete URL, leaving :, /, ?, # intact. encodeURIComponent encodes everything except letters, digits, and - _ . ! ~ * \' ( ).' },
      { q: 'Why is a space encoded as %20 or +?', a: '%20 is the standard percent-encoding. + is used in application/x-www-form-urlencoded (HTML form POST). This tool uses %20 by default.' },
      { q: 'Can I decode a full URL at once?', a: 'Yes. Paste the full URL and click Decode to decode all percent-encoded sequences at once.' },
    ],
  },
  {
    slug: 'hash-generator',
    title: 'Hash Generator',
    description: 'Generate MD5, SHA-1, SHA-256, and SHA-512 cryptographic hashes from text or file. All algorithms run simultaneously in your browser via Web Crypto API.',
    category: 'generate',
    relatedTools: ['bcrypt', 'hmac', 'password-generator'],
    useCases: [
      'Verify file integrity by comparing checksums',
      'Hash passwords before storing (use bcrypt for production)',
      'Generate a fingerprint for deduplication',
    ],
    example: {
      input: 'Hello',
      output: 'SHA-256: 185f8db32921bd46d35cc2470d0f5fb1f86d65bd61fe11a76fa31bdc56b5bb24',
    },
    faq: [
      { q: 'Is MD5 still safe to use?', a: 'Not for security purposes. MD5 is broken for collision resistance. Use SHA-256 or SHA-512 for integrity checks, and bcrypt/argon2 for passwords.' },
      { q: 'Can I hash a file?', a: 'Yes. Switch to the File tab, drop your file, and all four algorithms will compute the hash instantly.' },
      { q: 'Is my file uploaded?', a: 'No. File hashing uses the browser\'s FileReader and Web Crypto APIs. Nothing leaves your device.' },
    ],
  },
  {
    slug: 'word-counter',
    title: 'Word Counter',
    description: 'Count words, characters, sentences, and paragraphs. Get reading time estimates and keyword density. Works entirely in your browser.',
    category: 'text',
    relatedTools: ['text-case', 'text-cleaner', 'diff-viewer'],
    useCases: [
      'Check word count for blog posts or essays',
      'Estimate reading time for content',
      'Count characters for social media posts',
    ],
    example: {
      input: 'The quick brown fox jumps over the lazy dog.',
      output: '9 words · 44 chars · 1 sentence · ~1 sec read',
    },
    faq: [
      { q: 'How is reading time calculated?', a: 'Based on an average adult reading speed of 200 words per minute.' },
      { q: 'Does it count HTML tags?', a: 'If you paste raw HTML, the tags will be counted as words. Paste plain text only for accurate counts.' },
    ],
  },
  {
    slug: 'uuid-generator',
    title: 'UUID Generator',
    description: 'Generate UUID v1 (time-based) and v4 (random) identifiers in bulk. Copy individually or all at once. Runs entirely in your browser.',
    category: 'generate',
    relatedTools: ['password-generator', 'random-number-generator', 'base58'],
    useCases: [
      'Generate primary keys for database records',
      'Create correlation IDs for distributed system logging',
      'Generate unique identifiers for test data',
    ],
    example: {
      input: 'v4, qty: 1',
      output: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
    },
    faq: [
      { q: 'What is the difference between UUID v1 and v4?', a: 'v1 is time-based and includes the MAC address of the generating machine. v4 is completely random. v4 is preferred for privacy.' },
      { q: 'Are generated UUIDs unique?', a: 'UUID v4 has 122 bits of randomness, making collisions statistically negligible for all practical purposes.' },
      { q: 'Can I generate UUIDs in bulk?', a: 'Yes. Use the quantity slider to generate up to 100 UUIDs at once, then copy all with one click.' },
    ],
  },
  {
    slug: 'timestamp',
    title: 'Timestamp Converter',
    description: 'Convert Unix timestamps to human-readable dates and vice versa. Supports seconds and milliseconds. Shows current timestamp live.',
    category: 'convert',
    relatedTools: ['date-calculator', 'timezone-converter', 'countdown'],
    useCases: [
      'Convert API timestamps to readable dates',
      'Get the current Unix timestamp for logging',
      'Convert a date to a timestamp for database queries',
    ],
    example: {
      input: '1000000000',
      output: 'Sun Sep 09 2001 01:46:40 UTC',
    },
    faq: [
      { q: 'What is a Unix timestamp?', a: 'The number of seconds (or milliseconds) elapsed since January 1, 1970 00:00:00 UTC (the Unix epoch).' },
      { q: 'Does this handle millisecond timestamps?', a: 'Yes. The tool auto-detects whether the input is seconds (10 digits) or milliseconds (13 digits).' },
      { q: 'Is the displayed date in my local timezone?', a: 'Yes. The tool shows both local time and UTC time for each converted timestamp.' },
    ],
  },
  {
    slug: 'markdown-preview',
    title: 'Markdown Preview',
    description: 'Write Markdown in the editor and see a live rendered HTML preview. Supports GFM tables, task lists, and fenced code blocks.',
    category: 'text',
    relatedTools: ['markdown-to-html', 'html-formatter', 'diff-viewer'],
    useCases: [
      'Preview README files before committing to GitHub',
      'Write and preview blog posts in Markdown',
      'Check table rendering in documentation',
    ],
    example: {
      input: '# Hello\n\n**Bold** and _italic_ text.',
      output: '<h1>Hello</h1><p><strong>Bold</strong> and <em>italic</em> text.</p>',
    },
    faq: [
      { q: 'Does it support GitHub Flavored Markdown (GFM)?', a: 'Yes. Tables, task lists (- [x]), fenced code blocks with syntax info, and strikethrough are all supported.' },
      { q: 'Can I export the rendered HTML?', a: 'Yes. Use the "Copy HTML" button to copy the rendered HTML source to your clipboard.' },
    ],
  },
  {
    slug: 'color-picker',
    title: 'Color Picker',
    description: 'Pick colors visually and convert between HEX, RGB, HSL, and CMYK. Copy any format with one click. No sign-up required.',
    category: 'convert',
    relatedTools: ['color-converter', 'color-palette', 'contrast-checker'],
    useCases: [
      'Pick a brand color and get its HEX code for CSS',
      'Convert a design HEX color to RGB for JavaScript',
      'Find HSL values for color manipulation in code',
    ],
    example: {
      input: '#FF5733',
      output: 'RGB(255, 87, 51) · HSL(11°, 100%, 60%) · CMYK(0%, 66%, 80%, 0%)',
    },
    faq: [
      { q: 'What color formats are supported?', a: 'HEX, RGB, RGBA, HSL, HSLA, and CMYK. Click any format field to copy its value.' },
      { q: 'Can I use the eyedropper to pick colors from my screen?', a: 'On browsers that support the EyeDropper API (Chrome 95+), yes. Click the eyedropper icon to pick from anywhere on screen.' },
    ],
  },
];

// Export for Node.js (validation scripts)
if (typeof module !== 'undefined') module.exports = { TOOLS_META };
