"use client"

interface PerformanceMetric {
  name: string
  value: number
  timestamp: number
  userId?: string
}

class PerformanceMonitor {
  private metrics: PerformanceMetric[] = []
  private readonly MAX_METRICS = 1000

  recordMetric(name: string, value: number, userId?: string): void {
    const metric: PerformanceMetric = {
      name,
      value,
      timestamp: Date.now(),
      userId,
    }

    this.metrics.push(metric)

    // Keep only recent metrics
    if (this.metrics.length > this.MAX_METRICS) {
      this.metrics = this.metrics.slice(-this.MAX_METRICS)
    }

    // Log slow operations
    if (value > 1000) {
      console.warn(`Slow operation detected: ${name} took ${value}ms`)
    }
  }

  measureAsync<T>(name: string, fn: () => Promise<T>, userId?: string): Promise<T> {
    const start = performance.now()
    return fn().finally(() => {
      const duration = performance.now() - start
      this.recordMetric(name, duration, userId)
    })
  }

  measureSync<T>(name: string, fn: () => T, userId?: string): T {
    const start = performance.now()
    try {
      return fn()
    } finally {
      const duration = performance.now() - start
      this.recordMetric(name, duration, userId)
    }
  }

  getMetrics(name?: string): PerformanceMetric[] {
    return name ? this.metrics.filter((m) => m.name === name) : this.metrics
  }

  getAverageMetric(name: string): number {
    const metrics = this.getMetrics(name)
    if (metrics.length === 0) return 0
    return metrics.reduce((sum, m) => sum + m.value, 0) / metrics.length
  }

  clearMetrics(): void {
    this.metrics = []
  }
}

export const performanceMonitor = new PerformanceMonitor()

// Web Vitals monitoring
export function setupWebVitalsMonitoring(): void {
  // Monitor Core Web Vitals
  if (typeof window !== "undefined" && "performance" in window) {
    // Largest Contentful Paint
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        performanceMonitor.recordMetric("LCP", entry.startTime)
      }
    }).observe({ entryTypes: ["largest-contentful-paint"] })

    // First Input Delay
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        performanceMonitor.recordMetric("FID", (entry as any).processingStart - entry.startTime)
      }
    }).observe({ entryTypes: ["first-input"] })

    // Cumulative Layout Shift
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (!(entry as any).hadRecentInput) {
          performanceMonitor.recordMetric("CLS", (entry as any).value)
        }
      }
    }).observe({ entryTypes: ["layout-shift"] })
  }
}
