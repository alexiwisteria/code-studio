import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

/** Resend email.received webhook payload (metadata only; body/attachments via API) */
export type EmailReceivedPayload = {
  type: "email.received"
  created_at: string
  data: {
    email_id: string
    created_at: string
    from: string
    to: string[]
    bcc?: string[]
    cc?: string[]
    message_id?: string
    subject: string
    attachments?: Array<{
      id: string
      filename: string
      content_type: string
      content_disposition?: string
      content_id?: string
    }>
  }
}

export type ResendWebhookEvent = EmailReceivedPayload

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
}

export async function POST(request: NextRequest) {
  try {
    // Use raw body for signature verification (required by Resend/Svix)
    const rawBody = await request.text()
    let event: ResendWebhookEvent

    const webhookSecret = process.env.RESEND_WEBHOOK_SECRET
    if (webhookSecret) {
      try {
        event = resend.webhooks.verify({
          payload: rawBody,
          headers: {
            id: request.headers.get("svix-id") ?? "",
            timestamp: request.headers.get("svix-timestamp") ?? "",
            signature: request.headers.get("svix-signature") ?? "",
          },
          webhookSecret,
        }) as ResendWebhookEvent
      } catch {
        return NextResponse.json({ error: "Invalid webhook signature" }, { status: 400 })
      }
    } else {
      event = JSON.parse(rawBody) as ResendWebhookEvent
    }

    if (event.type === "email.received") {
      const { from, to, subject, email_id, attachments } = event.data
      const toAddress = Array.isArray(to) ? to[0] : to

      const { data: receivedEmail, error: getError } = await resend.emails.receiving.get(email_id)
      if (getError || !receivedEmail) {
        console.error("[webhook] Failed to fetch received email:", getError)
        return NextResponse.json({ error: "Failed to fetch email content" }, { status: 500 })
      }

      const bodyHtml = receivedEmail.html ?? receivedEmail.text?.replace(/\n/g, "<br>") ?? "(No content)"
      const forwardHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #FF6B35;">Email forwarded to your site</h2>
          <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>From:</strong> ${escapeHtml(from)}</p>
            <p><strong>To:</strong> ${escapeHtml(String(toAddress))}</p>
            <p><strong>Subject:</strong> ${escapeHtml(subject)}</p>
            ${attachments?.length ? `<p><strong>Attachments:</strong> ${attachments.length} file(s)</p>` : ""}
            <hr style="border: none; border-top: 1px solid #ddd; margin: 16px 0;" />
            <p><strong>Message:</strong></p>
            <div style="white-space: pre-wrap;">${bodyHtml}</div>
          </div>
          <p style="color: #666; font-size: 12px;">This email was sent to your site address and forwarded here.</p>
        </div>
      `

      const { error: sendError } = await resend.emails.send({
        from: "onboarding@resend.dev",
        to: "alexisbinch5@gmail.com",
        subject: "Developer Notice",
        replyTo: from.includes("<") ? from.replace(/^.*<([^>]+)>.*$/, "$1") : from,
        html: forwardHtml,
      })

      if (sendError) {
        console.error("[webhook] Failed to forward email:", sendError)
        return NextResponse.json({ error: "Failed to forward email" }, { status: 500 })
      }

      console.log("[webhook] email.received and forwarded", { email_id, from, subject })
      return NextResponse.json(event)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error("[webhook] Resend webhook error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
