'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import LoginPage from './auth/login/page';
import Dashboard from './dashboard/page';

function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('access_token');

      if (token) {
        setIsAuthenticated(true);
        router.push('/dashboard');
      } else {
        setIsAuthenticated(false);
        router.push('/auth/login');
      }
    }
  }, [router]);

  if (isAuthenticated === null) {
    return (
      <div className="flex justify-center items-center h-screen w-screen">
        Carregando...
      </div>
    );
  }

  return isAuthenticated ? <Dashboard /> : <LoginPage />;
}

export default Home;
