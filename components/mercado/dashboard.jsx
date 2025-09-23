'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Package, TrendingUp, Calendar, Eye } from 'lucide-react';

export default function DashboardMercado() {
  const [mercadoData, setMercadoData] = useState(null);
  const [ofertas, setOfertas] = useState([]);

  useEffect(() => {
    // Carregar dados do mercado logado
    const data = localStorage.getItem('mercado_data');
    if (data) {
      setMercadoData(JSON.parse(data));
    }

    // Carregar ofertas do localStorage
    const ofertasData = localStorage.getItem('ofertas');
    if (ofertasData) {
      setOfertas(JSON.parse(ofertasData));
    }
  }, []);

  const ofertasAtivas = ofertas.filter(oferta => {
    const hoje = new Date();
    const dataFim = new Date(oferta.dataFim);
    return dataFim >= hoje;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Dashboard do Mercado
          </h1>
          {mercadoData && (
            <p className="text-gray-600">
              Bem-vindo, <span className="font-semibold">{mercadoData.nome}</span>!
            </p>
          )}
        </div>

        {/* Cards de Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Ofertas</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{ofertas.length}</div>
              <p className="text-xs text-muted-foreground">
                Ofertas criadas
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Ofertas Ativas</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{ofertasAtivas.length}</div>
              <p className="text-xs text-muted-foreground">
                Válidas hoje
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Próximas a Vencer</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {ofertas.filter(oferta => {
                  const hoje = new Date();
                  const dataFim = new Date(oferta.dataFim);
                  const diasRestantes = Math.ceil((dataFim - hoje) / (1000 * 60 * 60 * 24));
                  return diasRestantes <= 7 && diasRestantes > 0;
                }).length}
              </div>
              <p className="text-xs text-muted-foreground">
                Próximos 7 dias
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Ações Principais */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5" />
                Criar Nova Oferta
              </CardTitle>
              <CardDescription>
                Adicione uma nova oferta promocional para seus produtos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/mercado/criar-ofertas">
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Criar Oferta
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5" />
                Gerenciar Ofertas
              </CardTitle>
              <CardDescription>
                Visualize e gerencie suas ofertas existentes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">
                <Eye className="h-4 w-4 mr-2" />
                Ver Todas as Ofertas
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Lista de Ofertas Recentes */}
        {ofertas.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Ofertas Recentes</CardTitle>
              <CardDescription>
                Suas últimas ofertas criadas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {ofertas.slice(-5).reverse().map((oferta, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <h3 className="font-semibold">{oferta.nomeProduto}</h3>
                      <p className="text-sm text-gray-600">{oferta.categoria}</p>
                      <div className="flex items-center gap-2 mt-1">
                        {oferta.precoPromocional ? (
                          <>
                            <span className="text-sm text-gray-500 line-through">
                              R$ {oferta.precoOriginal.toFixed(2)}
                            </span>
                            <span className="text-sm font-bold text-green-600">
                              R$ {oferta.precoPromocional.toFixed(2)}
                            </span>
                          </>
                        ) : (
                          <span className="text-sm font-bold">
                            R$ {oferta.precoOriginal.toFixed(2)}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">
                        Válida até: {new Date(oferta.dataFim).toLocaleDateString('pt-BR')}
                      </p>
                      <div className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                        new Date(oferta.dataFim) >= new Date() 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {new Date(oferta.dataFim) >= new Date() ? 'Ativa' : 'Expirada'}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {ofertas.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-600 mb-2">
                Nenhuma oferta criada ainda
              </h3>
              <p className="text-gray-500 mb-4">
                Comece criando sua primeira oferta promocional
              </p>
              <Link href="/mercado/criar-ofertas">
                <Button className="bg-green-600 hover:bg-green-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Criar Primeira Oferta
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
