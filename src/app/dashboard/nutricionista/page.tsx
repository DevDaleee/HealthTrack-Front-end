'use client';

import { useEffect, useState } from 'react';
import { LogOut, Plus } from 'lucide-react';
import Link from 'next/link';
import Cookies from 'js-cookie';
import { useRouter, usePathname } from 'next/navigation';
import { User } from '@/models/user.model';
import { useToast } from '@/app/components/toastification';

interface Paciente {
  username: string;
  email: string;
  id: number;
  role: string;
}

export default function NutricionistaDashboard() {
  const router = useRouter();
  const pathname = usePathname(); // Usando usePathname ao invés de router.asPath
  const { addToast } = useToast(); // Hook de toast
  const [nomeUsuario, setNomeUsuario] = useState('Carregando...');
  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [busca, setBusca] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [novoPaciente, setNovoPaciente] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

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
    fetch(`${apiUrl}/auth/me`, {
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
    fetch(`${apiUrl}/nutricionistas/me/pacientes`, {
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

  const handleAddPaciente = () => {
    setShowModal(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNovoPaciente({
      ...novoPaciente,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const token = Cookies.get('access_token');
    if (!token) return;

    const pacienteData = {
      ...novoPaciente,
      role: 'paciente',
      nutricionista_id: parseInt(Cookies.get('user_id') || '0'),
    };

    try {
      const res = await fetch(`${apiUrl}/nutricionistas/pacientes`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(pacienteData),
      });

      if (res.ok) {
        addToast({
          message: 'Paciente cadastrado com sucesso!',
          type: 'success',
        });
        setShowModal(false);
        setNovoPaciente({ username: '', email: '', password: '' });

        // Recarregar a página utilizando window.location.reload()
        window.location.reload(); // Força o recarregamento da página
      } else {
        addToast({
          message: 'Erro ao cadastrar paciente.',
          type: 'error',
        });
      }
    } catch (err) {
      console.error('Erro ao adicionar paciente:', err);
      addToast({
        message: 'Erro ao adicionar paciente.',
        type: 'error',
      });
    } finally {
      setLoading(false);
    }
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

        {/* Card para adicionar novos pacientes */}
        <div
          className="bg-white p-4 rounded-md shadow hover:shadow-md transition cursor-pointer flex flex-col justify-center items-center"
          onClick={handleAddPaciente}
        >
          <button className="w-12 h-12 bg-[#0985AE] text-white rounded-full flex items-center justify-center mb-2">
            <Plus className="w-6 h-6" />
          </button>
          <p className="text-gray-600 text-sm">Adicionar um paciente</p>
        </div>
      </div>

      {/* Modal de Adicionar Paciente */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-xl mb-4">Cadastrar Novo Paciente</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700"
                >
                  Nome de Usuário
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={novoPaciente.username}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={novoPaciente.email}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Senha
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={novoPaciente.password}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-[#0985AE] text-white px-4 py-2 rounded-md"
                >
                  {loading ? 'Cadastrando...' : 'Cadastrar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
