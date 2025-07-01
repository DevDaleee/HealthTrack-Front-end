'use client';

import { useEffect, useState } from 'react';
import { LogOut, UserCog } from 'lucide-react';
import Link from 'next/link';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { User } from '@/models/user.model';

interface Paciente {
  username: string;
  email: string;
  id: number;
  role: string;
}

export default function NutricionistaDashboard() {
  const router = useRouter();
  const [nomeUsuario, setNomeUsuario] = useState('Carregando...');
  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [busca, setBusca] = useState('');

  useEffect(() => {
    const token = Cookies.get('access_token');
    const role = Cookies.get('role');

    // Proteção da rota: redireciona se não for nutricionista
    if (!token || role !== 'nutricionista') {
      Cookies.remove('access_token');
      Cookies.remove('role');
      router.replace('/');
      return;
    }

    // Buscar nome do nutricionista
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
          setNomeUsuario(data.username);
        } else {
          setNomeUsuario('Desconhecido');
          Cookies.remove('access_token');
          Cookies.remove('role');
          router.replace('/');
        }
      })
      .catch((err) => {
        console.error('Erro ao buscar usuário:', err);
        setNomeUsuario('Erro');
        Cookies.remove('access_token');
        Cookies.remove('role');
        router.replace('/');
      });

    // Buscar pacientes
    fetch('http://localhost:8000/nutricionistas/me/pacientes', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setPacientes(data);
        } else {
          console.error('Resposta inesperada:', data);
          setPacientes([]);
        }
      })
      .catch((err) => {
        console.error('Erro ao carregar pacientes:', err);
        setPacientes([]);
      });
  }, [router]);

  const pacientesFiltrados = pacientes.filter((p) =>
    p.username.toLowerCase().includes(busca.toLowerCase())
  );
  const handleLogout = () => {
    Cookies.remove('access_token');
    Cookies.remove('role');
    router.push('/');
  };
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl text-gray-500">Bem-vindo, {nomeUsuario}</h1>
        <button
          onClick={handleLogout}
          className="flex items-center gap-1 text-sm text-red-600 px-3 py-1 border border-red-300 rounded hover:bg-red-50 transition"
        >
          <LogOut className="w-4 h-4" />
          Sair
        </button>
      </div>

      <div className="flex justify-center mb-6">
        <div className="flex gap-2 w-full max-w-xl">
          <input
            type="text"
            placeholder="Buscar pacientes..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="p-2 border border-gray-300 rounded-md flex-1"
          />
          <button className="bg-[#0985AE] text-white px-4 py-2 rounded-md hover:opacity-90">
            Filtrar
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {pacientesFiltrados.map((p) => (
          <div
            key={p.id}
            className="bg-white p-4 rounded-md shadow hover:shadow-md transition cursor-pointer"
          >
            <h2 className="font-semibold text-lg text-gray-800 mb-1">
              {p.username}
            </h2>
            <p className="text-sm text-gray-600">{p.email}</p>

            <Link
              href={`/dashboard/nutricionista/results/${p.id}`}
              className="text-[#0985AE] mt-2 block text-sm"
            >
              Ver detalhes
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
