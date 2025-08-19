import { env } from "@/lib/env"

export class CrossDomainCookieManager {
  private static instance: CrossDomainCookieManager

  static getInstance(): CrossDomainCookieManager {
    if (!CrossDomainCookieManager.instance) {
      CrossDomainCookieManager.instance = new CrossDomainCookieManager()
    }
    return CrossDomainCookieManager.instance
  }

  setCrossDomainCookie(name: string, value: string, options: any = {}) {
    if (typeof document === "undefined" || !env.ENABLE_CROSS_DOMAIN_AUTH) return

    const defaultOptions = {
      domain: `.${env.PARENT_DOMAIN}`,
      path: "/",
      secure: true,
      sameSite: "Lax",
      maxAge: 60 * 60 * 24 * 30, // 30 days
    }

    const cookieOptions = { ...defaultOptions, ...options }
    const cookieString = this.buildCookieString(name, value, cookieOptions)

    document.cookie = cookieString
  }

  getCrossDomainCookie(name: string): string | null {
    if (typeof document === "undefined") return null

    const cookies = document.cookie.split(";")
    for (const cookie of cookies) {
      const [cookieName, cookieValue] = cookie.trim().split("=")
      if (cookieName === name) {
        return decodeURIComponent(cookieValue)
      }
    }
    return null
  }

  deleteCrossDomainCookie(name: string) {
    this.setCrossDomainCookie(name, "", {
      maxAge: -1,
      expires: new Date(0),
    })
  }

  private buildCookieString(name: string, value: string, options: any): string {
    let cookieString = `${name}=${encodeURIComponent(value)}`

    if (options.domain) cookieString += `; Domain=${options.domain}`
    if (options.path) cookieString += `; Path=${options.path}`
    if (options.maxAge) cookieString += `; Max-Age=${options.maxAge}`
    if (options.expires) cookieString += `; Expires=${options.expires.toUTCString()}`
    if (options.secure) cookieString += "; Secure"
    if (options.sameSite) cookieString += `; SameSite=${options.sameSite}`
    if (options.httpOnly) cookieString += "; HttpOnly"

    return cookieString
  }

  syncAuthCookies(session: any) {
    if (!session || !env.ENABLE_CROSS_DOMAIN_AUTH) return

    // Set auth cookies that work across subdomains
    this.setCrossDomainCookie("kozker-auth-token", session.access_token, {
      httpOnly: false, // Needs to be accessible by JS for cross-domain sync
    })

    this.setCrossDomainCookie("kozker-refresh-token", session.refresh_token, {
      httpOnly: false,
    })

    this.setCrossDomainCookie("kozker-user-id", session.user.id, {
      httpOnly: false,
    })
  }

  clearAuthCookies() {
    this.deleteCrossDomainCookie("kozker-auth-token")
    this.deleteCrossDomainCookie("kozker-refresh-token")
    this.deleteCrossDomainCookie("kozker-user-id")
  }
}

export const crossDomainCookieManager = CrossDomainCookieManager.getInstance()
