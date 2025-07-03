'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { User } from '@/models/user.model';
import Cookies from 'js-cookie';

export default function PacienteDetails() {
  const { id } = useParams();
  const router = useRouter();
  const [paciente, setPaciente] = useState<User | null>(null);
  const [respostas, setRespostas] = useState<any[]>([]);
  const [titulosTemplates, setTitulosTemplates] = useState<
    Record<number, string>
  >({});
  const [loading, setLoading] = useState(true);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    if (!id) return;

    const token = Cookies.get('access_token');
    if (!token) return;

    // Buscar paciente
    fetch(`${apiUrl}/nutricionistas/me/pacientes`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data: User[]) => {
        const pacienteEncontrado = data.find((p) => p.id === Number(id));
        if (pacienteEncontrado) {
          setPaciente(pacienteEncontrado);
        } else {
          console.warn('Paciente não encontrado');
        }
      })
      .catch((err) => {
        console.error('Erro ao carregar pacientes:', err);
        setPaciente(null);
      });

    // Buscar respostas
    fetch(`${apiUrl}/nutricionistas/pacientes/${id}/respostas`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setRespostas(data);
      })
      .catch((err) => {
        console.error('Erro ao carregar respostas:', err);
        setRespostas([]);
      })
      .finally(() => setLoading(false));

    // Buscar templates
    fetch(`${apiUrl}/questionarios/templates`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const map: Record<number, string> = {};
        data.forEach((template: any) => {
          map[template.id] = template.title;
        });
        setTitulosTemplates(map);
      })
      .catch((err) => {
        console.error('Erro ao carregar templates:', err);
      });
  }, [id]);

  if (loading || !paciente) {
    return (
      <div className="p-6 text-gray-600">
        Carregando informações do paciente...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">
          Detalhes do Paciente: {paciente.username}
        </h1>
        <button
          onClick={() => router.push('/dashboard/nutricionista')}
          className="bg-gray-200 text-sm text-gray-800 px-3 py-1 rounded hover:bg-gray-300 transition"
        >
          Voltar
        </button>
      </div>

      <div className="space-y-2 text-gray-700 mb-8">
        <p>
          <strong>Email:</strong> {paciente.email}
        </p>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Respostas do Paciente</h2>
        {respostas.length > 0 ? (
          <div className="space-y-4">
            {respostas.map((resposta, index) => (
              <div
                key={index}
                className="p-4 bg-white border rounded shadow-sm"
              >
                <p>
                  <span className="font-bold text-xl">
                    {titulosTemplates[resposta.template_id] || 'Carregando...'}
                  </span>
                </p>
                <p>
                  <strong>Score:</strong> {resposta.total_score}
                </p>
                <p>
                  <strong>Interpretação:</strong> {resposta.interpretation}
                </p>
                <p>
                  <strong>Data:</strong>{' '}
                  {new Date(resposta.data_resposta).toLocaleString('pt-BR')}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-4 bg-gray-100 text-sm text-gray-600 italic rounded border">
            Nenhuma resposta encontrada para este paciente.
          </div>
        )}
      </div>
    </div>
  );
}
