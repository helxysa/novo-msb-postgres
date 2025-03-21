"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createAta, updateAta } from "@/app/actions/actions";

interface ItemAta {
  especificacoes: string;
  item: string;
  unidade_referencia: string;
  preco_unitario: number;
  quantidade: number;
  preco_total: number;
}

interface OutrasInformacoes {
  descricao_para_obter_ata: string;
  lista_de_arquivos: string[];
}

export default function AtaForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [isEditing, setIsEditing] = useState(false);
  const [itens, setItens] = useState<ItemAta[]>([
    {
      especificacoes: "",
      item: "",
      unidade_referencia: "",
      preco_unitario: 0,
      quantidade: 0,
      preco_total: 0,
    },
  ]);

  const [formData, setFormData] = useState({
    numero: "",
    objeto: "",
    outras_informacoes: {
      descricao_para_obter_ata: "",
      lista_de_arquivos: [] as string[],
    },
  });

  const [arquivos, setArquivos] = useState<File[]>([]);
  const [valorTotal, setValorTotal] = useState(0);

  useEffect(() => {
    const storedAta = localStorage.getItem("editingAta");
    if (storedAta) {
      try {
        const ata = JSON.parse(storedAta);
        setFormData({
          numero: ata.numero || "",
          objeto: ata.objeto || "",
          outras_informacoes: {
            descricao_para_obter_ata:
              ata.outras_informacoes?.descricao_para_obter_ata || "",
            lista_de_arquivos: ata.outras_informacoes?.lista_de_arquivos || [],
          },
        });
        setItens(
          ata.itens || [
            {
              especificacoes: "",
              item: "",
              unidade_referencia: "",
              preco_unitario: 0,
              quantidade: 0,
              preco_total: 0,
            },
          ]
        );
        setIsEditing(true);
      } catch (error) {
        console.error("Erro ao carregar dados da ata:", error);
        localStorage.removeItem("editingAta");
      }
    }
  }, []);

  useEffect(() => {
    const total = itens.reduce((acc, item) => acc + item.preco_total, 0);
    setValorTotal(total);
  }, [itens]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleItemChange = (
    index: number,
    field: keyof ItemAta,
    value: string | number
  ) => {
    const newItens = [...itens];
    newItens[index] = {
      ...newItens[index],
      [field]: value,
      preco_total:
        field === "preco_unitario" || field === "quantidade"
          ? Number(newItens[index].quantidade) *
            (field === "preco_unitario"
              ? Number(value)
              : Number(newItens[index].preco_unitario))
          : newItens[index].preco_total,
    };
    setItens(newItens);
  };

  const addItem = () => {
    setItens([
      ...itens,
      {
        especificacoes: "",
        item: "",
        unidade_referencia: "",
        preco_unitario: 0,
        quantidade: 0,
        preco_total: 0,
      },
    ]);
  };

  const removeItem = (index: number) => {
    setItens(itens.filter((_, i) => i !== index));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setArquivos(Array.from(e.target.files));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const dataToSend = {
        numero: formData.numero,
        objeto: formData.objeto,
        itens: itens,
        outras_informacoes: formData.outras_informacoes,
      };

      if (isEditing) {
        await updateAta(formData.numero, dataToSend);
      } else {
        const formDataToSend = new FormData();
        formDataToSend.append("numero", formData.numero);
        formDataToSend.append("objeto", formData.objeto);
        formDataToSend.append("itens", JSON.stringify(itens));
        formDataToSend.append(
          "outras_informacoes",
          JSON.stringify(formData.outras_informacoes)
        );

        arquivos.forEach((arquivo) => {
          formDataToSend.append("arquivos", arquivo);
        });

        await createAta(formDataToSend);
      }

      setSubmitStatus("success");
      localStorage.removeItem("editingAta");

      setTimeout(() => {
        router.push("/admin/teste-atas");
      }, 2000);
    } catch (error: any) {
      console.error("Erro ao salvar ata:", error);
      alert(error.message || "Erro ao salvar ata");
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    localStorage.removeItem("editingAta");
    router.push("/admin/teste-atas");
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 md:p-8 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">
          {isEditing ? "Editar Ata" : "Nova Ata"}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-900">Dados da Ata</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="numero"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Número da Ata *
              </label>
              <input
                type="text"
                id="numero"
                name="numero"
                required
                value={formData.numero}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 text-gray-900 focus:border-blue-600 transition duration-200"
                placeholder="ATA-2024-001"
              />
            </div>

            <div>
              <label
                htmlFor="objeto"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Objeto *
              </label>
              <input
                type="text"
                id="objeto"
                name="objeto"
                required
                value={formData.objeto}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 text-gray-900 focus:border-blue-600 transition duration-200"
                placeholder="Descrição do objeto da ata"
              />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900">Itens</h2>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <span className="block text-sm font-medium text-gray-700">
                  Valor Total
                </span>
                <span className="text-lg font-semibold text-blue-600">
                  {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(valorTotal)}
                </span>
              </div>
              <button
                type="button"
                onClick={addItem}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition duration-200"
              >
                Adicionar Item
              </button>
            </div>
          </div>

          {itens.map((item, index) => (
            <div
              key={index}
              className="p-6 border border-gray-200 rounded-lg space-y-4"
            >
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-900">
                  Item {index + 1}
                </h3>
                {itens.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeItem(index)}
                    className="text-red-600 hover:text-red-700"
                  >
                    Remover
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Item *
                  </label>
                  <input
                    type="text"
                    required
                    value={item.item}
                    onChange={(e) =>
                      handleItemChange(index, "item", e.target.value)
                    }
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 text-gray-900 focus:border-blue-600 transition duration-200"
                    placeholder="Nome do item"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Especificações *
                  </label>
                  <input
                    type="text"
                    required
                    value={item.especificacoes}
                    onChange={(e) =>
                      handleItemChange(index, "especificacoes", e.target.value)
                    }
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 text-gray-900 focus:border-blue-600 transition duration-200"
                    placeholder="Especificações do item"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Unidade de Referência *
                  </label>
                  <input
                    type="text"
                    required
                    value={item.unidade_referencia}
                    onChange={(e) =>
                      handleItemChange(
                        index,
                        "unidade_referencia",
                        e.target.value
                      )
                    }
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 text-gray-900 focus:border-blue-600 transition duration-200"
                    placeholder="Ex: unidade, kg, metro"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Preço Unitário *
                  </label>
                  <input
                    type="number"
                    required
                    step="0.01"
                    min="0"
                    value={item.preco_unitario}
                    onChange={(e) =>
                      handleItemChange(index, "preco_unitario", e.target.value)
                    }
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 text-gray-900 focus:border-blue-600 transition duration-200"
                    placeholder="0.00"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Quantidade *
                  </label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={item.quantidade}
                    onChange={(e) =>
                      handleItemChange(index, "quantidade", e.target.value)
                    }
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 text-gray-900 focus:border-blue-600 transition duration-200"
                    placeholder="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Preço Total
                  </label>
                  <input
                    type="number"
                    readOnly
                    value={item.preco_total}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 text-gray-900"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-900">
            Outras Informações
          </h2>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Descrição para Obter Ata *
            </label>
            <textarea
              required
              name="descricao_para_obter_ata"
              value={formData.outras_informacoes.descricao_para_obter_ata}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  outras_informacoes: {
                    ...prev.outras_informacoes,
                    descricao_para_obter_ata: e.target.value,
                  },
                }))
              }
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 text-gray-900 focus:border-blue-600 transition duration-200"
              rows={4}
              placeholder="Informações sobre como obter a ata"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Arquivos
            </label>
            <input
              type="file"
              multiple
              onChange={handleFileChange}
              className="w-full px-4 py-3 text-gray-900 rounded-lg border border-gray-300 
                focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition duration-200
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100"
            />
            {arquivos.length > 0 && (
              <div className="mt-2">
                <p className="text-sm text-gray-600">
                  {arquivos.length} arquivo(s) selecionado(s)
                </p>
                <ul className="mt-1 text-sm text-gray-500">
                  {arquivos.map((arquivo, index) => (
                    <li key={index}>{arquivo.name}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={handleCancel}
            className="px-6 py-3 rounded-lg bg-gray-200 text-gray-700 font-medium hover:bg-gray-300 transition duration-200"
          >
            Cancelar
          </button>

          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition duration-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isSubmitting ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                {isEditing ? "Atualizando..." : "Enviando..."}
              </>
            ) : isEditing ? (
              "Atualizar Ata"
            ) : (
              "Criar Ata"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
