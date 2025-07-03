'use client';

import React, { useState, useCallback } from 'react';
import {
  useToast,
  showSuccessToast,
  showErrorToast,
  showWarningToast,
  showInfoToast,
} from '@/app/components/toastification';
import Cookies from 'js-cookie';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';

interface DadosQuestionario {
  idade: number;
  peso: number;
  altura: number;
  imc: number;
  circunferencia: number;
  sexo: 'Masculino' | 'Feminino';
  atividade_fisica: boolean;
  consumo_frutas_diario: boolean;
  uso_medicamentos_hipertensao: boolean;
  historico_glicose_alta: boolean;
  historico_familiar: string;
}

interface RespostaQuestionario {
  total_score: number;
  risk_level: string;
}

function montarRespostasDoFormulario(dados: DadosQuestionario) {
  const respostas = [];

  if (dados.idade < 45) respostas.push({ question_id: 1, option_id: 1 });
  else if (dados.idade < 55) respostas.push({ question_id: 1, option_id: 2 });
  else if (dados.idade < 65) respostas.push({ question_id: 1, option_id: 3 });
  else respostas.push({ question_id: 1, option_id: 4 });

  if (dados.imc < 25) respostas.push({ question_id: 2, option_id: 5 });
  else if (dados.imc < 30) respostas.push({ question_id: 2, option_id: 6 });
  else respostas.push({ question_id: 2, option_id: 7 });

  if (dados.sexo === 'Masculino') {
    if (dados.circunferencia < 94)
      respostas.push({ question_id: 3, option_id: 8 });
    else if (dados.circunferencia <= 102)
      respostas.push({ question_id: 3, option_id: 9 });
    else respostas.push({ question_id: 3, option_id: 10 });
  } else {
    if (dados.circunferencia < 80)
      respostas.push({ question_id: 4, option_id: 11 });
    else if (dados.circunferencia <= 88)
      respostas.push({ question_id: 4, option_id: 12 });
    else respostas.push({ question_id: 4, option_id: 13 });
  }

  respostas.push({
    question_id: 5,
    option_id: dados.atividade_fisica ? 14 : 15,
  });
  respostas.push({
    question_id: 6,
    option_id: dados.consumo_frutas_diario ? 16 : 17,
  });
  respostas.push({
    question_id: 7,
    option_id: dados.uso_medicamentos_hipertensao ? 19 : 18,
  });
  respostas.push({
    question_id: 8,
    option_id: dados.historico_glicose_alta ? 21 : 20,
  });

  if (dados.historico_familiar === 'Sim: Avós, tios')
    respostas.push({ question_id: 9, option_id: 23 });
  else if (dados.historico_familiar === 'Sim: Pais, irmãos')
    respostas.push({ question_id: 9, option_id: 24 });
  else respostas.push({ question_id: 9, option_id: 22 });

  return respostas;
}

async function enviarRespostasQuestionario(answers: any[]) {
  const token = Cookies.get('access_token');
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const response = await fetch(`${apiUrl}/questionarios/1/respostas`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      answers,
      paciente_id: Cookies.get('quiz_user_id'),
    }),
  });

  if (!response.ok) {
    const erro = await response.json();
    console.error('Erro ao enviar respostas:', erro);
    throw new Error(erro.detail || 'Erro ao enviar respostas');
  }

  return response.json();
}

