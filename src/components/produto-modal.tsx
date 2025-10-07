import { useState } from "react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Edit, Plus } from "lucide-react"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog"
import { toast } from "sonner"
import { produtoSchema, categoriasProdutos } from "../lib/validations"
import type { z } from "zod"

type ProdutoData = z.infer<typeof produtoSchema>

interface ProdutoModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (produto: ProdutoData) => Promise<any>
  produto?: any // Para edição
}

export function ProdutoModal({ open, onOpenChange, onSave, produto }: ProdutoModalProps) {
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  
  const [formData, setFormData] = useState<ProdutoData>({
    nome: produto?.nome || "",
    categoria: produto?.categoria || "",
    estoque_atual: produto?.estoque_atual || 0,
    estoque_minimo: produto?.estoque_minimo || 10,
    preco_compra: produto?.preco_compra || 0,
    preco_venda: produto?.preco_venda || 0,
    // Campos opcionais
    marca: produto?.marca || "",
    volume: produto?.volume || "",
    fornecedor: produto?.fornecedor || "",
    descricao: produto?.descricao || "",
    codigo_barras: produto?.codigo_barras || "",
    data_validade: produto?.data_validade || "",
    imagem_url: produto?.imagem_url || "",
  })

  const resetForm = () => {
    setFormData({
      nome: "",
      categoria: "",
      estoque_atual: 0,
      estoque_minimo: 10,
      preco_compra: 0,
      preco_venda: 0,
      // Campos opcionais
      marca: "",
      volume: "",
      fornecedor: "",
      descricao: "",
      codigo_barras: "",
      data_validade: "",
      imagem_url: "",
    })
    setErrors({})
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setErrors({})

    try {
      // Preparar dados para validação - remover campos vazios que podem causar erros
      const dataToValidate = {
        ...formData,
        estoque_atual: Number(formData.estoque_atual),
        estoque_minimo: Number(formData.estoque_minimo),
        preco_compra: Number(formData.preco_compra),
        preco_venda: Number(formData.preco_venda),
      }

      // Remover data_validade se estiver vazia para evitar erro de tipo date
      if (!dataToValidate.data_validade || dataToValidate.data_validade.trim() === "") {
        delete dataToValidate.data_validade
      }

      // Remover outros campos opcionais se estiverem vazios
      Object.keys(dataToValidate).forEach(key => {
        if (dataToValidate[key as keyof typeof dataToValidate] === "" || dataToValidate[key as keyof typeof dataToValidate] === null) {
          delete dataToValidate[key as keyof typeof dataToValidate]
        }
      })

      // Validar dados
      const validatedData = produtoSchema.parse(dataToValidate)

      await onSave(validatedData)
      
      toast.success(produto ? "Produto atualizado com sucesso!" : "Produto criado com sucesso!")
      resetForm()
      onOpenChange(false)
    } catch (error: any) {
      console.error("Erro ao salvar produto:", error)
      
      if (error.errors) {
        // Erros de validação do Zod
        const fieldErrors: Record<string, string> = {}
        error.errors.forEach((err: any) => {
          if (err.path.length > 0) {
            fieldErrors[err.path[0]] = err.message
          }
        })
        setErrors(fieldErrors)
      } else {
        toast.error("Erro ao salvar produto: " + (error.message || "Erro desconhecido"))
      }
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (field: keyof ProdutoData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Limpar erro do campo quando usuário digita
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }))
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[95vh] overflow-y-auto bg-slate-900/98 backdrop-blur-md border-amber-500/30 shadow-2xl">
        <DialogHeader className="pb-6">
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-transparent">
            {produto ? "✏️ Editar Produto" : "➕ Novo Produto"}
          </DialogTitle>
          <DialogDescription className="text-slate-300 text-base">
            {produto ? "Atualize as informações do produto selecionado" : "Preencha todas as informações do novo produto"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Informações Básicas */}
            <div className="md:col-span-2 p-4 bg-gradient-to-r from-slate-800/60 to-slate-700/40 rounded-xl border border-slate-600/50">
              <h3 className="text-lg font-semibold text-amber-400 mb-4">📦 Informações Básicas</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Nome - OBRIGATÓRIO */}
                <div className="md:col-span-2">
                  <Label htmlFor="nome" className="text-slate-300 font-medium">🏷️ Nome do Produto *</Label>
                  <Input
                    id="nome"
                    value={formData.nome}
                    onChange={(e) => handleInputChange("nome", e.target.value)}
                    placeholder="Ex: Cerveja Heineken 600ml"
                    className="mt-2 h-12 bg-slate-800/80 border-slate-600/50 focus:border-amber-500/50 focus:ring-amber-500/20 text-slate-100 font-medium"
                  />
                  {errors.nome && <p className="text-sm text-red-400 mt-1">{errors.nome}</p>}
                </div>

                {/* Marca */}
                <div>
                  <Label htmlFor="marca" className="text-slate-300 font-medium">🏭 Marca *</Label>
                  <Input
                    id="marca"
                    value={formData.marca}
                    onChange={(e) => handleInputChange("marca", e.target.value)}
                    placeholder="Ex: Heineken"
                    className="mt-2 h-12 bg-slate-800/80 border-slate-600/50 focus:border-amber-500/50 focus:ring-amber-500/20 text-slate-100 font-medium"
                  />
                  {errors.marca && <p className="text-sm text-red-400 mt-1">{errors.marca}</p>}
                </div>

                {/* Volume */}
                <div>
                  <Label htmlFor="volume" className="text-slate-300 font-medium">📏 Volume *</Label>
                  <Input
                    id="volume"
                    value={formData.volume}
                    onChange={(e) => handleInputChange("volume", e.target.value)}
                    placeholder="Ex: 600ml, 1L"
                    className="mt-2 h-12 bg-slate-800/80 border-slate-600/50 focus:border-amber-500/50 focus:ring-amber-500/20 text-slate-100 font-medium"
                  />
                  {errors.volume && <p className="text-sm text-red-400 mt-1">{errors.volume}</p>}
                </div>

                {/* Categoria - OBRIGATÓRIO */}
                <div className="md:col-span-2">
                  <Label htmlFor="categoria" className="text-slate-300 font-medium">🗂️ Categoria *</Label>
                  <Select value={formData.categoria} onValueChange={(value) => handleInputChange("categoria", value)}>
                    <SelectTrigger className="mt-2 h-12 bg-slate-800/80 border-slate-600/50 focus:border-amber-500/50 focus:ring-amber-500/20 text-slate-100 font-medium">
                      <SelectValue placeholder="Selecione uma categoria" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800/95 backdrop-blur-sm border-slate-600/50">
                      {categoriasProdutos.map((categoria) => (
                        <SelectItem key={categoria} value={categoria} className="text-slate-100 focus:bg-amber-500/20 focus:text-amber-400">
                          {categoria}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.categoria && <p className="text-sm text-red-400 mt-1">{errors.categoria}</p>}
                </div>
              </div>
            </div>

            {/* Controle de Estoque */}
            <div className="md:col-span-2 p-4 bg-gradient-to-r from-slate-800/60 to-slate-700/40 rounded-xl border border-slate-600/50">
              <h3 className="text-lg font-semibold text-blue-400 mb-4">📊 Controle de Estoque</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Estoque Atual */}
                <div>
                  <Label htmlFor="estoque_atual" className="text-slate-300 font-medium">📦 Estoque Atual</Label>
                  <Input
                    id="estoque_atual"
                    type="number"
                    min="0"
                    value={formData.estoque_atual || ""}
                    onChange={(e) => handleInputChange("estoque_atual", e.target.value === "" ? 0 : Number(e.target.value))}
                    placeholder="0"
                    className="mt-2 h-12 bg-slate-800/80 border-slate-600/50 focus:border-blue-500/50 focus:ring-blue-500/20 text-slate-100 font-medium"
                  />
                  {errors.estoque_atual && <p className="text-sm text-red-400 mt-1">{errors.estoque_atual}</p>}
                </div>

                {/* Estoque Mínimo */}
                <div>
                  <Label htmlFor="estoque_minimo" className="text-slate-300 font-medium">⚠️ Estoque Mínimo</Label>
                  <Input
                    id="estoque_minimo"
                    type="number"
                    min="0"
                    value={formData.estoque_minimo || ""}
                    onChange={(e) => handleInputChange("estoque_minimo", e.target.value === "" ? 0 : Number(e.target.value))}
                    placeholder="10"
                    className="mt-2 h-12 bg-slate-800/80 border-slate-600/50 focus:border-blue-500/50 focus:ring-blue-500/20 text-slate-100 font-medium"
                  />
                  {errors.estoque_minimo && <p className="text-sm text-red-400 mt-1">{errors.estoque_minimo}</p>}
                </div>
              </div>
            </div>

            {/* Preços */}
            <div className="md:col-span-2 p-4 bg-gradient-to-r from-slate-800/60 to-slate-700/40 rounded-xl border border-slate-600/50">
              <h3 className="text-lg font-semibold text-green-400 mb-4">💰 Informações de Preço</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Preço de Compra */}
                <div>
                  <Label htmlFor="preco_compra" className="text-slate-300 font-medium">🛒 Preço de Compra (R$)</Label>
                  <Input
                    id="preco_compra"
                    type="number"
                    min="0"
                    step="0.01"
                    value={formData.preco_compra || ""}
                    onChange={(e) => handleInputChange("preco_compra", e.target.value === "" ? 0 : Number(e.target.value))}
                    placeholder="0.00"
                    className="mt-2 h-12 bg-slate-800/80 border-slate-600/50 focus:border-green-500/50 focus:ring-green-500/20 text-slate-100 font-medium"
                  />
                  {errors.preco_compra && <p className="text-sm text-red-400 mt-1">{errors.preco_compra}</p>}
                </div>

                {/* Preço de Venda */}
                <div>
                  <Label htmlFor="preco_venda" className="text-slate-300 font-medium">💵 Preço de Venda (R$)</Label>
                  <Input
                    id="preco_venda"
                    type="number"
                    min="0"
                    step="0.01"
                    value={formData.preco_venda || ""}
                    onChange={(e) => handleInputChange("preco_venda", e.target.value === "" ? 0 : Number(e.target.value))}
                    placeholder="0.00"
                    className="mt-2 h-12 bg-slate-800/80 border-slate-600/50 focus:border-green-500/50 focus:ring-green-500/20 text-slate-100 font-medium"
                  />
                  {errors.preco_venda && <p className="text-sm text-red-400 mt-1">{errors.preco_venda}</p>}
                </div>
              </div>
            </div>

            {/* Campos Adicionais */}
            <div className="md:col-span-2 p-4 bg-gradient-to-r from-slate-800/60 to-slate-700/40 rounded-xl border border-slate-600/50">
              <h3 className="text-lg font-semibold text-purple-400 mb-4">📋 Informações Adicionais</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Código de Barras */}
                <div>
                  <Label htmlFor="codigo_barras" className="text-slate-300 font-medium">🔢 Código de Barras</Label>
                  <Input
                    id="codigo_barras"
                    value={formData.codigo_barras}
                    onChange={(e) => handleInputChange("codigo_barras", e.target.value)}
                    placeholder="Ex: 7891991010924"
                    className="mt-2 h-12 bg-slate-800/80 border-slate-600/50 focus:border-purple-500/50 focus:ring-purple-500/20 text-slate-100 font-medium"
                  />
                  {errors.codigo_barras && <p className="text-sm text-red-400 mt-1">{errors.codigo_barras}</p>}
                </div>

                {/* Data de Validade */}
                <div>
                  <Label htmlFor="data_validade" className="text-slate-300 font-medium">📅 Data de Validade</Label>
                  <Input
                    id="data_validade"
                    type="date"
                    value={formData.data_validade ?? ""}
                    onChange={(e) => handleInputChange("data_validade", e.target.value)}
                    className="mt-2 h-12 bg-slate-800/80 border-slate-600/50 focus:border-purple-500/50 focus:ring-purple-500/20 text-slate-100 font-medium"
                  />
                  {errors.data_validade && <p className="text-sm text-red-400 mt-1">{errors.data_validade}</p>}
                </div>

                {/* Fornecedor */}
                <div>
                  <Label htmlFor="fornecedor" className="text-slate-300 font-medium">🏪 Fornecedor</Label>
                  <Input
                    id="fornecedor"
                    value={formData.fornecedor}
                    onChange={(e) => handleInputChange("fornecedor", e.target.value)}
                    placeholder="Ex: Distribuidora ABC"
                    className="mt-2 h-12 bg-slate-800/80 border-slate-600/50 focus:border-purple-500/50 focus:ring-purple-500/20 text-slate-100 font-medium"
                  />
                  {errors.fornecedor && <p className="text-sm text-red-400 mt-1">{errors.fornecedor}</p>}
                </div>

                {/* Descrição */}
                <div>
                  <Label htmlFor="descricao" className="text-slate-300 font-medium">📝 Descrição</Label>
                  <Input
                    id="descricao"
                    value={formData.descricao}
                    onChange={(e) => handleInputChange("descricao", e.target.value)}
                    placeholder="Descrição do produto..."
                    className="mt-2 h-12 bg-slate-800/80 border-slate-600/50 focus:border-purple-500/50 focus:ring-purple-500/20 text-slate-100 font-medium"
                  />
                  {errors.descricao && <p className="text-sm text-red-400 mt-1">{errors.descricao}</p>}
                </div>
              </div>
            </div>
          </div>

          <DialogFooter className="gap-3 pt-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                resetForm()
                onOpenChange(false)
              }}
              className="flex-1 h-12 border-slate-600/50 text-slate-300 hover:bg-slate-700/50 font-medium"
            >
              ❌ Cancelar
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="flex-1 h-12 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-slate-900 font-bold shadow-lg transition-all duration-200 hover:shadow-xl"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-slate-900 mr-2"></div>
                  💾 Salvando...
                </>
              ) : produto ? (
                <>
                  <Edit className="w-5 h-5 mr-2" />
                  ✏️ Atualizar Produto
                </>
              ) : (
                <>
                  <Plus className="w-5 h-5 mr-2" />
                  ➕ Criar Produto
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
