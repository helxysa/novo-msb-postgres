export interface Vaga {
  id: number
  titulo: string
  localizacao: string
  descricao: string
  responsabilidades: string
  requisitos: string
  beneficios: string
  remuneracao: string
  area: string
  createdAt: string
  updatedAt: string
}

export interface Candidato {
  id: number
  nome: string
  cpf: string
  email: string
  telefone: string
  informacoesAdicionais?: string
  linkCurriculo?: string
  curriculoPdf?: string
  vagaId: number
  aceitouTermos: boolean
  status: 'pendente' | 'em_analise' | 'entrevista' | 'aprovado' | 'reprovado' | 'banco_talentos'
  createdAt: string
  updatedAt: string
  vaga?: Vaga
}

export interface VagaGroup {
  vaga?: Vaga
  candidatos: Candidato[]
}

export interface AtaFormData {
  numero: string;
  validade: number;
  objeto: string;
  valor_total: number;
  outras_informacoes: {
    lista_de_arquivos: {
      nome: string;
      arquivo: string;
    }[];
    descricao_para_obter_ata: string;
  };
  itens: {
    item: string;
    especificacoes: string;
    unidade_referencia: string;
    quantidade: number;
    preco_unitario: number;
    preco_total: number;
  }[];
}

export interface Ata {
  id?: string
  numero: string
  validade: number
  objeto: string
  valor_total: number
  outras_informacoes?: string | null
  itens?: string[] | null
  arquivo?: string | null
  data_criacao: string
  created_at?: string
  updated_at?: string
}

