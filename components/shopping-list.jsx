"use client"

import { useState, useEffect } from "react"
import { Check, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"

export default function ShoppingList() {
  // Estado inicial padrão para as listas
  const defaultLists = [
    // {
    //   id: 1,
    //   name: "Supermercado",
    //   items: [
    //     { id: 1, name: "Leite", quantity: 2, unit: "L", purchased: false },
    //     { id: 2, name: "Pão", quantity: 1, unit: "un", purchased: false },
    //     { id: 3, name: "Ovos", quantity: 12, unit: "un", purchased: false },
    //     { id: 4, name: "Queijo", quantity: 300, unit: "g", purchased: true },
    //   ],
    // },
  ]

  // Estados para gerenciar as listas e itens
  const [lists, setLists] = useState(defaultLists)
  const [activeListId, setActiveListId] = useState(1)
  const [newItemName, setNewItemName] = useState("")
  const [newItemQuantity, setNewItemQuantity] = useState(1)
  const [newItemUnit, setNewItemUnit] = useState("un")
  const [isNewListDialogOpen, setIsNewListDialogOpen] = useState(false)
  const [newListName, setNewListName] = useState("")
  const [isLoaded, setIsLoaded] = useState(false)

  // Carregar dados do localStorage quando o componente montar
  useEffect(() => {
    try {
      const savedLists = localStorage.getItem("shoppingLists")
      const savedActiveListId = localStorage.getItem("activeListId")

      if (savedLists) {
        setLists(JSON.parse(savedLists))
      }

      if (savedActiveListId) {
        setActiveListId(Number(savedActiveListId))
      }

      setIsLoaded(true)
    } catch (error) {
      console.error("Erro ao carregar do localStorage:", error)
      setIsLoaded(true)
    }
  }, [])

  // Salvar dados no localStorage quando as listas mudarem
  useEffect(() => {
    // Só salvar depois que os dados iniciais forem carregados
    // para evitar sobrescrever dados com o estado inicial
    if (isLoaded) {
      try {
        localStorage.setItem("shoppingLists", JSON.stringify(lists))
        localStorage.setItem("activeListId", activeListId.toString())
      } catch (error) {
        console.error("Erro ao salvar no localStorage:", error)
      }
    }
  }, [lists, activeListId, isLoaded])

  // Obter a lista ativa
  const activeList = lists.find((list) => list.id === activeListId) || lists[0]

  // Função para adicionar um novo item à lista ativa
  const addItem = () => {
    if (newItemName.trim() === "") return

    const newItem = {
      id: Date.now(),
      name: newItemName.trim(),
      quantity: newItemQuantity,
      unit: newItemUnit,
      purchased: false,
    }

    setLists(lists.map((list) => (list.id === activeListId ? { ...list, items: [...list.items, newItem] } : list)))

    setNewItemName("")
    setNewItemQuantity(1)
    setNewItemUnit("un")
  }

  // Função para alternar o status de compra do item
  const togglePurchased = (itemId) => {
    setLists(
      lists.map((list) =>
        list.id === activeListId
          ? {
              ...list,
              items: list.items.map((item) => (item.id === itemId ? { ...item, purchased: !item.purchased } : item)),
            }
          : list,
      ),
    )
  }

  // Função para remover um item
  const removeItem = (itemId) => {
    setLists(
      lists.map((list) =>
        list.id === activeListId ? { ...list, items: list.items.filter((item) => item.id !== itemId) } : list,
      ),
    )
  }

  // Função para atualizar a quantidade de um item
  const updateItemQuantity = (itemId, quantity) => {
    if (quantity <= 0) return

    setLists(
      lists.map((list) =>
        list.id === activeListId
          ? {
              ...list,
              items: list.items.map((item) => (item.id === itemId ? { ...item, quantity } : item)),
            }
          : list,
      ),
    )
  }

  // Função para adicionar uma nova lista
  const addList = () => {
    if (newListName.trim() === "") return

    const newList = {
      id: Date.now(),
      name: newListName.trim(),
      items: [],
    }

    setLists([...lists, newList])
    setActiveListId(newList.id)
    setNewListName("")
    setIsNewListDialogOpen(false)
  }

  // Função para remover uma lista
  const removeList = (listId) => {
    if (lists.length <= 1) return // Impedir a remoção da última lista

    setLists(lists.filter((list) => list.id !== listId))

    // Se a lista ativa for removida, definir a primeira lista disponível como ativa
    if (activeListId === listId) {
      const remainingLists = lists.filter((list) => list.id !== listId)
      if (remainingLists.length > 0) {
        setActiveListId(remainingLists[0].id)
      }
    }
  }

  // Função para exportar todas as listas
  const exportLists = () => {
    try {
      const dataStr = JSON.stringify(lists, null, 2)
      const dataUri = "data:application/json;charset=utf-8," + encodeURIComponent(dataStr)

      const exportFileDefaultName = "minhas-listas-de-compras.json"

      const linkElement = document.createElement("a")
      linkElement.setAttribute("href", dataUri)
      linkElement.setAttribute("download", exportFileDefaultName)
      linkElement.click()
    } catch (error) {
      console.error("Erro ao exportar listas:", error)
    }
  }

  // Função para importar listas
  const importLists = (event) => {
    const fileReader = new FileReader()
    fileReader.readAsText(event.target.files[0], "UTF-8")
    fileReader.onload = (e) => {
      try {
        const content = e.target.result
        const parsedLists = JSON.parse(content)

        if (Array.isArray(parsedLists) && parsedLists.length > 0) {
          setLists(parsedLists)
          setActiveListId(parsedLists[0].id)
        }
      } catch (error) {
        console.error("Erro ao importar listas:", error)
      }
    }
  }

  // Lidar com o envio do formulário
  const handleSubmit = (e) => {
    e.preventDefault()
    addItem()
  }

  // Limpar todas as marcações de "comprado"
  const clearPurchased = () => {
    setLists(
      lists.map((list) =>
        list.id === activeListId
          ? {
              ...list,
              items: list.items.map((item) => ({ ...item, purchased: false })),
            }
          : list,
      ),
    )
  }

  // Remover todos os itens marcados como comprados
  const removePurchased = () => {
    setLists(
      lists.map((list) =>
        list.id === activeListId
          ? {
              ...list,
              items: list.items.filter((item) => !item.purchased),
            }
          : list,
      ),
    )
  }

  return (
    <Card className="w-[90%] md:w-[500px] ">
      <CardHeader>
        <CardTitle className="text-center">Listas de Compras</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Abas para múltiplas listas */}
        <Tabs value={activeListId.toString()} onValueChange={(value) => setActiveListId(Number(value))}>
          <div className="flex items-center justify-between mb-4">
            <TabsList className="overflow-x-auto">
              {lists.map((list) => (
                <TabsTrigger key={list.id} value={list.id.toString()}>
                  {list.name}
                </TabsTrigger>
              ))}
            </TabsList>

            {/* Diálogo para criar uma nova lista */}
            <Dialog open={isNewListDialogOpen} onOpenChange={setIsNewListDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Plus className="h-4 w-4 mr-1" /> Nova Lista
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Criar Nova Lista</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Nome da Lista</Label>
                    <Input
                      id="name"
                      value={newListName}
                      onChange={(e) => setNewListName(e.target.value)}
                      placeholder="Ex: Supermercado, Farmácia, etc."
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={addList}>Criar Lista</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          {/* Conteúdo para cada lista */}
          {lists.map((list) => (
            <TabsContent key={list.id} value={list.id.toString()}>
              {/* Formulário para adicionar novos itens com quantidade */}
              <form onSubmit={handleSubmit} className="grid gap-2 mb-4">
                <div className="flex gap-2">
                  <Input
                    type="text"
                    placeholder="Adicionar item..."
                    value={newItemName}
                    onChange={(e) => setNewItemName(e.target.value)}
                    className="flex-grow"
                  />
                  <div className="flex items-center gap-1 w-24">
                    <Input
                      type="number"
                      min="1"
                      value={newItemQuantity}
                      onChange={(e) => setNewItemQuantity(Number(e.target.value))}
                      className="w-14"
                    />
                    <Input
                      type="text"
                      value={newItemUnit}
                      onChange={(e) => setNewItemUnit(e.target.value)}
                      className="w-10"
                      placeholder="un"
                    />
                  </div>
                  <Button type="submit" size="icon">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </form>

              {/* Exibir a lista de itens com quantidade */}
              <div className="space-y-2">
                {list.items.length === 0 ? (
                  <p className="text-center text-muted-foreground">Sua lista está vazia</p>
                ) : (
                  list.items.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-2 border rounded-md">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-6 w-6 rounded-full"
                          onClick={() => togglePurchased(item.id)}
                        >
                          {item.purchased && <Check className="h-3 w-3" />}
                        </Button>
                        <span className={cn("transition-all", item.purchased && "line-through text-muted-foreground")}>
                          {item.name}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <div className="flex items-center">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => updateItemQuantity(item.id, item.quantity - 1)}
                          >
                            -
                          </Button>
                          <span className="w-12 text-center">
                            {item.quantity} {item.unit}
                          </span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
                          >
                            +
                          </Button>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 text-destructive"
                          onClick={() => removeItem(item.id)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Ações adicionais para a lista */}
              {list.items.length > 0 && (
                <div className="flex justify-center gap-2 mt-4 w-full">
                  <Button variant="outline" size="sm" onClick={clearPurchased} className="text-xs">
                    Desmarcar Todos
                  </Button>
                  <Button variant="outline" size="sm" onClick={removePurchased} className="text-xs">
                    Remover Comprados
                  </Button>
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
      <CardFooter className="flex flex-col gap-3">
        <div className="flex justify-center gap-2 w-full">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              const purchased = activeList.items.filter((item) => item.purchased).length
              const total = activeList.items.length
              alert(
                `Progresso: ${purchased}/${total} itens comprados (${total > 0 ? Math.round((purchased / total) * 100) : 0}%)`,
              )
            }}
          >
            Ver Progresso
          </Button>
          <Button variant="outline" size="sm" onClick={() => removeList(activeListId)} disabled={lists.length <= 1}>
            <Trash2 className="h-4 w-4 mr-1" /> Excluir Lista
          </Button>
        </div>

        <div className="flex justify-center gap-2 w-full">
          <Button variant="outline" size="sm" onClick={exportLists}>
            Exportar
          </Button>
          <div className="relative">
            <Button variant="outline" size="sm">
              Importar
            </Button>
            <input
              type="file"
              accept=".json"
              onChange={importLists}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}