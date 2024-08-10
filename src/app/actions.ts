'use server'

import { cookies } from "next/headers";

export async function deleteCookie(name: string) {
  await Promise.resolve(cookies().delete(name))
}
