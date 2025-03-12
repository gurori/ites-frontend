"use client"

import apiFetch from "@/lib/apiFetch"
import { useState } from "react";

export default function SecretKeyForm({
  formData,
  handleFetch
}: Readonly<{ formData: any, handleFetch: (data: {
    [x: string]: any;
}, getResponse: (data: {
    [x: string]: any;
}) => Response | Promise<Response>) => Promise<void> }>) {
    const [key, setKey] = useState("");
    const [error, setError] = useState("");
    const handleKey = async () => {
        const res = await apiFetch(`/api/user/organizer/confirm/${key}`, {
            credentials: "include",
            method: "POST"
        });        
        if (res.ok) {
            handleFetch(
                  formData,
                  async (data) =>
                    await apiFetch("/api/user/register", {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify(formData),
                    })
                );
        }
        else setError("Неправильный код")
    } 
    return <div className="bg-black-800 h-screen center">
          <form
            className="grid gap-6 md:gap-10 justify-items-center"
          >
            <label className="text-white">Введите код для подверждения</label>
            <input type="text" className="white" onInput={e => setKey(e.currentTarget.value)
            } />
            {error && <p className="text-red-500 -my-6">{error}</p>}
            <button type="button" onClick={handleKey} className="small px-12 bg-purple text-white">Продолжить</button>
          </form>
        </div>
}