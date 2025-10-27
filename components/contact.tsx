"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Github, Linkedin, Youtube } from "lucide-react"

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setStatus(null)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        setStatus({ type: "success", message: "Message sent successfully! I'll get back to you soon." })
        setFormData({ name: "", email: "", message: "" })
      } else {
        setStatus({ type: "error", message: data.error || "Failed to send message. Please try again." })
      }
    } catch (error) {
      console.error("[v0] Form submission error:", error)
      setStatus({ type: "error", message: "An error occurred. Please try again later." })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section id="contact" className="py-24 bg-gradient-to-b from-[#2d1b3d] to-[#1a1a2e] pt-32">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-[#F5F3F4] mb-12 text-center">Get In Touch</h2>

        <div className="max-w-2xl mx-auto">
          <div className="bg-gradient-to-br from-[#2d1b3d]/50 to-[#1a1a2e]/50 backdrop-blur-sm rounded-2xl p-8 border border-[#FF6B35]/20 shadow-xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-[#F5F3F4] mb-2 font-medium">
                  Name
                </label>
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-[#1a1a2e]/50 border-[#FF6B35]/30 text-[#F5F3F4] focus:border-[#FF8BA7] placeholder:text-[#F5F3F4]/40"
                  placeholder="Your name"
                  required
                  disabled={isLoading}
                  suppressHydrationWarning
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-[#F5F3F4] mb-2 font-medium">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="bg-[#1a1a2e]/50 border-[#FF6B35]/30 text-[#F5F3F4] focus:border-[#FF8BA7] placeholder:text-[#F5F3F4]/40"
                  placeholder="your.email@example.com"
                  required
                  disabled={isLoading}
                  suppressHydrationWarning
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-[#F5F3F4] mb-2 font-medium">
                  Message
                </label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="bg-[#1a1a2e]/50 border-[#FF6B35]/30 text-[#F5F3F4] focus:border-[#FF8BA7] placeholder:text-[#F5F3F4]/40 min-h-[150px]"
                  placeholder="Your message..."
                  required
                  disabled={isLoading}
                />
              </div>

              {status && (
                <div
                  className={`p-4 rounded-lg ${
                    status.type === "success"
                      ? "bg-green-500/20 border border-green-500/30 text-green-200"
                      : "bg-red-500/20 border border-red-500/30 text-red-200"
                  }`}
                >
                  {status.message}
                </div>
              )}

              <Button
                type="submit"
                size="lg"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-[#FF6B35] to-[#9d4edd] hover:opacity-90 text-white border-0 shadow-lg shadow-[#FF6B35]/30 transition-all hover:shadow-xl hover:shadow-[#FF6B35]/40 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Sending..." : "Send Message"}
              </Button>
            </form>

            <div className="mt-8 pt-8 border-t border-[#FF6B35]/20">
              <p className="text-[#F5F3F4]/80 text-center mb-4">Connect with me</p>

              <div className="flex justify-center gap-4">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-lg bg-gradient-to-br from-[#FF6B35]/20 to-[#9d4edd]/20 hover:from-[#FF6B35]/30 hover:to-[#9d4edd]/30 border border-[#FF6B35]/30 transition-all hover:shadow-lg hover:shadow-[#FF6B35]/20"
                >
                  <Github className="w-6 h-6 text-[#F5F3F4]" />
                </a>

                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-lg bg-gradient-to-br from-[#FF6B35]/20 to-[#9d4edd]/20 hover:from-[#FF6B35]/30 hover:to-[#9d4edd]/30 border border-[#FF6B35]/30 transition-all hover:shadow-lg hover:shadow-[#FF6B35]/20"
                >
                  <Linkedin className="w-6 h-6 text-[#F5F3F4]" />
                </a>

                <a
                  href="https://youtube.com/@BrightLineDesk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-lg bg-gradient-to-br from-[#FF6B35]/20 to-[#9d4edd]/20 hover:from-[#FF6B35]/30 hover:to-[#9d4edd]/30 border border-[#FF6B35]/30 transition-all hover:shadow-lg hover:shadow-[#FF6B35]/20"
                >
                  <Youtube className="w-6 h-6 text-[#F5F3F4]" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
