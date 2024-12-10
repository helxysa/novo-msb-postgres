"use client"
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getVagaById } from '@/app/actions/actions';
import Link from 'next/link';
// import ShareButton from '@/app/components/ShareButton/ShareButton';

interface Vaga {
  id: string;
  titulo: string;
  area: string;
  descricao: string;
  localizacao: string;
  requisitos: string;
  responsabilidades: string;
  beneficios: string;
  remuneracao: string;
}

export default function VagaDetalhesClient({ 
  id
}: { 
  id: string 
}) {
  const [vaga, setVaga] = useState<Vaga | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchVaga = async () => {
      try {
        const cachedData = localStorage.getItem(`vaga_${id}`);
        if (cachedData) {
          console.log("Vaga encontrada no cache")
          setVaga(JSON.parse(cachedData));
          setLoading(false);
          
          refreshVagaData(id);
          return;
        }
  
        console.log("Vaga não encontrada no cache, buscando na API")
        const vagaData = await getVagaById(id);
  
        if (vagaData) {
          localStorage.setItem(`vaga_${id}`, JSON.stringify(vagaData));
          setVaga(vagaData);
        } else {
          setError('Vaga não encontrada');
          router.push('/vagas');
        }
      } catch (error) {
        setError('Erro ao carregar a vaga');
        console.error('Erro:', error);
      } finally {
        setLoading(false);
      }
    };
  
    const refreshVagaData = async (vagaId: string) => {
      try {
        const vagaData = await getVagaById(vagaId);
  
        if (vagaData) {
          localStorage.setItem(`vaga_${vagaId}`, JSON.stringify(vagaData));
          setVaga(vagaData);
        }
      } catch (error) {
        console.error('Erro na atualização em background:', error);
      }
    };
  
    fetchVaga();
  }, [id, router]);
  if (loading) {
    return <div className="container mx-auto px-4 py-8">Carregando...</div>;
  }

  if (!vaga) {
    router.push('/vagas/');
    return null;
  }

  return (
    <div className="bg-gray-100 min-h-screen pt-[8px] md:pt-0">
      <nav className="bg-white border-b ">
        <div className="container mx-auto px-4 py-3">
          <ol className="list-none p-0 inline-flex">
            <li className="flex items-center">
              <Link href="/todas-vagas/" prefetch={true}
            shallow={true} className="text-blue-600 hover:text-blue-800">
                Vagas
              </Link>
              <svg className="fill-current w-3 h-3 mx-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                <path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z" />
              </svg>
            </li>
            <li>
              <span className="text-gray-500">{vaga.titulo}</span>
            </li>
          </ol>
        </div>
      </nav>
    
    
    
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6 sm:py-8 md:py-10 lg:py-12">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
            <div className="h-12 w-12 sm:h-16 sm:w-16 bg-blue-100 rounded-xl flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 text-blue-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap gap-2 mb-2">
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs sm:text-sm font-medium">Novo</span>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs sm:text-sm font-medium">CLT</span>
              </div>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-2">{vaga.titulo}</h1>
              <div className="flex flex-wrap gap-4 text-gray-700">
                
                <div className="flex items-center gap-2">
                  <i className="fas fa-map-marker-alt"></i>
                  <span className="text-sm sm:text-base">{vaga.localizacao}</span>
                </div>
                
              </div>
            </div>
            <Link href={`/candidato/${vaga.id}`} prefetch={true}
            shallow={true}  className="w-full sm:w-auto bg-blue-700 hover:bg-blue-800 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-lg font-semibold transition duration-200 text-sm sm:text-base text-center">
              Candidatar-se
            </Link>
            {/* <ShareButton id={vaga.id} titulo={vaga.titulo} descricao={vaga.descricao} /> */}
          </div>
        </div>
      </div>
    
      <div className="container mx-auto px-4 py-6 sm:py-8 md:py-10 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 mb-6">
            {vaga.descricao && (
                <>
                  <h2 className="text-lg sm:text-xl font-semibold mb-4 text-gray-900">Descrição da Vaga</h2>
                  <p className="text-gray-700 mb-6 text-sm sm:text-base">{vaga.descricao}</p>
                </>
              )}
              
              {vaga.responsabilidades && (
                <>
                  <h3 className="font-semibold mb-3 text-gray-800">Responsabilidades:</h3>
                  <p className="text-gray-700 mb-6 text-sm sm:text-base">{vaga.responsabilidades}</p>
                </>
              )}
    
          {vaga.requisitos && (
                <>
                  <h3 className="font-semibold mb-3 text-gray-800">Requisitos:</h3>
                  <ul className="text-gray-700 text-sm sm:text-base ml-3 mb-3">
                    {vaga.requisitos.split('•').filter((requisito: string) => requisito.trim() !== '').map((requisito: string, index: number) => (
                      <li key={index}>{requisito.trim().startsWith('•') ? requisito.trim() : `• ${requisito.trim()}`}</li>
                    ))}
                  </ul>
                </>
              )}
    
            {vaga.beneficios && (
                <>
                  <h3 className="font-semibold mb-3 text-gray-800">Benefícios:</h3>
                  <ul className="text-gray-700 text-sm sm:text-base ml-3 mb-3">
                    {vaga.beneficios.split('•').filter((beneficio: string) => beneficio.trim() !== '').map((beneficio: string, index: number) => (
                      <li key={index}>• {beneficio.trim()}</li>
                    ))}
                  </ul>
                </>
              )}
              
              {vaga.remuneracao && (
                <>
                  <h3 className="font-semibold mb-3  text-gray-800">Remuneração:</h3>
                  <p className="text-gray-700 text-sm sm:text-base">{vaga.remuneracao}</p>
                </>
              )}
            </div>
    
            <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
              <h2 className="text-lg sm:text-xl font-semibold mb-4 text-gray-900">Área Relacionada</h2>
              <div className="flex flex-wrap gap-2">
                <span className="bg-blue-50 text-blue-800 px-3 sm:px-4 py-1 sm:py-2 rounded-lg text-xs sm:text-sm">{vaga.area}</span>
              </div>
            </div>
          </div>
    
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
              <h2 className="text-lg sm:text-xl font-semibold mb-4 text-gray-900">Sobre a Empresa</h2>
              <p className="text-gray-700 mb-4 text-sm sm:text-base">
                Informações sobre a empresa não disponíveis.
              </p>
              <div className="flex flex-col gap-3 text-gray-700">
                <div className="flex items-center gap-2">
                  <i className="fas fa-map-marker-alt w-5"></i>
                  <span className="text-sm sm:text-base">{vaga.localizacao}</span>
                </div>
              </div>
            </div>
    
            <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
              <h2 className="text-lg sm:text-xl font-semibold mb-4 text-gray-900">Como se Candidatar</h2>
              <div className="space-y-4">
                <p className="text-gray-700 text-sm sm:text-base">
                  Clique no botão "Candidatar-se" e preencha o formulário com suas informações.
                </p>
                <Link href={`/candidato/${vaga.id}`}  prefetch={true}
            shallow={true} className="block w-full bg-blue-700 hover:bg-blue-800 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold transition duration-200 text-sm sm:text-base text-center">
                  Candidatar-se Agora
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    );
}

export async function generateMetadata({ 
  searchParams 
}: { 
  searchParams: { data: string }
}) {
  try {
    const params = await searchParams;
    const data = params?.data;
    const vaga = data ? await JSON.parse(data) : null;
    
    return {
      title: vaga ? `Vaga: ${vaga.titulo}` : 'Vaga não encontrada',
    };
  } catch (error) {
    return {
      title: 'Erro ao carregar vaga',
    };
  }
}