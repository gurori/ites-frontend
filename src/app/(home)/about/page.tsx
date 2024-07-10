"use client";

import { useState } from "react";

export default function AboutPage() {
  const [text, setText] = useState("");
  return (
    <div className="h-screen">
      <div className="center h-full">
        <div className="grid gap-8 place-items-center">
          <h2 className="h-16">{text}</h2>
          <input
            className="white drop-shadow"
            type="number"
            placeholder="число 1"
          />
          <select className="white drop-shadow" name="" id="">
            <option value="">+</option>
            <option value="">-</option>
            <option value="">*</option>
            <option value="">/</option>
          </select>
          <input
            className="white drop-shadow"
            type="number"
            placeholder="число 2"
          />
          <button
            className="text-white large bg-black"
            onClick={() => setText("Hello, world!")}
          >
            Вычислить
          </button>
        </div>
      </div>
    </div>
  );
}
