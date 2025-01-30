import { Vaga, Candidato, VagaGroup } from '@/app/types/types';
import { getTodasCandidaturas } from '@/app/actions/actions';
import { unstable_noStore as noStore } from 'next/cache';
import CandidatosView from './CandidatosViews';

async function TodosCandidatosPage() {
  try {
    noStore();
    
    let candidatosResponse;
    try {
      candidatosResponse = await getTodasCandidaturas();
      if (!candidatosResponse) {
        throw new Error('Não foi possível carregar os candidatos');
      }
    } catch (e) {
      console.error('Erro ao buscar candidatos:', e);
      throw e;
    }

    const vagasMap = new Map<string, VagaGroup>();

    candidatosResponse.forEach((candidato: Candidato) => {
      const vagaId = candidato.vagaId.toString();
      
      if (!vagasMap.has(vagaId)) {
        vagasMap.set(vagaId, {
          vaga: candidato.vaga,
          candidatos: []
        });
      }
      
      vagasMap.get(vagaId)?.candidatos.push(candidato);
    });

    const vagasArray = Array.from(vagasMap.values());
    console.log('Total de candidatos original:', candidatosResponse.length);
    console.log('Grupos de vagas antes do filtro:', vagasArray.length);

    const vagasArrayFinal = vagasArray
      .sort((a, b) => (a.vaga?.titulo || '').localeCompare(b.vaga?.titulo || ''));

    console.log('Grupos de vagas após processamento:', vagasArrayFinal.length);

    if (vagasArrayFinal.length === 0) {
      return <div className="text-center py-8">Nenhum candidato encontrado</div>;
    }

    return <CandidatosView vagasMap={vagasMap} vagasGroups={vagasArrayFinal} />;
    
  } catch (error) {
    console.error('Erro geral:', error);
    return (
      <div className="text-center py-8 text-red-600">
        Erro ao carregar candidatos. Por favor, tente novamente mais tarde.
      </div>
    );
  }
}

export default TodosCandidatosPage;