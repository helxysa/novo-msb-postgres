import { Metadata } from 'next';
import VagaDetalhesClient from './components/VagaDetalhesClient/VagaDetalhesClient';

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function VagaDetalhes({ params }: PageProps) {
  const { id } = await params;

  return <VagaDetalhesClient id={id} />;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;

  return {
    title: `Detalhes da Vaga`,
  };
}