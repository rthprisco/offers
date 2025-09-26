"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Gift, Upload, Calendar, DollarSign, Package, Eye, Image as ImageIcon } from "lucide-react";

export default function CriarOfertaForm() {
  const [formData, setFormData] = useState({
    nomeProduto: "",
    descricao: "",
    precoOriginal: "",
    precoPromocional: "",
    categoria: "",
    dataInicio: "",
    dataFim: "",
    quantidadeDisponivel: "",
    imagemUrl: ""
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const router = useRouter();

  const categorias = [
    "Alimentação",
    "Bebidas",
    "Higiene e Beleza",
    "Limpeza",
    "Padaria",
    "Açougue",
    "Hortifruti",
    "Laticínios",
    "Congelados",
    "Outros"
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Limpar erro do campo quando o usuário começar a digitar
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
    
    // Validações em tempo real
    validateField(name, value);
  };

  const validateField = (name, value) => {
    let newErrors = { ...errors };
    
    switch (name) {
      case 'precoPromocional':
        if (value && formData.precoOriginal && parseFloat(value) >= parseFloat(formData.precoOriginal)) {
          newErrors.precoPromocional = "O preço promocional deve ser menor que o preço original";
        } else {
          delete newErrors.precoPromocional;
        }
        break;
      case 'precoOriginal':
        if (value && formData.precoPromocional && parseFloat(formData.precoPromocional) >= parseFloat(value)) {
          newErrors.precoPromocional = "O preço promocional deve ser menor que o preço original";
        } else {
          delete newErrors.precoPromocional;
        }
        break;
      case 'dataFim':
        if (value && formData.dataInicio && new Date(value) <= new Date(formData.dataInicio)) {
          newErrors.dataFim = "A data de fim deve ser posterior à data de início";
        } else {
          delete newErrors.dataFim;
        }
        break;
      case 'dataInicio':
        if (value && formData.dataFim && new Date(formData.dataFim) <= new Date(value)) {
          newErrors.dataFim = "A data de fim deve ser posterior à data de início";
        } else {
          delete newErrors.dataFim;
        }
        break;
    }
    
    setErrors(newErrors);
  };

  const handleSelectChange = (value) => {
    setFormData(prev => ({ ...prev, categoria: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const mercadoData = localStorage.getItem('mercado_data');
      if (!mercadoData) {
        toast.error('Você precisa estar logado como mercado para criar ofertas');
        router.push('/mercado/login');
        return;
      }

      const mercado = JSON.parse(mercadoData);

      // Validações finais
      const validationErrors = {};
      
      if (!formData.nomeProduto.trim()) {
        validationErrors.nomeProduto = "Nome do produto é obrigatório";
      }
      
      if (!formData.categoria) {
        validationErrors.categoria = "Categoria é obrigatória";
      }
      
      if (!formData.precoOriginal || parseFloat(formData.precoOriginal) <= 0) {
        validationErrors.precoOriginal = "Preço original deve ser maior que zero";
      }
      
      if (formData.precoPromocional && parseFloat(formData.precoPromocional) >= parseFloat(formData.precoOriginal)) {
        validationErrors.precoPromocional = "Preço promocional deve ser menor que o preço original";
      }
      
      if (!formData.dataInicio) {
        validationErrors.dataInicio = "Data de início é obrigatória";
      }
      
      if (!formData.dataFim) {
        validationErrors.dataFim = "Data de fim é obrigatória";
      }
      
      if (formData.dataInicio && formData.dataFim && new Date(formData.dataFim) <= new Date(formData.dataInicio)) {
        validationErrors.dataFim = "Data de fim deve ser posterior à data de início";
      }

      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        toast.error('Por favor, corrija os erros no formulário');
        setIsLoading(false);
        return;
      }

      const dataToSend = {
        ...formData,
        mercadoId: mercado.id,
        precoOriginal: parseFloat(formData.precoOriginal),
        precoPromocional: formData.precoPromocional ? parseFloat(formData.precoPromocional) : null,
        quantidadeDisponivel: parseInt(formData.quantidadeDisponivel) || null,
      };

      const response = await fetch('/api/mercado/ofertas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSend),
      });

      if (response.ok) {
        const result = await response.json();
        toast.success('Oferta criada com sucesso!');
        
        // Salvar oferta no localStorage para demonstração
        const existingOfertas = JSON.parse(localStorage.getItem('ofertas') || '[]');
        existingOfertas.push(result.oferta);
        localStorage.setItem('ofertas', JSON.stringify(existingOfertas));
        
        router.push('/mercado/dashboard');
      } else {
        const errorData = await response.json();
        toast.error(errorData.error || 'Erro ao criar oferta');
      }
    } catch (error) {
      console.error('Erro ao criar oferta:', error);
      toast.error('Erro de conexão. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const calcularDesconto = () => {
    if (formData.precoOriginal && formData.precoPromocional) {
      const original = parseFloat(formData.precoOriginal);
      const promocional = parseFloat(formData.precoPromocional);
      return (((original - promocional) / original) * 100).toFixed(0);
    }
    return 0;
  };

  const formatarData = (data) => {
    if (!data) return '';
    return new Date(data).toLocaleDateString('pt-BR');
  };

  return (
    <div className="max-w-screen-xl mx-auto p-4 grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
      {/* Formulário */}
      <div className="order-2 lg:order-1">
        <Card className="w-full">
          <CardHeader className="space-y-1">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-green-600 p-3 rounded-full">
                <Gift className="h-6 w-6 text-white" />
              </div>
            </div>
            <CardTitle className="text-xl lg:text-2xl text-center">
              Criar Nova Oferta
            </CardTitle>
            <CardDescription className="text-center text-sm lg:text-base">
              Preencha os dados da sua oferta promocional
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Informações do Produto */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-lg font-semibold text-gray-700">
                  <Package size={20} />
                  <span>Informações do Produto</span>
                </div>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="nomeProduto">Nome do Produto *</Label>
                    <Input
                      id="nomeProduto"
                      name="nomeProduto"
                      type="text"
                      placeholder="Ex: Arroz Branco 5kg"
                      value={formData.nomeProduto}
                      onChange={handleChange}
                      required
                      disabled={isLoading}
                      className={`w-full ${errors.nomeProduto ? 'border-red-500' : ''}`}
                    />
                    {errors.nomeProduto && (
                      <p className="text-red-500 text-sm">{errors.nomeProduto}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="categoria">Categoria *</Label>
                    <Select onValueChange={handleSelectChange} disabled={isLoading}>
                      <SelectTrigger className={`w-full ${errors.categoria ? 'border-red-500' : ''}`}>
                        <SelectValue placeholder="Selecione uma categoria" />
                      </SelectTrigger>
                      <SelectContent>
                        {categorias.map((categoria) => (
                          <SelectItem key={categoria} value={categoria}>{categoria}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.categoria && (
                      <p className="text-red-500 text-sm">{errors.categoria}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="descricao">Descrição</Label>
                    <Textarea
                      id="descricao"
                      name="descricao"
                      placeholder="Descreva os detalhes da oferta..."
                      value={formData.descricao}
                      onChange={handleChange}
                      disabled={isLoading}
                      rows={3}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>

              {/* Preços */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-lg font-semibold text-gray-700">
                  <DollarSign size={20} />
                  <span>Preços</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="precoOriginal">Preço Normal (R$) *</Label>
                    <Input
                      id="precoOriginal"
                      name="precoOriginal"
                      type="number"
                      step="0.01"
                      min="0"
                      placeholder="0.00"
                      value={formData.precoOriginal}
                      onChange={handleChange}
                      required
                      disabled={isLoading}
                      className={`w-full ${errors.precoOriginal ? 'border-red-500' : ''}`}
                    />
                    {errors.precoOriginal && (
                      <p className="text-red-500 text-sm">{errors.precoOriginal}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="precoPromocional">Preço da Oferta (R$)</Label>
                    <Input
                      id="precoPromocional"
                      name="precoPromocional"
                      type="number"
                      step="0.01"
                      min="0"
                      placeholder="0.00"
                      value={formData.precoPromocional}
                      onChange={handleChange}
                      disabled={isLoading}
                      className={`w-full ${errors.precoPromocional ? 'border-red-500' : ''}`}
                    />
                    {errors.precoPromocional && (
                      <p className="text-red-500 text-sm">{errors.precoPromocional}</p>
                    )}
                  </div>
                </div>

                {formData.precoOriginal && formData.precoPromocional && (
                  <div className="bg-green-50 p-3 rounded-lg">
                    <p className="text-green-700 font-medium">
                      Desconto: {calcularDesconto()}%
                    </p>
                  </div>
                )}
              </div>

              {/* Período da Oferta */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-lg font-semibold text-gray-700">
                  <Calendar size={20} />
                  <span>Período da Oferta</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="dataInicio">Data de Início *</Label>
                    <Input
                      id="dataInicio"
                      name="dataInicio"
                      type="date"
                      value={formData.dataInicio}
                      onChange={handleChange}
                      required
                      disabled={isLoading}
                      className={`w-full ${errors.dataInicio ? 'border-red-500' : ''}`}
                    />
                    {errors.dataInicio && (
                      <p className="text-red-500 text-sm">{errors.dataInicio}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="dataFim">Data de Fim *</Label>
                    <Input
                      id="dataFim"
                      name="dataFim"
                      type="date"
                      value={formData.dataFim}
                      onChange={handleChange}
                      required
                      disabled={isLoading}
                      className={`w-full ${errors.dataFim ? 'border-red-500' : ''}`}
                    />
                    {errors.dataFim && (
                      <p className="text-red-500 text-sm">{errors.dataFim}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Informações Adicionais */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-lg font-semibold text-gray-700">
                  <Upload size={20} />
                  <span>Informações Adicionais</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="quantidadeDisponivel">Quantidade Disponível</Label>
                    <Input
                      id="quantidadeDisponivel"
                      name="quantidadeDisponivel"
                      type="number"
                      min="1"
                      placeholder="Ex: 100"
                      value={formData.quantidadeDisponivel}
                      onChange={handleChange}
                      disabled={isLoading}
                      className="w-full"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="imagemUrl">URL da Imagem</Label>
                    <Input
                      id="imagemUrl"
                      name="imagemUrl"
                      type="url"
                      placeholder="https://exemplo.com/imagem.jpg"
                      value={formData.imagemUrl}
                      onChange={handleChange}
                      disabled={isLoading}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>

              {/* Botões */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={() => router.back()}
                  disabled={isLoading}
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-green-600 hover:bg-green-700"
                  disabled={isLoading}
                >
                  {isLoading ? 'Criando...' : 'Criar Oferta'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* Preview */}
      <div className="order-1 lg:order-2 lg:sticky lg:top-6">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Eye size={20} className="text-blue-600" />
              <CardTitle className="text-base lg:text-lg">Preview da Oferta</CardTitle>
            </div>
            <CardDescription className="text-sm lg:text-base">
              Veja como sua oferta aparecerá para os clientes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg border-2 border-dashed border-green-200">
              {/* Imagem do Produto */}
              <div className="mb-4">
                {formData.imagemUrl ? (
                  <div className="relative">
                    <img
                      src={formData.imagemUrl}
                      alt={formData.nomeProduto || "Produto"}
                      className="w-full h-40 lg:h-48 object-cover rounded-lg shadow-md"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    <div className="hidden w-full h-40 lg:h-48 bg-gray-100 rounded-lg items-center justify-center">
                      <div className="text-center text-gray-500">
                        <ImageIcon size={36} className="mx-auto mb-2" />
                        <p className="text-xs lg:text-sm">Imagem não encontrada</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="w-full h-40 lg:h-48 bg-gray-100 rounded-lg flex items-center justify-center">
                    <div className="text-center text-gray-500">
                      <ImageIcon size={36} className="mx-auto mb-2" />
                      <p className="text-xs lg:text-sm">Adicione uma imagem</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Informações do Produto */}
              <div className="space-y-3">
                <h3 className="text-lg lg:text-xl font-bold text-gray-800">
                  {formData.nomeProduto || "Nome do Produto"}
                </h3>

                {formData.categoria && (
                  <div className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                    {formData.categoria}
                  </div>
                )}

                {formData.descricao && (
                  <p className="text-gray-600 text-sm">{formData.descricao}</p>
                )}

                {/* Preços */}
                <div className="flex flex-wrap items-center gap-3">
                  {formData.precoOriginal && (
                    <span className="text-base lg:text-lg text-gray-500 line-through">
                      R$ {parseFloat(formData.precoOriginal || 0).toFixed(2)}
                    </span>
                  )}
                  {formData.precoPromocional ? (
                    <span className="text-xl lg:text-2xl font-bold text-green-600">
                      R$ {parseFloat(formData.precoPromocional).toFixed(2)}
                    </span>
                  ) : formData.precoOriginal && (
                    <span className="text-xl lg:text-2xl font-bold text-gray-800">
                      R$ {parseFloat(formData.precoOriginal).toFixed(2)}
                    </span>
                  )}
                </div>

                {formData.precoOriginal && formData.precoPromocional && (
                  <div className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold inline-block">
                    {calcularDesconto()}% OFF
                  </div>
                )}

                {(formData.dataInicio || formData.dataFim) && (
                  <div className="text-sm text-gray-600">
                    <strong>Válido:</strong> {formatarData(formData.dataInicio)} {formData.dataFim && `até ${formatarData(formData.dataFim)}`}
                  </div>
                )}

                {formData.quantidadeDisponivel && (
                  <div className="text-sm text-gray-600">
                    <strong>Disponível:</strong> {formData.quantidadeDisponivel} unidades
                  </div>
                )}

                <Button className="w-full bg-green-600 hover:bg-green-700 mt-4">
                  Aproveitar Oferta
                </Button>
              </div>
            </div>

            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <p className="text-blue-700 text-sm">
                💡 <strong>Dica:</strong> Preencha todos os campos para ver como sua oferta ficará completa!
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
