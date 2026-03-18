import html from "eslint-plugin-html";

export default [
  {
    files: ["public/**/*.html"],
    plugins: { html },
    languageOptions: {
      ecmaVersion: 2022,
      globals: {
        // Browser globals
        window: "readonly",
        document: "readonly",
        navigator: "readonly",
        location: "readonly",
        history: "readonly",
        localStorage: "readonly",
        sessionStorage: "readonly",
        fetch: "readonly",
        URL: "readonly",
        URLSearchParams: "readonly",
        crypto: "readonly",
        TextEncoder: "readonly",
        TextDecoder: "readonly",
        FileReader: "readonly",
        Blob: "readonly",
        File: "readonly",
        Image: "readonly",
        Worker: "readonly",
        requestAnimationFrame: "readonly",
        cancelAnimationFrame: "readonly",
        setTimeout: "readonly",
        clearTimeout: "readonly",
        setInterval: "readonly",
        clearInterval: "readonly",
        MutationObserver: "readonly",
        ResizeObserver: "readonly",
        IntersectionObserver: "readonly",
        performance: "readonly",
        // Base64 built-ins
        btoa: "readonly",
        atob: "readonly",
        // Google Analytics
        dataLayer: "writable",
        gtag: "readonly",
        // Project shared script (tool-persist.js)
        ToolPersist: "readonly",
        // Libraries loaded via CDN in some tools
        dayjs: "readonly",
        hljs: "readonly",
        marked: "readonly",
        QRCode: "readonly",
        fflate: "readonly",
        jsyaml: "readonly",
        TOML: "readonly",
      },
    },
    rules: {
      // 禁止遗留 console 语句（生产代码不应有调试输出）
      "no-console": "warn",
      // 禁止未声明的变量
      "no-undef": "error",
      // 禁止未使用的变量
      "no-unused-vars": ["warn", { "argsIgnorePattern": "^_" }],
      // 禁止重复声明
      "no-redeclare": "error",
      // 使用 === 而非 ==
      "eqeqeq": ["warn", "always", { "null": "ignore" }],
      // 禁止 var（统一用 let/const）
      "no-var": "error",
    },
  },
];
