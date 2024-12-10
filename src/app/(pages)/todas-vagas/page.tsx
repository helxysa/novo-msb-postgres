import VagasManager from './components/VagasManager/VagasManager';
import { getVagas } from '../../actions/actions';
import { unstable_noStore as noStore } from 'next/cache';
import Loading from '@/app/components/Loading/Loading';
import { Suspense } from 'react';

export default async function ListaVagas() {
  noStore();
  const vagas = await getVagas();

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
    <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-4 hover:text-blue-700 transform hover:scale-105 transition-all duration-300 animate-slideDown">
          Vagas de Trabalho
        </h1>
        <h2 className="text-2xl md:text-3xl font-light text-gray-900 mb-8 hover:text-gray-700 transition-colors duration-300 animate-slideDown">
          MSB Tecnologia
        </h2>
        
      </div>
        
        <Suspense fallback={<Loading />}>
          <VagasManager initialVagas={vagas} />
        </Suspense>
      </div>
    </div>
  );
}