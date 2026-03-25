import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="bg-purple-100">
      <section className="grid grid-cols-1 md:grid-cols-2 min-h-[86vh]">
        {/* Left Side */}
        <div className="flex flex-col justify-center items-center p-6 text-center md:text-left">
          <p className="l font-bold mb-3 text-xl md:text-2xl">
            The best URL shortener in the market.
          </p>
          <p className="text-sm md:text-md">We are the most straightforward URL shortener in the world.</p>
          <p className="mb-3 md:mb-5 text-sm md:text-md">Your links, but shorter. 🚀</p>
          <div className="text-white">
            <Link href="/generate">
              <button className="bg-purple-500 hover:bg-purple-700 rounded shadow-xl px-2 md:px-4 py-1 md:py-2 text-sm md:text-md font-bold">
                Try Now
              </button>
            </Link>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex justify-center relative w-full h-58 md:h-auto">
          <Image
            className="mix-blend-darken object-contain"
            alt="an image of vector"
            src="/vector.jpg"
            fill
            priority
            sizes="(max-width: 768px) 100vw,
                   (max-width: 1200px) 50vw,
                   50vw"
          />
        </div>
      </section>

      <Footer />
    </main>
  );
}
