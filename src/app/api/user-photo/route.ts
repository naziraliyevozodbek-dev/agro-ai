import { NextResponse } from "next/server"

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const userId = searchParams.get("user_id")

  if (!userId || !process.env.TELEGRAM_BOT_TOKEN) {
    return NextResponse.json({ photo_url: null })
  }

  try {
    // Step 1: Get user profile photos
    const photosRes = await fetch(
      `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/getUserProfilePhotos?user_id=${userId}&limit=1`
    )
    const photosData = await photosRes.json()

    if (!photosData.ok || photosData.result.total_count === 0) {
      return NextResponse.json({ photo_url: null })
    }

    // Step 2: Get the file_id of the smallest photo (thumbnail)
    const fileId = photosData.result.photos[0][0].file_id

    // Step 3: Get file path
    const fileRes = await fetch(
      `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/getFile?file_id=${fileId}`
    )
    const fileData = await fileRes.json()

    if (!fileData.ok) {
      return NextResponse.json({ photo_url: null })
    }

    const filePath = fileData.result.file_path
    const photoUrl = `https://api.telegram.org/file/bot${process.env.TELEGRAM_BOT_TOKEN}/${filePath}`

    return NextResponse.json({ photo_url: photoUrl })
  } catch (error) {
    console.error("Telegram photo fetch error:", error)
    return NextResponse.json({ photo_url: null })
  }
}
