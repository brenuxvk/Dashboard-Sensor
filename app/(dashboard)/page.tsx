// app/page.tsx

// --- IMPORTS DO DASHBOARD ---
import DashboardPageLayout from "@/components/dashboard/layout";
import DashboardStat from "@/components/dashboard/stat";
import DashboardChart from "@/components/dashboard/chart";
import RebelsRanking from "@/components/dashboard/rebels-ranking";
import SecurityStatus from "@/components/dashboard/security-status";
import BracketsIcon from "@/components/icons/brackets";
import GearIcon from "@/components/icons/gear";
import ProcessorIcon from "@/components/icons/proccesor";
import BoomIcon from "@/components/icons/boom";
import mockDataJson from "@/mock.json";
import type { MockData } from "@/types/dashboard";

// --- NOSSO IMPORT DO PRISMA ---
import prisma from '@/lib/libb/prisma';
export const dynamic = 'force-dynamic';
const mockData = mockDataJson as MockData;

// Icon mapping
const iconMap = {
  gear: GearIcon,
  proccesor: ProcessorIcon,
  boom: BoomIcon,
};

// Tornamos o componente 'async' para poder buscar dados
export default async function DashboardPage() {
  // AQUI BUSCAMOS OS POSTS REAIS DO BANCO DE DADOS
  const posts = await prisma.post.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });

  return (
    <DashboardPageLayout
      header={{
        title: "Overview",
        description: "Last updated 12:05",
        icon: BracketsIcon,
      }}
    >
      {/* --- SEÇÃO ORIGINAL COM DADOS MOCKADOS (MANTIDA IGUAL) --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {mockData.dashboardStats.map((stat, index) => (
          <DashboardStat
            key={index}
            label={stat.label}
            value={stat.value}
            description={stat.description}
            icon={iconMap[stat.icon as keyof typeof iconMap]}
            tag={stat.tag}
            intent={stat.intent}
            direction={stat.direction}
          />
        ))}
      </div>

      <div className="mb-6">
        <DashboardChart />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <RebelsRanking rebels={mockData.rebelsRanking} />
        <SecurityStatus statuses={mockData.securityStatus} />
      </div>

      {/* --- NOVA SEÇÃO COM DADOS REAIS DO BANCO DE DADOS --- */}
      <div className="mt-8 border-t pt-6">
        <h2 className="text-xl font-semibold mb-4">Posts do Banco de Dados</h2>
        <div className="grid grid-cols-1 gap-4">
          {posts.length > 0 ? (
            posts.map((post) => (
              <div key={post.id} className="p-4 border rounded-lg shadow-sm">
                <h3 className="font-bold text-lg">{post.title}</h3>
                <p>{post.content}</p>
              </div>
            ))
          ) : (
            <p>Nenhum post encontrado no banco de dados.</p>
          )}
        </div>
      </div>

    </DashboardPageLayout>
  );
}