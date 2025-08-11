// Development Logger - Centralized logging utility
// Automatically disabled in production builds

class DevLogger {
  constructor() {
    this.isEnabled = import.meta.env.DEV;
  }

  log(...args) {
    if (this.isEnabled) {
      console.log('[DEV]', ...args);
    }
  }

  warn(...args) {
    if (this.isEnabled) {
      console.warn('[DEV]', ...args);
    }
  }

  error(...args) {
    // Always log errors, even in production
    console.error('[ERROR]', ...args);
  }

  info(...args) {
    if (this.isEnabled) {
      console.info('[INFO]', ...args);
    }
  }

  debug(...args) {
    if (this.isEnabled) {
      console.debug('[DEBUG]', ...args);
    }
  }

  // Performance logging
  performance(label, fn) {
    if (!this.isEnabled) return fn();

    const start = performance.now();
    const result = fn();
    const end = performance.now();
    this.log(`⚡ ${label}: ${(end - start).toFixed(2)}ms`);
    return result;
  }

  // Group logging for better organization
  group(label, fn) {
    if (!this.isEnabled) return fn();

    console.group(`[DEV] ${label}`);
    const result = fn();
    console.groupEnd();
    return result;
  }
}

// Export singleton instance
export const devLog = new DevLogger();
