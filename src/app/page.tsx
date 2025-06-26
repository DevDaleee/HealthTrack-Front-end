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
        fetch('http://localhost:8000/auth/me', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then((response) => {
            if (response.ok) {
              setIsAuthenticated(true);
              router.push('/dashboard');
            } else {
              setIsAuthenticated(false);
              localStorage.removeItem('access_token'); 
              router.push('/auth/login');
            }
          })
          .catch((error) => {
            console.error('Error checking authentication:', error);
            setIsAuthenticated(false);
            router.push('/auth/login');
          });
      } else {
        setIsAuthenticated(false);
        router.push('/auth/login');
      }
    }
  }, [router]);

  if (isAuthenticated === null) {
    return (
      <div className="flex justify-center items-center h-screen w-screen">
        Loading...
      </div>
    );
  }

  return isAuthenticated ? <Dashboard /> : <LoginPage />;
}

export default Home;
