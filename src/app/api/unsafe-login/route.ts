import { NextResponse } from "next/server";
import { getUserByEmailUnsafe } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    console.log("Intento de login con:", { email, password });

    const users = await getUserByEmailUnsafe(email, password);
    console.log("Usuarios encontrados:", users);

    if (users.length === 0) {
      console.log("No se encontraron usuarios");
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Si hay al menos un usuario, consideramos que la autenticación fue exitosa
    const user = users[0];
    console.log("Usuario autenticado:", user);

    return NextResponse.json({ success: true, users });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "An error occurred during login" },
      { status: 500 }
    );
  }
}
