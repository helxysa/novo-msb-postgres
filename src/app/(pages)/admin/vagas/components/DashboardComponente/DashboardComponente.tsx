'use client'
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Loading from '@/app/components/Loading/Loading';
import { getVagas, getCandidatos } from '@/app/actions/actions';
import { Vaga } from '@/app/types/types';

interface Candidato {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  vagaId: string;
}

function TotalVagasCard({ vagas }: { vagas: Vaga[] }) {
  return (
    <Link href="/admin/vaga" className="block">
      <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-semibold text-gray-700">Total de Vagas</h2>
          <div className="bg-green-200 rounded-full p-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
        </div>
        <p className="text-4xl font-bold text-gray-900">{vagas?.length || 0}</p>
      </div>
    </Link>
  );
}

function TotalCandidatosCard({ candidatos }: { candidatos: Candidato[] }) {
  return (
    <Link href="/admin/todos-candidatos" className="block">
      <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-semibold text-gray-700">Total de Candidatos</h2>
          <div className="bg-green-200 rounded-full p-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
        </div>
        <p className="text-4xl font-bold text-gray-900">{candidatos.length}</p>
      </div>
    </Link>
  );
}

function UltimasVagas({ vagas }: { vagas: Vaga[] }) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold text-gray-800">Últimas Vagas</h2>
        <div className="bg-blue-200 rounded-full p-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
      </div>
      {vagas?.length > 0 ? (
        <ul className="space-y-3">
          {vagas.slice(0, 5).map((vaga, index) => (
            <li key={`vaga-${vaga.id || index}`} className="flex items-center">
              <div className="w-3 h-3 bg-blue-600 rounded-full mr-3"></div>
              <span className="text-base text-gray-700">{vaga.titulo}</span>
            </li>
          ))}
        </ul>
      ) : (
        <div className="text-center py-8 text-gray-500">
          <p>Nenhuma vaga cadastrada</p>
        </div>
      )}
    </div>
  );
}

function UltimosCandidatos({ candidatos }: { candidatos: Candidato[] }) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold text-gray-800">Últimos Candidatos</h2>
        <div className="bg-green-200 rounded-full p-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </div>
      </div>
      {candidatos?.length > 0 ? (
        <ul className="space-y-3">
          {candidatos.slice(0, 5).map((candidato, index) => (
            <li key={`candidato-${candidato.id || index}`} className="flex items-center">
              <div className="w-3 h-3 bg-green-600 rounded-full mr-3"></div>
              <span className="text-base text-gray-700">{candidato.nome}</span>
            </li>
          ))}
        </ul>
      ) : (
        <div className="text-center py-8 text-gray-500">
          <p>Nenhum candidato registrado</p>
        </div>
      )}
    </div>
  );
}

function CandidaturasPorVaga({ vagas, candidatos }: { vagas: Vaga[], candidatos: Candidato[] }) {
  const vagasComCandidatos = vagas.map(vaga => ({
    id: vaga.id,
    titulo: vaga.titulo,
    candidaturas: candidatos.filter(c => c.vagaId === vaga.id).length
  })).sort((a, b) => b.candidaturas - a.candidaturas);

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Candidaturas por Vaga</h2>
      {vagasComCandidatos.length > 0 ? (
        <div className="flex items-end justify-around h-48 space-x-4">
          {vagasComCandidatos.slice(0, 5).map((vaga, index) => {
            const maxCandidaturas = Math.max(...vagasComCandidatos.map(v => v.candidaturas));
            const altura = vaga.candidaturas > 0 
              ? ((vaga.candidaturas / maxCandidaturas) * 80)
              : 0;
            
            return (
              <div key={`grafico-vaga-${vaga.id || index}`} className="flex flex-col items-center w-1/6">
                <div className="relative w-full mb-2" style={{ height: '150px' }}>
                  <div 
                    className="bg-blue-600 text-gray-900 rounded-t-lg w-full absolute bottom-0 transition-all duration-500"
                    style={{ 
                      height: `${altura}px`,
                    }}
                  >
                    <span className="absolute -top-6 text-gray-900 left-1/2 transform -translate-x-1/2 text-sm font-semibold">
                      {vaga.candidaturas}
                    </span>
                  </div>
                </div>
                <span className="text-sm text-gray-700 text-center font-medium w-full truncate px-2" title={vaga.titulo}>
                  {vaga.titulo}
                </span>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          <p>Nenhuma candidatura registrada</p>
        </div>
      )}
    </div>
  );
}

export default function Dashboard() {
  const [vagas, setVagas] = useState<Vaga[]>([]);
  const [candidatos, setCandidatos] = useState<Candidato[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [vagasData, candidatosData] = await Promise.all([
          getVagas(),
          getCandidatos()
        ]);
        setVagas(vagasData);
        setCandidatos(candidatosData);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="container mx-auto px-4 py-8 pt-[70px]">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">Dashboard Administrativo</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <TotalVagasCard vagas={vagas} />
        <TotalCandidatosCard candidatos={candidatos} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <UltimasVagas vagas={vagas} />
        <UltimosCandidatos candidatos={candidatos} />
      </div>

      <CandidaturasPorVaga vagas={vagas} candidatos={candidatos} />
    </div>
  );
}