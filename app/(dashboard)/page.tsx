// app/(dashboard)/page.tsx

import prisma from '@/libb/prisma';
import DashboardClient from './DashboardClient';

// Esta página agora é o "chefe": só busca os dados e manda para o cliente.
export default async function DashboardPage() {
  
  // Busca os posts do banco de dados de forma segura no servidor.
  const posts = await prisma.post.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });

  // Renderiza o componente de cliente e entrega os 'posts' para ele.
  return <DashboardClient posts={posts} />;
}