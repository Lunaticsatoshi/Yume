'use client';

import EmptyOrg from './_components/EmptyOrg';

interface DashboardPageProps {
  searchParams: {
    search?: string;
    favourites?: string;
  };
}

export default function DashboardPage({ searchParams }: DashboardPageProps) {
  return (
    <div className="flex-1 justify-center items-center h-[calc(100%-80px)] p-6">
      <EmptyOrg />
    </div>
  );
}
