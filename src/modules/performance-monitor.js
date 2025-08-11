// Performance Monitor - Tracks app performance metrics
// Provides real-time insights and optimization suggestions

export class PerformanceMonitor {
  constructor() {
    this.metrics = {
      loadTime: 0,
      renderTime: 0,
      interactionTime: 0,
      memoryUsage: 0
    };
    this.startTime = performance.now();
    this.init();
  }

  init() {
    // Track initial load performance
    this.trackLoadTime();

    // Monitor memory usage (if available)
    this.trackMemoryUsage();

    // Track user interactions
    this.trackInteractions();
  }

  trackLoadTime() {
    window.addEventListener('load', () => {
      this.metrics.loadTime = performance.now() - this.startTime;
      console.log(`🚀 App loaded in ${this.metrics.loadTime.toFixed(2)}ms`);

      // Log performance insights
      this.logPerformanceInsights();
    });
  }

  trackMemoryUsage() {
    if ('memory' in performance) {
      setInterval(() => {
        this.metrics.memoryUsage = performance.memory.usedJSHeapSize / 1048576; // MB
      }, 5000);
    }
  }

  trackInteractions() {
    let interactionStart = 0;

    ['click', 'touchstart', 'keydown'].forEach(eventType => {
      document.addEventListener(eventType, () => {
        interactionStart = performance.now();
      });
    });

    ['animationend', 'transitionend'].forEach(eventType => {
      document.addEventListener(eventType, () => {
        if (interactionStart) {
          this.metrics.interactionTime = performance.now() - interactionStart;
          interactionStart = 0;
        }
      });
    });
  }

  logPerformanceInsights() {
    const insights = [];

    if (this.metrics.loadTime > 1000) {
      insights.push('🐌 Consider code splitting for faster initial load');
    }

    if (this.metrics.memoryUsage > 50) {
      insights.push('💾 High memory usage detected - check for memory leaks');
    }

    if (this.metrics.interactionTime > 100) {
      insights.push('⚡ Slow interactions - optimize animations');
    }

    if (insights.length > 0) {
      console.group('🔍 Performance Insights');
      insights.forEach(insight => console.log(insight));
      console.groupEnd();
    }
  }

  getMetrics() {
    return { ...this.metrics };
  }
}

// Auto-initialize in development
if (import.meta.env.DEV) {
  window.performanceMonitor = new PerformanceMonitor();
}
