'use client';

import { useEffect, useState } from 'react';
import { BookOpenCheck } from 'lucide-react';
import Cookies from 'js-cookie';
import { User } from '@/models/user.model';
import { useRouter } from 'next/navigation';

interface Recomendacao {
  titulo: string;
  descricao: string;
}

const mockRecomendacoes: Recomendacao[] = [
  {
    titulo: 'Diabetes Tipo 2',
    descricao:
      'Verifique seu risco de desenvolver diabetes tipo 2 com este questionário.',
  },
];

export default function PacienteDashboard() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get('access_token');
    if (!token) return;

    fetch('http://localhost:8000/auth/me', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    })
      .then(async (res) => {
        if (res.ok) {
          const data: User = await res.json();
          setUser(data);
        } else {
          setUser(null);
          Cookies.remove('access_token');
        }
      })
      .catch((err) => {
        console.error('Erro ao buscar usuário:', err);
        setUser(null);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-semibold flex items-center gap-2">
          Olá, {user?.username ?? 'Paciente'}!
          <BookOpenCheck className="text-gray-700 w-5 h-5" />
        </h1>

        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Buscar..."
            className="p-2 border border-gray-300 rounded-md"
          />
          <button className="bg-[#0985AE] text-white px-4 py-2 rounded-md hover:opacity-90">
            Buscar
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
        {mockRecomendacoes.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow p-4 flex flex-col justify-between"
          >
            <div>
              <h2 className="font-semibold text-lg text-gray-800 mb-2">
                {item.titulo}
              </h2>
              <p className="text-sm text-gray-600 mb-4">{item.descricao}</p>
            </div>
            <button
              className="bg-[#0985AE] text-white px-4 py-1 rounded hover:bg-lime-600 w-fit"
              onClick={() => {
                if (user?.id) {
                  Cookies.set('quiz_user_id', String(user.id), {
                    expires: 0.01,
                  });
                  router.push('/quizzes/diabetes');
                }
              }}
            >
              Iniciar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
