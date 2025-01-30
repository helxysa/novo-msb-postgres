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

