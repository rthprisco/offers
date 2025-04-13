// import ShoppingList from './components/shopping-list'

import ShoppingList from "@/components/shopping-list";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <ShoppingList />
    </main>
  )
}