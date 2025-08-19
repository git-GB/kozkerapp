"use client"

import { useState } from "react"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2, CheckCircle } from "lucide-react"
import { useRouter } from "next/navigation"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().optional(),
  subject: z.string().min(1, {
    message: "Please select a subject.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
})

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formState, setFormState] = useState<"idle" | "submitting" | "success" | "error">("idle")
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    setFormState("submitting")

    try {
      // Create form data for submission
      const formData = new FormData()

      // Add form name - this is critical for Netlify to identify the form
      formData.append("form-name", "contact")

      // Add all form values
      Object.entries(values).forEach(([key, value]) => {
        if (value) formData.append(key, value.toString())
      })

      // Convert FormData to URLSearchParams
      const searchParams = new URLSearchParams()
      for (const pair of formData.entries()) {
        searchParams.append(pair[0], pair[1] as string)
      }

      // Submit the form using the fetch API
      const response = await fetch("/", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: searchParams.toString(),
      })

      if (!response.ok) {
        throw new Error(`Form submission failed: ${response.status}`)
      }

      // Handle success
      setFormState("success")
      form.reset()

      // Wait a moment to show success message before redirecting
      setTimeout(() => {
        router.push("/thank-you")
      }, 1500)
    } catch (error) {
      console.error("Form submission error:", error)
      setFormState("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  // If form was successfully submitted but user is still on page
  if (formState === "success") {
    return (
      <div className="p-6 bg-green-50 dark:bg-green-900/20 rounded-lg text-center">
        <div className="flex justify-center mb-4">
          <div className="rounded-full bg-green-100 p-3 dark:bg-green-900">
            <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
          </div>
        </div>
        <h3 className="text-xl font-semibold mb-2">Message Sent!</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Thank you for contacting us. We'll get back to you shortly.
        </p>
        <Button onClick={() => router.push("/thank-you")}>Continue to Thank You Page</Button>
      </div>
    )
  }

  return (
    <Form {...form}>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          form.handleSubmit(onSubmit)(e)
        }}
        className="space-y-6"
      >
        {/* These hidden fields are essential for Netlify Forms */}
        <input type="hidden" name="form-name" value="contact" />
        <div hidden>
          <label>
            Don't fill this out if you're human: <input name="bot-field" />
          </label>
        </div>

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Your name" {...field} className="dark:bg-gray-800 dark:border-gray-700" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="your.email@example.com"
                    type="email"
                    {...field}
                    className="dark:bg-gray-800 dark:border-gray-700"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone (Optional)</FormLabel>
                <FormControl>
                  <Input placeholder="+91 1234567890" {...field} className="dark:bg-gray-800 dark:border-gray-700" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Subject</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="dark:bg-gray-800 dark:border-gray-700">
                    <SelectValue placeholder="Select a subject" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="dark:bg-gray-800">
                  <SelectItem value="web-design">Web Design</SelectItem>
                  <SelectItem value="customer-support">Customer Support</SelectItem>
                  <SelectItem value="whatsapp-automation">WhatsApp Automation</SelectItem>
                  <SelectItem value="power-bi">Power BI Solutions</SelectItem>
                  <SelectItem value="general">General Inquiry</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="How can we help you?"
                  className="min-h-32 resize-none dark:bg-gray-800 dark:border-gray-700"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Sending...
            </>
          ) : (
            "Send Message"
          )}
        </Button>

        {formState === "error" && (
          <div className="p-3 bg-red-100 text-red-700 rounded-md text-center">
            There was an error submitting the form. Please try again or contact us directly at{" "}
            <a href="mailto:hello@kozker.com" className="underline">
              hello@kozker.com
            </a>
            .
          </div>
        )}
      </form>
    </Form>
  )
}
