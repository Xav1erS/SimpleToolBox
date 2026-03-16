/**
 * ToolPersist — lightweight localStorage persistence for SimpleToolBox tool pages.
 *
 * API:
 *   ToolPersist.save(toolId, state)  — serialize and store; skips if payload > MAX_BYTES
 *   ToolPersist.load(toolId)         — return parsed object, or null if missing / corrupt
 *   ToolPersist.clear(toolId)        — remove stored state
 *
 * Limits:
 *   MAX_BYTES = 50 KB per tool — prevents runaway localStorage growth.
 *   All operations are wrapped in try/catch; private-mode or quota failures are silenced.
 */
const ToolPersist = (() => {
  const PREFIX    = 'stb_persist_';
  const MAX_BYTES = 50 * 1024; // 50 KB

  function key(toolId) {
    return PREFIX + toolId;
  }

  function save(toolId, state) {
    try {
      const json = JSON.stringify(state);
      if (json.length > MAX_BYTES) return; // silently skip oversized payloads
      localStorage.setItem(key(toolId), json);
    } catch { /* quota exceeded or private mode — ignore */ }
  }

  function load(toolId) {
    try {
      const raw = localStorage.getItem(key(toolId));
      return raw ? JSON.parse(raw) : null;
    } catch { return null; }
  }

  function clear(toolId) {
    try { localStorage.removeItem(key(toolId)); } catch {}
  }

  return { save, load, clear };
})();
