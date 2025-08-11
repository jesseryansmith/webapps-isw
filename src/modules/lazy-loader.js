// Lazy Loader - Efficiently loads components on demand
// Reduces initial bundle size and improves loading performance

export class LazyLoader {
  constructor() {
    this.loadedModules = new Map();
    this.loadingPromises = new Map();
  }

  // Lazy load AI integration only when needed
  async loadAIIntegration() {
    if (this.loadedModules.has('ai-integration')) {
      return this.loadedModules.get('ai-integration');
    }

    if (this.loadingPromises.has('ai-integration')) {
      return this.loadingPromises.get('ai-integration');
    }

    const loadPromise = import('../components/ai-integration.js')
      .then(module => {
        this.loadedModules.set('ai-integration', module);
        this.loadingPromises.delete('ai-integration');
        return module;
      })
      .catch(error => {
        console.error('Failed to load AI integration:', error);
        this.loadingPromises.delete('ai-integration');
        throw error;
      });

    this.loadingPromises.set('ai-integration', loadPromise);
    return loadPromise;
  }

  // Preload critical modules in the background
  preloadCriticalModules() {
    // Preload AI integration after a delay
    setTimeout(() => {
      this.loadAIIntegration().catch(() => {
        // Silent fail for preloading
      });
    }, 2000);
  }

  // Check if module is already loaded
  isLoaded(moduleName) {
    return this.loadedModules.has(moduleName);
  }

  // Get loading state
  isLoading(moduleName) {
    return this.loadingPromises.has(moduleName);
  }
}

// Export singleton instance
export const lazyLoader = new LazyLoader();
