"use client"

interface ErrorLog {
  timestamp: number
  error: string
  context: string
  userId?: string
  userAgent: string
  url: string
}

class ErrorHandler {
  private readonly MAX_LOGS = 100
  private logs: ErrorLog[] = []

  logError(error: Error | string, context: string, userId?: string): void {
    const errorLog: ErrorLog = {
      timestamp: Date.now(),
      error: error instanceof Error ? error.message : error,
      context,
      userId,
      userAgent: navigator.userAgent,
      url: window.location.href,
    }

    this.logs.push(errorLog)

    // Keep only recent logs
    if (this.logs.length > this.MAX_LOGS) {
      this.logs = this.logs.slice(-this.MAX_LOGS)
    }

    // Log to console in development
    if (process.env.NODE_ENV === "development") {
      console.error(`[${context}]`, error)
    }

    // In production, you might want to send to an error tracking service
    if (process.env.NODE_ENV === "production") {
      this.sendToErrorService(errorLog)
    }
  }

  private async sendToErrorService(errorLog: ErrorLog): Promise<void> {
    try {
      // Example: Send to your error tracking service
      // await fetch('/api/errors', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(errorLog)
      // })
    } catch (error) {
      console.error("Failed to send error to service:", error)
    }
  }

  getRecentErrors(count = 10): ErrorLog[] {
    return this.logs.slice(-count)
  }

  clearLogs(): void {
    this.logs = []
  }
}

export const errorHandler = new ErrorHandler()

// Global error handler
export function setupGlobalErrorHandling(): void {
  // Handle unhandled promise rejections
  window.addEventListener("unhandledrejection", (event) => {
    errorHandler.logError(event.reason, "unhandled_promise_rejection")
    event.preventDefault()
  })

  // Handle JavaScript errors
  window.addEventListener("error", (event) => {
    errorHandler.logError(event.error || event.message, "javascript_error")
  })
}

// Secure error messages for users
export function getSafeErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    // Map specific errors to user-friendly messages
    const errorMap: Record<string, string> = {
      "Invalid login credentials": "Invalid email or password. Please try again.",
      "Email not confirmed": "Please check your email and click the confirmation link.",
      "Too many requests": "Too many attempts. Please try again later.",
      "Network error": "Connection problem. Please check your internet and try again.",
      "Validation error": "Please check your input and try again.",
    }

    for (const [key, message] of Object.entries(errorMap)) {
      if (error.message.includes(key)) {
        return message
      }
    }
  }

  // Default safe message
  return "Something went wrong. Please try again."
}
