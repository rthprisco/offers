"use client";

import { useState, useEffect } from "react";
import { 
  Package, 
  Clock, 
  CheckCircle, 
  XCircle, 
  Eye, 
  Edit, 
  Trash2,
  Plus,
  Filter
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ScrollArea from "@/components/ui/scroll-area";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function OffersSidebar() {
  const [ofertas, setOfertas] = useState([]);
  const [filtroStatus, setFiltroStatus] = useState("todas");

  // Simulando dados de ofertas
  useEffect(() => {
    const ofertasSimuladas = [
      {
        id: 1,
        nomeProduto: "Arroz Branco 5kg",
        precoOriginal: 25.90,
        precoPromocional: 19.90,
        status: "ativa",
        dataInicio: "2024-01-15",
        dataFim: "2024-01-30",
        visualizacoes: 45
      },
      {
        id: 2,
        nomeProduto: "Feijão Preto 1kg",
        precoOriginal: 8.50,
        precoPromocional: 6.90,
        status: "pendente",
        dataInicio: "2024-01-20",
        dataFim: "2024-02-05",
        visualizacoes: 12
      },
      {
        id: 3,
        nomeProduto: "Óleo de Soja 900ml",
        precoOriginal: 7.80,
        precoPromocional: 5.99,
        status: "expirada",
        dataInicio: "2024-01-01",
        dataFim: "2024-01-14",
        visualizacoes: 78
      },
      {
        id: 4,
        nomeProduto: "Açúcar Cristal 1kg",
        precoOriginal: 4.50,
        precoPromocional: 3.99,
        status: "ativa",
        dataInicio: "2024-01-10",
        dataFim: "2024-01-25",
        visualizacoes: 23
      }
    ];
    setOfertas(ofertasSimuladas);
  }, []);

  const getStatusBadge = (status) => {
    const statusConfig = {
      ativa: { color: "bg-green-100 text-green-800", icon: CheckCircle, label: "Ativa" },
      pendente: { color: "bg-yellow-100 text-yellow-800", icon: Clock, label: "Pendente" },
      expirada: { color: "bg-red-100 text-red-800", icon: XCircle, label: "Expirada" }
    };

    const config = statusConfig[status];
    const Icon = config.icon;

    return (
      <Badge className={`${config.color} flex items-center gap-1`}>
        <Icon size={12} />
        {config.label}
      </Badge>
    );
  };

  const ofertasFiltradas = ofertas.filter(oferta => 
    filtroStatus === "todas" || oferta.status === filtroStatus
  );

  const estatisticas = {
    total: ofertas.length,
    ativas: ofertas.filter(o => o.status === "ativa").length,
    pendentes: ofertas.filter(o => o.status === "pendente").length,
    expiradas: ofertas.filter(o => o.status === "expirada").length
  };

  return (
    <aside className="w-80 bg-white shadow-lg border-r border-gray-200 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Gerenciar Ofertas</h2>

        {/* Estatísticas */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="bg-blue-50 p-2 rounded-lg text-center">
            <div className="text-lg font-bold text-blue-600">{estatisticas.total}</div>
            <div className="text-xs text-blue-600">Total</div>
          </div>
          <div className="bg-green-50 p-2 rounded-lg text-center">
            <div className="text-lg font-bold text-green-600">{estatisticas.ativas}</div>
            <div className="text-xs text-green-600">Ativas</div>
          </div>
          <div className="bg-yellow-50 p-2 rounded-lg text-center">
            <div className="text-lg font-bold text-yellow-600">{estatisticas.pendentes}</div>
            <div className="text-xs text-yellow-600">Pendentes</div>
          </div>
          <div className="bg-red-50 p-2 rounded-lg text-center">
            <div className="text-lg font-bold text-red-600">{estatisticas.expiradas}</div>
            <div className="text-xs text-red-600">Expiradas</div>
          </div>
        </div>

        {/* Filtro */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
            <Filter size={16} />
            <span>Filtrar por Status</span>
          </div>
          <Select value={filtroStatus} onValueChange={setFiltroStatus}>
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todas">Todas as Ofertas</SelectItem>
              <SelectItem value="ativa">Ativas</SelectItem>
              <SelectItem value="pendente">Pendentes</SelectItem>
              <SelectItem value="expirada">Expiradas</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Lista de Ofertas */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-3">
          {ofertasFiltradas.map((oferta) => (
            <Card key={oferta.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-3">
                <div className="space-y-2">
                  {/* Nome e Status */}
                  <div className="flex items-start justify-between">
                    <h3 className="font-medium text-sm text-gray-800 line-clamp-2">
                      {oferta.nomeProduto}
                    </h3>
                    {getStatusBadge(oferta.status)}
                  </div>

                  {/* Preços */}
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500 line-through">
                      R$ {oferta.precoOriginal.toFixed(2)}
                    </span>
                    <span className="text-sm font-bold text-green-600">
                      R$ {oferta.precoPromocional.toFixed(2)}
                    </span>
                  </div>

                  {/* Período */}
                  <div className="text-xs text-gray-500">
                    {new Date(oferta.dataInicio).toLocaleDateString()} - {new Date(oferta.dataFim).toLocaleDateString()}
                  </div>

                  {/* Visualizações */}
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Eye size={12} />
                    <span>{oferta.visualizacoes} visualizações</span>
                  </div>

                  {/* Ações */}
                  <div className="flex gap-1 pt-2">
                    <Button variant="ghost" size="sm" className="h-7 px-2">
                      <Eye size={12} />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-7 px-2">
                      <Edit size={12} />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-7 px-2 text-red-600 hover:text-red-700">
                      <Trash2 size={12} />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {ofertasFiltradas.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <Package size={48} className="mx-auto mb-2 opacity-50" />
            <p className="text-sm">Nenhuma oferta encontrada</p>
          </div>
        )}
      </ScrollArea>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200">
        <Button className="w-full bg-green-600 hover:bg-green-700">
          <Plus size={16} className="mr-2" />
          Nova Oferta
        </Button>
      </div>
    </aside>
  );
}


