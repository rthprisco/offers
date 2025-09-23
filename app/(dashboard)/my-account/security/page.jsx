import UpdatePassword from "./update-password";
import { Toaster } from "@/components/ui/sonner";

export default function MyAccountSecurity() {
  return (
    <div className="w-[560px]">
      <h2 className="m-6 text-3xl">Segurança e privacidade</h2>
      <UpdatePassword />
      <Toaster />
    </div>
  );
}
