"use client"
import { useState, useEffect } from 'react';
import { CandidatoCard } from './CandidatoCard';
import { useRouter } from 'next/navigation';
import Loading from '@/app/components/Loading/Loading';
import { Vaga, Candidato, VagaGroup } from '@/app/types/types';

export interface CandidatosViewProps {
  vagasMap: Map<string, VagaGroup>;
  vagasGroups: VagaGroup[];
}

export default function CandidatosView({ vagasMap, vagasGroups }: CandidatosViewProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [filtroVagaId, setFiltroVagaId] = useState<string | null>(null);
  const [itensPorPagina, setItensPorPagina] = useState(3);
  const [paginaAtual, setPaginaAtual] = useState(1);
  
  const todosCandidatos = vagasGroups.flatMap(group => group.candidatos);

  const isVagaExcluida = (candidato: Candidato) => {
    return candidato.vagaId && !candidato.vaga;
  };

  const candidatosFiltrados = filtroVagaId === null
    ? todosCandidatos.filter(candidato => !isVagaExcluida(candidato))
    : filtroVagaId === 'vagas_excluidas'
    ? todosCandidatos.filter(candidato => isVagaExcluida(candidato))
    : todosCandidatos.filter(candidato => candidato.vagaId.toString() === filtroVagaId);

  const indexInicial = (paginaAtual - 1) * itensPorPagina;
  const indexFinal = indexInicial + itensPorPagina;
  const candidatosPaginados = candidatosFiltrados.slice(indexInicial, indexFinal);

  // Contadores para os botões
  const totalCandidaturasAtivas = todosCandidatos.filter(c => !isVagaExcluida(c)).length;
  const totalVagasExcluidas = todosCandidatos.filter(c => isVagaExcluida(c)).length;

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        await router.refresh();
      } finally {
        setTimeout(() => {
          setIsLoading(false);
        }, 300);
      }
    };

    loadData();
  }, [router]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">Lista de Candidatos</h1>

      {/* Filtros */}
      <div className="flex flex-wrap gap-4 mb-8">
        {/* Botão para todas candidaturas ativas */}
        <button
          onClick={() => setFiltroVagaId(null)}
          className={`px-6 py-2 rounded-full transition-all shadow-sm
            ${!filtroVagaId ? 'bg-blue-500 text-white' : 'bg-white text-gray-800 hover:bg-blue-500 hover:text-white'}`}
        >
          Todas Candidaturas Ativas ({totalCandidaturasAtivas})
        </button>

        {/* Botão para vagas excluídas */}
        <button
          onClick={() => setFiltroVagaId('vagas_excluidas')}
          className={`px-6 py-2 rounded-full transition-all shadow-sm
            ${filtroVagaId === 'vagas_excluidas' ? 'bg-blue-500 text-white' : 'bg-white text-gray-800 hover:bg-blue-500 hover:text-white'}`}
        >
          Vagas Excluídas ({totalVagasExcluidas})
        </button>

        {/* Botões para vagas específicas */}
        {vagasGroups
          .filter(group => group.vaga && group.candidatos.length > 0)
          .map((vagaGroup) => (
            <button
              key={vagaGroup.vaga?.id}
              onClick={() => setFiltroVagaId(vagaGroup.vaga?.id.toString() || null)}
              className={`px-6 py-2 rounded-full transition-all shadow-sm
                ${filtroVagaId === vagaGroup.vaga?.id.toString() ? 'bg-blue-500 text-white' : 'bg-white text-gray-800 hover:bg-blue-500 hover:text-white'}`}
            >
              {vagaGroup.vaga?.titulo} ({vagaGroup.candidatos.length})
            </button>
          ))}
      </div>

      {/* Grid de candidatos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {candidatosPaginados.map((candidato) => (
          <CandidatoCard 
            key={candidato.id} 
            candidato={candidato} 
            vaga={candidato.vaga}
          />
        ))}
      </div>

      {/* Seletor de itens por página */}
      <div className="flex items-center gap-2 mt-8">
        <span className="text-gray-600">Mostrar:</span>
        <select
          value={itensPorPagina}
          onChange={(e) => setItensPorPagina(Number(e.target.value))}
          className="border rounded-md px-2 py-1 text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value={3}>3</option>
          <option value={6}>6</option>
          <option value={9}>9</option>
        </select>
        <span className="text-gray-600">por página</span>
      </div>
    </div>
  );
} 