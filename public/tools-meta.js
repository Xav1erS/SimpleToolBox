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
      title: "Base64 Encoder / Decoder Online",
      description: "Encode text or files to Base64 and decode Base64 strings instantly. Supports standard and URL-safe Base64, all in your browser with no uploads.",
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
        whatIsBody: "Base64 is a text encoding method that turns binary data or plain text into a limited ASCII character set. It is commonly used for email payloads, data URLs, API tokens, and moving binary content through text-only systems.",
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
      title: "JSON Formatter Online",
      description: "Format, minify, and validate JSON online. You can also convert JSON to CSV or SQL INSERT statements, all locally in your browser.",
      category: "format",
      relatedTools: [
        "yaml-json",
        "xml-formatter",
        "toml-json"
      ],
      useCases: [
        "Prettify minified API responses while debugging",
        "Validate JSON before saving config or request bodies",
        "Convert JSON into CSV or SQL-ready structures",
        "Clean sample payloads for documentation and demos"
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
      ],
      shortTitle: "JSON Formatter",
      seoContent: {
        title: "What is JSON Formatter?",
        body: "JSON Formatter prettifies, validates, and restructures JSON so you can inspect payloads, debug API responses, and copy clean output faster. It is useful for front-end development, back-end debugging, integrations, and documentation work.",
        howToSteps: [
          "Paste your JSON into the input panel on the left.",
          "Click Prettify to format it or Minify to compress it for transport.",
          "Fix any syntax errors shown in the validation message area if the JSON is invalid.",
          "Copy the cleaned output or switch to CSV or SQL conversion if you need another format."
        ]
      },
      learnMore: {
        title: "Understand JSON Formatting"
      }
    },
  {
      slug: "password-generator",
      title: "Password Generator Online",
      description: "Generate strong random passwords locally. Choose length, character sets, and quantity, then copy a single password or a full batch instantly.",
      category: "generate",
      relatedTools: [
        "password-strength-checker",
        "hash-generator",
        "uuid-generator",
        "bcrypt"
      ],
      useCases: [
        "Generate strong passwords for new accounts",
        "Create one-off credentials for staging or admin tools",
        "Produce random passwords without using external websites",
        "Adjust length and character rules for site requirements"
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
      ],
      shortTitle: "Password Generator",
      seoContent: {
        title: "What is Password Generator?",
        body: "Password Generator creates strong random passwords locally in the browser so you can avoid weak, reused credentials. It is useful for account setup, admin handoff, test environments, and any workflow that needs quick secure strings.",
        howToSteps: [
          "Choose the password length and the character types you want to include.",
          "Open advanced options if you need multiple passwords or stricter rules.",
          "Generate the password list instantly in the browser.",
          "Copy one password or copy the full batch for account setup or handoff."
        ]
      },
      learnMore: {
        title: "Understand Strong Passwords"
      }
    },
  {
      slug: "timestamp",
      title: "Timestamp Converter Online",
      description: "Convert Unix timestamps to readable dates and convert dates back to timestamps. Supports seconds, milliseconds, and a live current timestamp.",
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
      title: "URL Encoder / Decoder Online",
      description: "Encode or decode URL parameters and components online. Works with full URLs, query values, Unicode text, and special characters.",
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
      title: "UUID Generator Online",
      description: "Generate UUID v1 and v4 identifiers in bulk. Copy one value or the entire list at once, all locally in your browser.",
      category: "generate",
      relatedTools: [
        "password-generator",
        "random-number-generator",
        "base58"
      ],
      useCases: [
        "Generate sample IDs for databases and APIs",
        "Create unique keys for test fixtures and demos",
        "Seed mock data locally without a server dependency",
        "Copy batches of UUIDs for scripts or spreadsheets"
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
      ],
      shortTitle: "UUID Generator",
      seoContent: {
        title: "What is UUID Generator?",
        body: "UUID Generator creates random unique identifiers in the browser so you can seed records, create test data, and generate IDs without relying on a back-end service. It is useful for development, QA, and local content workflows.",
        howToSteps: [
          "Pick UUID v1 or v4 depending on whether you need time-based or random identifiers.",
          "Set the quantity you want to generate.",
          "Generate the list instantly in your browser.",
          "Copy a single UUID or copy the full batch at once for scripts, fixtures, or spreadsheets."
        ]
      },
      learnMore: {
        title: "Understand UUIDs"
      }
    },
  {
      slug: "word-counter",
      title: "Word Counter Online",
      description: "Count words, characters, sentences, and paragraphs. Get reading time, average word length, and keyword density without leaving your browser.",
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
          a: "Reading time is estimated by dividing the total word count by 200 words per minute, the widely cited average adult reading speed for on-screen text. The result is rounded up to the nearest half-minute. Dense or technical content may take longer; casual prose may be read faster."
        },
        {
          q: "How are words counted?",
          a: "Words are counted by splitting the text on whitespace and filtering out empty segments. Hyphenated words like \"well-known\" are counted as one word. Numbers and punctuation attached to words are counted as part of the word token."
        }
      ],
      seoContent: {
        whatIsTitle: "What is a Word Counter?",
        whatIsBody: "A word counter measures text length and related writing stats such as words, characters, sentences, paragraphs, and reading time. It helps writers, editors, students, and marketers stay within content limits and quickly understand how dense or readable a draft is.",
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
      title: "Resize Images Online Free",
      description: "Resize JPG, PNG, and WebP images online for free. Set custom dimensions, keep aspect ratio, switch output format, and use social media presets. Runs locally in your browser with no uploads.",
      category: "image",
      relatedTools: [
        "youtube-thumbnail",
        "color-picker",
        "unit-converter"
      ],
      useCases: [
        "Resize hero images and screenshots for websites",
        "Prepare exact dimensions for social or marketplace uploads",
        "Create smaller exports for docs and slide decks",
        "Convert image size and format in one browser-only step"
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
      },
      shortTitle: "Image Resizer",
      seoContent: {
        title: "What is an Image Resizer?",
        body: "Image Resizer changes image dimensions directly in the browser so you can prepare files for websites, social media, documents, and app uploads. It is useful when you need exact width and height targets without sending images to a server.",
        howToTitle: "How to Use Image Resizer",
        howToSteps: [
          "Upload the image you want to resize.",
          "Choose a preset size or enter the exact width and height you need.",
          "Keep the aspect ratio locked if you want to avoid stretching the image.",
          "Preview the result and download the resized file when it looks correct."
        ]
      },
      learnMore: {
        title: "Understand Image Resizing"
      }
    },
  {
      slug: "image-compressor",
      title: "Compress Images Online Free",
      description: "Compress JPEG, PNG, and WebP images online for free. Adjust quality, compare before-and-after file size, and download the smaller result instantly. Runs locally in your browser with no uploads.",
      category: "image",
      relatedTools: [
        "image-resizer",
        "webp-converter",
        "base64"
      ],
      useCases: [
        "Shrink hero images before uploading to a website",
        "Reduce attachment size for email or chat sharing",
        "Meet CMS upload limits without opening desktop apps",
        "Compare JPEG, PNG, and WebP output sizes quickly"
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
      },
      shortTitle: "Image Compressor",
      seoContent: {
        title: "What is an Image Compressor?",
        body: "Image Compressor reduces image file size in the browser so you can shrink uploads without sending files to a server. It is useful for website performance, email attachments, CMS uploads, and social posts with strict size limits.",
        howToSteps: [
          "Upload the image you want to compress from your device.",
          "Adjust the quality setting while watching the preview and file size update.",
          "Compare the original and compressed versions to find the best balance.",
          "Download the smaller file once the result looks good."
        ]
      },
      learnMore: {
        title: "Understand Image Compression"
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
        "Convert site assets to WebP for faster page loads",
        "Prepare blog and ecommerce images for modern browsers",
        "Compare output size before replacing PNG or JPEG files",
        "Create optimized screenshots for product pages"
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
      },
      shortTitle: "WebP Converter",
      seoContent: {
        title: "What is WebP Converter?",
        body: "WebP Converter turns images into WebP so you can reduce file size while keeping web-friendly quality. It is useful when preparing site assets, blog images, app screenshots, and storefront visuals for faster loading.",
        howToTitle: "How to Use WebP Converter",
        howToSteps: [
          "Upload the source image you want to convert.",
          "Adjust the quality or output options if the tool provides them.",
          "Preview the converted result and compare the file size.",
          "Download the WebP file when the balance looks right for web use."
        ]
      },
      learnMore: {
        title: "Understand WebP Images"
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
        "Grab thumbnails for competitive channel research",
        "Review visual trends across campaign ideas",
        "Reuse a reference thumbnail in design presentations",
        "Check which thumbnail resolution a video exposes"
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
      },
      shortTitle: "YouTube Thumbnail Downloader",
      seoContent: {
        title: "What is YouTube Thumbnail Downloader?",
        body: "YouTube Thumbnail Downloader fetches the available preview images for a YouTube video so you can inspect or save them quickly. It is useful for competitive research, campaign planning, content audits, and presentation mockups.",
        howToTitle: "How to Use YouTube Thumbnail Downloader",
        howToSteps: [
          "Paste the YouTube video URL into the input field.",
          "Let the tool fetch the available thumbnail sizes automatically.",
          "Preview the different thumbnail versions to choose the one you need.",
          "Download the thumbnail image for research, mockups, or reference use."
        ]
      },
      learnMore: {
        title: "Understand YouTube Thumbnails"
      }
    },
  {
      slug: "qr-code-generator",
      title: "QR Code Generator Online Free",
      description: "Generate QR codes for URLs, text, WiFi, vCards, and email. Customize colors, error correction, size, and logo placement, then download as PNG or SVG.",
      category: "generate",
      relatedTools: [
        "url-encode",
        "base64",
        "password-generator"
      ],
      useCases: [
        "Create QR codes for landing pages and printed flyers",
        "Generate Wi-Fi or contact QR codes for offices and events",
        "Build scannable links for packaging or menus",
        "Test payload types before exporting a final code"
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
      },
      shortTitle: "QR Code Generator",
      seoContent: {
        title: "What is QR Code Generator?",
        body: "QR Code Generator creates scannable codes for links, text, Wi-Fi credentials, email, and contact details directly in the browser. It is useful for print materials, menus, event signage, onboarding flows, and quick device handoffs.",
        howToTitle: "How to Use QR Code Generator",
        howToSteps: [
          "Choose the QR code type such as URL, text, Wi-Fi, email, or contact card.",
          "Fill in the fields with the data you want people to scan.",
          "Adjust the size or styling options if needed and preview the code live.",
          "Download the finished QR code as an image for print or digital use."
        ]
      },
      learnMore: {
        title: "Understand QR Codes"
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
      title: "Color Picker Online",
      description: "Pick colors visually and convert between HEX, RGB, HSL, and CMYK. Copy any format with one click and fine-tune values directly in the browser.",
      category: "convert",
      relatedTools: [
        "color-converter",
        "color-palette",
        "contrast-checker"
      ],
      useCases: [
        "Pick exact UI colors for CSS or design tokens",
        "Copy HEX, RGB, or HSL values into front-end code",
        "Inspect and compare colors during design QA",
        "Build small palettes from a single selected color"
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
      ],
      shortTitle: "Color Picker",
      seoContent: {
        title: "What is Color Picker?",
        body: "Color Picker helps you inspect and copy color values such as HEX, RGB, and HSL directly in the browser. It is useful for UI work, design handoff, CSS authoring, and quick palette exploration without opening a full graphics app.",
        howToSteps: [
          "Enter a HEX value or use the visual picker to choose a color.",
          "Review the converted RGB, HSL, and CMYK values shown below.",
          "Fine-tune the inputs until the color matches your design or code target.",
          "Copy the format you need with one click."
        ]
      },
      learnMore: {
        title: "Understand Color Picking"
      }
    },
  {
      slug: "regex-tester",
      title: "Regex Tester Online - Test & Debug Regular Expressions",
      description: "Test and debug regular expressions in real time. See matches, capture groups, flags, and replacements instantly in your browser.",
      category: "text",
      relatedTools: [
        "json-formatter",
        "string-escape",
        "hash-generator"
      ],
      useCases: [
        "Debug JavaScript regular expressions against real sample text",
        "Inspect capture groups and replacement output before writing code",
        "Test validation patterns for forms, logs, or parsing tasks",
        "Share clear regex examples during documentation or onboarding"
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
      },
      shortTitle: "Regex Tester",
      seoContent: {
        whatIsTitle: "What is Regex Tester?",
        whatIsBody: "Regex Tester lets you run a regular expression against sample text and inspect matches, capture groups, flags, and replacements in real time. It is useful for validation, parsing, search, data cleaning, and debugging patterns before they go into code.",
        howToTitle: "How to Use Regex Tester",
        howToSteps: [
          "Enter the regular expression pattern you want to test.",
          "Paste the sample text the pattern should run against.",
          "Toggle flags such as global, multiline, or case-insensitive as needed.",
          "Review matches, groups, and replacement output before using the pattern."
        ]
      },
      learnMore: {
        title: "Understand Regular Expressions",
        whyUseTitle: "Why Use This Tool",
        whyUseItems: [
          "Useful for validation rules, parsing, and search patterns.",
          "Lets you test flags, groups, and replace mode without opening DevTools.",
          "Runs locally so logs and sample text stay in the browser."
        ]
      }
    },
  {
      slug: "markdown-preview",
      title: "Markdown Preview Online",
      description: "Write Markdown and see a live rendered preview instantly. Supports GFM tables, task lists, fenced code blocks, and quick HTML export.",
      category: "text",
      relatedTools: [
        "markdown-to-html",
        "html-formatter",
        "diff-viewer"
      ],
      useCases: [
        "Preview README changes before committing",
        "Check Markdown formatting for docs and blog posts",
        "Inspect code fences and tables in technical content",
        "Copy clean HTML output from Markdown source"
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
      ],
      shortTitle: "Markdown Preview",
      seoContent: {
        title: "What is a Markdown Preview Tool?",
        body: "Markdown Preview renders Markdown into formatted output in real time so you can check headings, lists, links, tables, and code blocks before publishing. It is useful for docs, READMEs, notes, CMS content, and developer tutorials.",
        howToTitle: "How to Use Markdown Preview",
        howToSteps: [
          "Paste or type your Markdown into the editor.",
          "Watch the formatted preview update as you edit.",
          "Check headings, lists, tables, links, and code blocks before publishing.",
          "Copy the Markdown or export the rendered HTML when you are done."
        ]
      },
      learnMore: {
        title: "Understand Markdown Rendering"
      }
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
        "Build cron schedules without memorizing syntax",
        "Check recurring job timing before deploying automation",
        "Generate readable schedules for ops documentation",
        "Validate cron rules used in CI, servers, or hosted schedulers"
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
      ],
      shortTitle: "Cron Builder",
      seoContent: {
        title: "What is Cron Builder?",
        body: "Cron Builder helps you create cron expressions from readable schedule choices instead of memorizing field syntax. It is useful for scheduled jobs, deployment tasks, maintenance scripts, and dashboards that rely on cron rules.",
        howToTitle: "How to Use Cron Builder",
        howToSteps: [
          "Choose the schedule pattern you want, such as hourly, daily, weekly, or monthly.",
          "Fill in the readable time and date fields instead of editing raw cron syntax first.",
          "Review the generated cron expression and the human-readable summary.",
          "Copy the expression into your server, scheduler, or deployment workflow."
        ]
      },
      learnMore: {
        title: "Understand Cron Expressions"
      }
    },
  {
      slug: "jwt-decoder",
      title: "JWT Decoder Online - Inspect & Decode JSON Web Tokens",
      description: "Free online JWT decoder and inspector. Parse JWT header, payload, and signature. View expiration time, algorithm, and all claims. Runs entirely in your browser.",
      category: "encode",
      shortTitle: "JWT Decoder / Inspector",
      relatedTools: [
        "jwt-builder",
        "base64",
        "hash-generator"
      ],
      useCases: [
        "Inspect token claims during API and auth debugging",
        "Check expiry, issuer, audience, and subject values without backend tooling",
        "Confirm which signing algorithm and token structure a system is using",
        "Teach how JWT header, payload, and signature segments fit together"
      ],
      faq: [
        {
          q: "Is it safe to paste my JWT here?",
          a: "Yes. Decoding runs entirely in your browser, and the token is never sent to a server. That said, avoid pasting production tokens with sensitive claims into any public tool unless you are certain it is client-side only."
        },
        {
          q: "Can this tool verify the signature?",
          a: "No. Signature verification requires the secret (HMAC) or public key (RSA/EC). This tool only decodes the Base64URL-encoded header and payload; verification must happen on your server."
        },
        {
          q: "What does token expired mean?",
          a: "The exp claim is a Unix timestamp indicating when the token stops being valid. If the current time is past that timestamp, the server will reject the token and you will need to re-authenticate."
        },
        {
          q: "What is the difference between JWT and session cookies?",
          a: "Session cookies store a session ID on the server and look it up on each request. JWTs are self-contained: all claims are in the token itself, so no server-side session storage is needed. This makes JWTs useful in stateless, distributed systems."
        }
      ],
      example: {
        input: "Paste a JWT such as eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
        output: "The tool splits the token into header, payload, and signature, then decodes the readable claims."
      },
      seoContent: {
        whatIsTitle: "What is JWT Decoder?",
        whatIsBody: "JWT Decoder parses JSON Web Tokens into their three parts so you can inspect the header, payload claims, algorithm, and signature segment. It is useful for authentication debugging, expiry checks, and understanding what a token actually contains without sending it to a server.",
        howToTitle: "How to Use JWT Decoder",
        howToSteps: [
          "Paste the JWT into the input area.",
          "Review the decoded header and payload sections.",
          "Inspect claims such as exp, iss, aud, sub, and custom fields.",
          "Copy the decoded values or compare them with your auth flow expectations."
        ]
      },
      learnMore: {
        title: "Understand JWTs",
        whyUseTitle: "Why Use This Tool",
        whyUseItems: [
          "Helps debug login flows, API authorization, and token expiry issues.",
          "Makes JWT structure easier to explain to teammates and stakeholders.",
          "Runs locally so pasted tokens are not uploaded during inspection."
        ]
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
          a: "They differ in digest length and security level. MD5 produces 128-bit (32-char) hashes: fast but cryptographically broken. SHA-1 produces 160-bit (40-char) hashes and is also deprecated for security use. SHA-256 and SHA-512 are part of the SHA-2 family and remain secure for integrity checking and digital signatures."
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
      title: "Date Calculator - Day Difference, Business Days & Age",
      description: "Calculate the difference between two dates, add or subtract days, count business days, and find exact age. Free browser-based date calculator.",
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
        whatIsBody: "Date Calculator compares two dates in days, weeks, months, and years, adds or subtracts days from any date, calculates exact age from a birth date, and counts business days between dates. All calculations run locally in your browser and no data is uploaded.",
        howToTitle: "How to Use Date Calculator",
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
      title: "BMI Calculator Online",
      description: "Calculate your Body Mass Index (BMI) instantly. Supports metric and imperial units, and shows your BMI category plus a healthy weight range for your height.",
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
        whatIsTitle: "What is a BMI Calculator?",
        whatIsBody: "A BMI calculator uses your height and weight to estimate Body Mass Index (BMI). It helps you quickly see your BMI value, weight category, and a healthy weight range for your height.",
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
      title: "Loan Calculator Online",
      description: "Calculate monthly loan payments, total interest, and a full amortization schedule. Works for mortgages, car loans, and other fixed-rate loans.",
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
        whatIsTitle: "What is a Loan Calculator?",
        whatIsBody: "A loan calculator estimates monthly payment, total interest paid, and total cost for a fixed-rate loan. Enter the loan amount, annual interest rate, and term to see the full repayment breakdown and amortization schedule.",
        howToTitle: "How to Use Loan Calculator",
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
        "Reduce stylesheet size before deployment",
        "Compact CSS for embeds or snippets",
        "Compare formatted and minified output while debugging",
        "Prepare smaller style payloads for static sites or emails"
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
      },
      shortTitle: "CSS Minifier",
      seoContent: {
        title: "What is CSS Minifier?",
        body: "CSS Minifier compresses CSS by removing extra whitespace and nonessential characters so you can reduce payload size quickly. It is useful for front-end optimization, static site publishing, demos, and copying compact styles into constrained environments.",
        howToTitle: "How to Use CSS Minifier",
        howToSteps: [
          "Paste your CSS into the input panel.",
          "Run the minifier to remove whitespace and other nonessential characters.",
          "Review the compact output to make sure the stylesheet still looks correct.",
          "Copy or download the minified CSS for deployment or embedding."
        ]
      },
      learnMore: {
        title: "Understand CSS Minification"
      }
    },
  {
      slug: "js-minifier",
      title: "JavaScript Minifier Online – Compress & Minify JS Free",
      description: "Minify and compress JavaScript code instantly using Terser. Mangle variable names, remove dead code, and reduce file size for production. Free, browser-based, no data sent.",
      category: "format",
      relatedTools: [
        "js-formatter",
        "css-minifier",
        "json-formatter"
      ],
      useCases: [
        "Minify script snippets before deployment",
        "Generate compact JavaScript for demos or embeds",
        "Check whether whitespace-only compression is enough for a use case",
        "Compare readable and minified output during front-end work"
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
          q: "What does JavaScript Minifier Online – Compress & Minify JS Free do?",
          a: "JavaScript Minifier Online – Compress & Minify JS Free runs entirely in your browser and helps you complete this task without uploading data to a server."
        },
        {
          q: "Is JavaScript Minifier Online – Compress & Minify JS Free free to use?",
          a: "Yes. This tool is free to use and does not require sign-up."
        }
      ],
      example: {
        input: "Input (42 bytes):",
        output: "Minified (26 bytes): function add(a,b){return a+b}"
      },
      shortTitle: "JS Minifier",
      seoContent: {
        title: "What is JS Minifier?",
        body: "JS Minifier compresses JavaScript into a smaller output that is easier to ship in lightweight demos or static deployments. It is useful for reducing file size, testing minified behavior, and generating compact script snippets in the browser.",
        howToTitle: "How to Use JS Minifier",
        howToSteps: [
          "Paste the JavaScript code you want to compress.",
          "Run the minifier to generate a smaller output version.",
          "Check the result if you need to verify names, spacing, or behavior.",
          "Copy the minified script for demos, snippets, or deployment."
        ]
      },
      learnMore: {
        title: "Understand JavaScript Minification"
      }
    },
  {
      slug: "toml-json",
      title: "TOML to JSON Converter Online - Parse & Convert TOML Free",
      description: "Convert TOML to JSON and JSON to TOML instantly. Supports tables, arrays, inline tables, dates, and all TOML v1.0 types. Free, browser-based, no data sent.",
      category: "convert",
      shortTitle: "TOML to JSON Converter",
      relatedTools: [
        "yaml-json",
        "json-formatter",
        "xml-json"
      ],
      useCases: [
        "Convert app, Rust, or Python config files between TOML and JSON",
        "Inspect nested TOML tables in explicit JSON object form",
        "Prepare data for tools that accept JSON but not TOML",
        "Check arrays of tables, inline tables, and typed values during config debugging"
      ],
      faq: [
        {
          q: "Are TOML comments preserved when converting to JSON?",
          a: "No. JSON does not support comments, so TOML comments are dropped during conversion to JSON."
        },
        {
          q: "Does the tool support TOML arrays of tables?",
          a: "Yes. TOML arrays of tables (double-bracket sections like [[products]]) are converted to JSON arrays of objects."
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
        input: "[database]\nserver = \"db.example.com\"\nports = [5432, 5433]",
        output: "{\n  \"database\": {\n    \"server\": \"db.example.com\",\n    \"ports\": [5432, 5433]\n  }\n}"
      },
      seoContent: {
        whatIsTitle: "What is TOML to JSON Converter?",
        whatIsBody: "TOML to JSON Converter helps you move structured configuration data between TOML and JSON formats. It is useful for developer tooling, app settings, package metadata, and any workflow where one system prefers TOML while another expects JSON.",
        howToTitle: "How to Use TOML to JSON Converter",
        howToSteps: [
          "Paste TOML or JSON into the input panel.",
          "Choose the conversion direction you need.",
          "Review the converted result and fix syntax issues if the parser reports an error.",
          "Copy the output into your config file, script, or build workflow."
        ]
      },
      learnMore: {
        title: "Understand TOML to JSON Converter",
        whyUseTitle: "Why Use This Tool",
        whyUseItems: [
          "Useful for config-heavy projects and language ecosystems that rely on TOML.",
          "Makes TOML tables and typed values easier to inspect in JSON form.",
          "Runs locally so project configuration stays on your machine."
        ]
      }
    },
  {
      slug: "jwt-builder",
      title: "JWT Builder / Generator - Create JSON Web Tokens",
      description: "Build and sign JSON Web Tokens (JWT) with HMAC (HS256/HS384/HS512). Set header, payload claims, and secret key. Free, browser-based, no data sent.",
      category: "encode",
      shortTitle: "JWT Builder / Generator",
      relatedTools: [
        "jwt-decoder",
        "hmac",
        "base64"
      ],
      useCases: [
        "Generate test JWTs for local auth and API development",
        "Experiment with header and payload claims before wiring backend issuance",
        "Create short-lived tokens to verify expiry and role-based logic",
        "Produce HMAC-signed JWT samples for documentation or demos"
      ],
      faq: [
        {
          q: "Can I use RS256 (asymmetric) signing?",
          a: "No. This builder is focused on HMAC signing modes such as HS256, HS384, and HS512. Use a dedicated JWT tool or backend library for RSA and EC key-based signing."
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
      },
      seoContent: {
        whatIsTitle: "What is JWT Builder?",
        whatIsBody: "JWT Builder creates signed JSON Web Tokens in the browser using HMAC algorithms such as HS256, HS384, and HS512. It is useful for generating sample tokens, testing claim sets, and validating how your application handles roles, expiry, and custom payload fields.",
        howToTitle: "How to Use JWT Builder",
        howToSteps: [
          "Choose the HMAC algorithm you want to use.",
          "Enter or edit the payload claims you need in the token.",
          "Provide the signing secret and build the token.",
          "Copy the generated JWT and test it in your local app or API flow."
        ]
      },
      learnMore: {
        title: "Understand JWT Builder",
        whyUseTitle: "Why Use This Tool",
        whyUseItems: [
          "Useful for local auth testing without wiring a full token service.",
          "Helps you experiment with claims, expiry, and HMAC algorithms quickly.",
          "Runs client-side so secrets stay in the browser during token generation."
        ]
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
        "Review charts that rely on red-versus-green status colors",
        "Test whether UI states stay distinguishable without color labels",
        "Spot risky palettes before publishing infographics",
        "Check accessibility of screenshots and marketing assets"
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
      ],
      shortTitle: "Color Blindness Simulator",
      seoContent: {
        title: "What is Color Blindness Simulator?",
        body: "Color Blindness Simulator previews how artwork or interfaces may appear under different color-vision deficiencies. It is useful for evaluating charts, status colors, UI states, and image-heavy layouts that depend too much on hue alone.",
        howToTitle: "How to Use Color Blindness Simulator",
        howToSteps: [
          "Upload the image or screen design you want to check.",
          "Switch between the different color-vision deficiency modes.",
          "Compare how key UI elements, charts, or labels change under each mode.",
          "Adjust your design colors if important meaning is lost in the preview."
        ]
      },
      learnMore: {
        title: "Understand Color Blindness Modes"
      },
      example: {
        input: "Upload a chart that uses red and green series colors",
        output: "Preview protanopia, deuteranopia, and tritanopia variants to check whether the series stay distinguishable"
      }
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
        "Look up decimal, hex, octal, or binary values for ASCII characters",
        "Teach control characters and printable ASCII in programming classes",
        "Check escape-code mappings while debugging byte-oriented text data",
        "Confirm how letters, digits, and punctuation are encoded in basic ASCII"
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
      },
      shortTitle: "ASCII Table Reference",
      seoContent: {
        whatIsTitle: "What is ASCII Table Reference?",
        whatIsBody: "ASCII Table Reference lists standard 7-bit ASCII characters along with their decimal, hexadecimal, octal, and binary codes. It is useful for low-level debugging, teaching text encoding basics, and checking character values in logs, code, and protocols.",
        howToTitle: "How to Use ASCII Table Reference",
        howToSteps: [
          "Search by character, code value, or description.",
          "Review the matching row across decimal, hex, octal, and binary columns.",
          "Use the result to compare values in code, docs, or logs.",
          "Copy the relevant code or character for your workflow."
        ]
      },
      learnMore: {
        title: "Understand ASCII Table",
        whyUseTitle: "Why Use This Tool",
        whyUseItems: [
          "Useful for teaching, debugging, and byte-level text inspection.",
          "Shows multiple numeric representations for each ASCII code point.",
          "Runs locally and works instantly as a quick reference page."
        ]
      }
    },
  {
      slug: "text-cleaner",
      title: "Text Cleaner Online",
      description: "Clean messy text instantly. Remove extra spaces, blank lines, duplicate lines, HTML tags, URLs, and other copy-paste clutter with live results.",
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
      title: "XML to JSON Converter Online - Free Browser-Based Tool",
      description: "Convert XML to JSON and JSON to XML instantly. Handles attributes, nested elements, arrays, and CDATA. Free, browser-based, no data sent.",
      category: "format",
      shortTitle: "XML to JSON Converter",
      relatedTools: [
        "json-formatter",
        "yaml-json",
        "toml-json"
      ],
      useCases: [
        "Convert API responses, feed data, or SOAP payloads between XML and JSON",
        "Inspect XML attributes and nested elements in a more familiar JSON structure",
        "Generate XML from JSON when integrating with legacy systems",
        "Debug schema mismatches during data migration or middleware work"
      ],
      faq: [
        {
          q: "Does it handle XML namespaces?",
          a: "Namespaced attributes and elements are preserved in the JSON output with their original prefix."
        },
        {
          q: "Can it convert complex SOAP envelopes?",
          a: "Yes. SOAP XML converts correctly, producing a nested JSON representation of the envelope."
        },
        {
          q: "What does XML to JSON Converter Online - Free Browser-Based Tool do?",
          a: "XML to JSON Converter Online - Free Browser-Based Tool runs entirely in your browser and helps you complete this task without uploading data to a server."
        },
        {
          q: "Is XML to JSON Converter Online - Free Browser-Based Tool free to use?",
          a: "Yes. This tool is free to use and does not require sign-up."
        }
      ],
      example: {
        input: "<user id=\"1\"><name>Alice</name></user>",
        output: "{\"user\":{\"@id\":\"1\",\"name\":\"Alice\"}}"
      },
      seoContent: {
        whatIsTitle: "What is XML to JSON Converter?",
        whatIsBody: "XML to JSON Converter switches data between XML and JSON while preserving nested structure, attributes, and text content. It is useful when modern APIs or scripts expect JSON but legacy systems, feeds, and enterprise tools still exchange XML.",
        howToTitle: "How to Use XML to JSON Converter",
        howToSteps: [
          "Paste XML when you want JSON output, or switch modes to convert JSON back into XML.",
          "Review the converted structure and check how attributes and text nodes are represented.",
          "Fix any syntax or parsing issues reported by the tool.",
          "Copy the result into your integration, script, or migration workflow."
        ]
      },
      learnMore: {
        title: "Understand XML to JSON Converter",
        whyUseTitle: "Why Use This Tool",
        whyUseItems: [
          "Useful for legacy integrations, feeds, SOAP payloads, and migration work.",
          "Helps developers inspect attribute-heavy XML as JSON objects.",
          "Runs in the browser so documents stay local during conversion."
        ]
      }
    },
  {
      slug: "number-format",
      title: "Number Formatter Online",
      description: "Format numbers with thousand separators, currency symbols, decimal places, percentages, and scientific notation. Works directly in your browser.",
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
        "Look up common service ports during networking or firewall debugging",
        "Check whether a port is typically used by HTTP, SSH, databases, or DNS",
        "Review well-known ports when configuring infrastructure and security groups",
        "Use as a quick reference while reading logs or packet captures"
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
      },
      shortTitle: "TCP/UDP Port Reference",
      seoContent: {
        whatIsTitle: "What is TCP/UDP Port Reference?",
        whatIsBody: "TCP/UDP Port Reference lists common network ports and the services usually associated with them. It is useful for server setup, firewall rules, troubleshooting connectivity, and understanding what traffic a port number often represents.",
        howToTitle: "How to Use TCP/UDP Port Reference",
        howToSteps: [
          "Search for a port number or service name.",
          "Review the protocol and service mapping shown in the result.",
          "Compare nearby or related ports if you are debugging a connection issue.",
          "Use the reference while configuring firewalls, proxies, or monitoring alerts."
        ]
      },
      learnMore: {
        title: "Understand Port Number Reference",
        whyUseTitle: "Why Use This Tool",
        whyUseItems: [
          "Useful for networking, firewall, proxy, and container debugging.",
          "Helps map ports to common services quickly during ops work.",
          "Runs locally as a fast reference without opening external docs."
        ]
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
        "Look up correct Content-Type headers for files and API responses",
        "Check MIME mappings for extensions used in uploads and downloads",
        "Verify browser-serving behavior when debugging static assets",
        "Use as a quick reference while configuring servers, CDNs, or APIs"
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
      },
      shortTitle: "MIME Types Reference",
      seoContent: {
        whatIsTitle: "What is MIME Types Reference?",
        whatIsBody: "MIME Types Reference maps file extensions and media types so you can find the correct Content-Type header for web responses, uploads, and assets. It is useful for API work, static file serving, storage rules, and browser compatibility debugging.",
        howToTitle: "How to Use MIME Types Reference",
        howToSteps: [
          "Search by file extension or MIME type string.",
          "Review the matching content type and any common usage notes.",
          "Use the mapping in server config, API headers, or upload validation.",
          "Double-check edge cases such as fonts, JSON, media, or binary files."
        ]
      },
      learnMore: {
        title: "Understand MIME Types Reference",
        whyUseTitle: "Why Use This Tool",
        whyUseItems: [
          "Useful for APIs, static assets, uploads, and server configuration.",
          "Helps prevent wrong Content-Type headers and browser handling bugs.",
          "Works as a quick in-browser reference while you build or debug."
        ]
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
        "Check text colors against WCAG AA before launch",
        "Review accessibility regressions in design-system tokens",
        "Verify heading and body text contrast separately",
        "Hand off compliant color pairs to product teams"
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
      ],
      shortTitle: "WCAG AA Contrast Checker",
      seoContent: {
        title: "What is WCAG AA Contrast Checker?",
        body: "WCAG AA Contrast Checker focuses on accessibility thresholds for normal and large text so you can quickly verify whether a color pair passes common compliance targets. It is useful during UI QA, accessibility audits, and design-system reviews."
      },
      learnMore: {
        title: "Understand WCAG AA Contrast"
      },
      example: {
        input: "Foreground #1F2937 on background #FFFFFF",
        output: "Passes WCAG AA for normal text and large text"
      }
    },
  {
      slug: "aes",
      title: "AES Encrypt & Decrypt Online - Browser-Based AES Tool",
      description: "Encrypt and decrypt text using AES-256-GCM with a passphrase. Runs entirely in your browser, and no data is sent to any server.",
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
          a: "AES-256 is considered computationally unbreakable with current technology. A brute-force attack would require more energy than the observable universe could provide; it is the gold standard for symmetric encryption."
        },
        {
          q: "Can I use this tool to encrypt files?",
          a: "This tool is designed for text encryption. For file encryption, consider dedicated tools. However, you can encrypt Base64-encoded file content if needed."
        }
      ],
      example: {
        input: "Plaintext: \"Secret message\" - Key: \"mykey\" - Mode: AES-GCM-256",
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
      title: "Bcrypt Hash Generator & Verifier Online - Secure Password Hashing Free",
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
          a: "This tool runs entirely in your browser, and nothing is transmitted. Still, avoid testing production credentials in any online tool as a precaution."
        },
        {
          q: "What is the $2a$ prefix?",
          a: "It is the bcrypt version identifier. $2a$, $2b$, and $2y$ are all valid bcrypt variants; $2b$ is the current standard."
        },
        {
          q: "What does Bcrypt Hash Generator & Verifier Online - Secure Password Hashing Free do?",
          a: "Bcrypt Hash Generator & Verifier Online - Secure Password Hashing Free runs entirely in your browser and helps you complete this task without uploading data to a server."
        },
        {
          q: "Is Bcrypt Hash Generator & Verifier Online - Secure Password Hashing Free free to use?",
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
        "Blur sensitive details in screenshots before sharing",
        "Create soft-focus backgrounds for social graphics",
        "Test blur strength on product shots or mockups",
        "Redact temporary content without uploading files"
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
        input: "Upload a screenshot and increase the blur radius over a notification panel",
        output: "The selected image becomes softly blurred and ready to export locally"
      },
      shortTitle: "Blur Image Tool",
      seoContent: {
        title: "What is Blur Image Tool?",
        body: "Blur Image Tool applies a blur effect in the browser so you can soften screenshots, obscure sensitive areas, or create depth effects without opening a desktop editor. It is useful for UI mockups, privacy redaction, and quick social assets.",
        howToSteps: [
          "Upload the image you want to soften or obscure.",
          "Increase the blur amount until the effect matches your goal.",
          "Preview the result directly in the browser before exporting.",
          "Download the blurred image as PNG or JPEG when it looks right."
        ]
      },
      learnMore: {
        title: "Understand Image Blur"
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
      title: "Color Converter Online",
      description: "Convert colors between HEX, RGB, HSL, and CMYK instantly. Includes a visual picker so you can adjust and copy the format you need.",
      category: "design",
      relatedTools: [
        "color-picker",
        "color-palette",
        "contrast-checker"
      ],
      useCases: [
        "Convert design mockup colors into CSS-ready values",
        "Translate RGB or HSL colors into HEX for front-end code",
        "Compare print-oriented CMYK values with digital color formats",
        "Normalize color specs before handing off design files"
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
      ],
      shortTitle: "Color Converter",
      seoContent: {
        title: "What is Color Converter?",
        body: "Color Converter helps you switch between HEX, RGB, HSL, HSV, CMYK, and named CSS colors without recalculating values by hand. It is useful when moving colors between design tools, front-end code, brand docs, and print workflows.",
        howToTitle: "How to Use Color Converter",
        howToSteps: [
          "Enter a color in HEX, RGB, HSL, HSV, or another supported format.",
          "Let the tool convert the value into the other color formats automatically.",
          "Fine-tune any field until the output matches your target color exactly.",
          "Copy the format you need for CSS, design handoff, or print work."
        ]
      },
      learnMore: {
        title: "Understand Color Formats"
      },
      example: {
        input: "#FF5733",
        output: "RGB(255, 87, 51), HSL(11, 100%, 60%), CMYK(0, 66, 80, 0)"
      }
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
        "Build UI color systems from a base brand color",
        "Generate supporting accent colors for charts or illustrations",
        "Explore palette directions before handing off to design",
        "Create quick color sets for social posts or slides"
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
      },
      shortTitle: "Color Palette Generator",
      seoContent: {
        title: "What is Color Palette Generator?",
        body: "Color Palette Generator creates coordinated color sets from a starting hue so you can explore complementary, analogous, monochrome, and accent combinations faster. It is useful for UI themes, brand explorations, dashboards, and presentation graphics.",
        howToTitle: "How to Use Color Palette Generator",
        howToSteps: [
          "Pick the base color you want to build from.",
          "Choose the palette style such as complementary, analogous, or monochrome.",
          "Review the generated swatches and tweak the base color if needed.",
          "Copy the HEX values you want to reuse in your design system or mockup."
        ]
      },
      learnMore: {
        title: "Understand Color Palettes"
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
        "Meet government or school upload limits",
        "Reduce profile photos for forms with strict file caps",
        "Shrink scanned documents before submitting online",
        "Avoid repeated trial-and-error in desktop editors"
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
        input: "Upload a 1.8 MB passport photo and set the target to 100 KB",
        output: "The tool iterates compression settings until the exported image is close to the target size"
      },
      shortTitle: "Compress to 100KB",
      seoContent: {
        title: "What is Compress to 100KB?",
        body: "Compress to 100KB helps you reduce an image until it fits a common file-size target used by forms, portals, and job applications. It is useful when a site rejects larger uploads and you need a fast browser-only workaround.",
        howToTitle: "How to Use Compress to 100KB",
        howToSteps: [
          "Upload the image that needs to fit under the 100KB limit.",
          "Let the tool reduce quality or dimensions until the target size is reached.",
          "Check the preview to make sure the image still looks acceptable.",
          "Download the compressed file once it meets the size limit."
        ]
      },
      learnMore: {
        title: "Understand Targeted Image Compression"
      }
    },
  {
      slug: "contrast-checker",
      title: "WCAG Contrast Checker Online – AA & AAA Accessibility Test",
      description: "Check color contrast ratio for WCAG AA and AAA accessibility compliance. Instantly verify foreground and background color combinations for normal text, large text, and UI components.",
      category: "design",
      relatedTools: [
        "color-picker",
        "gradient-generator",
        "color-palette"
      ],
      useCases: [
        "Check button and link contrast before shipping UI updates",
        "Validate text colors in brand systems and style guides",
        "Review marketing graphics for readability",
        "Test dark-on-light and light-on-dark combinations quickly"
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
      },
      shortTitle: "Contrast Checker",
      seoContent: {
        title: "What is Contrast Checker?",
        body: "Contrast Checker compares foreground and background colors to show whether text contrast is readable and accessible. It is useful for UI design reviews, brand color validation, component libraries, and fixing low-contrast text before release.",
        howToTitle: "How to Use Contrast Checker",
        howToSteps: [
          "Enter or pick the foreground text color.",
          "Enter or pick the background color behind it.",
          "Review the contrast ratio and WCAG pass or fail result instantly.",
          "Adjust either color until the combination meets your accessibility target."
        ]
      },
      learnMore: {
        title: "Understand Color Contrast"
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
      title: "CSS Formatter & Minifier Online - Beautify or Compress CSS Free",
      description: "Format and minify CSS code instantly. Beautify compressed CSS for readability or minify for production. Free, browser-based, no data sent.",
      category: "format",
      shortTitle: "CSS Formatter & Minifier",
      relatedTools: [
        "css-minifier",
        "js-formatter",
        "html-formatter"
      ],
      useCases: [
        "Beautify minified stylesheets before debugging layout issues",
        "Review generated CSS from design tools or build output",
        "Minify CSS again after edits for production deployment",
        "Inspect selectors and declarations more clearly during code review"
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
          a: "No. In production you should minify CSS to reduce file size. Use the CSS Formatter during development and code review, then minify before deploying."
        }
      ],
      example: {
        input: ".card{display:flex;padding:16px;background:#fff;border-radius:8px}",
        output: ".card {\n  display: flex;\n  padding: 16px;\n  background: #fff;\n  border-radius: 8px;\n}"
      },
      seoContent: {
        whatIsTitle: "What is CSS Formatter & Minifier?",
        whatIsBody: "CSS Formatter & Minifier helps you switch between readable stylesheet code and compact production-ready output. It is useful for debugging compiled CSS, reviewing selectors and declarations, and compressing styles again before shipping them.",
        howToTitle: "How to Use CSS Formatter & Minifier",
        howToSteps: [
          "Paste the CSS you want to beautify or compress.",
          "Choose format or minify mode and adjust indentation if needed.",
          "Review the output for readability or file size reduction.",
          "Copy the result back into your stylesheet or build pipeline."
        ]
      },
      learnMore: {
        title: "Understand CSS Formatter & Minifier",
        whyUseTitle: "Why Use This Tool",
        whyUseItems: [
          "Useful for debugging large or minified stylesheets.",
          "Lets you move quickly between readable and compact CSS output.",
          "Runs locally so source styles never leave the browser."
        ]
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
        "Compare two text blocks during config, code, or document review",
        "Inspect line and word-level differences before applying changes",
        "Check generated output against an expected result in debugging flows",
        "Share clear before-and-after comparisons in tickets or docs"
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
      },
      shortTitle: "Text Diff Viewer",
      seoContent: {
        whatIsTitle: "What is Text Diff Viewer?",
        whatIsBody: "Text Diff Viewer compares two text inputs and highlights what changed so you can inspect additions, deletions, and edits quickly. It is useful for config changes, generated output checks, review workflows, and debugging before-and-after states.",
        howToTitle: "How to Use Text Diff Viewer",
        howToSteps: [
          "Paste the original text into one side and the revised text into the other.",
          "Run the comparison and review highlighted differences.",
          "Optionally ignore whitespace or line-ending differences if the tool supports it.",
          "Use the result in debugging, review, or documentation work."
        ]
      },
      learnMore: {
        title: "Understand Text Diff Viewer",
        whyUseTitle: "Why Use This Tool",
        whyUseItems: [
          "Useful for config review, docs edits, and generated output comparisons.",
          "Makes additions, deletions, and replacements easier to spot than plain text.",
          "Runs locally so compared text stays in the browser."
        ]
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
        "Create hero background gradients for marketing pages",
        "Test angle and stop adjustments before editing CSS files",
        "Generate polished button or card backgrounds",
        "Share exact gradient CSS with developers without manual conversion"
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
      },
      shortTitle: "CSS Gradient Generator",
      seoContent: {
        title: "What is Gradient Generator?",
        body: "Gradient Generator lets you build linear and radial gradients visually, then copy production-ready CSS. It is useful for landing pages, hero sections, buttons, cards, and background experiments where raw CSS syntax is tedious to write by hand.",
        howToTitle: "How to Use Gradient Generator",
        howToSteps: [
          "Choose whether you want a linear or radial gradient.",
          "Add or adjust the color stops until the blend looks right.",
          "Fine-tune the angle, position, or spread values in the live preview.",
          "Copy the generated CSS when you are ready to use it in your project."
        ]
      },
      learnMore: {
        title: "Understand CSS Gradients"
      }
    },
  {
      slug: "grayscale-image",
      title: "Grayscale Image Converter Online Free – Convert Photo to Black & White",
      description: "Convert images to grayscale or black and white online for free. Adjust intensity, download as JPEG or PNG. No upload — runs entirely in your browser.",
      category: "image",
      relatedTools: [
        "image-rotate",
        "webp-converter",
        "image-compressor"
      ],
      useCases: [
        "Preview how an image looks without color information",
        "Prepare monochrome assets for print or editorial layouts",
        "Check whether contrast still works in grayscale",
        "Create alternative visual treatments for posts and slides"
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
      ],
      shortTitle: "Grayscale Image Tool",
      seoContent: {
        title: "What is Grayscale Image Tool?",
        body: "Grayscale Image Tool converts color images into monochrome versions directly in the browser. It is useful for design explorations, print previews, accessibility checks, and preparing image variants without sending files anywhere.",
        howToTitle: "How to Use Grayscale Image Tool",
        howToSteps: [
          "Upload the image you want to convert to grayscale.",
          "Preview the black-and-white result directly in the browser.",
          "Compare the grayscale version if you are checking tone or readability.",
          "Download the converted image when the result looks right."
        ]
      },
      learnMore: {
        title: "Understand Grayscale Images"
      }
    },
  {
      slug: "hmac",
      title: "HMAC Generator Online - SHA-256 & SHA-512 Authentication",
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
          a: "SHA-256 hashes data without a key, so anyone can reproduce it. HMAC requires a shared secret key, providing authentication in addition to integrity."
        },
        {
          q: "Is SHA-1 HMAC still secure?",
          a: "HMAC-SHA1 is considered weak for new systems. Use HMAC-SHA256 or HMAC-SHA512 for new implementations."
        },
        {
          q: "What does HMAC Generator Online - SHA-256 & SHA-512 Authentication do?",
          a: "HMAC Generator Online - SHA-256 & SHA-512 Authentication runs entirely in your browser and helps you complete this task without uploading data to a server."
        },
        {
          q: "Is HMAC Generator Online - SHA-256 & SHA-512 Authentication free to use?",
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
      title: "HTML Formatter & Minifier Online - Beautify or Compress HTML",
      description: "Format and minify HTML code online with customizable indentation. Free browser-based HTML beautifier and minifier.",
      category: "format",
      shortTitle: "HTML Formatter / Minifier",
      relatedTools: [
        "css-formatter",
        "js-formatter",
        "html-entities"
      ],
      useCases: [
        "Beautify minified HTML copied from build output or production pages",
        "Review nested markup structure before editing templates or components",
        "Clean CMS or WYSIWYG-generated HTML before publishing",
        "Minify HTML snippets again after debugging or manual edits"
      ],
      faq: [
        {
          q: "Does HTML Formatter validate my HTML?",
          a: "The formatter focuses on indentation and readability. It will process malformed HTML as best it can, but it is not a strict validator. Use a dedicated validator if you need spec-compliance checking."
        },
        {
          q: "Will formatting change the rendered output of my page?",
          a: "No. Adding whitespace between block elements does not change visual rendering. Be cautious with inline elements like <span> inside text where whitespace can matter, but the formatter preserves inline content."
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
        output: "<div>\n  <p>Hello</p>\n  <ul>\n    <li>Item</li>\n  </ul>\n</div>"
      },
      seoContent: {
        whatIsTitle: "What is HTML Formatter?",
        whatIsBody: "HTML Formatter turns compressed or inconsistent markup into readable, properly indented HTML. It is useful for debugging page structure, reviewing templates, and preparing snippets for documentation or code review without sending code to a server.",
        howToTitle: "How to Use HTML Formatter / Minifier",
        howToSteps: [
          "Paste your HTML into the input panel.",
          "Choose whether you want to format or minify the markup.",
          "Adjust indentation options if needed.",
          "Copy the cleaned output for editing, review, or deployment."
        ]
      },
      learnMore: {
        title: "Understand HTML Formatter",
        whyUseTitle: "Why Use This Tool",
        whyUseItems: [
          "Makes nested HTML structure much easier to scan and debug.",
          "Useful for both beautifying markup and shrinking it again after edits.",
          "Runs locally so templates and snippets are not uploaded anywhere."
        ]
      }
    },
  {
      slug: "http-status",
      title: "HTTP Status Codes Reference Online",
      description: "Look up HTTP status codes and their meanings quickly. Includes common 2xx, 3xx, 4xx, and 5xx responses for debugging and API work.",
      category: "reference",
      relatedTools: [
        "url-encode",
        "json-formatter",
        "jwt-decoder"
      ],
      useCases: [
        "Look up HTTP response codes while debugging APIs and web apps",
        "Explain redirect, auth, and server error semantics to teammates",
        "Check which status code best matches an API or backend behavior",
        "Use as a quick reference during docs writing or incident response"
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
      },
      shortTitle: "HTTP Status Codes Reference",
      seoContent: {
        whatIsTitle: "What is an HTTP Status Codes Reference?",
        whatIsBody: "An HTTP status codes reference explains standard response codes such as 200, 301, 404, and 500 so you can quickly understand what a server response means. It is useful for API debugging, backend development, QA, docs, and support workflows.",
        howToTitle: "How to Use HTTP Status Codes Reference",
        howToSteps: [
          "Search for the numeric code or status phrase you need.",
          "Read the description and category of the response code.",
          "Compare similar codes such as 401 vs 403 or 301 vs 302.",
          "Use the result in debugging, implementation, or documentation work."
        ]
      },
      learnMore: {
        title: "Understand HTTP Status Codes Reference",
        whyUseTitle: "Why Use This Tool",
        whyUseItems: [
          "Useful for APIs, browser debugging, backend work, and docs.",
          "Helps distinguish similar success, redirect, client-error, and server-error codes.",
          "Works as a fast browser-side reference without extra tooling."
        ]
      }
    },
  {
      slug: "image-rotate",
      title: "Rotate Image Online Free – Rotate & Flip Photos",
      description: "Rotate and flip images online for free. Rotate 90°, 180°, 270°, flip horizontally or vertically. Download as JPEG or PNG instantly. No upload — runs in your browser.",
      category: "image",
      relatedTools: [
        "image-resizer",
        "webp-converter",
        "image-compressor"
      ],
      useCases: [
        "Fix sideways phone photos before uploading",
        "Rotate scanned documents into the correct reading direction",
        "Adjust screenshots for presentations or docs",
        "Export a corrected image without opening desktop software"
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
      },
      shortTitle: "Image Rotate Tool",
      seoContent: {
        title: "What is Image Rotate Tool?",
        body: "Image Rotate Tool rotates photos and screenshots by fixed angles so you can correct orientation problems quickly. It is useful for phone photos, scanned documents, product shots, and any asset that needs a fast turn before export.",
        howToTitle: "How to Use Image Rotate Tool",
        howToSteps: [
          "Upload the image with the wrong orientation.",
          "Rotate it by 90, 180, or 270 degrees, or flip it if needed.",
          "Check the preview to confirm the image is now upright.",
          "Download the corrected image for reuse or sharing."
        ]
      },
      learnMore: {
        title: "Understand Image Rotation"
      }
    },
  {
      slug: "ip-lookup",
      title: "IP Address Lookup & Geolocation Online – Free IP Info Tool",
      description: "Look up IP address geolocation and network information",
      category: "reference",
      relatedTools: [
        "url-encode",
        "http-status",
        "json-formatter"
      ],
      useCases: [
        "Inspect IP addresses during ops or support work",
        "Check basic context around traffic sources",
        "Review IP details while triaging suspicious requests",
        "Use as a quick networking reference during debugging"
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
          q: "What does IP Address Lookup & Geolocation Online – Free IP Info Tool do?",
          a: "IP Address Lookup & Geolocation Online – Free IP Info Tool runs entirely in your browser and helps you complete this task without uploading data to a server."
        },
        {
          q: "Is IP Address Lookup & Geolocation Online – Free IP Info Tool free to use?",
          a: "Yes. This tool is free to use and does not require sign-up."
        }
      ],
      shortTitle: "IP Lookup",
      seoContent: {
        title: "What is IP Lookup?",
        body: "IP Lookup helps you inspect an IP address and understand basic details around it for troubleshooting and reference. It is useful for networking checks, security triage, geolocation context, and understanding traffic sources during debugging."
      },
      learnMore: {
        title: "Understand IP Addresses"
      }
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
        "Convert photos into PNG for editing workflows",
        "Prepare screenshots or images for tools that expect PNG input",
        "Standardize exported assets before handoff",
        "Create a lossless derivative without external software"
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
      },
      shortTitle: "JPG to PNG Converter",
      seoContent: {
        title: "What is JPG to PNG Converter?",
        body: "JPG to PNG Converter changes JPEG images into PNG format in the browser. It is useful when you need a lossless output format for editing pipelines, documentation, or workflows that expect PNG files.",
        howToTitle: "How to Use JPG to PNG Converter",
        howToSteps: [
          "Upload the JPG or JPEG image you want to convert.",
          "Let the tool render the image into PNG format in the browser.",
          "Preview the result if you want to confirm the converted output.",
          "Download the new PNG file for editing, sharing, or reuse."
        ]
      },
      learnMore: {
        title: "Understand JPG and PNG"
      }
    },
  {
      slug: "js-formatter",
      title: "JavaScript Formatter & Minifier Online - Beautify & Compress JS Free",
      description: "Format and beautify JavaScript code for readability or minify for production. Configurable indent. Free, browser-based.",
      category: "format",
      shortTitle: "JavaScript Formatter & Minifier",
      relatedTools: [
        "css-formatter",
        "json-formatter",
        "html-formatter"
      ],
      useCases: [
        "Beautify compressed JavaScript before debugging or review",
        "Inspect generated bundle snippets and utility functions more clearly",
        "Minify small scripts after editing them in the browser",
        "Compare formatting changes when preparing code samples or docs"
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
          q: "What does JavaScript Formatter & Minifier Online - Beautify & Compress JS Free do?",
          a: "JavaScript Formatter & Minifier Online - Beautify & Compress JS Free runs entirely in your browser and helps you complete this task without uploading data to a server."
        },
        {
          q: "Is JavaScript Formatter & Minifier Online - Beautify & Compress JS Free free to use?",
          a: "Yes. This tool is free to use and does not require sign-up."
        }
      ],
      example: {
        input: "const f=x=>x*2;const arr=[1,2,3].map(f)",
        output: "const f = x => x * 2;\nconst arr = [1, 2, 3].map(f);"
      },
      seoContent: {
        whatIsTitle: "What is JavaScript Formatter & Minifier?",
        whatIsBody: "JavaScript Formatter & Minifier helps you switch between readable JS source and compact output for production. It is useful for reviewing code snippets, debugging generated scripts, and shrinking small files after you finish editing them.",
        howToTitle: "How to Use JavaScript Formatter & Minifier",
        howToSteps: [
          "Paste JavaScript into the input panel.",
          "Choose beautify or minify mode.",
          "Adjust indentation if you want more readable output.",
          "Copy the final code into your app, docs, or deployment workflow."
        ]
      },
      learnMore: {
        title: "Understand JavaScript Formatter & Minifier",
        whyUseTitle: "Why Use This Tool",
        whyUseItems: [
          "Useful for debugging minified snippets and generated code quickly.",
          "Lets you move between readable and compact JS without extra tooling.",
          "Runs locally so scripts stay in the browser while you format them."
        ]
      }
    },
  {
      slug: "json-csv",
      title: "JSON to CSV Converter Online - Convert JSON Arrays Free",
      description: "Free online JSON to CSV and CSV to JSON converter. Supports custom delimiters (comma, tab, semicolon, pipe) and header row options. Runs entirely in your browser.",
      category: "convert",
      shortTitle: "JSON to CSV Converter",
      relatedTools: [
        "json-formatter",
        "yaml-json",
        "xml-json"
      ],
      useCases: [
        "Convert API arrays and tabular exports between JSON and CSV",
        "Prepare spreadsheet-friendly CSV from structured JSON data",
        "Turn CSV rows back into JSON objects for scripts and apps",
        "Check delimiter and header handling before importing into another system"
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
          q: "What does JSON to CSV Converter Online - Convert JSON Arrays Free do?",
          a: "JSON to CSV Converter Online - Convert JSON Arrays Free runs entirely in your browser and helps you complete this task without uploading data to a server."
        },
        {
          q: "Is JSON to CSV Converter Online - Convert JSON Arrays Free free to use?",
          a: "Yes. This tool is free to use and does not require sign-up."
        }
      ],
      example: {
        input: "[{\"name\":\"Alice\",\"age\":30},{\"name\":\"Bob\",\"age\":25}]",
        output: "name,age\nAlice,30\nBob,25"
      },
      seoContent: {
        whatIsTitle: "What is JSON to CSV Converter?",
        whatIsBody: "JSON to CSV Converter helps you move tabular data between JSON arrays and CSV text so it can be used in spreadsheets, scripts, and import/export flows. It is useful for API responses, reports, and any workflow where one tool expects rows while another expects objects.",
        howToTitle: "How to Use JSON to CSV Converter",
        howToSteps: [
          "Paste JSON or CSV into the input panel.",
          "Choose the conversion direction and delimiter options you need.",
          "Review the converted result and confirm header row behavior.",
          "Copy the output into your spreadsheet, script, or import workflow."
        ]
      },
      learnMore: {
        title: "Understand JSON to CSV Converter",
        whyUseTitle: "Why Use This Tool",
        whyUseItems: [
          "Useful for exports, spreadsheets, APIs, and reporting flows.",
          "Makes row-oriented and object-oriented data easier to switch between.",
          "Runs locally so pasted datasets are not uploaded during conversion."
        ]
      }
    },
  {
      slug: "jsonpath-tester",
      title: "JSONPath Tester Online",
      description: "Test JSONPath expressions against JSON data and inspect results instantly. Supports common filters, wildcards, and nested paths in the browser.",
      category: "format",
      relatedTools: [
        "json-formatter",
        "regex-tester",
        "base64"
      ],
      useCases: [
        "Test JSONPath expressions against API responses and fixtures",
        "Confirm filters and array selectors before using them in code",
        "Debug nested JSON structures by querying only the fields you need",
        "Teach teammates how JSONPath selects nodes from complex payloads"
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
          q: "What does JSONPath Tester Online – Query & Test JSONPath Expressions Free do?",
          a: "JSONPath Tester Online – Query & Test JSONPath Expressions Free runs entirely in your browser and helps you complete this task without uploading data to a server."
        },
        {
          q: "Is JSONPath Tester Online – Query & Test JSONPath Expressions Free free to use?",
          a: "Yes. This tool is free to use and does not require sign-up."
        }
      ],
      example: {
        input: "JSON: {\"users\":[{\"name\":\"Alice\",\"age\":30},{\"name\":\"Bob\",\"age\":17}]}",
        output: "Path: $.users[?(@.age >= 18)].name"
      },
      shortTitle: "JSONPath Tester",
      seoContent: {
        whatIsTitle: "What is JSONPath Tester?",
        whatIsBody: "JSONPath Tester lets you run JSONPath expressions against JSON data and inspect the matched results immediately. It is useful for API debugging, test fixtures, ETL rules, and any workflow where you need to target specific nodes inside nested JSON.",
        howToTitle: "How to Use JSONPath Tester",
        howToSteps: [
          "Paste the JSON document into the input area.",
          "Enter the JSONPath expression you want to test.",
          "Review the returned matches and adjust filters or selectors.",
          "Copy the working path into your app, test, or automation step."
        ]
      },
      learnMore: {
        title: "Understand JSONPath Tester",
        whyUseTitle: "Why Use This Tool",
        whyUseItems: [
          "Helpful for APIs, automation rules, and fixture debugging.",
          "Makes nested arrays and objects easier to query interactively.",
          "Runs in the browser so JSON samples stay local during testing."
        ]
      }
    },
  {
      slug: "line-tools",
      title: "Line Tools Online",
      description: "Sort, deduplicate, reverse, shuffle, and clean one-item-per-line text lists. Useful for keywords, exports, logs, and bulk text cleanup.",
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
          q: "What does Line Tools Online – Sort, Deduplicate & Reverse Lines Free do?",
          a: "Line Tools Online – Sort, Deduplicate & Reverse Lines Free runs entirely in your browser and helps you complete this task without uploading data to a server."
        },
        {
          q: "Is Line Tools Online – Sort, Deduplicate & Reverse Lines Free free to use?",
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
        extraHtml: "<ul><li>Sort A-Z / Z-A</li><li>Deduplicate repeated lines</li><li>Filter matching lines</li><li>Reverse order</li><li>Shuffle items</li><li>Trim whitespace per line</li></ul>",
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
      title: "Markdown to HTML Converter Online",
      description: "Convert Markdown text to clean HTML instantly. Useful for CMS editors, email templates, docs, and static site workflows.",
      category: "convert",
      relatedTools: [
        "markdown-preview",
        "base64",
        "string-escape"
      ],
      useCases: [
        "Convert Markdown docs into HTML snippets for CMS or email workflows",
        "Check how headings, lists, tables, and code blocks render as HTML",
        "Prepare static HTML from notes or README-style content",
        "Inspect generated markup before applying your own CSS layer"
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
      },
      shortTitle: "Markdown to HTML Converter",
      seoContent: {
        whatIsTitle: "What is Markdown to HTML Converter?",
        whatIsBody: "Markdown to HTML Converter turns Markdown syntax into clean HTML markup so you can publish it in websites, emails, CMS editors, and static pages. It is useful when you write in Markdown but need portable HTML output for another system.",
        howToTitle: "How to Use Markdown to HTML Converter",
        howToSteps: [
          "Paste the Markdown text into the input panel.",
          "Review the generated HTML output.",
          "Check that tables, code blocks, and lists render the way you expect.",
          "Copy the HTML into your site, template, or publishing workflow."
        ]
      },
      learnMore: {
        title: "Understand Markdown to HTML Converter",
        whyUseTitle: "Why Use This Tool",
        whyUseItems: [
          "Useful for CMS publishing, docs, static pages, and email content.",
          "Lets you inspect semantic HTML before styling it yourself.",
          "Runs locally so drafts stay on your machine during conversion."
        ]
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
        "Translate words into Morse code for practice",
        "Decode Morse strings into readable text",
        "Create quick examples for lessons or presentations",
        "Explore letter and number mappings without a reference chart"
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
      },
      shortTitle: "Morse Code Translator",
      seoContent: {
        title: "What is Morse Code Translator?",
        body: "Morse Code Translator converts between plain text and Morse code so you can encode messages, decode practice strings, and explore the alphabet quickly. It is useful for education, hobbies, demos, and lightweight text transformations."
      },
      learnMore: {
        title: "Understand Morse Code"
      }
    },
  {
      slug: "number-base",
      title: "Number Base Converter Online – Binary, Octal, Decimal & Hex",
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
          q: "What does Number Base Converter Online – Binary, Octal, Decimal & Hex do?",
          a: "Number Base Converter Online – Binary, Octal, Decimal & Hex runs entirely in your browser and helps you complete this task without uploading data to a server."
        },
        {
          q: "Is Number Base Converter Online – Binary, Octal, Decimal & Hex free to use?",
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
        "Reduce PNG file sizes before web upload",
        "Convert screenshots for email or CMS use",
        "Create JPEG derivatives when transparency is unnecessary",
        "Standardize image formats for content workflows"
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
      },
      shortTitle: "PNG to JPG Converter",
      seoContent: {
        title: "What is PNG to JPG Converter?",
        body: "PNG to JPG Converter turns PNG files into JPEG so you can cut file size and create photo-friendly outputs. It is useful for web uploads, email attachments, blog images, and general cases where transparency is not required.",
        howToTitle: "How to Use PNG to JPG Converter",
        howToSteps: [
          "Upload the PNG image you want to convert.",
          "Choose a background color if the original PNG uses transparency.",
          "Preview the JPEG output and compare the result.",
          "Download the JPG file when the conversion looks right."
        ]
      },
      learnMore: {
        title: "Understand PNG and JPG"
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
        "Remove location metadata before posting photos publicly",
        "Clean image files for client delivery or press use",
        "Strip hidden camera details from product listings",
        "Share screenshots and photos with fewer privacy risks"
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
        input: "Upload a phone photo that includes camera model and GPS metadata",
        output: "The exported image keeps the pixels but removes embedded EXIF metadata fields"
      },
      shortTitle: "EXIF Remover",
      seoContent: {
        title: "What is EXIF Remover?",
        body: "EXIF Remover strips image metadata such as camera details, timestamps, and GPS coordinates before you share a file. It is useful for privacy, public uploads, listings, press kits, and any workflow where hidden metadata should not leave your device.",
        howToTitle: "How to Use EXIF Remover",
        howToSteps: [
          "Upload the photo whose metadata you want to remove.",
          "Let the tool create a clean copy without EXIF information.",
          "Confirm that the image still looks correct after processing.",
          "Download the metadata-free file before sharing it publicly."
        ]
      },
      learnMore: {
        title: "Understand EXIF Metadata"
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
        "Resize feed images to square or portrait Instagram formats",
        "Prepare story graphics at the correct aspect ratio",
        "Create social-ready exports from raw screenshots or photos",
        "Avoid last-minute cropping surprises in the Instagram app"
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
      ],
      shortTitle: "Resize for Instagram",
      seoContent: {
        title: "What is Resize for Instagram?",
        body: "Resize for Instagram prepares images for common Instagram feed, story, reel, and profile dimensions. It is useful when you need fast export sizes for social posting without opening a full design tool.",
        howToTitle: "How to Use Resize for Instagram",
        howToSteps: [
          "Upload the image you want to prepare for Instagram.",
          "Choose the target format such as feed, story, reel, or profile size.",
          "Adjust crop or padding options until the composition looks right.",
          "Download the resized image ready for posting."
        ]
      },
      learnMore: {
        title: "Understand Instagram Image Sizes"
      }
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
      title: "SQL Formatter Online – Beautify MySQL, PostgreSQL & SQLite",
      description: "Format and beautify SQL queries for MySQL, PostgreSQL, SQLite, and standard SQL. Keyword case options, configurable indent. Free, browser-based.",
      category: "format",
      relatedTools: [
        "json-formatter",
        "css-formatter",
        "regex-tester"
      ],
      useCases: [
        "Beautify long SQL queries before code review or debugging",
        "Normalize keyword casing and indentation across shared query snippets",
        "Make JOINs, CTEs, and subqueries easier to scan in logs or tickets",
        "Prepare readable SQL examples for docs, notebooks, or internal guides"
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
          q: "What does SQL Formatter Online – Beautify MySQL, PostgreSQL & SQLite do?",
          a: "SQL Formatter Online – Beautify MySQL, PostgreSQL & SQLite runs entirely in your browser and helps you complete this task without uploading data to a server."
        },
        {
          q: "Is SQL Formatter Online – Beautify MySQL, PostgreSQL & SQLite free to use?",
          a: "Yes. This tool is free to use and does not require sign-up."
        }
      ],
      example: {
        input: "Input: select id,name from users where id=1 and active=True",
        output: "Formatted:"
      },
      shortTitle: "SQL Formatter",
      seoContent: {
        whatIsTitle: "What is SQL Formatter?",
        whatIsBody: "SQL Formatter rewrites raw SQL into a clean, readable layout so clauses, joins, filters, and nested queries are easier to understand. It is useful for database debugging, code review, incident response, and sharing queries with teammates.",
        howToTitle: "How to Use SQL Formatter",
        howToSteps: [
          "Paste the SQL query you want to beautify.",
          "Choose casing or indentation options if the tool provides them.",
          "Format the query and review the structured output.",
          "Copy the result into your editor, ticket, or documentation."
        ]
      },
      learnMore: {
        title: "Understand SQL Formatter",
        whyUseTitle: "Why Use This Tool",
        whyUseItems: [
          "Makes large queries with joins and subqueries easier to inspect.",
          "Useful when debugging generated SQL from ORMs or BI tools.",
          "Runs locally so queries stay in the browser while you format them."
        ]
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
        "Escape quotes and line breaks for JSON or JS literals",
        "Unescape copied strings from logs or network payloads",
        "Prepare HTML-safe strings for templates or demos",
        "Clean test fixture content before embedding it in code"
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
      },
      shortTitle: "String Escape Tool",
      seoContent: {
        title: "What is String Escape Tool?",
        body: "String Escape Tool converts raw text into escaped strings for JavaScript, JSON, HTML, and related formats, and can reverse that process when needed. It is useful for debugging payloads, building fixtures, and preparing content for embedding in code."
      },
      learnMore: {
        title: "Understand String Escaping"
      }
    },
  {
      slug: "text-case",
      title: "Text Case Converter Online – camelCase, snake_case & More",
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
          q: "What does Text Case Converter Online – camelCase, snake_case & More do?",
          a: "Text Case Converter Online – camelCase, snake_case & More runs entirely in your browser and helps you complete this task without uploading data to a server."
        },
        {
          q: "Is Text Case Converter Online – camelCase, snake_case & More free to use?",
          a: "Yes. This tool is free to use and does not require sign-up."
        }
      ],
      shortTitle: "Text Case Converter",
      example: {
        input: "hello world",
        output: "camelCase: helloWorld - snake_case: hello_world - kebab-case: hello-world"
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
        "Build marketing links with query parameters",
        "Assemble API endpoints for testing and docs",
        "Avoid mistakes when adding fragments and encoded params",
        "Share complex URLs after previewing the final output"
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
      },
      shortTitle: "URL Builder",
      seoContent: {
        title: "What is URL Builder?",
        body: "URL Builder helps you assemble URLs from a base address, path, query parameters, and fragments without hand-editing separators. It is useful for tracking links, API requests, QA scenarios, and sharing long URLs with fewer mistakes.",
        howToTitle: "How to Use URL Builder",
        howToSteps: [
          "Enter the base URL or domain you want to start from.",
          "Add the path, query parameters, and fragment values you need.",
          "Review the assembled URL and the encoded parameter values.",
          "Copy the final link for analytics, QA, API calls, or sharing."
        ]
      },
      learnMore: {
        title: "Understand URL Building"
      }
    },
  {
      slug: "url-parser",
      title: "URL Parser Online",
      description: "Break a URL into protocol, host, path, query, and hash parts instantly. Useful for debugging links, redirects, and tracking parameters.",
      category: "encode",
      relatedTools: [
        "url-encode",
        "http-status",
        "string-escape"
      ],
      useCases: [
        "Inspect query parameters in tracking links",
        "Debug malformed URLs before sharing or deploying them",
        "Check redirect targets and fragments during QA",
        "Break down API endpoint URLs for documentation"
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
          q: "What does URL Parser & Builder Online – Parse & Construct URLs Free do?",
          a: "URL Parser & Builder Online – Parse & Construct URLs Free runs entirely in your browser and helps you complete this task without uploading data to a server."
        },
        {
          q: "Is URL Parser & Builder Online – Parse & Construct URLs Free free to use?",
          a: "Yes. This tool is free to use and does not require sign-up."
        }
      ],
      shortTitle: "URL Parser",
      seoContent: {
        title: "What is URL Parser?",
        body: "URL Parser breaks a URL into protocol, host, path, query parameters, and fragments so you can inspect how a link is structured. It is useful for QA, debugging redirects, analytics links, and API request analysis.",
        howToTitle: "How to Use URL Parser",
        howToSteps: [
          "Paste the full URL into the input field.",
          "Review the parsed protocol, host, path, query string, and fragment parts.",
          "Inspect individual query parameters when you need to debug tracking or API links.",
          "Copy the decoded pieces or use the result to rebuild a cleaner URL."
        ]
      },
      learnMore: {
        title: "Understand URL Parts"
      }
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
        "Identify browser, OS, and device details from copied UA strings",
        "Inspect crawler and bot user agents during analytics or SEO debugging",
        "Compare how different devices are reported in server logs",
        "Check whether a support ticket contains a spoofed or unexpected UA string"
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
      },
      shortTitle: "User Agent Parser",
      seoContent: {
        whatIsTitle: "What is User Agent Parser?",
        whatIsBody: "User Agent Parser reads browser user-agent strings and extracts details such as browser family, rendering engine, operating system, device type, and bot signals. It is useful for support, analytics review, log inspection, and quick browser environment checks.",
        howToTitle: "How to Use User Agent Parser",
        howToSteps: [
          "Paste the user-agent string into the input area.",
          "Review the detected browser, OS, engine, and device fields.",
          "Check whether the parser flags the string as a bot or crawler.",
          "Copy the results into your debugging notes, ticket, or report."
        ]
      },
      learnMore: {
        title: "Understand User Agent Parser",
        whyUseTitle: "Why Use This Tool",
        whyUseItems: [
          "Useful for support tickets, analytics checks, and log review.",
          "Helps distinguish browsers, engines, devices, and crawler traffic quickly.",
          "Runs locally so pasted UA strings are not uploaded anywhere."
        ]
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
        "Convert WebP files for software that only accepts JPG",
        "Prepare website assets for document or slide use",
        "Share browser-downloaded images with teams using older tools",
        "Standardize mixed image libraries into a more compatible format"
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
      },
      shortTitle: "WebP to JPG Converter",
      seoContent: {
        title: "What is WebP to JPG Converter?",
        body: "WebP to JPG Converter changes WebP images into JPEG for broader compatibility with older tools, CMS platforms, and document workflows. It is useful when a browser-exported WebP file cannot be used directly elsewhere.",
        howToTitle: "How to Use WebP to JPG Converter",
        howToSteps: [
          "Upload the WebP image you need to convert.",
          "Let the tool convert it into a JPEG-compatible output.",
          "Check the preview if you want to confirm the visual result.",
          "Download the JPG file for broader software or CMS compatibility."
        ]
      },
      learnMore: {
        title: "Understand WebP to JPG Conversion"
      }
    },
  {
      slug: "xml-formatter",
      title: "XML Formatter & Validator Online - Beautify & Validate XML",
      description: "Format, beautify, and validate XML online. Minify XML to reduce file size. Supports well-formedness validation. Free, browser-based, no data sent.",
      category: "format",
      shortTitle: "XML Formatter & Validator",
      relatedTools: [
        "json-formatter",
        "xml-json",
        "html-formatter"
      ],
      useCases: [
        "Beautify compact XML payloads before debugging or review",
        "Check whether copied XML is well formed before sending it downstream",
        "Minify XML again after editing or validation",
        "Inspect namespaces, attributes, and nesting in SOAP or feed documents"
      ],
      faq: [
        {
          q: "Does it validate XML schema (XSD)?",
          a: "It checks well-formedness but not schema validation against an XSD or DTD."
        },
        {
          q: "Does it handle XML namespaces?",
          a: "Yes. Namespace prefixes and xmlns declarations are preserved."
        },
        {
          q: "What does XML Formatter & Validator Online - Beautify & Validate XML do?",
          a: "XML Formatter & Validator Online - Beautify & Validate XML runs entirely in your browser and helps you complete this task without uploading data to a server."
        },
        {
          q: "Is XML Formatter & Validator Online - Beautify & Validate XML free to use?",
          a: "Yes. This tool is free to use and does not require sign-up."
        }
      ],
      example: {
        input: "<root><item id=\"1\">Hello</item></root>",
        output: "<root>\n  <item id=\"1\">Hello</item>\n</root>"
      },
      seoContent: {
        whatIsTitle: "What is XML Formatter & Validator?",
        whatIsBody: "XML Formatter & Validator makes XML easier to read, check, and clean up by formatting indentation and confirming whether the document is well formed. It is useful for API payloads, config files, SOAP envelopes, feeds, and any XML you need to inspect before use.",
        howToTitle: "How to Use XML Formatter & Validator",
        howToSteps: [
          "Paste XML into the input area.",
          "Choose whether you want to format, minify, or validate the document.",
          "Review the output or validation message for syntax issues.",
          "Copy the cleaned XML back into your app, request, or config file."
        ]
      },
      learnMore: {
        title: "Understand XML Formatter & Validator",
        whyUseTitle: "Why Use This Tool",
        whyUseItems: [
          "Useful for SOAP payloads, feeds, exports, and integration debugging.",
          "Helps you spot malformed tags and nesting errors before deployment.",
          "Runs locally so XML documents stay in the browser while you inspect them."
        ]
      }
    },
  {
      slug: "yaml-json",
      title: "YAML to JSON Converter Online - Parse & Convert YAML Free",
      description: "Convert YAML to JSON and JSON to YAML instantly. Supports nested objects, arrays, comments, and multi-line strings. Free, browser-based, no data sent.",
      category: "convert",
      shortTitle: "YAML to JSON Converter",
      relatedTools: [
        "json-formatter",
        "toml-json",
        "xml-json"
      ],
      useCases: [
        "Convert configuration files between YAML and JSON during development",
        "Inspect API payloads and deployment configs in the format your team prefers",
        "Debug indentation-sensitive YAML by converting it into structured JSON",
        "Prepare Kubernetes, CI, or app config snippets for different tooling"
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
          a: "The tool converts a single YAML document at a time. Multi-document YAML (separated by ---) is not currently supported."
        },
        {
          q: "Is my data safe?",
          a: "Yes. All processing happens entirely in your browser using JavaScript. No data is ever sent to a server."
        }
      ],
      example: {
        input: "name: app\nenv:\n  stage: prod\n  region: us-east-1",
        output: "{\n  \"name\": \"app\",\n  \"env\": {\n    \"stage\": \"prod\",\n    \"region\": \"us-east-1\"\n  }\n}"
      },
      seoContent: {
        whatIsTitle: "What is YAML to JSON Converter?",
        whatIsBody: "YAML to JSON Converter switches structured data between YAML and JSON so you can work in whichever format your toolchain expects. It is useful for config files, API payloads, CI pipelines, and debugging indentation-heavy YAML documents.",
        howToTitle: "How to Use YAML to JSON Converter",
        howToSteps: [
          "Paste YAML when you want JSON output, or switch modes for the reverse conversion.",
          "Review the parsed result and check for syntax errors if conversion fails.",
          "Adjust JSON indentation if you want compact or readable output.",
          "Copy the converted data into your app, config file, or deployment workflow."
        ]
      },
      learnMore: {
        title: "Understand YAML to JSON Converter",
        whyUseTitle: "Why Use This Tool",
        whyUseItems: [
          "Useful for configs, payloads, CI files, and Kubernetes manifests.",
          "Helps reveal YAML structure issues by converting into explicit JSON objects.",
          "Runs in the browser so config content stays local during conversion."
        ]
      }
    }
,
  {
      slug: "email-extractor",
      title: "Email Extractor Online Free | Pull Email Addresses from Text | Simple ToolBox",
      description: "Extract email addresses from pasted text, logs, CSV exports, or web content. Remove duplicates, sort results, lowercase addresses, and copy the list instantly in your browser.",
      category: "text",
      shortTitle: "Email Extractor",
      relatedTools: [
        "line-tools",
        "word-counter",
        "text-cleaner"
      ],
      useCases: [
        "Pull contact addresses out of pasted lead lists or CRM notes",
        "Extract email addresses from support tickets, logs, or copied webpages",
        "Clean exported CSV text before importing into another tool",
        "Build a deduplicated outreach or review list without writing a script"
      ],
      faq: [
        {
          q: "Does it validate whether the email address actually exists?",
          a: "No. It extracts strings that match common email patterns, but it does not verify inbox existence or deliverability."
        },
        {
          q: "Can I remove duplicates automatically?",
          a: "Yes. The Remove duplicates option is enabled by default, so repeated addresses collapse into one line."
        },
        {
          q: "Can I lowercase all results?",
          a: "Yes. Turn on Convert to lowercase if you want the output normalized before copying it elsewhere."
        },
        {
          q: "Is my text uploaded anywhere?",
          a: "No. The extraction runs entirely in your browser and the pasted content stays on your device."
        }
      ],
      example: {
        input: "Sales: team@example.com, Support@Example.com, jane.doe@vendor.io, team@example.com",
        output: "jane.doe@vendor.io\nsupport@example.com\nteam@example.com"
      },
      seoContent: {
        whatIsTitle: "What is Email Extractor?",
        whatIsBody: "Email Extractor scans pasted text and pulls out strings that look like email addresses. It is useful for copied webpages, logs, exports, CRM notes, and any messy text where you need a clean email list fast.",
        howToTitle: "How to Use Email Extractor",
        howToSteps: [
          "Paste the text that contains one or more email addresses.",
          "Choose whether to remove duplicates, sort the results, or lowercase the output.",
          "Review the extracted list and match counters instantly.",
          "Copy the cleaned email list for your spreadsheet, CRM, or audit workflow."
        ]
      },
      learnMore: {
        title: "Understand Email Extraction",
        whyUseTitle: "Why Use This Tool",
        whyUseItems: [
          "Faster than cleaning messy contact text manually.",
          "Useful for exports, support logs, lead lists, and copied webpages.",
          "Runs locally so contact data stays in the browser."
        ]
      }
    },
  {
      slug: "url-extractor",
      title: "URL Extractor Online Free | Pull Links from Text | Simple ToolBox",
      description: "Extract URLs from text, logs, notes, HTML snippets, or exports. Remove duplicates, sort links, normalize www addresses, and copy the result instantly in your browser.",
      category: "text",
      shortTitle: "URL Extractor",
      relatedTools: [
        "url-parser",
        "url-encode",
        "line-tools"
      ],
      useCases: [
        "Pull all links from copied notes, markdown, or webpage text",
        "Extract URLs from logs before checking them elsewhere",
        "Normalize plain www addresses into full links for reuse",
        "Create a deduplicated list of referenced pages or resources"
      ],
      faq: [
        {
          q: "Does it extract plain www.example.com links?",
          a: "Yes. Links starting with www. are matched, and you can normalize them to https:// URLs with one option."
        },
        {
          q: "Will it remove trailing commas or periods?",
          a: "Yes. Common trailing punctuation is stripped so copied links are cleaner."
        },
        {
          q: "Can I sort and deduplicate the result?",
          a: "Yes. Both options are enabled by default, and you can turn them off if you want the original order preserved."
        },
        {
          q: "Is the text sent to a server?",
          a: "No. All extraction happens locally in your browser."
        }
      ],
      example: {
        input: "Docs: https://www.simpletoolbox.dev/tools/url-encode.html and www.example.com/pricing",
        output: "https://www.simpletoolbox.dev/tools/url-encode.html\nhttps://www.example.com/pricing"
      },
      seoContent: {
        whatIsTitle: "What is URL Extractor?",
        whatIsBody: "URL Extractor pulls links out of pasted text and turns them into a clean one-per-line list. It is useful for notes, logs, scraped content, markdown, and any text where links are mixed with other content.",
        howToTitle: "How to Use URL Extractor",
        howToSteps: [
          "Paste text that contains one or more URLs.",
          "Choose whether to remove duplicates, sort the links, or normalize www links.",
          "Review the extracted URL list and counters instantly.",
          "Copy the cleaned links into your audit, spreadsheet, or next tool."
        ]
      },
      learnMore: {
        title: "Understand URL Extraction",
        whyUseTitle: "Why Use This Tool",
        whyUseItems: [
          "Useful for audits, logs, copied articles, and markdown snippets.",
          "Helps turn mixed text into a clean link list in one step.",
          "Runs locally so private notes and logs stay on your device."
        ]
      }
    },
  {
      slug: "phone-extractor",
      title: "Phone Number Extractor Online Free | Pull Numbers from Text | Simple ToolBox",
      description: "Extract phone numbers from pasted text, exports, CRM notes, or lead lists. Remove duplicates, sort numbers, keep digits only, and copy the result instantly in your browser.",
      category: "text",
      shortTitle: "Phone Number Extractor",
      relatedTools: [
        "line-tools",
        "text-cleaner",
        "word-counter"
      ],
      useCases: [
        "Pull phone numbers from CRM notes, lead dumps, or copied documents",
        "Clean contact exports before importing them into another system",
        "Strip formatting and keep digits only for downstream processing",
        "Build a deduplicated call list without spreadsheet formulas or scripts"
      ],
      faq: [
        {
          q: "Does it support international formats?",
          a: "It supports many common international patterns that include spaces, dashes, parentheses, and optional leading plus signs."
        },
        {
          q: "Why are some short number strings ignored?",
          a: "Matches with fewer than 7 digits are skipped to reduce false positives from IDs, zip codes, or short codes."
        },
        {
          q: "Can I keep only digits in the output?",
          a: "Yes. Turn on Keep digits only to remove spaces, dashes, and parentheses from each extracted number."
        },
        {
          q: "Is my contact data uploaded anywhere?",
          a: "No. The tool runs entirely in your browser and does not send the pasted text to a server."
        }
      ],
      example: {
        input: "+1 (555) 123-4567, +44 20 7946 0958, 555-123-4567",
        output: "+1 (555) 123-4567\n+44 20 7946 0958\n555-123-4567"
      },
      seoContent: {
        whatIsTitle: "What is Phone Number Extractor?",
        whatIsBody: "Phone Number Extractor scans pasted text and finds values that look like phone numbers. It is useful for lead lists, CRM notes, exports, messages, and any copied document where phone numbers are mixed into larger blocks of text.",
        howToTitle: "How to Use Phone Number Extractor",
        howToSteps: [
          "Paste text that contains one or more phone numbers.",
          "Choose whether to remove duplicates, sort the result, or keep digits only.",
          "Review the extracted list and counts instantly.",
          "Copy the cleaned numbers into your CRM, spreadsheet, or call workflow."
        ]
      },
      learnMore: {
        title: "Understand Phone Number Extraction",
        whyUseTitle: "Why Use This Tool",
        whyUseItems: [
          "Useful for lead cleanup, contact exports, and pasted notes.",
          "Helps isolate phone numbers from messy mixed-content text quickly.",
          "Runs locally so contact data never leaves the browser."
        ]
      }
    },
  {
      slug: "png-to-webp",
      title: "PNG to WebP Converter Online",
      description: "Convert PNG images to WebP online. Adjust output quality, compare file size, and download the converted WebP instantly in your browser.",
      category: "image",
      shortTitle: "PNG to WebP Converter",
      relatedTools: [
        "webp-converter",
        "image-compressor",
        "jpg-to-png"
      ],
      useCases: [
        "Shrink PNG assets before uploading them to websites or CMS platforms",
        "Keep transparency while reducing file size for UI graphics and stickers",
        "Prepare faster-loading images for landing pages and product cards",
        "Convert exported design assets into a more web-friendly image format"
      ],
      faq: [
        {
          q: "Does WebP keep transparency from PNG?",
          a: "Yes. WebP supports transparency, so transparent PNG files can be converted without losing the alpha channel."
        },
        {
          q: "Why is WebP usually smaller than PNG?",
          a: "WebP uses more modern compression methods than PNG, especially for photographs and mixed graphics, so the same image often takes less space."
        },
        {
          q: "Can I control output quality?",
          a: "Yes. Use the quality slider to trade file size against sharpness before downloading the result."
        },
        {
          q: "Is the conversion done locally?",
          a: "Yes. The image is processed entirely in your browser and never uploaded to a server."
        }
      ],
      example: {
        input: "Upload a transparent 1200x1200 PNG product badge (420 KB)",
        output: "Download a transparent WebP version at 85% quality with a smaller file size"
      },
      seoContent: {
        whatIsTitle: "What is PNG to WebP Converter?",
        whatIsBody: "PNG to WebP Converter turns PNG images into WebP so you can keep visual quality and transparency while usually reducing file size. It is useful for websites, product assets, UI graphics, and social images that need to load faster.",
        howToTitle: "How to Use PNG to WebP Converter",
        howToSteps: [
          "Drop a PNG file into the tool or click to browse.",
          "Adjust the quality slider until the size and quality tradeoff looks right.",
          "Review the preview and file size comparison instantly.",
          "Download the converted WebP file for your site, app, or asset library."
        ]
      },
      learnMore: {
        title: "Understand PNG to WebP Conversion",
        whyUseTitle: "Why Use This Tool",
        whyUseItems: [
          "Useful for web graphics, transparent assets, and site-speed optimization.",
          "Lets you balance sharpness and file size without opening a desktop editor.",
          "Runs locally so private design assets stay on your device."
        ]
      }
    },
  {
      slug: "svg-to-png",
      title: "SVG to PNG Converter Online",
      description: "Convert SVG files to PNG online. Choose 1x, 2x, 3x, or 4x export scale and download a raster PNG instantly in your browser.",
      category: "image",
      shortTitle: "SVG to PNG Converter",
      relatedTools: [
        "jpg-to-png",
        "png-to-jpg",
        "image-resizer"
      ],
      useCases: [
        "Turn vector logos or icons into PNG assets for apps and slide decks",
        "Export SVG artwork for platforms that only accept raster images",
        "Generate multiple pixel-density versions of the same SVG design",
        "Convert design handoff files into ready-to-upload image outputs"
      ],
      faq: [
        {
          q: "Why would I convert SVG to PNG?",
          a: "PNG is easier to upload into many CMS, slide, social, and marketplace workflows that do not fully support SVG files."
        },
        {
          q: "What does 2x or 4x export scale mean?",
          a: "It multiplies the raster output dimensions. For example, a 200x200 SVG exported at 4x becomes an 800x800 PNG."
        },
        {
          q: "Does PNG stay editable like SVG?",
          a: "No. SVG is vector-based, while PNG is raster output made of pixels, so the exported file is no longer infinitely scalable."
        },
        {
          q: "Is the SVG uploaded to a server?",
          a: "No. The file is read and rasterized locally in your browser."
        }
      ],
      example: {
        input: "Upload a 256x256 SVG app icon and choose 4x export scale",
        output: "Download a 1024x1024 PNG for app store or presentation use"
      },
      seoContent: {
        whatIsTitle: "What is SVG to PNG Converter?",
        whatIsBody: "SVG to PNG Converter rasterizes vector SVG files into PNG images at the export scale you choose. It is useful when a design is in SVG format but the destination requires a pixel-based image file.",
        howToTitle: "How to Use SVG to PNG Converter",
        howToSteps: [
          "Drop an SVG file into the tool or browse for it manually.",
          "Pick the export scale that matches your target use case.",
          "Review the preview and source versus output size instantly.",
          "Download the PNG file for upload, sharing, or asset delivery."
        ]
      },
      learnMore: {
        title: "Understand SVG to PNG Conversion",
        whyUseTitle: "Why Use This Tool",
        whyUseItems: [
          "Useful for logos, icons, illustrations, and design handoff files.",
          "Makes vector artwork easy to reuse in raster-only workflows.",
          "Runs locally so private design files stay in the browser."
        ]
      }
    },
  {
      slug: "bmp-to-png",
      title: "BMP to PNG Converter Online Free | Convert BMP to PNG | Simple ToolBox",
      description: "Convert BMP images to PNG online for free. Turn bitmap files into portable PNG images instantly and download the result in your browser without uploading anything.",
      category: "image",
      shortTitle: "BMP to PNG Converter",
      relatedTools: [
        "jpg-to-png",
        "png-to-jpg",
        "image-compressor"
      ],
      useCases: [
        "Convert legacy BMP images from Windows apps into modern PNG files",
        "Prepare bitmap screenshots and exports for web or document use",
        "Turn old design assets into a format that works everywhere",
        "Reuse BMP files in tools that do not accept bitmap uploads directly"
      ],
      faq: [
        {
          q: "Why convert BMP to PNG?",
          a: "BMP files are bulky and not well suited for modern sharing or web workflows. PNG is widely supported and usually easier to reuse."
        },
        {
          q: "Does PNG reduce image quality compared with BMP?",
          a: "No. PNG uses lossless compression, so the pixel data is preserved."
        },
        {
          q: "Will the converted PNG be smaller?",
          a: "Often yes. BMP is usually uncompressed, while PNG compresses the same image data more efficiently without losing quality."
        },
        {
          q: "Is the bitmap uploaded anywhere?",
          a: "No. The conversion happens entirely in your browser on your device."
        }
      ],
      example: {
        input: "Upload a bitmap screenshot exported from an older Windows tool",
        output: "Download a PNG version that is easier to share and reuse"
      },
      seoContent: {
        whatIsTitle: "What is BMP to PNG Converter?",
        whatIsBody: "BMP to PNG Converter changes bitmap image files into PNG so they become easier to share, upload, and reuse in modern workflows. It is especially useful for older Windows exports, archived assets, and bulky BMP screenshots.",
        howToTitle: "How to Use BMP to PNG Converter",
        howToSteps: [
          "Drop a BMP file into the tool or click to browse.",
          "Review the preview and original file information instantly.",
          "Check the converted PNG size and dimensions.",
          "Download the new PNG file for reuse in websites, docs, or design tools."
        ]
      },
      learnMore: {
        title: "Understand BMP to PNG Conversion",
        whyUseTitle: "Why Use This Tool",
        whyUseItems: [
          "Useful for legacy image exports and old Windows bitmap files.",
          "Makes BMP images easier to share and use in modern apps.",
          "Runs locally so your files never leave the browser."
        ]
      }
    },
  {
      slug: "crop-image",
      title: "Crop Image Online",
      description: "Crop images online to the exact area you need. Use square or social presets, preview the result, and download the cropped image instantly.",
      category: "image",
      shortTitle: "Crop Image",
      relatedTools: [
        "image-resizer",
        "image-rotate",
        "png-to-jpg"
      ],
      useCases: [
        "Crop screenshots before adding them to docs or slide decks",
        "Prepare square, portrait, or landscape image cuts for social posts",
        "Remove unused edges from product photos or UI exports",
        "Create exact image areas without opening desktop editing software"
      ],
      faq: [
        {
          q: "Can I crop to a square or portrait ratio?",
          a: "Yes. Use the built-in ratio presets such as 1:1, 16:9, or 4:5 to jump to common crop shapes quickly."
        },
        {
          q: "Do I need to drag a crop box?",
          a: "No. This version focuses on precise numeric crop control so you can edit the crop area exactly and see the result immediately."
        },
        {
          q: "Can I download the cropped result as PNG or JPEG?",
          a: "Yes. Choose the output format before downloading the cropped image."
        },
        {
          q: "Is the image uploaded anywhere?",
          a: "No. The crop preview and export run entirely in your browser."
        }
      ],
      example: {
        input: "Upload a 1600x900 screenshot and switch to a 1:1 crop preset",
        output: "Download a square crop for a social thumbnail or avatar"
      },
      seoContent: {
        whatIsTitle: "What is Crop Image?",
        whatIsBody: "Crop Image lets you trim a picture down to the exact area you need. It is useful for social posts, screenshots, product photos, and any image that needs a cleaner frame before publishing or sharing.",
        howToTitle: "How to Use Crop Image",
        howToSteps: [
          "Upload an image into the crop tool.",
          "Choose a free or preset crop ratio.",
          "Adjust the crop coordinates and size until the preview looks right.",
          "Download the cropped result in your preferred format."
        ]
      },
      learnMore: {
        title: "Understand Image Cropping",
        whyUseTitle: "Why Use This Tool",
        whyUseItems: [
          "Useful for screenshots, product images, and social media assets.",
          "Makes exact cropping possible without opening a desktop editor.",
          "Runs locally so your images stay on your device."
        ]
      }
    },
  {
      slug: "favicon-generator",
      title: "Favicon Generator Online",
      description: "Generate favicon PNG files online. Upload an image, preview common favicon sizes, and download small website icons instantly in your browser.",
      category: "design",
      shortTitle: "Favicon Generator",
      relatedTools: [
        "image-resizer",
        "svg-to-png",
        "png-to-webp"
      ],
      useCases: [
        "Turn a logo into website favicon assets",
        "Preview how a tiny site icon looks at common browser sizes",
        "Export standard PNG icon sizes for app demos and prototypes",
        "Generate quick favicon files without opening a graphics editor"
      ],
      faq: [
        {
          q: "What favicon sizes does this tool create?",
          a: "This tool previews and exports common favicon PNG sizes such as 16x16, 32x32, 48x48, and 64x64."
        },
        {
          q: "Why do simple logos work better for favicons?",
          a: "Favicons are tiny, so high-detail artwork becomes unreadable. Bold shapes, letters, and strong contrast stay visible better at small sizes."
        },
        {
          q: "Does this tool export ICO files?",
          a: "This version focuses on PNG favicon sizes. If you need ICO packaging later, PNG exports still give you the core icon assets."
        },
        {
          q: "Is my logo uploaded anywhere?",
          a: "No. Everything runs locally in your browser."
        }
      ],
      example: {
        input: "Upload a square 512x512 logo and preview it at 16x16 and 32x32",
        output: "Download the favicon PNG sizes that still look clear at tiny browser-tab scale"
      },
      seoContent: {
        whatIsTitle: "What is Favicon Generator?",
        whatIsBody: "Favicon Generator turns a source image into small website icon sizes so you can preview and export favicons quickly. It is useful for websites, prototypes, landing pages, and quick design handoff workflows.",
        howToTitle: "How to Use Favicon Generator",
        howToSteps: [
          "Upload a logo or icon image into the tool.",
          "Switch between standard favicon sizes to inspect clarity.",
          "Download the PNG sizes you want to use on your site.",
          "Test the smallest sizes to make sure the icon is still readable."
        ]
      },
      learnMore: {
        title: "Understand Favicon Generation",
        whyUseTitle: "Why Use This Tool",
        whyUseItems: [
          "Useful for site launches, redesigns, and quick branding work.",
          "Lets you see tiny favicon readability before exporting files.",
          "Runs locally so logos and brand assets stay private."
        ]
      }
    },
  {
      slug: "color-picker-from-image",
      title: "Color Picker From Image Online Free | Pick HEX Colors from Images | Simple ToolBox",
      description: "Pick colors from an uploaded image online for free. Click any point to get HEX and RGB values, save swatches, and copy picked colors instantly in your browser.",
      category: "design",
      shortTitle: "Color Picker From Image",
      relatedTools: [
        "color-picker",
        "color-converter",
        "color-palette"
      ],
      useCases: [
        "Sample brand colors from a screenshot or product image",
        "Extract a HEX color from a photo for design matching",
        "Build quick swatch references from inspiration images",
        "Check exact pixel colors before recreating UI elements"
      ],
      faq: [
        {
          q: "How do I pick a color from the image?",
          a: "Upload an image and click any point on the preview. The tool reads the clicked pixel and shows the HEX and RGB values instantly."
        },
        {
          q: "Can I save multiple colors?",
          a: "Yes. Use Save Swatch to store several picked colors for quick comparison and copying."
        },
        {
          q: "Does it support HEX and RGB output?",
          a: "Yes. The tool shows both HEX and RGB for the currently picked pixel color."
        },
        {
          q: "Is the uploaded image sent to a server?",
          a: "No. Color picking happens entirely inside your browser."
        }
      ],
      example: {
        input: "Upload a product screenshot and click a button background color",
        output: "Copy the exact HEX and RGB values and save the swatch for later reference"
      },
      seoContent: {
        whatIsTitle: "What is Color Picker From Image?",
        whatIsBody: "Color Picker From Image lets you upload a picture and sample exact pixel colors from any point in the preview. It is useful for design matching, reverse engineering UI colors, palette extraction, and visual audits.",
        howToTitle: "How to Use Color Picker From Image",
        howToSteps: [
          "Upload an image into the tool.",
          "Click anywhere on the preview to sample that pixel color.",
          "Copy the HEX or RGB value you need.",
          "Save multiple swatches if you want a small palette from the same image."
        ]
      },
      learnMore: {
        title: "Understand Image Color Picking",
        whyUseTitle: "Why Use This Tool",
        whyUseItems: [
          "Useful for design systems, screenshots, and visual reverse engineering.",
          "Gives exact HEX and RGB values without opening a graphics editor.",
          "Runs locally so private images stay on your device."
        ]
      }
    },
  {
      slug: "merge-images",
      title: "Merge Images Online",
      description: "Merge multiple images online. Combine photos vertically or horizontally, set spacing and background color, then download one merged image instantly.",
      category: "image",
      shortTitle: "Merge Images",
      relatedTools: [
        "crop-image",
        "image-resizer",
        "image-compressor"
      ],
      useCases: [
        "Stack screenshots into one image for docs or support tickets",
        "Combine photo steps into a single vertical how-to graphic",
        "Place multiple exports side by side for quick comparison",
        "Create one shareable image instead of sending several files"
      ],
      faq: [
        {
          q: "Can I merge images vertically and horizontally?",
          a: "Yes. Switch between vertical and horizontal layout depending on whether you want a stacked strip or a side-by-side image."
        },
        {
          q: "Can I control spacing between images?",
          a: "Yes. Use the gap slider to add no spacing or a larger gutter between each image."
        },
        {
          q: "What output format does it download?",
          a: "This version downloads the merged result as a PNG so the combined layout stays intact."
        },
        {
          q: "Are the uploaded images sent anywhere?",
          a: "No. Everything runs locally in your browser."
        }
      ],
      example: {
        input: "Upload three product screenshots and choose a vertical layout with 16 px gap",
        output: "Download one long PNG that combines all screenshots into a single image"
      },
      seoContent: {
        whatIsTitle: "What is Merge Images?",
        whatIsBody: "Merge Images combines multiple photos or screenshots into one output image. It is useful for step-by-step guides, support reports, social carousels, and any workflow where one combined image is easier to share than several separate files.",
        howToTitle: "How to Use Merge Images",
        howToSteps: [
          "Upload at least two images into the tool.",
          "Choose a vertical or horizontal merge layout.",
          "Adjust the gap and background color if needed.",
          "Preview the combined result and download the merged PNG."
        ]
      },
      learnMore: {
        title: "Understand Image Merging",
        whyUseTitle: "Why Use This Tool",
        whyUseItems: [
          "Useful for screenshot bundles, tutorials, and quick side-by-side comparisons.",
          "Lets you control layout and spacing without opening a desktop editor.",
          "Runs locally so your images stay on your device."
        ]
      }
    },
  {
      slug: "image-palette-extractor",
      title: "Image Palette Extractor Online",
      description: "Extract a color palette from an image online. Generate dominant HEX colors, copy swatches instantly, and review a compact palette in your browser.",
      category: "image",
      shortTitle: "Image Palette Extractor",
      relatedTools: [
        "color-picker-from-image",
        "color-palette",
        "color-converter"
      ],
      useCases: [
        "Pull dominant brand colors from a hero image",
        "Build a compact palette from mood boards and inspiration shots",
        "Extract reusable HEX colors from product photos",
        "Review image color balance before designing around it"
      ],
      faq: [
        {
          q: "How does the palette extractor choose colors?",
          a: "It samples the uploaded image and groups similar pixels so the most dominant colors rise to the top of the palette."
        },
        {
          q: "Can I change how many colors appear?",
          a: "Yes. Adjust the palette size slider to generate fewer or more swatches."
        },
        {
          q: "Can I copy the HEX values?",
          a: "Yes. Each extracted swatch has its own copy button."
        },
        {
          q: "Is the uploaded image processed locally?",
          a: "Yes. Palette extraction runs entirely in your browser."
        }
      ],
      example: {
        input: "Upload a travel photo and set the palette size to 6 colors",
        output: "Copy six dominant HEX values for a quick landing-page palette"
      },
      seoContent: {
        whatIsTitle: "What is Image Palette Extractor?",
        whatIsBody: "Image Palette Extractor finds dominant colors inside a photo or screenshot and turns them into a small set of reusable swatches. It is useful for design inspiration, branding work, UI matching, and creating color references from real images.",
        howToTitle: "How to Use Image Palette Extractor",
        howToSteps: [
          "Upload one image into the tool.",
          "Choose how many colors you want in the final palette.",
          "Adjust the sampling detail if you want a tighter or broader palette.",
          "Copy the HEX values you want to reuse."
        ]
      },
      learnMore: {
        title: "Understand Image Palette Extraction",
        whyUseTitle: "Why Use This Tool",
        whyUseItems: [
          "Useful for design systems, mood boards, and quick branding exploration.",
          "Turns large images into a small palette you can copy immediately.",
          "Runs locally so private images stay on your device."
        ]
      }
    },
  {
      slug: "pixelate-image",
      title: "Pixelate Image Online Free | Make Mosaic or Pixel Art Effects | Simple ToolBox",
      description: "Pixelate an image online for free. Adjust block size, preview a mosaic effect instantly, and download the pixelated result in your browser without uploading files.",
      category: "image",
      shortTitle: "Pixelate Image",
      relatedTools: [
        "blur-image",
        "crop-image",
        "image-resizer"
      ],
      useCases: [
        "Create a retro pixel-art effect from a photo",
        "Obscure part of a screenshot with a stronger mosaic look",
        "Make stylized avatars or thumbnails with blocky pixels",
        "Preview different pixel sizes before exporting a final image"
      ],
      faq: [
        {
          q: "How do I make the image more pixelated?",
          a: "Increase the block size slider. Larger blocks create a stronger mosaic effect."
        },
        {
          q: "Does this blur the image or create square blocks?",
          a: "It creates square pixel blocks rather than a soft blur, so the effect looks more like mosaic or pixel art."
        },
        {
          q: "What format does it download?",
          a: "The tool downloads the result as a PNG."
        },
        {
          q: "Is the image uploaded to a server?",
          a: "No. Pixelation happens entirely in your browser."
        }
      ],
      example: {
        input: "Upload a portrait and increase the block size to 20 px",
        output: "Download a stylized mosaic PNG with a clear pixelated effect"
      },
      seoContent: {
        whatIsTitle: "What is Pixelate Image?",
        whatIsBody: "Pixelate Image applies a blocky mosaic effect to a photo or screenshot by shrinking detail into larger square pixels. It is useful for stylized edits, retro effects, and privacy-friendly image treatments that need a stronger look than blur.",
        howToTitle: "How to Use Pixelate Image",
        howToSteps: [
          "Upload an image into the pixelation tool.",
          "Adjust the block size to control how strong the effect looks.",
          "Review the preview as the pixel size changes.",
          "Download the pixelated PNG when it looks right."
        ]
      },
      learnMore: {
        title: "Understand Image Pixelation",
        whyUseTitle: "Why Use This Tool",
        whyUseItems: [
          "Useful for stylized image edits, retro graphics, and mosaic effects.",
          "Gives stronger square-block output than a regular blur filter.",
          "Runs locally so your images stay on your device."
        ]
      }
    },
  {
      slug: "circle-crop-image",
      title: "Circle Crop Image Online Free | Make Round Avatars | Simple ToolBox",
      description: "Crop an image into a circle online for free. Create round profile photos and avatar PNGs with adjustable output size and instant preview, all in your browser.",
      category: "image",
      shortTitle: "Circle Crop Image",
      relatedTools: [
        "crop-image",
        "favicon-generator",
        "image-resizer"
      ],
      useCases: [
        "Create round avatars for social profiles and team pages",
        "Make circular product badges or speaker photos",
        "Prepare clean PNG profile images with transparent corners",
        "Export higher-resolution avatar files for apps and communities"
      ],
      faq: [
        { q: "What format does this tool download?", a: "It downloads a PNG so the corners outside the circle can stay transparent." },
        { q: "Can I change the final avatar size?", a: "Yes. Choose from common output sizes such as 256, 512, or 1024 pixels." },
        { q: "Does this tool move the crop area manually?", a: "This version uses a centered circular crop with adjustable zoom so you can quickly create a round avatar." },
        { q: "Is the image uploaded anywhere?", a: "No. Circle cropping happens entirely in your browser." }
      ],
      example: {
        input: "Upload a portrait and set the output size to 512 with 120% zoom",
        output: "Download a round PNG avatar ready for profile or team pages"
      },
      seoContent: {
        whatIsTitle: "What is Circle Crop Image?",
        whatIsBody: "Circle Crop Image turns a regular photo into a round avatar or profile image. It is useful for social profiles, team pages, community accounts, and anywhere a circular image style is standard.",
        howToTitle: "How to Use Circle Crop Image",
        howToSteps: [
          "Upload one image into the tool.",
          "Adjust the zoom until the centered circular crop looks right.",
          "Choose the output size you want for the avatar.",
          "Download the round PNG file."
        ]
      },
      learnMore: {
        title: "Understand Circle Image Cropping",
        whyUseTitle: "Why Use This Tool",
        whyUseItems: [
          "Useful for avatars, speaker photos, and round team images.",
          "Exports PNG so the outer corners stay transparent.",
          "Runs locally so private photos stay on your device."
        ]
      }
    },
  {
      slug: "invert-image",
      title: "Invert Image Colors Online Free | Reverse Photo Colors | Simple ToolBox",
      description: "Invert image colors online for free. Reverse photo colors, adjust inversion strength, preview instantly, and download the edited image in your browser.",
      category: "image",
      shortTitle: "Invert Image",
      relatedTools: [
        "grayscale-image",
        "blur-image",
        "pixelate-image"
      ],
      useCases: [
        "Create a negative-style photo effect",
        "Reverse UI screenshots for quick visual experiments",
        "Generate stylized poster or art edits",
        "Test how an image looks under strong color inversion"
      ],
      faq: [
        { q: "Can I make the effect weaker than full inversion?", a: "Yes. Use the strength slider to blend between the original image and full color inversion." },
        { q: "What does 100% inversion mean?", a: "It means each visible color channel is reversed to its opposite value for a full negative-style effect." },
        { q: "What format does it download?", a: "This version downloads the edited image as PNG." },
        { q: "Is the image uploaded anywhere?", a: "No. The inversion effect runs entirely in your browser." }
      ],
      example: {
        input: "Upload a city photo and set inversion strength to 60%",
        output: "Download a partially inverted PNG with a stylized color shift"
      },
      seoContent: {
        whatIsTitle: "What is Invert Image?",
        whatIsBody: "Invert Image reverses the visible colors in a photo or screenshot to create a negative-style result. It is useful for quick experiments, stylized edits, and visual transformations without opening a full graphics editor.",
        howToTitle: "How to Use Invert Image",
        howToSteps: [
          "Upload one image into the tool.",
          "Adjust inversion strength from subtle to full negative.",
          "Review the preview as the effect updates instantly.",
          "Download the inverted PNG when it looks right."
        ]
      },
      learnMore: {
        title: "Understand Image Color Inversion",
        whyUseTitle: "Why Use This Tool",
        whyUseItems: [
          "Useful for negative effects, visual experiments, and stylized edits.",
          "Lets you control how strong the inversion looks.",
          "Runs locally so your images stay on your device."
        ]
      }
    },
  {
      slug: "add-image-border",
      title: "Add Image Border Online Free | Add Colored Padding Around Photos | Simple ToolBox",
      description: "Add a border or padding around an image online for free. Set border thickness and color, preview instantly, and download the framed result in your browser.",
      category: "image",
      shortTitle: "Add Image Border",
      relatedTools: [
        "image-resizer",
        "crop-image",
        "merge-images"
      ],
      useCases: [
        "Add white borders around screenshots for cleaner sharing",
        "Frame product images before posting them online",
        "Create extra padding around photos for social graphics",
        "Prepare images that need a branded edge color"
      ],
      faq: [
        { q: "Can I make the border very thick?", a: "Yes. Increase the border size slider to add more padding around the image." },
        { q: "Can I choose any border color?", a: "Yes. Use the color picker to set the frame color you want." },
        { q: "Does the tool change the original image content?", a: "No. It keeps the source image intact and adds new outer space around it." },
        { q: "Is my image uploaded anywhere?", a: "No. Border rendering happens entirely in your browser." }
      ],
      example: {
        input: "Upload a screenshot, set a 40 px white border, and preview the result",
        output: "Download a framed PNG with extra padding around the original image"
      },
      seoContent: {
        whatIsTitle: "What is Add Image Border?",
        whatIsBody: "Add Image Border places a solid frame or padding around a photo or screenshot. It is useful for presentation images, social posts, product cards, and any workflow where a clean border makes the image easier to place on a page.",
        howToTitle: "How to Use Add Image Border",
        howToSteps: [
          "Upload one image into the tool.",
          "Choose border thickness and border color.",
          "Review the framed preview instantly.",
          "Download the bordered PNG when it looks right."
        ]
      },
      learnMore: {
        title: "Understand Image Borders",
        whyUseTitle: "Why Use This Tool",
        whyUseItems: [
          "Useful for screenshots, product images, and social-ready graphics.",
          "Adds clean padding without opening a desktop editor.",
          "Runs locally so your images stay on your device."
        ]
      }
    },
  {
      slug: "rounded-corners-image",
      title: "Rounded Corners Image Online Free | Round Photo Corners | Simple ToolBox",
      description: "Add rounded corners to an image online for free. Adjust the corner radius, preview instantly, and download a PNG with rounded edges in your browser.",
      category: "image",
      shortTitle: "Rounded Corners Image",
      relatedTools: [
        "add-image-border",
        "crop-image",
        "circle-crop-image"
      ],
      useCases: [
        "Polish screenshots before sharing them in docs or social posts",
        "Create softer corners for product cards and mockups",
        "Export transparent PNGs with rounded edges",
        "Match UI screenshots to a rounded design system"
      ],
      faq: [
        { q: "What format does this tool download?", a: "It downloads a PNG so the outside corner areas can stay transparent." },
        { q: "Can I make the corners barely rounded or fully rounded?", a: "Yes. Use the radius slider from 0 up to large corner values." },
        { q: "Does it keep the original image size?", a: "Yes. The canvas keeps the same width and height while only changing the corner shape." },
        { q: "Is the image uploaded anywhere?", a: "No. The effect runs entirely in your browser." }
      ],
      example: {
        input: "Upload a screenshot and set the corner radius to 48 px",
        output: "Download a same-size PNG with rounded transparent corners"
      },
      seoContent: {
        whatIsTitle: "What is Rounded Corners Image?",
        whatIsBody: "Rounded Corners Image gives a photo or screenshot softer corners without changing its core content. It is useful for polished presentations, social graphics, product cards, and UI mockups that need cleaner visual edges.",
        howToTitle: "How to Use Rounded Corners Image",
        howToSteps: [
          "Upload one image into the tool.",
          "Adjust the corner radius slider to set the roundness you want.",
          "Review the rounded preview instantly.",
          "Download the resulting PNG."
        ]
      },
      learnMore: {
        title: "Understand Rounded Image Corners",
        whyUseTitle: "Why Use This Tool",
        whyUseItems: [
          "Useful for screenshots, cards, and cleaner presentation images.",
          "Exports transparent corners in PNG format.",
          "Runs locally so your images stay on your device."
        ]
      }
    },
  {
      slug: "posterize-image",
      title: "Posterize Image Online Free | Reduce Color Levels in Photos | Simple ToolBox",
      description: "Posterize an image online for free. Reduce color levels for a bold graphic effect, preview instantly, and download the posterized PNG in your browser.",
      category: "image",
      shortTitle: "Posterize Image",
      relatedTools: [
        "duotone-image",
        "pixelate-image",
        "invert-image"
      ],
      useCases: [
        "Create a bold graphic look from a regular photo",
        "Reduce color detail for poster or album-art concepts",
        "Experiment with stylized marketing assets",
        "Turn noisy photos into flatter graphic shapes"
      ],
      faq: [
        { q: "What does posterize mean?", a: "Posterizing reduces the number of visible color steps so the image looks flatter and more graphic." },
        { q: "What happens when I lower the level count?", a: "Lower levels make the effect stronger because more nearby colors collapse into the same value." },
        { q: "What format does it download?", a: "This version downloads the edited image as PNG." },
        { q: "Is the image uploaded anywhere?", a: "No. Posterization runs entirely in your browser." }
      ],
      example: {
        input: "Upload a portrait and lower the channel levels to 3 or 4",
        output: "Download a stylized poster-like PNG with reduced color variation"
      },
      seoContent: {
        whatIsTitle: "What is Posterize Image?",
        whatIsBody: "Posterize Image reduces the number of distinct color levels in a photo or screenshot to create a flatter, bolder look. It is useful for graphic experiments, stylized edits, and making visual details feel more poster-like.",
        howToTitle: "How to Use Posterize Image",
        howToSteps: [
          "Upload one image into the tool.",
          "Adjust the number of color levels per channel.",
          "Review the updated posterized preview instantly.",
          "Download the edited PNG when it looks right."
        ]
      },
      learnMore: {
        title: "Understand Posterization",
        whyUseTitle: "Why Use This Tool",
        whyUseItems: [
          "Useful for stylized artwork, posters, and flatter visual treatments.",
          "Lets you control how strong the reduced-color effect looks.",
          "Runs locally so your images stay on your device."
        ]
      }
    },
  {
      slug: "duotone-image",
      title: "Duotone Image Online Free | Apply Two-Color Photo Effect | Simple ToolBox",
      description: "Apply a duotone effect to an image online for free. Choose shadow and highlight colors, preview instantly, and download the edited PNG in your browser.",
      category: "image",
      shortTitle: "Duotone Image",
      relatedTools: [
        "posterize-image",
        "color-picker-from-image",
        "invert-image"
      ],
      useCases: [
        "Create campaign-style two-color hero images",
        "Apply a brand palette to a monochrome photo treatment",
        "Make stylized speaker or artist portraits",
        "Generate fast visual concepts with custom shadow and highlight colors"
      ],
      faq: [
        { q: "What is a duotone effect?", a: "A duotone effect maps the darker and lighter parts of an image to two chosen colors instead of using the original full-color photo." },
        { q: "Can I choose my own two colors?", a: "Yes. Set one color for shadows and one color for highlights." },
        { q: "Does this work best on photos?", a: "Yes. Photos, portraits, and high-contrast screenshots usually show the effect most clearly." },
        { q: "Is the image uploaded anywhere?", a: "No. The duotone effect runs entirely in your browser." }
      ],
      example: {
        input: "Upload a portrait, choose a dark navy shadow and orange highlight",
        output: "Download a two-color duotone PNG for poster or campaign use"
      },
      seoContent: {
        whatIsTitle: "What is Duotone Image?",
        whatIsBody: "Duotone Image transforms a photo into a two-color version by mapping shadows and highlights to custom colors. It is useful for posters, campaigns, branding experiments, and any edit that needs a stronger graphic identity than the original photo.",
        howToTitle: "How to Use Duotone Image",
        howToSteps: [
          "Upload one image into the tool.",
          "Choose a shadow color and a highlight color.",
          "Review the duotone preview instantly.",
          "Download the edited PNG when it looks right."
        ]
      },
      learnMore: {
        title: "Understand Duotone Effects",
        whyUseTitle: "Why Use This Tool",
        whyUseItems: [
          "Useful for posters, campaigns, and brand-colored image treatments.",
          "Lets you apply your own highlight and shadow colors quickly.",
          "Runs locally so your images stay on your device."
        ]
      }
    },
  {
      slug: "image-brightness-contrast",
      title: "Image Brightness Contrast Online Free | Adjust Photo Exposure | Simple ToolBox",
      description: "Adjust image brightness and contrast online for free. Fine-tune photo exposure with instant preview and download the edited PNG in your browser.",
      category: "image",
      shortTitle: "Image Brightness Contrast",
      relatedTools: [
        "grayscale-image",
        "invert-image",
        "image-resizer"
      ],
      useCases: [
        "Brighten a dark screenshot before sharing it",
        "Increase contrast to make text or UI clearer",
        "Reduce harsh contrast in an over-edited image",
        "Quickly correct exposure without opening a full editor"
      ],
      faq: [
        { q: "What does brightness change?", a: "Brightness shifts the overall lightness of the image up or down." },
        { q: "What does contrast change?", a: "Contrast increases or decreases the separation between darker and lighter tones." },
        { q: "Can I use both sliders together?", a: "Yes. Most users make small brightness and contrast adjustments together for a cleaner result." },
        { q: "Is the image uploaded anywhere?", a: "No. All brightness and contrast processing happens in your browser." }
      ],
      example: {
        input: "Upload a dim screenshot and set brightness to 20 with contrast to 15",
        output: "Download a clearer PNG with more readable midtones and edges"
      },
      seoContent: {
        whatIsTitle: "What is Image Brightness Contrast?",
        whatIsBody: "Image Brightness Contrast lets you quickly improve a photo or screenshot by changing overall lightness and tonal separation. It is useful for dark images, low-contrast screenshots, and fast corrections when you only need cleaner visibility.",
        howToTitle: "How to Use Image Brightness Contrast",
        howToSteps: [
          "Upload one image into the tool.",
          "Adjust brightness to lighten or darken the image.",
          "Adjust contrast to change tonal separation.",
          "Download the corrected PNG when the preview looks right."
        ]
      },
      learnMore: {
        title: "Understand Brightness and Contrast",
        whyUseTitle: "Why Use This Tool",
        whyUseItems: [
          "Useful for quick exposure fixes and clearer screenshots.",
          "Lets you tune both lightness and contrast without a full editor.",
          "Runs locally so your images stay on your device."
        ]
      }
    },
  {
      slug: "duplicate-line-remover",
      title: "Duplicate Line Remover Online | Simple ToolBox",
      description: "Remove duplicate lines from pasted text instantly. Keep original order, ignore case if needed, trim whitespace, and copy the cleaned result in your browser.",
      category: "text",
      shortTitle: "Duplicate Line Remover",
      relatedTools: [
        "line-tools",
        "text-cleaner",
        "list-deduplicator"
      ],
      useCases: [
        "Clean one-item-per-line exports before importing them elsewhere",
        "Remove repeated keywords or tags while keeping the first occurrence",
        "Deduplicate copied logs, notes, or spreadsheet rows",
        "Quickly sanitize long pasted lists without writing a script"
      ],
      faq: [
        { q: "Does it keep the first or last duplicate?", a: "It keeps the first matching line and removes later repeats." },
        { q: "Can it ignore case differences?", a: "Yes. Turn on Ignore case if Apple and apple should count as the same line." },
        { q: "Will blank lines be removed too?", a: "Yes. Remove blank lines is enabled by default, and you can turn it off if you want to preserve empty rows." },
        { q: "Is my text uploaded anywhere?", a: "No. Duplicate removal runs entirely in your browser." }
      ],
      example: {
        input: "Apple\nOrange\napple\nOrange\nBanana",
        output: "Apple\nOrange\nBanana"
      },
      seoContent: {
        whatIsTitle: "What is Duplicate Line Remover?",
        whatIsBody: "Duplicate Line Remover scans one-item-per-line text and removes repeated rows while keeping the first occurrence. It is useful for keyword lists, exports, logs, and any pasted text where duplicates need to be cleaned quickly.",
        howToTitle: "How to Use Duplicate Line Remover",
        howToSteps: [
          "Paste the text list you want to clean into the input area.",
          "Choose whether to trim each line, ignore case, or remove blank rows.",
          "Review the deduplicated result instantly in the output panel.",
          "Copy the cleaned list when it looks right."
        ]
      },
      learnMore: {
        title: "Understand Duplicate Line Removal",
        whyUseTitle: "Why Use This Tool",
        whyUseItems: [
          "Faster than manually spotting repeated rows in long pasted lists.",
          "Useful for exports, logs, tags, and keyword sets.",
          "Runs locally so your source text stays on your device."
        ]
      }
    },
  {
      slug: "line-sorter",
      title: "Line Sorter Online | Simple ToolBox",
      description: "Sort text lines A-Z or Z-A instantly. Ignore case, use natural number sorting, remove blanks, and copy the sorted result in your browser.",
      category: "text",
      shortTitle: "Line Sorter",
      relatedTools: [
        "line-tools",
        "duplicate-line-remover",
        "list-deduplicator"
      ],
      useCases: [
        "Sort lists of filenames, tags, or values before comparing them",
        "Order pasted rows for cleaner review or export",
        "Sort numbered items using natural numeric order",
        "Quickly normalize list order without spreadsheet formulas"
      ],
      faq: [
        { q: "What is natural sorting?", a: "Natural sorting treats numbers inside text more like humans expect, so item 2 comes before item 10." },
        { q: "Can I sort in reverse order?", a: "Yes. Change the sort order to Z-A to reverse the result." },
        { q: "Does it ignore case?", a: "Yes. Ignore case is enabled by default, and you can turn it off if you need exact uppercase and lowercase ordering." },
        { q: "Is the sorting done locally?", a: "Yes. Everything runs entirely in your browser." }
      ],
      example: {
        input: "item 20\nitem 3\nitem 1\nBanana\napple",
        output: "apple\nBanana\nitem 1\nitem 3\nitem 20"
      },
      seoContent: {
        whatIsTitle: "What is Line Sorter?",
        whatIsBody: "Line Sorter orders one-item-per-line text lists alphabetically or in reverse. It can also use natural numeric sorting, which makes mixed text like item 2 and item 10 sort in a more intuitive order.",
        howToTitle: "How to Use Line Sorter",
        howToSteps: [
          "Paste the list you want to sort into the input area.",
          "Choose A-Z or Z-A order and set the sorting options you need.",
          "Review the sorted lines instantly in the output panel.",
          "Copy the final list back into your document, sheet, or script."
        ]
      },
      learnMore: {
        title: "Understand Line Sorting",
        whyUseTitle: "Why Use This Tool",
        whyUseItems: [
          "Useful for lists, filenames, tags, and mixed text values.",
          "Supports natural numeric sorting for clearer ordering.",
          "Runs in the browser so you can sort quickly without external tools."
        ]
      }
    },
  {
      slug: "list-deduplicator",
      title: "List Deduplicator Online | Simple ToolBox",
      description: "Deduplicate comma-separated, newline, tab, or semicolon lists instantly. Normalize spacing, keep original order, and export the result in your preferred delimiter.",
      category: "text",
      shortTitle: "List Deduplicator",
      relatedTools: [
        "duplicate-line-remover",
        "line-tools",
        "text-cleaner"
      ],
      useCases: [
        "Remove duplicate values from comma-separated exports",
        "Clean copied tag, keyword, or category lists",
        "Convert between newline and comma output while deduplicating",
        "Prepare unique values before importing data into another tool"
      ],
      faq: [
        { q: "What input separators does it support?", a: "It supports newline, comma, semicolon, and tab separated lists." },
        { q: "Can I output the result in a different delimiter?", a: "Yes. You can parse one delimiter and export the unique list in another." },
        { q: "Does it trim spaces around each item?", a: "Yes. Trim each item is enabled by default so values like Apple and  Apple count as the same item more often." },
        { q: "Is the list processed locally?", a: "Yes. Everything runs in your browser and no list data is uploaded." }
      ],
      example: {
        input: "Apple, Orange, apple, Banana, Orange, Kiwi",
        output: "Apple\nOrange\napple\nBanana\nKiwi"
      },
      seoContent: {
        whatIsTitle: "What is List Deduplicator?",
        whatIsBody: "List Deduplicator removes repeated items from delimited lists such as comma-separated values, newline lists, tab-separated rows, and semicolon-separated fields. It is useful when copied data is not formatted as one item per line but still needs to be cleaned quickly.",
        howToTitle: "How to Use List Deduplicator",
        howToSteps: [
          "Paste the list and choose the delimiter used in the input.",
          "Choose the output delimiter you want for the cleaned result.",
          "Turn on trimming or ignore case if you want stricter matching.",
          "Copy the unique list after the output updates."
        ]
      },
      learnMore: {
        title: "Understand List Deduplication",
        whyUseTitle: "Why Use This Tool",
        whyUseItems: [
          "Useful for comma lists, tags, exports, and pasted values from spreadsheets.",
          "Lets you switch between input and output delimiters in one pass.",
          "Runs locally so copied data stays on your device."
        ]
      }
    },
  {
      slug: "whitespace-trimmer",
      title: "Whitespace Trimmer Online | Simple ToolBox",
      description: "Trim leading and trailing whitespace from each line instantly. Remove blank lines, collapse tabs, and copy the cleaned result in your browser.",
      category: "text",
      shortTitle: "Whitespace Trimmer",
      relatedTools: [
        "text-cleaner",
        "line-tools",
        "duplicate-line-remover"
      ],
      useCases: [
        "Clean copied text from documents or terminals before reusing it",
        "Trim spaces around line-based exports or notes",
        "Normalize tabs and repeated inner spaces before comparison",
        "Remove blank rows from pasted multiline text"
      ],
      faq: [
        { q: "Does it trim each line separately?", a: "Yes. It trims leading and trailing whitespace on every line, not just the beginning and end of the full text block." },
        { q: "Can it replace tabs too?", a: "Yes. Turn on Convert tabs to single spaces if you want tab characters normalized." },
        { q: "Will it remove blank lines?", a: "Yes. Remove blank lines is enabled by default, and you can turn it off if you want to preserve empty rows." },
        { q: "Is the text sent anywhere?", a: "No. Everything runs locally in your browser." }
      ],
      example: {
        input: "  Apple  \n\tOrange\t\n\n  Banana   split  ",
        output: "Apple\nOrange\nBanana split"
      },
      seoContent: {
        whatIsTitle: "What is Whitespace Trimmer?",
        whatIsBody: "Whitespace Trimmer removes unnecessary leading and trailing spaces from multiline text. It is useful for copied terminal output, exports, notes, and any pasted text where inconsistent spacing makes the content harder to reuse.",
        howToTitle: "How to Use Whitespace Trimmer",
        howToSteps: [
          "Paste the text that contains extra spaces, tabs, or blank rows.",
          "Choose whether to trim each line, convert tabs, collapse repeated spaces, or remove empty lines.",
          "Review the cleaned output instantly.",
          "Copy the trimmed result when it looks right."
        ]
      },
      learnMore: {
        title: "Understand Whitespace Trimming",
        whyUseTitle: "Why Use This Tool",
        whyUseItems: [
          "Useful for pasted text from docs, terminals, exports, and chat logs.",
          "Lets you combine trimming, tab cleanup, and blank-line removal in one step.",
          "Runs locally so your text stays on your device."
        ]
      }
    },
  {
      slug: "sentence-counter",
      title: "Sentence Counter Online | Simple ToolBox",
      description: "Count sentences in pasted text instantly. See sentence totals, average words per sentence, and estimated paragraphs in your browser.",
      category: "text",
      shortTitle: "Sentence Counter",
      relatedTools: [
        "word-counter",
        "text-cleaner",
        "keyword-density-checker"
      ],
      useCases: [
        "Check article or essay structure while editing",
        "Estimate average sentence length for readability reviews",
        "Count sentences in product descriptions or landing pages",
        "Inspect sentence breakdowns in pasted drafts"
      ],
      faq: [
        { q: "How does it split sentences?", a: "It uses common sentence-ending punctuation such as periods, exclamation marks, and question marks as a practical browser-side estimate." },
        { q: "Can it handle multiple paragraphs?", a: "Yes. It also estimates paragraph count based on blank-line paragraph breaks." },
        { q: "Is the count always perfect?", a: "No automated sentence parser is perfect. Abbreviations and unusual punctuation can affect the estimate, but it works well for most normal prose." },
        { q: "Is the text uploaded?", a: "No. The analysis stays in your browser." }
      ],
      example: {
        input: "Simple ToolBox helps you finish small tasks quickly. It runs in your browser, so pasted text stays local.",
        output: "2 sentences · 15 words · 8 avg words/sentence"
      },
      seoContent: {
        whatIsTitle: "What is Sentence Counter?",
        whatIsBody: "Sentence Counter estimates how many sentences appear in a block of pasted text. It also shows supporting writing stats such as average words per sentence and paragraph count, which makes it useful for editing and readability checks.",
        howToTitle: "How to Use Sentence Counter",
        howToSteps: [
          "Paste the text you want to analyze into the input area.",
          "Review the sentence total, word count, average length, and paragraph count.",
          "Scan the per-sentence breakdown if you want to inspect long or short lines.",
          "Adjust your draft elsewhere and paste again to compare the new count."
        ]
      },
      learnMore: {
        title: "Understand Sentence Counting",
        whyUseTitle: "Why Use This Tool",
        whyUseItems: [
          "Useful for articles, essays, landing pages, and product copy.",
          "Shows both total sentence count and sentence-length context.",
          "Runs locally so your writing stays in the browser."
        ]
      }
    },
  {
      slug: "keyword-density-checker",
      title: "Keyword Density Checker Online | Simple ToolBox",
      description: "Check keyword density in pasted text instantly. See total mentions, exact-match percentage, and top repeating words or phrases in your browser.",
      category: "text",
      shortTitle: "Keyword Density Checker",
      relatedTools: [
        "word-counter",
        "sentence-counter",
        "text-cleaner"
      ],
      useCases: [
        "Review landing page copy for keyword repetition",
        "Check whether a target phrase appears too often in a draft",
        "Inspect top repeated terms before publishing SEO content",
        "Compare keyword presence across article revisions"
      ],
      faq: [
        { q: "How is keyword density calculated?", a: "This tool divides the number of exact keyword mentions by the total word count and shows the percentage." },
        { q: "Does it support phrases, not just single words?", a: "Yes. You can enter a phrase in the keyword box and the tool will count exact string matches." },
        { q: "What does the top terms panel show?", a: "It shows the most repeated words or phrases based on the selected phrase size so you can spot repetition patterns quickly." },
        { q: "Is the analyzed text uploaded?", a: "No. The analysis runs entirely in your browser." }
      ],
      example: {
        input: "A keyword checker helps you see whether a target keyword appears naturally. This keyword density checker also shows repeated terms.",
        output: "keyword · 3 mentions · 20.00% density"
      },
      seoContent: {
        whatIsTitle: "What is Keyword Density Checker?",
        whatIsBody: "Keyword Density Checker measures how often a word or phrase appears in pasted text and compares that count to the total number of words. It is useful for reviewing SEO drafts, spotting overuse, and checking whether a target term appears naturally.",
        howToTitle: "How to Use Keyword Density Checker",
        howToSteps: [
          "Paste the text you want to review into the input area.",
          "Enter the keyword or phrase you want to measure.",
          "Review total mentions, density percentage, and the top repeated terms.",
          "Adjust your draft and re-check if you want to compare a revised version."
        ]
      },
      learnMore: {
        title: "Understand Keyword Density",
        whyUseTitle: "Why Use This Tool",
        whyUseItems: [
          "Useful for SEO drafts, landing pages, and article reviews.",
          "Shows both exact keyword mentions and repeated terms around the page.",
          "Runs locally so your draft text stays in the browser."
        ]
      }
    },
    {
      slug: "word-frequency-counter",
      title: "Word Frequency Counter — Rank Words by Count Online | Simple ToolBox",
      description: "Paste any text to see every word ranked by frequency. Filter stop words, set a minimum count, and copy the results instantly. Runs entirely in your browser.",
      category: "text",
      shortTitle: "Word Frequency Counter",
      relatedTools: ["keyword-density-checker", "word-counter", "text-cleaner"],
      useCases: [
        "Analyze blog post or article content for repetition",
        "Find the most-used words in a customer support transcript",
        "Spot filler words to reduce in an essay or speech",
        "Compare vocabulary frequency across two drafts"
      ],
      faq: [
        { q: "What is a stop word?", a: "Stop words are common words like 'the', 'a', 'and' that appear in almost every text and usually aren't meaningful for frequency analysis. Enabling the filter removes them so you see only content words." },
        { q: "Does it count only English words?", a: "The tool tokenizes on word boundaries and works best with Latin-script text. It does not currently handle CJK or other scripts that don't use spaces." },
        { q: "Is the text uploaded anywhere?", a: "No. Analysis runs entirely in your browser — nothing is sent to any server." },
        { q: "What is the maximum text size?", a: "There is no hard limit. Very large texts (10 MB+) may be slow depending on your device." }
      ],
      example: {
        input: "The quick brown fox jumps over the lazy dog. The dog barked at the fox.",
        output: "fox: 2, dog: 2, quick: 1, brown: 1, jumps: 1, barked: 1 (stop words filtered)"
      },
      seoContent: {
        whatIsTitle: "What is Word Frequency Counter?",
        whatIsBody: "Word Frequency Counter scans pasted text and counts how many times each word appears, then ranks the results from most to least frequent. It is useful for spotting overused words, analyzing content patterns, or auditing vocabulary diversity.",
        howToTitle: "How to Use Word Frequency Counter",
        howToSteps: [
          "Paste your text into the input area.",
          "Toggle stop-word filtering to hide or include common words like 'the' and 'and'.",
          "Set a minimum count if you only want words that appear multiple times.",
          "Adjust 'Show top' to control how many results appear.",
          "Click Copy to copy the ranked list."
        ]
      },
      learnMore: {
        title: "Understand Word Frequency",
        whyUseTitle: "Why Use This Tool",
        whyUseItems: [
          "Useful for writers reviewing repetitive drafts or essays.",
          "Helps content marketers spot over-used filler words.",
          "Provides a fast vocabulary audit without uploading text anywhere.",
          "Stop-word filter focuses results on meaningful content words."
        ]
      }
    },
    {
      slug: "csv-column-extractor",
      title: "CSV Column Extractor — Extract One Column from CSV Online | Simple ToolBox",
      description: "Paste CSV data and extract a single column by name or number. Copy all values as a plain list, JSON array, or quoted CSV. Runs entirely in your browser.",
      category: "text",
      shortTitle: "CSV Column Extractor",
      relatedTools: ["json-csv", "text-list-to-array", "word-frequency-counter"],
      useCases: [
        "Pull all email addresses from a exported contacts CSV",
        "Extract a list of product IDs from a spreadsheet export",
        "Grab a column of values to paste into another tool",
        "Convert a CSV column to a JSON array for use in code"
      ],
      faq: [
        { q: "Does it handle quoted CSV fields?", a: "Yes. Fields wrapped in double quotes are handled correctly, including fields with commas inside quotes." },
        { q: "Can I use tabs or semicolons as delimiters?", a: "Yes. Use the Delimiter dropdown to switch between comma, tab, and semicolon." },
        { q: "Is my CSV data uploaded?", a: "No. All processing happens in your browser — nothing is sent to a server." },
        { q: "Does the first row have to be a header?", a: "Yes, the tool treats the first row as column headers. If your CSV has no header row, the column names will be the raw values from the first row." }
      ],
      example: {
        input: "name,email,department\nAlice,alice@example.com,Engineering\nBob,bob@example.com,Marketing",
        output: "alice@example.com\nbob@example.com  (column: email, format: plain list)"
      },
      seoContent: {
        whatIsTitle: "What is CSV Column Extractor?",
        whatIsBody: "CSV Column Extractor lets you paste any CSV data, pick a column by header name or column number, and immediately get all values from that column. You can export the result as a plain line-by-line list, a JSON array, or a quoted CSV string.",
        howToTitle: "How to Use CSV Column Extractor",
        howToSteps: [
          "Paste your CSV data into the input area (or click Sample to try an example).",
          "Select the column you want from the dropdown — columns are shown by name and position.",
          "Choose whether to include the header row in the output.",
          "Pick an output format: plain list, JSON array, or quoted CSV.",
          "Click Copy to copy the extracted values."
        ]
      },
      learnMore: {
        title: "Understand CSV Column Extraction",
        whyUseTitle: "Why Use This Tool",
        whyUseItems: [
          "Faster than opening a spreadsheet just to copy one column.",
          "Handles common delimiters: comma, tab, semicolon.",
          "Outputs in multiple formats including JSON array for use in code.",
          "Runs locally so exported data never leaves your browser."
        ]
      }
    },
    {
      slug: "text-list-to-array",
      title: "Text List to Array Converter — Convert to JS, Python, JSON | Simple ToolBox",
      description: "Convert a plain text list (one item per line) into a JavaScript, Python, PHP, Ruby, or JSON array instantly. Choose quote style and copy the code.",
      category: "text",
      shortTitle: "Text List to Array",
      relatedTools: ["csv-column-extractor", "json-formatter", "string-escape"],
      useCases: [
        "Convert a list of product names into a JavaScript array for a front-end component",
        "Turn a copied list of IDs into a Python list literal",
        "Build a JSON array from a plain text item list",
        "Quickly scaffold test data arrays from a spreadsheet column"
      ],
      faq: [
        { q: "Which languages are supported?", a: "JavaScript, Python, PHP, Ruby, and JSON. The array syntax differs slightly between languages — for example Python and JavaScript use the same bracket syntax but PHP and Ruby differ." },
        { q: "Can I choose single or double quotes?", a: "Yes. Use the Quote dropdown to switch between single and double quotes. JSON always uses double quotes regardless of the setting." },
        { q: "What happens to empty lines?", a: "By default empty lines are skipped. Uncheck 'Skip empty lines' to include them as empty string items." },
        { q: "Does it handle special characters?", a: "Yes. Quotes and backslashes inside items are automatically escaped for the selected language." }
      ],
      example: {
        input: "apple\nbanana\ncherry",
        output: '["apple", "banana", "cherry"]  (JavaScript, double quotes)'
      },
      seoContent: {
        whatIsTitle: "What is Text List to Array?",
        whatIsBody: "Text List to Array converts a plain text list — one item per line — into an array literal in the programming language of your choice. It supports JavaScript, Python, PHP, Ruby, and JSON, with options for quote style and whitespace handling.",
        howToTitle: "How to Use Text List to Array",
        howToSteps: [
          "Paste your list (one item per line) into the input area.",
          "Select the target language: JavaScript, Python, PHP, Ruby, or JSON.",
          "Choose single or double quotes.",
          "Toggle 'Trim whitespace' and 'Skip empty lines' as needed.",
          "Click Copy to copy the array literal."
        ]
      },
      learnMore: {
        title: "Understand Array Conversion",
        whyUseTitle: "Why Use This Tool",
        whyUseItems: [
          "Saves time when scaffolding arrays from copied lists or spreadsheet data.",
          "Handles quote escaping automatically so you don't need to do it manually.",
          "Supports five languages with a single click to switch between them.",
          "Runs locally — no text is sent to any server."
        ]
      }
    },
    {
      slug: "percentage-calculator",
      title: "Percentage Calculator — What is X% of Y, Percentage Change | Simple ToolBox",
      description: "Calculate percentages instantly. Find what percent of a number is, what percentage X is of Y, or the percentage change between two values. Fast and browser-only.",
      category: "calculator",
      shortTitle: "Percentage Calculator",
      relatedTools: ["bmi-calculator", "loan-calculator", "unit-converter"],
      useCases: [
        "Calculate a tip or discount amount at a restaurant or shop",
        "Find what percentage a sale price is off the original",
        "Measure percentage growth between two revenue figures",
        "Check what fraction of a total a value represents"
      ],
      faq: [
        { q: "How do I calculate 20% of 150?", a: "Use the first calculator: enter 20 in the percent field and 150 in the number field. The result is 30." },
        { q: "How do I find what percentage 30 is of 150?", a: "Use the second calculator: enter 30 as X and 150 as Y. The result is 20%." },
        { q: "What is percentage change?", a: "Percentage change measures how much a value increased or decreased relative to its original value. A positive result means growth; a negative result means a decrease." },
        { q: "Can it handle decimals?", a: "Yes. All three calculators accept decimal inputs and display up to six decimal places when needed." }
      ],
      example: {
        input: "What is 15% of 80?",
        output: "12"
      },
      seoContent: {
        whatIsTitle: "What is Percentage Calculator?",
        whatIsBody: "Percentage Calculator provides three instant calculators: find what X% of a number equals, determine what percentage one number is of another, and compute the percentage change between an old and new value. All three update instantly as you type.",
        howToTitle: "How to Use Percentage Calculator",
        howToSteps: [
          "Choose the calculation type: percentage of a number, percentage ratio, or percentage change.",
          "Enter the numbers in the appropriate fields.",
          "The result updates instantly as you type.",
          "Click Copy next to any result to copy it to your clipboard."
        ]
      },
      learnMore: {
        title: "Understand Percentage Calculations",
        whyUseTitle: "Why Use This Tool",
        whyUseItems: [
          "Three common percentage questions answered in one place.",
          "Instant results — no need to press a button to calculate.",
          "Copy result in one click for use in documents or spreadsheets.",
          "Runs locally with no data sent anywhere."
        ]
      }
    },
    {
      slug: "age-calculator",
      title: "Age Calculator — Exact Age in Years, Months and Days | Simple ToolBox",
      description: "Calculate your exact age in years, months, and days from your date of birth. Also shows total days lived, weeks, and days until your next birthday.",
      category: "calculator",
      shortTitle: "Age Calculator",
      relatedTools: ["date-calculator", "percentage-calculator", "countdown"],
      useCases: [
        "Calculate your exact current age for a medical or legal form",
        "Find out how many days old you are",
        "Check how many days until your next birthday",
        "Calculate a child's age in months and days for a pediatric visit"
      ],
      faq: [
        { q: "How is the age calculated?", a: "The calculator counts full calendar years, months, and days from the date of birth to the reference date, accounting for varying month lengths." },
        { q: "Can I calculate age as of a past or future date?", a: "Yes. Change the 'Calculate as of' date to any past or future date to see what the age was or will be on that day." },
        { q: "How is the next birthday calculated?", a: "The next birthday is the nearest future occurrence of the birth month and day. If today is the birthday, it shows 'Today!'." },
        { q: "Does this account for leap years?", a: "Yes. The calculator uses standard JavaScript date arithmetic which handles leap years correctly." }
      ],
      example: {
        input: "Date of birth: 1990-06-15, as of: 2026-03-23",
        output: "Age: 35 years, 9 months, 8 days | 13,066 days lived | Next birthday in 83 days"
      },
      seoContent: {
        whatIsTitle: "What is Age Calculator?",
        whatIsBody: "Age Calculator computes the exact number of years, months, and days between a date of birth and a reference date (today by default). It also shows the total days and weeks lived, and how many days remain until the next birthday.",
        howToTitle: "How to Use Age Calculator",
        howToSteps: [
          "Enter the date of birth using the date picker.",
          "The reference date defaults to today — change it to calculate age as of any date.",
          "View the exact age broken down into years, months, and days.",
          "Check the stats cards for total months, weeks, days lived, and next birthday countdown."
        ]
      },
      learnMore: {
        title: "Understand Age Calculation",
        whyUseTitle: "Why Use This Tool",
        whyUseItems: [
          "Gives the exact age in years, months, and days — not just years.",
          "Useful for forms that ask for age in months, or for medical and legal contexts.",
          "The 'as of' date lets you calculate historical or future ages.",
          "Runs entirely in your browser — no data is sent anywhere."
        ]
      }
    },
    {
      slug: "tip-calculator",
      title: "Tip Calculator — Split Bill and Calculate Tip Instantly | Simple ToolBox",
      description: "Calculate tip amount and total bill instantly. Choose a tip percentage, split the bill among any number of people, and see per-person totals. Browser-only.",
      category: "calculator",
      shortTitle: "Tip Calculator",
      relatedTools: ["discount-calculator", "percentage-calculator", "loan-calculator"],
      useCases: [
        "Calculate the tip at a restaurant and split it among friends",
        "Find the per-person total for a group dinner",
        "Compare different tip percentages before deciding",
        "Calculate a custom tip amount for exceptional service"
      ],
      faq: [
        { q: "What tip percentage should I leave?", a: "Common tip amounts are 15% for standard service, 18% for good service, and 20–25% for excellent service. The right amount depends on your location and the quality of service." },
        { q: "How does the bill split work?", a: "The calculator divides the total bill (including tip) equally among the number of people you specify." },
        { q: "Can I enter a custom tip percentage?", a: "Yes. Click 'Custom' to enter any tip percentage you like." },
        { q: "Does this account for tax?", a: "No. Enter the pre-tax bill amount and the tool will calculate tip on that amount. If you want to tip on the post-tax amount, enter the total including tax." }
      ],
      example: {
        input: "Bill: $85.00, Tip: 18%, People: 4",
        output: "Tip: $15.30 | Total: $100.30 | Per person: $25.08"
      },
      seoContent: {
        whatIsTitle: "What is Tip Calculator?",
        whatIsBody: "Tip Calculator computes the tip amount, total bill, and per-person split from a bill amount, tip percentage, and number of diners. Preset buttons cover the most common tip percentages, and a custom input lets you enter any value.",
        howToTitle: "How to Use Tip Calculator",
        howToSteps: [
          "Enter the bill amount.",
          "Select a tip percentage from the preset buttons, or click Custom and type your own.",
          "Enter the number of people splitting the bill.",
          "Read the tip amount, total, and per-person totals from the result cards."
        ]
      },
      learnMore: {
        title: "Understand Tip Calculations",
        whyUseTitle: "Why Use This Tool",
        whyUseItems: [
          "Instant results — no tapping required after entering numbers.",
          "Preset buttons for the most common tip percentages.",
          "Shows both the per-person tip and the per-person total.",
          "Runs locally in your browser."
        ]
      }
    },
    {
      slug: "discount-calculator",
      title: "Discount Calculator — Sale Price and Savings Amount | Simple ToolBox",
      description: "Calculate the sale price after a discount instantly. Enter original price and discount percentage to get final price, amount saved, and effective discount rate. Browser-only.",
      category: "calculator",
      shortTitle: "Discount Calculator",
      relatedTools: ["percentage-calculator", "tip-calculator", "bmi-calculator"],
      useCases: [
        "Find the final price of an item on sale before buying",
        "Calculate how much you save with a coupon or promo code",
        "Work backwards to find what discount was applied between two prices",
        "Compare sale prices across multiple discounts"
      ],
      faq: [
        { q: "How is the sale price calculated?", a: "Sale price = original price × (1 − discount% / 100). For example, a $100 item at 20% off costs $80." },
        { q: "How do I find the discount % between two prices?", a: "Use the second calculator: enter the original price and the sale price. The tool calculates (original − sale) / original × 100." },
        { q: "Can I calculate a discount greater than 100%?", a: "No. A discount over 100% would imply a negative price, so the tool caps the input at 100%." },
        { q: "Is there a currency option?", a: "The tool uses $ as a placeholder. The math works for any currency — just treat the numbers as your local currency." }
      ],
      example: {
        input: "Original: $120.00, Discount: 25%",
        output: "Sale price: $90.00 | You save: $30.00"
      },
      seoContent: {
        whatIsTitle: "What is Discount Calculator?",
        whatIsBody: "Discount Calculator provides two calculators: the first finds the sale price and savings from an original price and a discount percentage; the second works in reverse — given the original and sale price, it calculates what discount was applied.",
        howToTitle: "How to Use Discount Calculator",
        howToSteps: [
          "To find the sale price: enter the original price and the discount percentage.",
          "Read the sale price, amount saved, and the percentage of the original you are paying.",
          "To find the discount %: enter the original price and the sale price in the second calculator.",
          "Read the discount percentage and the amount saved."
        ]
      },
      learnMore: {
        title: "Understand Discount Calculations",
        whyUseTitle: "Why Use This Tool",
        whyUseItems: [
          "Two calculators in one: forward (price → sale) and reverse (sale → discount %).",
          "Instant results — updates as you type.",
          "Useful for shopping, budgeting, and price comparisons.",
          "Runs entirely in your browser."
        ]
      }
    },
    {
      slug: "gpa-calculator",
      title: "GPA Calculator — Calculate Weighted GPA Online | Simple ToolBox",
      description: "Calculate your GPA by entering course grades and credit hours. Supports letter grades (A–F) and 4.0 scale. Add up to 20 courses and see weighted GPA instantly.",
      category: "calculator",
      shortTitle: "GPA Calculator",
      relatedTools: ["percentage-calculator", "age-calculator", "date-calculator"],
      useCases: [
        "Calculate semester GPA before final grades are posted",
        "Estimate cumulative GPA after adding a new course result",
        "Check if your GPA meets the threshold for an honor roll or scholarship",
        "Plan future grades needed to hit a target GPA"
      ],
      faq: [
        { q: "What grade point scale does this use?", a: "The standard US 4.0 scale: A/A+ = 4.0, A− = 3.7, B+ = 3.3, B = 3.0, B− = 2.7, C+ = 2.3, C = 2.0, C− = 1.7, D+ = 1.3, D = 1.0, D− = 0.7, F = 0.0." },
        { q: "How is weighted GPA calculated?", a: "Each course grade is converted to grade points, multiplied by credit hours, then divided by total credit hours. This gives a credit-weighted average." },
        { q: "Can I add more than the default number of courses?", a: "Yes. Click 'Add Course' to add as many rows as you need." },
        { q: "Does it support plus/minus grades?", a: "Yes. All standard plus and minus letter grades (A+, A, A−, B+, etc.) are supported." }
      ],
      example: {
        input: "Calculus (A, 4 cr) + English (B+, 3 cr) + History (A−, 3 cr)",
        output: "GPA: 3.70 | Total credits: 10 | Grade points: 37.0"
      },
      seoContent: {
        whatIsTitle: "What is GPA Calculator?",
        whatIsBody: "GPA Calculator lets you enter each course, its letter grade, and its credit hours. It converts letter grades to the standard 4.0 grade-point scale, weights each grade by credit hours, and calculates your cumulative GPA instantly.",
        howToTitle: "How to Use GPA Calculator",
        howToSteps: [
          "Enter the course name (optional), letter grade, and credit hours for each course.",
          "Click 'Add Course' to add more rows as needed.",
          "Read your GPA, total credits, and total grade points from the result cards.",
          "The GPA bar shows your score visually on the 0.0–4.0 scale."
        ]
      },
      learnMore: {
        title: "Understand GPA Calculation",
        whyUseTitle: "Why Use This Tool",
        whyUseItems: [
          "Supports all standard plus/minus letter grades on the 4.0 scale.",
          "Weighted by credit hours — heavier courses count more.",
          "Add or remove courses dynamically without page reload.",
          "Runs entirely in your browser — no data sent anywhere."
        ]
      }
    },
    {
      slug: "calorie-calculator",
      title: "Calorie Calculator — BMR and Daily Calorie Needs (TDEE) | Simple ToolBox",
      description: "Calculate your Basal Metabolic Rate (BMR) and daily calorie needs (TDEE) using the Mifflin-St Jeor formula. Supports metric and imperial units. Browser-only.",
      category: "calculator",
      shortTitle: "Calorie Calculator",
      relatedTools: ["bmi-calculator", "percentage-calculator", "unit-converter"],
      useCases: [
        "Find your maintenance calories before starting a diet",
        "Calculate the calorie deficit needed to lose 0.5 kg per week",
        "Estimate TDEE after changing your activity level",
        "Check calorie targets for a lean bulk or cut phase"
      ],
      faq: [
        { q: "What is BMR?", a: "Basal Metabolic Rate (BMR) is the number of calories your body burns at complete rest to maintain basic functions like breathing and circulation." },
        { q: "What is TDEE?", a: "Total Daily Energy Expenditure (TDEE) is BMR multiplied by an activity factor. It represents the total calories you burn in a day including exercise and movement." },
        { q: "Which formula does this use?", a: "The Mifflin-St Jeor equation, which is considered the most accurate general-population BMR formula for most adults." },
        { q: "How accurate is it?", a: "These are population-average estimates. Individual metabolism varies due to genetics, muscle mass, hormones, and other factors. Use results as a starting point." }
      ],
      example: {
        input: "Male, 30 years, 175 cm, 75 kg, moderately active",
        output: "BMR: 1,781 kcal · TDEE: 2,760 kcal · Weight loss (−0.5 kg/wk): 2,210 kcal"
      },
      seoContent: {
        whatIsTitle: "What is Calorie Calculator?",
        whatIsBody: "Calorie Calculator computes your Basal Metabolic Rate (BMR) — the calories burned at rest — and your Total Daily Energy Expenditure (TDEE) based on your activity level. It then shows suggested calorie targets for weight loss, maintenance, and gain.",
        howToTitle: "How to Use Calorie Calculator",
        howToSteps: [
          "Select Metric or Imperial units.",
          "Choose your sex and enter your age, height, and weight.",
          "Select the activity level that best matches your typical week.",
          "Read your BMR and TDEE, then check the goal table for calorie targets."
        ]
      },
      learnMore: {
        title: "Understand Calorie Needs",
        whyUseTitle: "Why Use This Tool",
        whyUseItems: [
          "Uses the Mifflin-St Jeor equation — the most widely validated BMR formula.",
          "Shows calorie targets for five different goals in one table.",
          "Supports both metric and imperial units.",
          "Runs entirely in your browser — no personal data is sent anywhere."
        ]
      }
    },
    {
      slug: "currency-converter",
      title: "Currency Converter — Quick Exchange Rate Estimates | Simple ToolBox",
      description: "Convert between 30+ major currencies using approximate reference rates. Instant results, swap currencies in one click. Rates are estimates — verify before financial decisions.",
      category: "calculator",
      shortTitle: "Currency Converter",
      relatedTools: ["percentage-calculator", "discount-calculator", "unit-converter"],
      useCases: [
        "Get a quick estimate before booking international travel",
        "Check rough conversion for a foreign invoice or price",
        "Compare prices across currencies while shopping online",
        "Estimate currency exchange for budgeting purposes"
      ],
      faq: [
        { q: "Are the rates live?", a: "No. The rates are approximate reference values baked into the tool. For live rates before financial transactions, use your bank or a real-time provider." },
        { q: "Which currencies are supported?", a: "30+ major currencies including USD, EUR, GBP, JPY, CAD, AUD, CHF, CNY, INR, KRW, MXN, BRL, and more." },
        { q: "How do I swap the currencies?", a: "Click the ⇅ button between the two currency selectors to reverse the conversion direction." },
        { q: "Why use approximate rates?", a: "For quick estimates — travel planning, price comparisons, or ballpark figures — approximate rates are sufficient and faster than waiting for a live API." }
      ],
      example: {
        input: "100 USD → EUR",
        output: "92.00 EUR (at approximate reference rate)"
      },
      seoContent: {
        whatIsTitle: "What is Currency Converter?",
        whatIsBody: "Currency Converter lets you quickly convert between 30+ major world currencies using built-in approximate reference exchange rates. It is designed for fast estimates — travel budgeting, invoice comparisons, or price checks — rather than live financial transactions.",
        howToTitle: "How to Use Currency Converter",
        howToSteps: [
          "Enter the amount you want to convert.",
          "Select the source currency from the first dropdown.",
          "Select the target currency from the second dropdown.",
          "Read the converted result and the exchange rate below.",
          "Click ⇅ to swap the two currencies."
        ]
      },
      learnMore: {
        title: "Understand Currency Conversion",
        whyUseTitle: "Why Use This Tool",
        whyUseItems: [
          "Instant conversion with no login, API key, or network request.",
          "Covers 30+ major currencies for quick travel and price estimates.",
          "One-click swap to reverse conversion direction.",
          "Rate disclaimer included — so you know when to verify before spending."
        ]
      }
    },
    {
      slug: "char-counter",
      title: "Character Counter — Count Letters, Digits, Emoji and Unicode | Simple ToolBox",
      description: "Count characters in pasted text with a detailed breakdown: letters, digits, punctuation, spaces, emoji, and Unicode code points. Instant, browser-only.",
      category: "text",
      shortTitle: "Character Counter",
      relatedTools: ["word-counter", "word-frequency-counter", "text-cleaner"],
      useCases: [
        "Check character count before posting to Twitter or LinkedIn",
        "Count characters for an SMS message within the 160-character limit",
        "Analyze emoji usage in marketing copy",
        "Verify character limits for database fields or API inputs"
      ],
      faq: [
        { q: "How does this differ from Word Counter?", a: "Word Counter focuses on words, sentences, and reading time. Character Counter gives a deeper character-level breakdown: letters, digits, punctuation, spaces, emoji, and Unicode code points." },
        { q: "Does it count emoji as one character?", a: "Yes. Each emoji is counted as one character using Unicode code point iteration, which correctly handles multi-byte emoji." },
        { q: "What are Unicode code points beyond BMP?", a: "Characters outside the Basic Multilingual Plane (code points above U+FFFF) include most emoji and some rare scripts. JavaScript strings store these as two 'surrogate pair' code units, so naïve .length counts them as 2. This tool correctly counts them as 1." },
        { q: "Is the text uploaded anywhere?", a: "No. All analysis runs in your browser." }
      ],
      example: {
        input: "Hello 🌍! Café.",
        output: "Total: 14 chars | Letters: 9 | Emoji: 1 | Punctuation: 2 | Spaces: 1"
      },
      seoContent: {
        whatIsTitle: "What is Character Counter?",
        whatIsBody: "Character Counter scans pasted text and produces a detailed breakdown of every character type: letters (including accented and non-ASCII), digits, punctuation, whitespace, emoji, and Unicode code points beyond the Basic Multilingual Plane. It also supports character-limit tracking for common platforms like Twitter and SMS.",
        howToTitle: "How to Use Character Counter",
        howToSteps: [
          "Paste or type text into the input area.",
          "Read the stats cards for the character breakdown.",
          "Optionally set a character limit — use the preset buttons for Twitter, SMS, or LinkedIn, or enter a custom value.",
          "The progress bar turns yellow at 85% and red when you exceed the limit."
        ]
      },
      learnMore: {
        title: "Understand Character Counting",
        whyUseTitle: "Why Use This Tool",
        whyUseItems: [
          "Goes beyond total count — shows letters, digits, punctuation, spaces, and emoji separately.",
          "Correctly handles multi-byte Unicode characters and emoji using code point iteration.",
          "Built-in presets for Twitter (280), SMS (160), and LinkedIn (700) limits.",
          "Runs entirely in your browser — no text is sent anywhere."
        ]
      }
    },
    {
      slug: 'mortgage-calculator',
      title: 'Mortgage Calculator',
      description: 'Calculate monthly mortgage payment, total interest, and amortization schedule. Enter home price, down payment, interest rate, and loan term.',
      category: 'calculator',
      relatedTools: ['loan-calculator', 'savings-calculator', 'percentage-calculator'],
      faq: [
        { q: 'What is the formula for a mortgage payment?', a: 'Monthly payment M = P × [r(1+r)^n] / [(1+r)^n − 1], where P is the loan amount (home price minus down payment), r is the monthly interest rate (annual rate ÷ 12), and n is the number of monthly payments (years × 12).' },
        { q: 'What is included in PITI?', a: 'PITI stands for Principal, Interest, Taxes, and Insurance. The calculator shows both the P&I payment and the full PITI total when you add monthly property tax and home insurance amounts.' },
        { q: 'How much down payment do I need?', a: 'Conventional loans typically require 5–20% down. A 20% down payment avoids Private Mortgage Insurance (PMI). FHA loans allow as little as 3.5% down.' },
        { q: 'Does the amortization schedule show early payoff?', a: 'The table shows the yearly schedule at the specified rate and term. To model early payoff, try different loan terms in the term dropdown.' }
      ],
      useCases: ['Estimate monthly payments before buying a home', 'Compare 15-year vs 30-year loan costs', 'See how much total interest a mortgage will cost', 'Check how much you can borrow with a given monthly budget'],
      example: { input: 'Home: $400,000 | Down: $80,000 | Rate: 6.5% | Term: 30yr', output: 'Monthly P&I: $2,022 | Total Interest: $407,920 | Total Cost: $727,920' },
      seoContent: {
        whatIsTitle: 'What is Mortgage Calculator?',
        whatIsBody: 'Mortgage Calculator computes the monthly principal and interest payment for a fixed-rate home loan using the standard amortization formula. It also shows total interest over the life of the loan, a full PITI estimate when you add property tax and insurance, and a year-by-year amortization schedule.',
        howToTitle: 'How to Use Mortgage Calculator',
        howToSteps: ['Enter the home price and down payment.', 'Set the annual interest rate and loan term.', 'Optionally add monthly property tax and insurance amounts.', 'Read the monthly payment, total interest, and total cost.', 'Click "Show Amortization Schedule" for a year-by-year breakdown.']
      },
      learnMore: {
        title: 'Understand Mortgage Payments',
        whyUseTitle: 'Why Use This Tool',
        whyUseItems: ['See exactly how much interest you will pay over the life of the loan.', 'Compare 15-year and 30-year scenarios instantly.', 'Shows PITI — not just P&I — when you add taxes and insurance.', 'Full amortization table helps you understand equity buildup.', 'Runs entirely in your browser — no data is sent.']
      }
    },
    {
      slug: 'savings-calculator',
      title: 'Savings Calculator',
      description: 'Project future savings with compound interest. Enter initial balance, monthly contribution, interest rate, and time horizon to see your future balance and interest earned.',
      category: 'calculator',
      relatedTools: ['mortgage-calculator', 'loan-calculator', 'percentage-calculator'],
      faq: [
        { q: 'How is compound interest calculated?', a: 'FV = PV × (1 + r/n)^(n×t) + PMT × [((1+r/n)^(n×t) − 1) / (r/n)], where PV is the starting balance, PMT is the monthly contribution, r is the annual rate, n is the compounding frequency, and t is the years.' },
        { q: 'What compound frequency should I choose?', a: 'Most savings accounts and CDs compound monthly or daily. Money market accounts often compound daily. Choose the frequency that matches your account type for the most accurate projection.' },
        { q: 'Does this account for inflation?', a: 'No. The calculator shows nominal returns. To estimate real purchasing power, subtract the expected inflation rate from your annual interest rate.' },
        { q: 'What is the difference between APR and APY?', a: 'APR is the stated rate before compounding. APY (Annual Percentage Yield) is the effective annual rate after compounding. For monthly compounding at 5% APR, the APY is about 5.12%.' }
      ],
      useCases: ['Project retirement savings over 20–30 years', 'Compare savings account rates', 'See how monthly contributions accelerate growth', 'Estimate an emergency fund timeline'],
      example: { input: 'Initial: $5,000 | Monthly: $200 | Rate: 5% | 10 years', output: 'Future Balance: $37,066 | Contributions: $29,000 | Interest: $8,066' },
      seoContent: {
        whatIsTitle: 'What is Savings Calculator?',
        whatIsBody: 'Savings Calculator projects the future value of a savings account or investment using compound interest. It accounts for an initial lump sum plus regular monthly contributions, with configurable compounding frequency. A year-by-year table shows exactly how your balance grows over time.',
        howToTitle: 'How to Use Savings Calculator',
        howToSteps: ['Enter your current or initial balance.', 'Set a monthly contribution amount (can be 0).', 'Enter the expected annual interest rate.', 'Choose a time period and compounding frequency.', 'Read the future balance, total contributions, and interest earned.', 'Click "Show Year-by-Year Growth" for the full table.']
      },
      learnMore: {
        title: 'Understand Compound Interest',
        whyUseTitle: 'Why Use This Tool',
        whyUseItems: ['See exactly how much interest you will earn over any time horizon.', 'Visual bar shows the split between contributions and interest.', 'Year-by-year table reveals how growth accelerates over time.', 'Configurable compounding frequency for accurate projections.', 'Runs entirely in your browser — no data is sent.']
      }
    },
    {
      slug: 'password-strength-checker',
      title: 'Password Strength Checker',
      description: 'Check password entropy, estimated crack time, and a detailed character-type breakdown. Runs entirely in your browser — your password is never sent anywhere.',
      category: 'generate',
      relatedTools: ['password-generator', 'hash-generator', 'bcrypt'],
      faq: [
        { q: 'What is password entropy?', a: 'Entropy measures unpredictability in bits. It is calculated as length × log₂(charset size). A password using 94 printable ASCII characters with length 12 has about 78.8 bits of entropy — generally considered strong.' },
        { q: 'How is crack time estimated?', a: 'The tool assumes an offline brute-force attack at 1 billion guesses per second. This represents a capable attacker with modern hardware. Real crack times vary based on the attack method and attacker resources.' },
        { q: 'Is my password sent to a server?', a: 'No. All analysis runs entirely in your browser using JavaScript. Your password never leaves your device.' },
        { q: 'What makes a password strong?', a: 'Length is the single most important factor. A 16-character password with mixed characters is far stronger than an 8-character one. Also avoid dictionary words, sequences like "123", and repeated characters.' }
      ],
      useCases: ['Check a new password before using it', 'Understand why a password was rejected', 'Learn what makes a password weak or strong', 'Test passphrase strength vs random character strings'],
      example: { input: 'P@ssw0rd123', output: 'Entropy: 65.2 bits | Strength: Fair | Crack time: 3.7 years' },
      seoContent: {
        whatIsTitle: 'What is Password Strength Checker?',
        whatIsBody: 'Password Strength Checker evaluates a password by computing its Shannon entropy based on character set size and length, then estimates the time needed to brute-force it at 1 billion guesses per second. It also runs 8 specific checks — length, character types, common sequences, repetition, and dictionary patterns — and suggests improvements.',
        howToTitle: 'How to Use Password Strength Checker',
        howToSteps: ['Type or paste a password into the input field.', 'Toggle the eye icon to show or hide the password.', 'Read the strength meter, entropy, and estimated crack time.', 'Review the checklist to see which criteria are met.', 'Follow the tips to improve your password if needed.']
      },
      learnMore: {
        title: 'Understand Password Security',
        whyUseTitle: 'Why Use This Tool',
        whyUseItems: ['Shows entropy in bits — the gold standard for password strength.', 'Crack time estimate based on realistic offline attack scenario.', 'Checks for common weaknesses: sequences, repeats, dictionary words.', 'Actionable tips to fix every failing check.', '100% local — your password never leaves your browser.']
      }
    },
    {
      slug: 'exif-viewer',
      title: 'EXIF Data Viewer',
      description: 'Read camera model, GPS coordinates, exposure settings, and full EXIF metadata from any image file. Runs entirely in your browser — no image is uploaded.',
      category: 'image',
      relatedTools: ['remove-exif', 'image-to-base64', 'image-rotate'],
      faq: [
        { q: 'What is EXIF data?', a: 'EXIF (Exchangeable Image File Format) is metadata embedded in image files by cameras and smartphones. It includes technical details like camera make/model, lens, shutter speed, aperture, ISO, and often GPS coordinates and the date the photo was taken.' },
        { q: 'Which file types contain EXIF data?', a: 'JPEG files are the most common carrier of EXIF data. TIFF, HEIC, and most camera RAW formats also support EXIF. PNG files can carry a limited metadata subset but rarely contain full EXIF. SVG and WebP support varies.' },
        { q: 'Is my image uploaded to a server?', a: 'No. All parsing happens in your browser using JavaScript. Your image never leaves your device.' },
        { q: 'Why does my image show no EXIF data?', a: 'Many apps and social networks strip EXIF data before displaying or storing images. Screenshots, edited images, and files processed through web services often contain no EXIF. Use the original file from your camera for best results.' }
      ],
      useCases: ['Check GPS coordinates before sharing a photo', 'Verify camera settings for a particular shot', 'Audit which images contain sensitive location data', 'Inspect lens and focal length information'],
      example: { input: 'JPEG photo from smartphone', output: 'Make: Apple | Model: iPhone 15 Pro | GPS: 37.4219°N 122.0840°W | ISO: 64 | f/1.8 | 1/2000s' },
      seoContent: {
        whatIsTitle: 'What is EXIF Viewer?',
        whatIsBody: 'EXIF Viewer reads the Exchangeable Image File Format (EXIF) metadata embedded inside JPEG, TIFF, and other image files. It extracts camera and lens information, exposure parameters, color space, orientation, GPS coordinates, and timestamps — all grouped into readable sections. Since everything runs locally, you can inspect private or confidential images without uploading them anywhere.',
        howToTitle: 'How to Use EXIF Viewer',
        howToSteps: ['Drop an image file onto the drop zone, or click to browse.', 'The tool reads EXIF metadata instantly from the file.', 'Browse the grouped sections: Camera, Capture Settings, Date & Time, Image Info, and GPS.', 'If GPS data is present, click "View on Google Maps" to see the photo location.', 'Click "Copy as JSON" to copy all metadata for use in other tools.']
      },
      learnMore: {
        title: 'Understand EXIF Metadata',
        whyUseTitle: 'Why Use This Tool',
        whyUseItems: ['Inspect GPS location before sharing — avoid accidentally revealing private locations.', 'Shows all EXIF fields without installing software.', 'GPS to Google Maps link for instant location check.', 'Copy as JSON for programmatic use or logging.', '100% local — no image is ever uploaded.']
      }
    },
    {
      slug: 'image-to-base64',
      title: 'Image to Base64 Converter',
      description: 'Convert any image to a Base64 string or data URI for embedding in HTML, CSS, or JSON. Runs entirely in your browser — no image is uploaded.',
      category: 'image',
      relatedTools: ['base64', 'exif-viewer', 'webp-converter'],
      faq: [
        { q: 'What is a Base64 image?', a: 'Base64 is a way to encode binary data (like an image) as a plain-text ASCII string. A data URI is a Base64 string prefixed with the MIME type, formatted as data:image/png;base64,... — this can be placed directly in the src attribute of an img tag or in a CSS background-image to embed the image without a separate file request.' },
        { q: 'When should I use data URIs?', a: 'Data URIs are ideal for small icons, logos, or inlined images in HTML emails where external file references may be blocked. For large images they increase page weight and can hurt performance, so use them sparingly.' },
        { q: 'Is my image uploaded to a server?', a: 'No. The FileReader API encodes the image directly in your browser. Your image never leaves your device.' },
        { q: 'How much larger is a Base64 image?', a: 'Base64 encoding increases the data size by approximately 33% because every 3 bytes of binary data become 4 ASCII characters. A 100 KB image becomes roughly 133 KB as a Base64 string.' }
      ],
      useCases: ['Embed a small logo in an HTML email', 'Inline a spinner or icon in a CSS file', 'Pass image data as a JSON string to an API', 'Create self-contained HTML files with embedded images'],
      example: { input: 'logo.png (2 KB)', output: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...' },
      seoContent: {
        whatIsTitle: 'What is Image to Base64?',
        whatIsBody: 'Image to Base64 converts an image file into a Base64-encoded string using the browser\'s built-in FileReader API. The output can be formatted as a raw Base64 string, a full data URI, a CSS background-image declaration, or an HTML img tag — whichever is needed for the target use case.',
        howToTitle: 'How to Use Image to Base64',
        howToSteps: ['Drop an image file onto the drop zone, or click to browse.', 'Choose an output format: Data URI, Raw Base64, CSS background-image, or HTML img tag.', 'Copy the result to your clipboard with one click.', 'Paste directly into HTML, CSS, JSON, or any other destination.']
      },
      learnMore: {
        title: 'Understand Base64 Image Encoding',
        whyUseTitle: 'Why Use This Tool',
        whyUseItems: ['Four output formats — data URI, raw Base64, CSS, and HTML.', 'Shows original size vs encoded size and the % increase.', 'Warns when the image is large enough to impact page performance.', 'No file upload — everything runs in your browser.']
      }
    },
    {
      slug: 'base64-to-image',
      title: 'Base64 to Image Converter',
      description: 'Paste a Base64 string or data URI to preview the image and download it. Supports JPEG, PNG, WebP, GIF and more. Runs locally — nothing is sent.',
      category: 'image',
      relatedTools: ['image-to-base64', 'base64', 'exif-viewer'],
      faq: [
        { q: 'What is a Base64 image string?', a: 'A Base64 image is a binary image file encoded as ASCII characters. A data URI wraps it as data:image/png;base64,... so a browser can render it directly from the string without loading an external file.' },
        { q: 'How do I get the correct Base64 string?', a: 'Paste either a full data URI (starting with "data:image/...") or a raw Base64 string (the characters after the comma in a data URI). The tool auto-detects the format and renders the image.' },
        { q: 'What image formats are supported?', a: 'Any image format your browser can render: JPEG, PNG, WebP, GIF, SVG, BMP, and ICO. The tool detects the format from the Base64 magic bytes.' },
        { q: 'Can I download the decoded image?', a: 'Yes. Click "Download original format" to save the file in its native format. For raster images, "Download as PNG" converts via a canvas element.' }
      ],
      useCases: ['Preview a data URI to check it is correct', 'Recover an image from a Base64 string in code', 'Download an image embedded in an HTML or CSS file', 'Verify a Base64 image before deploying'],
      example: { input: 'data:image/png;base64,iVBORw0KGgo...', output: 'Live image preview + download buttons (PNG, 45x45px, 2.1 KB)' },
      seoContent: {
        whatIsTitle: 'What is Base64 to Image?',
        whatIsBody: 'Base64 to Image decodes a Base64-encoded string or data URI back into a viewable image. It renders the image directly in the browser using an img element, displays dimensions and size, and provides download buttons for the original format and as PNG. Everything runs locally — no string or image is sent to a server.',
        howToTitle: 'How to Use Base64 to Image',
        howToSteps: ['Paste a Base64 string or data URI into the input box.', 'Click "Decode & Preview" (or press Ctrl+Enter).', 'The image renders in the preview area with dimensions and size info.', 'Click a download button to save the image file.']
      },
      learnMore: {
        title: 'Understand Base64 Decoding',
        whyUseTitle: 'Why Use This Tool',
        whyUseItems: ['Auto-detects whether input is a data URI or raw Base64.', 'Detects MIME type from magic bytes — no manual format selection needed.', 'Provides both original-format and PNG download options.', '100% local — your data never leaves your browser.']
      }
    },
    {
      slug: 'image-metadata-editor',
      title: 'Image Metadata Editor',
      description: 'Edit title, description, author, copyright, and keyword fields in a JPEG and download the updated file. Reads existing EXIF camera data. Runs locally.',
      category: 'image',
      relatedTools: ['exif-viewer', 'remove-exif', 'image-to-base64'],
      faq: [
        { q: 'What metadata fields can I edit?', a: 'You can add or edit Title, Author/Artist, Copyright, Keywords, and Description/Caption. These are written as JPEG COM (Comment) segments in the output file, which are readable by most photo software.' },
        { q: 'Will my EXIF camera data be preserved?', a: 'Yes. The tool writes the new metadata as additional COM segments while keeping the original JPEG data intact, including any existing EXIF segments.' },
        { q: 'Why JPEG only?', a: 'JPEG COM segments are a simple, universal way to embed text metadata that works without external libraries. PNG, WebP, and TIFF use different metadata formats that require more complex parsers and writers.' },
        { q: 'Is this the same as full IPTC/XMP editing?', a: 'No. Full IPTC/XMP editing requires dedicated software. This tool writes metadata as JPEG comment fields, which is readable by most tools but is not the same as structured IPTC or XMP blocks.' }
      ],
      useCases: ['Add copyright before sharing photos online', 'Label archived images with title and description', 'Correct or add author attribution to JPEG files', 'Add keywords to make photos searchable'],
      example: { input: 'photo.jpg (no metadata)', output: 'photo_edited.jpg with Title: Sunset | Author: Jane Smith | Copyright: 2024' },
      seoContent: {
        whatIsTitle: 'What is Image Metadata Editor?',
        whatIsBody: 'Image Metadata Editor lets you open a JPEG, read its existing EXIF camera information (make, model, date, dimensions), and add or edit descriptive metadata fields: Title, Author, Copyright, Keywords, and Description. The new metadata is embedded as JPEG COM segments in a downloaded copy of the file.',
        howToTitle: 'How to Use Image Metadata Editor',
        howToSteps: ['Drop a JPEG file onto the drop zone or click to browse.', 'Read any existing EXIF data shown in the summary panel.', 'Fill in the metadata fields: title, author, copyright, keywords, and description.', 'Click "Download Updated JPEG" to save the edited file.']
      },
      learnMore: {
        title: 'Understand Image Metadata',
        whyUseTitle: 'Why Use This Tool',
        whyUseItems: ['Add copyright and author info before publishing photos.', 'Pre-fills Author field from existing EXIF Artist tag if present.', 'Non-destructive — creates a new file, never overwrites the original.', '100% local — no image is ever uploaded.']
      }
    },
  {
    slug: 'word-wrap-formatter',
    title: 'Word Wrap Formatter',
    description: 'Wrap long lines at a custom column width. Preserves paragraphs and word boundaries. Runs entirely in your browser.',
    category: 'text',
    relatedTools: ['whitespace-trimmer', 'text-cleaner', 'duplicate-line-remover', 'line-sorter'],
    faq: [
      { q: 'What does word wrap formatting do?', a: 'It breaks long lines of text at a specified column width so each line stays within that limit. Words are kept intact.' },
      { q: 'What column width should I use?', a: '80 characters is the most common standard. Use 72 for Git commit messages. Use 100 or 120 for wider modern displays.' },
      { q: 'Will it break long URLs or file paths?', a: 'With hard-wrap disabled (default), words longer than the column width are placed on their own line but not broken. Enable hard-wrap to split them.' },
      { q: 'Does it preserve paragraph breaks?', a: 'Yes, by default blank lines between paragraphs are preserved. Each paragraph is wrapped independently.' },
    ],
    useCases: ['Format commit messages to 72 characters', 'Wrap documentation for terminal-width readability', 'Prepare email body text at 80 columns'],
    example: { input: 'The quick brown fox jumps over the lazy dog and then runs away very quickly into the forest.', output: 'Wrapped at 40: The quick brown fox jumps / over the lazy dog and then runs away...' },
    seoContent: {
      whatIsTitle: 'What is Word Wrap Formatter?',
      whatIsBody: 'Word Wrap Formatter breaks long lines of text at a column boundary you choose. It respects word boundaries so no word is split in the middle. Paragraph spacing is preserved. Use it for terminal output, email formatting, commit messages, or any plain-text content that needs to fit a fixed width.',
      howToTitle: 'How to Use Word Wrap Formatter',
      howToSteps: [
        'Paste your long-line text into the Input field.',
        'Set the column width using the number field or a preset (72, 80, 100, 120).',
        'Toggle Preserve blank lines and Hard-wrap options as needed.',
        'Review the wrapped output and the max line length stat.',
        'Copy the result with the Copy button.',
      ],
    },
    learnMore: {
      title: 'About Column-Width Conventions',
      body: 'The 80-character line-width convention originated with punch cards and early terminals. Python PEP 8 recommends 79 characters; the Linux kernel style guide uses 80. Git commit messages conventionally wrap at 72 characters to leave room for indentation in git log output.',
    },
  },
  {
    slug: 'text-diff',
    title: 'Text Diff',
    description: 'Compare two texts line by line. Added lines are highlighted green, removed lines red. Works entirely in your browser.',
    category: 'text',
    relatedTools: ['find-and-replace', 'whitespace-trimmer', 'line-sorter', 'duplicate-line-remover'],
    faq: [
      { q: 'How does the diff work?', a: 'It uses a Longest Common Subsequence (LCS) algorithm to find the minimum set of line additions and removals that transform the original into the modified text.' },
      { q: 'Can I filter to show only added or removed lines?', a: 'Yes. Use the Added only or Removed only view buttons to focus on one type of change.' },
      { q: 'Is my text sent to a server?', a: 'No. All comparison happens locally in your browser. Neither input is uploaded anywhere.' },
      { q: 'Does it support character-level diff?', a: 'Currently it diffs at the line level. Character-level highlighting within changed lines is not shown.' },
    ],
    useCases: ['Compare two versions of a document', 'Review config file changes before deploying', 'Spot differences between API responses', 'Find accidental edits in copied text'],
    example: { input: 'Original line A / Shared line', output: 'Removed: "Original line A" / Added: "line B" / Unchanged: "Shared line"' },
    seoContent: {
      whatIsTitle: 'What is Text Diff?',
      whatIsBody: 'Text Diff compares two blocks of text line by line and shows which lines were added, removed, or unchanged. It uses an LCS algorithm entirely in your browser. Switch between unified, added-only, and removed-only views and copy the diff output as plain text.',
      howToTitle: 'How to Use Text Diff',
      howToSteps: [
        'Paste the original text in the left panel.',
        'Paste the modified text in the right panel.',
        'Click Compare (or press Ctrl+Enter).',
        'Use the view buttons to filter by Added only or Removed only.',
        'Copy the diff output if needed.',
      ],
    },
    learnMore: {
      title: 'About Text Diffing',
      body: 'Text diffing originated with the Unix diff utility (1974). It uses the Longest Common Subsequence (LCS) algorithm to find the minimal set of edits. Modern tools like git diff build on the same foundation. Line-level diff is standard for code review; character-level diff is better suited for prose editing.',
    },
  },
  {
    slug: 'find-and-replace',
    title: 'Find & Replace',
    description: 'Find and replace text with plain string, whole-word, or regex mode. Highlights all matches, shows match count, and copies the result instantly.',
    category: 'text',
    relatedTools: ['text-diff', 'whitespace-trimmer', 'text-cleaner', 'word-wrap-formatter'],
    faq: [
      { q: 'Does it support regular expressions?', a: 'Yes. Enable Regex mode and enter any valid JavaScript regular expression. The replacement field supports capture group references like $1.' },
      { q: 'How do I delete all matches without replacing?', a: 'Leave the Replace with field empty and click Replace All. Every match will be removed.' },
      { q: 'What does whole-word mode do?', a: 'It adds word boundary anchors around your pattern so it only matches complete words. For example, cat will not match concatenate.' },
      { q: 'Is the text sent anywhere?', a: 'No. Everything runs locally in your browser.' },
    ],
    useCases: ['Bulk-rename variables in copied code', 'Remove a repeated phrase from a document', 'Replace all occurrences of a URL', 'Clean up exported data with regex'],
    example: { input: 'The quick fox. The slow fox.', output: 'Replace fox with cat: The quick cat. The slow cat.' },
    seoContent: {
      whatIsTitle: 'What is Find & Replace?',
      whatIsBody: 'Find and Replace lets you search for any text pattern and replace every occurrence in one click. It supports plain text, case-insensitive, whole-word, and full JavaScript regex mode. The live preview highlights all matches before you commit the replacement.',
      howToTitle: 'How to Use Find & Replace',
      howToSteps: [
        'Paste your text into the Input Text field.',
        'Enter the search term in the Find field.',
        'Enter the replacement text (leave blank to delete matches).',
        'Choose options: case-insensitive, whole word, or regex.',
        'Click Replace All to apply. Copy the result from the Result field.',
      ],
    },
    learnMore: {
      title: 'About Find and Replace',
      body: 'Find and replace is one of the oldest text-editing operations, present in every text editor and word processor. Regular expressions extend it from literal string matching to pattern matching — you can replace all digits, strip HTML tags, or reformat dates with a single regex. JavaScript uses PCRE-inspired regex with flags for global (g), case-insensitive (i), and multiline (m) matching.',
    },
  },
  {
    slug: 'number-to-words',
    title: 'Number to Words',
    description: 'Convert numbers to English words instantly. Supports integers, decimals, currency (dollars and cents), and ordinal numbers up to quintillions.',
    category: 'convert',
    relatedTools: ['unit-converter', 'percentage-calculator', 'discount-calculator', 'currency-converter'],
    faq: [
      { q: 'What is the largest number it can convert?', a: 'Up to quintillions (10^18). Numbers larger than that are not supported.' },
      { q: 'Does it support decimals?', a: 'Yes. In plain mode, decimals are read digit by digit after the word "point". For example, 3.14 becomes "Three point one four".' },
      { q: 'How does currency mode work?', a: 'It splits the number into dollars and cents. For example, 99.99 becomes "Ninety-nine dollars and ninety-nine cents".' },
      { q: 'What is ordinal mode?', a: 'Ordinal mode converts numbers to their position form: 1 becomes "First", 42 becomes "Forty-second", and so on.' },
    ],
    useCases: ['Write out cheque amounts in words', 'Convert numbers for legal documents', 'Generate year names for scripts or narration'],
    example: { input: '1234567', output: 'One million, two hundred thirty-four thousand, five hundred sixty-seven' },
    seoContent: {
      whatIsTitle: 'What is Number to Words?',
      whatIsBody: 'Number to Words converts any number into its English written form. It handles plain integers and decimals, currency amounts (dollars and cents), ordinal numbers (first, second, third), and year pronunciation. Everything runs in your browser — no server needed.',
      howToTitle: 'How to Use Number to Words',
      howToSteps: [
        'Type or paste a number into the input field.',
        'Choose a mode: Plain, Currency, Ordinal, or Year.',
        'The result updates instantly as you type.',
        'Click Copy to copy the words to your clipboard.',
      ],
    },
    learnMore: {
      title: 'About Number-to-Words Conversion',
      body: 'Converting numbers to words is required in legal contracts, financial documents, cheques, and accessibility tools (screen readers). The English system uses groups of three digits (thousands, millions, billions) up to quintillions. Ordinal numbers (first, second) derive from cardinal numbers (one, two) with irregular forms for the first twelve.',
    },
  },
  {
    slug: 'text-to-speech',
    title: 'Text to Speech Online',
    description: 'Convert text to speech in your browser. Choose voice, speed, and pitch. Powered by the Web Speech API — no upload required.',
    category: 'text',
    tags: ['text'],
    relatedTools: ['word-counter', 'char-counter', 'sentence-counter', 'find-and-replace', 'text-case'],
    faq: [
      { q: 'Does this upload my text anywhere?', a: 'No. The Web Speech API runs entirely in your browser using your system\'s built-in voices. No text is ever sent to a server.' },
      { q: 'Why do I see no voices?', a: 'Voices come from your operating system and browser. Try Chrome, Edge, or Safari on desktop for the widest selection. Some voices take a moment to load.' },
      { q: 'Can I change the reading speed?', a: 'Yes. Use the Speed slider (0.5× to 2×) to slow down or speed up playback.' },
      { q: 'Can I pause and resume?', a: 'Yes. Click the play button while speaking to pause, and click again to resume from where it stopped.' },
    ],
    useCases: [
      'Proofreading documents by ear',
      'Accessibility: hearing text read aloud',
      'Language learning: hearing pronunciation',
      'Checking how a voice assistant will read your content',
    ],
    example: { input: 'The quick brown fox jumps over the lazy dog.', output: '(Spoken aloud in the selected voice)' },
    seoContent: {
      whatIsTitle: 'What is Text to Speech?',
      whatIsBody: 'Text to Speech (TTS) converts written text into spoken audio using your browser\'s built-in Web Speech API. Select from available system voices, adjust reading speed and pitch, and listen to any text instantly — no file uploads, no accounts required.',
      howToTitle: 'How to Use Text to Speech',
      howToSteps: [
        'Type or paste your text into the input box, or click Sample to use example text.',
        'Choose a voice from the dropdown. Filter by language if needed.',
        'Adjust Speed and Pitch sliders to your preference.',
        'Click the play button to start listening. Click again to pause or resume.',
        'Click the stop button (■) to end playback at any time.',
      ],
    },
    learnMore: {
      title: 'About the Web Speech API',
      body: 'The Web Speech API is a browser standard that enables JavaScript to access speech synthesis (text-to-speech) and speech recognition. The voices available depend on your operating system: Windows includes voices via its speech engine, macOS and iOS offer high-quality Siri-based voices, and Chrome on Android adds network-based voices. All synthesis happens locally — no audio is transmitted.',
    },
  },
  {
    slug: 'roman-numeral-converter',
    title: 'Roman Numeral Converter Online',
    description: 'Convert between Arabic numbers and Roman numerals instantly. Supports 1–3999, works both ways. Free browser-based Roman numeral converter.',
    category: 'convert',
    tags: ['convert'],
    relatedTools: ['number-to-words', 'binary-text', 'base64', 'number-base', 'ascii-table'],
    faq: [
      { q: 'What is the largest number supported?', a: 'The standard Roman numeral system supports 1 to 3999 (MMMCMXCIX). Numbers outside this range cannot be represented in classical Roman numerals.' },
      { q: 'How does subtractive notation work?', a: 'Instead of writing IIII for 4, Romans wrote IV (5 minus 1). Similarly, IX = 9, XL = 40, XC = 90, CD = 400, and CM = 900. This tool uses standard subtractive notation.' },
      { q: 'Can I convert Roman numerals back to numbers?', a: 'Yes. Switch to "Roman → Number" mode, enter a Roman numeral like MMXXIV, and the tool returns the Arabic equivalent (2024).' },
      { q: 'Is zero a Roman numeral?', a: 'No. The Roman numeral system has no symbol for zero. It was a later invention. This tool only supports 1–3999.' },
    ],
    useCases: [
      'Converting years for movie credits or book copyright lines',
      'Reading clock faces and watch dials',
      'Understanding historical dates and chapter numbering',
      'Homework and school assignments',
    ],
    example: { input: '2024', output: 'MMXXIV' },
    seoContent: {
      whatIsTitle: 'What are Roman Numerals?',
      whatIsBody: 'Roman numerals are a numeral system originating in ancient Rome that uses letters (I, V, X, L, C, D, M) to represent numbers. They are still widely used today in clock faces, movie credits, book chapters, and formal documents. This converter handles both directions: Arabic to Roman and Roman to Arabic, for all standard values from 1 to 3999.',
      howToTitle: 'How to Convert Roman Numerals',
      howToSteps: [
        'Choose a mode: "Number → Roman" or "Roman → Number".',
        'Type your value into the input field, or click a quick example.',
        'The result appears instantly below.',
        'Click Copy to copy the result to your clipboard.',
      ],
    },
    learnMore: {
      title: 'Roman Numeral Rules',
      body: 'Roman numerals follow two main rules. Additive notation: symbols are added left to right in descending order (VIII = 8). Subtractive notation: a smaller symbol placed before a larger one means subtraction (IV = 4, XL = 40, CM = 900). Only I, X, and C can be used subtractively, and only before the next two values in the sequence. No symbol may be repeated more than three times in a row.',
    },
  },
  {
    slug: 'temperature-converter',
    title: 'Temperature Converter — °C, °F, K',
    description: 'Convert temperatures between Celsius, Fahrenheit, and Kelvin instantly. Real-time conversion, common reference points, and formula explanations.',
    category: 'convert',
    tags: ['convert', 'calculator'],
    relatedTools: ['percentage-change-calculator', 'unit-converter', 'percentage-calculator', 'bmi-calculator', 'date-calculator'],
    faq: [
      { q: 'How do you convert Celsius to Fahrenheit?', a: 'Multiply by 9/5 then add 32. For example, 100°C × 9/5 + 32 = 212°F.' },
      { q: 'What is absolute zero in Celsius?', a: 'Absolute zero is −273.15°C (0 K or −459.67°F). It is the lowest theoretically possible temperature.' },
      { q: 'What is normal body temperature in Fahrenheit?', a: '98.6°F, which equals 37°C or 310.15 K.' },
      { q: 'Can I type in any field?', a: 'Yes. Type in the Celsius, Fahrenheit, or Kelvin field and the other two update instantly.' },
    ],
    useCases: [
      'Converting weather forecasts between °C and °F',
      'Science and engineering calculations involving Kelvin',
      'Cooking — converting recipe temperatures for different ovens',
      'Checking if a fever temperature is high',
    ],
    example: { input: '100°C', output: '212°F / 373.15 K' },
    seoContent: {
      whatIsTitle: 'What is a Temperature Converter?',
      whatIsBody: 'A temperature converter translates a temperature value between the three most common scales: Celsius (°C), Fahrenheit (°F), and Kelvin (K). Celsius is used in everyday life in most countries. Fahrenheit is used primarily in the United States. Kelvin is the SI base unit used in science, starting at absolute zero.',
      howToTitle: 'How to Convert Temperatures',
      howToSteps: [
        'Type a temperature value into the Celsius, Fahrenheit, or Kelvin field.',
        'The other two fields update instantly with the converted values.',
        'A formula line below the fields explains the calculation used.',
        'Use the reference table for common points like boiling or freezing.',
      ],
    },
    learnMore: {
      title: 'Temperature Conversion Formulas',
      body: 'Celsius to Fahrenheit: °F = °C × 9/5 + 32. Fahrenheit to Celsius: °C = (°F − 32) × 5/9. Celsius to Kelvin: K = °C + 273.15. Kelvin to Celsius: °C = K − 273.15. Kelvin has no negative values — it starts at absolute zero, the point where all thermal motion stops.',
    },
  },
  {
    slug: 'percentage-change-calculator',
    title: 'Percentage Change Calculator',
    description: 'Calculate percentage increase or decrease between two values. Shows formula, direction, and absolute difference. Free browser-based percentage change calculator.',
    category: 'calculator',
    tags: ['calculator'],
    relatedTools: ['percentage-calculator', 'discount-calculator', 'tip-calculator', 'savings-calculator', 'loan-calculator'],
    faq: [
      { q: 'What is percentage change?', a: 'Percentage change measures how much a value has increased or decreased relative to its original value. Formula: (new − old) ÷ |old| × 100.' },
      { q: 'What is the difference between percentage change and percentage difference?', a: 'Percentage change uses the original value as the base and indicates direction (increase/decrease). Percentage difference uses the average of both values and has no direction — it just measures gap size.' },
      { q: 'What does a negative percentage change mean?', a: 'A negative result means the value decreased. For example, −25% means the new value is 25% lower than the original.' },
      { q: 'What is the multiplier?', a: 'The multiplier shows how many times larger the new value is compared to the original. A multiplier of 1.5 means the value grew to 1.5× its original size (a 50% increase).' },
    ],
    useCases: [
      'Comparing prices before and after a sale',
      'Tracking stock or investment performance',
      'Measuring growth in revenue or user numbers',
      'Checking year-over-year change in metrics',
    ],
    example: { input: 'From 100 to 150', output: '+50% increase' },
    seoContent: {
      whatIsTitle: 'What is Percentage Change?',
      whatIsBody: 'Percentage change expresses the relative difference between an old and a new value as a percentage. A positive result is an increase; a negative result is a decrease. The formula is: (new value − original value) ÷ |original value| × 100. It is widely used in finance, statistics, and everyday comparisons.',
      howToTitle: 'How to Calculate Percentage Change',
      howToSteps: [
        'Enter the original (starting) value in the first field.',
        'Enter the new (ending) value in the second field.',
        'The percentage change, direction, and formula appear instantly.',
        'Click Swap to reverse the direction of comparison.',
        'Use the quick example buttons to explore common scenarios.',
      ],
    },
    learnMore: {
      title: 'Percentage Change vs Percentage Difference',
      body: 'Percentage change and percentage difference are related but distinct. Percentage change has a direction — it measures how a specific value changed from a starting point. Percentage difference is symmetric — it compares two values with no concept of "before" or "after", using their average as the denominator. Use percentage change when you have a clear original and new value; use percentage difference when comparing two peer values.',
    },
  },
  {
    slug: 'time-zone-converter',
    title: 'Time Zone Converter',
    description: 'Convert a time between any two time zones. Shows UTC offset and local time. No sign-in required — runs entirely in your browser.',
    category: 'convert',
    tags: ['convert'],
    relatedTools: ['date-calculator', 'age-calculator', 'timestamp', 'percentage-calculator', 'unit-converter'],
    faq: [
      { q: 'How does this tool know all time zones?', a: 'It uses the browser\'s built-in Intl API (IANA time zone database), which includes all standard time zones worldwide including daylight saving time rules.' },
      { q: 'Does it handle daylight saving time?', a: 'Yes. The Intl API automatically applies DST rules for each time zone based on the selected date and time.' },
      { q: 'Can I convert to UTC?', a: 'Yes. Select UTC in the "To time zone" dropdown. UTC has no offset and never observes daylight saving time.' },
      { q: 'What does the world clock show?', a: 'The world clock shows the current local time in 14 major cities. Click any city card to set it as the target time zone.' },
    ],
    useCases: [
      'Scheduling meetings across different countries',
      'Checking what time it is in a client\'s city',
      'Converting event times for international audiences',
      'Planning travel across time zones',
    ],
    example: { input: '9:00 AM New York (EST)', output: '2:00 PM London (GMT)' },
    seoContent: {
      whatIsTitle: 'What is a Time Zone Converter?',
      whatIsBody: 'A time zone converter translates a specific date and time from one time zone to another. Time zones are defined by their offset from Coordinated Universal Time (UTC) and may shift by one hour during daylight saving time. This tool uses the browser\'s built-in IANA time zone database to ensure accuracy for all regions and seasons.',
      howToTitle: 'How to Convert Time Zones',
      howToSteps: [
        'Click "Use current time" to prefill with the current date and time, or type a custom date and time.',
        'Select the source time zone in the "From" dropdown.',
        'Select the target time zone in the "To" dropdown.',
        'The converted time appears instantly in the result card.',
        'Click any city in the world clock to use it as the target time zone.',
      ],
    },
    learnMore: {
      title: 'Understanding Time Zones and UTC',
      body: 'UTC (Coordinated Universal Time) is the global time standard used as a reference. All time zones are expressed as UTC+N or UTC−N hours. For example, New York is UTC−5 (EST) or UTC−4 (EDT during summer). The IANA time zone database (used by all major operating systems and browsers) defines over 400 named time zones with full historical daylight saving rules.',
    },
  },
  {
    slug: 'speed-converter',
    title: 'Speed Converter — mph, km/h, m/s, knots',
    description: 'Convert speed between mph, km/h, m/s, knots, ft/s, and Mach number instantly. Type in any field to update all others. Free browser-based speed converter.',
    category: 'convert',
    tags: ['convert', 'calculator'],
    relatedTools: ['temperature-converter', 'unit-converter', 'time-zone-converter', 'percentage-change-calculator', 'roman-numeral-converter'],
    faq: [
      { q: 'How many km/h is 60 mph?', a: '60 mph = 96.56 km/h. To convert mph to km/h, multiply by 1.60934.' },
      { q: 'What is 1 knot in km/h?', a: '1 knot = 1.852 km/h. Knots are used in aviation and maritime navigation.' },
      { q: 'What is Mach 1?', a: 'Mach 1 is the speed of sound at sea level — approximately 340.29 m/s, 1,235 km/h, or 767 mph. The exact value varies with air temperature and altitude.' },
      { q: 'How do I convert m/s to km/h?', a: 'Multiply m/s by 3.6. For example, 10 m/s × 3.6 = 36 km/h.' },
    ],
    useCases: [
      'Converting car speed limits between mph and km/h for travel',
      'Aviation: converting knots to km/h or mph',
      'Physics and engineering: working in m/s',
      'Checking athlete running or cycling speeds',
    ],
    example: { input: '100 km/h', output: '62.14 mph / 27.78 m/s / 53.99 kn' },
    seoContent: {
      whatIsTitle: 'What is a Speed Converter?',
      whatIsBody: 'A speed converter translates a speed value between different units of measurement. Common units include miles per hour (mph, used in the US and UK), kilometres per hour (km/h, used in most countries), metres per second (m/s, the SI unit), knots (used in aviation and sailing), and Mach (a ratio to the speed of sound). This tool updates all units simultaneously when you type in any field.',
      howToTitle: 'How to Convert Speed',
      howToSteps: [
        'Type a speed value into any field (mph, km/h, m/s, knots, ft/s, or Mach).',
        'All other fields update instantly with the converted values.',
        'Use the quick example buttons to load common reference speeds.',
        'Clear all fields with the Clear button to start over.',
      ],
    },
    learnMore: {
      title: 'Speed Units Explained',
      body: 'Miles per hour (mph) is used for road speeds in the US, UK, and a few other countries. Kilometres per hour (km/h) is the standard in most of the world. Metres per second (m/s) is the SI unit for science and engineering. Knots (nautical miles per hour) are the standard in aviation and maritime contexts — 1 knot = 1.852 km/h. Mach numbers express speed relative to the speed of sound, which varies with altitude and temperature.',
    },
  },
  {
    slug: 'calorie-burn-calculator',
    title: 'Calorie Burn Calculator',
    description: 'Estimate calories burned during exercise. Choose activity, enter weight and duration. Uses MET values for 30+ activities. Free browser-based calorie burn calculator.',
    category: 'calculator',
    tags: ['calculator'],
    relatedTools: ['bmi-calculator', 'calorie-calculator', 'age-calculator', 'percentage-change-calculator', 'tip-calculator'],
    faq: [
      { q: 'What is a MET value?', a: 'MET (Metabolic Equivalent of Task) measures the energy cost of an activity relative to sitting still (1 MET). Running at 8 km/h has a MET of 8, meaning it burns 8× more energy than sitting.' },
      { q: 'How accurate is the calorie estimate?', a: 'The formula gives a reasonable estimate, but actual calorie burn varies by age, sex, fitness level, and intensity. Use it as a guide, not a precise measurement.' },
      { q: 'What is the formula used?', a: 'Calories (kcal) = MET × body weight (kg) × duration (hours). This is the standard formula derived from the Compendium of Physical Activities.' },
      { q: 'Can I enter weight in pounds?', a: 'Yes. Toggle the unit button between kg and lbs — the tool converts automatically.' },
    ],
    useCases: [
      'Estimating energy expenditure for a workout',
      'Tracking calories burned across different sports',
      'Comparing the calorie cost of different activities',
      'Fitness planning and calorie deficit calculations',
    ],
    example: { input: '70 kg, 30 min running at 8 km/h', output: '~280 kcal' },
    seoContent: {
      whatIsTitle: 'What is a Calorie Burn Calculator?',
      whatIsBody: 'A calorie burn calculator estimates the energy expended during physical activity using MET (Metabolic Equivalent of Task) values. MET values are published in the Compendium of Physical Activities, a research database covering hundreds of activities from sleeping to marathon running. The formula is simple: kcal = MET × weight in kg × duration in hours.',
      howToTitle: 'How to Use the Calorie Burn Calculator',
      howToSteps: [
        'Enter your body weight and choose kg or lbs.',
        'Enter the duration of your activity in minutes.',
        'Browse activity categories (Cardio, Sports, Gym, Daily) and click an activity.',
        'The calorie estimate updates instantly with the MET value used.',
      ],
    },
    learnMore: {
      title: 'About MET Values and Calorie Estimation',
      body: 'MET values were developed to standardise the measurement of physical activity intensity across research studies. A MET of 1 represents the energy cost of sitting quietly. Activities below 3 MET are light; 3–6 MET are moderate; above 6 MET are vigorous. The calorie formula assumes a reference adult and does not account for individual variation in metabolism, age, sex, or fitness level. For clinical applications, consult a registered dietitian.',
    },
  },
  {
    slug: 'currency-exchange-rate',
    title: 'Currency Exchange Rate Guide',
    description: 'Manual exchange rate calculator and reference guide. Enter an amount and a rate to compute the converted value. Learn bid/ask, cross rates, and exchange terminology.',
    category: 'reference',
    tags: ['reference', 'calculator'],
    relatedTools: ['currency-converter', 'percentage-change-calculator', 'tip-calculator', 'discount-calculator', 'savings-calculator'],
    faq: [
      { q: 'Does this tool fetch live exchange rates?', a: 'No. You enter the rate manually. This tool focuses on the calculation and on explaining exchange rate concepts. For live rates, use your bank, Google Finance, or XE.com.' },
      { q: 'What is a bid/ask spread?', a: 'The bid price is what a buyer pays for currency; the ask price is what a seller charges. The spread (ask minus bid) is the broker\'s profit. A wider spread means higher transaction costs.' },
      { q: 'How do I find the exchange rate?', a: 'Search Google for the pair (e.g. "1 USD to EUR"), check your bank\'s rates, or use a service like XE.com or OANDA for live interbank rates.' },
      { q: 'What is a cross rate?', a: 'A cross rate is the exchange rate between two currencies that are both quoted against USD. For example, EUR/GBP can be derived from EUR/USD and GBP/USD.' },
    ],
    useCases: [
      'Quickly computing a converted amount from a known rate',
      'Understanding exchange rate terminology before travelling',
      'Learning the difference between bid and ask prices',
      'Classroom or educational use for explaining forex concepts',
    ],
    example: { input: '100 USD × rate 0.92', output: '92.00 EUR' },
    seoContent: {
      whatIsTitle: 'What is an Exchange Rate?',
      whatIsBody: 'An exchange rate is the price at which one currency can be exchanged for another. For example, if 1 USD = 0.92 EUR, then one US dollar buys 0.92 euros. Exchange rates fluctuate constantly based on interest rates, inflation, trade balances, and market sentiment. This page provides a manual calculator and a reference glossary for common exchange rate terms.',
      howToTitle: 'How to Use This Exchange Rate Calculator',
      howToSteps: [
        'Enter the amount you want to convert.',
        'Enter the exchange rate (how many units of the target currency 1 unit of your source currency buys).',
        'The converted amount appears instantly.',
        'Click Swap to reverse the rate (useful for checking the inverse conversion).',
        'Use the quick example buttons to explore common pairs.',
      ],
    },
    learnMore: {
      title: 'Types of Exchange Rates',
      body: 'Spot rate: the current market rate for immediate exchange. Forward rate: a pre-agreed rate for a future exchange date, used to hedge currency risk. Interbank rate: the rate banks use to trade with each other — the tightest spread available. Retail rate: the rate banks and exchange services offer to individuals — includes a markup for profit. When comparing rates, always check the total cost including fees and spread, not just the headline rate.',
    },
  },
  {
    slug: 'weight-converter',
    title: 'Weight Converter — kg, lbs, oz, g, stone',
    description: 'Convert weight between kilograms, pounds, ounces, grams, stone, and metric tons instantly. Type in any field to update all others. Free browser-based weight converter.',
    category: 'convert',
    tags: ['convert', 'calculator'],
    relatedTools: ['bmi-calculator', 'calorie-burn-calculator', 'unit-converter', 'temperature-converter', 'speed-converter'],
    faq: [
      { q: 'How many pounds is 1 kilogram?', a: '1 kilogram = 2.20462 pounds. To convert kg to lbs, multiply by 2.20462.' },
      { q: 'How many ounces in a pound?', a: 'There are 16 ounces in 1 pound (avoirdupois).' },
      { q: 'What is a stone in kg?', a: '1 stone = 6.35029 kg = 14 pounds. Stone is used in the UK and Ireland for body weight.' },
      { q: 'How do I convert grams to ounces?', a: 'Divide grams by 28.3495. For example, 100 g ÷ 28.3495 = 3.527 oz.' },
    ],
    useCases: [
      'Converting body weight between kg and lbs for fitness tracking',
      'Cooking and baking unit conversions',
      'Shipping and freight calculations',
      'International product weight labelling',
    ],
    example: { input: '70 kg', output: '154.32 lbs / 11.02 stone / 2469 oz' },
    seoContent: {
      whatIsTitle: 'What is a Weight Converter?',
      whatIsBody: 'A weight converter translates a mass value between different units. Kilograms (kg) are the SI base unit used in most countries. Pounds (lbs) and ounces (oz) are used in the US and UK. Stone is used in the UK for body weight (1 stone = 14 lbs). Grams (g) are used for small masses. Metric tons (t) equal 1,000 kg and are used in industry and freight.',
      howToTitle: 'How to Convert Weight',
      howToSteps: [
        'Type a weight value into any field (kg, lbs, oz, g, stone, or metric tons).',
        'All other fields update instantly.',
        'Use the quick example buttons to load common reference weights.',
        'Click Clear to reset all fields.',
      ],
    },
    learnMore: {
      title: 'Weight Unit Systems',
      body: 'The metric system uses grams and kilograms. The imperial/US customary system uses ounces, pounds, and tons (though US and UK tons differ). The stone is specific to the British Isles for human body weight. In science and engineering, mass is always measured in kg (SI). In everyday use, the choice depends on geography: lbs in the US, kg in Europe and most of the world.',
    },
  },
  {
    slug: 'data-storage-converter',
    title: 'Data Storage Converter — KB, MB, GB, TB',
    description: 'Convert data storage between bits, bytes, KB, MB, GB, TB, and PB instantly. Supports both decimal (SI) and binary (IEC) prefixes. Free browser-based data converter.',
    category: 'convert',
    tags: ['convert'],
    relatedTools: ['binary-text', 'number-base', 'base64', 'ascii-table', 'speed-converter'],
    faq: [
      { q: 'What is the difference between KB and KiB?', a: 'KB (kilobyte) is 1,000 bytes in the SI/decimal system used by storage manufacturers. KiB (kibibyte) is 1,024 bytes in the binary/IEC system used by operating systems. This is why a "500 GB" hard drive shows as ~465 GB in Windows.' },
      { q: 'How many bytes are in a gigabyte?', a: 'In the decimal (SI) system: 1 GB = 1,000,000,000 bytes. In the binary (IEC) system: 1 GiB = 1,073,741,824 bytes.' },
      { q: 'What is a petabyte?', a: 'A petabyte (PB) is 1,000 terabytes or 10^15 bytes in decimal. It is used to measure data centre and cloud storage capacities.' },
      { q: 'Why does my hard drive show less space than advertised?', a: 'Manufacturers use decimal (1 GB = 10^9 bytes), but operating systems measure in binary (1 GiB = 2^30 bytes). A 1 TB drive contains ~931 GiB as reported by your OS.' },
    ],
    useCases: [
      'Comparing advertised drive sizes to OS-reported sizes',
      'Cloud storage and bandwidth planning',
      'Converting network transfer speeds (Mbps to MB/s)',
      'Software and database sizing',
    ],
    example: { input: '1 GB', output: '1,000 MB / 1,000,000 KB / 0.001 TB' },
    seoContent: {
      whatIsTitle: 'What is a Data Storage Converter?',
      whatIsBody: 'A data storage converter translates values between units of digital information: bits, bytes, kilobytes, megabytes, gigabytes, terabytes, and petabytes. There are two standards: decimal (SI), where 1 KB = 1,000 bytes, used by hard drive manufacturers; and binary (IEC), where 1 KiB = 1,024 bytes, used by operating systems. This tool supports both.',
      howToTitle: 'How to Convert Data Storage Units',
      howToSteps: [
        'Choose a prefix standard: Decimal (SI) or Binary (IEC).',
        'Type a value into any unit field.',
        'All other units update instantly.',
        'Use the quick example buttons to start from common sizes.',
      ],
    },
    learnMore: {
      title: 'Decimal vs Binary Prefixes',
      body: 'The IEC introduced binary prefixes in 1998 to remove ambiguity: kibibyte (KiB, 2^10), mebibyte (MiB, 2^20), gibibyte (GiB, 2^30). Hard drive makers use decimal KB/MB/GB/TB because the numbers are larger and more marketable. OS file explorers (Windows, Linux, macOS) use binary GiB but often label them as "GB", causing the apparent discrepancy. When precision matters (programming, networking), always specify which standard you mean.',
    },
  },
  {
    slug: 'fuel-consumption-calculator',
    title: 'Fuel Consumption Calculator — MPG, L/100km',
    description: 'Convert fuel efficiency between mpg (US), mpg (UK), L/100km, and km/L. Also calculate trip fuel cost. Free browser-based fuel efficiency calculator.',
    category: 'calculator',
    tags: ['calculator', 'convert'],
    relatedTools: ['speed-converter', 'weight-converter', 'percentage-change-calculator', 'unit-converter', 'temperature-converter'],
    faq: [
      { q: 'How do I convert mpg to L/100km?', a: 'For US mpg: L/100km = 235.215 ÷ mpg. For UK mpg: L/100km = 282.481 ÷ mpg. For example, 30 US mpg = 235.215 ÷ 30 = 7.84 L/100km.' },
      { q: 'What is the difference between US mpg and UK mpg?', a: 'The US gallon is 3.785 litres; the UK (imperial) gallon is 4.546 litres. So 30 UK mpg is more fuel-efficient than 30 US mpg. 30 UK mpg ≈ 25 US mpg.' },
      { q: 'How do I calculate trip fuel cost?', a: 'Fuel cost = (distance ÷ 100) × L/100km × price per litre. For example: 200 km ÷ 100 × 7 L/100km × $1.50/L = $21.00.' },
      { q: 'What is km/L?', a: 'Kilometres per litre (km/L) is the inverse of L/100km and is common in parts of Asia and Latin America. Higher km/L = more fuel efficient.' },
    ],
    useCases: [
      'Comparing fuel efficiency of cars across different markets',
      'Estimating trip fuel cost before a journey',
      'Converting an EU car spec (L/100km) to US mpg',
      'Fleet management and logistics cost planning',
    ],
    example: { input: '30 US mpg', output: '7.84 L/100km / 12.75 km/L / 36.05 UK mpg' },
    seoContent: {
      whatIsTitle: 'What is Fuel Consumption?',
      whatIsBody: 'Fuel consumption (also called fuel efficiency or fuel economy) measures how much fuel a vehicle uses over a given distance. In Europe and most of the world, it is expressed as litres per 100 kilometres (L/100km) — lower is better. In the US and UK, miles per gallon (mpg) is used — higher is better. Kilometres per litre (km/L) is common in Japan and parts of Asia.',
      howToTitle: 'How to Convert Fuel Consumption',
      howToSteps: [
        'Type a fuel efficiency value into any field (mpg US, mpg UK, L/100km, or km/L).',
        'All other units update instantly.',
        'Use the Trip Cost section to estimate the fuel cost for a journey: enter distance (km), consumption (L/100km), and fuel price per litre.',
        'The consumption field in the trip section auto-fills from the converter above.',
      ],
    },
    learnMore: {
      title: 'Understanding Fuel Efficiency Units',
      body: 'L/100km is an inverse measure: 5 L/100km is more efficient than 10 L/100km. Mpg is a direct measure: 40 mpg is more efficient than 25 mpg. To compare: a car rated at 7 L/100km uses 7 litres to travel 100 km, equivalent to about 33.6 US mpg or 40.4 UK mpg. When evaluating a car spec sheet, always check whether mpg refers to the US or UK gallon — the two are often confused in online reviews.',
    },
  },
  {
    slug: 'length-converter',
    title: 'Length Converter — mm, cm, m, km, inches, feet, miles',
    description: 'Convert length between millimeters, centimeters, meters, kilometers, inches, feet, yards, and miles. Type in any field to update all others.',
    category: 'convert',
    tags: ['convert'],
    relatedTools: ['area-converter', 'volume-converter', 'weight-converter', 'unit-converter', 'speed-converter'],
    faq: [
      { q: 'How many centimeters are in an inch?', a: '1 inch = 2.54 centimeters exactly.' },
      { q: 'How many feet are in a meter?', a: '1 meter = 3.28084 feet.' },
      { q: 'How many kilometers in a mile?', a: '1 mile = 1.60934 kilometers.' },
      { q: 'How many inches in a foot?', a: '1 foot = 12 inches.' },
    ],
    useCases: [
      'Converting height between cm and feet/inches',
      'Road distance conversion between km and miles',
      'Engineering and construction unit conversion',
      'Travel and international distance planning',
    ],
    example: { input: '100 cm', output: '3.28084 ft / 1 m / 39.3701 in' },
    seoContent: {
      whatIsTitle: 'What is a Length Converter?',
      whatIsBody: 'A length converter translates a distance or size value between different measurement systems. The metric system uses millimeters, centimeters, meters, and kilometers. The imperial/US customary system uses inches, feet, yards, and miles. This tool converts between all eight units simultaneously.',
      howToTitle: 'How to Convert Length',
      howToSteps: [
        'Type a value into any field (mm, cm, m, km, in, ft, yd, or mi).',
        'All other fields update instantly.',
        'Click a quick example button to load a common reference length.',
        'Click Clear to reset all fields.',
      ],
    },
    learnMore: {
      title: 'Metric vs Imperial Length',
      body: 'The metric system is the international standard for length, based on the meter (defined as the distance light travels in 1/299,792,458 of a second). The imperial system, used primarily in the US, is based on historical units: 12 inches per foot, 3 feet per yard, 1760 yards per mile. The inch is officially defined as exactly 25.4 mm, making all conversions exact.',
    },
  },
  {
    slug: 'area-converter',
    title: 'Area Converter — m2, ft2, acres, hectares',
    description: 'Convert area between square meters, square feet, square kilometers, acres, hectares, square inches, and square miles. Type in any field for instant conversion.',
    category: 'convert',
    tags: ['convert'],
    relatedTools: ['length-converter', 'volume-converter', 'unit-converter', 'weight-converter'],
    faq: [
      { q: 'How many square feet in an acre?', a: '1 acre = 43,560 square feet.' },
      { q: 'How many acres in a hectare?', a: '1 hectare = 2.47105 acres.' },
      { q: 'How many square meters in a hectare?', a: '1 hectare = 10,000 square meters (a 100 m x 100 m square).' },
      { q: 'How many square feet in a square meter?', a: '1 square meter = 10.7639 square feet.' },
    ],
    useCases: [
      'Real estate: comparing property sizes across countries',
      'Agriculture: converting farm area between acres and hectares',
      'Construction: floor area calculations',
      'Geography: land area comparisons',
    ],
    example: { input: '1 acre', output: '4046.86 m2 / 43560 ft2 / 0.4047 ha' },
    seoContent: {
      whatIsTitle: 'What is an Area Converter?',
      whatIsBody: 'An area converter translates a 2D surface measurement between different units. Common metric units include square millimeters (mm2), square centimeters (cm2), square meters (m2), and hectares (ha). Common imperial units include square inches (in2), square feet (ft2), and acres. This tool converts between all eight units simultaneously.',
      howToTitle: 'How to Convert Area',
      howToSteps: [
        'Type a value into any field (mm2, cm2, m2, km2, in2, ft2, acres, or ha).',
        'All other fields update instantly.',
        'Use quick example buttons for common reference areas.',
        'Click Clear to reset all fields.',
      ],
    },
    learnMore: {
      title: 'Area Units Explained',
      body: 'Area is a squared quantity: doubling a length quadruples the area. 1 hectare = 10,000 m2 = a square 100 m on each side. 1 acre = 4046.86 m2, originally the area a yoke of oxen could plow in a day. The US and UK use acres for land; most other countries use hectares.',
    },
  },
  {
    slug: 'volume-converter',
    title: 'Volume Converter — mL, L, cups, fl oz, gallons',
    description: 'Convert volume between milliliters, liters, cubic meters, fluid ounces, cups, pints, quarts, and gallons. Type in any field for instant conversion.',
    category: 'convert',
    tags: ['convert'],
    relatedTools: ['length-converter', 'area-converter', 'weight-converter', 'unit-converter'],
    faq: [
      { q: 'How many mL in a cup?', a: '1 US cup = 236.588 mL.' },
      { q: 'How many fluid ounces in a pint?', a: '1 US pint = 16 fluid ounces.' },
      { q: 'How many cups in a gallon?', a: '1 US gallon = 16 cups.' },
      { q: 'How many mL in a tablespoon?', a: '1 US tablespoon = 14.787 mL (3 teaspoons).' },
    ],
    useCases: [
      'Cooking and baking recipe conversions',
      'Converting drink volumes between metric and imperial',
      'Laboratory liquid measurement conversion',
      'International recipe adaptation',
    ],
    example: { input: '1 cup', output: '236.59 mL / 8 fl oz / 0.5 pt' },
    seoContent: {
      whatIsTitle: 'What is a Volume Converter?',
      whatIsBody: 'A volume converter translates a liquid or capacity measurement between different unit systems. Metric units include milliliters (mL), liters (L), and cubic meters (m3). US customary units include fluid ounces, cups, pints, quarts, and gallons. All values use US customary definitions (not UK Imperial).',
      howToTitle: 'How to Convert Volume',
      howToSteps: [
        'Type a value into any field (mL, L, m3, fl oz, cup, pt, qt, or gal).',
        'All other fields update instantly.',
        'Use quick example buttons for common cooking and serving sizes.',
        'Click Clear to reset all fields.',
      ],
    },
    learnMore: {
      title: 'US vs UK Volume Units',
      body: 'The US and UK both use pints and gallons but with different sizes. 1 US gallon = 3.785 L; 1 UK gallon = 4.546 L. 1 US fluid ounce = 29.57 mL; 1 UK fluid ounce = 28.41 mL. This converter uses US customary units throughout.',
    },
  },
  {
    slug: 'pressure-converter',
    title: 'Pressure Converter — Pa, bar, psi, atm, mmHg',
    description: 'Convert pressure between pascals, kilopascals, bar, psi, atmospheres, and mmHg (torr). Type in any field for instant conversion.',
    category: 'convert',
    tags: ['convert'],
    relatedTools: ['unit-converter', 'temperature-converter', 'energy-converter', 'speed-converter'],
    faq: [
      { q: 'How many Pa in 1 bar?', a: '1 bar = 100,000 Pa (exactly).' },
      { q: 'How many psi is 1 atm?', a: '1 atm = 14.696 psi.' },
      { q: 'What is standard atmospheric pressure?', a: 'Standard atmospheric pressure is 101,325 Pa = 1 atm = 14.696 psi = 760 mmHg.' },
      { q: 'What is mmHg used for?', a: 'mmHg (millimeters of mercury) is used in medicine for blood pressure and in meteorology for barometric pressure. 1 mmHg = 133.322 Pa.' },
    ],
    useCases: [
      'Tyre and bicycle pump pressure conversions',
      'Weather barometric pressure reading',
      'Medical blood pressure values',
      'Engineering and industrial system pressures',
    ],
    example: { input: '1 atm', output: '101325 Pa / 1.01325 bar / 14.696 psi / 760 mmHg' },
    seoContent: {
      whatIsTitle: 'What is a Pressure Converter?',
      whatIsBody: 'A pressure converter translates a force-per-area measurement between unit systems. The SI unit is the pascal (Pa = N/m2). Common derived units include kilopascal (kPa), bar (100,000 Pa), and standard atmosphere (101,325 Pa). PSI (pounds per square inch) is used in the US for tyres and industrial systems. mmHg (torr) is used in medicine and meteorology.',
      howToTitle: 'How to Convert Pressure',
      howToSteps: [
        'Type a pressure value into any field (Pa, kPa, bar, psi, atm, or mmHg).',
        'All other fields update instantly.',
        'Use quick example buttons to load common reference pressures.',
        'Click Clear to reset all fields.',
      ],
    },
    learnMore: {
      title: 'Pressure Unit Systems',
      body: 'Pressure measures force divided by area. The pascal (Pa) is the SI unit: 1 Pa = 1 N/m2. The bar (100 kPa) is widely used in meteorology and engineering. Atmospheres (atm) represent average sea-level air pressure. PSI is dominant in the US for pneumatics and tyre pressure. mmHg (also called torr) is used in medicine for blood pressure and vacuum measurements.',
    },
  },
  {
    slug: 'energy-converter',
    title: 'Energy Converter — Joules, kWh, calories, BTU',
    description: 'Convert energy between joules, kilojoules, calories, kilocalories, watt-hours, kilowatt-hours, megajoules, and BTU. Type in any field for instant conversion.',
    category: 'convert',
    tags: ['convert'],
    relatedTools: ['calorie-calculator', 'calorie-burn-calculator', 'unit-converter', 'pressure-converter'],
    faq: [
      { q: 'What is the difference between calories and kcal?', a: '1 kcal (kilocalorie) = 1000 cal (small calories). Food labels always use kcal — the "Calorie" on packaging is actually a kilocalorie.' },
      { q: 'How many joules in 1 kWh?', a: '1 kWh = 3,600,000 J = 3.6 MJ.' },
      { q: 'What is a BTU?', a: 'BTU (British Thermal Unit) is the energy needed to heat 1 pound of water by 1°F. 1 BTU = 1055.06 J.' },
      { q: 'How do I convert food calories to joules?', a: 'Multiply kcal by 4184. For example, 100 kcal = 418,400 J = 418.4 kJ.' },
    ],
    useCases: [
      'Nutrition: converting food energy between kcal and kJ',
      'Electricity billing: understanding kWh consumption',
      'HVAC: converting BTU ratings',
      'Physics and chemistry: energy unit conversion',
    ],
    example: { input: '1 kWh', output: '3,600,000 J / 3600 kJ / 860 kcal / 3412 BTU' },
    seoContent: {
      whatIsTitle: 'What is an Energy Converter?',
      whatIsBody: 'An energy converter translates a quantity of work or heat between different unit systems. The joule (J) is the SI unit. The calorie (cal) and kilocalorie (kcal) measure heat and food energy. The watt-hour (Wh) and kilowatt-hour (kWh) measure electrical energy. The BTU (British Thermal Unit) is used in heating and cooling systems, especially in the US.',
      howToTitle: 'How to Convert Energy',
      howToSteps: [
        'Type an energy value into any field (J, kJ, MJ, cal, kcal, Wh, kWh, or BTU).',
        'All other fields update instantly.',
        'Use quick example buttons for common reference energy values.',
        'Click Clear to reset all fields.',
      ],
    },
    learnMore: {
      title: 'Energy Units Explained',
      body: 'Energy and work share the same SI unit: the joule. 1 joule = 1 watt-second. A kilowatt-hour (kWh) = 3.6 million joules — this is what electric meters count. A dietary Calorie (capital C on food labels) is actually a kilocalorie = 4184 joules. BTU is used in HVAC ratings in the US; 1 BTU = 1055 joules. 1 calorie (small c) = the heat needed to raise 1 gram of water by 1°C = 4.184 joules.',
    },
  },
  {
    slug: 'angle-converter',
    title: 'Angle Converter — Degrees, Radians, Gradians',
    description: 'Convert angles between degrees, radians, gradians (grads), and turns. Type in any field for instant conversion.',
    category: 'convert',
    tags: ['convert'],
    relatedTools: ['unit-converter', 'length-converter', 'speed-converter'],
    faq: [
      { q: 'How many radians in 180 degrees?', a: '180 degrees = pi radians (approximately 3.14159 rad).' },
      { q: 'What is a gradian?', a: 'A gradian (also called grad or gon) divides a right angle into 100 parts. 1 full circle = 400 gradians. Used in surveying.' },
      { q: 'How do I convert degrees to radians?', a: 'Multiply degrees by pi/180. Example: 90 degrees x (pi/180) = 1.5708 radians.' },
      { q: 'What is a turn?', a: '1 turn = 1 full rotation = 360 degrees = 2*pi radians = 400 gradians.' },
    ],
    useCases: [
      'Programming: converting between degrees and radians for trigonometry',
      'Surveying: working with gradian-based instruments',
      'Mathematics and physics homework',
      'CAD and 3D modeling angle conversions',
    ],
    example: { input: '90 degrees', output: '1.5708 rad / 100 grad / 0.25 turn' },
    seoContent: {
      whatIsTitle: 'What is an Angle Converter?',
      whatIsBody: 'An angle converter translates a rotation measurement between different systems. Degrees (360 per circle) are the most familiar unit. Radians (2*pi per circle) are the standard in mathematics and most programming languages. Gradians divide a right angle into 100 equal parts (400 per circle) and are used in surveying. A turn represents one complete rotation.',
      howToTitle: 'How to Convert Angles',
      howToSteps: [
        'Type an angle value into any field (degrees, radians, gradians, or turns).',
        'All other fields update instantly.',
        'Use quick example buttons for common reference angles.',
        'Click Clear to reset all fields.',
      ],
    },
    learnMore: {
      title: 'Degrees vs Radians',
      body: 'Degrees divide a circle into 360 parts — a convention inherited from ancient Babylonian astronomy. Radians divide a circle into 2*pi parts, making them natural for calculus and trigonometry (sin, cos, tan in most programming languages expect radians). Gradians (gons) divide a right angle into 100 parts, used in surveying because of their decimal convenience. 1 radian = 180/pi degrees (approximately 57.296 degrees).',
    },
  },
  {
    slug: 'time-converter',
    title: 'Time Converter — seconds, minutes, hours, days',
    description: 'Convert time between milliseconds, seconds, minutes, hours, days, weeks, months, and years. Type in any field for instant conversion.',
    category: 'convert',
    tags: ['convert'],
    relatedTools: ['date-calculator', 'age-calculator', 'unit-converter', 'timestamp'],
    faq: [
      { q: 'How many seconds in a day?', a: '1 day = 86,400 seconds (24 hours x 60 minutes x 60 seconds).' },
      { q: 'How many seconds in a year?', a: 'Approximately 31,557,000 seconds (365.25 days x 86,400).' },
      { q: 'How many weeks in a year?', a: 'Approximately 52.18 weeks in a year (365.25 / 7).' },
      { q: 'What month length does this tool use?', a: 'Average Gregorian month: 365.2425 / 12 = 30.436875 days = 2,629,746 seconds.' },
    ],
    useCases: [
      'Converting API timeout values between ms and seconds',
      'Project planning: weeks to days to hours',
      'Age and duration calculations',
      'Converting sleep or exercise duration between units',
    ],
    example: { input: '1 year', output: '31,556,952 s / 525,949 min / 8765.8 h / 365.24 days / 52.18 wk' },
    seoContent: {
      whatIsTitle: 'What is a Time Converter?',
      whatIsBody: 'A time converter translates a duration between different time units. Common units range from milliseconds (ms) used in computing, to seconds, minutes, hours, and days used in everyday life, up to weeks, months, and years for longer periods. This tool uses the average Gregorian year (365.2425 days) for month and year conversions.',
      howToTitle: 'How to Convert Time',
      howToSteps: [
        'Type a duration into any field (ms, s, min, h, day, wk, mo, or yr).',
        'All other fields update instantly.',
        'Use quick example buttons for common reference durations.',
        'Click Clear to reset all fields.',
      ],
    },
    learnMore: {
      title: 'Time Unit Definitions',
      body: 'The second (s) is the SI base unit of time. 1 minute = 60 seconds; 1 hour = 3600 seconds; 1 day = 86,400 seconds. A week = 7 days. A month and year are not fixed: the Gregorian calendar uses an average year of 365.2425 days (accounting for leap years), making an average month 30.44 days. This converter uses these averages for month and year fields.',
    },
  },
  {
    slug: 'power-converter',
    title: 'Power Converter — Watts, kW, horsepower, BTU/h',
    description: 'Convert power between watts, kilowatts, megawatts, horsepower, BTU per hour, and kilocalories per hour. Type in any field for instant conversion.',
    category: 'convert',
    tags: ['convert'],
    relatedTools: ['energy-converter', 'unit-converter', 'pressure-converter', 'speed-converter'],
    faq: [
      { q: 'How many watts is 1 horsepower?', a: '1 mechanical horsepower = 745.7 watts.' },
      { q: 'How many BTU/h is 1 kW?', a: '1 kW = 3412.14 BTU/h.' },
      { q: 'What is the difference between power and energy?', a: 'Power is the rate of energy transfer (watts = joules per second). Energy is the total amount transferred over time (kWh = kW multiplied by hours).' },
      { q: 'What is horsepower used for?', a: 'Horsepower is used to rate engines, motors, and tools — especially in the US and UK. Car engine output, air conditioner capacity, and vacuum cleaners are often rated in horsepower or BTU/h.' },
    ],
    useCases: [
      'Comparing car engine power ratings',
      'HVAC: converting AC capacity between BTU/h and kW',
      'Electrical: understanding appliance watt ratings',
      'Engineering: motor and pump power conversion',
    ],
    example: { input: '1 horsepower', output: '745.7 W / 0.7457 kW / 2544.4 BTU/h' },
    seoContent: {
      whatIsTitle: 'What is a Power Converter?',
      whatIsBody: 'A power converter translates the rate of energy transfer between different unit systems. The watt (W) is the SI unit of power: 1 W = 1 joule per second. Kilowatts (kW) and megawatts (MW) are multiples. Horsepower (hp) is used in automotive and mechanical contexts. BTU/h is used in HVAC systems. Kilocalories per hour is used for human metabolic rate.',
      howToTitle: 'How to Convert Power',
      howToSteps: [
        'Type a power value into any field (W, kW, MW, hp, BTU/h, or kcal/h).',
        'All other fields update instantly.',
        'Use quick example buttons for common reference power values.',
        'Click Clear to reset all fields.',
      ],
    },
    learnMore: {
      title: 'Power Units Explained',
      body: 'Power = Energy / Time. 1 watt = 1 joule per second. 1 kilowatt-hour of energy = 1 kW of power sustained for 1 hour. Mechanical horsepower is defined as 550 foot-pounds per second = 745.69987 watts. Metric horsepower (PS) = 735.499 watts. BTU/h is the power unit used in US HVAC ratings; 12,000 BTU/h = 1 ton of refrigeration = 3.517 kW.',
    },
  },
  {
    slug: 'force-converter',
    title: 'Force Converter — Newtons, lbf, kgf, kN',
    description: 'Convert force between newtons, kilonewtons, pound-force, kilogram-force, millinewtons, and dyne. Type in any field for instant conversion.',
    category: 'convert',
    tags: ['convert'],
    relatedTools: ['pressure-converter', 'weight-converter', 'unit-converter', 'energy-converter'],
    faq: [
      { q: 'How many newtons in 1 pound-force?', a: '1 lbf = 4.44822 N.' },
      { q: 'What is kilogram-force?', a: '1 kgf is the force exerted by gravity on 1 kg at standard gravity (g = 9.80665 m/s2). 1 kgf = 9.80665 N.' },
      { q: 'What is the difference between mass and force?', a: 'Mass (kg) is the amount of matter. Force (N) is mass x acceleration. Weight is the gravitational force on a mass: a 1 kg object has a weight of about 9.8 N on Earth.' },
      { q: 'What is a dyne?', a: 'A dyne is the CGS unit of force. 1 dyne = 10^-5 N = 0.00001 N. Used in physics and chemistry.' },
    ],
    useCases: [
      'Engineering structural load calculations',
      'Physics and mechanics homework',
      'Converting weight force between kg and lbs',
      'Material testing and tensile strength comparisons',
    ],
    example: { input: '1 kgf', output: '9.807 N / 0.009807 kN / 2.205 lbf' },
    seoContent: {
      whatIsTitle: 'What is a Force Converter?',
      whatIsBody: 'A force converter translates a push or pull measurement between different unit systems. The newton (N) is the SI unit: 1 N = the force needed to accelerate 1 kg at 1 m/s2. The kilonewton (kN) is used in structural engineering. Pound-force (lbf) is used in the US. Kilogram-force (kgf) relates force to familiar mass units. The dyne is used in physics at smaller scales.',
      howToTitle: 'How to Convert Force',
      howToSteps: [
        'Type a force value into any field (N, kN, lbf, kgf, dyn, or mN).',
        'All other fields update instantly.',
        'Use quick example buttons for common reference forces.',
        'Click Clear to reset all fields.',
      ],
    },
    learnMore: {
      title: 'Force, Weight, and Mass',
      body: 'Force, weight, and mass are related but distinct. Mass (kg) is a property of matter — it does not change with location. Weight is the gravitational force on a mass: F = m x g. At standard gravity (9.80665 m/s2), a 1 kg mass has a weight of 9.80665 N = 1 kgf. The newton is named after Isaac Newton, who defined the second law of motion: F = ma.',
    },
  },
  {
    slug: 'frequency-converter',
    title: 'Frequency Converter — Hz, kHz, MHz, GHz, RPM',
    description: 'Convert frequency between hertz, kilohertz, megahertz, gigahertz, terahertz, and RPM. Type in any field for instant conversion.',
    category: 'convert',
    tags: ['convert'],
    relatedTools: ['unit-converter', 'time-converter', 'angle-converter', 'data-storage-converter'],
    faq: [
      { q: 'How many Hz in 1 MHz?', a: '1 MHz = 1,000,000 Hz.' },
      { q: 'How do I convert RPM to Hz?', a: 'Divide RPM by 60. For example, 3000 RPM = 50 Hz.' },
      { q: 'What is the frequency of mains AC power?', a: 'In North America and some of Asia: 60 Hz. In Europe, Africa, Asia, and Australia: 50 Hz.' },
      { q: 'What frequency is Wi-Fi?', a: 'Wi-Fi uses 2.4 GHz and 5 GHz bands. Newer Wi-Fi 6E also uses 6 GHz.' },
    ],
    useCases: [
      'Electronics: comparing signal frequencies',
      'Audio: musical note frequency lookup',
      'Computing: CPU and memory clock speed conversion',
      'Radio: AM/FM/Wi-Fi frequency band reference',
    ],
    example: { input: '2.4 GHz', output: '2,400,000,000 Hz / 2,400,000 kHz / 2400 MHz / 0.0024 THz' },
    seoContent: {
      whatIsTitle: 'What is a Frequency Converter?',
      whatIsBody: 'A frequency converter translates cycles-per-second (hertz) between metric prefixes and related units. Hertz (Hz) = one cycle per second. Kilohertz (kHz), megahertz (MHz), gigahertz (GHz), and terahertz (THz) are powers of 1000. RPM (revolutions per minute) is used in mechanical systems and converts to Hz by dividing by 60.',
      howToTitle: 'How to Convert Frequency',
      howToSteps: [
        'Type a frequency value into any field (Hz, kHz, MHz, GHz, THz, or RPM).',
        'All other fields update instantly.',
        'Use quick example buttons for common reference frequencies.',
        'Click Clear to reset all fields.',
      ],
    },
    learnMore: {
      title: 'Frequency in Everyday Life',
      body: 'Frequency measures how many times a repeating event occurs per second. Audio: human hearing spans 20 Hz to 20 kHz; middle A is 440 Hz. Radio: AM is 535–1605 kHz; FM is 87.5–108 MHz; Wi-Fi is 2.4–6 GHz. Computing: modern CPUs run at 3–5 GHz clock speeds. Mains power: 50 Hz in most of the world, 60 Hz in North America.',
    },
  },
  {
    slug: 'torque-converter',
    title: 'Torque Converter — N·m, ft·lb, in·lb, kgf·m',
    description: 'Convert torque between newton-meters, foot-pounds, inch-pounds, kilogram-force meters, kilonewton-meters, and newton-centimeters. Type in any field for instant conversion.',
    category: 'convert',
    tags: ['convert'],
    relatedTools: ['force-converter', 'pressure-converter', 'energy-converter', 'unit-converter'],
    faq: [
      { q: 'How many ft·lb is 1 N·m?', a: '1 N·m = 0.7376 ft·lb (foot-pounds).' },
      { q: 'How many in·lb is 1 N·m?', a: '1 N·m = 8.851 in·lb (inch-pounds).' },
      { q: 'What is the difference between torque and force?', a: 'Force is a push or pull (measured in newtons). Torque is a rotational force — force applied at a distance from a pivot point. Torque = Force x Lever Arm length.' },
      { q: 'What is kgf·m used for?', a: 'Kilogram-force meter (kgf·m) is a legacy unit used in older engineering literature and some Asian countries. 1 kgf·m = 9.80665 N·m.' },
    ],
    useCases: [
      'Torque wrench settings for bolts and fasteners',
      'Engine torque spec comparisons (N·m vs ft·lb)',
      'Bicycle and motorcycle specifications',
      'Structural and mechanical engineering calculations',
    ],
    example: { input: '100 N·m', output: '73.76 ft·lb / 885.1 in·lb / 10.197 kgf·m' },
    seoContent: {
      whatIsTitle: 'What is a Torque Converter?',
      whatIsBody: 'A torque converter translates rotational force measurements between unit systems. Newton-meters (N·m) is the SI unit of torque. Foot-pounds (ft·lb) and inch-pounds (in·lb) are used in the US for fastener specs and engine ratings. Kilogram-force meters (kgf·m) appear in older and some Asian engineering documents. Kilonewton-meters (kN·m) are used in structural engineering.',
      howToTitle: 'How to Convert Torque',
      howToSteps: [
        'Type a torque value into any field (N·m, kN·m, ft·lb, in·lb, kgf·m, or N·cm).',
        'All other fields update instantly.',
        'Use quick example buttons for common reference torque values.',
        'Click Clear to reset all fields.',
      ],
    },
    learnMore: {
      title: 'Torque Units in Practice',
      body: 'Torque = Force x Distance. 1 N·m = a 1-newton force applied 1 meter from the pivot. Engine torque specs are given in N·m (metric) or ft·lb (US). Fastener torque specs use N·m or in·lb for smaller bolts. A typical car wheel lug nut is torqued to about 100–130 N·m (74–96 ft·lb). Always check whether a spec uses ft·lb or in·lb — confusing the two can cause over- or under-tightening by 12x.',
    },
  },
  {
    slug: 'compound-interest-calculator',
    title: 'Compound Interest Calculator',
    description: 'Calculate compound interest with principal, rate, time, and compounding frequency. See final balance, total interest earned, and a year-by-year growth table.',
    category: 'calculator',
    tags: ['calculator'],
    relatedTools: ['savings-calculator', 'loan-calculator', 'mortgage-calculator', 'percentage-calculator'],
    faq: [
      { q: 'What is compound interest?', a: 'Compound interest is interest calculated on both the initial principal and the accumulated interest. It grows faster than simple interest.' },
      { q: 'What does compounding frequency mean?', a: 'It is how often interest is applied per year. Monthly compounding (12×/yr) grows faster than annual (1×/yr) at the same nominal rate.' },
      { q: 'What is APY?', a: 'Annual Percentage Yield (APY) is the effective annual rate after compounding. APY = (1 + r/n)^n - 1. It lets you compare accounts with different compounding frequencies.' },
      { q: 'Does this include monthly contributions?', a: 'Yes. Enter a monthly contribution amount and the calculator will include those deposits in the year-by-year growth table.' },
    ],
    useCases: [
      'Project savings account balance after N years',
      'Compare annual vs monthly compounding',
      'Estimate investment growth with regular contributions',
      'Calculate how much a lump sum grows over time',
    ],
    example: { input: '$10,000 at 7% for 10 years (monthly)', output: '$20,097.33 final balance · $10,097.33 interest' },
    seoContent: {
      whatIsTitle: 'What is a Compound Interest Calculator?',
      whatIsBody: 'A compound interest calculator shows how money grows when interest is added to the principal regularly. Unlike simple interest, compound interest earns "interest on interest," which causes exponential growth over time. The formula is A = P(1 + r/n)^(nt), where P is principal, r is the annual rate, n is compounding frequency per year, and t is time in years.',
      howToTitle: 'How to Calculate Compound Interest',
      howToSteps: [
        'Enter the starting principal amount.',
        'Set the annual interest rate (%).',
        'Enter the number of years.',
        'Choose the compounding frequency (monthly is most common for savings accounts).',
        'Optionally add a monthly contribution to include regular deposits.',
      ],
    },
    learnMore: {
      title: 'Compound Interest vs Simple Interest',
      body: 'Simple interest grows linearly: $10,000 at 7% for 10 years = $17,000. Compound interest grows exponentially: $10,000 at 7% compounded monthly for 10 years = $20,097. The difference is the "interest on interest" effect. The Rule of 72 is a quick estimate: divide 72 by the annual rate to get the approximate number of years to double your money (72 / 7% ≈ 10.3 years).',
    },
  },
  {
    slug: 'number-extractor',
    title: 'Number Extractor',
    description: 'Extract all numbers from pasted text instantly. Supports integers, decimals, negative numbers, and prices. Copy results as a list or comma-separated values.',
    category: 'text',
    tags: ['text'],
    relatedTools: ['email-extractor', 'url-extractor', 'phone-extractor', 'csv-column-extractor'],
    faq: [
      { q: 'Does it extract decimal numbers?', a: 'Yes. The "Include decimals" option is on by default and extracts numbers like 3.14, 0.5, and 99.99.' },
      { q: 'Does it extract negative numbers?', a: 'Yes. The "Include negatives" option extracts numbers prefixed with a minus sign, like -10 or -3.5.' },
      { q: 'Can I remove duplicates?', a: 'Yes. Enable the "Deduplicate" option to keep only unique values in the results.' },
      { q: 'Does it upload my text?', a: 'No. All extraction runs in your browser. No text is sent to any server.' },
    ],
    useCases: [
      'Extract prices or quantities from product descriptions',
      'Pull numeric data from reports or logs',
      'Sum all numbers in a document',
      'Extract measurements from technical specifications',
    ],
    example: { input: 'The package weighs 2.5 kg and costs $14.99. Shipping: -$3.00.', output: '2.5, 14.99, -3.0 · Sum: 14.49' },
    seoContent: {
      whatIsTitle: 'What is Number Extractor?',
      whatIsBody: 'Number Extractor scans pasted text and pulls out every numeric value — integers, decimals, and negatives. It is useful for quickly gathering data from reports, product listings, log files, or any text that contains mixed numeric content. The tool also computes instant statistics: count, sum, min, max, and average.',
      howToTitle: 'How to Extract Numbers from Text',
      howToSteps: [
        'Paste any text into the input area.',
        'Choose options: include decimals, include negatives, or deduplicate.',
        'All extracted numbers appear instantly with statistics.',
        'Click "Copy as List" to copy one number per line, or "Copy as CSV" for a comma-separated format.',
      ],
    },
    learnMore: {
      title: 'When to Use Number Extractor',
      body: 'Common use cases include extracting prices from scraped product pages, pulling timestamps or IDs from log files, gathering measurements from specification documents, and summarizing numeric data from reports that are not in a spreadsheet format. The sum, min, max, and average statistics help you quickly sanity-check the extracted values.',
    },
  },
  {
    slug: 'image-flipper',
    title: 'Image Flipper',
    description: 'Flip any image horizontally (mirror) or vertically in your browser. No upload, no registration. Supports JPG, PNG, WebP, GIF. Download the result instantly.',
    category: 'image',
    tags: ['image'],
    relatedTools: ['image-rotate', 'grayscale-image', 'image-resizer', 'invert-image'],
    faq: [
      { q: 'What does "flip horizontal" mean?', a: 'Flipping horizontally mirrors the image left-to-right, like reflecting it in a vertical mirror. It is also called a horizontal mirror flip.' },
      { q: 'What does "flip vertical" mean?', a: 'Flipping vertically mirrors the image top-to-bottom, like reflecting it in a horizontal mirror.' },
      { q: 'Is the original image uploaded or stored?', a: 'No. The flip is done entirely in your browser using the Canvas API. No data is sent to any server.' },
      { q: 'What formats are supported?', a: 'Any image format your browser supports: JPG, PNG, WebP, GIF, BMP, and SVG.' },
    ],
    useCases: [
      'Mirror a photo for symmetrical layouts',
      'Correct mirrored text in screenshots',
      'Create a reflection effect for design work',
      'Flip a reference image for drawing practice',
    ],
    example: { input: 'Portrait photo facing left', output: 'Portrait photo facing right (horizontal flip)' },
    seoContent: {
      whatIsTitle: 'What is Image Flipper?',
      whatIsBody: 'Image Flipper lets you mirror or flip any image horizontally or vertically directly in your browser. Flipping horizontally (left-right mirror) is common for social media, avatars, and design layouts. Flipping vertically (upside-down) is useful for creating reflection effects or correcting orientations. The tool uses the browser Canvas API so no image data is uploaded or stored.',
      howToTitle: 'How to Flip an Image',
      howToSteps: [
        'Upload an image by clicking the upload area or dragging a file onto it.',
        'Click "Flip Horizontal" to mirror left-to-right, or "Flip Vertical" to flip top-to-bottom.',
        'Click "Flip Both" to apply both flips at once, or "Reset" to undo all flips.',
        'Download the result as PNG or JPG.',
      ],
    },
    learnMore: {
      title: 'Horizontal vs Vertical Flip',
      body: 'A horizontal flip (mirror) reverses the image along the vertical axis — left becomes right. A vertical flip reverses it along the horizontal axis — top becomes bottom. Combining both is equivalent to a 180° rotation. Flips are non-destructive: you can toggle them on and off without losing quality, since the tool re-renders from the original source each time.',
    },
  },
{
  slug: 'image-watermark',
  title: 'Image Watermark',
  description: 'Add custom text watermarks to images with adjustable position, font size, color, and opacity',
  category: 'image',
  tags: ['watermark', 'text overlay', 'photo branding', 'PNG'],
  relatedTools: ['image-brightness-contrast', 'remove-exif', 'image-resizer'],
  faq: [
    { q: 'What image formats are supported?', a: 'You can upload JPG, PNG, WebP, and GIF images. The result is always downloaded as a PNG.' },
    { q: 'Can I change the watermark position?', a: 'Yes. There is a 3×3 position grid covering all nine corners and edges. Click any position to move the watermark.' },
    { q: 'How do I make the watermark semi-transparent?', a: 'Use the Opacity slider. Lower values produce a more transparent watermark that blends into the image.' },
    { q: 'Is the image uploaded to a server?', a: 'No. All watermark processing happens locally in your browser using the Canvas API.' },
  ],
  useCases: [
    'Protect photos before sharing them online',
    'Add copyright text to product or portfolio images',
    'Brand social media photos with a name or handle',
    'Mark draft images with status labels before review',
  ],
  example: { input: 'Upload a photo and type "© 2025 Jane" with opacity 60% at bottom-right', output: 'Download a PNG with a semi-transparent copyright text in the bottom-right corner' },
  seoContent: {
    whatIsTitle: 'What is Image Watermark?',
    whatIsBody: 'Image Watermark lets you overlay custom text on any photo directly in your browser. You can control the font, size, style, color, opacity, and exact position of the watermark across a 3×3 position grid. This is useful for copyright protection, branding, and draft labeling without installing any software.',
    howToTitle: 'How to Use Image Watermark',
    howToSteps: [
      'Upload the image you want to watermark.',
      'Type your watermark text in the Text field.',
      'Adjust font size, style, color, and opacity as needed.',
      'Click a position button to place the watermark where you want it.',
      'Download the watermarked PNG.',
    ],
  },
  learnMore: {
    title: 'Text Watermarks and Opacity',
    body: 'A text watermark works by rendering the watermark string directly onto the image canvas with a set opacity. Lower opacity values (20–40%) create subtle watermarks that are visible but do not dominate the image. Higher values (70–100%) make the text clearly legible. Position padding keeps the watermark away from the edges so it does not get cropped. The result is always exported as PNG to preserve any transparency introduced by the opacity setting.',
  },
},
{
  slug: 'reverse-text',
  title: 'Reverse Text',
  description: 'Flip text by reversing characters, word order, line order, or each line independently',
  category: 'text',
  tags: ['reverse text', 'flip words', 'mirror text', 'text manipulation'],
  relatedTools: ['text-case', 'text-cleaner', 'line-sorter'],
  faq: [
    { q: 'What does Reverse Characters do?', a: 'It reverses the entire string so the last character becomes the first. For example "Hello" becomes "olleH".' },
    { q: 'What does Reverse Word Order do?', a: 'It reverses the order of words on each line while keeping the characters within each word intact.' },
    { q: 'What does Reverse Line Order do?', a: 'It keeps each line intact but reverses the order of lines in the text, so the last line becomes the first.' },
    { q: 'What does Reverse Each Line do?', a: 'It reverses the characters within each individual line, leaving line order unchanged.' },
  ],
  useCases: [
    'Create mirror-text effects for social media captions',
    'Reverse a list of lines to change processing order',
    'Test text rendering direction in UI development',
    'Generate reversed strings for simple obfuscation exercises',
  ],
  example: { input: '"Hello World" with Reverse Characters mode', output: '"dlroW olleH"' },
  seoContent: {
    whatIsTitle: 'What is Reverse Text?',
    whatIsBody: 'Reverse Text is a browser tool that flips text in four different ways: reversing all characters, reversing word order per line, reversing line order, or reversing each line independently. The result updates instantly as you type so you can pick the mode that fits your use case.',
    howToTitle: 'How to Use Reverse Text',
    howToSteps: [
      'Paste or type your text in the Input field.',
      'Select the reversal mode you need: characters, words, lines, or each line.',
      'Copy or download the reversed result.',
    ],
  },
  learnMore: {
    title: 'Reversal Modes Explained',
    body: 'Character reversal treats the entire text as a single sequence and flips it end to end. Word reversal splits each line on whitespace and reverses the resulting tokens, preserving spaces. Line-order reversal splits on newlines and reverses that list. Per-line character reversal applies character reversal independently to each line, so multiline text retains its structure but each row is mirrored.',
  },
},
{
  slug: 'css-gradient-generator',
  title: 'CSS Gradient Generator',
  description: 'Build linear and radial CSS gradients visually with color stops, live preview, and one-click copy',
  category: 'generate',
  tags: ['CSS gradient', 'linear gradient', 'radial gradient', 'color stops', 'web design'],
  relatedTools: ['image-palette-extractor', 'image-brightness-contrast', 'duotone-image'],
  faq: [
    { q: 'What gradient types are supported?', a: 'Linear gradients with a custom angle (0–360°) and radial gradients (circle shape) are both supported.' },
    { q: 'Can I add more than two color stops?', a: 'Yes. Click "Add color stop" to add as many stops as you need. Each stop has an independent color and position.' },
    { q: 'How do I control the direction of a linear gradient?', a: 'Use the Angle slider. 0° is top to bottom, 90° is left to right, and 135° runs diagonally.' },
    { q: 'Is the output cross-browser compatible?', a: 'Yes. The tool outputs standard CSS using the linear-gradient() and radial-gradient() functions which are supported by all modern browsers.' },
  ],
  useCases: [
    'Generate background gradients for landing pages and UI components',
    'Create gradient overlays for hero sections',
    'Build color-stop patterns for charts or dividers',
    'Prototype gradient ideas before transferring to a design tool',
  ],
  example: { input: 'Linear, 135°, stop 1: #7c6af7 at 0%, stop 2: #06b6d4 at 100%', output: 'background: linear-gradient(135deg, #7c6af7 0%, #06b6d4 100%);' },
  seoContent: {
    whatIsTitle: 'What is CSS Gradient Generator?',
    whatIsBody: 'CSS Gradient Generator is a visual tool for building CSS linear and radial gradients. You add color stops, set their positions on a 0–100% scale, choose an angle for linear gradients, and see the result live. The final CSS property is ready to paste into any stylesheet.',
    howToTitle: 'How to Use CSS Gradient Generator',
    howToSteps: [
      'Choose Linear or Radial gradient type.',
      'For linear gradients, set the angle using the slider.',
      'Edit the default color stops by clicking the color pickers and adjusting positions.',
      'Add more color stops with the "Add color stop" button if needed.',
      'Click "Copy CSS" to copy the gradient property to your clipboard.',
    ],
  },
  learnMore: {
    title: 'CSS Gradient Syntax',
    body: 'A linear gradient in CSS is written as linear-gradient(angle, color stop1, color stop2, ...). The angle defines the direction: 0deg is bottom to top, 90deg is left to right, and 180deg is top to bottom. Color stops define what color appears at what percentage of the gradient. Radial gradients use radial-gradient(shape, color stops) and radiate from a center point outward. Both are pure CSS and require no images, making them ideal for performance-sensitive designs.',
  },
},
{
  slug: 'pdf-page-counter',
  title: 'PDF Page Counter & Metadata Viewer',
  description: 'Count PDF pages and view document metadata — title, author, dates — instantly in your browser',
  category: 'pdf',
  tags: ['PDF page count', 'PDF metadata', 'count PDF pages', 'PDF info', 'PDF viewer'],
  relatedTools: ['pdf-to-image', 'image-to-pdf', 'pdf-compress'],
  faq: [
    { q: 'Is my PDF uploaded to a server?', a: 'No. Everything runs in your browser using PDF.js. Your file never leaves your device.' },
    { q: 'What metadata is shown?', a: 'Title, Author, Subject, Creator, Producer, Creation Date, and Modification Date are all displayed if present in the PDF.' },
    { q: 'Does it work with large PDFs?', a: 'Yes. The tool only reads the document structure and metadata — it does not render every page — so even large files are counted quickly.' },
    { q: 'What PDF versions are supported?', a: 'PDF 1.x through PDF 2.0 are all supported via PDF.js, which is the same engine used by Firefox.' },
  ],
  useCases: [
    'Quickly check how many pages are in a document before printing',
    'Verify PDF metadata before publishing or sharing',
    'Confirm author and creation date on a received document',
    'Check whether a PDF has been modified after creation',
  ],
  example: { input: 'Upload a 12-page report PDF', output: 'Page count: 12 · Title: "Q4 Report" · Author: "Jane Doe" · Created: Jan 5 2026' },
  seoContent: {
    whatIsTitle: 'What is PDF Page Counter?',
    whatIsBody: 'PDF Page Counter is a browser tool that reads a PDF file locally and instantly displays the total page count along with embedded document metadata such as title, author, subject, creator application, producer, and creation and modification dates.',
    howToTitle: 'How to Count PDF Pages',
    howToSteps: [
      'Click the drop zone or drag a PDF file onto it.',
      'The page count and metadata appear immediately — no button press required.',
      'Click "Count another file" to analyse a different document.',
    ],
  },
  learnMore: {
    title: 'What PDF Metadata Contains',
    body: 'PDF documents embed a metadata dictionary in their structure. Common fields include Title (document name), Author (creator), Subject (topic), Creator (the application that created the source file, e.g. Word), Producer (the PDF renderer, e.g. Adobe Acrobat), CreationDate, and ModDate. These fields are optional and may be blank or spoofed, but when present they provide useful provenance information.',
  },
},
{
  slug: 'pdf-to-image',
  title: 'PDF to Image Converter',
  description: 'Convert PDF pages to PNG or JPEG images — runs entirely in your browser with no file upload',
  category: 'pdf',
  tags: ['PDF to image', 'PDF to PNG', 'PDF to JPEG', 'convert PDF', 'PDF page render'],
  relatedTools: ['image-compressor', 'image-resizer', 'image-to-pdf', 'webp-converter'],
  faq: [
    { q: 'Is my PDF file uploaded to a server?', a: 'No. The entire conversion runs in your browser using PDF.js. Your file never leaves your device.' },
    { q: 'Which output formats are supported?', a: 'PNG and JPEG are both supported. PNG preserves transparency; JPEG produces smaller files.' },
    { q: 'Can I convert multiple pages at once?', a: 'Yes. You can choose to convert all pages or a specific range, and download them as individual images.' },
    { q: 'Does it work with scanned PDFs?', a: 'Yes. Scanned PDFs render as images just like any other page — the output quality depends on the scan resolution.' },
  ],
  useCases: [
    'Extract a chart or diagram from a PDF report as a PNG',
    'Convert slides to images for sharing on social media',
    'Turn a scanned PDF into editable image files',
    'Create image previews for each page of a document',
  ],
  example: { input: 'Upload a 5-page PDF, select PNG, render all pages', output: 'Five PNG images — one per page' },
  seoContent: {
    whatIsTitle: 'What is PDF to Image Converter?',
    whatIsBody: 'PDF to Image Converter renders each page of a PDF file to a PNG or JPEG image directly in your browser. It uses PDF.js — the same engine Mozilla Firefox uses — so no server is involved and your files stay private.',
    howToTitle: 'How to Convert PDF Pages to Images',
    howToSteps: [
      'Click "Choose PDF" and select a file from your device.',
      'Choose your output format: PNG or JPEG.',
      'Select which pages to convert (all or a custom range).',
      'Click "Convert" and download the resulting images.',
    ],
  },
  learnMore: {
    title: 'How Browser-Based PDF Rendering Works',
    body: 'PDF.js parses the PDF binary format in JavaScript, interprets each page\'s content stream, and renders it onto an HTML canvas element. The canvas is then exported as an image using the toDataURL() API. Because everything runs client-side, large files are handled without network latency and without privacy risk.',
  },
},
{
  slug: 'pdf-merge',
  title: 'PDF Merger — Combine PDF Files Online Free',
  description: 'Merge multiple PDF files into one — drag to reorder, instant download, no upload needed',
  category: 'pdf',
  tags: ['merge PDF', 'combine PDF', 'join PDF files', 'PDF merger', 'PDF combiner'],
  relatedTools: ['pdf-split', 'pdf-to-image', 'image-to-pdf', 'pdf-compress'],
  faq: [
    { q: 'Are my PDFs uploaded to a server?', a: 'No. All merging happens in your browser using PDF.js and jsPDF. Your files never leave your device.' },
    { q: 'How many PDFs can I merge?', a: 'There is no hard limit. Very large or numerous files may use more browser memory — keep total file size under 100 MB for best performance.' },
    { q: 'Can I control the page order?', a: 'Yes. Drag the file rows to reorder them before merging. Pages within each file follow their original order.' },
    { q: 'Does it preserve text and hyperlinks?', a: 'No. Each page is rasterized to a JPEG image. Use High quality mode for readable text, but links and copy-paste text will not be preserved.' },
  ],
  useCases: [
    'Combine several scanned invoices into one PDF for accounting',
    'Merge multiple report chapters into a single document',
    'Combine cover letter and résumé into one PDF for job applications',
    'Package multiple certificates into one file for submission',
  ],
  example: { input: 'Three PDFs — cover.pdf (1 page), report.pdf (8 pages), appendix.pdf (3 pages)', output: 'merged.pdf — 12 pages in the chosen order' },
  seoContent: {
    whatIsTitle: 'What is PDF Merger?',
    whatIsBody: 'PDF Merger is a browser tool that takes multiple PDF files, renders each page to a JPEG image using PDF.js, and packages them all into a single PDF document with jsPDF. You can drag the file list to set the output order before merging.',
    howToTitle: 'How to Merge PDF Files',
    howToSteps: [
      'Drop your PDF files onto the upload area or click to browse.',
      'Drag the file rows to set the order you want in the output.',
      'Click "Merge PDFs" and wait for all pages to render.',
      'Download the merged PDF when complete.',
    ],
  },
  learnMore: {
    title: 'How Browser-Based PDF Merging Works',
    body: 'The tool loads each PDF sequentially with PDF.js, renders every page onto an HTML canvas at 150 DPI, and exports each canvas as a JPEG. jsPDF then assembles the images into a single PDF document in the order you specified, adding one page per image. The result is a self-contained PDF binary downloaded directly to your device.',
  },
},
{
  slug: 'pdf-split',
  title: 'PDF Splitter — Extract Pages from PDF Free Online',
  description: 'Split a PDF by page range or extract every page as a separate file — runs in your browser',
  category: 'pdf',
  tags: ['split PDF', 'extract PDF pages', 'PDF splitter', 'PDF page extractor', 'divide PDF'],
  relatedTools: ['pdf-merge', 'pdf-to-image', 'pdf-page-counter', 'pdf-compress'],
  faq: [
    { q: 'Is my PDF uploaded?', a: 'No. Splitting runs entirely in your browser using PDF.js and jsPDF. Nothing is sent to a server.' },
    { q: 'How do I specify page ranges?', a: 'Enter ranges like 1-3, 5, 7-9 separated by commas. Each range becomes a separate output PDF.' },
    { q: 'What happens with Every Page mode?', a: 'Each page is saved as its own PDF. All files are packaged into a ZIP archive for download.' },
    { q: 'Does it preserve text and links?', a: 'No. Pages are rasterized to JPEG images in the output PDFs. Text is readable but not selectable.' },
  ],
  useCases: [
    'Extract a single chapter from a long PDF book',
    'Split a scanned multi-page document into individual pages',
    'Separate an invoice bundle into individual invoices',
    'Extract specific pages for sharing without the full document',
  ],
  example: { input: '20-page PDF, range input: 1-5, 10, 15-20', output: 'Three PDFs — pages 1-5, page 10, pages 15-20' },
  seoContent: {
    whatIsTitle: 'What is PDF Splitter?',
    whatIsBody: 'PDF Splitter extracts pages from a PDF file into one or more separate PDFs. You can specify custom page ranges (e.g. 1-3, 5, 7-9) to produce multiple targeted documents, or use Every Page mode to turn each page into its own PDF, downloaded as a ZIP archive.',
    howToTitle: 'How to Split a PDF',
    howToSteps: [
      'Drop your PDF onto the upload area or click to browse.',
      'Choose a split mode: By Range or Every Page.',
      'For By Range: type your ranges in the input field (e.g. 1-3, 5, 8-10).',
      'Click "Split PDF" and download the resulting files.',
    ],
  },
  learnMore: {
    title: 'Range Syntax Reference',
    body: 'Page ranges use comma-separated expressions: a single number (5) selects that page, a hyphenated pair (3-7) selects pages 3 through 7 inclusive, and combinations can be mixed freely (1, 3-5, 8). Pages are rendered at 150 DPI to JPEG and embedded in individual jsPDF documents. When multiple output files are produced they are packaged into a ZIP using JSZip and downloaded in one click.',
  },
},
{
  slug: 'pdf-compress',
  title: 'PDF Compressor — Reduce PDF File Size Online Free',
  description: 'Reduce PDF file size with three quality presets — no upload, runs entirely in your browser',
  category: 'pdf',
  tags: ['PDF compressor', 'reduce PDF size', 'compress PDF', 'PDF optimizer', 'smaller PDF'],
  relatedTools: ['pdf-to-image', 'image-to-pdf', 'pdf-page-counter', 'image-compressor'],
  faq: [
    { q: 'Is my PDF uploaded to a server?', a: 'No. Compression runs entirely in your browser using PDF.js and jsPDF. Your file never leaves your device.' },
    { q: 'Why does the file size increase sometimes?', a: 'Very low-resolution or already-compressed PDFs cannot be reduced further. Try the High preset, which preserves more detail and often avoids size inflation.' },
    { q: 'Does it preserve the text layer?', a: 'No. Each page is rasterized to a JPEG image and embedded in the new PDF. The text layer is lost. Use the High preset to keep text readable.' },
    { q: 'What is the maximum file size?', a: 'There is no hard limit, but very large PDFs may take longer and use more browser memory. For best performance keep files under 50 MB.' },
  ],
  useCases: [
    'Reduce a large PDF report before emailing it',
    'Compress a scanned document to meet an upload size limit',
    'Shrink presentation slides exported as PDF',
    'Reduce storage footprint of archival documents',
  ],
  example: { input: '8 MB scanned PDF, Medium preset', output: 'Compressed PDF ~2.4 MB — 70% smaller' },
  seoContent: {
    whatIsTitle: 'What is PDF Compressor?',
    whatIsBody: 'PDF Compressor re-renders each page of your PDF to a JPEG image at your chosen quality level and packages the result into a new PDF. Three presets let you balance file size against visual quality: High (150 DPI, best readability), Medium (96 DPI, balanced), and Low (72 DPI, smallest file).',
    howToTitle: 'How to Compress a PDF',
    howToSteps: [
      'Click the drop zone or drag your PDF onto it.',
      'Choose a quality preset: High, Medium, or Low.',
      'Click "Compress PDF" and wait for all pages to render.',
      'Review the size comparison, then click "Download" to save the compressed file.',
    ],
  },
  learnMore: {
    title: 'How Browser-Based PDF Compression Works',
    body: 'The tool loads your PDF with PDF.js and renders each page onto an HTML canvas at the chosen resolution. The canvas is then exported as a JPEG using toDataURL() at the selected quality value (0–1). jsPDF collects each image and writes a new PDF binary. Because JPEG is a lossy format, the output file is significantly smaller at the cost of some visual fidelity — most noticeable in thin text at the Low preset.',
  },
},
{
  slug: 'image-to-pdf',
  title: 'Image to PDF Converter',
  description: 'Combine one or more images into a single PDF file — set page size, orientation, and margins locally',
  category: 'pdf',
  tags: ['image to PDF', 'JPG to PDF', 'PNG to PDF', 'merge images PDF', 'create PDF'],
  relatedTools: ['pdf-to-image', 'image-compressor', 'image-resizer', 'merge-images'],
  faq: [
    { q: 'Are my images sent to a server?', a: 'No. The PDF is generated entirely in your browser using jsPDF. Nothing is uploaded.' },
    { q: 'Which image formats are supported?', a: 'JPEG, PNG, WebP, and GIF are all accepted as input.' },
    { q: 'Can I set the page size?', a: 'Yes. Common sizes like A4, Letter, and custom pixel dimensions are available.' },
    { q: 'How do I control the order of images?', a: 'You can drag and drop the images in the list to reorder them before generating the PDF.' },
  ],
  useCases: [
    'Combine scanned document pages into one PDF for emailing',
    'Convert a series of screenshots into a PDF report',
    'Merge product photos into a single PDF catalogue',
    'Package multiple PNG charts into one downloadable document',
  ],
  example: { input: 'Three JPEG photos, A4 portrait, 10 mm margin', output: 'Single PDF — three pages, one image per page' },
  seoContent: {
    whatIsTitle: 'What is Image to PDF Converter?',
    whatIsBody: 'Image to PDF Converter takes one or more image files (JPEG, PNG, WebP, GIF) and packages them into a single PDF document. You can set the page size, orientation, and margins before downloading. The PDF is generated by jsPDF directly in your browser — no server required.',
    howToTitle: 'How to Combine Images into a PDF',
    howToSteps: [
      'Click "Add Images" and select one or more files.',
      'Drag the thumbnails to set the page order.',
      'Choose page size (A4, Letter, or custom) and orientation.',
      'Click "Generate PDF" and download the result.',
    ],
  },
  learnMore: {
    title: 'How jsPDF Generates PDFs in the Browser',
    body: 'jsPDF is a JavaScript library that writes a valid PDF binary file entirely in memory. It places each image on its own page using addImage(), applies the chosen dimensions and margins, then triggers a download via a Blob URL. Because there is no server round-trip, generation is nearly instant for typical document sizes.',
  },
},
{
  slug: 'pdf-rotate-pages',
  title: 'PDF Page Rotator',
  description: 'Rotate individual pages or the entire PDF — choose 90°, 180°, or 270° per page, no upload needed',
  category: 'pdf',
  tags: ['rotate PDF', 'PDF page rotation', 'fix PDF orientation', 'rotate PDF pages', 'PDF tools'],
  relatedTools: ['pdf-to-image', 'pdf-merge', 'pdf-split', 'pdf-compress'],
  faq: [
    { q: 'Are my PDF files uploaded to a server?', a: 'No. Rotation is performed entirely in your browser using PDF.js and jsPDF. Nothing leaves your device.' },
    { q: 'Can I rotate individual pages?', a: 'Yes. Each page has its own rotation selector (0°, 90°, 180°, 270°). You can also rotate all pages at once with the quick-rotate buttons.' },
    { q: 'Does it preserve the original PDF quality?', a: 'Pages are re-rendered to canvas at 1.5× scale, so vector text becomes rasterized. Quality is high for most documents but native vector fidelity is not preserved.' },
    { q: 'What is the maximum file size?', a: 'There is no hard limit, but very large PDFs (100+ pages at high resolution) may be slow due to browser memory constraints.' },
  ],
  useCases: [
    'Fix scanned documents that were saved in the wrong orientation',
    'Rotate a single landscape page in an otherwise portrait PDF',
    'Correct phone-camera PDFs that are sideways',
    'Prepare a presentation PDF for widescreen display',
  ],
  example: { input: 'PDF with 5 pages — page 3 is landscape, rest are portrait', output: 'Same PDF with page 3 rotated 90° to match the rest' },
  seoContent: {
    whatIsTitle: 'What is PDF Page Rotator?',
    whatIsBody: 'PDF Page Rotator lets you rotate individual pages — or the entire document — in 90° increments. After uploading your PDF, thumbnail previews appear for each page. You can set a rotation angle per page or use the "Rotate All" shortcuts, then download the corrected PDF instantly.',
    howToTitle: 'How to Rotate PDF Pages',
    howToSteps: [
      'Drop your PDF file onto the upload zone.',
      'Wait for page thumbnails to load.',
      'Use the rotation selector under each page to set its angle, or click "All +90°" / "All −90°" to rotate everything at once.',
      'Click "Apply & Download" to save the rotated PDF.',
    ],
  },
  learnMore: {
    title: 'How PDF Rotation Works in the Browser',
    body: 'PDF.js renders each page to an HTML canvas. For rotation, the canvas dimensions are swapped (for 90°/270°) and ctx.translate + ctx.rotate are applied before drawImage. jsPDF then assembles the rotated canvases into a new PDF document, which is downloaded as a Blob URL — no server involved.',
  },
},
{
  slug: 'pdf-extract-text',
  title: 'PDF Text Extractor',
  description: 'Extract all text content from a PDF file — copy to clipboard or download as .txt, no upload needed',
  category: 'pdf',
  tags: ['extract text from PDF', 'PDF to text', 'copy PDF text', 'PDF text extractor', 'PDF tools'],
  relatedTools: ['pdf-page-counter', 'pdf-to-image', 'word-counter', 'find-and-replace'],
  faq: [
    { q: 'Is my PDF uploaded to a server?', a: 'No. Text extraction uses PDF.js which runs entirely in your browser. Your file never leaves your device.' },
    { q: 'Does it work on scanned PDFs?', a: 'Scanned PDFs are images, not text layers, so no text can be extracted. Only PDFs with an embedded text layer (most digital PDFs) work with this tool.' },
    { q: 'Does it preserve formatting?', a: 'The tool extracts plain text. Columns, tables, and complex layouts may not be preserved — the output is a linear text stream.' },
    { q: 'Can I extract just certain pages?', a: 'Yes. Enter a page range (e.g. 1-3, 5) to limit extraction to specific pages.' },
  ],
  useCases: [
    'Copy text from a PDF without copy-protection workarounds',
    'Extract content for editing in a word processor',
    'Analyse PDF content with text tools like word counter or find & replace',
    'Archive document text as a searchable .txt file',
  ],
  example: { input: '10-page research paper PDF', output: 'Plain text file with all paragraphs, page separators, and word count summary' },
  seoContent: {
    whatIsTitle: 'What is PDF Text Extractor?',
    whatIsBody: 'PDF Text Extractor reads the embedded text layer from a PDF and outputs plain text. You can extract all pages or specify a range, optionally include page-number separators, and either copy the result or download it as a .txt file. Because it uses PDF.js in the browser, no data is sent to any server.',
    howToTitle: 'How to Extract Text from a PDF',
    howToSteps: [
      'Drop your PDF onto the upload zone or click to browse.',
      'Wait for extraction to complete — a word and character count appears.',
      'Optionally enter a page range to limit the output.',
      'Click "Copy All" or "Download .txt" to save the extracted text.',
    ],
  },
  learnMore: {
    title: 'How PDF.js Extracts Text',
    body: 'PDF.js reads each page\'s content stream and calls getTextContent(), which returns an array of text items with position and string data. The tool joins these items into paragraphs by detecting significant vertical gaps between text runs, then assembles the pages into a single string with optional separators.',
  },
},
{
  slug: 'heic-to-jpg',
  title: 'HEIC to JPG Converter',
  description: 'Convert iPhone HEIC/HEIF photos to JPEG or PNG in your browser — batch supported, no upload needed',
  category: 'image',
  tags: ['HEIC to JPG', 'HEIC converter', 'iPhone photo converter', 'HEIF to JPEG', 'convert HEIC'],
  relatedTools: ['webp-converter', 'jpg-to-png', 'png-to-jpg', 'image-compressor'],
  faq: [
    { q: 'What is a HEIC file?', a: 'HEIC (High Efficiency Image Container) is Apple\'s default photo format since iOS 11. It offers better compression than JPEG but isn\'t universally supported across non-Apple platforms.' },
    { q: 'Are my photos uploaded to a server?', a: 'No. HEIC decoding and conversion happen entirely in your browser using the heic2any library. Your photos never leave your device.' },
    { q: 'Can I convert multiple HEIC files at once?', a: 'Yes. Select multiple files or drop them all at once. Each file is converted and available for individual download, or you can download all as a ZIP.' },
    { q: 'Why does conversion take a moment?', a: 'HEIC decoding is computationally intensive because it uses the HEVC codec. Large files or older devices may take a few seconds per image.' },
  ],
  useCases: [
    'Share iPhone photos on Windows or Android devices that don\'t support HEIC',
    'Upload photos to websites that only accept JPEG or PNG',
    'Batch convert a camera roll export before editing in non-Apple software',
    'Convert HEIC files for use in web projects or social media platforms',
  ],
  example: { input: 'iPhone photo IMG_0042.HEIC (3.8 MB)', output: 'IMG_0042.jpg (2.1 MB) at quality 92' },
  seoContent: {
    whatIsTitle: 'What is HEIC to JPG Converter?',
    whatIsBody: 'HEIC to JPG Converter decodes Apple\'s HEIC/HEIF image format and re-encodes it as JPEG or PNG, directly in your browser. You can convert a single photo or drop in a whole batch, choose the output quality, and download individual files or a ZIP archive.',
    howToTitle: 'How to Convert HEIC to JPG',
    howToSteps: [
      'Click the upload zone or drop your .heic or .heif files.',
      'Choose output format: JPEG (smaller) or PNG (lossless).',
      'Adjust quality if JPEG is selected (default 92 is recommended).',
      'Click "Convert All" and download each file or all as a ZIP.',
    ],
  },
  learnMore: {
    title: 'How heic2any Decodes HEIC in the Browser',
    body: 'heic2any is a JavaScript library that uses WebAssembly to run a C++ HEVC decoder in the browser. It accepts a HEIC Blob, decodes each image frame, and returns a JPEG or PNG Blob which can be downloaded directly via a Blob URL — no server or native codec required.',
  },
},
{
  slug: 'image-hue-saturation',
  title: 'Hue & Saturation Adjuster',
  description: 'Rotate hue, adjust saturation and lightness of images with live preview — no upload, instant download',
  category: 'image',
  tags: ['hue saturation', 'adjust image colors', 'color correction', 'HSL image editor', 'image color tool'],
  relatedTools: ['image-brightness-contrast', 'grayscale-image', 'duotone-image', 'image-compressor'],
  faq: [
    { q: 'Are my images uploaded?', a: 'No. All adjustments use the HTML5 Canvas API running locally in your browser. Nothing is sent to a server.' },
    { q: 'What image formats are supported?', a: 'Any format your browser can display: JPEG, PNG, WebP, GIF (first frame), and BMP.' },
    { q: 'Does adjusting hue/saturation reduce quality?', a: 'JPEG output applies standard JPEG compression (quality 92 by default). PNG output is lossless. One generation of JPEG encoding is minimal quality loss.' },
    { q: 'What do hue, saturation, and lightness mean?', a: 'Hue is the color angle (0–360°). Saturation controls color intensity (0 = grey, 100 = vivid). Lightness controls brightness (0 = black, 100 = white).' },
  ],
  useCases: [
    'Quickly recolor a product photo for different color variants',
    'Boost saturation to make washed-out photos more vibrant',
    'Shift hue to create color variants of illustrations or icons',
    'Reduce saturation to create a muted or desaturated look',
  ],
  example: { input: 'Outdoor JPEG photo with dull colors', output: 'Same photo with +30 saturation and +10 lightness — visibly more vibrant' },
  seoContent: {
    whatIsTitle: 'What is Hue & Saturation Adjuster?',
    whatIsBody: 'Hue & Saturation Adjuster lets you shift the hue rotation, boost or reduce color saturation, and lighten or darken an image using three range sliders. The preview updates in real time as you drag. When satisfied, download the result as JPEG or PNG — processing happens entirely in your browser via the Canvas API.',
    howToTitle: 'How to Adjust Hue and Saturation',
    howToSteps: [
      'Upload an image by clicking or dragging it onto the upload zone.',
      'Drag the Hue Rotation slider to shift colors (e.g. +60 turns reds to yellows).',
      'Adjust Saturation to make colors more vivid (+) or more muted (−).',
      'Use Lightness to brighten or darken the overall image.',
      'Click Download to save the adjusted image.',
    ],
  },
  learnMore: {
    title: 'How Canvas-Based HSL Adjustment Works',
    body: 'The tool reads pixel data with getImageData(), converts each RGB pixel to HSL, applies the three offsets, converts back to RGB, and writes the result with putImageData(). Because each adjustment starts from the original pixel data (not the previously adjusted version), there is no generational quality loss when moving sliders.',
  },
},
{
  slug: 'png-to-ico',
  title: 'PNG to ICO Converter',
  description: 'Create favicon .ico files from PNG/JPG/WebP — choose sizes 16×16 to 256×256, instant browser download',
  category: 'image',
  tags: ['PNG to ICO', 'favicon maker', 'create favicon', 'ICO converter', 'favicon generator'],
  relatedTools: ['favicon-generator', 'svg-to-png', 'webp-converter', 'image-resizer'],
  faq: [
    { q: 'Are my images uploaded?', a: 'No. ICO generation uses HTML5 Canvas and runs entirely in your browser. Nothing is sent to a server.' },
    { q: 'Which sizes should I include in a favicon?', a: 'For most websites, 16×16, 32×32, and 48×48 cover all browser tab and desktop shortcut use cases. Include 256×256 for Windows high-DPI icons.' },
    { q: 'Does the ICO support transparency?', a: 'Yes. If your source image has a transparent background (PNG), the ICO will preserve it because each size is stored as a PNG inside the ICO container.' },
    { q: 'Why does my browser not show .ico in the favicon?', a: 'Make sure your HTML has <link rel="icon" href="favicon.ico"> in the <head>. Clear your browser cache if the old favicon is still showing.' },
  ],
  useCases: [
    'Generate a favicon.ico for a website from a logo PNG',
    'Create a Windows desktop shortcut icon from an image',
    'Convert app icons to ICO for legacy Windows compatibility',
    'Package multiple favicon sizes into a single .ico file',
  ],
  example: { input: 'Logo PNG 512×512 with transparency', output: 'favicon.ico with 16×16, 32×32, 48×48, 64×64 layers' },
  seoContent: {
    whatIsTitle: 'What is PNG to ICO Converter?',
    whatIsBody: 'PNG to ICO Converter takes any image and produces a multi-size .ico file suitable for use as a browser favicon or Windows icon. You choose which sizes to include (16×16 through 256×256), and the tool assembles them into a single ICO container using the HTML5 Canvas API — no plugins or server required.',
    howToTitle: 'How to Create a Favicon from a PNG',
    howToSteps: [
      'Upload your image (PNG with transparent background recommended).',
      'Check the sizes you need — 16×16, 32×32, and 48×48 are standard for favicons.',
      'Click "Generate .ico".',
      'Download the file and rename it to favicon.ico in your website root.',
    ],
  },
  learnMore: {
    title: 'How ICO Files Are Assembled',
    body: 'An ICO file is a container format that holds multiple image sizes. Each size is stored as a PNG (or BMP) blob. The tool renders your source image onto canvases at each chosen size, extracts the PNG bytes, then writes a binary ICO header (ICONDIR + per-image ICONDIRENTRY records) followed by the PNG data using a DataView — all in memory, producing a valid .ico Blob.',
  },
},
{
  slug: 'image-color-extractor',
  title: 'Image Color Extractor',
  description: 'Click anywhere on an image to extract exact color values — HEX, RGB, and HSL with copy button and history',
  category: 'image',
  tags: ['color picker from image', 'extract color from image', 'eyedropper tool', 'image color picker', 'get color code'],
  relatedTools: ['image-palette-extractor', 'color-picker', 'color-palette', 'image-hue-saturation'],
  faq: [
    { q: 'Are my images uploaded?', a: 'No. Color extraction uses the HTML5 Canvas getImageData() API which runs entirely in your browser.' },
    { q: 'How accurate is the color reading?', a: 'The tool reads the exact RGB value of the pixel under your cursor. For JPEG images, some color values may differ slightly from the original due to JPEG compression.' },
    { q: 'What is the difference between this and the Palette Extractor?', a: 'Color Extractor lets you manually pick any specific pixel. Palette Extractor automatically finds the most dominant colors across the whole image.' },
    { q: 'Can I copy the color directly to CSS?', a: 'Yes. Click any copy button to copy the HEX value (e.g. #FF5733) which is valid CSS. RGB and HSL values are also copyable in CSS function format.' },
  ],
  useCases: [
    'Match an exact color from a design screenshot for CSS',
    'Identify brand colors from a logo image',
    'Sample colors from a photo for a design palette',
    'Find the exact hex code of a color in an illustration',
  ],
  example: { input: 'Product photo, click on background area', output: '#F2EDE4 — rgb(242, 237, 228) — hsl(35, 33%, 92%)' },
  seoContent: {
    whatIsTitle: 'What is Image Color Extractor?',
    whatIsBody: 'Image Color Extractor is an eyedropper tool that lets you click anywhere on an uploaded image to capture the exact color at that pixel. The result is shown in HEX, RGB, and HSL formats with one-click copy buttons. You can also build up a history of up to 12 picked colors.',
    howToTitle: 'How to Extract a Color from an Image',
    howToSteps: [
      'Upload an image by clicking or dragging it onto the upload zone.',
      'Move your cursor over the canvas — the current color updates live.',
      'Click on the area whose color you want to capture.',
      'Copy the HEX, RGB, or HSL value using the copy buttons.',
    ],
  },
  learnMore: {
    title: 'How Canvas getImageData Works',
    body: 'When an image is drawn to an HTML5 canvas, getImageData(x, y, 1, 1) returns a 4-element Uint8ClampedArray with the R, G, B, and A values of that pixel. The tool converts these to HEX by formatting each channel as a two-digit hex string, and to HSL using a standard conversion formula.',
  },
},
{
  slug: 'pdf-metadata-viewer',
  title: 'PDF Metadata Viewer',
  description: 'View title, author, creation date, page size, and all metadata inside a PDF — no upload needed',
  category: 'pdf',
  tags: ['PDF metadata', 'PDF properties', 'view PDF info', 'PDF author', 'PDF creation date'],
  relatedTools: ['pdf-page-counter', 'pdf-extract-text', 'pdf-compress', 'exif-viewer'],
  faq: [
    { q: 'Is my PDF uploaded to a server?', a: 'No. Metadata is read using PDF.js entirely in your browser. Your file never leaves your device.' },
    { q: 'What metadata can I see?', a: 'Title, author, subject, keywords, creator application, producer, creation date, modification date, PDF version, page count, file size, and page dimensions.' },
    { q: 'What if some fields are empty?', a: 'Many PDFs omit optional metadata fields. Empty fields display as "—". Only the PDF version and page count are always present.' },
    { q: 'Can I edit the metadata?', a: 'This tool is view-only. To edit PDF metadata, you would need a dedicated PDF editor.' },
  ],
  useCases: [
    'Check if a received PDF contains author or company metadata',
    'Verify the creation and modification dates of a document',
    'Confirm the page size before printing',
    'Audit PDF files for sensitive metadata before sharing',
  ],
  example: { input: 'Word-exported PDF', output: 'Author: John Smith, Creator: Microsoft Word, Created: 2025-06-12, Pages: 8, Size: A4' },
  seoContent: {
    whatIsTitle: 'What is PDF Metadata Viewer?',
    whatIsBody: 'PDF Metadata Viewer reads the information dictionary embedded inside a PDF file and displays all available fields: document title, author, subject, keywords, the application that created it, the PDF producer, creation and modification timestamps, page count, file size, and the dimensions and orientation of the first page.',
    howToTitle: 'How to View PDF Metadata',
    howToSteps: [
      'Drop your PDF onto the upload zone or click to browse.',
      'Metadata loads instantly — no processing required.',
      'Review Document Info and File Info sections.',
      'Click "Copy All as Text" to export the metadata as plain text.',
    ],
  },
  learnMore: {
    title: 'How PDF.js Reads Metadata',
    body: 'PDF.js exposes getMetadata() which returns the PDF\'s information dictionary (standard fields like Title, Author, CreationDate) and optionally an XMP metadata stream. Date strings in the format D:YYYYMMDDHHmmSSOHH\'mm\' are parsed into human-readable timestamps. Page dimensions come from the viewport object returned by getPage(1).getViewport({ scale: 1 }).',
  },
},
{
  slug: 'pdf-add-watermark',
  title: 'PDF Watermark',
  description: 'Add custom text watermarks to PDF pages — diagonal or corner position, adjustable opacity and size, no upload',
  category: 'pdf',
  tags: ['PDF watermark', 'add watermark to PDF', 'watermark PDF online', 'PDF text overlay', 'stamp PDF'],
  relatedTools: ['pdf-merge', 'pdf-compress', 'pdf-rotate-pages', 'image-watermark'],
  faq: [
    { q: 'Is my PDF uploaded?', a: 'No. Watermarking uses PDF.js and jsPDF running entirely in your browser. Nothing is sent to a server.' },
    { q: 'Does the watermark become part of the PDF text layer?', a: 'No. Pages are rendered to canvas and the watermark is drawn as a canvas overlay. The output PDF is rasterized, so the watermark cannot be removed by editing the text layer.' },
    { q: 'What opacity range is available?', a: 'You can set opacity from 10% (very faint) to 80% (bold). The default 30% is subtle enough to remain readable under the watermark.' },
    { q: 'Can I watermark only specific pages?', a: 'The current version applies the watermark to all pages. Per-page selection may be added in a future update.' },
  ],
  useCases: [
    'Mark confidential documents before sharing externally',
    'Add "DRAFT" or "SAMPLE" watermarks to proof documents',
    'Brand PDF reports with a company name overlay',
    'Protect PDF content from unauthorized redistribution',
  ],
  example: { input: '5-page report PDF + text "CONFIDENTIAL", diagonal, 30% opacity', output: 'Same PDF with grey diagonal watermark on every page' },
  seoContent: {
    whatIsTitle: 'What is PDF Watermark?',
    whatIsBody: 'PDF Watermark adds a custom text overlay to every page of your PDF. You can type any watermark text, choose diagonal center or corner placement, set the font size, opacity, and color, then preview the result on the first page before downloading the watermarked PDF.',
    howToTitle: 'How to Add a Watermark to a PDF',
    howToSteps: [
      'Drop your PDF onto the upload zone.',
      'Enter your watermark text (e.g. CONFIDENTIAL, DRAFT).',
      'Choose position, font size, opacity, and color.',
      'Preview the first page, then click "Apply to All Pages & Download".',
    ],
  },
  learnMore: {
    title: 'How Canvas-Based PDF Watermarking Works',
    body: 'Each PDF page is rendered to an HTML canvas via PDF.js at 1.5× scale. The watermark text is then drawn on top using canvas 2D context with ctx.globalAlpha for transparency and ctx.rotate for diagonal placement. jsPDF collects the watermarked canvases as JPEG images and assembles them into a new PDF document for download.',
  },
},
{
  slug: 'jpg-to-pdf',
  title: 'JPG to PDF Converter',
  description: 'Convert JPG and JPEG photos to a PDF file instantly — one or multiple images, choose page size and margins',
  category: 'convert',
  tags: ['JPG to PDF', 'JPEG to PDF', 'photo to PDF', 'convert image to PDF', 'JPG PDF converter'],
  relatedTools: ['image-to-pdf', 'pdf-compress', 'pdf-merge', 'image-compressor'],
  faq: [
    { q: 'Are my images uploaded to a server?', a: 'No. PDF generation uses jsPDF which runs entirely in your browser. Your files never leave your device.' },
    { q: 'Can I convert multiple JPG files at once?', a: 'Yes. Select multiple files or drop them all at once. Each image becomes one page in the PDF.' },
    { q: 'What page sizes are available?', a: 'A4, US Letter, and "Fit to Image" (page matches image dimensions). Orientation is automatically detected from the image aspect ratio.' },
    { q: 'What is the difference between this and Image to PDF?', a: 'JPG to PDF is optimised specifically for JPEG photos with a simpler interface. Image to PDF supports more formats and layout options.' },
  ],
  useCases: [
    'Send multiple phone photos as a single PDF document',
    'Convert scanned JPG pages into a PDF file for archiving',
    'Package product photos into a PDF catalogue',
    'Submit JPG documents as a single PDF file',
  ],
  example: { input: '3 JPEG photos, A4, 10mm margin', output: '3-page PDF with one photo per page' },
  seoContent: {
    whatIsTitle: 'What is JPG to PDF Converter?',
    whatIsBody: 'JPG to PDF Converter takes one or more JPEG image files and packages them into a PDF document. You can choose the page size (A4, Letter, or fit to image), orientation, and margin, then download the result instantly. Everything runs in your browser using jsPDF — no server upload required.',
    howToTitle: 'How to Convert JPG to PDF',
    howToSteps: [
      'Click the upload zone or drop your JPG files.',
      'Reorder files by dragging if needed.',
      'Choose page size, orientation, and margin.',
      'Click "Convert to PDF" and download the result.',
    ],
  },
  learnMore: {
    title: 'How jsPDF Converts Images to PDF',
    body: 'jsPDF creates a PDF document in memory. For each image, it calculates the available page area (subtracting margins), scales the image to fit while preserving aspect ratio, centres it on the page, and calls addImage() with the JPEG data URL. The finished document is downloaded as a Blob URL.',
  },
},
{
  slug: 'pdf-to-markdown',
  title: 'PDF to Markdown Converter',
  description: 'Convert PDF text to Markdown format with automatic heading and list detection — download as .md file',
  category: 'pdf',
  tags: ['PDF to Markdown', 'PDF to MD', 'extract PDF as Markdown', 'PDF converter', 'PDF text extraction'],
  relatedTools: ['pdf-extract-text', 'markdown-to-html', 'markdown-preview', 'pdf-page-counter'],
  faq: [
    { q: 'Are my PDFs uploaded?', a: 'No. Text extraction and Markdown conversion run entirely in your browser using PDF.js. Nothing is sent to a server.' },
    { q: 'How accurate is heading detection?', a: 'Headings are detected by comparing font sizes. Text significantly larger than the page average is marked as H1 or H2. Results vary by PDF — some documents produce clean Markdown, others require manual cleanup.' },
    { q: 'Does it work on scanned PDFs?', a: 'No. Scanned PDFs are images without a text layer. Only PDFs with embedded text (most digital documents) are supported.' },
    { q: 'When would I use PDF to Markdown?', a: 'When you need to reuse PDF content in a documentation site, README, or static site generator that accepts Markdown files.' },
  ],
  useCases: [
    'Convert a PDF article into Markdown for a documentation site',
    'Extract PDF content for editing in a Markdown-based CMS',
    'Archive a PDF document as a plain-text Markdown file',
    'Prepare PDF content for import into Notion or Obsidian',
  ],
  example: { input: '8-page technical PDF with clear headings', output: 'Markdown file with # H1 sections, ## H2 subsections, and paragraph text' },
  seoContent: {
    whatIsTitle: 'What is PDF to Markdown Converter?',
    whatIsBody: 'PDF to Markdown Converter extracts text from a PDF and applies heuristic rules to produce Markdown: large text becomes headings, bullet-prefixed lines become list items, and regular body text becomes paragraphs. You can preview the rendered Markdown in the browser or download the raw .md file.',
    howToTitle: 'How to Convert a PDF to Markdown',
    howToSteps: [
      'Drop your PDF onto the upload zone.',
      'Wait for extraction — a word count appears when done.',
      'Switch between "Markdown Source" and "Preview" tabs to review.',
      'Click "Copy Markdown" or "Download .md" to save the result.',
    ],
  },
  learnMore: {
    title: 'How Heuristic PDF-to-Markdown Conversion Works',
    body: 'PDF.js getTextContent() returns an array of text items with position (transform matrix) and approximate size data. The tool groups items by Y coordinate into lines, computes the median font size for each page, and classifies each line: items 1.5× the median become H1, 1.25× become H2. Lines starting with bullet characters are converted to Markdown list syntax. The result is a best-effort Markdown file that works well for structured text-heavy PDFs.',
  },
},
{
  slug: 'image-sharpen',
  title: 'Image Sharpener',
  description: 'Sharpen blurry or soft images with an adjustable unsharp mask — live preview, instant download, no upload',
  category: 'image',
  tags: ['sharpen image', 'unsharp mask', 'image sharpener', 'fix blurry image', 'enhance image clarity'],
  relatedTools: ['image-brightness-contrast', 'blur-image', 'image-hue-saturation', 'image-compressor'],
  faq: [
    { q: 'Are my images uploaded?', a: 'No. Sharpening uses the HTML5 Canvas API and runs entirely in your browser. Nothing is sent to a server.' },
    { q: 'What image formats are supported?', a: 'Any format your browser can display: JPEG, PNG, WebP, GIF (first frame), and BMP.' },
    { q: 'Does sharpening reduce quality?', a: 'JPEG output applies standard compression (quality 92). PNG output is lossless. One round of sharpening with moderate settings has minimal visible quality impact.' },
    { q: 'What is an unsharp mask?', a: 'Unsharp masking enhances edges by increasing contrast between adjacent pixels. Despite the name, it makes images look sharper — it is the standard sharpening algorithm used by professional image editors.' },
  ],
  useCases: [
    'Improve clarity of slightly out-of-focus photos',
    'Sharpen product images before uploading to an online store',
    'Enhance scanned documents that appear soft',
    'Make text in screenshots appear crisper',
  ],
  example: { input: 'Slightly blurry portrait photo', output: 'Same photo with enhanced edge definition at sharpness 60' },
  seoContent: {
    whatIsTitle: 'What is Image Sharpener?',
    whatIsBody: 'Image Sharpener applies an unsharp mask convolution to your image, enhancing edges and fine details to produce a visually crisper result. A single slider controls intensity from subtle (low values) to aggressive (high values). The preview updates in real time so you can find the right balance before downloading.',
    howToTitle: 'How to Sharpen an Image',
    howToSteps: [
      'Upload an image by clicking or dragging it onto the upload zone.',
      'Drag the Sharpness slider — the canvas updates live.',
      'Stop when the image looks crisp without visible halos around edges.',
      'Click Download to save the sharpened result.',
    ],
  },
  learnMore: {
    title: 'How Unsharp Masking Works in the Browser',
    body: 'The tool reads pixel data with getImageData() and applies a 3×3 convolution kernel: the centre pixel is amplified by (1 + 4w) and the four neighbours are subtracted by weight w, where w scales with the slider position. This accentuates luminance differences at edges. Because each slider adjustment operates on the cached original ImageData, there is no cumulative quality loss from repeated adjustments.',
  },
},
{
  slug: 'avif-to-jpg',
  title: 'AVIF to JPG Converter',
  description: 'Convert AVIF images to JPEG or PNG using your browser\'s native decoder — batch conversion, no upload needed',
  category: 'image',
  tags: ['AVIF to JPG', 'AVIF converter', 'convert AVIF', 'AVIF to JPEG', 'AV1 image converter'],
  relatedTools: ['heic-to-jpg', 'webp-converter', 'jpg-to-png', 'image-compressor'],
  faq: [
    { q: 'What is AVIF?', a: 'AVIF (AV1 Image File Format) is a modern image format based on the AV1 video codec. It offers roughly 50% smaller file sizes than JPEG at the same visual quality and is increasingly used by web platforms.' },
    { q: 'Are my files uploaded?', a: 'No. AVIF decoding uses your browser\'s built-in codec support. Files never leave your device.' },
    { q: 'Which browsers support AVIF decoding?', a: 'Chrome 85+, Firefox 93+, and Safari 16+ all support AVIF natively. If your browser shows an error, try updating it.' },
    { q: 'Can I convert multiple AVIF files at once?', a: 'Yes. Select multiple files or drop them all at once. Each file is converted independently and available for download, or you can get all files as a ZIP.' },
  ],
  useCases: [
    'Convert AVIF web images to JPEG for editing in older software',
    'Download and convert AVIF photos from modern websites',
    'Batch convert AVIF files to PNG for lossless archiving',
    'Make AVIF images compatible with apps that don\'t support the format',
  ],
  example: { input: '5 AVIF images downloaded from a website', output: '5 JPEG files at quality 92, downloaded as images.zip' },
  seoContent: {
    whatIsTitle: 'What is AVIF to JPG Converter?',
    whatIsBody: 'AVIF to JPG Converter decodes AVIF/AV1 image files using your browser\'s native codec and re-encodes them as JPEG or PNG. Batch conversion is supported — drop multiple files at once and download them individually or as a ZIP archive. No server upload, no plugin required.',
    howToTitle: 'How to Convert AVIF to JPG',
    howToSteps: [
      'Click the upload zone or drop your .avif files.',
      'Choose output format: JPEG (smaller) or PNG (lossless).',
      'Adjust quality if JPEG is selected (default 92).',
      'Click "Convert All" and download files individually or as a ZIP.',
    ],
  },
  learnMore: {
    title: 'How Browsers Decode AVIF Natively',
    body: 'Modern browsers ship with a built-in AV1 decoder. The tool passes the AVIF Blob to createImageBitmap(), which decodes it using the browser\'s native codec into a bitmap. The bitmap is drawn onto an HTML canvas, and canvas.toBlob() re-encodes it to the chosen output format. The entire process runs in the browser\'s rendering engine — no WebAssembly or external library needed.',
  },
},

{
  slug: 'webp-to-png',
  title: 'WebP to PNG Converter Online',
  description: 'Convert WebP images to PNG format instantly in your browser. Batch convert multiple files at once — no upload, no sign-up, download as ZIP.',
  category: 'convert',
  relatedTools: ['webp-converter', 'image-resizer', 'jpg-to-png'],
  useCases: [
    'Convert WebP screenshots to PNG for use in documents',
    'Batch convert design assets exported as WebP to PNG',
    'Prepare WebP files for tools that only accept PNG',
    'Preserve transparency when converting from WebP'
  ],
  faq: [
    { q: 'Does it preserve transparency?', a: 'Yes. PNG supports full alpha transparency, so transparent areas in the original WebP are preserved.' },
    { q: 'Can I convert multiple files?', a: 'Yes. Drop multiple WebP files at once and download them all as a ZIP archive.' },
    { q: 'Is my data sent to a server?', a: 'No. Conversion runs entirely in your browser using the Canvas API.' }
  ],
  shortTitle: 'WebP to PNG',
  seoContent: {
    howToTitle: 'How to Convert WebP to PNG',
    howToSteps: [
      'Drop one or more WebP files onto the upload area.',
      'Preview the converted images — conversion is automatic.',
      'Click Download All to save as a ZIP, or download each file individually.'
    ]
  }
},

{
  slug: 'image-sepia',
  title: 'Sepia Photo Effect Online',
  description: 'Apply a vintage sepia tone to any photo instantly. Adjust intensity with a slider, preview in real time, and download the result as PNG.',
  category: 'image',
  relatedTools: ['image-vignette', 'image-tint', 'grayscale-image'],
  useCases: [
    'Give photos a vintage or antique look',
    'Create warm-toned images for social media',
    'Add a nostalgic feel to portraits or landscapes',
    'Match old-photo aesthetics in design projects'
  ],
  faq: [
    { q: 'How does the sepia effect work?', a: 'It converts each pixel to a warm brownish tone using a standard sepia color matrix applied per pixel on an HTML canvas.' },
    { q: 'Can I adjust the intensity?', a: 'Yes. The intensity slider controls how strongly the sepia tone is applied — 0% is the original image, 100% is full sepia.' },
    { q: 'Is my image uploaded?', a: 'No. Processing happens entirely in your browser. Your image never leaves your device.' }
  ],
  shortTitle: 'Sepia Photo Effect',
  seoContent: {
    howToTitle: 'How to Apply a Sepia Effect',
    howToSteps: [
      'Upload or drop any image file.',
      'Adjust the intensity slider to control the sepia strength.',
      'Download the result as PNG.'
    ]
  }
},

{
  slug: 'image-vignette',
  title: 'Image Vignette Effect Online',
  description: 'Add a vignette darkening effect to any photo. Control strength and size with sliders, preview instantly, and download as PNG.',
  category: 'image',
  relatedTools: ['image-sepia', 'image-tint', 'blur-image'],
  useCases: [
    'Draw focus to the center of portrait photos',
    'Add cinematic framing to landscape shots',
    'Create moody darkroom-style edits',
    'Enhance product photography with subtle edge darkening'
  ],
  faq: [
    { q: 'What is a vignette?', a: 'A vignette is a darkening or fading effect applied toward the edges of an image, drawing the viewer\'s eye toward the center.' },
    { q: 'Can I control the size and strength?', a: 'Yes. The strength slider controls how dark the edges get, and the size slider controls how far the effect extends from the edges.' },
    { q: 'Is my image uploaded?', a: 'No. The effect is applied using a canvas radial gradient in your browser.' }
  ],
  shortTitle: 'Image Vignette',
  seoContent: {
    howToTitle: 'How to Add a Vignette Effect',
    howToSteps: [
      'Upload any image file.',
      'Adjust the strength and size sliders to control the vignette.',
      'Download the result as PNG.'
    ]
  }
},

{
  slug: 'image-tint',
  title: 'Image Tint Effect Online',
  description: 'Apply a color tint overlay to any photo. Choose any color, adjust opacity, pick from presets, and download as PNG — all in your browser.',
  category: 'image',
  relatedTools: ['image-sepia', 'image-vignette', 'color-picker'],
  useCases: [
    'Add brand color overlays to product images',
    'Create duotone-style photo effects',
    'Apply warm or cool color grading to photos',
    'Generate social media images with consistent color tones'
  ],
  faq: [
    { q: 'Can I use any color for the tint?', a: 'Yes. Use the color picker or enter any HEX color code. Preset swatches are also available for quick selection.' },
    { q: 'How do I control intensity?', a: 'The opacity slider controls how strongly the tint color is applied over the original image.' },
    { q: 'Is my image uploaded?', a: 'No. The overlay is composited using the Canvas API entirely in your browser.' }
  ],
  shortTitle: 'Image Tint',
  seoContent: {
    howToTitle: 'How to Tint an Image',
    howToSteps: [
      'Upload any image file.',
      'Choose a tint color from the presets or enter a custom HEX code.',
      'Adjust opacity to control the effect strength.',
      'Download the result as PNG.'
    ]
  }
},

{
  slug: 'image-noise',
  title: 'Image Noise / Film Grain Effect Online',
  description: 'Add film grain or noise texture to photos. Toggle between monochrome and color noise, adjust intensity, and download as PNG.',
  category: 'image',
  relatedTools: ['image-vignette', 'image-sepia', 'image-tint'],
  useCases: [
    'Give digital photos a film photography aesthetic',
    'Add texture to flat design images',
    'Create vintage or lo-fi photo effects',
    'Simulate grainy low-light photography'
  ],
  faq: [
    { q: 'What is the difference between mono and color noise?', a: 'Monochrome noise adds uniform gray grain. Color noise adds random color variations to each pixel, similar to high-ISO digital camera noise.' },
    { q: 'Can I control how much grain is added?', a: 'Yes. The intensity slider controls the strength of the noise effect from subtle grain to heavy texture.' },
    { q: 'Is my image uploaded?', a: 'No. Noise is generated and applied entirely in your browser using the Canvas API.' }
  ],
  shortTitle: 'Image Noise Effect',
  seoContent: {
    howToTitle: 'How to Add Film Grain to an Image',
    howToSteps: [
      'Upload any image file.',
      'Choose monochrome or color noise mode.',
      'Adjust the intensity slider.',
      'Download the result as PNG.'
    ]
  }
},

{
  slug: 'reading-time-estimator',
  title: 'Reading Time Estimator Online',
  description: 'Estimate how long it takes to read any text. Adjust reading speed (WPM), see word and character counts, and get a breakdown instantly.',
  category: 'text',
  relatedTools: ['word-counter', 'text-statistics', 'char-counter'],
  useCases: [
    'Estimate blog post or article reading time before publishing',
    'Check if a document fits within a presentation time slot',
    'Adjust content length to target a specific reading duration',
    'Gauge reading time for newsletters or emails'
  ],
  faq: [
    { q: 'What reading speed does this use?', a: 'The default is 200 WPM (words per minute), which is average for adults. Use the slider to adjust between 100–400 WPM.' },
    { q: 'How is reading time calculated?', a: 'Reading time = word count ÷ reading speed (WPM). The result is shown in minutes and seconds.' },
    { q: 'Is my text sent to a server?', a: 'No. All calculations run in your browser.' }
  ],
  shortTitle: 'Reading Time Estimator',
  seoContent: {
    howToTitle: 'How to Estimate Reading Time',
    howToSteps: [
      'Paste or type your text into the input area.',
      'Adjust the WPM slider to match your audience\'s reading speed.',
      'Read the estimated time and word count from the stats cards.'
    ]
  }
},

{
  slug: 'text-repeater',
  title: 'Text Repeater Online',
  description: 'Repeat any text a specified number of times with a custom separator. Copy or download the result instantly.',
  category: 'text',
  relatedTools: ['lorem-ipsum-generator', 'text-statistics', 'word-counter'],
  useCases: [
    'Generate repeated test data for development',
    'Create placeholder content with repeated patterns',
    'Repeat list items or strings for scripts',
    'Fill templates with repeated sample text'
  ],
  faq: [
    { q: 'Can I use a custom separator between repetitions?', a: 'Yes. Enter any text as the separator — comma, newline (\\n), space, or any custom string.' },
    { q: 'Is there a repeat limit?', a: 'The tool supports up to 10,000 repetitions to prevent browser slowdowns.' },
    { q: 'Can I download the result?', a: 'Yes. Click Download to save the repeated text as a .txt file.' }
  ],
  shortTitle: 'Text Repeater',
  seoContent: {
    howToTitle: 'How to Repeat Text',
    howToSteps: [
      'Enter the text you want to repeat.',
      'Set the number of repetitions.',
      'Choose a separator (optional) and copy or download the result.'
    ]
  }
},

{
  slug: 'text-statistics',
  title: 'Text Statistics Analyzer Online',
  description: 'Get detailed statistics for any text: word count, character count, sentence count, paragraphs, reading time, unique words, average lengths, and more.',
  category: 'text',
  relatedTools: ['word-counter', 'reading-time-estimator', 'keyword-density-checker'],
  useCases: [
    'Analyze writing complexity before publishing',
    'Check document statistics for academic submissions',
    'Measure content depth with unique word ratio',
    'Compare text versions with before/after stats'
  ],
  faq: [
    { q: 'What statistics does this tool show?', a: 'Words, characters (with and without spaces), sentences, paragraphs, reading time, unique words, lines, average word length, and average sentence length.' },
    { q: 'How is reading time calculated?', a: 'Based on 200 WPM average reading speed. The stat updates live as you type.' },
    { q: 'Is my text sent anywhere?', a: 'No. All processing runs in your browser.' }
  ],
  shortTitle: 'Text Statistics',
  seoContent: {
    howToTitle: 'How to Analyze Text Statistics',
    howToSteps: [
      'Paste or type your text into the input area.',
      'All statistics update instantly as you type.',
      'Review the 10 stats cards for a full breakdown of your text.'
    ]
  }
},

{
  slug: 'remove-line-breaks',
  title: 'Remove Line Breaks Online',
  description: 'Remove or replace line breaks in any text. Join lines into a single paragraph, keep paragraph breaks, or add a custom separator.',
  category: 'text',
  relatedTools: ['text-cleaner', 'whitespace-trimmer', 'duplicate-line-remover'],
  useCases: [
    'Convert copied PDF text with broken line breaks into flowing paragraphs',
    'Prepare text for data entry fields that don\'t accept newlines',
    'Clean up copied code or log output into a single line',
    'Join multi-line list items with a comma separator'
  ],
  faq: [
    { q: 'Can I keep paragraph breaks while removing single line breaks?', a: 'Yes. Toggle the "Keep paragraph breaks" option to preserve double line breaks (paragraph separators) while joining single line breaks.' },
    { q: 'Can I replace line breaks with a custom character?', a: 'Yes. Enter any replacement string — space, comma, pipe, or any custom text.' },
    { q: 'Is my text uploaded?', a: 'No. Everything runs in your browser.' }
  ],
  shortTitle: 'Remove Line Breaks',
  seoContent: {
    howToTitle: 'How to Remove Line Breaks',
    howToSteps: [
      'Paste your text into the input area.',
      'Choose whether to keep paragraph breaks and set a replacement character.',
      'Click Process and copy the result.'
    ]
  }
},

{
  slug: 'remove-duplicate-words',
  title: 'Remove Duplicate Words Online',
  description: 'Remove repeated words from any text, keeping only the first occurrence. Case-insensitive option, preserves word order. Instant result.',
  category: 'text',
  relatedTools: ['duplicate-line-remover', 'list-deduplicator', 'text-cleaner'],
  useCases: [
    'Clean up keyword lists with repeated terms',
    'Remove accidental word repetitions from drafts',
    'Deduplicate tag clouds or word lists',
    'Normalize text before processing'
  ],
  faq: [
    { q: 'Does it preserve word order?', a: 'Yes. The first occurrence of each word is kept and the original word order is preserved.' },
    { q: 'Is comparison case-sensitive?', a: 'By default comparison is case-insensitive, so "The" and "the" count as duplicates. Toggle to case-sensitive mode if needed.' },
    { q: 'Is my text sent to a server?', a: 'No. All processing runs in your browser.' }
  ],
  shortTitle: 'Remove Duplicate Words',
  seoContent: {
    howToTitle: 'How to Remove Duplicate Words',
    howToSteps: [
      'Paste your text into the input area.',
      'Choose case-sensitivity and punctuation options.',
      'Click Remove Duplicates and copy the result.'
    ]
  }
},

{
  slug: 'color-scheme-generator',
  title: 'Color Scheme Generator Online',
  description: 'Generate harmonious color schemes from any base color. Choose from complementary, analogous, triadic, and more. Export as CSS variables or JSON.',
  category: 'generate',
  relatedTools: ['color-picker', 'random-color-generator', 'color-palette'],
  useCases: [
    'Generate a brand color palette from a primary color',
    'Create accessible color schemes for UI design',
    'Export CSS variables for a design system',
    'Explore color harmonies for illustration projects'
  ],
  faq: [
    { q: 'What harmony types are available?', a: 'Complementary, analogous, triadic, split-complementary, tetradic (square), and monochromatic.' },
    { q: 'Can I export the colors?', a: 'Yes. Export as CSS custom properties (--color-1, etc.) or as a JSON array of HEX values.' },
    { q: 'Is data sent to a server?', a: 'No. All color calculations run in your browser.' }
  ],
  shortTitle: 'Color Scheme Generator',
  seoContent: {
    howToTitle: 'How to Generate a Color Scheme',
    howToSteps: [
      'Pick a base color using the color picker or enter a HEX code.',
      'Choose a harmony type (complementary, analogous, triadic, etc.).',
      'Copy individual colors or export the full scheme as CSS variables or JSON.'
    ]
  }
},

{
  slug: 'css-box-shadow-generator',
  title: 'CSS Box Shadow Generator Online',
  description: 'Build CSS box shadows visually. Add multiple layers, adjust offsets, blur, spread, color, and inset. Copy the final CSS with one click.',
  category: 'generate',
  relatedTools: ['css-gradient-generator', 'color-picker', 'css-minifier'],
  useCases: [
    'Design card shadows for UI components',
    'Create layered shadow effects for depth',
    'Generate inset shadows for pressed button states',
    'Copy ready-to-use box-shadow CSS for any project'
  ],
  faq: [
    { q: 'Can I add multiple shadow layers?', a: 'Yes. Click "Add Layer" to stack multiple box-shadow values — each with independent offset, blur, spread, and color settings.' },
    { q: 'What is an inset shadow?', a: 'An inset shadow is drawn inside the element border rather than outside, creating a sunken or pressed appearance.' },
    { q: 'Does the output work in all browsers?', a: 'Yes. The generated box-shadow CSS is standard and works in all modern browsers.' }
  ],
  shortTitle: 'CSS Box Shadow Generator',
  seoContent: {
    howToTitle: 'How to Generate a CSS Box Shadow',
    howToSteps: [
      'Adjust the offset, blur, spread, and color sliders to shape the shadow.',
      'Add multiple layers for complex effects.',
      'Click Copy CSS to use the result in your project.'
    ]
  }
},

{
  slug: 'tax-calculator',
  title: 'Tax Calculator Online',
  description: 'Calculate sales tax, reverse-compute pre-tax price, or estimate US federal income tax by bracket. Instant results, no sign-up.',
  category: 'calculator',
  relatedTools: ['tip-calculator', 'discount-calculator', 'percentage-calculator'],
  useCases: [
    'Calculate total price with sales tax added',
    'Find the pre-tax price from a tax-inclusive total',
    'Estimate US federal income tax liability by bracket',
    'Quick tax math for invoices and receipts'
  ],
  faq: [
    { q: 'How is sales tax calculated?', a: 'Tax amount = price × (rate ÷ 100). Total = price + tax.' },
    { q: 'How does reverse tax work?', a: 'Pre-tax price = total ÷ (1 + rate ÷ 100). Useful when you have the final price but need to back out the tax.' },
    { q: 'Are the US income tax brackets up to date?', a: 'The 2024 federal tax brackets (single and married filing jointly) are built in. This is an estimate — consult a tax professional for filing.' }
  ],
  shortTitle: 'Tax Calculator',
  seoContent: {
    howToTitle: 'How to Calculate Tax',
    howToSteps: [
      'Choose Sales Tax or Income Tax mode.',
      'Enter the price (or income) and the tax rate.',
      'Read the tax amount and total from the result card.'
    ]
  }
},

{
  slug: 'body-fat-calculator',
  title: 'Body Fat Calculator Online',
  description: 'Estimate body fat percentage using the US Navy circumference method. Supports male and female, metric and imperial — instant result with category.',
  category: 'calculator',
  relatedTools: ['bmi-calculator', 'calorie-calculator', 'calorie-burn-calculator'],
  useCases: [
    'Track body composition changes over time',
    'Estimate body fat without expensive equipment',
    'Get a fitness category baseline for health tracking',
    'Compare metric and imperial body measurements'
  ],
  faq: [
    { q: 'What method is used?', a: 'The US Navy circumference method uses neck, waist, and hip measurements to estimate body fat — no calipers needed.' },
    { q: 'How accurate is it?', a: 'It is an estimate with a ±3–4% margin of error. DEXA scans and hydrostatic weighing are more accurate but require equipment.' },
    { q: 'Is my data sent anywhere?', a: 'No. All calculations run in your browser.' }
  ],
  shortTitle: 'Body Fat Calculator',
  seoContent: {
    howToTitle: 'How to Calculate Body Fat Percentage',
    howToSteps: [
      'Select your gender and measurement system.',
      'Enter your height, weight, neck, waist, and hip measurements.',
      'Read your estimated body fat percentage and fitness category.'
    ]
  }
},

{
  slug: 'scientific-calculator',
  title: 'Scientific Calculator Online',
  description: 'Full-featured scientific calculator with trig, logarithms, powers, roots, memory, and keyboard support. Calculation history included.',
  category: 'calculator',
  relatedTools: ['percentage-calculator', 'compound-interest-calculator', 'retirement-calculator'],
  useCases: [
    'Solve trigonometric equations in DEG or RAD mode',
    'Calculate logarithms and natural logs',
    'Perform power, root, and factorial operations',
    'Use memory functions for multi-step calculations'
  ],
  faq: [
    { q: 'Can I use the keyboard?', a: 'Yes. Number keys, operators, Enter (=), Backspace, and Escape (AC) are all supported.' },
    { q: 'What trig functions are available?', a: 'sin, cos, tan, and their inverses (sin⁻¹, cos⁻¹, tan⁻¹). Toggle between Degrees and Radians mode.' },
    { q: 'Does it have a calculation history?', a: 'Yes. The last 20 calculations are shown in the history panel.' }
  ],
  shortTitle: 'Scientific Calculator',
  seoContent: {
    howToTitle: 'How to Use the Scientific Calculator',
    howToSteps: [
      'Use the on-screen buttons or your keyboard to enter a calculation.',
      'Toggle DEG/RAD mode before using trigonometric functions.',
      'Use MC/MR/M+/M- buttons to store and recall memory values.'
    ]
  }
},

{
  slug: 'retirement-calculator',
  title: 'Retirement Calculator Online',
  description: 'Estimate your retirement savings based on current balance, monthly contributions, years until retirement, and expected annual return rate.',
  category: 'calculator',
  relatedTools: ['compound-interest-calculator', 'savings-calculator', 'loan-calculator'],
  useCases: [
    'Plan how much to save each month for a retirement goal',
    'Compare outcomes at different return rates',
    'Estimate monthly income under the 4% withdrawal rule',
    'Visualize how investment growth outpaces contributions over time'
  ],
  faq: [
    { q: 'How is the estimate calculated?', a: 'Current savings compound annually at the return rate. Monthly contributions compound monthly. Both are summed for the retirement total.' },
    { q: 'What is the 4% rule?', a: 'A widely cited guideline that suggests withdrawing 4% of savings annually is sustainable. Monthly estimate = total ÷ 300.' },
    { q: 'Is my data sent anywhere?', a: 'No. All calculations run in your browser.' }
  ],
  shortTitle: 'Retirement Calculator',
  seoContent: {
    howToTitle: 'How to Estimate Retirement Savings',
    howToSteps: [
      'Enter your current savings balance.',
      'Set monthly contributions and years until retirement.',
      'Enter an expected annual return rate (7% is a common long-term estimate).',
      'Review the estimated total, breakdown chart, and monthly income estimate.'
    ]
  }
},

{
  slug: 'placeholder-image-generator',
  title: 'Placeholder Image Generator Online',
  description: 'Generate custom placeholder images for wireframes and mockups. Set width, height, background, text color, and label. Download as PNG instantly.',
  category: 'generate',
  relatedTools: ['image-resizer', 'favicon-generator', 'color-scheme-generator'],
  useCases: [
    'Create placeholder images for wireframes and prototypes',
    'Generate correctly-sized social media image templates',
    'Test responsive image layouts at specific aspect ratios',
    'Replace missing assets in development environments'
  ],
  faq: [
    { q: 'What is the maximum size?', a: 'Up to 4096×4096 px. Very large images may render slowly in some browsers.' },
    { q: 'Can I set a custom label?', a: 'Yes. Leave the label blank to auto-display the dimensions, or enter any custom text.' },
    { q: 'What download formats are available?', a: 'PNG is the download format. You can also copy the image directly to clipboard.' }
  ],
  shortTitle: 'Placeholder Image Generator',
  seoContent: {
    howToTitle: 'How to Generate a Placeholder Image',
    howToSteps: [
      'Enter the width and height in pixels, or choose a preset size.',
      'Customize the background color, text color, and label.',
      'Click Download PNG or Copy to Clipboard.'
    ]
  }
},

{
  slug: 'random-color-generator',
  title: 'Random Color Generator Online',
  description: 'Generate 1–10 random colors with HEX, RGB, and HSL values. Lock your favorites and regenerate the rest. Press Space for a new batch.',
  category: 'generate',
  relatedTools: ['color-scheme-generator', 'color-picker', 'color-palette'],
  useCases: [
    'Get random color inspiration for design projects',
    'Explore unexpected color combinations',
    'Generate random colors for data visualization',
    'Quickly find a palette starting point by locking good colors'
  ],
  faq: [
    { q: 'How do I lock a color?', a: 'Click the lock icon on any color card. Locked colors stay fixed when you generate new ones.' },
    { q: 'Can I press a key to generate?', a: 'Yes. Press Spacebar to regenerate all unlocked colors instantly.' },
    { q: 'How do I copy a color value?', a: 'Click the HEX, RGB, or HSL value on any card to copy it to clipboard.' }
  ],
  shortTitle: 'Random Color Generator',
  seoContent: {
    howToTitle: 'How to Generate Random Colors',
    howToSteps: [
      'Set the number of colors (1–10) using the slider.',
      'Click Generate or press Space for a new batch.',
      'Lock colors you want to keep, then regenerate the rest.',
      'Click any color value to copy it to clipboard.'
    ]
  }
},

{
  slug: 'time-duration-calculator',
  title: 'Time Duration Calculator Online',
  description: 'Add or subtract multiple time durations. Enter hours, minutes, and seconds — toggle + / − per row — and get the total instantly.',
  category: 'calculator',
  relatedTools: ['time-converter', 'date-calculator', 'age-calculator'],
  useCases: [
    'Add up video clip durations for a total runtime',
    'Calculate total work hours from individual session times',
    'Find remaining time after subtracting completed segments',
    'Sum workout or activity durations across multiple sets'
  ],
  faq: [
    { q: 'Can I add more than two durations?', a: 'Yes. Click Add Row to add as many time entries as needed.' },
    { q: 'How does subtraction work?', a: 'Toggle the sign on any row to − to subtract that duration from the running total.' },
    { q: 'What format is the result shown in?', a: 'HH:MM:SS and also as total hours, minutes, and seconds separately.' }
  ],
  shortTitle: 'Time Duration Calculator',
  seoContent: {
    howToTitle: 'How to Calculate Time Durations',
    howToSteps: [
      'Enter hours, minutes, and seconds in each row.',
      'Toggle the +/− sign to add or subtract that duration.',
      'Click Add Row for more entries — the total updates instantly.'
    ]
  }
},

{
  slug: 'aspect-ratio-calculator',
  title: 'Aspect Ratio Calculator Online',
  description: 'Calculate missing width, height, or aspect ratio for any image or video. Enter two values to get the third. Common ratio presets included.',
  category: 'calculator',
  relatedTools: ['image-resizer', 'placeholder-image-generator', 'image-compressor'],
  useCases: [
    'Scale images to 16:9 for YouTube thumbnails',
    'Find the height for a given width at a fixed ratio',
    'Check the aspect ratio of an existing image',
    'Prepare images at exact social media dimensions'
  ],
  faq: [
    { q: 'How do I find the missing dimension?', a: 'Enter width and height to get the ratio. Or enter one dimension plus the ratio to calculate the other.' },
    { q: 'What ratio presets are available?', a: '16:9, 4:3, 1:1, 3:2, 21:9, 9:16, and 4:5.' },
    { q: 'Is my data sent anywhere?', a: 'No. All calculations run in your browser.' }
  ],
  shortTitle: 'Aspect Ratio Calculator',
  seoContent: {
    howToTitle: 'How to Calculate Aspect Ratio',
    howToSteps: [
      'Enter width and height to get the ratio, or enter one dimension and the ratio to find the other.',
      'Use presets (16:9, 4:3, etc.) for common video and image formats.',
      'Click Calculate to see width, height, and simplified ratio.'
    ]
  }
},

{
  slug: 'pace-calculator',
  title: 'Running Pace Calculator Online',
  description: 'Calculate running pace, finish time, or distance from any two values. Supports km and miles with 5K, 10K, half marathon, and full marathon presets.',
  category: 'calculator',
  relatedTools: ['calorie-burn-calculator', 'bmi-calculator', 'age-calculator'],
  useCases: [
    'Find required pace to finish a 5K in a target time',
    'Calculate marathon finish time at a given pace',
    'Convert running pace between km and miles',
    'Plan training runs with a target pace'
  ],
  faq: [
    { q: 'What can this calculate?', a: 'Enter any two of: distance, time, or pace — the third is calculated automatically.' },
    { q: 'What race presets are available?', a: '5K, 10K, Half Marathon, and Full Marathon.' },
    { q: 'Does it support miles?', a: 'Yes. Toggle between km and miles with the unit selector.' }
  ],
  shortTitle: 'Pace Calculator',
  seoContent: {
    howToTitle: 'How to Calculate Running Pace',
    howToSteps: [
      'Select km or miles.',
      'Enter any two values: distance, finish time, or pace.',
      'Click Calculate — the missing value appears instantly.'
    ]
  }
},

{
  slug: 'tip-splitter',
  title: 'Tip Calculator & Bill Splitter Online',
  description: 'Calculate tip amount and split a restaurant bill between any number of people. Choose tip percentage or enter a custom amount — instant per-person totals.',
  category: 'calculator',
  relatedTools: ['discount-calculator', 'tax-calculator', 'percentage-calculator'],
  useCases: [
    'Split a restaurant bill evenly at the table',
    'Calculate how much tip to add for good service',
    'Find per-person amount for group outings',
    'Quick tip math for cafes and delivery orders'
  ],
  faq: [
    { q: 'Can I use a custom tip percentage?', a: 'Yes. Click Custom and enter any percentage.' },
    { q: 'How does the split work?', a: 'Total (bill + tip) is divided equally by the number of people.' },
    { q: 'Is my data sent anywhere?', a: 'No. All calculations run in your browser.' }
  ],
  shortTitle: 'Tip Splitter',
  seoContent: {
    howToTitle: 'How to Split a Bill with Tip',
    howToSteps: [
      'Enter the total bill amount.',
      'Select a tip percentage or enter a custom one.',
      'Set the number of people — results update instantly.'
    ]
  }
},

{
  slug: 'age-in-days',
  title: 'Age in Days Calculator Online',
  description: 'Find out exactly how many days, weeks, months, and hours old you are. Enter your birthdate to see your precise age plus upcoming milestones.',
  category: 'calculator',
  relatedTools: ['age-calculator', 'date-calculator', 'time-duration-calculator'],
  useCases: [
    'Find your exact age in days for a birthday',
    'Calculate 1000-day milestones for a baby',
    'Track days until a special anniversary',
    'Compute exact age for horoscopes or biorhythm charts'
  ],
  faq: [
    { q: 'What milestones does it show?', a: 'Upcoming 1,000-day, 5,000-day, 10,000-day, and birthday milestones from the selected date.' },
    { q: 'Can I calculate age as of a different date?', a: 'Yes. Change the "As of date" field to any past or future date.' },
    { q: 'Is my data sent anywhere?', a: 'No. All calculations run in your browser.' }
  ],
  shortTitle: 'Age in Days',
  seoContent: {
    howToTitle: 'How to Calculate Age in Days',
    howToSteps: [
      'Enter your birth date.',
      'The "As of" date defaults to today — change it if needed.',
      'Read your age in days, weeks, months, and hours plus upcoming milestones.'
    ]
  }
},

{
  slug: 'gradient-text-generator',
  title: 'CSS Gradient Text Generator Online',
  description: 'Create CSS gradient text effects with customizable colors, direction, and font size. Live preview and one-click CSS copy.',
  category: 'generate',
  relatedTools: ['css-gradient-generator', 'css-box-shadow-generator', 'color-scheme-generator'],
  useCases: [
    'Generate gradient headings for landing pages',
    'Create colorful text effects for social media graphics',
    'Add multi-color gradients to CSS typography',
    'Export ready-to-use CSS for any web project'
  ],
  faq: [
    { q: 'How does CSS gradient text work?', a: 'It uses background-clip: text and -webkit-text-fill-color: transparent to mask a gradient through the text shape.' },
    { q: 'Can I add more than two colors?', a: 'Yes. Click Add Color Stop to add up to 5 color stops for multi-color gradients.' },
    { q: 'Does the output work in all browsers?', a: 'Yes. The -webkit prefix is included for broad compatibility.' }
  ],
  shortTitle: 'Gradient Text Generator',
  seoContent: {
    howToTitle: 'How to Create CSS Gradient Text',
    howToSteps: [
      'Enter your text and choose gradient colors.',
      'Select a direction and adjust the font size.',
      'Copy the CSS and paste it into your stylesheet.'
    ]
  }
},

{
  slug: 'binary-calculator',
  title: 'Binary Calculator Online',
  description: 'Perform binary arithmetic: add, subtract, multiply, and divide binary numbers. Results shown in binary, decimal, hexadecimal, and octal.',
  category: 'encode',
  relatedTools: ['number-base', 'binary-text', 'scientific-calculator'],
  useCases: [
    'Solve binary math problems for computer science coursework',
    'Verify binary arithmetic results',
    'Convert binary operation results to hex or decimal',
    'Practice bitwise arithmetic concepts'
  ],
  faq: [
    { q: 'What operations are supported?', a: 'Addition, subtraction, multiplication, and division.' },
    { q: 'What format must inputs be in?', a: 'Binary — only 0 and 1 characters. Non-binary input is automatically rejected.' },
    { q: 'Does it support negative results?', a: 'Yes. A negative result is shown with a − prefix in all output formats.' }
  ],
  shortTitle: 'Binary Calculator',
  seoContent: {
    howToTitle: 'How to Use the Binary Calculator',
    howToSteps: [
      'Enter two binary numbers using only 0s and 1s.',
      'Choose the operation: +, −, ×, or ÷.',
      'Click Calculate — results appear in binary, decimal, hex, and octal.'
    ]
  }
},

{
  slug: 'word-scrambler',
  title: 'Word Scrambler Online',
  description: 'Scramble letters within words, shuffle word order, or fully randomize text. Option to keep first and last letters in place. Copy the result instantly.',
  category: 'text',
  relatedTools: ['reverse-text', 'text-case', 'random-number-generator'],
  useCases: [
    'Create word puzzle or anagram game content',
    'Generate scrambled text for educational exercises',
    'Make fun scrambled messages for friends',
    'Anonymize text structure for demos'
  ],
  faq: [
    { q: 'What scramble modes are available?', a: 'Scramble letters within words, shuffle word order, or fully randomize all characters.' },
    { q: 'What does keeping first and last letters do?', a: 'Text stays surprisingly readable when only middle letters are scrambled — this is a well-known cognitive phenomenon.' },
    { q: 'Is my text sent anywhere?', a: 'No. All scrambling runs in your browser.' }
  ],
  shortTitle: 'Word Scrambler',
  seoContent: {
    howToTitle: 'How to Scramble Words',
    howToSteps: [
      'Paste your text into the input area.',
      'Choose a scramble mode and options.',
      'Click Scramble and copy the result.'
    ]
  }
},

{
  slug: 'loan-amortization-calculator',
  title: 'Loan Amortization Calculator Online',
  description: 'Generate a complete loan amortization schedule. See every monthly payment split into principal and interest with remaining balance — free, instant.',
  category: 'calculator',
  relatedTools: ['loan-calculator', 'mortgage-calculator', 'compound-interest-calculator'],
  useCases: [
    'See how much interest you pay over a loan lifetime',
    'Compare short vs long loan terms',
    'Understand how early payments reduce total interest',
    'Plan car loan or personal loan repayments'
  ],
  faq: [
    { q: 'What is an amortization schedule?', a: 'A month-by-month table showing each payment split into principal and interest, plus the remaining balance after each payment.' },
    { q: 'Can I use this for a mortgage?', a: 'Yes. Enter the mortgage amount, annual rate, and term in months (e.g. 360 for 30 years).' },
    { q: 'Is my data sent anywhere?', a: 'No. All calculations run in your browser.' }
  ],
  shortTitle: 'Loan Amortization',
  seoContent: {
    howToTitle: 'How to Generate an Amortization Schedule',
    howToSteps: [
      'Enter the loan amount, annual interest rate, and term in months.',
      'Optionally set a start month to display real calendar dates.',
      'View the full schedule — click "Show all payments" to see every row.'
    ]
  }
},

];

if (typeof module !== 'undefined') module.exports = { TOOLS_META };
