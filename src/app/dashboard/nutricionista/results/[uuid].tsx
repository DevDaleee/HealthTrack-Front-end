'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js';

// Função para verificar se o UUID foi passado corretamente
const decodeUuid = (encodedId: string) => {
  return encodedId;
};

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

interface Paciente {
  uuid: string;
  name: string;
  age: number;
  consultations: number;
  wheight: number;
  height: number;
  status: 'active' | 'inactive' | 'pending';
  weightHistory: number[]; // Histórico de peso para o gráfico
}

export default function PacienteDetails() {
  const { uuid } = useParams(); // Captura o UUID da URL
  const [paciente, setPaciente] = useState<Paciente | null>(null);

  useEffect(() => {
    if (uuid) {
      const decodedId = decodeUuid(uuid as string); // Usando o UUID diretamente
      fetch(`http://localhost:9000/pacientes/${decodedId}`) // Alterado para porta 9000
        .then((response) => response.json())
        .then((data) => setPaciente(data))
        .catch((error) => console.error('Erro ao carregar paciente:', error));
    }
  }, [uuid]);

  if (!paciente) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-semibold flex items-center gap-2">
          Detalhes do Paciente: {paciente.name}
        </h1>
      </div>

      <p>Idade: {paciente.age}</p>
      <p>Status: {paciente.status}</p>
      <p>Peso: {paciente.wheight} kg</p>
      <p>Altura: {paciente.height} cm</p>

      <div className="mt-6">
        <h3 className="text-lg font-medium">Histórico de Peso</h3>
        <Bar
          data={{
            labels: paciente.weightHistory.map(
              (_, index) => `Dia ${index + 1}`
            ),
            datasets: [
              {
                label: 'Peso',
                data: paciente.weightHistory,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgb(75, 192, 192)',
                borderWidth: 1,
              },
            ],
          }}
          options={{
            scales: {
              x: {
                beginAtZero: true,
              },
              y: {
                beginAtZero: true,
              },
            },
          }}
        />
      </div>
    </div>
  );
}
