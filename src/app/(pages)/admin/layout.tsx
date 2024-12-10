'use client';

import React from 'react';
import SideBar from './components/SideBar/SideBar';
import { useState, useEffect } from 'react';
import Loading from '@/app/components/Loading/Loading';
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
        <div className="flex">
          <SideBar />
          <main className="flex-1 p-8">
            {children}
          </main>
        </div>
  );
}