'use client';

import { useEffect, useState } from 'react';
import { BookOpenCheck } from 'lucide-react';

interface Recomendacao {
  titulo: string;
  descricao: string;
}

const mockRecomendacoes: Recomendacao[] = [
  {
    titulo: 'Hipertensão',
    descricao:
      'Avalie seu risco de hipertensão com base em dados clínicos e hábitos.',
  },
  {
    titulo: 'Diabetes Tipo 2',
    descricao:
      'Verifique seu risco de desenvolver diabetes tipo 2 com este questionário.',
  },
];

export default function PacienteDashboard() {
  const [nomeUsuario, setNomeUsuario] = useState('Paciente');

  useEffect(() => {
    const nome = localStorage.getItem('nome') || 'Paciente';
    setNomeUsuario(nome);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-semibold flex items-center gap-2">
          Dashboard de {nomeUsuario}{' '}
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
            <button className="bg-[#0985AE] text-white px-4 py-1 rounded hover:bg-lime-600 w-fit">
              Iniciar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
