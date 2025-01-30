'use client'
import { useState, useRef } from 'react'
import { createAta } from '@/app/actions/actions'
import { AxiosError } from 'axios'

interface Item {
  item: string
  especificacoes: string
  unidadeReferencia: string
  quantidade: number
  precoUnitario: number
  precoTotal: number
}

export default function TesteAtas() {
  const [loading, setLoading] = useState(false)
  const [arquivo, setArquivo] = useState<File | null>(null)
  const [itens, setItens] = useState<Item[]>([])
  const formRef = useRef<HTMLFormElement>(null)
  const itemFormRef = useRef<HTMLDivElement>(null)

  const handleAddItem = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const itemForm = itemFormRef.current
    if (!itemForm) return

    const novoItem: Item = {
      item: (itemForm.querySelector('[name="item"]') as HTMLInputElement).value,
      especificacoes: (itemForm.querySelector('[name="especificacoes"]') as HTMLInputElement).value,
      unidadeReferencia: (itemForm.querySelector('[name="unidadeReferencia"]') as HTMLInputElement).value,
      quantidade: Number((itemForm.querySelector('[name="quantidade"]') as HTMLInputElement).value),
      precoUnitario: Number((itemForm.querySelector('[name="precoUnitario"]') as HTMLInputElement).value),
      precoTotal: Number((itemForm.querySelector('[name="quantidade"]') as HTMLInputElement).value) * 
                 Number((itemForm.querySelector('[name="precoUnitario"]') as HTMLInputElement).value)
    }

    setItens([...itens, novoItem])
    
    // Clear input fields manually
    const inputs = itemForm.querySelectorAll('input')
    inputs.forEach((input: HTMLInputElement) => input.value = '')
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData()

    const ataData = {
      numero: e.currentTarget.querySelector<HTMLInputElement>('[name="numero"]')?.value,
      validade: Number(e.currentTarget.querySelector<HTMLInputElement>('[name="validade"]')?.value),
      objeto: e.currentTarget.querySelector<HTMLTextAreaElement>('[name="objeto"]')?.value,
      valor_total: itens.reduce((acc, item) => acc + item.precoTotal, 0),
      outras_informacoes: e.currentTarget.querySelector<HTMLTextAreaElement>('[name="outras_informacoes"]')?.value,
      itens: itens,
      data_criacao: new Date().toISOString(),
    }

    formData.append('data', JSON.stringify(ataData))

    if (arquivo) {
      formData.append('arquivo', arquivo)
    }
    
    try {
      await createAta(formData)
      alert('Ata criada com sucesso!')
      formRef.current?.reset()
      setArquivo(null)
      setItens([])
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        console.error('Erro ao criar ata:', err.response?.data)
        alert(err.response?.data?.message || 'Erro ao criar ata. Verifique os dados e tente novamente.')
      } else if (err instanceof Error) {
        console.error('Erro ao criar ata:', err.message)
        alert(err.message || 'Erro ao criar ata. Verifique os dados e tente novamente.')
      } else {
        console.error('Erro desconhecido ao criar ata:', err)
        alert('Erro desconhecido ao criar ata. Verifique os dados e tente novamente.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white shadow-xl rounded-xl px-8 py-8 border border-gray-100">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 border-b pb-4">Cadastrar Nova Ata</h1>
          
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
              <div>
                <label htmlFor="numero" className="block text-sm font-semibold text-gray-700 mb-2">
                  Número da Ata*
                </label>
                <input
                  type="text"
                  name="numero"
                  id="numero"
                  required
                  className="mt-1 block w-full rounded-lg border-2 border-gray-200 px-4 py-3 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors text-gray-900"
                />
              </div>

              <div>
                <label htmlFor="validade" className="block text-sm font-semibold text-gray-700 mb-2">
                  Validade (em dias)*
                </label>
                <input
                  type="number"
                  name="validade"
                  id="validade"
                  required
                  className="mt-1 block w-full rounded-lg border-2 border-gray-200 px-4 py-3 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors text-gray-900"
                />
              </div>
            </div>

            <div>
              <label htmlFor="objeto" className="block text-sm font-semibold text-gray-700 mb-2">
                Objeto*
              </label>
              <textarea
                name="objeto"
                id="objeto"
                required
                rows={3}
                className="mt-1 block w-full rounded-lg border-2 border-gray-200 px-4 py-3 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors resize-none text-gray-900"
              />
            </div>

            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
              <div>
                <label htmlFor="valor_total" className="block text-sm font-semibold text-gray-700 mb-2">
                  Valor Total*
                </label>
                <input
                  type="number"
                  step="0.01"
                  name="valor_total"
                  id="valor_total"
                  required
                  className="mt-1 block w-full rounded-lg border-2 border-gray-200 px-4 py-3 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors text-gray-900"
                />
              </div>

              <div>
                <label htmlFor="arquivo" className="block text-sm font-semibold text-gray-700 mb-2">
                  Arquivo (PDF, DOC, DOCX)
                </label>
                <input
                  type="file"
                  name="arquivo"
                  id="arquivo"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => setArquivo(e.target.files?.[0] || null)}
                  className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-3 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition-colors cursor-pointer border-2 border-gray-200 rounded-lg"
                />
              </div>
            </div>

            <div>
              <label htmlFor="outras_informacoes" className="block text-sm font-semibold text-gray-700 mb-2">
                Outras Informações
              </label>
              <textarea
                name="outras_informacoes"
                id="outras_informacoes"
                rows={3}
                className="mt-1 block w-full rounded-lg border-2 border-gray-200 px-4 py-3 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors resize-none text-gray-900"
              />
            </div>

            <div className="mt-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Adicionar Item</h2>
              <div ref={itemFormRef} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="item" className="block text-sm font-semibold text-gray-700">
                      Item*
                    </label>
                    <input
                      type="text"
                      name="item"
                      required
                      className="mt-1 block w-full rounded-lg border-2 border-gray-200 px-4 py-2 text-gray-900"
                    />
                  </div>
                  <div>
                    <label htmlFor="especificacoes" className="block text-sm font-semibold text-gray-700">
                      Especificações*
                    </label>
                    <input
                      type="text"
                      name="especificacoes"
                      required
                      className="mt-1 block w-full rounded-lg border-2 border-gray-200 px-4 py-2 text-gray-900"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-4">
                  <div>
                    <label htmlFor="unidadeReferencia" className="block text-sm font-semibold text-gray-700">
                      Und. Ref.*
                    </label>
                    <input
                      type="text"
                      name="unidadeReferencia"
                      required
                      className="mt-1 block w-full rounded-lg border-2 border-gray-200 px-4 py-2 text-gray-900"
                    />
                  </div>
                  <div>
                    <label htmlFor="quantidade" className="block text-sm font-semibold text-gray-700">
                      Quantidade*
                    </label>
                    <input
                      type="number"
                      name="quantidade"
                      required
                      min="1"
                      className="mt-1 block w-full rounded-lg border-2 border-gray-200 px-4 py-2 text-gray-900"
                    />
                  </div>
                  <div>
                    <label htmlFor="precoUnitario" className="block text-sm font-semibold text-gray-700">
                      Preço Unit. (R$)*
                    </label>
                    <input
                      type="number"
                      name="precoUnitario"
                      required
                      step="0.01"
                      min="0"
                      className="mt-1 block w-full rounded-lg border-2 border-gray-200 px-4 py-2 text-gray-900"
                    />
                  </div>
                  <div className="flex items-end">
                    <button
                      type="button"
                      onClick={handleAddItem}
                      className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                    >
                      Adicionar Item
                    </button>
                  </div>
                </div>
              </div>

              {itens.length > 0 && (
                <div className="mt-6 overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Item</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Especificações</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Und. Ref.</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Qtde</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Preço Unit.</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Preço Total</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {itens.map((item, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap">{item.item}</td>
                          <td className="px-6 py-4">{item.especificacoes}</td>
                          <td className="px-6 py-4">{item.unidadeReferencia}</td>
                          <td className="px-6 py-4">{item.quantidade}</td>
                          <td className="px-6 py-4">R$ {item.precoUnitario.toFixed(2)}</td>
                          <td className="px-6 py-4">R$ {item.precoTotal.toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot className="bg-gray-50">
                      <tr>
                        <td colSpan={5} className="px-6 py-4 text-right font-semibold">Total:</td>
                        <td className="px-6 py-4 font-semibold">
                          R$ {itens.reduce((acc, item) => acc + item.precoTotal, 0).toFixed(2)}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              )}
            </div>

            <div className="flex justify-end pt-4">
              <button
                type="submit"
                disabled={loading}
                className="inline-flex justify-center rounded-lg border border-transparent bg-blue-600 py-3 px-6 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? 'Cadastrando...' : 'Cadastrar Ata'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}   