/**
 * tools-meta.js
 * Rich metadata for each tool — used for validation, future SEO tooling,
 * and as the single source of truth for tool content.
 *
 * This file is NOT loaded by tool pages directly.
 * It is used by validation scripts and future metadata-driven workflows.
 */

const TOOLS_META = [
  {
      slug: "base64",
      title: "Base64 Encoder / Decoder",
      description: "Encode text or files to Base64 and decode Base64 strings instantly. Supports URL-safe Base64 and binary file encoding. Runs entirely in your browser.",
      category: "encode",
      relatedTools: [
        "url-encode",
        "hash-generator",
        "aes"
      ],
      useCases: [
        "Embed images in HTML/CSS as data URIs",
        "Encode binary data for JSON or email transmission",
        "Decode Base64-encoded API responses",
        "Encode configuration files for environment variables"
      ],
      example: {
        input: "Hello, World!",
        output: "SGVsbG8sIFdvcmxkIQ=="
      },
      faq: [
        {
          q: "Is Base64 the same as encryption?",
          a: "No. Base64 is encoding, not encryption. Anyone can decode it without a key. Use AES or similar for actual security."
        },
        {
          q: "What is URL-safe Base64?",
          a: "URL-safe Base64 replaces + with - and / with _ so the encoded string can be used in URLs without percent-encoding."
        },
        {
          q: "Does this tool support file encoding?",
          a: "Yes. Switch to the File tab to encode binary files like images, PDFs, or executables to Base64."
        },
        {
          q: "Is my data sent to a server?",
          a: "No. All encoding and decoding runs entirely in your browser using JavaScript. Nothing is uploaded."
        }
      ],
      shortTitle: "Base64 Encoder / Decoder",
      seoContent: {
        whatIsTitle: "What is Base64?",
        whatIsBody: "Base64 is a text encoding scheme that turns binary or plain text data into ASCII characters. It is often used for email payloads, data URLs, API tokens, and transporting binary content through text-only systems.",
        howToTitle: "How to Use Base64 Encoder / Decoder",
        howToSteps: [
          "Paste text into the input area or switch to the file mode.",
          "Choose encode or decode depending on your task.",
          "Use URL-safe mode when the result must work inside URLs or JWT-like payloads.",
          "Copy the output when the conversion looks correct."
        ]
      },
      learnMore: {
        title: "Understand Base64",
        whyUseTitle: "Why Use This Tool",
        whyUseItems: [
          "Useful for data URLs, API payloads, binary transport, and quick decoding checks.",
          "Supports both plain text and file-based encoding workflows.",
          "Runs fully in the browser with no uploads or server processing."
        ]
      }
    },
  {
      slug: "json-formatter",
      title: "JSON Formatter",
      description: "Prettify, minify, and validate JSON online. Convert JSON to CSV, SQL INSERT statements, or CSV back to JSON. 100% browser-side.",
      category: "format",
      relatedTools: [
        "yaml-json",
        "xml-formatter",
        "toml-json"
      ],
      useCases: [
        "Prettify minified API responses for debugging",
        "Validate JSON before committing to a config file",
        "Convert a JSON array to SQL INSERT statements",
        "Transform JSON data to CSV for spreadsheet import"
      ],
      example: {
        input: "{\"name\":\"Alice\",\"age\":30}",
        output: "{\n  \"name\": \"Alice\",\n  \"age\": 30\n}"
      },
      faq: [
        {
          q: "What JSON standards does this support?",
          a: "Standard JSON (RFC 8259). JSONC (with comments) is not supported. Remove comments before pasting."
        },
        {
          q: "How do I convert JSON to CSV?",
          a: "Paste a JSON array of objects into the input, then click the \"JSON → CSV\" tab. Each key becomes a column."
        },
        {
          q: "Is there a size limit?",
          a: "No hard limit, but very large files (>10 MB) may slow down your browser. For large data, consider a dedicated CLI tool."
        },
        {
          q: "Is this JSON Formatter free?",
          a: "Yes. The tool is completely free with no sign-up required. Everything runs in your browser — no data is ever sent to a server."
        }
      ]
    },
  {
      slug: "password-generator",
      title: "Password Generator",
      description: "Generate strong random passwords locally. Choose length, character sets, and quantity. No passwords are transmitted to any server.",
      category: "generate",
      relatedTools: [
        "hash-generator",
        "uuid-generator",
        "bcrypt"
      ],
      useCases: [
        "Create a strong master password for a password manager",
        "Generate temporary passwords for new user accounts",
        "Produce random API keys or secrets"
      ],
      example: {
        input: "16 chars, uppercase + lowercase + digits + symbols",
        output: "Example: P@k#9mXv2rL!dQeA"
      },
      faq: [
        {
          q: "Is this truly random?",
          a: "Yes. The generator uses the browser's Crypto.getRandomValues() API, which is cryptographically secure."
        },
        {
          q: "Are generated passwords stored?",
          a: "No. Passwords are generated entirely in-browser and never sent to any server."
        },
        {
          q: "What is a good password length?",
          a: "NIST recommends at least 12–16 characters. For high-value accounts, 20+ characters is better."
        },
        {
          q: "Is this password generator secure?",
          a: "Yes. Passwords are generated using crypto.getRandomValues() — the W3C-standard cryptographically secure pseudorandom number generator (CSPRNG) built into every modern browser. This is the same source of randomness used by password managers and security applications."
        }
      ]
    },
  {
      slug: "timestamp",
      title: "Timestamp Converter",
      description: "Convert Unix timestamps to human-readable dates and vice versa. Supports seconds and milliseconds. Shows current timestamp live.",
      category: "convert",
      shortTitle: "Timestamp Converter",
      relatedTools: [
        "timezone-converter",
        "date-calculator",
        "cron-builder"
      ],
      useCases: [
        "Convert API timestamps to readable dates",
        "Get the current Unix timestamp for logging",
        "Convert a date to a timestamp for database queries"
      ],
      example: {
        input: "1000000000",
        output: "Sun Sep 09 2001 01:46:40 UTC"
      },
      faq: [
        {
          q: "What is a Unix timestamp?",
          a: "The number of seconds (or milliseconds) elapsed since January 1, 1970 00:00:00 UTC (the Unix epoch)."
        },
        {
          q: "Does this handle millisecond timestamps?",
          a: "Yes. The tool auto-detects whether the input is seconds (10 digits) or milliseconds (13 digits)."
        },
        {
          q: "Is the displayed date in my local timezone?",
          a: "Yes. The tool shows both local time and UTC time for each converted timestamp."
        },
        {
          q: "How do I tell seconds and milliseconds apart?",
          a: "A 10-digit timestamp is in seconds (standard Unix time). A 13-digit timestamp is in milliseconds (used by JavaScript's Date.now() and many APIs). To convert: divide milliseconds by 1000 to get seconds, or multiply seconds by 1000 to get milliseconds."
        }
      ],
      seoContent: {
        whatIsTitle: "What is a Unix Timestamp?",
        whatIsBody: "A Unix timestamp is the number of seconds or milliseconds since January 1, 1970 00:00:00 UTC. It gives software systems a single timezone-independent way to store and compare moments in time.",
        howToTitle: "How to Use the Timestamp Converter",
        howToSteps: [
          "Paste a Unix timestamp to convert it into readable UTC and local dates.",
          "Enter a date and time to convert it back into a timestamp.",
          "Use the live clock section when you need the current timestamp immediately.",
          "Copy the exact format you need for logs, APIs, or databases."
        ]
      },
      learnMore: {
        title: "Understand Unix Timestamps (examples, use cases & FAQs)",
        whyUseTitle: "Why Use This Timestamp Converter",
        whyUseItems: [
          "Converts in both directions between timestamps and human-readable dates.",
          "Shows UTC and local-time output side by side for fewer timezone mistakes.",
          "Helps with API debugging, log review, cron checks, and JWT expiry checks.",
          "Includes a live current timestamp so you always have a quick reference."
        ]
      }
    },
  {
      slug: "url-encode",
      title: "URL Encoder / Decoder",
      description: "Encode or decode URL parameters and components online. Supports percent-encoding, full URL encoding, and component encoding. Works with Unicode and Chinese characters.",
      category: "encode",
      relatedTools: [
        "base64",
        "url-builder",
        "url-parser"
      ],
      useCases: [
        "Encode query string parameters before appending to a URL",
        "Decode percent-encoded URLs from log files",
        "Fix double-encoded URLs"
      ],
      example: {
        input: "hello world & more=yes",
        output: "hello%20world%20%26%20more%3Dyes"
      },
      faq: [
        {
          q: "What is the difference between encodeURI and encodeURIComponent?",
          a: "encodeURI is for whole URLs and leaves separators like :, /, ?, and # intact. encodeURIComponent is for individual parts such as query values and encodes far more characters."
        },
        {
          q: "Why is a space encoded as %20 or +?",
          a: "%20 is standard percent-encoding. + is mainly used by application/x-www-form-urlencoded form submissions. This tool outputs %20 by default."
        },
        {
          q: "Can I decode a full URL at once?",
          a: "Yes. Paste the full URL and decode it to inspect all percent-encoded parts at once."
        },
        {
          q: "What is application/x-www-form-urlencoded?",
          a: "It is the encoding format used by HTML form submissions, where spaces may be represented as +. For general URL components, %20 is the safer standard form."
        }
      ],
      shortTitle: "URL Encoder / Decoder",
      seoContent: {
        whatIsTitle: "What is URL Encoding?",
        whatIsBody: "URL encoding converts reserved or unsafe characters into percent-encoded sequences so they can be transmitted safely inside URLs. It is commonly used for query strings, path segments, redirects, and parameters that include spaces or special characters.",
        howToTitle: "How to Use URL Encoder / Decoder",
        howToSteps: [
          "Paste the URL string or parameter you want to transform.",
          "Choose encode when preparing a string for use in a URL, or decode when inspecting percent-encoded text.",
          "Use the result in query strings, redirects, API requests, or debugging work.",
          "Copy the transformed value into your target app or request."
        ]
      },
      learnMore: {
        title: "Understand URL Encoder / Decoder",
        whyUseTitle: "Why Use This Tool",
        whyUseItems: [
          "Prevents broken URLs caused by spaces and reserved characters.",
          "Useful for debugging redirects, query strings, and encoded API payloads.",
          "Lets you quickly compare raw and encoded values in the browser."
        ]
      }
    },
  {
      slug: "uuid-generator",
      title: "UUID Generator",
      description: "Generate UUID v1 (time-based) and v4 (random) identifiers in bulk. Copy individually or all at once. Runs entirely in your browser.",
      category: "generate",
      relatedTools: [
        "password-generator",
        "random-number-generator",
        "base58"
      ],
      useCases: [
        "Generate primary keys for database records",
        "Create correlation IDs for distributed system logging",
        "Generate unique identifiers for test data"
      ],
      example: {
        input: "v4, \"qty\": 1",
        output: "f47ac10b-58cc-4372-a567-0e02b2c3d479"
      },
      faq: [
        {
          q: "What is the difference between UUID v1 and v4?",
          a: "v1 is time-based and includes the MAC address of the generating machine. v4 is completely random. v4 is preferred for privacy."
        },
        {
          q: "Are generated UUIDs unique?",
          a: "UUID v4 has 122 bits of randomness, making collisions statistically negligible for all practical purposes."
        },
        {
          q: "Can I generate UUIDs in bulk?",
          a: "Yes. Use the quantity slider to generate up to 100 UUIDs at once, then copy all with one click."
        },
        {
          q: "v1",
          a: "v1 is time-based: it encodes the current timestamp and the machine's MAC address, making it sortable by creation time but potentially revealing system information. v4 is purely random and the recommended default for most applications."
        }
      ]
    },
  {
      slug: "word-counter",
      title: "Word Counter",
      description: "Count words, characters, sentences, and paragraphs. Get reading time estimates and keyword density. Works entirely in your browser.",
      category: "text",
      shortTitle: "Word Counter",
      relatedTools: [
        "lorem-ipsum-generator",
        "markdown-preview",
        "text-cleaner"
      ],
      useCases: [
        "Check word count for blog posts or essays",
        "Estimate reading time for content",
        "Count characters for social media posts"
      ],
      example: {
        input: "The quick brown fox jumps over the lazy dog.",
        output: "9 words · 44 chars · 1 sentence · ~1 sec read"
      },
      faq: [
        {
          q: "How is reading time calculated?",
          a: "Based on an average adult reading speed of 200 words per minute."
        },
        {
          q: "Does it count HTML tags?",
          a: "If you paste raw HTML, the tags will be counted as words. Paste plain text only for accurate counts."
        },
        {
          q: "Why does it use 200 words per minute?",
          a: "Reading time is estimated by dividing the total word count by 200 words per minute ? the widely cited average adult reading speed for on-screen text. The result is rounded up to the nearest half-minute. Dense or technical content may take longer; casual prose may be read faster."
        },
        {
          q: "How are words counted?",
          a: "Words are counted by splitting the text on whitespace and filtering out empty segments. Hyphenated words like \"well-known\" are counted as one word. Numbers and punctuation attached to words are counted as part of the word token."
        }
      ],
      seoContent: {
        whatIsTitle: "What is a Word Counter?",
        whatIsBody: "A word counter measures text length and related writing stats such as words, characters, sentences, paragraphs, and reading time. It helps writers, editors, students, and marketers stay within content limits and understand text density quickly.",
        howToTitle: "How to Use the Word Counter",
        howToSteps: [
          "Paste or type text into the editor.",
          "Review the live word, character, sentence, and paragraph metrics.",
          "Check reading time and platform-specific length indicators if needed.",
          "Edit your copy until it matches the target length."
        ]
      },
      learnMore: {
        title: "Understand Word & Character Counting (examples, use cases & FAQs)",
        whyUseTitle: "Why Use This Word Counter",
        whyUseItems: [
          "Updates live as you type, with no manual recalculate step.",
          "Useful for essays, blogs, product copy, and social media limits.",
          "Shows multiple writing metrics in one place instead of separate tools."
        ]
      }
    },
  {
      slug: "random-number-generator",
      title: "Random Number Generator Online – Free & Customizable",
      description: "Generate random numbers, shuffle lists, and roll dice online. Supports custom ranges, unique numbers, decimals, list randomizer, dice simulator, and coin flip. Free, browser-based.",
      category: "generate",
      shortTitle: "Random Number Generator",
      relatedTools: [
        "uuid-generator",
        "password-generator",
        "unit-converter"
      ],
      useCases: [
        "Pick a winner from a list of entries by generating a random index",
        "Generate lottery or raffle numbers with no repeats",
        "Roll dice for tabletop RPGs (D&D, Pathfinder) without physical dice",
        "Create randomized test data ranges for software development",
        "Flip a coin to make a quick decision"
      ],
      faq: [
        {
          q: "Is this truly random or pseudo-random?",
          a: "This tool uses crypto.getRandomValues() , which is a cryptographically secure pseudo-random number generator (CSPRNG) seeded from OS-level entropy. For all practical purposes it is indistinguishable from True randomness and is suitable for security-sensitive tasks."
        },
        {
          q: "Can I generate the same number twice in list mode?",
          a: "No. List mode generates a set of unique numbers — each value appears at most once. If you need duplicates allowed, use the single-number mode multiple times."
        },
        {
          q: "What is the maximum range I can use?",
          a: "The minimum and maximum values can be any integers within JavaScript's safe integer range (±2 53 ). For list mode, the count must be less than or equal to the size of the range."
        },
        {
          q: "What does Random Number Generator Online – Free & Customizable do?",
          a: "Random Number Generator Online – Free & Customizable runs entirely in your browser and helps you complete this task without uploading data to a server."
        }
      ],
      example: {
        input: "Numbers mode — Min: 1, Max: 100 → Result: 42",
        output: "List mode — Min: 1, Max: 49, Count: 6 → Result: 3, 17, 22, 35, 41, 48 (6 unique lottery numbers)"
      },
      seoContent: {
        whatIsTitle: "What is a Random Number Generator?",
        whatIsBody: "A random number generator produces values that cannot be predicted in advance. This tool uses the browser's crypto API for secure randomness and supports single numbers, unique lists, dice rolls, and coin flips.",
        howToTitle: "How to Use the Random Number Generator",
        howToSteps: [
          "Use Numbers mode to choose a minimum, maximum, and output count.",
          "Switch to List mode to shuffle entries or pick a random subset.",
          "Open Dice & Coin mode to roll common dice types or flip coins.",
          "Copy the result you need directly from the output panel."
        ]
      },
      learnMore: {
        title: "Understand Random Numbers (examples, use cases & FAQs)",
        whyUseTitle: "Why Use This Random Number Generator",
        whyUseItems: [
          "Uses crypto.getRandomValues() instead of predictable Math.random() output.",
          "Combines single-number, list, dice, and coin workflows in one page.",
          "Can generate duplicate-free ranges for raffles, sampling, and test data.",
          "Runs entirely in the browser, so nothing is logged or uploaded."
        ]
      }
    },
  {
      slug: "unit-converter",
      title: "Unit Converter Online – Length, Weight, Temperature & More",
      description: "Free online unit converter for length, weight, temperature, area, volume, speed, and more. Fast, accurate conversions with no sign-up required. Runs entirely in your browser.",
      category: "convert",
      shortTitle: "Unit Converter",
      relatedTools: [
        "timestamp",
        "random-number-generator",
        "image-resizer"
      ],
      useCases: [
        "Convert recipe measurements between metric and imperial (cups ↔ mL, oz ↔ g)",
        "Calculate distances when traveling between countries using different systems",
        "Convert file sizes between bytes, KB, MB, and GB for storage planning",
        "Check temperature for travel or HVAC settings (°F ↔ °C)",
        "Convert speed limits from mph to km/h for driving abroad"
      ],
      faq: [
        {
          q: "How accurate are the conversions?",
          a: "Conversions use standard SI-defined ratios and are accurate to JavaScript's floating-point precision (15–17 significant digits). For most practical purposes, results are exact. Temperature conversions use the official formulas: °C = (°F − 32) × 5/9, K = °C + 273.15."
        },
        {
          q: "What unit categories are supported?",
          a: "Length, weight/mass, temperature, area, volume, speed, and digital storage. More categories may be added over time."
        },
        {
          q: "Can I convert between metric and imperial units?",
          a: "Yes. All categories include both metric (SI) and imperial/US customary units. For example, the length converter includes meters, centimeters, kilometers, inches, feet, yards, and miles simultaneously."
        },
        {
          q: "What does Unit Converter Online – Length, Weight, Temperature & More do?",
          a: "Unit Converter Online – Length, Weight, Temperature & More runs entirely in your browser and helps you complete this task without uploading data to a server."
        }
      ],
      example: {
        input: "Temperature: 100°F → 37.78°C / 310.93 K",
        output: "Length: 5 miles → 8.047 km / 26,400 feet"
      },
      seoContent: {
        whatIsTitle: "What is a Unit Converter?",
        whatIsBody: "A unit converter turns a measurement in one unit into equivalent values in other units from the same category. It is useful for everyday conversions across metric, imperial, temperature, speed, area, volume, and data storage systems.",
        howToTitle: "How to Use the Unit Converter",
        howToSteps: [
          "Pick a category such as length, temperature, speed, or data storage.",
          "Type a value into any one of the available unit fields.",
          "Read the converted values in the rest of the fields instantly.",
          "Copy the number you need for travel, reports, recipes, or engineering work."
        ]
      },
      learnMore: {
        title: "Understand Unit Conversion (examples, use cases & FAQs)",
        whyUseTitle: "Why Use This Unit Converter",
        whyUseItems: [
          "Handles multiple categories in one place instead of switching tools.",
          "Updates every related unit at once, which makes comparisons faster.",
          "Useful for metric-versus-imperial work, travel, HVAC, cooking, and storage planning.",
          "Runs locally in the browser with no uploads or server calls."
        ]
      }
    },
  {
      slug: "image-resizer",
      title: "Image Resizer Online Free – Resize Images Without Uploading",
      description: "Resize images online for free. Set custom dimensions, lock aspect ratio, convert formats (JPG, PNG, WebP), adjust quality, and use social media presets. Privacy-first, browser-based.",
      category: "image",
      relatedTools: [
        "youtube-thumbnail",
        "color-picker",
        "unit-converter"
      ],
      useCases: [
        "Downscale high-resolution photos for use on websites and blogs",
        "Resize images to meet social media platform dimension requirements",
        "Reduce file size of email attachments without changing format",
        "Create thumbnail versions of product photos for e-commerce listings"
      ],
      faq: [
        {
          q: "Will resizing reduce image quality?",
          a: "Downscaling (making an image smaller) has minimal visual impact at moderate quality settings. Upscaling (enlarging) will reduce sharpness because the extra pixels are interpolated — there is no new detail to add. Use a quality setting of 80–90% for JPEG to get a good balance of size and clarity."
        },
        {
          q: "What image formats can I upload?",
          a: "You can upload JPEG, PNG, WebP, GIF, and most other formats supported by your browser. The output can be saved as JPEG, PNG, or WebP."
        },
        {
          q: "Is there a maximum file size?",
          a: "There is no enforced limit — processing happens in your browser. Very large images (50+ MB) may be slow to process depending on your device's memory. For most photos and graphics, resizing is instant."
        },
        {
          q: "What does Image Resizer Online Free – Resize Images Without Uploading do?",
          a: "Image Resizer Online Free – Resize Images Without Uploading runs entirely in your browser and helps you complete this task without uploading data to a server."
        }
      ],
      example: {
        input: "Upload a 4000×3000 DSLR photo and resize for web publishing:",
        output: "For social media, use platform-specific presets: Twitter/X header (1500×500), LinkedIn post (1200×627), Instagram square (1080×1080)."
      }
    },
  {
      slug: "image-compressor",
      title: "Image Compressor Online Free – Reduce Image File Size",
      description: "Compress JPEG, PNG, and WebP images online for free. Reduce file size with quality control, see before/after file size instantly. Privacy-first — runs entirely in your browser, no uploads.",
      category: "image",
      relatedTools: [
        "image-resizer",
        "webp-converter",
        "base64"
      ],
      useCases: [
        "Quickly complete common image compressor online free – reduce image file size tasks in the browser",
        "Verify image compressor online free – reduce image file size results without installing desktop software"
      ],
      faq: [
        {
          q: "Is the image uploaded to a server?",
          a: "No. All compression happens entirely in your browser using the HTML5 Canvas API. Your images never leave your device."
        },
        {
          q: "What quality setting should I use?",
          a: "For most web images, 75–85% quality strikes the best balance between file size and visual fidelity. For thumbnails or previews, 60–70% is acceptable. Below 50% visible artifacts may appear in photographs."
        },
        {
          q: "Why does PNG output have no quality effect?",
          a: "PNG is a lossless format — quality does not apply. For significant size reduction, switch to JPEG or WebP, which are lossy formats."
        },
        {
          q: "Can I compress multiple images at once?",
          a: "This tool processes one image at a time. For batch compression you would need a desktop application such as ImageOptim or Squoosh CLI."
        }
      ],
      example: {
        input: "Upload a PNG screenshot (3 MB) and compress to JPEG at 85% quality:",
        output: "Drag the quality slider to find the sweet spot between file size and visual clarity. The preview updates instantly."
      }
    },
  {
      slug: "webp-converter",
      title: "WebP Converter Online Free – Convert Images to WebP, PNG, JPEG",
      description: "Convert images to WebP, PNG, or JPEG online for free. Drag and drop any image, choose output format and quality, download instantly. Privacy-first — runs entirely in your browser.",
      category: "image",
      relatedTools: [
        "image-compressor",
        "image-resizer",
        "base64"
      ],
      useCases: [
        "Convert JPEG photos and PNG graphics to WebP for faster web pages",
        "Convert WebP images to JPEG or PNG for compatibility with older software",
        "Convert GIF or BMP images to a modern web-friendly format",
        "Reduce image payload for better Core Web Vitals (LCP) scores",
        "Prepare images for upload to platforms that require specific formats"
      ],
      faq: [
        {
          q: "Does WebP support transparency (alpha channel)?",
          a: "Yes. WebP supports both lossy and lossless compression with transparency. Convert PNG images with alpha channels to WebP to get smaller files while preserving transparency — something JPEG cannot do."
        },
        {
          q: "Can I convert WebP back to JPEG or PNG?",
          a: "Yes. This tool converts any image format to any other — including converting WebP back to JPEG or PNG. Simply select the target format and download."
        },
        {
          q: "Is WebP supported in all browsers?",
          a: "Yes. WebP is supported in Chrome, Firefox, Safari (since 14), Edge, and Opera — covering over 97% of global browser usage as of 2025. It is safe to use as the primary format for web images."
        },
        {
          q: "Will converting to WebP lose quality?",
          a: "At quality 85% or above, WebP output is visually indistinguishable from the original for most images. Use the quality slider to find the right balance. For pixel-perfect reproduction use the PNG (lossless) option."
        }
      ],
      example: {
        input: "Upload a JPEG photo (2 MB) and convert to WebP at 80% quality:",
        output: "The side-by-side preview lets you compare visual quality before downloading."
      }
    },
  {
      slug: "youtube-thumbnail",
      title: "YouTube Thumbnail Downloader Online – Free HD Preview Tool",
      description: "Download YouTube video thumbnails in all resolutions — HD (1280×720), SD, medium, and default quality. Paste any YouTube URL and download instantly. Free, no sign-up.",
      category: "image",
      relatedTools: [
        "image-resizer",
        "url-encode",
        "qr-code-generator"
      ],
      useCases: [
        "Embed a video preview image in a blog post or article",
        "Use a thumbnail as a social media preview image for a shared link",
        "Research competitor thumbnail design styles for your own YouTube channel",
        "Archive thumbnails of videos you reference in documentation or research"
      ],
      faq: [
        {
          q: "Is it legal to download YouTube thumbnails?",
          a: "YouTube thumbnails are publicly accessible images hosted on Google's servers. Downloading them for personal use, research, or non-commercial embedding is generally acceptable. For commercial use or redistribution, check the original creator's copyright and YouTube's Terms of Service."
        },
        {
          q: "Why is maxresdefault not always available?",
          a: "YouTube only generates the 1280×720 maxresdefault thumbnail for videos that were uploaded in HD quality. Older or low-resolution videos may not have this size; hqdefault (480×360) is always available as a fallback."
        },
        {
          q: "Can I get thumbnails for YouTube Shorts?",
          a: "Yes. YouTube Shorts use the same video ID system. Paste the Shorts URL and the tool will fetch whatever thumbnail sizes YouTube has generated for that video."
        },
        {
          q: "What does YouTube Thumbnail Downloader Online – Free HD Preview Tool do?",
          a: "YouTube Thumbnail Downloader Online – Free HD Preview Tool runs entirely in your browser and helps you complete this task without uploading data to a server."
        }
      ],
      example: {
        input: "Video URL: https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        output: "Available thumbnails fetched:"
      }
    },
  {
      slug: "qr-code-generator",
      title: "QR Code Generator Free – Create Custom QR Codes Online",
      description: "Generate QR codes for URLs, text, WiFi, vCards, and email. Customize colors, error correction level, size, and embed your logo. Download as PNG or SVG. Free, browser-based.",
      category: "generate",
      relatedTools: [
        "url-encode",
        "base64",
        "password-generator"
      ],
      useCases: [
        "Share website URLs on printed materials, business cards, or posters",
        "Share Wi-Fi credentials without typing passwords (scan to connect)",
        "Encode vCard contact information for instant phone import",
        "Create QR codes for email links, event check-ins, or product packaging",
        "Generate branded QR codes with custom colors and logo overlay"
      ],
      faq: [
        {
          q: "PNG",
          a: "Use PNG for web pages, presentations, and social media. Use SVG for print materials such as business cards or posters, since SVG scales to any size without losing quality."
        },
        {
          q: "What is Error Correction Level?",
          a: "Error correction allows a QR code to be read even if part of it is damaged or obscured. Level L (7%) is most compact; Level H (30%) tolerates the most damage. When you add a logo, the tool automatically switches to Level H."
        },
        {
          q: "How much data can a QR code hold?",
          a: "The maximum depends on the error correction level. At Level L, a QR code can store up to 2,953 bytes of data. At Level H, the limit is 1,273 bytes. URLs are typically 50–200 characters, well within limits."
        },
        {
          q: "Does the QR code expire?",
          a: "QR codes generated here are static — they do not expire and contain no tracking. The data is encoded directly in the image. For dynamic QR codes that can be updated, you would need a separate redirect service."
        }
      ],
      example: {
        input: "Enter a URL such as https://example.com and click Generate — a scannable QR code appears instantly.",
        output: "You can also encode:"
      }
    },
  {
      slug: "slug-generator",
      title: "URL Slug Generator Online – Convert Text to SEO-Friendly Slugs",
      description: "Convert titles to SEO-friendly URL slugs instantly. Supports Chinese to pinyin conversion, custom separators, case options, and max-length enforcement. Free, browser-based.",
      category: "text",
      relatedTools: [
        "url-encode",
        "word-counter",
        "lorem-ipsum-generator"
      ],
      useCases: [
        "Generate permalink slugs for blog posts and articles",
        "Create SEO-friendly product URLs in e-commerce stores",
        "Build clean category and tag page URLs for a CMS",
        "Normalize user-submitted titles before saving to a database"
      ],
      faq: [
        {
          q: "What is the difference between a slug and a URL?",
          a: "A URL is the full web address (e.g. https://example.com/blog/my-post ). The slug is only the last meaningful segment — my-post — that identifies the specific page."
        },
        {
          q: "Should I use hyphens or underscores in slugs?",
          a: "Hyphens are strongly preferred. Google treats hyphens as word separators in URLs, but underscores are treated as word joiners — meaning hello-world matches searches for \"hello\" and \"world\", while hello_world is treated as one token."
        },
        {
          q: "How long should a URL slug be?",
          a: "Keep slugs under 60–75 characters. Shorter slugs are easier to share and read in search results. Remove stop words like \"a\", \"the\", \"and\" to shorten without losing meaning."
        },
        {
          q: "What does URL Slug Generator Online – Convert Text to SEO-Friendly Slugs do?",
          a: "URL Slug Generator Online – Convert Text to SEO-Friendly Slugs runs entirely in your browser and helps you complete this task without uploading data to a server."
        }
      ],
      example: {
        input: "Input title: Hello World! Top 10 Tips & Tricks (2024)",
        output: "Generated slug: hello-world-top-10-tips-tricks-2024"
      },
      shortTitle: "Slug Generator",
      seoContent: {
        whatIsTitle: "What is a URL Slug?",
        whatIsBody: "A URL slug is the readable part of a page address that usually appears after the domain name. Good slugs are short, descriptive, lowercase, and easy to share, which makes them useful for SEO and cleaner URLs.",
        howToTitle: "How to Use the Slug Generator",
        howToSteps: [
          "Paste the source title or phrase into the input field.",
          "Choose separator and casing rules.",
          "Optionally set a length limit or base URL preview.",
          "Copy the final slug or full URL for publishing."
        ]
      },
      learnMore: {
        title: "Understand URL Slugs (examples, use cases & FAQs)",
        whyUseTitle: "Why Use This Slug Generator",
        whyUseItems: [
          "Produces cleaner, shareable slugs for articles, products, and categories.",
          "Supports custom separators and transliteration-friendly cleanup.",
          "Useful before publishing content into a CMS, blog, or ecommerce platform."
        ]
      }
    },
  {
      slug: "lorem-ipsum-generator",
      title: "Lorem Ipsum Generator Online – Random Placeholder Text Free",
      description: "Generate placeholder text online — classic Lorem Ipsum, Chinese characters, tech jargon, or business language. Output as plain text, HTML, or Markdown. Free, no sign-up.",
      category: "text",
      relatedTools: [
        "word-counter",
        "slug-generator",
        "markdown-preview"
      ],
      useCases: [
        "Fill design mockups and wireframes with realistic-length body text",
        "Test typography, line height, and column width in CSS layouts",
        "Populate database seed scripts with dummy content for development",
        "Create placeholder email templates or document drafts before final copy is ready"
      ],
      faq: [
        {
          q: "Is lorem ipsum real Latin?",
          a: "Mostly no. It is based on Cicero's de Finibus but scrambled and modified to make it meaningless. This is intentional — designers don't want readers parsing the content instead of evaluating the layout."
        },
        {
          q: "Is it safe to ship lorem ipsum to production?",
          a: "No. Lorem ipsum is for development and design review only. Always replace it with real copy before a public launch — some users and search engines may notice placeholder text."
        },
        {
          q: "What is \"Cicero\" or \"de Finibus\"?",
          a: "de Finibus Bonorum et Malorum (\"On the Ends of Good and Evil\") is a philosophical work by Marcus Tullius Cicero written in 45 BC. The lorem ipsum passage derives from sections 1.10.32 and 1.10.33 of this text, though heavily altered."
        },
        {
          q: "What does Lorem Ipsum Generator Online – Random Placeholder Text Free do?",
          a: "Lorem Ipsum Generator Online – Random Placeholder Text Free runs entirely in your browser and helps you complete this task without uploading data to a server."
        }
      ],
      example: {
        input: "Type: Paragraphs | Count: 2 | Start with \"Lorem ipsum…\": on",
        output: "Output begins: \"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua…\""
      },
      shortTitle: "Lorem Ipsum Generator",
      seoContent: {
        whatIsTitle: "What is Lorem Ipsum?",
        whatIsBody: "Lorem ipsum is placeholder text used when real copy is not ready yet. It helps designers and developers judge spacing, typography, and layout without being distracted by meaningful content.",
        howToTitle: "How to Use the Lorem Ipsum Generator",
        howToSteps: [
          "Choose whether you want paragraphs, sentences, or words.",
          "Set how many units to generate.",
          "Toggle the classic opening phrase if needed.",
          "Generate and copy the placeholder text into your mockup or editor."
        ]
      },
      learnMore: {
        title: "Understand Lorem Ipsum (examples, use cases & FAQs)",
        whyUseTitle: "Why Use This Lorem Ipsum Generator",
        whyUseItems: [
          "Useful for mockups, wireframes, prototypes, and seeded content.",
          "Lets you quickly generate different text lengths for layout testing.",
          "Works well for design reviews before final copy is available."
        ]
      }
    },
  {
      slug: "color-picker",
      title: "Color Picker",
      description: "Pick colors visually and convert between HEX, RGB, HSL, and CMYK. Copy any format with one click. No sign-up required.",
      category: "convert",
      relatedTools: [
        "color-converter",
        "color-palette",
        "contrast-checker"
      ],
      useCases: [
        "Pick a brand color and get its HEX code for CSS",
        "Convert a design HEX color to RGB for JavaScript",
        "Find HSL values for color manipulation in code"
      ],
      example: {
        input: "#FF5733",
        output: "RGB(255, 87, 51) · HSL(11°, 100%, 60%) · CMYK(0%, 66%, 80%, 0%)"
      },
      faq: [
        {
          q: "What color formats are supported?",
          a: "HEX, RGB, RGBA, HSL, HSLA, and CMYK. Click any format field to copy its value."
        },
        {
          q: "Can I use the eyedropper to pick colors from my screen?",
          a: "On browsers that support the EyeDropper API (Chrome 95+), yes. Click the eyedropper icon to pick from anywhere on screen."
        },
        {
          q: "What is the difference between HSL and HSB/HSV?",
          a: "HSL (Hue, Saturation, Lightness) and HSB/HSV (Hue, Saturation, Brightness/Value) are both cylindrical color models but differ in how they define the third axis. In HSL, 50% lightness is the \"pure\" color. In HSB, 100% brightness means the maximum brightness, which is closer to the color artists think of as vivid. CSS uses HSL; Photoshop and Figma use HSB."
        },
        {
          q: "Can I use this to check WCAG color contrast?",
          a: "This tool shows color values and conversions. For accessibility contrast checking (WCAG AA/AAA ratios) against a background color, use the dedicated Contrast Checker tool."
        }
      ]
    },
  {
      slug: "regex-tester",
      title: "Regex Tester Online – Test & Debug Regular Expressions",
      description: "Test and debug regular expressions in real time. Highlights all matches, shows capture groups, supports global/case-insensitive/multiline flags, and includes replace mode. Free, browser-based.",
      category: "text",
      relatedTools: [
        "json-formatter",
        "string-escape",
        "hash-generator"
      ],
      useCases: [
        "Quickly complete common regex tester online – test & debug regular expressions tasks in the browser",
        "Verify regex tester online – test & debug regular expressions results without installing desktop software"
      ],
      faq: [
        {
          q: "What regex flavor does this tester use?",
          a: "This tool uses the JavaScript RegExp engine built into your browser. JavaScript regex supports most standard features — character classes, quantifiers, groups, lookaheads, lookbehinds — but differs from other flavors (PCRE, Python, Java) in some edge cases like named backreferences and certain Unicode properties."
        },
        {
          q: "g",
          a: "g (global) finds all matches instead of stopping at the first. i makes matching case-insensitive. m makes ^ and $ match the start/end of each line rather than the whole string. s (dotAll) makes . match newline characters too."
        },
        {
          q: "How do I match a literal dot or parenthesis?",
          a: "Escape it with a backslash: \\. matches a literal dot, \\( matches a literal opening parenthesis. Without the backslash, . matches any character and ( starts a capture group."
        },
        {
          q: "What is a capture group?",
          a: "A capture group is a part of the pattern wrapped in parentheses (...) . Whatever it matches is extracted separately and accessible as $1 , $2 , etc. in replace operations, or as array elements in code. Use (?:...) for a non-capturing group when you want grouping without extraction."
        }
      ],
      example: {
        input: "Pattern: \\b[A-Z][a-z]+\\b — matches capitalized words",
        output: "Test string: Hello World foo Bar"
      }
    },
  {
      slug: "markdown-preview",
      title: "Markdown Preview",
      description: "Write Markdown in the editor and see a live rendered HTML preview. Supports GFM tables, task lists, and fenced code blocks.",
      category: "text",
      relatedTools: [
        "markdown-to-html",
        "html-formatter",
        "diff-viewer"
      ],
      useCases: [
        "Preview README files before committing to GitHub",
        "Write and preview blog posts in Markdown",
        "Check table rendering in documentation"
      ],
      example: {
        input: "# Hello\n\n**Bold** and _italic_ text.",
        output: "<h1>Hello</h1><p><strong>Bold</strong> and <em>italic</em> text.</p>"
      },
      faq: [
        {
          q: "Does it support GitHub Flavored Markdown (GFM)?",
          a: "Yes. Tables, task lists (- [x]), fenced code blocks with syntax info, and strikethrough are all supported."
        },
        {
          q: "Can I export the rendered HTML?",
          a: "Yes. Use the \"Copy HTML\" button to copy the rendered HTML source to your clipboard."
        },
        {
          q: "marked.js",
          a: "This tool uses the marked.js library configured to render GitHub Flavored Markdown (GFM), which is the most widely used Markdown dialect. GFM extends CommonMark with tables, strikethrough, task lists, and autolinks."
        },
        {
          q: "Copy HTML",
          a: "Yes. Click Copy HTML to copy the rendered HTML to your clipboard, or Export HTML to download a standalone HTML file that includes basic styling."
        }
      ]
    },
  {
      slug: "cron-builder",
      title: "Cron Expression Builder Online – Generate & Explain Cron Jobs",
      description: "Build and validate cron expressions visually. Set minute, hour, day, month, and weekday fields with instant human-readable descriptions and next 5 run time previews. Free, browser-based.",
      category: "generate",
      relatedTools: [
        "timestamp",
        "regex-tester",
        "json-formatter"
      ],
      useCases: [
        "Database backups — run a backup script every night at 02:00: 0 2 * * *",
        "Scheduled reports — send a weekly email every Monday at 08:00: 0 8 * * 1",
        "Cache invalidation — clear cached data every 15 minutes: */15 * * * *",
        "CI/CD pipelines — trigger nightly builds or dependency audits automatically.",
        "API polling — fetch data from an external service on a regular interval."
      ],
      faq: [
        {
          q: "Does cron support seconds?",
          a: "Standard Unix cron uses five fields (no seconds). Some systems like Spring Scheduler and Quartz add a sixth field for seconds. This builder uses the standard five-field format compatible with Linux crontab, GitHub Actions, and most cloud schedulers."
        },
        {
          q: "What timezone does cron use?",
          a: "By default, cron uses the server's local timezone. GitHub Actions schedules use UTC. Always confirm the timezone of the system running your cron job to avoid off-by-one-hour errors."
        },
        {
          q: "What does */5 * * * * mean?",
          a: "It means \"every 5 minutes\". The */n syntax means \"every n units starting from 0\". So */5 in the minutes field fires at 0, 5, 10, 15, 20 … 55."
        },
        {
          q: "Can I run a job on the last day of the month?",
          a: "Standard cron doesn't have an \"L\" (last) modifier — that's a Quartz extension. For standard cron, a common workaround is to schedule for the 28th–31st and check the date inside your script."
        }
      ]
    },
  {
      slug: "jwt-decoder",
      title: "JWT Decoder Online – Inspect & Decode JSON Web Tokens",
      description: "Free online JWT decoder and inspector. Parse JWT header, payload, and signature. View expiration time, algorithm, and all claims. Runs entirely in your browser.",
      category: "encode",
      relatedTools: [
        "jwt-builder",
        "base64",
        "hash-generator"
      ],
      useCases: [
        "API debugging — inspect what claims a token carries without a server-side tool.",
        "Checking expiry — read the exp field to see when a token expires.",
        "Auth troubleshooting — confirm that the correct user ID, roles, and scopes are in the payload.",
        "Learning OAuth 2.0 / OIDC — understand what fields like aud , azp , and nonce mean."
      ],
      faq: [
        {
          q: "Is it safe to paste my JWT here?",
          a: "Yes. Decoding runs entirely in your browser — the token is never sent to a server. That said, avoid pasting production tokens with sensitive claims into any public tool unless you're certain it's client-side only."
        },
        {
          q: "Can this tool verify the signature?",
          a: "No. Signature verification requires the secret (HMAC) or public key (RSA/EC). This tool only decodes the Base64URL-encoded header and payload — verification must happen on your server."
        },
        {
          q: "What does \"token expired\" mean?",
          a: "The exp claim is a Unix timestamp indicating when the token stops being valid. If the current time is past that timestamp, the server will reject the token and you'll need to re-authenticate."
        },
        {
          q: "self-contained",
          a: "Session cookies store a session ID on the server and look it up on each request. JWTs are self-contained — all claims are in the token itself, so no server-side session storage is needed. This makes JWTs ideal for stateless, distributed systems."
        }
      ],
      example: {
        input: "Paste any JWT — e.g. eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
        output: "The tool instantly splits it into three parts:"
      }
    },
  {
      slug: "html-entities",
      title: "HTML Entity Encoder / Decoder Online – Escape HTML Free",
      description: "Free online HTML entity encoder and decoder. Convert special characters to named entities (&amp;amp;) or numeric entities (&#38;). Includes quick-reference table.",
      category: "encode",
      relatedTools: [
        "url-encode",
        "base64",
        "markdown-preview"
      ],
      useCases: [
        "Escape user-generated content before inserting it into HTML to prevent XSS attacks",
        "Display code samples in HTML without the browser interpreting the tags",
        "Include special characters (©, ™, →, €) in HTML without relying on keyboard input",
        "Decode HTML entities from an API or scraping result back to readable text"
      ],
      faq: [
        {
          q: "What is the difference between HTML entities and URL encoding?",
          a: "HTML entities encode special characters for safe rendering inside HTML documents ( &lt; for < ). URL encoding converts characters for safe transmission in URLs ( %3C for < ). Use HTML entities for HTML content, URL encoding for query parameters and URL components."
        },
        {
          q: "Do I need to encode all non-ASCII characters?",
          a: "Not necessarily. Modern HTML documents declare UTF-8 encoding ( <meta charset=\"UTF-8\"> ), which allows most Unicode characters to appear as-is. Entities are most important for the five characters with special HTML meaning: < , > , & , \" , and ' ."
        },
        {
          q: "What is the difference between named and numeric entities?",
          a: "Named entities use a defined name: &amp; , &copy; . Numeric entities use a decimal ( &#38; ) or hex ( &#x26; ) code point. All three forms produce the same character; named entities are more readable while numeric entities work for any Unicode character."
        },
        {
          q: "What does HTML Entity Encoder / Decoder Online – Escape HTML Free do?",
          a: "HTML Entity Encoder / Decoder Online – Escape HTML Free runs entirely in your browser and helps you complete this task without uploading data to a server."
        }
      ],
      example: {
        input: "Input: <script>alert('XSS')</script>",
        output: "Encoded output: &lt;script&gt;alert('XSS')&lt;/script&gt;"
      },
      shortTitle: "HTML Entity Encoder / Decoder",
      seoContent: {
        whatIsTitle: "What are HTML Entities?",
        whatIsBody: "HTML entities are encoded forms of characters that would otherwise be interpreted specially in HTML, such as <, >, &, and quotes. They are useful when you need to display markup literally or safely insert text into HTML contexts.",
        howToTitle: "How to Use HTML Entity Encoder / Decoder",
        howToSteps: [
          "Paste the source text or encoded entity string into the input.",
          "Choose encode when you need HTML-safe output, or decode to get readable text back.",
          "Review named or numeric entity output depending on your use case.",
          "Copy the converted result into your page, template, or payload."
        ]
      },
      learnMore: {
        title: "Understand HTML Entities",
        whyUseTitle: "Why Use This Tool",
        whyUseItems: [
          "Useful for escaping code samples and preventing unintended HTML rendering.",
          "Helps decode entity-heavy content from scrapers, APIs, and legacy systems.",
          "Makes it easy to compare named and numeric entity output quickly."
        ]
      }
    },
  {
      slug: "hash-generator",
      title: "Hash Generator",
      description: "Generate MD5, SHA-1, SHA-256, and SHA-512 cryptographic hashes from text or file. All algorithms run simultaneously in your browser via Web Crypto API.",
      category: "generate",
      shortTitle: "Hash Generator",
      relatedTools: [
        "bcrypt",
        "hmac",
        "password-generator"
      ],
      useCases: [
        "Verify file integrity by comparing checksums",
        "Compare MD5, SHA-1, SHA-256, and SHA-512 output for the same input",
        "Generate fingerprints for deduplication, caching, or asset tracking",
        "Check hash values locally before publishing or sharing files"
      ],
      example: {
        input: "Hello",
        output: "SHA-256: 185f8db32921bd46d35cc2470d0f5fb1f86d65bd61fe11a76fa31bdc56b5bb24"
      },
      faq: [
        {
          q: "Is MD5 still safe to use?",
          a: "Not for security purposes. MD5 is broken for collision resistance. Use SHA-256 or SHA-512 for integrity checks, and bcrypt/argon2 for passwords."
        },
        {
          q: "Can I hash a file?",
          a: "Yes. Switch to the File tab, drop your file, and all four algorithms will compute the hash instantly."
        },
        {
          q: "Is my file uploaded?",
          a: "No. File hashing uses the browser's FileReader and Web Crypto APIs. Nothing leaves your device."
        },
        {
          q: "What is the difference between MD5, SHA-1, SHA-256, and SHA-512?",
          a: "They differ in digest length and security level. MD5 produces 128-bit (32-char) hashes ? fast but cryptographically broken. SHA-1 produces 160-bit (40-char) hashes ? also deprecated for security use. SHA-256 and SHA-512 are part of the SHA-2 family and remain secure for integrity checking and digital signatures."
        }
      ],
      seoContent: {
        whatIsTitle: "What is Hash Generator?",
        whatIsBody: "Hash Generator converts text or files into fixed-length digest values such as MD5, SHA-1, SHA-256, and SHA-512. It is useful for checksum comparison, file verification, and quickly understanding how different hash algorithms produce different outputs for the same input.",
        howToTitle: "How to Use Hash Generator",
        howToSteps: [
          "Enter text or switch to file mode and choose a file.",
          "Let the tool calculate the available hash algorithms in parallel.",
          "Review the digest values you need for checksum comparison or record keeping.",
          "Copy the required hash for verification, scripting, or documentation."
        ]
      },
      learnMore: {
        title: "Understand Hash Functions",
        whyUseTitle: "Why Use This Tool",
        whyUseItems: [
          "Useful for checksum verification, release artifacts, and integrity checks.",
          "Shows several common algorithms at once for quick comparison.",
          "Processes text and files locally in the browser without uploading them."
        ]
      }
    },
  {
      slug: "date-calculator",
      shortTitle: "Date Calculator",
      title: "Date Calculator – Day Difference, Business Days & Age",
      description: "Calculate the difference between two dates, add or subtract days, count business days, and calculate exact age. Free online date calculator.",
      category: "calculator",
      relatedTools: [
        "timestamp",
        "timezone-converter",
        "countdown"
      ],
      useCases: [
        "Project deadlines — calculate how many days remain until a milestone or delivery date.",
        "Age calculation — determine exact age in years, months, and days from a date of birth.",
        "Contract periods — find the end date of a 30-, 60-, or 90-day contract or notice period.",
        "Invoice due dates — add net payment terms (Net 30, Net 60) to an invoice date.",
        "Event planning — count down weeks and days to a wedding, reunion, or conference."
      ],
      faq: [
        {
          q: "Does the calculator include both start and end dates in the count?",
          a: "By default the calculator counts the number of days between the two dates, not including the end date (like a programming range). If you need to include both dates, add one day to the result."
        },
        {
          q: "How are months calculated when months have different lengths?",
          a: "Month differences are calculated by counting calendar months between the two dates. Partial months at the end are shown as remaining days."
        },
        {
          q: "Can I calculate working days (excluding weekends)?",
          a: "Yes — the Business Days section counts only weekdays (Monday–Friday) between your two dates."
        },
        {
          q: "What date format should I enter?",
          a: "Use the date picker or type dates in YYYY-MM-DD format. The tool uses your browser's locale to display dates in a readable format after calculation."
        }
      ],
      example: {
        input: "From: 2024-01-01 · To: 2024-12-31",
        output: "365 days · 52 weeks · 12 months · 0 years"
      },
      seoContent: {
        whatIsBody: "Date Calculator calculates the difference between two dates in days, weeks, months, and years, adds or subtracts days from any date, computes exact age from a date of birth, and counts business days between dates. All calculations run entirely in your browser — no data is uploaded to any server.",
        howToTitle: "How to Use",
        howToSteps: [
          "To find the difference between two dates, enter a start date and an end date in the Date Difference section.",
          "To add or subtract time from a date, use the Add / Subtract section and enter the number of days to offset.",
          "To count business days between dates, use the Business Days section — weekends are excluded automatically.",
          "To calculate an age, enter a date of birth in the Age Calculator section and the result appears instantly."
        ]
      },
      learnMore: {
        title: "Understand Date Calculator",
        useCasesTitle: "Common Date Calculations",
        whyUseItems: [
          "Multiple calculation modes — date difference, add/subtract, business days, and age calculator in one place.",
          "Multi-unit output — results shown in days, weeks, months, and years simultaneously.",
          "Leap year aware — calculations correctly account for leap years.",
          "Instant results — calculations update as soon as you change any date field.",
          "Free and private — no data is uploaded; everything runs in your browser."
        ]
      }
    },
  {
      slug: "bmi-calculator",
      shortTitle: "BMI Calculator",
      title: "BMI Calculator – Body Mass Index with Healthy Weight Range",
      description: "Calculate your Body Mass Index (BMI) instantly. Supports Metric and Imperial units. Shows BMI category, visual scale, and healthy weight range for your height.",
      category: "calculator",
      relatedTools: [
        "loan-calculator",
        "date-calculator",
        "unit-converter"
      ],
      useCases: [
        "Check whether your current weight falls within the standard BMI ranges.",
        "Compare BMI quickly after switching between metric and imperial measurements.",
        "Estimate a healthy target weight range for your height before planning diet or fitness goals."
      ],
      faq: [
        {
          q: "Is BMI accurate for athletes?",
          a: "No — highly muscular people may be classified as overweight by BMI despite low body fat. BMI is a population-level screening tool, not an individual diagnostic."
        },
        {
          q: "Should I use metric or imperial?",
          a: "Both give identical results — choose whichever units you are most comfortable with."
        },
        {
          q: "Can BMI diagnose health conditions?",
          a: "No. BMI is a screening metric, not a diagnosis. It is useful for spotting broad weight categories, but it does not replace medical advice or a full health assessment."
        },
        {
          q: "Does this BMI calculator store my measurements?",
          a: "No. Height, weight, and unit selections stay in your browser and are not uploaded to a server."
        }
      ],
      example: {
        input: "Height: 175 cm, Weight: 70 kg",
        output: "BMI: 22.9 — Normal weight (18.5–24.9)"
      },
      seoContent: {
        whatIsTitle: "What is BMI Calculator?",
        whatIsBody: "BMI Calculator calculates Body Mass Index (BMI) from height and weight in metric or imperial units. It shows your BMI value, weight category, and the healthy weight range for your height.",
        howToTitle: "How to Use BMI Calculator",
        howToSteps: [
          "Enter your height and weight.",
          "Select metric (cm/kg) or imperial (feet/inches, pounds).",
          "See your BMI and weight category instantly.",
          "View the healthy weight range for your height."
        ]
      },
      learnMore: {
        title: "Understand BMI Calculator",
        useCasesTitle: "Common Use Cases",
        extraTitle: "BMI Categories and Limitations",
        extraHtml: "        <ul>\n          <li>Underweight: &lt;18.5</li>\n          <li>Normal weight: 18.5–24.9</li>\n          <li>Overweight: 25–29.9</li>\n          <li>Obese Class I: 30–34.9</li>\n        </ul>\n        <p><strong>Limitations:</strong> BMI does not account for muscle mass, age, sex, or ethnic background. Athletes may have high BMI with low body fat. Consult a healthcare professional for a full assessment.</p>",
        whyUseItems: [
          "Quick initial health screening using a widely-used metric.",
          "Track changes over time with a consistent measurement.",
          "Understand healthy weight range for your height."
        ]
      }
    },
  {
      slug: "loan-calculator",
      shortTitle: "Loan Calculator",
      title: "Loan Calculator – Monthly Payment & Amortization Schedule",
      description: "Calculate monthly loan payments, total interest, and view a full amortization schedule. Supports any fixed-rate loan — mortgage, car, personal loan.",
      category: "calculator",
      relatedTools: [
        "bmi-calculator",
        "date-calculator",
        "number-format"
      ],
      useCases: [
        "Compare monthly payments for different loan amounts, rates, and repayment terms.",
        "Estimate the real total cost of a mortgage, auto loan, or personal loan before signing.",
        "Understand how amortization shifts each payment from interest-heavy to principal-heavy over time."
      ],
      faq: [
        {
          q: "Does it include taxes, insurance, and PMI?",
          a: "This calculator computes principal and interest (P&I) only. Add your own estimates for property taxes and insurance."
        },
        {
          q: "Can I calculate a 15-year vs 30-year mortgage?",
          a: "Yes — change the term to any number of years to compare options side by side."
        },
        {
          q: "Can I use this for car loans, mortgages, and personal loans?",
          a: "Yes. The calculator works for any fixed-rate installment loan as long as you know the principal, annual interest rate, and repayment term."
        },
        {
          q: "Does the amortization schedule update automatically?",
          a: "Yes. As soon as you change the loan amount, rate, or term, the monthly payment and amortization breakdown refresh instantly in your browser."
        }
      ],
      example: {
        input: "Loan: $200,000 at 6.5% for 30 years",
        output: "Monthly payment: $1,264 · Total interest: $255,088 · Total cost: $455,088"
      },
      seoContent: {
        whatIsTitle: "What is Loan / Mortgage Calculator?",
        whatIsBody: "Loan Calculator computes monthly payment, total interest paid, and total cost for a fixed-rate loan or mortgage. Enter principal, annual interest rate, and term to see full results plus an amortization schedule.",
        howToTitle: "How to Use Loan / Mortgage Calculator",
        howToSteps: [
          "Enter the loan amount (principal).",
          "Enter the annual interest rate (%).",
          "Enter the loan term in years.",
          "See monthly payment, total interest, and total cost. Browse the amortization schedule."
        ]
      },
      learnMore: {
        title: "Understand Loan / Mortgage Calculator",
        extraTitle: "Understanding Amortization",
        extraHtml: "        <p>Early payments are mostly interest; later payments are mostly principal. Formula: M = P[r(1+r)^n]/[(1+r)^n−1]. Paying extra principal in early months saves significant total interest. Refinancing at a lower rate reduces both monthly payment and total cost.</p>",
        whyUseItems: [
          "Quickly compare loan options without a spreadsheet.",
          "Understand total cost of a loan before signing.",
          "See how extra payments reduce total interest over time."
        ]
      }
    },
  {
      slug: "css-minifier",
      title: "CSS Minifier - Compress CSS Online",
      description: "Minify and compress CSS code instantly. Remove comments, whitespace, and redundant code to reduce file size for production. Free, browser-based, no data sent.",
      category: "format",
      relatedTools: [
        "css-formatter",
        "js-minifier",
        "html-formatter"
      ],
      useCases: [
        "Quickly complete common css minifier - compress css online tasks in the browser",
        "Verify css minifier - compress css online results without installing desktop software"
      ],
      faq: [
        {
          q: "Will minifying CSS break my styles?",
          a: "No. The minifier only removes characters that have no effect on CSS parsing — whitespace and comments. The minified output is functionally identical to the original."
        },
        {
          q: "Should I keep the original formatted CSS?",
          a: "Yes. Always keep the human-readable source file in your repository and only deploy the minified version. Use a source map if you need to debug minified CSS in browser DevTools."
        },
        {
          q: "How much file size reduction can I expect?",
          a: "Typical savings range from 20% to 50% depending on how much whitespace and comments the original file contains. Additional savings come from gzip compression at the server level."
        },
        {
          q: "Does the minifier support CSS custom properties (variables)?",
          a: "Yes. CSS custom properties (--my-var: value) are preserved exactly as written during minification."
        }
      ],
      example: {
        input: "\\n.btn {\\n color: red;\\n padding: 8px 16px;\\n}",
        output: ".btn{color:red;padding:8px 16px}"
      }
    },
  {
      slug: "js-minifier",
      title: "JavaScript Minifier Online – Compress &amp; Minify JS Free",
      description: "Minify and compress JavaScript code instantly using Terser. Mangle variable names, remove dead code, and reduce file size for production. Free, browser-based, no data sent.",
      category: "format",
      relatedTools: [
        "js-formatter",
        "css-minifier",
        "json-formatter"
      ],
      useCases: [
        "Quickly complete common javascript minifier online – compress &amp; minify js free tasks in the browser",
        "Verify javascript minifier online – compress &amp; minify js free results without installing desktop software"
      ],
      faq: [
        {
          q: "Can minified code be reversed?",
          a: "Basic whitespace minification is partially reversible with a formatter. Variable renaming is not reversible."
        },
        {
          q: "Does it do tree shaking or dead code elimination?",
          a: "This is a whitespace/comment minifier — for tree shaking, use a bundler like webpack or Rollup."
        },
        {
          q: "What does JavaScript Minifier Online – Compress &amp; Minify JS Free do?",
          a: "JavaScript Minifier Online – Compress &amp; Minify JS Free runs entirely in your browser and helps you complete this task without uploading data to a server."
        },
        {
          q: "Is JavaScript Minifier Online – Compress &amp; Minify JS Free free to use?",
          a: "Yes. This tool is free to use and does not require sign-up."
        }
      ],
      example: {
        input: "Input (42 bytes):",
        output: "Minified (26 bytes): function add(a,b){return a+b}"
      }
    },
  {
      slug: "toml-json",
      title: "TOML to JSON Converter Online – Parse & Convert TOML Free",
      description: "Convert TOML to JSON and JSON to TOML instantly. Supports tables, arrays, inline tables, dates, and all TOML v1.0 types. Free, browser-based, no data sent.",
      category: "convert",
      relatedTools: [
        "yaml-json",
        "json-formatter",
        "xml-json"
      ],
      useCases: [
        "Quickly complete common toml to json converter online – parse & convert toml free tasks in the browser",
        "Verify toml to json converter online – parse & convert toml free results without installing desktop software"
      ],
      faq: [
        {
          q: "Are TOML comments preserved when converting to JSON?",
          a: "No. JSON does not support comments, so TOML comments are dropped during conversion to JSON."
        },
        {
          q: "Does the tool support TOML arrays of tables?",
          a: "Yes. TOML arrays of tables (double-bracket sections like [[products]] ) are converted to JSON arrays of objects."
        },
        {
          q: "What TOML version is supported?",
          a: "The tool supports TOML v1.0, which covers all standard features including dotted keys, inline tables, and multi-line strings."
        },
        {
          q: "Is my configuration data safe?",
          a: "Yes. All processing happens entirely in your browser using JavaScript. No data is ever sent to a server."
        }
      ],
      example: {
        input: "Converting a TOML database config section to JSON:",
        output: "TOML's section headers map to nested JSON objects, and values preserve their native types."
      }
    },
  {
      slug: "jwt-builder",
      title: "JWT Builder / Generator - Create JSON Web Tokens",
      description: "Build and sign JSON Web Tokens (JWT) with HMAC (HS256/HS384/HS512). Set header, payload claims, and secret key. Free, browser-based, no data sent.",
      category: "encode",
      relatedTools: [
        "jwt-decoder",
        "hmac",
        "base64"
      ],
      useCases: [
        "Quickly complete common jwt builder / generator - create json web tokens tasks in the browser",
        "Verify jwt builder / generator - create json web tokens results without installing desktop software"
      ],
      faq: [
        {
          q: "Can I use RS256 (asymmetric) signing?",
          a: "Yes — paste your RSA private key in PEM format for RS256/RS384/RS512 signing."
        },
        {
          q: "How do I decode an existing JWT?",
          a: "Use the JWT Decoder tool to inspect any JWT without a secret."
        },
        {
          q: "What does JWT Builder / Generator - Create JSON Web Tokens do?",
          a: "JWT Builder / Generator - Create JSON Web Tokens runs entirely in your browser and helps you complete this task without uploading data to a server."
        },
        {
          q: "Is JWT Builder / Generator - Create JSON Web Tokens free to use?",
          a: "Yes. This tool is free to use and does not require sign-up."
        }
      ],
      example: {
        input: "Header: {\"alg\":\"HS256\",\"typ\":\"JWT\"}",
        output: "Payload: {\"sub\":\"user123\",\"exp\":1735689600,\"role\":\"admin\"}"
      }
    },
  {
      slug: "color-blindness",
      title: "Color Blindness Simulator Online – Test UI Accessibility Free",
      description: "Simulate how images appear to people with color vision deficiency. Test protanopia, deuteranopia, tritanopia, and achromatopsia. Free, browser-based, no data sent.",
      category: "design",
      relatedTools: [
        "contrast-checker",
        "color-picker",
        "color-palette"
      ],
      useCases: [
        "Quickly complete common color blindness simulator online – test ui accessibility free tasks in the browser",
        "Verify color blindness simulator online – test ui accessibility free results without installing desktop software"
      ],
      faq: [
        {
          q: "Should I rely on color alone to convey information?",
          a: "No — WCAG 1.4.1 requires that color is not the only means of conveying information. Always pair color with icons, patterns, or text labels."
        },
        {
          q: "How accurate is the simulation?",
          a: "The simulation uses established color matrix transformations. It is an approximation — individual perception varies."
        },
        {
          q: "What does Color Blindness Simulator Online – Test UI Accessibility Free do?",
          a: "Color Blindness Simulator Online – Test UI Accessibility Free runs entirely in your browser and helps you complete this task without uploading data to a server."
        },
        {
          q: "Is Color Blindness Simulator Online – Test UI Accessibility Free free to use?",
          a: "Yes. This tool is free to use and does not require sign-up."
        }
      ]
    },
  {
      slug: "ascii-table",
      title: "ASCII Table – Full Character Code Reference (Dec, Hex, Oct, Bin)",
      description: "Complete ASCII character table with decimal, hexadecimal, octal, and binary values. Search by character, code, or description. Click any row to copy.",
      category: "reference",
      relatedTools: [
        "binary-text",
        "html-entities",
        "number-base"
      ],
      useCases: [
        "Quickly complete common ascii table – full character code reference (dec, hex, oct, bin) tasks in the browser",
        "Verify ascii table – full character code reference (dec, hex, oct, bin) results without installing desktop software"
      ],
      faq: [
        {
          q: "Is extended ASCII (128–255) included?",
          a: "This table shows standard 7-bit ASCII (0–127). Extended ASCII (Latin-1, Code Page 437) varies by system."
        },
        {
          q: "What is the NULL character (0) used for?",
          a: "ASCII 0 (NUL) is a string terminator in C and embedded in file formats as a field separator."
        },
        {
          q: "What does ASCII Table – Full Character Code Reference (Dec, Hex, Oct, Bin) do?",
          a: "ASCII Table – Full Character Code Reference (Dec, Hex, Oct, Bin) runs entirely in your browser and helps you complete this task without uploading data to a server."
        },
        {
          q: "Is ASCII Table – Full Character Code Reference (Dec, Hex, Oct, Bin) free to use?",
          a: "Yes. This tool is free to use and does not require sign-up."
        }
      ],
      example: {
        input: "Search 65 → Row: Dec 65, Hex 41, Binary 01000001, Char A , Name: LATIN CAPITAL LETTER A",
        output: "Search newline → Dec 10, Hex 0A, Control character LF"
      }
    },
  {
      slug: "text-cleaner",
      title: "Text Cleaner – Remove Extra Spaces, Blank Lines & HTML Tags",
      description: "Clean and sanitize text instantly. Remove extra spaces, blank lines, duplicate lines, HTML tags, URLs, and more. Live preview with one-click copy.",
      category: "text",
      relatedTools: [
        "word-counter",
        "line-tools",
        "text-case"
      ],
      useCases: [
        "Clean text pasted from PDFs, websites, or chat transcripts",
        "Remove blank lines and repeated whitespace before publishing",
        "Strip HTML tags from copied rich text",
        "Normalize messy content before importing into spreadsheets or CMS tools"
      ],
      faq: [
        {
          q: "Does it remove HTML tags?",
          a: "Yes — enable the \"strip HTML tags\" option to remove all HTML markup from pasted content."
        },
        {
          q: "Will it remove all special characters?",
          a: "Only the characters you enable — each cleaning operation is optional."
        },
        {
          q: "What does Text Cleaner – Remove Extra Spaces, Blank Lines & HTML Tags do?",
          a: "Text Cleaner – Remove Extra Spaces, Blank Lines & HTML Tags runs entirely in your browser and helps you complete this task without uploading data to a server."
        },
        {
          q: "Is Text Cleaner – Remove Extra Spaces, Blank Lines & HTML Tags free to use?",
          a: "Yes. This tool is free to use and does not require sign-up."
        }
      ],
      example: {
        input: "Input: Hello world foo",
        output: "After collapse whitespace + trim: Hello world foo"
      },
      shortTitle: "Text Cleaner",
      seoContent: {
        whatIsTitle: "What is Text Cleaner?",
        whatIsBody: "Text Cleaner removes formatting noise such as duplicate spaces, blank lines, HTML tags, smart punctuation artifacts, and other copy-paste leftovers. It helps turn messy text into plain, reusable content.",
        howToTitle: "How to Use Text Cleaner",
        howToSteps: [
          "Paste your raw text into the input area.",
          "Enable the cleanup operations you want to apply.",
          "Review the cleaned output instantly.",
          "Copy the final result back into your editor, CMS, or spreadsheet."
        ]
      },
      learnMore: {
        title: "Understand Text Cleaner",
        extraTitle: "Common Cleaning Operations",
        extraHtml: "<ul><li>Collapse repeated spaces</li><li>Remove blank lines</li><li>Trim leading and trailing whitespace</li><li>Strip HTML tags</li><li>Normalize line endings</li></ul>",
        whyUseTitle: "Why Use This Tool",
        whyUseItems: [
          "Saves manual find-and-replace work after messy copy-paste operations.",
          "Useful for text imported from PDFs, web pages, emails, and docs.",
          "Lets you combine multiple cleaning passes in one browser-only step."
        ]
      }
    },
  {
      slug: "xml-json",
      title: "XML to JSON Converter Online – Free Browser-Based Tool",
      description: "Convert XML to JSON and JSON to XML instantly. Handles attributes, nested elements, arrays, and CDATA. Free, browser-based, no data sent.",
      category: "format",
      relatedTools: [
        "json-formatter",
        "yaml-json",
        "toml-json"
      ],
      useCases: [
        "Quickly complete common xml to json converter online – free browser-based tool tasks in the browser",
        "Verify xml to json converter online – free browser-based tool results without installing desktop software"
      ],
      faq: [
        {
          q: "Does it handle XML namespaces?",
          a: "Namespaced attributes and elements are preserved in the JSON output with their original prefix."
        },
        {
          q: "Can it convert complex SOAP envelopes?",
          a: "Yes — SOAP XML converts correctly, producing a nested JSON representation of the envelope."
        },
        {
          q: "What does XML to JSON Converter Online – Free Browser-Based Tool do?",
          a: "XML to JSON Converter Online – Free Browser-Based Tool runs entirely in your browser and helps you complete this task without uploading data to a server."
        },
        {
          q: "Is XML to JSON Converter Online – Free Browser-Based Tool free to use?",
          a: "Yes. This tool is free to use and does not require sign-up."
        }
      ],
      example: {
        input: "XML input: <user id=\"1\"><name>Alice</name></user>",
        output: "JSON output: {\"user\":{\"@id\":\"1\",\"name\":\"Alice\"}}"
      }
    },
  {
      slug: "number-format",
      title: "Number Formatter - Format Numbers, Currency & Scientific Notation",
      description: "Format numbers with thousand separators, currency symbols, decimal places, and scientific notation. Supports locale-aware formatting. Free, browser-based, no data sent.",
      category: "convert",
      shortTitle: "Number Formatter",
      relatedTools: [
        "number-base",
        "unit-converter",
        "random-number-generator"
      ],
      useCases: [
        "Format currency values for invoices, dashboards, or reports",
        "Preview locale differences before shipping international UI",
        "Convert large values into scientific notation for technical work",
        "Normalize decimal precision for exports and spreadsheets"
      ],
      example: {
        input: "1234567.89",
        output: "$1,234,567.89 · 1.234.567,89 · 1.23e+6"
      },
      faq: [
        {
          q: "Can I set custom decimal places?",
          a: "Yes — decimal precision is adjustable from 0 to 20 places."
        },
        {
          q: "Does it support cryptocurrency formatting?",
          a: "You can set custom decimal places for crypto amounts (e.g., 8 decimal places for Bitcoin)."
        },
        {
          q: "What does Number Formatter - Format Numbers, Currency & Scientific Notation do?",
          a: "Number Formatter - Format Numbers, Currency & Scientific Notation runs entirely in your browser and helps you complete this task without uploading data to a server."
        },
        {
          q: "Is Number Formatter - Format Numbers, Currency & Scientific Notation free to use?",
          a: "Yes. This tool is free to use and does not require sign-up."
        }
      ],
      seoContent: {
        whatIsTitle: "What is Number Formatter?",
        whatIsBody: "Number Formatter applies consistent separators, decimal precision, currency styling, percentages, and scientific notation to raw numeric input. It is useful when you need readable numbers for reports, finance, or localized interfaces.",
        howToTitle: "How to Use Number Formatter",
        howToSteps: [
          "Enter the raw number you want to format.",
          "Choose decimal, currency, percentage, or scientific output.",
          "Set locale and decimal precision options.",
          "Copy the formatted result for your app, document, or spreadsheet."
        ]
      },
      learnMore: {
        title: "Understand Number Formatter",
        extraTitle: "Locale Formatting Differences",
        extraHtml: "<ul><li><strong>US/UK</strong>: 1,234.56</li><li><strong>Europe</strong>: 1.234,56</li><li><strong>India</strong>: 12,34,567.89</li><li><strong>Scientific</strong>: 1.23e+6</li></ul><p>The formatter uses the browser's native Intl.NumberFormat API.</p>",
        whyUseTitle: "Why Use This Tool",
        whyUseItems: [
          "Preview locale-specific output without writing formatting code first.",
          "Useful for finance, analytics dashboards, exports, and documentation.",
          "Supports scientific notation and custom decimal precision in one place."
        ]
      }
    },
  {
      slug: "port-reference",
      title: "TCP/UDP Port Reference – Common Port Numbers List",
      description: "Complete reference of common TCP and UDP port numbers. Search by port number or service name. Includes HTTP, HTTPS, SSH, FTP, DNS, databases, and 100+ services.",
      category: "reference",
      relatedTools: [
        "http-status",
        "ip-lookup",
        "user-agent"
      ],
      useCases: [
        "Quickly complete common tcp/udp port reference – common port numbers list tasks in the browser",
        "Verify tcp/udp port reference – common port numbers list results without installing desktop software"
      ],
      faq: [
        {
          q: "Does it include Docker and Kubernetes common ports?",
          a: "Yes — popular container and orchestration tool ports (2376, 6443, 10250, etc.) are included."
        },
        {
          q: "Can two services use the same port number?",
          a: "Only if they use different protocols (one TCP, one UDP). Two TCP services cannot share a port on the same interface."
        },
        {
          q: "What does TCP/UDP Port Reference – Common Port Numbers List do?",
          a: "TCP/UDP Port Reference – Common Port Numbers List runs entirely in your browser and helps you complete this task without uploading data to a server."
        },
        {
          q: "Is TCP/UDP Port Reference – Common Port Numbers List free to use?",
          a: "Yes. This tool is free to use and does not require sign-up."
        }
      ],
      example: {
        input: "Port 22 → SSH (TCP): Secure Shell remote access",
        output: "Port 80 → HTTP (TCP): Web traffic"
      }
    },
  {
      slug: "mime-types",
      title: "MIME Types Reference – File Extension to Content-Type Guide",
      description: "Look up MIME types by file extension or content-type string. Find the correct Content-Type header for HTML, CSS, JS, images, video, audio, fonts, and more.",
      category: "reference",
      relatedTools: [
        "http-status",
        "port-reference",
        "url-encode"
      ],
      useCases: [
        "Quickly complete common mime types reference – file extension to content-type guide tasks in the browser",
        "Verify mime types reference – file extension to content-type guide results without installing desktop software"
      ],
      faq: [
        {
          q: "What MIME type should I use for JSON API responses?",
          a: "Use application/json with charset=utf-8 ."
        },
        {
          q: "What is application/octet-stream used for?",
          a: "It is the generic binary MIME type — browsers treat it as a download prompt when served as a response."
        },
        {
          q: "What does MIME Types Reference – File Extension to Content-Type Guide do?",
          a: "MIME Types Reference – File Extension to Content-Type Guide runs entirely in your browser and helps you complete this task without uploading data to a server."
        },
        {
          q: "Is MIME Types Reference – File Extension to Content-Type Guide free to use?",
          a: "Yes. This tool is free to use and does not require sign-up."
        }
      ],
      example: {
        input: ".pdf → application/pdf",
        output: ".json → application/json"
      }
    },
  {
      slug: "color-contrast-aa",
      title: "WCAG Color Contrast Checker - Batch AA/AAA Test",
      description: "Check color contrast ratios against WCAG AA and AAA standards. Test multiple text/background color pairs at once. Free, browser-based, no data sent.",
      category: "design",
      relatedTools: [
        "color-blindness",
        "color-picker",
        "color-palette"
      ],
      useCases: [
        "Quickly complete common wcag color contrast checker - batch aa/aaa test tasks in the browser",
        "Verify wcag color contrast checker - batch aa/aaa test results without installing desktop software"
      ],
      faq: [
        {
          q: "What is the difference between AA and AAA?",
          a: "AA is the standard compliance level required by most regulations. AAA is enhanced — not required for all content but improves readability."
        },
        {
          q: "Does this check non-text contrast?",
          a: "WCAG 1.4.11 requires 3:1 contrast for UI components and graphical elements — this checker covers that requirement."
        },
        {
          q: "What does WCAG Color Contrast Checker - Batch AA/AAA Test do?",
          a: "WCAG Color Contrast Checker - Batch AA/AAA Test runs entirely in your browser and helps you complete this task without uploading data to a server."
        },
        {
          q: "Is WCAG Color Contrast Checker - Batch AA/AAA Test free to use?",
          a: "Yes. This tool is free to use and does not require sign-up."
        }
      ]
    },
  {
      slug: "aes",
      title: "AES Encrypt & Decrypt Online ? Browser-Based AES Tool",
      description: "Encrypt and decrypt text using AES-256-GCM with a passphrase. Runs entirely in your browser ? no data is sent to any server.",
      category: "encode",
      shortTitle: "AES Encrypt / Decrypt",
      relatedTools: [
        "hmac",
        "hash-generator",
        "base64"
      ],
      useCases: [
        "Encrypt notes, tokens, or payloads locally before sharing them",
        "Test AES-GCM output formats during app or API development",
        "Verify decryption behavior with known ciphertext and passphrase pairs",
        "Demonstrate browser-side symmetric encryption without server calls"
      ],
      faq: [
        {
          q: "What is the difference between AES-CBC and AES-GCM?",
          a: "AES-CBC provides confidentiality only and requires a separate MAC for integrity verification. AES-GCM provides both confidentiality and built-in authentication, making it the preferred choice for new systems."
        },
        {
          q: "Why does the ciphertext change every time I encrypt the same message?",
          a: "A random IV (initialization vector) is generated for each encryption operation. This ensures that identical plaintexts produce different ciphertexts, preventing pattern analysis. The IV is stored alongside the ciphertext and used automatically during decryption."
        },
        {
          q: "How strong is AES-256?",
          a: "AES-256 is considered computationally unbreakable with current technology. A brute-force attack would require more energy than the observable universe could provide ? it is the gold standard for symmetric encryption."
        },
        {
          q: "Can I use this tool to encrypt files?",
          a: "This tool is designed for text encryption. For file encryption, consider dedicated tools. However, you can encrypt Base64-encoded file content if needed."
        }
      ],
      example: {
        input: "Plaintext: \"Secret message\" ? Key: \"mykey\" ? Mode: AES-GCM-256",
        output: "Base64-encoded ciphertext (includes IV + auth tag)"
      },
      seoContent: {
        whatIsTitle: "What is AES Encrypt / Decrypt?",
        whatIsBody: "AES Encrypt / Decrypt uses browser-side AES to protect plaintext with a passphrase and decrypt it again when you need the original content. It is useful for testing encryption flows, understanding IV and authentication tag behavior, and handling short secrets locally without sending them to a server.",
        howToTitle: "How to Use AES Encrypt / Decrypt",
        howToSteps: [
          "Choose whether you want to encrypt plaintext or decrypt ciphertext.",
          "Enter the text and the passphrase you want to use.",
          "Run the conversion and inspect the generated ciphertext or recovered plaintext.",
          "Copy the result for testing, demos, or local workflows."
        ]
      },
      learnMore: {
        title: "Understand AES Encrypt / Decrypt",
        whyUseTitle: "Why Use This Tool",
        whyUseItems: [
          "Useful for validating AES-GCM behavior without setting up backend code.",
          "Helps explain IVs, auth tags, and passphrase-based encryption flows.",
          "Keeps plaintext and keys inside the browser for quick local testing."
        ]
      }
    },
  {
      slug: "base32",
      title: "Base32 Encoder / Decoder Online – RFC 4648 Base32 Free",
      description: "Encode text to Base32 or decode Base32 strings. Supports RFC 4648 and Extended Hex alphabets. Free, browser-based, no data sent.",
      category: "encode",
      relatedTools: [
        "base64",
        "base58",
        "url-encode"
      ],
      useCases: [
        "Decode TOTP secret strings during MFA setup checks",
        "Encode text for systems that prefer Base32 over Base64",
        "Inspect RFC 4648 Base32 payloads from provisioning flows",
        "Verify whether padding and alphabet variants are handled correctly"
      ],
      faq: [
        {
          q: "Why does the output end with \"=\" characters?",
          a: "Base32 encodes data in 5-byte blocks. When the input length is not a multiple of 5, \"=\" padding characters are added to the output to make the total length a multiple of 8. Padding is part of the RFC 4648 standard and required by most decoders."
        },
        {
          q: "Is Base32 the same as Base32Hex?",
          a: "No. RFC 4648 defines two Base32 variants: standard Base32 (A–Z, 2–7) and Base32Hex (0–9, A–V). They encode the same data but use different alphabets. This tool uses the standard Base32 alphabet by default."
        },
        {
          q: "Can I decode a TOTP secret key with this tool?",
          a: "Yes. TOTP secret keys are Base32-encoded strings. You can paste them here to see the raw bytes, but note that this tool outputs decoded text — binary secrets may not display correctly as text."
        },
        {
          q: "Is my data stored or sent anywhere?",
          a: "No. All encoding and decoding happens locally in your browser using JavaScript. Nothing is sent to a server."
        }
      ],
      example: {
        input: "Hello",
        output: "JBSWY3DP"
      },
      shortTitle: "Base32 Encoder / Decoder",
      seoContent: {
        whatIsTitle: "What is Base32?",
        whatIsBody: "Base32 is an encoding format that maps binary data into a restricted alphabet made of letters and digits. It is commonly used in OTP secrets, provisioning strings, and environments where case-insensitive or human-readable encodings are helpful.",
        howToTitle: "How to Use Base32 Encoder / Decoder",
        howToSteps: [
          "Paste the text or Base32 string you want to convert.",
          "Choose whether to encode or decode.",
          "Check whether padding or alphabet rules match your target system.",
          "Copy the converted result for use in your app or workflow."
        ]
      },
      learnMore: {
        title: "Understand Base32",
        whyUseTitle: "Why Use This Tool",
        whyUseItems: [
          "Helpful for TOTP secrets, provisioning codes, and RFC 4648 compatibility checks.",
          "Makes it easy to inspect padding and Base32 alphabet behavior.",
          "Runs locally in the browser without sending encoded content anywhere."
        ]
      }
    },
  {
      slug: "base58",
      title: "Base58 Encoder / Decoder Online – Bitcoin & IPFS Format",
      description: "Free online Base58 encoder and decoder. Supports Bitcoin, Flickr, and Ripple alphabets. Encode text to Base58 or decode Base58 strings in your browser.",
      category: "encode",
      relatedTools: [
        "base64",
        "base32",
        "hash-generator"
      ],
      useCases: [
        "Inspect Base58 strings used in crypto and content-addressed systems",
        "Encode values without visually ambiguous characters like 0/O/I/l",
        "Check whether a payload is plain Base58 or Base58Check",
        "Decode identifiers from Bitcoin-style or IPFS-style workflows"
      ],
      faq: [
        {
          q: "Is this Bitcoin's Base58Check?",
          a: "No — this is standard Base58 without checksum. Bitcoin's Base58Check adds a 4-byte SHA256d checksum."
        },
        {
          q: "Why not just use Base64?",
          a: "Base58 omits ambiguous characters (0/O and I/l) that are identical in many fonts, reducing manual copy errors."
        },
        {
          q: "What does Base58 Encoder / Decoder Online – Bitcoin & IPFS Format do?",
          a: "Base58 Encoder / Decoder Online – Bitcoin & IPFS Format runs entirely in your browser and helps you complete this task without uploading data to a server."
        },
        {
          q: "Is Base58 Encoder / Decoder Online – Bitcoin & IPFS Format free to use?",
          a: "Yes. This tool is free to use and does not require sign-up."
        }
      ],
      example: {
        input: "Encode: Hello World → Base58: JxF12TrwUP45BMd",
        output: "Bitcoin address example: 1A1zP1eP5QGefi2DMPTfTL5SLmv7Divf"
      },
      shortTitle: "Base58 Encoder / Decoder",
      seoContent: {
        whatIsTitle: "What is Base58?",
        whatIsBody: "Base58 is a compact text encoding that removes confusing characters such as 0, O, I, and l. It is often used in cryptocurrency addresses, content identifiers, and systems where humans may need to read or retype the encoded value.",
        howToTitle: "How to Use Base58 Encoder / Decoder",
        howToSteps: [
          "Paste the text or Base58 string into the input area.",
          "Choose encode or decode.",
          "Confirm which alphabet or ecosystem the string belongs to if needed.",
          "Copy the converted result for further processing."
        ]
      },
      learnMore: {
        title: "Understand Base58",
        whyUseTitle: "Why Use This Tool",
        whyUseItems: [
          "Useful for crypto-related strings and human-readable identifiers.",
          "Reduces confusion caused by visually similar characters.",
          "Helps confirm whether a string is plain Base58 or needs checksum handling."
        ]
      }
    },
  {
      slug: "bcrypt",
      title: "Bcrypt Hash Generator &amp; Verifier Online ? Secure Password Hashing Free",
      description: "Generate and verify bcrypt password hashes in browser",
      category: "encode",
      shortTitle: "Bcrypt Hash Generator / Verifier",
      relatedTools: [
        "hash-generator",
        "password-generator",
        "base64"
      ],
      useCases: [
        "Generate bcrypt hashes for authentication demos and test fixtures",
        "Verify whether a plaintext password matches an existing bcrypt hash",
        "Compare the effect of different cost factors on browser-side hashing speed",
        "Teach the difference between password hashing and general-purpose hashing"
      ],
      faq: [
        {
          q: "Is this safe to use with real passwords?",
          a: "This tool runs entirely in your browser ? nothing is transmitted. Still, avoid testing production credentials in any online tool as a precaution."
        },
        {
          q: "What is the $2a$ prefix?",
          a: "It is the bcrypt version identifier. $2a$, $2b$, and $2y$ are all valid bcrypt variants; $2b$ is the current standard."
        },
        {
          q: "What does Bcrypt Hash Generator &amp; Verifier Online ? Secure Password Hashing Free do?",
          a: "Bcrypt Hash Generator &amp; Verifier Online ? Secure Password Hashing Free runs entirely in your browser and helps you complete this task without uploading data to a server."
        },
        {
          q: "Is Bcrypt Hash Generator &amp; Verifier Online ? Secure Password Hashing Free free to use?",
          a: "Yes. This tool is free to use and does not require sign-up."
        }
      ],
      example: {
        input: "Password: mySecret123 at cost 10",
        output: "Hash: $2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy"
      },
      seoContent: {
        whatIsTitle: "What is Bcrypt Hash Generator / Verifier?",
        whatIsBody: "This tool creates bcrypt password hashes and checks whether a plaintext input matches an existing bcrypt string. It is useful for login flow testing, password migration checks, and explaining why bcrypt is better suited to passwords than fast hash algorithms like MD5 or SHA-256.",
        howToTitle: "How to Use Bcrypt Hash Generator / Verifier",
        howToSteps: [
          "Enter the password you want to hash or verify.",
          "Choose the cost factor if you are generating a new bcrypt hash.",
          "Generate the hash or paste an existing bcrypt string to verify against it.",
          "Copy the resulting hash or review the match result."
        ]
      },
      learnMore: {
        title: "Understand Bcrypt Hash Generator / Verifier",
        whyUseTitle: "Why Use This Tool",
        whyUseItems: [
          "Good for authentication demos, fixtures, and password migration checks.",
          "Makes bcrypt cost factors and verification behavior easier to understand.",
          "Runs locally so plaintext passwords are not uploaded during testing."
        ]
      }
    },
  {
      slug: "binary-text",
      title: "Binary to Text Converter Online – ASCII Binary Free",
      description: "Convert text to binary and binary back to text. Supports space, newline, and no-delimiter formats. Fast, browser-based, no data uploaded.",
      category: "encode",
      relatedTools: [
        "base64",
        "number-base",
        "hash-generator"
      ],
      useCases: [
        "Translate ASCII text into binary for teaching or debugging",
        "Decode binary byte groups copied from documentation or packet dumps",
        "Understand how characters map to bits and bytes",
        "Verify delimiter handling for binary strings with or without spaces"
      ],
      faq: [
        {
          q: "Does it support Unicode characters?",
          a: "Basic ASCII (0–127) is fully supported. Extended UTF-8 characters are encoded as multi-byte binary sequences."
        },
        {
          q: "Why are there spaces between groups?",
          a: "Spaces separate bytes for readability — the converter accepts binary with or without spaces."
        },
        {
          q: "What does Binary to Text Converter Online – ASCII Binary Free do?",
          a: "Binary to Text Converter Online – ASCII Binary Free runs entirely in your browser and helps you complete this task without uploading data to a server."
        },
        {
          q: "Is Binary to Text Converter Online – ASCII Binary Free free to use?",
          a: "Yes. This tool is free to use and does not require sign-up."
        }
      ],
      example: {
        input: "Text → Binary:",
        output: "Hi → 01001000 01101001"
      },
      shortTitle: "Binary to Text Converter",
      seoContent: {
        whatIsTitle: "What is Binary to Text Converter?",
        whatIsBody: "This tool converts plain text into binary byte sequences and converts binary input back into text. It is useful for learning character encoding basics, debugging byte-level data, and checking ASCII-oriented binary strings.",
        howToTitle: "How to Use Binary to Text Converter",
        howToSteps: [
          "Paste text when you want to see its binary byte representation.",
          "Paste binary when you want to decode it back to text.",
          "Choose spacing or delimiter preferences if the tool provides them.",
          "Copy the converted result for teaching, debugging, or documentation."
        ]
      },
      learnMore: {
        title: "Understand Binary to Text Converter",
        whyUseTitle: "Why Use This Tool",
        whyUseItems: [
          "Good for teaching bytes, bits, ASCII, and simple encoding concepts.",
          "Useful when inspecting binary snippets in docs, logs, or tutorials.",
          "Lets you switch between text and binary without leaving the browser."
        ]
      }
    },
  {
      slug: "blur-image",
      title: "Blur Image Online Free – Apply Gaussian Blur Effect",
      description: "Apply a blur effect to images online for free. Adjust blur intensity, download as JPEG or PNG. Blur faces, backgrounds, or sensitive info. No upload — runs in your browser.",
      category: "image",
      relatedTools: [
        "grayscale-image",
        "image-rotate",
        "remove-exif"
      ],
      useCases: [
        "Blur entire photos before sharing to protect privacy of people in the background",
        "Create a softly blurred background image for website or app hero sections",
        "Apply a dreamy, romantic blur effect to portrait photos",
        "Blur screenshot thumbnails to tease content without revealing details",
        "Soften overly sharp or noisy photos from low-light conditions"
      ],
      faq: [
        {
          q: "Can I blur only part of the image (e.g., just a face)?",
          a: "This tool applies blur to the entire image. For selective/regional blurring, you would need image editing software (e.g., GIMP, Photoshop, Canva) that supports layer masks or selection tools. However, this tool is useful for blurring background images entirely or applying an artistic blur to the whole photo."
        },
        {
          q: "What blur radius should I use for privacy purposes?",
          a: "For effective privacy blur that obscures recognizable details (faces, license plates, screen content), a radius of 20–40px is recommended. The \"Privacy\" preset at 30px provides strong anonymization for most images."
        },
        {
          q: "Does blurring an image reduce file size?",
          a: "Often yes — blurred images have less detail and more uniform color areas, which makes JPEG compression more effective. A heavily blurred image can be 30–50% smaller than the original at the same quality setting."
        },
        {
          q: "Can I undo the blur?",
          a: "Once downloaded, blur cannot be reversed — blurring permanently destroys the image detail in those areas. The original file in your browser is not modified; just reload the page and upload the original again."
        }
      ],
      example: {
        input: "Blur a group photo to protect the identity of people in the background:",
        output: "For precise face blurring (only blur part of the image), use the Medium preset (8px) to soften the whole image, or use image editing software for selective blur."
      }
    },
  {
      slug: "chmod-calculator",
      title: "chmod Calculator Online – Linux File Permission Generator",
      description: "Free online chmod calculator. Select Unix file permissions visually, get octal and symbolic notation instantly. Supports owner, group, and others read/write/execute.",
      category: "reference",
      shortTitle: "chmod Calculator",
      relatedTools: [
        "hash-generator",
        "password-generator",
        "aes"
      ],
      useCases: [
        "Translate symbolic permissions into octal chmod values",
        "Check common file and directory permission presets like 644 and 755",
        "Teach Linux permissions visually to teammates or students",
        "Generate ready-to-run chmod commands for deployment tasks"
      ],
      faq: [
        {
          q: "Does it support special bits (setuid, sticky)?",
          a: "Yes — setuid (4000), setgid (2000), and sticky bit (1000) can be toggled."
        },
        {
          q: "What does execute permission mean for a directory?",
          a: "Execute on a directory means the ability to cd into it and access its contents."
        },
        {
          q: "What does chmod Calculator Online – Linux File Permission Generator do?",
          a: "chmod Calculator Online – Linux File Permission Generator runs entirely in your browser and helps you complete this task without uploading data to a server."
        },
        {
          q: "Is chmod Calculator Online – Linux File Permission Generator free to use?",
          a: "Yes. This tool is free to use and does not require sign-up."
        }
      ],
      example: {
        input: "Checked: Owner rwx, Group r-x, Others r-x → 755 (rwxr-xr-x)",
        output: "Command: chmod 755 filename"
      },
      seoContent: {
        whatIsTitle: "What is Chmod Permission Calculator?",
        whatIsBody: "This tool converts Linux and Unix file permission selections into octal values and symbolic notation. It helps you understand what permission sets like 644, 755, and 600 actually mean before you run chmod.",
        howToTitle: "How to Use Chmod Permission Calculator",
        howToSteps: [
          "Toggle read, write, and execute permissions for owner, group, and others.",
          "Watch the octal value and symbolic string update in real time.",
          "Optionally type an octal value to reverse-calculate the permission layout.",
          "Copy the generated chmod command when you are ready to use it."
        ]
      },
      learnMore: {
        title: "Understand Chmod Permission Calculator",
        useCasesTitle: "Common Permission Values",
        whyUseTitle: "Why Use This Tool",
        whyUseItems: [
          "Helps you avoid memorizing octal permission math.",
          "Makes directory and file permissions easier to explain visually.",
          "Useful for server setup, SSH keys, deploy scripts, and Linux onboarding."
        ]
      }
    },
  {
      slug: "color-converter",
      title: "Color Format Converter Online – HEX, RGB, HSL & OKLCH",
      description: "Convert colors between HEX, RGB, HSL, and CMYK formats instantly. Visual color picker included. Free, browser-based, no data uploaded.",
      category: "design",
      relatedTools: [
        "color-picker",
        "color-palette",
        "contrast-checker"
      ],
      useCases: [
        "Quickly complete common color format converter online – hex, rgb, hsl & oklch tasks in the browser",
        "Verify color format converter online – hex, rgb, hsl & oklch results without installing desktop software"
      ],
      faq: [
        {
          q: "Does it support CSS oklch() and lab()?",
          a: "This tool converts between traditional color spaces. CSS oklch/lab require a dedicated perceptual color converter."
        },
        {
          q: "How accurate is the CMYK conversion?",
          a: "The conversion uses the sRGB → CMYK formula. For print production, use a ICC-profile-aware tool."
        },
        {
          q: "What does Color Format Converter Online – HEX, RGB, HSL & OKLCH do?",
          a: "Color Format Converter Online – HEX, RGB, HSL & OKLCH runs entirely in your browser and helps you complete this task without uploading data to a server."
        },
        {
          q: "Is Color Format Converter Online – HEX, RGB, HSL & OKLCH free to use?",
          a: "Yes. This tool is free to use and does not require sign-up."
        }
      ]
    },
  {
      slug: "color-palette",
      title: "Color Palette Generator Online – Create & Extract Palettes",
      description: "Generate beautiful color palettes from a base color. Choose complementary, analogous, triadic, or monochromatic schemes and export as CSS, HEX, or JSON.",
      category: "design",
      relatedTools: [
        "color-picker",
        "gradient-generator",
        "contrast-checker"
      ],
      useCases: [
        "Quickly complete common color palette generator online – create & extract palettes tasks in the browser",
        "Verify color palette generator online – create & extract palettes results without installing desktop software"
      ],
      faq: [
        {
          q: "How do I pick the right harmony type?",
          a: "Use complementary for bold, high-contrast designs. Use analogous for soft, cohesive UI themes. Use triadic when you need three balanced accent colors. Use monochromatic when simplicity and elegance are the priority."
        },
        {
          q: "Does the palette check contrast for accessibility?",
          a: "This tool focuses on color harmony generation. For WCAG contrast checking, use the Contrast Checker or WCAG AA Checker tools on this site."
        },
        {
          q: "Can I export the palette to Figma or CSS?",
          a: "Yes — use the CSS export format to get ready-to-paste CSS custom properties, or copy HEX values individually to paste into any design tool."
        },
        {
          q: "What is the monochromatic count slider for?",
          a: "When using the Monochromatic type, you can control how many tints and shades are generated (3–10). This gives you a fine-grained grayscale or tinted scale to work with."
        }
      ],
      example: {
        input: "Generating a complementary palette from a base blue color:",
        output: "The complementary color sits directly opposite on the color wheel, creating a high-contrast, vibrant pairing."
      }
    },
  {
      slug: "compress-to-100kb",
      title: "Compress Image to 100KB Online Free – Target File Size Compressor",
      description: "Compress images to a specific file size (100KB, 50KB, 200KB, or any size) online for free. Auto-adjusts quality to hit your target. No upload — runs entirely in your browser.",
      category: "image",
      relatedTools: [
        "image-compressor",
        "image-resizer",
        "webp-converter"
      ],
      useCases: [
        "Compress profile photos to fit government portals with 100KB or 200KB limits",
        "Reduce image size for job application systems that reject large uploads",
        "Prepare photos for email attachments with strict size limits",
        "Compress images for web hosting plans with bandwidth constraints",
        "Reduce image sizes for bulk upload to cloud storage or CMS systems"
      ],
      faq: [
        {
          q: "What if the image can't be compressed to my target size?",
          a: "If the target is extremely small (e.g., 10KB for a high-resolution photo), the tool will compress to the lowest quality possible and show \"Best effort — target not fully met.\" In that case, try resizing the image dimensions first using the Image Resizer , then compressing."
        },
        {
          q: "How does the binary search algorithm work?",
          a: "The algorithm starts at quality 50%, checks if the output is above or below the target, then halves the search range: if too large, try lower quality; if small enough, try higher quality. After ~15 iterations it converges to the highest quality that produces a file within your target size."
        },
        {
          q: "Why does the output size sometimes exceed the target by a few KB?",
          a: "JPEG compression is not perfectly predictable — the actual output size depends on image complexity. The algorithm tries to get as close as possible while staying under the target, but final blob size may vary by 1–3 KB. If strict compliance is required, set your target slightly lower (e.g., 95KB instead of 100KB)."
        },
        {
          q: "Should I use JPEG or WebP to achieve the smallest file?",
          a: "WebP generally produces smaller files at the same visual quality. Use WebP if the platform you're uploading to supports it. Use JPEG for maximum compatibility with older systems and image editors."
        }
      ],
      example: {
        input: "Compress a 4MB vacation photo to fit within a government form's 100KB limit:",
        output: "The algorithm automatically finds the highest quality that still meets your constraint."
      }
    },
  {
      slug: "contrast-checker",
      title: "WCAG Contrast Checker Online – AA &amp; AAA Accessibility Test",
      description: "Check color contrast ratio for WCAG AA and AAA accessibility compliance. Instantly verify foreground and background color combinations for normal text, large text, and UI components.",
      category: "design",
      relatedTools: [
        "color-picker",
        "gradient-generator",
        "color-palette"
      ],
      useCases: [
        "Quickly complete common wcag contrast checker online – aa &amp; aaa accessibility test tasks in the browser",
        "Verify wcag contrast checker online – aa &amp; aaa accessibility test results without installing desktop software"
      ],
      faq: [
        {
          q: "What is the difference between AA and AAA contrast levels?",
          a: "WCAG AA requires a 4.5:1 ratio for normal text and 3:1 for large text — the standard legal requirement. AAA requires 7:1 for normal text and 4.5:1 for large text, providing enhanced accessibility for users with severe low vision."
        },
        {
          q: "Does this check non-text contrast (icons, borders)?",
          a: "Yes — WCAG 1.4.11 (Non-text Contrast) requires 3:1 for UI components and graphical elements. The AA UI Components result in the table covers this requirement."
        },
        {
          q: "My colors pass AA but fail AAA — do I need to fix them?",
          a: "AAA compliance is not required for all content. WCAG AA is the standard legal requirement in most jurisdictions. Aim for AAA where possible, but AA is sufficient for legal compliance."
        },
        {
          q: "What counts as large text?",
          a: "WCAG defines large text as 18pt (24px) or larger for regular weight, or 14pt (approximately 18.67px) or larger for bold text. Large text has a lower contrast requirement (3:1 for AA) because it is inherently easier to read."
        }
      ],
      example: {
        input: "Checking medium grey text on a white background:",
        output: "Result: passes AA for large text (≥ 3:1), but fails AA for normal text (requires 4.5:1). Darken the grey slightly to pass all AA levels."
      }
    },
  {
      slug: "countdown",
      title: "Countdown Timer Online – Free Customizable Countdown",
      description: "Create countdown timers to any future date and time. Share or bookmark your countdown. Free, runs entirely in your browser.",
      category: "convert",
      shortTitle: "Countdown Timer",
      relatedTools: [
        "date-calculator",
        "timestamp",
        "timezone-converter"
      ],
      useCases: [
        "Product launches — display a live countdown to a product release or pre-order deadline.",
        "Event planning — count down to a wedding, conference, or birthday.",
        "Project deadlines — track how much time remains before a sprint end or submission cutoff.",
        "New Year / holidays — classic countdown to midnight or a public holiday.",
        "Study sessions — set a target exam date and monitor progress day by day."
      ],
      faq: [
        {
          q: "What happens when the countdown reaches zero?",
          a: "When the target date and time is reached, the timer stops and displays a completion message. No alarm or notification is triggered by default."
        },
        {
          q: "Can I count down to a specific time, not just a date?",
          a: "Yes. The tool accepts both a date and a time, so you can count down to the exact hour, minute, and second of your event."
        },
        {
          q: "Will the countdown keep running if I leave the tab?",
          a: "The countdown is based on the difference between the target time and the current time, so it will always show the correct remaining time when you return to the tab — even after hours away."
        },
        {
          q: "Does the countdown account for my local time zone?",
          a: "Yes. The tool uses your browser's local time, so the countdown is relative to your device's current time zone. Use the Timezone Converter tool if you need to target a specific time in another region."
        }
      ],
      example: {
        input: "Target: 2025-01-01 00:00:00",
        output: "120 days · 5 hours · 30 minutes · 12 seconds (live)"
      },
      seoContent: {
        whatIsTitle: "What is Countdown Timer?",
        whatIsBody: "Countdown Timer tracks the exact time remaining until a future event. It updates live in the browser so you can count down to launches, holidays, deadlines, and milestones without refreshing the page.",
        howToTitle: "How to Use Countdown Timer",
        howToSteps: [
          "Enter an event name if you want a custom label.",
          "Choose the future date and time you are counting down to.",
          "Start the timer and watch days, hours, minutes, and seconds update live.",
          "Keep the page open or return later to see the remaining time."
        ]
      },
      learnMore: {
        title: "Understand Countdown Timer (examples, use cases & FAQs)",
        whyUseTitle: "Why Use This Tool",
        whyUseItems: [
          "Shows a live breakdown by days, hours, minutes, and seconds.",
          "Useful for launches, exams, events, deadlines, and holiday timers.",
          "Runs locally in the browser with no account or server dependency."
        ]
      }
    },
  {
      slug: "css-formatter",
      title: "CSS Formatter &amp; Minifier Online – Beautify or Compress CSS Free",
      description: "Format and minify CSS code instantly. Beautify compressed CSS for readability or minify for production. Free, browser-based, no data sent.",
      category: "format",
      relatedTools: [
        "css-minifier",
        "js-formatter",
        "html-formatter"
      ],
      useCases: [
        "Unminifying a third-party stylesheet to understand its structure and selectors.",
        "Cleaning up CSS generated by a design tool or CSS-in-JS framework.",
        "Preparing code for a code review where readability matters.",
        "Debugging layout issues by inspecting expanded property values.",
        "Learning CSS by reading well-formatted example stylesheets."
      ],
      faq: [
        {
          q: "Does formatting change the behavior of my CSS?",
          a: "No. Adding whitespace and line breaks to CSS has no effect on how browsers parse and apply the styles. The formatted output is functionally identical to the original."
        },
        {
          q: "Can I format CSS that includes vendor prefixes?",
          a: "Yes. Vendor-prefixed properties like -webkit-transform or -moz-appearance are treated as standard properties and formatted normally."
        },
        {
          q: "Does it handle SCSS or Less syntax?",
          a: "The formatter is optimized for standard CSS. SCSS/Less-specific syntax like nesting or variables may not format correctly; use a dedicated SCSS/Less formatter for those files."
        },
        {
          q: "Should I format CSS before using it in production?",
          a: "No — in production you should minify CSS to reduce file size. Use the CSS Formatter during development and code review, then minify before deploying."
        }
      ],
      example: {
        input: ".card{display:flex;padding:16px;background:#fff;border-radius:8px}",
        output: ".card {\\n display: flex;\\n padding: 16px;\\n background: #fff;\\n border-radius: 8px;\\n}"
      }
    },
  {
      slug: "diff-viewer",
      title: "Text Diff Viewer Online – Compare Two Texts Side by Side",
      description: "Compare two texts and see differences highlighted. Line, word, and character-level diff. Great for comparing configs, code, or documents. Free, browser-based.",
      category: "text",
      relatedTools: [
        "regex-tester",
        "markdown-preview",
        "json-formatter"
      ],
      useCases: [
        "Quickly complete common text diff viewer online – compare two texts side by side tasks in the browser",
        "Verify text diff viewer online – compare two texts side by side results without installing desktop software"
      ],
      faq: [
        {
          q: "Can I ignore whitespace differences?",
          a: "Yes — enable the \"Ignore whitespace\" toggle to ignore leading/trailing spaces and line-ending differences."
        },
        {
          q: "Is there a size limit?",
          a: "The viewer handles files up to several thousand lines comfortably in-browser."
        },
        {
          q: "What does Text Diff Viewer Online – Compare Two Texts Side by Side do?",
          a: "Text Diff Viewer Online – Compare Two Texts Side by Side runs entirely in your browser and helps you complete this task without uploading data to a server."
        },
        {
          q: "Is Text Diff Viewer Online – Compare Two Texts Side by Side free to use?",
          a: "Yes. This tool is free to use and does not require sign-up."
        }
      ],
      example: {
        input: "Original: Hello world",
        output: "Revised: Hello there"
      }
    },
  {
      slug: "gradient-generator",
      title: "CSS Gradient Generator Online – Linear, Radial & Conic",
      description: "Create and preview CSS linear and radial gradients. Add color stops, choose direction, and copy ready-to-use CSS code instantly.",
      category: "design",
      relatedTools: [
        "color-palette",
        "color-picker",
        "contrast-checker"
      ],
      useCases: [
        "Quickly complete common css gradient generator online – linear, radial & conic tasks in the browser",
        "Verify css gradient generator online – linear, radial & conic results without installing desktop software"
      ],
      faq: [
        {
          q: "Do I need vendor prefixes like -webkit-linear-gradient?",
          a: "No — all modern browsers (Chrome, Firefox, Safari, Edge) support unprefixed CSS gradients. Vendor prefixes are only needed for very old browsers (IE 9 and below)."
        },
        {
          q: "Can I use transparent color stops?",
          a: "Yes — use rgba() or hsla() colors with an alpha value of 0 to create fades to transparent. For example: rgba(99, 102, 241, 0) fades the indigo to invisible."
        },
        {
          q: "Can I use this gradient on text?",
          a: "Yes — copy the gradient value and use it with CSS properties: background: linear-gradient(...); -webkit-background-clip: text; -webkit-text-fill-color: transparent;"
        },
        {
          q: "What is the maximum number of color stops?",
          a: "This tool supports up to 6 color stops. CSS itself has no hard limit — browsers support gradients with dozens of stops, though performance may vary."
        }
      ],
      example: {
        input: "Linear, 90°, stops: #6366F1 → #8B5CF6",
        output: "background: linear-gradient(90deg, #6366F1, #8B5CF6);"
      }
    },
  {
      slug: "grayscale-image",
      title: "Grayscale Image Converter Online Free – Convert Photo to Black &amp; White",
      description: "Convert images to grayscale or black and white online for free. Adjust intensity, download as JPEG or PNG. No upload — runs entirely in your browser.",
      category: "image",
      relatedTools: [
        "image-rotate",
        "webp-converter",
        "image-compressor"
      ],
      useCases: [
        "Create black-and-white artistic photos for social media or portfolios",
        "Prepare grayscale images for printing on black-and-white printers",
        "Convert scanned documents to high-contrast black and white for OCR",
        "Reduce color noise in photos taken in low light",
        "Apply a partial grayscale effect (adjust intensity < 100%) for a muted color look"
      ],
      faq: [
        {
          q: "What is the difference between Grayscale and Black & White mode?",
          a: "Grayscale converts each pixel to a shade of gray based on its luminance — you get the full tonal range from pure black to pure white with all the gray shades in between. Black & White mode applies a threshold: pixels brighter than the threshold become pure white, and darker pixels become pure black. B&W is better for text, documents, and graphic art; Grayscale is better for photos."
        },
        {
          q: "Will my image look the same after converting to grayscale?",
          a: "Visually yes — the shapes, edges, and tones are all preserved. Only the color information is removed. The image will look like a classic black-and-white photo."
        },
        {
          q: "Can I use partial intensity to get a vintage or desaturated look?",
          a: "Yes. Set the Intensity slider below 100% to blend between the original color and full grayscale. At 50%, the image will appear muted/faded. This is useful for vintage effects or subtle toning."
        },
        {
          q: "Which output format should I use?",
          a: "JPEG is recommended for photos — it produces smaller files. PNG is better when you need lossless output (e.g., for logos or documents where sharp edges matter)."
        }
      ]
    },
  {
      slug: "hmac",
      title: "HMAC Generator Online ? SHA-256 & SHA-512 Authentication",
      description: "Generate HMAC signatures with SHA-256, SHA-1, SHA-384, or SHA-512. Enter a message and secret key. Output as HEX or Base64. 100% browser-based.",
      category: "encode",
      shortTitle: "HMAC Generator",
      relatedTools: [
        "hash-generator",
        "base64",
        "jwt-decoder"
      ],
      useCases: [
        "Create request signatures for API, webhook, or callback testing",
        "Compare HMAC output across SHA-256, SHA-384, and SHA-512 variants",
        "Verify whether two systems agree on message signing inputs and secrets",
        "Generate HEX or Base64 signatures during development without backend setup"
      ],
      faq: [
        {
          q: "What is the difference between HMAC-SHA256 and plain SHA-256?",
          a: "SHA-256 hashes data without a key ? anyone can reproduce it. HMAC requires a shared secret key, providing authentication in addition to integrity."
        },
        {
          q: "Is SHA-1 HMAC still secure?",
          a: "HMAC-SHA1 is considered weak for new systems. Use HMAC-SHA256 or HMAC-SHA512 for new implementations."
        },
        {
          q: "What does HMAC Generator Online ? SHA-256 & SHA-512 Authentication do?",
          a: "HMAC Generator Online ? SHA-256 & SHA-512 Authentication runs entirely in your browser and helps you complete this task without uploading data to a server."
        },
        {
          q: "Is HMAC Generator Online ? SHA-256 & SHA-512 Authentication free to use?",
          a: "Yes. This tool is free to use and does not require sign-up."
        }
      ],
      example: {
        input: "Message: hello | Key: secret | Algorithm: HMAC-SHA256",
        output: "Hex: 88aab3ede8d3adf94d26ab90d3bafd4a2083070c3bcce9c014ee04a443847c0b"
      },
      seoContent: {
        whatIsTitle: "What is HMAC Generator?",
        whatIsBody: "HMAC Generator creates keyed signatures from a message and secret using algorithms such as SHA-256 or SHA-512. It is commonly used for webhook verification, signed API requests, and any workflow where the receiver needs to confirm both integrity and shared-secret authentication.",
        howToTitle: "How to Use HMAC Generator",
        howToSteps: [
          "Paste the message or payload you want to sign.",
          "Enter the shared secret key used by your system.",
          "Choose the HMAC algorithm and output format.",
          "Generate the signature and compare it with the value from your API or webhook flow."
        ]
      },
      learnMore: {
        title: "Understand HMAC Generator",
        whyUseTitle: "Why Use This Tool",
        whyUseItems: [
          "Useful for debugging webhook signatures and signed API headers.",
          "Lets you compare multiple HMAC algorithms and output encodings quickly.",
          "Avoids backend setup when you only need a local signature check."
        ]
      }
    },
  {
      slug: "html-formatter",
      title: "HTML Formatter & Minifier Online – Beautify or Compress HTML",
      description: "Format and minify HTML code online with customizable indentation. Free browser-based HTML beautifier and minifier.",
      category: "format",
      relatedTools: [
        "css-formatter",
        "js-formatter",
        "html-entities"
      ],
      useCases: [
        "Debugging minified HTML received from a CDN or build pipeline.",
        "Reading and understanding third-party HTML templates before integrating them.",
        "Cleaning up HTML generated by a WYSIWYG editor or CMS export.",
        "Code reviews — formatted HTML makes structural issues immediately visible.",
        "Learning HTML structure by inspecting well-indented examples."
      ],
      faq: [
        {
          q: "Does HTML Formatter validate my HTML?",
          a: "The formatter focuses on indentation and readability. It will process malformed HTML as best it can, but it is not a strict validator. Use a dedicated validator if you need spec-compliance checking."
        },
        {
          q: "Will formatting change the rendered output of my page?",
          a: "No. Adding whitespace between block elements does not change visual rendering. Be cautious with inline elements like <span> inside text where whitespace can matter — the formatter preserves inline content."
        },
        {
          q: "Can I format a full HTML document with <!DOCTYPE> and <head>?",
          a: "Yes. The formatter handles complete documents including doctype declarations, head sections, scripts, and styles without stripping any content."
        },
        {
          q: "Is there a file size limit?",
          a: "There is no server-side limit because everything runs in your browser. Very large files (hundreds of KB) may take a moment to process depending on your device."
        }
      ],
      example: {
        input: "<div><p>Hello</p><ul><li>Item</li></ul></div>",
        output: "<div>\\n <p>Hello</p>\\n <ul>\\n <li>Item</li>\\n </ul>\\n</div>"
      }
    },
  {
      slug: "http-status",
      title: "HTTP Status Codes Reference – Complete List with Descriptions",
      description: "Complete reference of HTTP status codes with descriptions",
      category: "reference",
      relatedTools: [
        "url-encode",
        "json-formatter",
        "jwt-decoder"
      ],
      useCases: [
        "Quickly complete common http status codes reference – complete list with descriptions tasks in the browser",
        "Verify http status codes reference – complete list with descriptions results without installing desktop software"
      ],
      faq: [
        {
          q: "When should I use 301 vs 302?",
          a: "Use 301 (Moved Permanently) for permanent URL changes — search engines update their index. Use 302 for temporary redirects."
        },
        {
          q: "What is the difference between 401 and 403?",
          a: "401 Unauthorized means authentication is required. 403 Forbidden means authenticated but not allowed."
        },
        {
          q: "What does HTTP Status Codes Reference – Complete List with Descriptions do?",
          a: "HTTP Status Codes Reference – Complete List with Descriptions runs entirely in your browser and helps you complete this task without uploading data to a server."
        },
        {
          q: "Is HTTP Status Codes Reference – Complete List with Descriptions free to use?",
          a: "Yes. This tool is free to use and does not require sign-up."
        }
      ],
      example: {
        input: "200 OK : Request succeeded, response body contains the result.",
        output: "404 Not Found : Server cannot find the requested resource."
      }
    },
  {
      slug: "image-rotate",
      title: "Rotate Image Online Free – Rotate &amp; Flip Photos",
      description: "Rotate and flip images online for free. Rotate 90°, 180°, 270°, flip horizontally or vertically. Download as JPEG or PNG instantly. No upload — runs in your browser.",
      category: "image",
      relatedTools: [
        "image-resizer",
        "webp-converter",
        "image-compressor"
      ],
      useCases: [
        "Fix photos taken sideways or upside down on a phone or camera",
        "Mirror a selfie so text in the background reads correctly",
        "Rotate scanned documents to the correct reading orientation",
        "Flip product images horizontally for consistent e-commerce layouts",
        "Correct orientation before uploading to social media or websites"
      ],
      faq: [
        {
          q: "Why does my photo look sideways even after uploading to websites?",
          a: "Many cameras and phones store rotation information in EXIF metadata rather than physically rotating the pixels. Some websites ignore EXIF orientation data. This tool physically rotates the pixels, producing a file that displays correctly everywhere regardless of EXIF support."
        },
        {
          q: "Does rotating lose image quality?",
          a: "For 90° and 180° rotations, the pixel data is rearranged without any resampling — no quality is lost for PNG output. For JPEG output, re-encoding applies JPEG compression, which may introduce minor quality changes. Use PNG output for pixel-perfect lossless rotation."
        },
        {
          q: "Can I undo a rotation?",
          a: "Yes — clicking 90° CW four times returns to the original orientation. Or click 90° CCW to reverse a clockwise rotation. Reload the page to start fresh."
        },
        {
          q: "What is the difference between flip horizontal and flip vertical?",
          a: "Flip horizontal mirrors the image left-to-right (like a mirror). Flip vertical mirrors it top-to-bottom (upside down). Both can be combined with rotation for any orientation."
        }
      ],
      example: {
        input: "Fix a sideways phone photo taken in landscape mode:",
        output: "The canvas preview updates instantly so you can confirm the orientation before downloading."
      }
    },
  {
      slug: "ip-lookup",
      title: "IP Address Lookup &amp; Geolocation Online – Free IP Info Tool",
      description: "Look up IP address geolocation and network information",
      category: "reference",
      relatedTools: [
        "url-encode",
        "http-status",
        "json-formatter"
      ],
      useCases: [
        "Quickly complete common ip address lookup &amp; geolocation online – free ip info tool tasks in the browser",
        "Verify ip address lookup &amp; geolocation online – free ip info tool results without installing desktop software"
      ],
      faq: [
        {
          q: "Is GeoIP precise enough to find a home address?",
          a: "No — city-level accuracy means within 25–50 km. GeoIP is never precise enough for individual location tracking."
        },
        {
          q: "Does it work with IPv6?",
          a: "Yes — both IPv4 and IPv6 addresses are supported."
        },
        {
          q: "What does IP Address Lookup &amp; Geolocation Online – Free IP Info Tool do?",
          a: "IP Address Lookup &amp; Geolocation Online – Free IP Info Tool runs entirely in your browser and helps you complete this task without uploading data to a server."
        },
        {
          q: "Is IP Address Lookup &amp; Geolocation Online – Free IP Info Tool free to use?",
          a: "Yes. This tool is free to use and does not require sign-up."
        }
      ]
    },
  {
      slug: "jpg-to-png",
      title: "JPG to PNG Converter Online Free – Convert JPEG to PNG",
      description: "Convert JPG/JPEG images to PNG online for free. Drag and drop any JPEG, get a lossless PNG instantly. 100% client-side — your images are never uploaded.",
      category: "image",
      relatedTools: [
        "png-to-jpg",
        "webp-converter",
        "image-compressor"
      ],
      useCases: [
        "Convert JPEG screenshots or photos to PNG for lossless editing",
        "Get a transparent background version (after removing background in another tool)",
        "Prepare images for web projects that require PNG format",
        "Convert JPEG logos to PNG to enable transparency later",
        "Create a lossless archive copy of JPEG photos before editing"
      ],
      faq: [
        {
          q: "Why is the PNG file larger than the original JPEG?",
          a: "JPEG uses aggressive lossy compression that achieves very small file sizes by discarding some image data. PNG uses lossless compression, which preserves all data, resulting in larger files. This is a trade-off: PNG quality is higher, JPEG size is smaller."
        },
        {
          q: "Does converting JPG to PNG improve quality?",
          a: "No. Any quality lost during the original JPEG compression cannot be recovered. However, saving as PNG prevents any further quality loss — your PNG will be a perfect lossless copy of the JPEG, no worse and no better."
        },
        {
          q: "Will the PNG have a transparent background?",
          a: "Not automatically — JPEG images don't have transparency information. The resulting PNG will have the same opaque background as the original JPEG. To add transparency, use a background removal tool after converting."
        },
        {
          q: "Can I convert PNG back to JPG?",
          a: "Yes. Use the PNG to JPG Converter to convert in the other direction. Note that converting to JPEG will apply lossy compression."
        }
      ],
      example: {
        input: "Convert a JPEG product photo (320 KB) to PNG:",
        output: "No detail is lost in the conversion. The PNG can now be re-edited and re-saved without any generation loss."
      }
    },
  {
      slug: "js-formatter",
      title: "JavaScript Formatter &amp; Minifier Online – Beautify &amp; Compress JS Free",
      description: "Format and beautify JavaScript code for readability or minify for production. Configurable indent. Free, browser-based.",
      category: "format",
      relatedTools: [
        "css-formatter",
        "json-formatter",
        "html-entities"
      ],
      useCases: [
        "Quickly complete common javascript formatter &amp; minifier online – beautify &amp; compress js free tasks in the browser",
        "Verify javascript formatter &amp; minifier online – beautify &amp; compress js free results without installing desktop software"
      ],
      faq: [
        {
          q: "Does it work with TypeScript?",
          a: "It formats JavaScript syntax. TypeScript-specific type annotations are passed through without validation."
        },
        {
          q: "Does it handle JSX?",
          a: "Basic JSX syntax is preserved during formatting."
        },
        {
          q: "What does JavaScript Formatter &amp; Minifier Online – Beautify &amp; Compress JS Free do?",
          a: "JavaScript Formatter &amp; Minifier Online – Beautify &amp; Compress JS Free runs entirely in your browser and helps you complete this task without uploading data to a server."
        },
        {
          q: "Is JavaScript Formatter &amp; Minifier Online – Beautify &amp; Compress JS Free free to use?",
          a: "Yes. This tool is free to use and does not require sign-up."
        }
      ],
      example: {
        input: "Input: const f=x=>x*2;const arr=[1,2,3].map(f)",
        output: "Formatted:"
      }
    },
  {
      slug: "json-csv",
      title: "JSON to CSV Converter Online – Convert JSON Arrays Free",
      description: "Free online JSON to CSV and CSV to JSON converter. Supports custom delimiters (comma, tab, semicolon, pipe) and header row options. Runs entirely in your browser.",
      category: "convert",
      relatedTools: [
        "json-formatter",
        "hash-generator",
        "base64"
      ],
      useCases: [
        "Quickly complete common json to csv converter online – convert json arrays free tasks in the browser",
        "Verify json to csv converter online – convert json arrays free results without installing desktop software"
      ],
      faq: [
        {
          q: "Does it handle arrays nested inside objects?",
          a: "Nested arrays are converted to JSON string columns. For complex nesting, consider pre-processing your JSON first."
        },
        {
          q: "What CSV delimiters are supported?",
          a: "Comma, semicolon, tab, and pipe (|) delimiters are supported."
        },
        {
          q: "What does JSON to CSV Converter Online – Convert JSON Arrays Free do?",
          a: "JSON to CSV Converter Online – Convert JSON Arrays Free runs entirely in your browser and helps you complete this task without uploading data to a server."
        },
        {
          q: "Is JSON to CSV Converter Online – Convert JSON Arrays Free free to use?",
          a: "Yes. This tool is free to use and does not require sign-up."
        }
      ],
      example: {
        input: "JSON input: [{\"name\":\"Alice\",\"age\":30},{\"name\":\"Bob\",\"age\":25}]",
        output: "CSV output:"
      }
    },
  {
      slug: "jsonpath-tester",
      title: "JSONPath Tester Online – Query &amp; Test JSONPath Expressions Free",
      description: "Test JSONPath expressions against JSON data. Supports $, *, [], ?() filter expressions. Real-time results. Free, browser-based, no data sent.",
      category: "format",
      relatedTools: [
        "json-formatter",
        "regex-tester",
        "base64"
      ],
      useCases: [
        "Quickly complete common jsonpath tester online – query &amp; test jsonpath expressions free tasks in the browser",
        "Verify jsonpath tester online – query &amp; test jsonpath expressions free results without installing desktop software"
      ],
      faq: [
        {
          q: "Is JSONPath the same as jq?",
          a: "No — jq is a separate query language. JSONPath is standardized in RFC 9535 and supported by many libraries."
        },
        {
          q: "Can I use multiple expressions at once?",
          a: "Currently one expression at a time — results show all matching nodes."
        },
        {
          q: "What does JSONPath Tester Online – Query &amp; Test JSONPath Expressions Free do?",
          a: "JSONPath Tester Online – Query &amp; Test JSONPath Expressions Free runs entirely in your browser and helps you complete this task without uploading data to a server."
        },
        {
          q: "Is JSONPath Tester Online – Query &amp; Test JSONPath Expressions Free free to use?",
          a: "Yes. This tool is free to use and does not require sign-up."
        }
      ],
      example: {
        input: "JSON: {\"users\":[{\"name\":\"Alice\",\"age\":30},{\"name\":\"Bob\",\"age\":17}]}",
        output: "Path: $.users[?(@.age >= 18)].name"
      }
    },
  {
      slug: "line-tools",
      title: "Line Tools Online – Sort, Deduplicate &amp; Reverse Lines Free",
      description: "Sort lines alphabetically, remove duplicate lines, reverse order, remove empty lines, and trim whitespace. Free browser-based text tool.",
      category: "text",
      relatedTools: [
        "word-counter",
        "text-case",
        "diff-viewer"
      ],
      useCases: [
        "Deduplicate email lists, tags, or keyword sets",
        "Sort values before comparing or importing them elsewhere",
        "Clean logs or line-based exports from command-line tools",
        "Reverse, shuffle, or filter one-item-per-line lists"
      ],
      faq: [
        {
          q: "Is deduplication case-sensitive?",
          a: "Yes — \"Apple\" and \"apple\" are treated as different lines. Use the lowercase conversion first if you want case-insensitive deduplication."
        },
        {
          q: "Can I filter with a regex pattern?",
          a: "Yes — the filter field accepts regular expressions."
        },
        {
          q: "What does Line Tools Online – Sort, Deduplicate &amp; Reverse Lines Free do?",
          a: "Line Tools Online – Sort, Deduplicate &amp; Reverse Lines Free runs entirely in your browser and helps you complete this task without uploading data to a server."
        },
        {
          q: "Is Line Tools Online – Sort, Deduplicate &amp; Reverse Lines Free free to use?",
          a: "Yes. This tool is free to use and does not require sign-up."
        }
      ],
      example: {
        input: "Input:",
        output: "After Deduplicate + Sort A→Z:"
      },
      shortTitle: "Line Tools",
      seoContent: {
        whatIsTitle: "What is Line Tools?",
        whatIsBody: "Line Tools processes one-item-per-line text lists. It can sort, deduplicate, reverse, shuffle, filter, and trim lines, which makes it useful for keyword sets, exports, logs, and bulk text cleanup.",
        howToTitle: "How to Use Line Tools",
        howToSteps: [
          "Paste a list with one item per line.",
          "Choose the line operation you want to apply.",
          "Review the transformed result instantly.",
          "Copy the processed list when it looks right."
        ]
      },
      learnMore: {
        title: "Understand Line Tools",
        extraTitle: "Available Operations",
        extraHtml: "<ul><li>Sort A?Z / Z?A</li><li>Deduplicate repeated lines</li><li>Filter matching lines</li><li>Reverse order</li><li>Shuffle items</li><li>Trim whitespace per line</li></ul>",
        whyUseTitle: "Why Use This Tool",
        whyUseItems: [
          "Faster than writing one-off scripts for simple list transformations.",
          "Useful for keyword lists, exports, logs, and line-based datasets.",
          "Lets you chain several line operations in one pass."
        ]
      }
    },
  {
      slug: "markdown-to-html",
      title: "Markdown to HTML Converter Online – Free Browser-Based",
      description: "Convert Markdown text to clean HTML code",
      category: "convert",
      relatedTools: [
        "markdown-preview",
        "base64",
        "string-escape"
      ],
      useCases: [
        "Quickly complete common markdown to html converter online – free browser-based tasks in the browser",
        "Verify markdown to html converter online – free browser-based results without installing desktop software"
      ],
      faq: [
        {
          q: "Is it compatible with GitHub Flavored Markdown?",
          a: "Yes — GFM extensions including tables, task lists, and strikethrough are fully supported."
        },
        {
          q: "Does it add CSS styling to the output?",
          a: "No — the output is semantic HTML without inline styles. Apply your own CSS stylesheet."
        },
        {
          q: "What does Markdown to HTML Converter Online – Free Browser-Based do?",
          a: "Markdown to HTML Converter Online – Free Browser-Based runs entirely in your browser and helps you complete this task without uploading data to a server."
        },
        {
          q: "Is Markdown to HTML Converter Online – Free Browser-Based free to use?",
          a: "Yes. This tool is free to use and does not require sign-up."
        }
      ],
      example: {
        input: "Input Markdown:",
        output: "HTML output:"
      }
    },
  {
      slug: "morse-code",
      title: "Morse Code Translator Online – Encode & Decode Morse Free",
      description: "Encode text to Morse code or decode Morse code to text online. Supports all letters, digits, and common punctuation. Free, browser-based, instant conversion.",
      category: "encode",
      relatedTools: [
        "base64",
        "text-case",
        "string-escape"
      ],
      useCases: [
        "Quickly complete common morse code translator online – encode & decode morse free tasks in the browser",
        "Verify morse code translator online – encode & decode morse free results without installing desktop software"
      ],
      faq: [
        {
          q: "Does it support punctuation?",
          a: "Common punctuation (period, comma, question mark, etc.) is supported."
        },
        {
          q: "Is there audio playback?",
          a: "Yes — click the play button to hear the Morse code signal at an adjustable speed."
        },
        {
          q: "What does Morse Code Translator Online – Encode & Decode Morse Free do?",
          a: "Morse Code Translator Online – Encode & Decode Morse Free runs entirely in your browser and helps you complete this task without uploading data to a server."
        },
        {
          q: "Is Morse Code Translator Online – Encode & Decode Morse Free free to use?",
          a: "Yes. This tool is free to use and does not require sign-up."
        }
      ],
      example: {
        input: "Encode: SOS → ... --- ...",
        output: "Decode: .... .. --. ... → HIGS"
      }
    },
  {
      slug: "number-base",
      title: "Number Base Converter Online – Binary, Octal, Decimal &amp; Hex",
      description: "Convert numbers between binary, octal, decimal and hex",
      category: "convert",
      shortTitle: "Number Base Converter",
      relatedTools: [
        "unit-converter",
        "timestamp",
        "hash-generator"
      ],
      useCases: [
        "Convert decimal IDs into binary or hexadecimal for debugging",
        "Check bit patterns before writing masks, flags, or permissions",
        "Translate hexadecimal values from APIs, logs, or memory tools",
        "Compare binary, octal, decimal, and hex forms side by side"
      ],
      example: {
        input: "Decimal 255",
        output: "Binary 11111111 · Octal 377 · Hex FF"
      },
      faq: [
        {
          q: "What is the maximum number size?",
          a: "Arbitrarily large integers are supported using JavaScript BigInt."
        },
        {
          q: "Does it handle negative numbers?",
          a: "Positive integers are supported. Negative numbers and floating-point values require a separate converter."
        },
        {
          q: "What does Number Base Converter Online – Binary, Octal, Decimal &amp; Hex do?",
          a: "Number Base Converter Online – Binary, Octal, Decimal &amp; Hex runs entirely in your browser and helps you complete this task without uploading data to a server."
        },
        {
          q: "Is Number Base Converter Online – Binary, Octal, Decimal &amp; Hex free to use?",
          a: "Yes. This tool is free to use and does not require sign-up."
        }
      ],
      seoContent: {
        whatIsTitle: "What is Number Base Converter?",
        whatIsBody: "This tool converts integer values between binary, octal, decimal, and hexadecimal in real time. It is useful for programming, debugging, low-level data inspection, and permission math.",
        howToTitle: "How to Use Number Base Converter",
        howToSteps: [
          "Type a value into any base field.",
          "The matching values in the other bases update instantly.",
          "Use the bit info panel to inspect bit length and unsigned views.",
          "Copy any representation you need for code, logs, or documentation."
        ]
      },
      learnMore: {
        title: "Understand Number Base Converter",
        useCasesTitle: "Common Base Conversions",
        whyUseTitle: "Why Use This Tool",
        whyUseItems: [
          "See all major base representations at once without manual conversion.",
          "Useful for inspecting flags, byte values, and memory-oriented data.",
          "Supports large integers with BigInt instead of truncating at 32 bits."
        ]
      }
    },
  {
      slug: "png-to-jpg",
      title: "PNG to JPG Converter Online Free – Convert PNG to JPEG",
      description: "Convert PNG images to JPG/JPEG online for free. Adjust quality, set background color for transparent PNGs, and download instantly. No upload — runs in your browser.",
      category: "image",
      relatedTools: [
        "jpg-to-png",
        "webp-converter",
        "image-compressor"
      ],
      useCases: [
        "Reduce PNG screenshot file sizes for faster sharing via email or chat",
        "Convert PNG photos to JPEG for uploading to social media or websites",
        "Prepare images for services that require JPEG format",
        "Reduce PNG file size before attaching to government forms or job applications",
        "Convert PNG exports from design tools to JPEG for web use"
      ],
      faq: [
        {
          q: "What quality setting should I use?",
          a: "85% is recommended for most images — it achieves a large file size reduction with barely visible quality loss. For high-detail photos or print use, try 90–95%. For thumbnails or previews where size matters most, 60–75% is often acceptable."
        },
        {
          q: "What happens to transparent areas in my PNG?",
          a: "JPEG does not support transparency. Transparent pixels are filled with the background color you choose in the settings panel (default: white). If your PNG has a transparent background, set the background color to match where the image will be placed."
        },
        {
          q: "Will converting PNG to JPG lose quality?",
          a: "Yes — JPEG uses lossy compression, so some image data is discarded. The lower the quality setting, the more detail is lost. At 85% or above, the difference is minimal for most images and invisible to the naked eye."
        },
        {
          q: "Does JPEG support transparency?",
          a: "No. JPEG does not support an alpha channel. If you need transparency in the output, use WebP Converter or keep the image as PNG."
        }
      ],
      example: {
        input: "Convert a PNG screenshot (1.4 MB) to JPEG at 85% quality:",
        output: "Visual quality is preserved at 85% — the reduction is almost entirely invisible to the eye."
      }
    },
  {
      slug: "remove-exif",
      title: "Remove EXIF Data Online Free – Strip Image Metadata",
      description: "Remove EXIF metadata from photos online for free. Strips GPS location, camera model, date, and all other metadata. Download a clean image instantly. No upload — runs in your browser.",
      category: "image",
      relatedTools: [
        "image-compressor",
        "webp-converter",
        "jpg-to-png"
      ],
      useCases: [
        "Remove GPS location before posting photos on social media or forums",
        "Strip personal device info before sending images to clients or employers",
        "Clean metadata from photos before publishing on a blog or website",
        "Reduce file size slightly by removing embedded EXIF thumbnail previews",
        "Prepare images for stock photography submission (many platforms strip metadata anyway)"
      ],
      faq: [
        {
          q: "Does removing EXIF data affect image quality?",
          a: "No. The pixel data is preserved exactly. Only the metadata (hidden information appended to the file) is removed. The image will look identical to the original."
        },
        {
          q: "How does this tool remove EXIF data?",
          a: "The image is drawn onto an HTML5 Canvas element and then exported as a new image file using the Canvas API. Canvas output does not carry over any metadata from the source file — only raw pixel data is written to the output."
        },
        {
          q: "Does this remove watermarks or visible text?",
          a: "No. EXIF removal only strips hidden metadata — invisible data embedded in the file. Visible watermarks and text in the image pixels are part of the image content and are not affected."
        },
        {
          q: "Do social media platforms also remove EXIF data?",
          a: "Most platforms (Instagram, Twitter, Facebook) strip EXIF metadata when you upload. However, removing it before upload is safer — it ensures no metadata is retained in transit, and you can safely share the file directly (e.g. via email or messaging apps) without relying on the platform."
        }
      ],
      example: {
        input: "A smartphone photo taken at home (3.8 MB JPEG) contains hidden GPS coordinates and device info:",
        output: "The resulting image is safe to share publicly without revealing your home location."
      }
    },
  {
      slug: "resize-for-instagram",
      title: "Resize Image for Instagram Online Free – All Format Sizes",
      description: "Resize images to exact Instagram dimensions online for free. Feed square, portrait, landscape, Story, and Reels sizes. No upload — runs entirely in your browser.",
      category: "image",
      relatedTools: [
        "image-resizer",
        "image-compressor",
        "webp-converter"
      ],
      useCases: [
        "Quickly complete common resize image for instagram online free – all format sizes tasks in the browser",
        "Verify resize image for instagram online free – all format sizes results without installing desktop software"
      ],
      faq: [
        {
          q: "What is the best Instagram image size for reach?",
          a: "Portrait (1080×1350) takes up the most vertical space in the Instagram feed, which typically leads to better engagement and reach. If your image is already square or landscape, Feed Square (1080×1080) is fine."
        },
        {
          q: "What is the difference between Cover Crop and Letterbox?",
          a: "Cover Crop scales the image to fill the entire target frame, cropping any overflow from the edges. The center of the image is preserved. Letterbox scales the image to fit entirely within the target frame, adding colored padding bars on the sides or top/bottom (like a movie letterbox)."
        },
        {
          q: "Will Instagram compress my image after uploading?",
          a: "Yes. Instagram re-compresses uploaded images. To minimize quality loss, upload JPEG at high quality (85–100%) and at the exact pixel dimensions. Uploading an oversized image forces Instagram to scale it down, which adds another compression step."
        },
        {
          q: "Can I use this tool for other social media platforms?",
          a: "Yes. The Cover Crop and Letterbox fit modes work for any target dimensions. For custom sizes use the Image Resizer tool instead."
        }
      ]
    },
  {
      slug: "roman-numerals",
      title: "Roman Numeral Converter Online – Numbers to Roman & Back",
      description: "Convert between Arabic numbers and Roman numerals instantly. Supports numbers from 1 to 3999. Free, runs entirely in your browser.",
      category: "convert",
      shortTitle: "Roman Numeral Converter",
      relatedTools: [
        "number-base",
        "number-format",
        "timestamp"
      ],
      useCases: [
        "Convert chapter, outline, and section numbers into Roman numerals",
        "Interpret dates or clocks that use Roman numeral notation",
        "Verify subtractive forms like IV, IX, XL, and CM",
        "Teach Roman numeral rules with instant two-way conversion"
      ],
      faq: [
        {
          q: "What is the largest number supported?",
          a: "3999 (MMMCMXCIX). Roman numerals have no standard representation for 4000+."
        },
        {
          q: "Are lowercase Roman numerals accepted?",
          a: "Yes — both uppercase (XIV) and lowercase (xiv) input are accepted."
        },
        {
          q: "What does Roman Numeral Converter Online – Numbers to Roman & Back do?",
          a: "Roman Numeral Converter Online – Numbers to Roman & Back runs entirely in your browser and helps you complete this task without uploading data to a server."
        },
        {
          q: "Is Roman Numeral Converter Online – Numbers to Roman & Back free to use?",
          a: "Yes. This tool is free to use and does not require sign-up."
        }
      ],
      example: {
        input: "Arabic → Roman: 2024 → MMXXIV",
        output: "Roman → Arabic: XIV → 14 , MCMXCIX → 1999"
      },
      seoContent: {
        whatIsTitle: "What is a Roman Numeral Converter?",
        whatIsBody: "Roman Numeral Converter turns Arabic numbers such as 42 or 2024 into Roman numerals like XLII and MMXXIV, and it also works in reverse. It is useful for documents, clocks, chapter headings, and historical references.",
        howToTitle: "How to Use Roman Numeral Converter",
        howToSteps: [
          "Choose whether you want number-to-Roman or Roman-to-number conversion.",
          "Enter the value into the input field.",
          "Read the converted output instantly.",
          "Copy the result when you need it in a document, design, or worksheet."
        ]
      },
      learnMore: {
        title: "Understand Roman Numeral Converter",
        extraTitle: "Roman Numeral Rules",
        extraHtml: "<p>Symbols: I=1, V=5, X=10, L=50, C=100, D=500, M=1000.</p><p>Subtractive notation is used for IV, IX, XL, XC, CD, and CM. Standard modern usage typically covers values from 1 to 3999.</p>",
        whyUseTitle: "Why Use This Tool",
        whyUseItems: [
          "Handles subtractive notation correctly without manual lookup.",
          "Useful for publishing, education, history references, and decorative numbering.",
          "Supports both directions so you can verify unfamiliar numerals quickly."
        ]
      }
    },
  {
      slug: "sql-formatter",
      title: "SQL Formatter Online – Beautify MySQL, PostgreSQL &amp; SQLite",
      description: "Format and beautify SQL queries for MySQL, PostgreSQL, SQLite, and standard SQL. Keyword case options, configurable indent. Free, browser-based.",
      category: "format",
      relatedTools: [
        "json-formatter",
        "css-formatter",
        "regex-tester"
      ],
      useCases: [
        "Quickly complete common sql formatter online – beautify mysql, postgresql &amp; sqlite tasks in the browser",
        "Verify sql formatter online – beautify mysql, postgresql &amp; sqlite results without installing desktop software"
      ],
      faq: [
        {
          q: "Does it work with CTEs and window functions?",
          a: "Yes — modern SQL syntax including CTEs (WITH), window functions (OVER), and JSON operators is supported."
        },
        {
          q: "Does it check for SQL errors?",
          a: "Formatting normalizes whitespace and casing but does not validate query correctness against a database."
        },
        {
          q: "What does SQL Formatter Online – Beautify MySQL, PostgreSQL &amp; SQLite do?",
          a: "SQL Formatter Online – Beautify MySQL, PostgreSQL &amp; SQLite runs entirely in your browser and helps you complete this task without uploading data to a server."
        },
        {
          q: "Is SQL Formatter Online – Beautify MySQL, PostgreSQL &amp; SQLite free to use?",
          a: "Yes. This tool is free to use and does not require sign-up."
        }
      ],
      example: {
        input: "Input: select id,name from users where id=1 and active=True",
        output: "Formatted:"
      }
    },
  {
      slug: "string-escape",
      title: "String Escape / Unescape Online – JSON, JS & HTML Escaping",
      description: "Escape or unescape strings for JSON, JavaScript and HTML",
      category: "encode",
      relatedTools: [
        "json-formatter",
        "url-encode",
        "html-entities"
      ],
      useCases: [
        "Quickly complete common string escape / unescape online – json, js & html escaping tasks in the browser",
        "Verify string escape / unescape online – json, js & html escaping results without installing desktop software"
      ],
      faq: [
        {
          q: "Does escaping prevent SQL injection?",
          a: "String escaping reduces risk but is not a substitute for parameterized queries in production code."
        },
        {
          q: "What is \\uXXXX encoding?",
          a: "Unicode escape sequences represent characters by their code point — e.g. \\u0041 = \"A\"."
        },
        {
          q: "What does String Escape / Unescape Online – JSON, JS & HTML Escaping do?",
          a: "String Escape / Unescape Online – JSON, JS & HTML Escaping runs entirely in your browser and helps you complete this task without uploading data to a server."
        },
        {
          q: "Is String Escape / Unescape Online – JSON, JS & HTML Escaping free to use?",
          a: "Yes. This tool is free to use and does not require sign-up."
        }
      ],
      example: {
        input: "Input: He said \"hello\\nworld\"",
        output: "JSON Escaped: \"He said \\\"hello\\\\nworld\\\"\""
      }
    },
  {
      slug: "text-case",
      title: "Text Case Converter Online – camelCase, snake_case &amp; More",
      description: "Convert text between camelCase, snake_case, PascalCase and more",
      category: "text",
      relatedTools: [
        "slug-generator",
        "word-counter",
        "url-encode"
      ],
      useCases: [
        "Rename variables or API fields between naming conventions",
        "Convert titles into headline, sentence, lowercase, or uppercase styles",
        "Prepare keys for CSS variables, database columns, and config files",
        "Normalize mixed input copied from docs or spreadsheets"
      ],
      faq: [
        {
          q: "Does it handle camelCase input correctly?",
          a: "Yes — camelCase and PascalCase boundaries are detected and split before converting to other formats."
        },
        {
          q: "Can I convert multiple lines at once?",
          a: "Yes — paste multi-line text and each line is converted independently."
        },
        {
          q: "What does Text Case Converter Online – camelCase, snake_case &amp; More do?",
          a: "Text Case Converter Online – camelCase, snake_case &amp; More runs entirely in your browser and helps you complete this task without uploading data to a server."
        },
        {
          q: "Is Text Case Converter Online – camelCase, snake_case &amp; More free to use?",
          a: "Yes. This tool is free to use and does not require sign-up."
        }
      ],
      shortTitle: "Text Case Converter",
      example: {
        input: "hello world",
        output: "camelCase helloWorld ? snake_case hello_world ? kebab-case hello-world"
      },
      seoContent: {
        whatIsTitle: "What is Text Case Converter?",
        whatIsBody: "Text Case Converter transforms the same text into common naming styles such as camelCase, PascalCase, snake_case, kebab-case, Title Case, and lowercase. It is useful for software, content editing, and consistent naming.",
        howToTitle: "How to Use Text Case Converter",
        howToSteps: [
          "Paste your source text into the input field.",
          "Review the generated case variants instantly.",
          "Choose the naming style you need.",
          "Copy the output for code, URLs, docs, or UI text."
        ]
      },
      learnMore: {
        title: "Understand Text Case Converter",
        extraTitle: "Supported Case Formats",
        extraHtml: "<p>Common outputs include camelCase, PascalCase, snake_case, kebab-case, SCREAMING_SNAKE_CASE, Title Case, lowercase, uppercase, sentence case, dot.case, and path/case.</p>",
        whyUseTitle: "Why Use This Tool",
        whyUseItems: [
          "Quickly switch between coding and editorial naming conventions.",
          "Handles mixed input and camelCase boundaries automatically.",
          "Useful for APIs, CSS variables, database schemas, and content cleanup."
        ]
      }
    },
  {
      slug: "timezone-converter",
      title: "Timezone Converter Online – Convert Time Between Timezones Free",
      description: "Convert date and time between any two time zones. Supports 80+ global timezones. Free, instant, browser-based timezone converter.",
      category: "convert",
      shortTitle: "Timezone Converter",
      relatedTools: [
        "timestamp",
        "cron-builder",
        "unit-converter"
      ],
      useCases: [
        "Schedule meetings across cities without calculating offsets by hand",
        "Check release windows and maintenance periods for global users",
        "Convert deadlines between your local zone and a partner's timezone",
        "Verify daylight saving changes for specific dates"
      ],
      example: {
        input: "2024-06-15 09:00 in America/New_York",
        output: "2024-06-15 14:00 in Europe/London"
      },
      faq: [
        {
          q: "Does it account for daylight saving time?",
          a: "Yes — DST is handled automatically. The UTC offset shown reflects the actual offset on the date entered."
        },
        {
          q: "How many time zones are supported?",
          a: "All ~600 IANA time zones are supported, including historical zones and aliases."
        },
        {
          q: "What does Timezone Converter Online – Convert Time Between Timezones Free do?",
          a: "Timezone Converter Online – Convert Time Between Timezones Free runs entirely in your browser and helps you complete this task without uploading data to a server."
        },
        {
          q: "Is Timezone Converter Online – Convert Time Between Timezones Free free to use?",
          a: "Yes. This tool is free to use and does not require sign-up."
        }
      ],
      seoContent: {
        whatIsTitle: "What is Timezone Converter?",
        whatIsBody: "Timezone Converter turns a local date and time in one region into the matching time in another region. It uses IANA timezone rules, so daylight saving changes are applied automatically for the chosen date.",
        howToTitle: "How to Use Timezone Converter",
        howToSteps: [
          "Choose the date and time you want to convert.",
          "Select the source timezone.",
          "Select the destination timezone.",
          "Read the converted time and UTC offset from the result panel."
        ]
      },
      learnMore: {
        title: "Understand Timezone Converter",
        extraTitle: "Daylight Saving Time Notes",
        extraHtml: "<p>DST shifts local clocks seasonally, so the same city can have different UTC offsets during the year. This converter uses timezone rules for the exact date you enter, which helps avoid one-hour scheduling mistakes around spring and autumn transitions.</p>",
        whyUseTitle: "Why Use This Tool",
        whyUseItems: [
          "Avoid manual offset math when scheduling across regions.",
          "See UTC offsets for the specific date instead of guessing from memory.",
          "Useful for meetings, releases, market open times, and support coverage."
        ]
      }
    },
  {
      slug: "url-builder",
      title: "URL Builder Online – Construct URLs with Query Parameters",
      description: "Build and parse URLs with scheme, host, path, and query parameters. Assemble URLs from parts or decode any URL into its components. Free, browser-based.",
      category: "encode",
      relatedTools: [
        "url-parser",
        "url-encode",
        "user-agent"
      ],
      useCases: [
        "Quickly complete common url builder online – construct urls with query parameters tasks in the browser",
        "Verify url builder online – construct urls with query parameters results without installing desktop software"
      ],
      faq: [
        {
          q: "Does it support URL fragments (#hash)?",
          a: "Yes — set the fragment identifier in the dedicated field."
        },
        {
          q: "Are spaces encoded as %20 or +?",
          a: "Query string encoding uses %20. Form encoding (application/x-www-form-urlencoded) uses +. The builder uses standard %20 encoding."
        },
        {
          q: "What does URL Builder Online – Construct URLs with Query Parameters do?",
          a: "URL Builder Online – Construct URLs with Query Parameters runs entirely in your browser and helps you complete this task without uploading data to a server."
        },
        {
          q: "Is URL Builder Online – Construct URLs with Query Parameters free to use?",
          a: "Yes. This tool is free to use and does not require sign-up."
        }
      ],
      example: {
        input: "Base: https://api.example.com/v1/users",
        output: "+ params: page=2, limit=50, sort=name"
      }
    },
  {
      slug: "url-parser",
      title: "URL Parser &amp; Builder Online – Parse &amp; Construct URLs Free",
      description: "Parse URLs into protocol, host, path, query and hash components",
      category: "encode",
      relatedTools: [
        "url-encode",
        "http-status",
        "string-escape"
      ],
      useCases: [
        "Quickly complete common url parser &amp; builder online – parse &amp; construct urls free tasks in the browser",
        "Verify url parser &amp; builder online – parse &amp; construct urls free results without installing desktop software"
      ],
      faq: [
        {
          q: "Are percent-encoded characters decoded?",
          a: "Yes — %20 → space and all other percent-encoded sequences are decoded in the display."
        },
        {
          q: "Does it support data: URIs?",
          a: "data: URIs are parsed but the data payload is not decoded."
        },
        {
          q: "What does URL Parser &amp; Builder Online – Parse &amp; Construct URLs Free do?",
          a: "URL Parser &amp; Builder Online – Parse &amp; Construct URLs Free runs entirely in your browser and helps you complete this task without uploading data to a server."
        },
        {
          q: "Is URL Parser &amp; Builder Online – Parse &amp; Construct URLs Free free to use?",
          a: "Yes. This tool is free to use and does not require sign-up."
        }
      ]
    },
  {
      slug: "user-agent",
      title: "User Agent Parser Online – Detect Browser, OS & Device",
      description: "Free online User Agent parser. Paste any UA string to instantly identify browser, engine, operating system, and device type. Runs entirely in your browser.",
      category: "reference",
      relatedTools: [
        "ip-lookup",
        "url-parser",
        "http-status"
      ],
      useCases: [
        "Quickly complete common user agent parser online – detect browser, os & device tasks in the browser",
        "Verify user agent parser online – detect browser, os & device results without installing desktop software"
      ],
      faq: [
        {
          q: "Can User-Agent strings be trusted?",
          a: "No — they can be spoofed by any client. Use UA parsing for analytics and soft detection, not for security decisions."
        },
        {
          q: "Does it detect bots?",
          a: "Yes — common crawler bots (Googlebot, Bingbot, AhrefsBot, etc.) are flagged automatically."
        },
        {
          q: "What does User Agent Parser Online – Detect Browser, OS & Device do?",
          a: "User Agent Parser Online – Detect Browser, OS & Device runs entirely in your browser and helps you complete this task without uploading data to a server."
        },
        {
          q: "Is User Agent Parser Online – Detect Browser, OS & Device free to use?",
          a: "Yes. This tool is free to use and does not require sign-up."
        }
      ],
      example: {
        input: "UA: Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15...",
        output: "→ Browser: Safari 17, OS: iOS 17, Device: Mobile, Engine: WebKit"
      }
    },
  {
      slug: "webp-to-jpg",
      title: "WebP to JPG Converter Online Free – Convert WebP to JPEG or PNG",
      description: "Convert WebP images to JPG or PNG online for free. Drag and drop any WebP file, choose output format, adjust quality, and download instantly. No upload required.",
      category: "image",
      relatedTools: [
        "webp-converter",
        "jpg-to-png",
        "image-compressor"
      ],
      useCases: [
        "Open WebP images downloaded from websites in Photoshop, GIMP, or Paint",
        "Use WebP images in Microsoft Office or Google Docs (which prefer JPEG/PNG)",
        "Share WebP photos via email to recipients without WebP support",
        "Convert WebP to PNG to preserve transparency for design work",
        "Prepare WebP images for upload to platforms that require JPEG or PNG"
      ],
      faq: [
        {
          q: "Why can't I open WebP files in Photoshop or Paint?",
          a: "Older versions of Photoshop and Windows Paint do not have native WebP support. Converting to JPEG or PNG gives you a universally compatible file that opens in any image editor."
        },
        {
          q: "Will the JPEG look the same as the WebP?",
          a: "At 85% quality or above, the visual difference is minimal and imperceptible for most images. WebP and JPEG both use lossy compression, so the output will be very close to the original."
        },
        {
          q: "Should I use JPEG or PNG output?",
          a: "Use JPEG for photos and general images — it produces smaller files. Use PNG if the WebP image has a transparent background and you need to preserve that transparency, or if you need a lossless copy."
        },
        {
          q: "Can I convert JPEG back to WebP?",
          a: "Yes. Use the WebP Converter to convert JPEG, PNG, or any other format to WebP."
        }
      ],
      example: {
        input: "Downloaded a WebP image from a website (240 KB) and need a JPEG for editing:",
        output: "The converted JPEG can now be opened in Photoshop, emailed, or used in Microsoft Office documents."
      }
    },
  {
      slug: "xml-formatter",
      title: "XML Formatter &amp; Validator Online – Beautify &amp; Validate XML",
      description: "Beautify and validate XML with syntax highlighting",
      category: "format",
      relatedTools: [
        "json-formatter",
        "yaml-json",
        "css-formatter"
      ],
      useCases: [
        "Quickly complete common xml formatter &amp; validator online – beautify &amp; validate xml tasks in the browser",
        "Verify xml formatter &amp; validator online – beautify &amp; validate xml results without installing desktop software"
      ],
      faq: [
        {
          q: "Does it validate XML schema (XSD)?",
          a: "It checks well-formedness but not schema validation against an XSD or DTD."
        },
        {
          q: "Does it handle XML namespaces?",
          a: "Yes — namespace prefixes and xmlns declarations are preserved."
        },
        {
          q: "What does XML Formatter &amp; Validator Online – Beautify &amp; Validate XML do?",
          a: "XML Formatter &amp; Validator Online – Beautify &amp; Validate XML runs entirely in your browser and helps you complete this task without uploading data to a server."
        },
        {
          q: "Is XML Formatter &amp; Validator Online – Beautify &amp; Validate XML free to use?",
          a: "Yes. This tool is free to use and does not require sign-up."
        }
      ],
      example: {
        input: "Input: <root><item id=\"1\">Hello</item></root>",
        output: "Formatted:"
      }
    },
  {
      slug: "yaml-json",
      title: "YAML to JSON Converter Online – Parse & Convert YAML Free",
      description: "Convert between YAML and JSON format instantly",
      category: "convert",
      relatedTools: [
        "json-formatter",
        "toml-json",
        "xml-json"
      ],
      useCases: [
        "Quickly complete common yaml to json converter online – parse & convert yaml free tasks in the browser",
        "Verify yaml to json converter online – parse & convert yaml free results without installing desktop software"
      ],
      faq: [
        {
          q: "Does this tool support nested objects and arrays?",
          a: "Yes. The converter handles arbitrarily nested YAML structures including objects, arrays, strings, numbers, booleans, and None values."
        },
        {
          q: "Are YAML comments preserved in the JSON output?",
          a: "No. JSON does not support comments, so any YAML comments are dropped during conversion."
        },
        {
          q: "Can I convert multi-document YAML files?",
          a: "The tool converts a single YAML document at a time. Multi-document YAML (separated by --- ) is not currently supported."
        },
        {
          q: "Is my data safe?",
          a: "Yes. All processing happens entirely in your browser using JavaScript. No data is ever sent to a server."
        }
      ],
      example: {
        input: "Converting a simple YAML object to JSON:",
        output: "YAML's indentation-based syntax maps directly to JSON's brace-based object notation."
      }
    }
];

if (typeof module !== 'undefined') module.exports = { TOOLS_META };
