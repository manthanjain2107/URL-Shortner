import { getUrlCollection } from "@/lib/mongodb";

export async function POST(req) {
  try {
    const body = await req.json();
    const url = body.url?.trim();
    const shorturl = body.shorturl?.trim();

    if (!url || !shorturl) {
      return Response.json(
        {
          success: false,
          error: true,
          message: "Both the original URL and short URL are required.",
        },
        { status: 400 }
      );
    }

    let parsedUrl;
    try {
      parsedUrl = new URL(url);
    } catch {
      return Response.json(
        {
          success: false,
          error: true,
          message: "Please enter a valid URL, including http:// or https://",
        },
        { status: 400 }
      );
    }

    const collection = await getUrlCollection();
    const doc = await collection.findOne({ shorturl });

    if (doc) {
      return Response.json(
        {
          success: false,
          error: true,
          message: "That short URL is already taken.",
        },
        { status: 409 }
      );
    }

    await collection.insertOne({
      url: parsedUrl.toString(),
      shorturl,
    });

    return Response.json({
      success: true,
      error: false,
      message: "URL generated successfully",
      shorturl,
    });
  } catch (error) {
    console.error("API ERROR:", error);

    return Response.json(
      {
        success: false,
        error: true,
        message: error.message || "Server error",
      },
      { status: 500 }
    );
  }
}
