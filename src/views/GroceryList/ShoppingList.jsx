import { useState, useEffect } from "react";
import { Check, Plus, Trash2 } from "lucide-react";
import api from "../../services/api";


export default function ShoppingList() {
  const defaultLists = [];
  const [lists, setLists] = useState(defaultLists);
  const [activeListId, setActiveListId] = useState(1);
  const activeList = lists.find((l) => l.id === activeListId);
  const [newItemName, setNewItemName] = useState("");
  const [newItemQuantity, setNewItemQuantity] = useState(1);
  const [newItemUnit, setNewItemUnit] = useState("un");
 
  const [isNewListDialogOpen, setIsNewListDialogOpen] = useState(false);
  const [newListName, setNewListName] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  

  useEffect(() => {
  const fetchLists = async () => {
    try {
      const res = await api.get("/lists");
      const listas = res.data;
      setLists(listas);
      if (listas.length > 0) setActiveListId(listas[0].id);
    } catch (err) {
      console.error("Erro ao carregar listas:", err);
    } finally {
      setIsLoaded(true);
    }
  };
  fetchLists();
}, []);


useEffect(() => {
  const fetchItems = async () => {
    if (!activeListId) return;
    try {
      const res = await api.get(`/items/${activeListId}`);
      const itens = res.data;
      setLists((prev) =>
        prev.map((list) =>
          list.id === activeListId ? { ...list, items: itens } : list
        )
      );
    } catch (err) {
      console.error("Erro ao carregar :", err);
    }
  };
  fetchItems();
}, [activeListId]);


  // +
const addItem = async () => {
  if (!newItemName.trim() || !activeListId) return;
  try {
    const res = await api.post(`/items/${activeListId}`, {
      name: newItemName.trim(),
      quantity: newItemQuantity,
      unit: newItemUnit,
    });
    const novoItem = res.data;
    setLists((prev) =>
      prev.map((list) =>
        list.id === activeListId
          ? { ...list, items: [...list.items, novoItem] }
          : list
      )
    );
    setNewItemName("");
    setNewItemQuantity(1);
    setNewItemUnit("un");
  } catch (err) {
    console.error("Erro ao adicionar item:", err);
  }
};

//+
const togglePurchased = async (itemId) => {
  const list = lists.find((l) => l.id === activeListId);
  const item = list.items.find((i) => i.id === itemId);
  try {
    const res = await api.patch(`/items/${itemId}`, {
      purchased: !item.purchased,
    });
    const atualizado = res.data;
    setLists((prev) =>
      prev.map((l) =>
        l.id === activeListId
          ? {
              ...l,
              items: l.items.map((i) =>
                i.id === itemId ? atualizado : i
              ),
            }
          : l
      )
    );
  } catch (err) {
    console.error("Erro ao atualizar item:", err);
  }
};

//+
  const removeItem = async (itemId) => {
  try {
    await api.delete(`/items/${itemId}`);
    setLists((prev) =>
      prev.map((list) =>
        list.id === activeListId
          ? { ...list, items: list.items.filter((item) => item.id !== itemId) }
          : list
      )
    );
  } catch (err) {
    console.error("Erro ao remover item:", err);
  }
};

  //+
  const updateItemQuantity = async (itemId, quantity) => {
  if (quantity <= 0) return;
  try {
    const res = await api.patch(`/items/${itemId}`, { quantity });
    const atualizado = res.data;
    setLists((prev) =>
      prev.map((l) =>
        l.id === activeListId
          ? {
              ...l,
              items: l.items.map((i) =>
                i.id === itemId ? atualizado : i
              ),
            }
          : l
      )
    );
  } catch (err) {
    console.error("Erro ao atualizar quantidade:", err);
  }
};


  //+
const addList = async () => {
  if (!newListName.trim()) return;

  try {
    const res = await api.post("/lists", { name: newListName.trim() });

    const novaLista = { ...res.data, items: [] };

    setLists((prev) => [...prev, novaLista]);
    setActiveListId(novaLista.id);
    setNewListName("");
    setIsNewListDialogOpen(false);
  } catch (err) {
    console.error("Erro ao criar lista:", err);
  }
};


//+
 const removeList = async (listId) => {
  try {
    await api.delete(`/lists/${listId}`);
    const novas = lists.filter((list) => list.id !== listId);
    setLists(novas);
    if (novas.length > 0) setActiveListId(novas[0].id);
  } catch (err) {
    console.error("Erro ao excluir lista:", err);
  }
};


  const exportLists = () => {
    const dataStr = JSON.stringify(lists, null, 2);
    const dataUri = "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);
    const link = document.createElement("a");
    link.href = dataUri;
    link.download = "minhas-listas-de-compras.json";
    link.click();
  };

  const importLists = (e) => {
    const fileReader = new FileReader();
    fileReader.readAsText(e.target.files[0], "UTF-8");
    fileReader.onload = (event) => {
      try {
        const parsedLists = JSON.parse(event.target.result);
        if (Array.isArray(parsedLists) && parsedLists.length > 0) {
          setLists(parsedLists);
          setActiveListId(parsedLists[0].id);
        }
      } catch (err) {
        console.error("Erro ao importar listas:", err);
      }
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addItem();
  };

  const clearPurchased = () => {
    setLists(
      lists.map((list) =>
        list.id === activeListId
          ? { ...list, items: list.items.map((item) => ({ ...item, purchased: false })) }
          : list
      )
    );
  };

  const removePurchased = () => {
    setLists(
      lists.map((list) =>
        list.id === activeListId
          ? { ...list, items: list.items.filter((item) => !item.purchased) }
          : list
      )
    );
  };

 return (
    <div className="w-[90%] md:w-[500px] bg-white rounded-lg shadow flex flex-col mx-auto mt-10">
      {/* Header */}
      <div className="p-4 border-b-0">
        <h2 className="text-center text-lg font-bold">Listas de Compras</h2>
      </div>

      {/* Content */}
      <div className="p-4 flex-=">
        {/* Abas */}
        < div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-1 overflow-x-auto min-w-0 flex-1">
              {lists.map((list) => (
               <button
                 key={list.id}
                  onClick={() => setActiveListId(list.id)}
                    className={`
    inline-flex items-center justify-center gap-2 
    whitespace-nowrap rounded-xl text-sm font-medium 
    transition-all cursor-pointer shrink-0
    h-9 px-4 py-2 shadow-sm
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500
    disabled:pointer-events-none disabled:opacity-50
    [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0
    ${
      activeListId === list.id
        ? "bg-red-600 text-white hover:bg-red-700"
        : "border bg-white text-gray-700 hover:bg-gray-100"
    }
  `}
>

                {list.name}
               </button>
               ))}
            </div>

          <button
            onClick={() => setIsNewListDialogOpen(true)}
           className="h-9 px-4 py-2 rounded-lg bg-red-600 text-white shadow-sm hover:bg-red-700 transition-colors flex items-center gap-2"
          >
            <Plus className="h-4 w-4" /> Nova Lista
          </button>
      </div>
      
        {/* Lista ativa */}
        {activeList ? (
          <>
            {/* Formulário de item */}
            <form onSubmit={handleSubmit} className="grid gap-2 mb-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newItemName}
                  onChange={(e) => setNewItemName(e.target.value)}
                  placeholder="Adicionar item..."
                  className="border rounded px-2 py-1 flex-grow"
                />
                <input
                  type="number"
                  min="1"
                  value={newItemQuantity}
                  onChange={(e) => setNewItemQuantity(Number(e.target.value))}
                  className="w-14 border rounded px-1 py-1"
                />
                <input
                  type="text"
                  value={newItemUnit}
                  onChange={(e) => setNewItemUnit(e.target.value)}
                  placeholder="un"
                  className="w-10 border rounded px-1 py-1"
                />
                <button type="submit" className="px-2 py-1 bg-blue-500 text-white rounded">
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </form>

            {/* Itens */}
            <div className="space-y-2">
              {activeList.items && activeList.items.length > 0 ? (
                activeList.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-2 border rounded-md"
                  >
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => togglePurchased(item.id)}
                        className="h-6 w-6 border rounded-full flex items-center justify-center"
                      >
                        {item.purchased && <Check className="h-3 w-3" />}
                      </button>
                      <span
                        className={`transition-all ${
                          item.purchased ? "line-through text-gray-400" : ""
                        }`}
                      >
                        {item.name}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="flex items-center">
                        <button
                          onClick={() => updateItemQuantity(item.id, item.quantity - 1)}
                          className="h-6 w-6 border rounded"
                        >
                          -
                        </button>
                        <span className="w-12 text-center">
                          {item.quantity} {item.unit}
                        </span>
                        <button
                          onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
                          className="h-6 w-6 border rounded"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="h-6 w-6 text-red-500 flex items-center justify-center"
                      >
                        <Trash2 className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-400">Sua lista está vazia</p>
              )}
            </div>

            {/* Ações adicionais */}
            {activeList.items.length > 0 && (
              <div className="flex justify-center gap-2 mt-4 w-full">
                <button
                  onClick={clearPurchased}
                  className="px-2 py-1 border rounded text-sm"
                >
                  Desmarcar Todos
                </button>
                <button
                  onClick={removePurchased}
                  className="px-2 py-1 border rounded text-sm"
                >
                  Remover Comprados
                </button>
              </div>
            )}
          </>
        ) : (
          <p className="text-center text-gray-400">Nenhuma lista disponível</p>
        )}
      </div>

      {/* Footer */}
      <div className="p-4 border-t-0 flex flex-col gap-3">
        <div className="flex justify-center gap-2 w-full">
          <button
            onClick={() => {
              const purchased = activeList.items.filter((item) => item.purchased).length;
              const total = activeList.items.length;
              alert(
                `Progresso: ${purchased}/${total} itens comprados (${
                  total > 0 ? Math.round((purchased / total) * 100) : 0
                }%)`
              );
            }}
            className="px-3 py-1 border rounded text-sm"
          >
            Ver Progresso
          </button>
          <button
            onClick={() => removeList(activeListId)}
            disabled={lists.length <= 1}
            className="px-3 py-1 border rounded text-sm flex items-center gap-1 disabled:opacity-50"
          >
            <Trash2 className="h-4 w-4" /> Excluir Lista
          </button>
        </div>

        <div className="flex justify-center gap-2 w-full">
          <button
            onClick={exportLists}
            className="px-3 py-1 border rounded text-sm"
          >
            Exportar
          </button>
          <div className="relative">
            <button className="px-3 py-1 border rounded text-sm">Importar</button>
            <input
              type="file"
              accept=".json"
              onChange={importLists}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Modal Nova Lista */}
      {isNewListDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded p-4 w-[300px] shadow">
            <h3 className="font-bold mb-2">Criar Nova Lista</h3>
            <input
              type="text"
              value={newListName}
              onChange={(e) => setNewListName(e.target.value)}
              placeholder="Nome da Lista"
              className="border rounded px-2 py-1 w-full mb-2"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsNewListDialogOpen(false)}
                className="px-3 py-1 border rounded hover:bg-gray-100"
              >
                Cancelar
              </button>
              <button
                onClick={addList}
                className="px-3 py-1 border rounded bg-blue-500 text-white hover:bg-blue-600"
              >
                Criar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}