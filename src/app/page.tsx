'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import LoginPage from './auth/login/page';
import Dashboard from './dashboard/page';
import Cookies from 'js-cookie';

function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = Cookies.get('access_token');

      if (token) {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        fetch(`${apiUrl}/auth/me`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then(async (response) => {
            if (response.ok) {
              const data = await response.json();
              const role = data.role;
              Cookies.set('role', role, { expires: 10 });

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
