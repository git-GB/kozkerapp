// ./components/ChatWidget.tsx
"use client"
import Script from "next/script"
import { useEffect, useCallback } from "react"

const ChatWidget = () => {
  const applyKozkerStyling = useCallback(() => {
    const widget = document.querySelector(".n8n-chat-widget") as HTMLElement
    if (!widget) return false

    try {
      // Apply Kozker brand colors
      widget.style.setProperty("--n8n-chat-primary-color", "#ff6e30")
      widget.style.setProperty("--n8n-chat-secondary-color", "#d45a24")
      widget.style.setProperty("--n8n-chat-background-color", "#ffffff")
      widget.style.setProperty("--n8n-chat-font-color", "#333333")

      // Apply Kozker branding content
      const brandNames = widget.querySelectorAll(".brand-header span")
      brandNames.forEach(brandName => {
        if (!brandName.textContent?.trim()) {
          brandName.textContent = "Kozker Tech Support"
        }
      })

      const logos = widget.querySelectorAll(".brand-header img") as NodeListOf<HTMLImageElement>
      logos.forEach(logo => {
        if (!logo.src || logo.src.includes("data:") || logo.src === window.location.href) {
          logo.src = "/apple-touch-icon.png"
          logo.alt = "Kozker Tech Support"
        }
      })

      const welcomeTexts = widget.querySelectorAll(".welcome-text")
      welcomeTexts.forEach(welcomeText => {
        if (!welcomeText.textContent?.trim()) {
          welcomeText.textContent = "Hi 👋, how can we help?"
        }
      })

      const responseTexts = widget.querySelectorAll(".response-text")
      responseTexts.forEach(responseText => {
        if (!responseText.textContent?.trim()) {
          responseText.textContent = "We typically respond right away"
        }
      })

      console.log("✅ Kozker styling and branding applied successfully")
      return true
    } catch (error) {
      console.error("❌ Error applying Kozker styling:", error)
      return false
    }
  }, [])

  const addMobileEnhancements = useCallback(() => {
    const widget = document.querySelector(".n8n-chat-widget") as HTMLElement
    if (!widget) return false

    try {
      // Add mobile-specific functionality
      const chatContainer = widget.querySelector(".chat-container")
      const textarea = widget.querySelector("textarea")
      const toggleButton = widget.querySelector(".chat-toggle")

      // Prevent body scroll when chat is open on mobile
      const preventBodyScroll = () => {
        if (window.innerWidth <= 768) {
          document.body.style.overflow = "hidden"
        }
      }

      // Restore body scroll when chat is closed
      const restoreBodyScroll = () => {
        document.body.style.overflow = ""
      }

      // Handle chat container open/close
      if (chatContainer) {
        const observer = new MutationObserver((mutations) => {
          mutations.forEach((mutation) => {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
              const target = mutation.target as HTMLElement
              if (target.classList.contains('open')) {
                preventBodyScroll()
              } else {
                restoreBodyScroll()
              }
            }
          })
        })

        observer.observe(chatContainer, { attributes: true })
      }

      // Handle textarea auto-resize on mobile
      if (textarea) {
        const autoResize = () => {
          textarea.style.height = "auto"
          textarea.style.height = Math.min(textarea.scrollHeight, 120) + "px"
        }

        textarea.addEventListener("input", autoResize)
        textarea.addEventListener("focus", autoResize)
      }

      // Add touch feedback for mobile
      const addTouchFeedback = (element: Element) => {
        element.addEventListener("touchstart", () => {
          element.classList.add("touch-active")
        })
        element.addEventListener("touchend", () => {
          setTimeout(() => element.classList.remove("touch-active"), 150)
        })
      }

      // Apply touch feedback to interactive elements
      widget.querySelectorAll(".chat-toggle, .new-chat-btn, .chat-input button").forEach(addTouchFeedback)

      // Handle viewport height on mobile browsers
      const setViewportHeight = () => {
        if (window.innerWidth <= 768) {
          const vh = window.innerHeight * 0.01
          document.documentElement.style.setProperty("--vh", `${vh}px`)
        }
      }

      window.addEventListener("resize", setViewportHeight)
      setViewportHeight()

      console.log("✅ Mobile enhancements applied")
      return true
    } catch (error) {
      console.error("❌ Error applying mobile enhancements:", error)
      return false
    }
  }, [])

  const initializeWidget = useCallback(() => {
    // Set global configuration with error handling
    try {
      (window as any).ChatWidgetConfig = {
        webhook: {
          url: 'https://n8n.srv832341.hstgr.cloud/webhook/f406671e-c954-4691-b39a-66c90aa2f103/chat',
          route: 'general'
        },
        branding: {
          logo: '/apple-touch-icon.png',
          name: 'Kozker Tech Support',
          welcomeText: 'Hi 👋, how can we help?',
          responseTimeText: 'We typically respond right away',
          poweredBy: {
            text: 'Powered by Kozker',
            link: 'https://kozker.com'
          }
        },
        style: {
          primaryColor: '#ff6e30',
          secondaryColor: '#d45a24',
          position: 'right',
          backgroundColor: '#ffffff',
          fontColor: '#333333'
        }
      }
      console.log("✅ ChatWidget configuration initialized")
    } catch (error) {
      console.error("❌ Error setting ChatWidget configuration:", error)
    }
  }, [])

  useEffect(() => {
    // Initialize configuration immediately
    initializeWidget()

    // Function to apply all enhancements
    const applyAllEnhancements = () => {
      const stylingSuccess = applyKozkerStyling()
      const mobileSuccess = addMobileEnhancements()
      
      if (!stylingSuccess || !mobileSuccess) {
        // If enhancements failed, try again later
        setTimeout(applyAllEnhancements, 1000)
      }
    }

    // Initial delay before trying to apply enhancements
    setTimeout(applyAllEnhancements, 500)

    // Set up observer for dynamic widget creation
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === Node.ELEMENT_NODE) {
              const element = node as Element
              if (element.classList?.contains('n8n-chat-widget') || 
                  element.querySelector?.('.n8n-chat-widget')) {
                console.log("📱 Chat widget detected in DOM")
                setTimeout(() => {
                  applyKozkerStyling()
                  addMobileEnhancements()
                }, 100)
              }
            }
          })
        }
      })
    })

    observer.observe(document.body, { 
      childList: true, 
      subtree: true 
    })

    // Cleanup function
    return () => {
      observer.disconnect()
      // Restore body scroll on cleanup
      document.body.style.overflow = ""
    }
  }, [applyKozkerStyling, addMobileEnhancements, initializeWidget])

  return (
    <>
      {/* Add mobile viewport meta tag styles */}
      <style jsx global>{`
        /* Mobile viewport height fix */
        @media (max-width: 768px) {
          .n8n-chat-widget .chat-container.open {
            height: calc(var(--vh, 1vh) * 100) !important;
          }
        }

        /* Touch feedback styles */
        .touch-active {
          opacity: 0.8 !important;
          transform: scale(0.98) !important;
        }

        /* Prevent text selection on mobile buttons */
        .n8n-chat-widget .chat-toggle,
        .n8n-chat-widget .new-chat-btn,
        .n8n-chat-widget .chat-input button {
          -webkit-touch-callout: none !important;
          -webkit-user-select: none !important;
          -khtml-user-select: none !important;
          -moz-user-select: none !important;
          -ms-user-select: none !important;
          user-select: none !important;
        }

        /* Prevent zoom on input focus on iOS */
        @media (max-width: 768px) {
          .n8n-chat-widget .chat-input textarea {
            font-size: 16px !important;
          }
        }
      `}</style>

      {/* Configuration Script - Load first */}
      <Script 
        id="kozker-chat-config"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            // Ensure config is available before widget script loads
            window.ChatWidgetConfig = {
              webhook: {
                url: 'https://n8n.srv832341.hstgr.cloud/webhook/f406671e-c954-4691-b39a-66c90aa2f103/chat',
                route: 'general'
              },
              branding: {
                logo: '/apple-touch-icon.png',
                name: 'Kozker Tech Support',
                welcomeText: 'Hi 👋, how can we help?',
                responseTimeText: 'We typically respond right away',
                poweredBy: {
                  text: 'Powered by Kozker',
                  link: 'https://kozker.com'
                }
              },
              style: {
                primaryColor: '#ff6e30',
                secondaryColor: '#d45a24', 
                position: 'right',
                backgroundColor: '#ffffff',
                fontColor: '#333333'
              }
            };
            console.log('📱 Kozker mobile chat configuration loaded');
          `,
        }}
      />

      {/* Chat Widget Script */}
      <Script
        src="https://cdn.jsdelivr.net/gh/WayneSimpson/n8n-chatbot-template@ba944c3/chat-widget.js"
        strategy="afterInteractive"
        onLoad={() => {
          console.log("📱 Mobile-optimized chat widget loaded")
          
          // Apply all enhancements after script loads
          setTimeout(() => {
            const stylingApplied = applyKozkerStyling()
            const mobileApplied = addMobileEnhancements()
            
            if (stylingApplied && mobileApplied) {
              console.log("🎨 Mobile styling and enhancements applied on load")
            }
          }, 300)

          // Mobile-specific initialization
          if (window.innerWidth <= 768) {
            console.log("📱 Mobile device detected - full responsive mode enabled")
          }
        }}
        onError={(error) => {
          console.error("❌ Failed to load mobile chat widget:", error)
        }}
      />
    </>
  )
}

export default ChatWidget
