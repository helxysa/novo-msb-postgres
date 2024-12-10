"use client";
import React, { useState, useEffect } from "react";
import { Vaga } from "@/app/types/types";
import Loading from "@/app/components/Loading/Loading";
import dynamic from "next/dynamic";
import { unstable_noStore as noStore } from 'next/cache';  //Esse é para evitar o SSR, e pode ser tenha q ser removido no futuro
// const ExportPDF = dynamic(() => import('../../componentes/ExportPDF/ExportPDF'), { ssr: false })
import {createVaga, updateVaga, deleteVaga, getVagas} from "@/app/actions/actions";


interface AlertProps {
  isOpen: boolean;
  message: string;
  type: 'success' | 'error';
}

export default function AdminPage() {
  noStore();
  const [isBulletList, setIsBulletList] = useState(false);

  const [vagas, setVagas] = useState<Vaga[]>([]);
  const [novaVaga, setNovaVaga] = useState<Omit<Vaga, "id">>({
    titulo: "",
    localizacao: "",
    descricao: "",
    responsabilidades: "",
    requisitos: "",
    beneficios: "",
    remuneracao: "",
    area: "",
  });
  const [editandoVaga, setEditandoVaga] = useState<Vaga | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [alertConfig, setAlertConfig] = useState<AlertProps>({
    isOpen: false,
    message: '',
    type: 'success'
  });
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => {
    fetchVagas();
  }, []);

  async function fetchVagas() {
    try {
      setIsLoading(true);
      const vagas = await getVagas();
      setVagas(vagas);
    } catch (error) {
      console.error("Erro ao buscar vagas:", error);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleAddVaga(e: React.FormEvent) {
    e.preventDefault();
    try {
      const novaVagaCriada = await createVaga(novaVaga);
      setVagas(prevVagas => [...prevVagas, novaVagaCriada]);
      
      setNovaVaga({
        titulo: "",
        localizacao: "",
        descricao: "",
        responsabilidades: "",
        requisitos: "",
        beneficios: "",
        remuneracao: "",
        area: "",
      });
      setIsModalOpen(false);
      setAlertConfig({
        isOpen: true,
        message: 'Vaga criada com sucesso!',
        type: 'success'
      });
      setTimeout(() => setAlertConfig(prev => ({ ...prev, isOpen: false })), 3000);
    } catch (error) {
      console.error("Erro ao adicionar vaga:", error);
      setAlertConfig({
        isOpen: true,
        message: 'Erro ao criar vaga. Tente novamente.',
        type: 'error'
      });
      setTimeout(() => setAlertConfig(prev => ({ ...prev, isOpen: false })), 3000);
    }
  }

  async function handleUpdateVaga(e: React.FormEvent) {
    e.preventDefault();
    if (editandoVaga && editandoVaga.id) {
      try {
        const vagaAtualizada = await updateVaga(editandoVaga.id!, editandoVaga);
        setVagas(prevVagas => 
          prevVagas.map(vaga => 
            vaga.id === editandoVaga.id ? vagaAtualizada : vaga
          )
        );
        setEditandoVaga(null);
        setIsModalOpen(false);
        setAlertConfig({
          isOpen: true,
          message: 'Vaga atualizada com sucesso!',
          type: 'success'
        });
        setTimeout(() => setAlertConfig(prev => ({ ...prev, isOpen: false })), 3000);
      } catch (error) {
        console.error("Erro ao atualizar vaga:", error);
        setAlertConfig({
          isOpen: true,
          message: 'Erro ao atualizar vaga. Tente novamente.',
          type: 'error'
        });
        setTimeout(() => setAlertConfig(prev => ({ ...prev, isOpen: false })), 3000);
      }
    }
  }

  const confirmarDelete = (id: string) => {
    setDeleteId(id);
    setConfirmDelete(true);
  };

  const handleDeleteVaga = async () => {
    if (!deleteId) return;
    
    try {
      await deleteVaga(deleteId);
      setVagas(prevVagas => prevVagas.filter(vaga => vaga.id !== deleteId));
      setConfirmDelete(false);
      setDeleteId(null);
      
      setAlertConfig({
        isOpen: true,
        message: 'Vaga excluída com sucesso!',
        type: 'success'
      });
      setTimeout(() => setAlertConfig(prev => ({ ...prev, isOpen: false })), 3000);
    } catch (error) {
      console.error("Erro ao excluir vaga:", error);
      setAlertConfig({
        isOpen: true,
        message: 'Erro ao excluir vaga. Tente novamente.',
        type: 'error'
      });
      setTimeout(() => setAlertConfig(prev => ({ ...prev, isOpen: false })), 3000);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen p-6 bg-gray-50 relative">
      {alertConfig.isOpen && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-[9999]">
          <div className={`${
            alertConfig.type === 'success' ? 'bg-green-100 border-green-500' : 'bg-red-100 border-red-500'
          } border-l-4 p-4 rounded-lg shadow-2xl max-w-md w-full mx-4 animate-fade-in`}>
            <div className="flex items-center">
              {alertConfig.type === 'success' ? (
                <svg className="h-6 w-6 text-green-500 mr-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                </svg>
              ) : (
                <svg className="h-6 w-6 text-red-500 mr-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              )}
              <p className={`font-medium ${
                alertConfig.type === 'success' ? 'text-green-700' : 'text-red-700'
              }`}>
                {alertConfig.message}
              </p>
            </div>
          </div>
        </div>
      )}

      {confirmDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
          <div className="bg-white rounded-lg p-6 shadow-xl max-w-md w-full mx-4">
            <div className="text-center">
              <svg 
                className="mx-auto h-12 w-12 text-red-500" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <h3 className="mt-4 text-lg font-medium text-gray-900">
                Confirmar exclusão
              </h3>
              <p className="mt-2 text-sm text-gray-500">
                Tem certeza que deseja excluir esta vaga? Esta ação não pode ser desfeita.
              </p>
            </div>
            <div className="mt-6 flex justify-end space-x-4">
              <button
                onClick={() => {
                  setConfirmDelete(false);
                  setDeleteId(null);
                }}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors duration-200"
              >
                Cancelar
              </button>
              <button
                onClick={handleDeleteVaga}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-red-600 rounded-md hover:bg-red-700 hover:border-red-700 transition-colors duration-200"
              >
                Excluir
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="container max-w-screen-xl mx-auto">
        {/* <ExportPDF /> */}
        <div className="bg-white rounded shadow-lg p-6 md:p-10 mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
            <h2 className="font-medium text-2xl text-gray-800 mb-4 sm:mb-0">
              Vagas Cadastradas
            </h2>
            <div className="w-full sm:w-auto">
              <button
                onClick={() => {
                  setNovaVaga({
                    titulo: "",
                    localizacao: "",
                    descricao: "",
                    responsabilidades: "",
                    requisitos: "",
                    beneficios: "",
                    remuneracao: "",
                    area: "",
                  });
                  setEditandoVaga(null);
                  setIsModalOpen(true);
                }}
                className="bg-blue-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow"
              >
                Criar Nova Vaga
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300 shadow-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 border-b border-gray-300 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Título
                  </th>
                  <th className="px-6 py-3 border-b border-gray-300 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Área
                  </th>
                  <th className="px-6 py-3 border-b border-gray-300 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Localização
                  </th>
                  <th className="px-6 py-3 border-b border-gray-300 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="text-gray-700 text-sm">
                {vagas.map((vaga) => (
                  <tr key={vaga.id}>
                    <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                      {vaga.titulo}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                      {vaga.area}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                      {vaga.localizacao}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                      <button
                        onClick={() => {
                          setEditandoVaga(vaga);
                          setIsModalOpen(true);
                        }}
                        className="text-blue-600 hover:text-blue-800 mr-2"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          className="w-5 h-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                          />
                        </svg>
                      </button>
                      <button
                        onClick={() => confirmarDelete(vaga.id!)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          className="w-5 h-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
          <div className="relative top-20 mx-auto p-8 border w-full max-w-2xl shadow-lg rounded-md bg-white">
            <form
              onSubmit={editandoVaga ? handleUpdateVaga : handleAddVaga}
              className="grid gap-6 text-sm grid-cols-1 md:grid-cols-2"
            >
              <div className="md:col-span-2">
                <label htmlFor="titulo" className="text-gray-700 font-semibold">
                  Título da Vaga
                </label>
                <input
                  type="text"
                  id="titulo"
                  value={(editandoVaga || novaVaga).titulo}
                  onChange={(e) =>
                    editandoVaga
                      ? setEditandoVaga({
                          ...editandoVaga,
                          titulo: e.target.value,
                        })
                      : setNovaVaga({ ...novaVaga, titulo: e.target.value })
                  }
                  className="h-10 border mt-1 rounded px-4 w-full bg-gray-50 shadow-sm text-gray-900"
                  placeholder="Ex: Desenvolvedor Full Stack"
                />
              </div>

              <div>
                <label htmlFor="area" className="text-gray-700 font-semibold">
                  Área
                </label>
                <input
                  type="text"
                  id="area"
                  value={(editandoVaga || novaVaga).area}
                  onChange={(e) =>
                    editandoVaga
                      ? setEditandoVaga({
                          ...editandoVaga,
                          area: e.target.value,
                        })
                      : setNovaVaga({ ...novaVaga, area: e.target.value })
                  }
                  className="h-10 border mt-1 rounded px-4 w-full bg-gray-50 shadow-sm text-gray-900"
                  placeholder="Ex: Tecnologia"
                />
              </div>

              <div>
                <label htmlFor="localizacao" className="text-gray-700 font-semibold">
                  Localização
                </label>
                <input
                  type="text"
                  id="localizacao"
                  value={(editandoVaga || novaVaga).localizacao}
                  onChange={(e) =>
                    editandoVaga
                      ? setEditandoVaga({
                          ...editandoVaga,
                          localizacao: e.target.value,
                        })
                      : setNovaVaga({
                          ...novaVaga,
                          localizacao: e.target.value,
                        })
                  }
                  className="h-10 border mt-1 rounded px-4 w-full bg-gray-50 shadow-sm text-gray-900"
                  placeholder="Ex: São Paulo"
                />
              </div>

              <div className="md:col-span-2">
                <label htmlFor="descricao" className="text-gray-700 font-semibold">
                  Descrição da Vaga
                </label>
                <textarea
                  id="descricao"
                  value={(editandoVaga || novaVaga).descricao}
                  onChange={(e) =>
                    editandoVaga
                      ? setEditandoVaga({
                          ...editandoVaga,
                          descricao: e.target.value,
                        })
                      : setNovaVaga({
                          ...novaVaga,
                          descricao: e.target.value,
                        })
                  }
                  className="h-32 border mt-1 rounded px-4 w-full bg-gray-50 shadow-sm py-2 text-gray-900"
                  placeholder="Descreva os requisitos e responsabilidades da vaga..."
                ></textarea>
              </div>

              <div className="md:col-span-2">
                <label htmlFor="responsabilidades" className="text-gray-700 font-semibold">
                  Responsabilidades
                </label>
                <textarea
                  id="responsabilidades"
                  value={(editandoVaga || novaVaga).responsabilidades}
                  onChange={(e) =>
                    editandoVaga
                      ? setEditandoVaga({
                          ...editandoVaga,
                          responsabilidades: e.target.value,
                        })
                      : setNovaVaga({
                          ...novaVaga,
                          responsabilidades: e.target.value,
                        })
                  }
                  className="h-32 border mt-1 rounded px-4 w-full bg-gray-50 shadow-sm py-2 text-gray-900"
                  placeholder="Liste as principais responsabilidades do cargo..."
                ></textarea>
              </div>

              <div className="md:col-span-2">
                <label htmlFor="requisitos" className="text-gray-700 font-semibold">
                  Requisitos
                </label>
                <textarea
                  id="requisitos"
                  value={(editandoVaga || novaVaga).requisitos}
                  onChange={(e) =>
                    editandoVaga
                      ? setEditandoVaga({
                          ...editandoVaga,
                          requisitos: e.target.value,
                        })
                      : setNovaVaga({
                          ...novaVaga,
                          requisitos: e.target.value,
                        })
                  }
                  className="h-32 border mt-1 rounded px-4 w-full bg-gray-50 shadow-sm py-2 text-gray-900"
                  placeholder="Liste os requisitos necessários para a vaga..."
                ></textarea>
              </div>

              <div className="md:col-span-2">
                      <label htmlFor="beneficios" className="text-gray-700 font-semibold">
                        Benefícios
                      </label>
                      <div className="flex items-center mb-2">
                        <input
                          type="checkbox"
                          id="bulletList"
                          checked={isBulletList}
                          onChange={() => setIsBulletList(!isBulletList)}
                          className="mr-2"
                        />
                        <label htmlFor="bulletList" className="text-gray-700">
                          Inserir como tópicos
                        </label>
                      </div>
                      <textarea
                        id="beneficios"
                        value={(editandoVaga || novaVaga).beneficios}
                        onChange={(e) => {
                          const value = e.target.value;
                          const lines = value.split('\n');
                          const formattedValue = lines.map((line, index) => {
                            if (isBulletList && line && !line.startsWith('• ')) {
                              return `• ${line}`;
                            }
                            return line;
                          }).join('\n');

                          if (editandoVaga) {
                            setEditandoVaga({
                              ...editandoVaga,
                              beneficios: formattedValue,
                            });
                          } else {
                            setNovaVaga({
                              ...novaVaga,
                              beneficios: formattedValue,
                            });
                          }
                        }}
                        className="h-32 border mt-1 rounded px-4 w-full bg-gray-50 shadow-sm py-2 text-gray-900"
                        placeholder="Liste os benefícios oferecidos..."
                      ></textarea>
                    </div>

              <div className="md:col-span-2">
                <label htmlFor="remuneracao" className="text-gray-700 font-semibold">
                  Remuneração
                </label>
                <input
                    type="text"
                    id="remuneracao"
                    value={(editandoVaga || novaVaga).remuneracao}
                    onFocus={(e) => {
                      if (!e.target.value.startsWith("R$")) {
                        e.target.value = "R$ " + e.target.value;
                      }
                    }}
                    onBlur={(e) => {
                      if (e.target.value === "R$ ") {
                        e.target.value = "";
                      }
                    }}
                    onChange={(e) =>
                      editandoVaga
                        ? setEditandoVaga({
                            ...editandoVaga,
                            remuneracao: e.target.value,
                          })
                        : setNovaVaga({
                            ...novaVaga,
                            remuneracao: e.target.value,
                          })
                    }
                    className="h-10 border mt-1 rounded px-4 w-full bg-gray-50 shadow-sm text-gray-900"
                    placeholder="Ex: R$ 5.000 - R$ 7.000"
                  />
              </div>

              <div className="md:col-span-2 text-right mt-4">
                <div className="inline-flex items-center">
                  
                  <button
                    type="button"
                    onClick={() => {
                      setEditandoVaga(null);
                      setIsModalOpen(false);
                    }}
                     className="px-6 py-2.5 bg-white-300 text-black border border-gray-200 rounded-md hover:bg-gray-200  hover:border-gray-400 font-medium text-base transition-colors border-gray-200 duration-200 flex items-center mr-4"
                  >
                    Cancelar
                    
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-blue-900 text-white rounded-md hover:bg-blue-800 font-medium text-base transition-colors duration-200 flex items-center"
                  >
                    
                    {editandoVaga ? "Salvar Alterações" : "Adicionar Vaga"}
                    <svg 
                  className="w-5 h-5 ml-2" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

