'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { UserCog } from 'lucide-react';

interface Paciente {
  name: string;
  age: number;
  consultations: number;
  wheight: number;
  height: number;
  status: 'active' | 'inactive' | 'pending';
}

const mockPacientes: Paciente[] = [
  {
    name: 'John Smith',
    age: 34,
    consultations: 8,
    status: 'active',
    wheight: 88,
    height: 183,
  },
  {
    name: 'Emily Johnson',
    age: 29,
    consultations: 5,
    status: 'pending',
    wheight: 88,
    height: 183,
  },
  {
    name: 'Michael Brown',
    age: 45,
    consultations: 12,
    status: 'active',
    wheight: 88,
    height: 183,
  },
  {
    name: 'Jessica Williams',
    age: 52,
    consultations: 3,
    status: 'inactive',
    wheight: 88,
    height: 183,
  },
  {
    name: 'William Davis',
    age: 38,
    consultations: 9,
    status: 'active',
    wheight: 88,
    height: 183,
  },
];

const statusColor = {
  active: 'bg-green-200 text-green-800',
  inactive: 'bg-gray-200 text-gray-700',
  pending: 'bg-blue-100 text-blue-800',
};

export default function NutricionistaDashboard() {
  const [nomeUsuario, setNomeUsuario] = useState('Nutricionista');
  const [pacientes, setPacientes] = useState(mockPacientes);
  const [busca, setBusca] = useState('');
  const router = useRouter();

  useEffect(() => {
    const nome = localStorage.getItem('nome') || 'Nutricionista';
    setNomeUsuario(nome);
  }, []);

  const pacientesFiltrados = pacientes.filter((p) =>
    p.name.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="flex justify-end items-center mb-6">
        <h1 className="text-xl font-semibold flex items-center gap-2">
          Dashboard de Nutricionista{' '}
          <UserCog className="text-gray-700 w-5 h-5" />
        </h1>
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
        {pacientesFiltrados.map((p, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-md shadow hover:shadow-md transition"
          >
            <div className="flex justify-between items-start mb-2">
              <h2 className="font-semibold text-lg text-gray-800">{p.name}</h2>
              <span
                className={`text-xs px-2 py-1 rounded-full font-medium ${
                  statusColor[p.status]
                }`}
              >
                {p.status}
              </span>
            </div>

            <p className="text-sm text-gray-600">Idade: {p.age}</p>
            <p className="text-sm text-gray-600">
              Consultas: {p.consultations}
            </p>

            <p className="text-sm text-gray-600">Idade: {p.age}</p>
            <p className="text-sm text-gray-600">
              Consultas: {p.consultations}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
