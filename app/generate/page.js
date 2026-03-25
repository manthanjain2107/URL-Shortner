"use client";

import React, { useState } from "react";
import Link from "next/link";

const Page = () => {
  const [url, seturl] = useState("");
  const [shorturl, setshorturl] = useState("");
  const [generated, setgenerated] = useState("");

  const generate = async () => {
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url,
          shorturl,
        }),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "API not working");
      }

      const host = window.location.origin;
      setgenerated(`${host}/${result.shorturl}`);
      seturl("");
      setshorturl("");
      alert(result.message);
    } catch (error) {
      console.error("Error:", error);
      alert(error.message || "Something went wrong. Check console.");
    }
  };

  return (
    <div className="flex flex-col m-10 p-7 gap-5 md:mx-auto max-w-md bg-purple-200 rounded-xl shadow-xl">
      <h1 className="font-bold text-center text-lg md:text-2xl">
        Generate your short URL
      </h1>

      <div className="flex flex-col gap-3">
        <input
          value={url}
          className="text-[10px] md:text-base rounded-md py-1 md:py-3 px-2 md:px-4 bg-white focus:outline-purple-600"
          type="text"
          placeholder="Enter your URL"
          onChange={(e) => seturl(e.target.value)}
        />

        <input
          value={shorturl}
          className="text-[10px] md:text-base rounded-md py-1 md:py-3 px-2 md:px-4 bg-white focus:outline-purple-600"
          type="text"
          placeholder="Enter your preferred short URL text"
          onChange={(e) => setshorturl(e.target.value)}
        />

        <button
          onClick={generate}
          className="text-xs md:text-lg bg-purple-500 hover:bg-purple-700 rounded shadow-xl p-1.5 py-1 my-3 font-bold text-white"
        >
          Generate
        </button>
      </div>

      {generated && (
        <code>
          <span className="text-[10px] md:text-[15px]">Your Link :</span>
          <Link
            className="text-[10px] md:text-[15px] text-purple-700 md:m-2"
            href={generated}
            target="_blank"
          >
            {generated}
          </Link>
        </code>
      )}
    </div>
  );
};

export default Page;
