'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

const Dashboard = () => {
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get('access_token');
    if (!token) {
      router.replace('/');
      return;
    }
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    fetch(`${apiUrl}/auth/me`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    })
      .then(async (res) => {
        if (res.ok) {
          const user = await res.json();
          Cookies.set('role', user.role);

          if (user.role === 'nutricionista') {
            router.replace('/dashboard/nutricionista');
          } else {
            router.replace('/dashboard/paciente');
          }
        } else {
          Cookies.remove('access_token');
          Cookies.remove('role');
          router.replace('/');
        }
      })
      .catch((err) => {
        console.error('Erro ao verificar o usuário:', err);
        Cookies.remove('access_token');
        Cookies.remove('role');
        router.replace('/');
      });
  }, [router]);

  return <p>Carregando dashboard...</p>;
};

export default Dashboard;
