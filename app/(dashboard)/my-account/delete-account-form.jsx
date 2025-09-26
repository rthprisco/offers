"use client";

import { Button } from "@/components/ui/button";
import { deleteAccount } from "./actions";

export default function DeleteAccountForm({ idUser }) {
  return (
    <Button
      onClick={() => {
        deleteAccount(idUser);
      }}
    >
      Deletar
    </Button>
  );
}
