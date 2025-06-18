"use server";

import { db } from "@/lib/db";
// import { currentUser } from "@/lib/auth";
import { signOut } from "@/auth";

export async function deleteAccount(idUser) {
  // const user = await currentUser();=

  // if (!user || !user.id) {
  //   throw new Error("Usuário não autenticado");
  // }

  await db.user.delete({
    where: { id: idUser },
  });

  await signOut({ redirectTo: "/" });
}