const Diabetes = () => {
  const { addToast } = useToast();
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const id = Cookies.get('quiz_user_id');
    if (id) {
      setUserId(id);
    }
  }, []);
  const [carregando, setCarregando] = useState(false);
  const [resultado, setResultado] = useState<RespostaQuestionario | null>(null);
  const [dadosFormulario, setDadosFormulario] = useState<DadosQuestionario>({
    idade: 0,
    peso: 0,
    altura: 0,
    imc: 0,
    circunferencia: 0,
    sexo: 'Masculino',
    atividade_fisica: false,
    consumo_frutas_diario: false,
    uso_medicamentos_hipertensao: false,
    historico_glicose_alta: false,
    historico_familiar: 'Nenhum',
  });

  const [pacienteId, setPacienteId] = useState<number>(1);
  const [erros, setErros] = useState<Record<string, string>>({});

  const mostrarSucesso = showSuccessToast(addToast);
  const mostrarErro = showErrorToast(addToast);
  const mostrarAviso = showWarningToast(addToast);
  const mostrarInfo = showInfoToast(addToast);

  const validarFormulario = (): boolean => {
    const novosErros: Record<string, string> = {};

    if (dadosFormulario.idade <= 0 || dadosFormulario.idade > 120) {
      novosErros.idade = 'Idade precisa estar entre 1 e 120 anos';
    }
    if (dadosFormulario.imc <= 0 || dadosFormulario.imc > 50) {
      novosErros.imc = 'IMC precisa estar entre 1 e 50';
    }
    if (
      dadosFormulario.circunferencia <= 0 ||
      dadosFormulario.circunferencia > 200
    ) {
      novosErros.circunferencia =
        'Circunferência precisa estar entre 1 e 200 cm';
    }
    if (pacienteId <= 0) {
      novosErros.pacienteId = 'O ID do paciente deve ser maior que 0';
    }

    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  };

  const handleInputChange = (campo: keyof DadosQuestionario, valor: any) => {
    setDadosFormulario((prev) => {
      const updated = { ...prev, [campo]: valor };

      // Cálculo automático do IMC
      if (updated.peso > 0 && updated.altura > 0) {
        const alturaMetros = updated.altura / 100;
        updated.imc = Number((updated.peso / alturaMetros ** 2).toFixed(1));
      }

      return updated;
    });

    if (erros[campo]) {
      setErros((prev) => ({ ...prev, [campo]: '' }));
    }
  };

  const handleSubmitQuestionario = async () => {
    if (!userId) {
      showErrorToast(addToast)('Usuário não autenticado');
      return;
    }

    if (!validarFormulario()) return;

    try {
      setCarregando(true);
      const answers = montarRespostasDoFormulario(dadosFormulario);
      const response = await enviarRespostasQuestionario(answers);

      let nivel = 'Baixo';
      if (response.total_score >= 8) nivel = 'Alto';
      else if (response.total_score >= 4) nivel = 'Moderado';

      setResultado({ total_score: response.total_score, risk_level: nivel });
      showSuccessToast(addToast)('Avaliação enviada com sucesso!');

      setTimeout(() => {
        router.push('/');
      }, 5000);
    } catch (error) {
      console.error('Erro:', error);
      showErrorToast(addToast)('Erro ao calcular risco');
    } finally {
      setCarregando(false);
    }
  };

  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Avaliação de Risco de Diabetes
        </h1>
        <p className="text-gray-600 mb-8">
          Complete o questionário abaixo para avaliar seu nível de risco para
          diabetes.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Seção do Formulário */}
          <div className="lg:col-span-2">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmitQuestionario();
              }}
              className="bg-white rounded-lg shadow-md p-6"
            >
              {/* Informações Pessoais */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Informações Pessoais
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Idade */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Idade (anos) *
                    </label>
                    <input
                      type="number"
                      value={dadosFormulario.idade || ''}
                      onChange={(e) =>
                        handleInputChange(
                          'idade',
                          parseInt(e.target.value) || 0
                        )
                      }
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        erros.idade ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Digite sua idade"
                      min="1"
                      max="120"
                    />
                    {erros.idade && (
                      <p className="text-red-500 text-sm mt-1">{erros.idade}</p>
                    )}
                  </div>

                  {/* Sexo */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Sexo *
                    </label>
                    <select
                      value={dadosFormulario.sexo}
                      onChange={(e) =>
                        handleInputChange(
                          'sexo',
                          e.target.value as 'Masculino' | 'Feminino'
                        )
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="Masculino">Masculino</option>
                      <option value="Feminino">Feminino</option>
                    </select>
                  </div>

                  {/* Peso */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Peso (kg) *
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={dadosFormulario.peso || ''}
                      onChange={(e) =>
                        handleInputChange(
                          'peso',
                          parseFloat(e.target.value) || 0
                        )
                      }
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        erros.peso ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Digite seu peso em kg"
                      min="10"
                      max="300"
                    />
                    {erros.peso && (
                      <p className="text-red-500 text-sm mt-1">{erros.peso}</p>
                    )}
                  </div>

                  {/* Altura */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Altura (cm) *
                    </label>
                    <input
                      type="text"
                      value={dadosFormulario.altura || ''}
                      onChange={(e) =>
                        handleInputChange('altura', e.target.value)
                      }
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        erros.altura ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Digite sua altura em cm (ex: 170)"
                    />
                    {erros.altura_convertida && (
                      <p className="text-blue-600 text-sm mt-1">
                        {erros.altura_convertida}
                      </p>
                    )}
                    {erros.altura && (
                      <p className="text-red-500 text-sm mt-1">
                        {erros.altura}
                      </p>
                    )}
                  </div>

                  <div className="text-sm text-gray-600 mt-2">
                    IMC Calculado:{' '}
                    <span className="font-medium">
                      {dadosFormulario.imc || '--'}
                    </span>
                  </div>

                  {/* Circunferência Abdominal */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Circunferência Abdominal (cm) *
                    </label>
                    <input
                      type="number"
                      value={dadosFormulario.circunferencia || ''}
                      onChange={(e) =>
                        handleInputChange(
                          'circunferencia',
                          parseInt(e.target.value) || 0
                        )
                      }
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        erros.circunferencia
                          ? 'border-red-500'
                          : 'border-gray-300'
                      }`}
                      placeholder="Digite a circunferência abdominal"
                      min="30"
                      max="200"
                    />
                    {erros.circunferencia && (
                      <p className="text-red-500 text-sm mt-1">
                        {erros.circunferencia}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Fatores de Estilo de Vida */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Fatores de Estilo de Vida
                </h3>

                <div className="space-y-4">
                  {/* Atividade Física */}
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="atividade_fisica"
                      checked={dadosFormulario.atividade_fisica}
                      onChange={(e) =>
                        handleInputChange('atividade_fisica', e.target.checked)
                      }
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label
                      htmlFor="atividade_fisica"
                      className="ml-2 text-sm font-medium text-gray-900"
                    >
                      Pratico atividade física regular (pelo menos 2 horas e 30
                      minutos por semana)
                    </label>
                  </div>

                  {/* Consumo Diário de Frutas */}
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="consumo_frutas_diario"
                      checked={dadosFormulario.consumo_frutas_diario}
                      onChange={(e) =>
                        handleInputChange(
                          'consumo_frutas_diario',
                          e.target.checked
                        )
                      }
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label
                      htmlFor="consumo_frutas_diario"
                      className="ml-2 text-sm font-medium text-gray-900"
                    >
                      Consumo frutas diariamente
                    </label>
                  </div>
                </div>
              </div>

              {/* Histórico Médico */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Histórico Médico
                </h3>

                <div className="space-y-4">
                  {/* Uso de Medicamentos para Hipertensão */}
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="uso_medicamentos_hipertensao"
                      checked={dadosFormulario.uso_medicamentos_hipertensao}
                      onChange={(e) =>
                        handleInputChange(
                          'uso_medicamentos_hipertensao',
                          e.target.checked
                        )
                      }
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label
                      htmlFor="uso_medicamentos_hipertensao"
                      className="ml-2 text-sm font-medium text-gray-900"
                    >
                      Uso medicamentos para hipertensão
                    </label>
                  </div>

                  {/* Histórico de Glicose Alta */}
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="historico_glicose_alta"
                      checked={dadosFormulario.historico_glicose_alta}
                      onChange={(e) =>
                        handleInputChange(
                          'historico_glicose_alta',
                          e.target.checked
                        )
                      }
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label
                      htmlFor="historico_glicose_alta"
                      className="ml-2 text-sm font-medium text-gray-900"
                    >
                      Tenho histórico de glicose alta
                    </label>
                  </div>

                  {/* Histórico Familiar */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Histórico Familiar de Diabetes *
                    </label>
                    <select
                      value={dadosFormulario.historico_familiar}
                      onChange={(e) =>
                        handleInputChange('historico_familiar', e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="Nenhum">Sem histórico familiar</option>
                      <option value="Diabetes tipo 1">Diabetes Tipo 1</option>
                      <option value="Diabetes tipo 2">Diabetes Tipo 2</option>
                      <option value="Gestacional">Diabetes Gestacional</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Ações do Formulário */}
              <div className="flex flex-wrap gap-3">
                <button
                  type="submit"
                  disabled={carregando}
                  className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
                >
                  {carregando ? 'Processando...' : 'Enviar Avaliação'}
                </button>
              </div>
            </form>
          </div>

          {/* Seção de Resultados */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Resultado da Avaliação
              </h3>

              {resultado ? (
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-gray-900 mb-2">
                      {resultado.total_score}
                    </div>
                    <div className="text-sm text-gray-600 mb-4">
                      Pontuação Total
                    </div>

                    <div
                      className={`inline-flex px-4 py-2 rounded-full text-sm font-medium ${
                        resultado.risk_level === 'Baixo'
                          ? 'bg-green-100 text-green-800'
                          : resultado.risk_level === 'Moderado'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      Risco {resultado.risk_level}
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <h4 className="font-medium text-gray-900 mb-2">
                      Interpretação do Risco:
                    </h4>
                    <div className="text-sm text-gray-600 space-y-1">
                      <div>• Risco Baixo: 0-3 pontos</div>
                      <div>• Risco Moderado: 4-7 pontos</div>
                      <div>• Risco Alto: 8+ pontos</div>
                    </div>
                  </div>

                  {resultado.risk_level !== 'Baixo' && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3">
                      <p className="text-sm text-yellow-800">
                        <strong>Recomendação:</strong> Considere consultar um
                        profissional de saúde para avaliação adicional.
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center text-gray-500">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                    <svg
                      className="w-8 h-8 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </div>
                  <p className="text-sm">
                    Complete o formulário para ver sua avaliação de risco de
                    diabetes
                  </p>
                </div>
              )}
            </div>

            {/* Informações Rápidas */}
            <div className="bg-blue-50 rounded-lg p-4 mt-4">
              <h4 className="font-medium text-blue-900 mb-2">
                Informações da Avaliação
              </h4>
              <div className="text-sm text-blue-800 space-y-1">
                <p>• Esta avaliação é apenas para fins de triagem</p>
                <p>
                  • Os resultados não substituem aconselhamento médico
                  profissional
                </p>
                <p>• Consulte seu médico para uma avaliação completa</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Diabetes;
