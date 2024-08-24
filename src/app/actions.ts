'use server'

import { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { cookies } from "next/headers";

export async function deleteCookie(name: string) {
  await Promise.resolve(cookies().delete(name))
}

export async function setCookie(name: string, value: string, options?: ResponseCookie | Partial<ResponseCookie>) {
  await Promise.resolve(cookies().set(name, value, options))
}