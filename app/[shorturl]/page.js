import { getUrlCollection } from "@/lib/mongodb";
import { redirect } from "next/navigation";

export default async function Page({ params }) {
  try {
    const { shorturl } = await params;
    const collection = await getUrlCollection();
    const record = await collection.findOne({ shorturl });

    if (record?.url) {
      redirect(record.url);
    }
  } catch (error) {
    console.error("REDIRECT ERROR:", error);
  }

  redirect("/");
}
