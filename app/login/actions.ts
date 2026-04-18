"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function login(formData: FormData) {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  // Credenciais padrão solicitadas pelo usuário
  if (username === "nexprint" && password === "admin") {
    const cookieStore = await cookies();
    cookieStore.set("nexprint_auth_token", "admin_authenticated", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24, // 1 dia
      path: "/",
    });
    
    redirect("/admin");
  }

  return { error: "Usuário ou senha inválidos" };
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete("nexprint_auth_token");
  redirect("/login");
}
