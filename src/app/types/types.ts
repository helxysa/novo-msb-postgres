export interface Vaga {
    id?: string;
    titulo: string;
    localizacao: string;
    descricao: string;
    responsabilidades: string;
    requisitos: string;
    beneficios: string;
    remuneracao: string;
    area: string;
  }

export interface Candidato {
    id?: string;
    nome: string;
    email: string;
    telefone: string;
    cpf: string;
    informacoesAdicionais: string;
    linkCurriculo: string;
    aceitouTermos: boolean;
    curriculo?: File;
    vagaId: number;
  }

