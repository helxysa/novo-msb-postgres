import axios, { AxiosError } from 'axios';
import { Vaga, Candidato, Ata } from '../types/types';
export const api = axios.create({
    baseURL: 'http://localhost:3333/',
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json'
    }
});

export async function getAtas(){
    try {   
        const response = await api.get('/atas')
        return response.data
    } catch (error) {
        console.error('Erro ao buscar dados:', error)
        throw error
    }

}

export async function deleteAta(id: string) {
    try {
        await api.delete(`/atas/${id}`);
    } catch (error) {
        console.error('Erro ao deletar ata:', error)
        throw error
    }
}

export async function updateAta(id: string, ata: Ata) {
    try {
        const response = await api.put(`/atas/${id}`, ata);
        return response.data;
    } catch (error) {
        console.error('Erro ao atualizar ata:', error)
        throw error
    }
}

export const createAta = async (formData: FormData) => {
    try {
        const response = await api.post('/atas', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        return response.data
    } catch (error) {
        throw error
    }
}

export async function getTodasCandidaturas(){
    try {
        const response = await api.get('/candidaturas')
        return response.data
    } catch (error) {
        throw error
    }
}

export async function getAtaById(id: string) {
    try {
        const response = await api.get(`/atas/${id}`);
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar ata:', error)
        throw error
    }
}

export async function getVagas(){
    try {   
        const response = await api.get('/vagas')
        return response.data
    } catch (error) {
        console.error('Erro ao buscar dados:', error)
        throw error
    }
}

export async function getVagaById(id: string) {
    try {   
        const response = await api.get(`/vagas/${id}`);
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar dados:', error)
        throw error
    }
}


export async function createVaga(vaga: Omit<Vaga, "id">) {
    try {
        const response = await api.post('/vagas', vaga);
        return response.data;
    } catch (error) {
        console.error('Erro ao criar vaga:', error)
        throw error
    }
}

export async function updateVaga(id: string, vaga: Vaga) {  
    try {
        const response = await api.put(`/vagas/${id}`, vaga);
        return response.data;
    } catch (error) {
        console.error('Erro ao atualizar vaga:', error)
        throw error
    }
}

export async function deleteVaga(id: string) {
    try {
        await api.delete(`/vagas/${id}`);
    } catch (error) {
        console.error('Erro ao deletar vaga:', error)
        throw error
    }
}


export async function getCandidatos() {
    try {
        const response = await api.get('/candidaturas');
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar candidatos:', error);
        throw error;
    }
}

export async function createCandidato(candidatoData: any, arquivo: File | null) {
    const formData = new FormData();
    
    formData.append('data', JSON.stringify(candidatoData));
    
    if (arquivo) {
        formData.append('curriculo', arquivo);
    }

    try {
        const response = await api.post('/candidaturas', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        if (!response.data) {
            throw new Error('Erro ao criar candidatura');
        }

        return response.data;
    } catch (error) {
        if (error instanceof AxiosError) {
            console.error('Erro detalhado:', {
                response: error.response?.data,
                status: error.response?.status
            });
            throw new Error(error.response?.data?.message || 'Erro ao criar candidatura');
        }
        throw error;
    }
}
