"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getAtas, deleteAta } from "@/app/actions/actions";
import {
  PencilIcon,
  TrashIcon,
  InformationCircleIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import { Toaster, toast } from "react-hot-toast";

interface ItemAta {
  especificacoes: string;
  item: string;
  unidade_referencia: string;
  preco_unitario: number;
  quantidade: number;
  preco_total: number;
}

interface Ata {
  numero: string;
  objeto: string;
  itens: ItemAta[];
  valor_total: number;
  outras_informacoes: {
    descricao_para_obter_ata: string;
    lista_de_arquivos: string[];
  };
  createdAt: string;
  updatedAt: string;
}

interface InfoModalProps {
  ata: Ata | null;
  isOpen: boolean;
  onClose: () => void;
}

function InfoModal({ ata, isOpen, onClose }: InfoModalProps) {
  if (!isOpen || !ata) return null;

  // Calcula o valor total somando os preços totais dos itens
  const valorTotal =
    ata.itens?.reduce((acc, item) => {
      const precoTotal = Number(item.preco_total) || 0;
      return acc + precoTotal;
    }, 0) || 0;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl p-6 max-w-3xl w-full mx-auto max-h-[85vh] overflow-y-auto">
        <div className="flex justify-between items-center border-b pb-4 mb-6">
          <h3 className="text-2xl font-semibold text-gray-800">
            Detalhes da Ata
          </h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="text-sm font-medium text-gray-500 mb-1">
                Número da Ata
              </h4>
              <p className="text-lg text-gray-900">{ata.numero}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="text-sm font-medium text-gray-500 mb-1">
                Data de Criação
              </h4>
              <p className="text-lg text-gray-900">
                {new Date(ata.createdAt).toLocaleDateString("pt-BR")}
              </p>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="text-sm font-medium text-gray-500 mb-1">Objeto</h4>
            <p className="text-lg text-gray-900">{ata.objeto}</p>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-4">Itens</h4>
            <div className="space-y-4">
              {ata.itens.map((item, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="text-sm font-medium text-gray-500 mb-1">
                        Item
                      </h5>
                      <p className="text-gray-900">{item.item}</p>
                    </div>
                    <div>
                      <h5 className="text-sm font-medium text-gray-500 mb-1">
                        Especificações
                      </h5>
                      <p className="text-gray-900">{item.especificacoes}</p>
                    </div>
                    <div>
                      <h5 className="text-sm font-medium text-gray-500 mb-1">
                        Quantidade
                      </h5>
                      <p className="text-gray-900">{item.quantidade}</p>
                    </div>
                    <div>
                      <h5 className="text-sm font-medium text-gray-500 mb-1">
                        Preço Unitário
                      </h5>
                      <p className="text-gray-900">
                        {new Intl.NumberFormat("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        }).format(item.preco_unitario)}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t">
                    <h5 className="text-sm font-medium text-gray-500 mb-1">
                      Preço Total do Item
                    </h5>
                    <p className="text-lg font-semibold text-blue-600">
                      {new Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      }).format(item.preco_total)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="text-sm font-medium text-gray-500 mb-1">
              Outras Informações
            </h4>
            <p className="text-gray-900">
              {ata.outras_informacoes?.descricao_para_obter_ata ||
                "Não informado"}
            </p>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="text-sm font-medium text-blue-600 mb-1">
              Valor Total da Ata
            </h4>
            <p className="text-2xl font-bold text-blue-600">
              {new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(valorTotal)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  numeroAta: string;
}

function DeleteModal({
  isOpen,
  onClose,
  onConfirm,
  numeroAta,
}: DeleteModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl p-6 max-w-md w-full mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <div className="bg-red-100 p-2 rounded-full">
            <ExclamationTriangleIcon className="h-6 w-6 text-red-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900">
            Confirmar Exclusão
          </h3>
        </div>

        <p className="text-gray-600 mb-6">
          Tem certeza que deseja excluir a ata{" "}
          <span className="font-semibold">{numeroAta}</span>? Esta ação não pode
          ser desfeita.
        </p>

        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
          >
            Confirmar Exclusão
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AtasTable() {
  const [atas, setAtas] = useState<Ata[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedAta, setSelectedAta] = useState<Ata | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [ataPendingDelete, setAtaPendingDelete] = useState<string | null>(null);
  const router = useRouter();

  const loadAtas = async () => {
    try {
      const data = await getAtas();
      setAtas(data);
      setError(null);
    } catch (err) {
      setError("Erro ao carregar atas");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadAtas();
  }, []);

  const handleEdit = (ata: Ata) => {
    localStorage.setItem("editingAta", JSON.stringify(ata));
    router.push("/admin/teste-atas/form");
    toast.success("Redirecionando para edição...");
  };

  const handleNewAta = () => {
    localStorage.removeItem("editingAta");
    router.push("/admin/teste-atas/form");
  };

  const handleDeleteClick = (numero: string) => {
    setAtaPendingDelete(numero);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!ataPendingDelete) return;

    try {
      setIsLoading(true);
      await deleteAta(ataPendingDelete);
      await loadAtas();
      toast.success("Ata excluída com sucesso!");
    } catch (error: any) {
      console.error("Erro ao excluir ata:", error);
      toast.error(error.response?.data?.message || "Erro ao excluir ata");
    } finally {
      setIsLoading(false);
      setDeleteModalOpen(false);
      setAtaPendingDelete(null);
    }
  };

  const handleInfo = (ata: Ata) => {
    setSelectedAta(ata);
    setIsModalOpen(true);
  };

  const calcularValorTotal = (ata: Ata) => {
    if (!ata.itens) return 0;

    return ata.itens.reduce((total, item) => {
      const precoTotal = Number(item.preco_total) || 0;
      return total + precoTotal;
    }, 0);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 py-4">
        <p>{error}</p>
        <button
          onClick={loadAtas}
          className="mt-2 text-blue-600 hover:text-blue-800"
        >
          Tentar novamente
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#363636",
            color: "#fff",
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: "#4ade80",
              secondary: "#fff",
            },
          },
          error: {
            duration: 3000,
            iconTheme: {
              primary: "#ef4444",
              secondary: "#fff",
            },
          },
        }}
      />

      <div className="bg-white rounded-xl shadow-lg p-6 mt-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Lista de Atas</h2>
          <button
            onClick={handleNewAta}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200 flex items-center gap-2 shadow-sm"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
            Nova Ata
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                  Número
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                  Objeto
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                  Valor Total
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                  Data de Criação
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {atas.map((ata) => {
                const valorTotal = calcularValorTotal(ata);

                return (
                  <tr
                    key={ata.numero}
                    className="hover:bg-gray-50 transition duration-150"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {ata.numero}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 max-w-md truncate">
                      {ata.objeto}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                      {new Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      }).format(valorTotal)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(ata.createdAt).toLocaleDateString("pt-BR")}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center gap-4">
                        <button
                          onClick={() => handleInfo(ata)}
                          className="text-gray-600 hover:text-gray-900 transition-colors"
                          title="Informações"
                        >
                          <InformationCircleIcon className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleEdit(ata)}
                          className="text-blue-600 hover:text-blue-900 transition-colors"
                          title="Editar"
                        >
                          <PencilIcon className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleDeleteClick(ata.numero)}
                          className="text-red-600 hover:text-red-900 transition-colors"
                          title="Excluir"
                        >
                          <TrashIcon className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {atas.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <p className="text-lg">Nenhuma ata encontrada</p>
              <p className="text-sm mt-2">
                Clique em "Nova Ata" para adicionar uma ata
              </p>
            </div>
          )}
        </div>
      </div>

      <InfoModal
        ata={selectedAta}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedAta(null);
        }}
      />

      <DeleteModal
        isOpen={deleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false);
          setAtaPendingDelete(null);
        }}
        onConfirm={handleDeleteConfirm}
        numeroAta={ataPendingDelete || ""}
      />
    </div>
  );
}
