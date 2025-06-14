import ShoppingList from "@/components/shopping-list";
import { currentUser } from "@/lib/auth";

export default async function Home() {
  const user = await currentUser();

  return (
    <main className="flex h-screen items-center justify-center">
      <ShoppingList userId={user.id} />
    </main>
  );
}
