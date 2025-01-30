"use client";

import { useEffect } from 'react';
import Link from 'next/link'

interface Vaga {
    id: number
    titulo: string
    localizacao: string
    descricao: string
    responsabilidades: string
    requisitos: string
    beneficios: string
    remuneracao: string
    area: string
}

interface Candidato {
    id: number
    nome: string
    cpf: string
    email: string
    telefone: string
    informacoesAdicionais?: string
    linkCurriculo?: string
    curriculoPdf?: string
    createdAt: string
    updatedAt: string
    vagaId: number
    aceitouTermos: boolean
    status: 'pendente' | 'em_analise' | 'entrevista' | 'aprovado' | 'reprovado' | 'banco_talentos'
    vaga?: Vaga
}

interface CandidatoCardProps {
    candidato: Candidato;
    vaga?: Vaga;
}
  
export function CandidatoCard({ candidato, vaga }: CandidatoCardProps) {
   

    const status = candidato.status || 'em_analise';

    const statusColors = {
      em_analise: 'bg-yellow-100 text-yellow-800',
      entrevista: 'bg-blue-100 text-blue-800',
      aprovado: 'bg-green-100 text-green-800',
      reprovado: 'bg-red-100 text-red-800',
      banco_talentos: 'bg-purple-100 text-purple-800'
    }
  
    const statusTexts = {
      pendente: 'Pendente',
      em_analise: 'Em Análise',
      entrevista: 'Entrevista',
      aprovado: 'Aprovado',
      reprovado: 'Reprovado',
      banco_talentos: 'Banco de Talentos'
    }

    const statusIcons = {
      em_analise: (
        <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      entrevista: (
        <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      aprovado: (
        <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
        </svg>
      ),
      reprovado: (
        <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      ),
      banco_talentos: (
        <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
        </svg>
      )
    }

    const statusSteps = [
      'em_analise',
      'entrevista',
      'aprovado'
    ];

    const getProgressWidth = () => {
      switch (status) {
        case 'em_analise':
          return '33%';
        case 'entrevista':
          return '66%';
        case 'aprovado':
          return '100%';
        case 'reprovado':
          return '100%';
        case 'banco_talentos':
          return '100%';
        default:
          return '33%';
      }
    };

    const getProgressColor = () => {
      switch (status) {
        case 'em_analise':
          return 'bg-yellow-500';
        case 'entrevista':
          return 'bg-blue-500';
        case 'aprovado':
          return 'bg-green-500';
        case 'reprovado':
          return 'bg-red-500';
        case 'banco_talentos':
          return 'bg-purple-500';
        default:
          return 'bg-yellow-500';
      }
    };

    const getStepStyle = (step: string) => {
      const currentIndex = statusSteps.indexOf(status);
      const stepIndex = statusSteps.indexOf(step);

      if (status === 'reprovado') {
        return 'text-red-600 font-medium';
      }
      if (status === 'banco_talentos') {
        return 'text-purple-600 font-medium';
      }
      if (stepIndex === currentIndex) {
        return 'font-medium ' + {
          pendente: 'text-gray-600',
          em_analise: 'text-yellow-600',
          entrevista: 'text-blue-600',
          aprovado: 'text-green-600',
        }[status];
      }
      if (stepIndex < currentIndex) {
        return 'text-gray-600';
      }
      return 'text-gray-400';
    };
  
    return (
      <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-semibold text-gray-800">{candidato.nome}</h3>
            <p className="text-sm text-gray-600 mt-1">
              Vaga: {candidato.vagaId 
                ? (vaga?.titulo || "Vaga Excluída pelo Sistema")
                : "Sem vaga específica"
              }
            </p>
          </div>
        </div>
  
        <div className="space-y-2 text-gray-600">
          <p className="flex items-center">
            <span className="font-medium mr-2">Email:</span>
            {candidato.email}
          </p>
          <p className="flex items-center">
            <span className="font-medium mr-2">Telefone:</span>
            {candidato.telefone}
          </p>
          {candidato.informacoesAdicionais && (
            <p className="flex items-center">
              <span className="font-medium mr-2">Informações Adicionais:</span>
              {candidato.informacoesAdicionais}
            </p>
          )}

          <div className="flex gap-2">
            <Link 
              href={`/admin/candidato/${candidato.id}`}
              className="text-blue-600 hover:text-blue-800 flex items-center mt-2"
            >
              Ver mais detalhes
            </Link>
          </div>

          <div className="mt-4 space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Status atual:</span>
              <span className={`font-medium ${
                status === 'reprovado' ? 'text-red-600' :
                status === 'banco_talentos' ? 'text-purple-600' :
                status === 'aprovado' ? 'text-green-600' :
                status === 'entrevista' ? 'text-blue-600' :
                'text-yellow-600'
              }`}>
                {statusTexts[status]}
              </span>
            </div>

            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className={`h-full ${getProgressColor()} transition-all duration-500 ease-in-out`}
                style={{ width: getProgressWidth() }}
              />
            </div>

            {status === 'reprovado' ? (
              <div className="text-center text-sm text-red-600 font-medium">
                Candidatura não aprovada
              </div>
            ) : status === 'banco_talentos' ? (
              <div className="text-center text-sm text-purple-600 font-medium">
                Adicionado ao banco de talentos
              </div>
            ) : (
              <div className="flex justify-between text-xs">
                <span className={getStepStyle('em_analise')}>Em Análise</span>
                <span className={getStepStyle('entrevista')}>Entrevista</span>
                <span className={getStepStyle('aprovado')}>Aprovação</span>
              </div>
            )}
          </div>

          {candidato.createdAt && (
            <p className="text-sm text-gray-500 mt-4">
              Candidatura realizada em: {new Date(candidato.createdAt).toLocaleDateString('pt-BR')}
            </p>
          )}

          <div className="mt-6 flex justify-end border-t pt-4">
            <Link 
              href={`/admin/candidato/${candidato.id}`}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors duration-200 ease-in-out shadow-sm"
            >
              Ver Detalhes
              <svg 
                className="ml-2 w-4 h-4" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2" 
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    )
}