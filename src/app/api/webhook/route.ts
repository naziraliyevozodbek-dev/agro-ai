import { NextResponse } from 'next/server'
import { Telegraf } from 'telegraf'

// Initialize bot if token exists
const bot = process.env.TELEGRAM_BOT_TOKEN ? new Telegraf(process.env.TELEGRAM_BOT_TOKEN) : null

if (bot) {
  // Simple start command
  bot.start((ctx) => {
    // Vercel app URL should be placed here, for now using a placeholder or local
    const webAppUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://sizning-saytingiz.vercel.app'
    
    ctx.reply(
      'Salom! Men Agro AI yordamchisiman. Ilovani ochish uchun quyidagi tugmani bosing:',
      {
        reply_markup: {
          inline_keyboard: [
            [{ text: 'Agro AI Ilovasini Ochish 🌱', web_app: { url: webAppUrl } }]
          ]
        }
      }
    )
  })
}

export async function POST(req: Request) {
  if (!bot) {
    return NextResponse.json({ error: 'Bot token topilmadi' }, { status: 500 })
  }
  
  try {
    const body = await req.json()
    // Process the update with Telegraf
    await bot.handleUpdate(body)
    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json({ error: 'Failed to process update' }, { status: 500 })
  }
}

// Security: Check token in URL params or headers in production
export async function GET() {
  return NextResponse.json({ status: 'Webhook is running. Bot token: ' + (bot ? 'Set' : 'Missing') })
}
