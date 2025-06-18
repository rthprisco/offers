"use client";

import { Button } from "@/components/ui/button";
import { deleteAccount } from "./actions";

export default function DeleteAccountForm() {
  return (
    <Button
      onClick={() => {
        deleteAccount();
      }}
    >
      Deletar
    </Button>
  );
}
