"use client";

import { Button } from "@/components/ui/button";
 import { deleteAccount } from "./actions";
 import { useFormStatus } from "react-dom";

 export default function DeleteAccountForm() {
 const { pending } = useFormStatus();

   return (
     <form action={deleteAccount}>
       <Button
         type="submit"
        
         disabled={pending}
       >
         {pending ? "Deletando..." : "Deletar "}
      </Button>
     </form>
   );
 }



