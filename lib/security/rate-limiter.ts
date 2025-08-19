"use client"

interface RateLimitConfig {
  maxAttempts: number
  windowMs: number
  blockDurationMs: number
}

interface RateLimitEntry {
  attempts: number
  firstAttempt: number
  blockedUntil?: number
}

class RateLimiter {
  private storage: Map<string, RateLimitEntry> = new Map()
  private config: RateLimitConfig

  constructor(config: RateLimitConfig) {
    this.config = config
    // Clean up expired entries every 5 minutes
    setInterval(() => this.cleanup(), 5 * 60 * 1000)
  }

  private cleanup() {
    const now = Date.now()
    for (const [key, entry] of this.storage.entries()) {
      // Remove entries that are older than the window and not blocked
      if (now - entry.firstAttempt > this.config.windowMs && (!entry.blockedUntil || now > entry.blockedUntil)) {
        this.storage.delete(key)
      }
    }
  }

  private getKey(identifier: string, action: string): string {
    return `${identifier}:${action}`
  }

  isBlocked(identifier: string, action: string): boolean {
    const key = this.getKey(identifier, action)
    const entry = this.storage.get(key)

    if (!entry) return false

    const now = Date.now()

    // Check if currently blocked
    if (entry.blockedUntil && now < entry.blockedUntil) {
      return true
    }

    // Reset if window has passed
    if (now - entry.firstAttempt > this.config.windowMs) {
      this.storage.delete(key)
      return false
    }

    return false
  }

  attempt(identifier: string, action: string): { allowed: boolean; remainingAttempts: number; resetTime?: number } {
    if (this.isBlocked(identifier, action)) {
      const key = this.getKey(identifier, action)
      const entry = this.storage.get(key)!
      return {
        allowed: false,
        remainingAttempts: 0,
        resetTime: entry.blockedUntil,
      }
    }

    const key = this.getKey(identifier, action)
    const now = Date.now()
    let entry = this.storage.get(key)

    if (!entry || now - entry.firstAttempt > this.config.windowMs) {
      // First attempt or window reset
      entry = {
        attempts: 1,
        firstAttempt: now,
      }
    } else {
      // Increment attempts
      entry.attempts++
    }

    // Check if limit exceeded
    if (entry.attempts > this.config.maxAttempts) {
      entry.blockedUntil = now + this.config.blockDurationMs
      this.storage.set(key, entry)
      return {
        allowed: false,
        remainingAttempts: 0,
        resetTime: entry.blockedUntil,
      }
    }

    this.storage.set(key, entry)
    return {
      allowed: true,
      remainingAttempts: this.config.maxAttempts - entry.attempts,
    }
  }

  reset(identifier: string, action: string): void {
    const key = this.getKey(identifier, action)
    this.storage.delete(key)
  }
}

// Create rate limiters for different actions
export const authRateLimiter = new RateLimiter({
  maxAttempts: 5,
  windowMs: 15 * 60 * 1000, // 15 minutes
  blockDurationMs: 30 * 60 * 1000, // 30 minutes
})

export const passwordResetRateLimiter = new RateLimiter({
  maxAttempts: 3,
  windowMs: 60 * 60 * 1000, // 1 hour
  blockDurationMs: 2 * 60 * 60 * 1000, // 2 hours
})

export const profileUpdateRateLimiter = new RateLimiter({
  maxAttempts: 10,
  windowMs: 60 * 60 * 1000, // 1 hour
  blockDurationMs: 15 * 60 * 1000, // 15 minutes
})
