'use client';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const Dashboard = () => {
  const router = useRouter();

  useEffect(() => {
    const role = localStorage.getItem('user_role');
    if (role === 'nutricionista') {
      router.replace('/dashboard/nutricionista');
    } else {
      router.replace('/dashboard/paciente');
    }
  }, [router]);

  return <p>Carregando dashboard...</p>;
};

export default Dashboard;
