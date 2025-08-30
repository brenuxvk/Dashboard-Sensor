// // app/(dashboard)/page.tsx

// import prisma from '@/libb/prisma';
// import DashboardClient from './DashboardClient';

// // Esta página agora é o "chefe": só busca os dados e manda para o cliente.
// export default async function DashboardPage() {
  
//   // Busca os posts do banco de dados de forma segura no servidor.
//   const posts = await prisma.post.findMany({
//     orderBy: {
//       createdAt: 'desc',
//     },
//   });

//   // Renderiza o componente de cliente e entrega os 'posts' para ele.
//   return <DashboardClient posts={posts} />;
// }


// app/(dashboard)/page.tsx

import prisma from '@/libb/prisma';
import Link from 'next/link';

// Forçamos a página a ser dinâmica para garantir que o cache não seja o problema.
export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  // Vamos confirmar que a busca de dados em si não é o problema.
  const posts = await prisma.post.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });

  return (
    <div style={{ padding: '40px', color: 'white' }}>
      <h1>Página de Teste do Dashboard</h1>
      <p>Se você está vendo isso, o build da página base funcionou.</p>

      <h2 style={{ marginTop: '20px' }}>Posts do Banco de Dados:</h2>
      <p>Encontrados {posts.length} posts.</p>

      <ul>
        {posts.map(post => (
          <li key={post.id}>
            <Link href={`/posts/${post.id}`} style={{ color: 'lightblue' }}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}