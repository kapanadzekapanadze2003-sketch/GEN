import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, items, language } = body

    // Format items for email
    const itemsList = items.map((item: { name: string; nameGe: string; type: string }) => 
      `- ${language === 'ge' ? item.nameGe : item.name} (${item.type})`
    ).join('\n')

    // Email content
    const emailContent = `
New Order Request from GEN Website
===================================

Contact Information:
- Name: ${name}
- Email: ${email}
- Phone: ${phone}

Requested Items:
${itemsList}

Language Preference: ${language === 'ge' ? 'Georgian' : 'English'}

---
This order was submitted through the GEN website.
Please contact the customer to discuss details and pricing.
    `.trim()

    // For now, log the order (in production, integrate with email service)
    console.log('New Order Received:')
    console.log(emailContent)

    // In production, send email using a service like Resend, SendGrid, etc.
    // Example with Resend:
    // await resend.emails.send({
    //   from: 'orders@gen.ge',
    //   to: 'info@gen.ge',
    //   subject: `New Order Request from ${name}`,
    //   text: emailContent
    // })

    return NextResponse.json({ 
      success: true, 
      message: 'Order submitted successfully' 
    })
  } catch (error) {
    console.error('Order submission error:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to submit order' },
      { status: 500 }
    )
  }
}
