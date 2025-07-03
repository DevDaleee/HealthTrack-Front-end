'use client';

import React, { useState, useEffect } from 'react';
import {
  useToast,
  showSuccessToast,
  showErrorToast,
  showWarningToast,
  showInfoToast,
} from '@/app/components/toastification';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

interface DadosQuestionarioHipertensao {
  idade: number;
  imc: number;
  consumo_salgado_diario: 'Baixo' | 'Moderado' | 'Alto';
  atividade_fisica: 'Sim, regularmente' | 'Não, pouco ou nenhum exercício';
  consumo_alcool:
    | 'Não consumo'
    | 'Consumo leve a moderado'
    | 'Consumo excessivo';
  historico_hipertensao_familiar:
    | 'Não'
    | 'Sim, com histórico em familiares de segundo grau'
    | 'Sim, com histórico em familiares de primeiro grau';
  estresse: 'Baixo' | 'Moderado' | 'Alto';
  consumo_alimentos_ultraprocessados:
    | 'Raramente'
    | 'Moderado'
    | 'Frequentemente';
  tabagismo:
    | 'Nunca fumei'
    | 'Parei de fumar há mais de um ano'
    | 'Parei de fumar há menos de um ano'
    | 'Fumo atualmente';
  pressao_arterial_elevada: 'Não' | 'Sim, uma vez' | 'Sim, mais de uma vez';
}

interface RespostaQuestionarioHipertensao {
  total_score: number;
  risk_level: string;
}

function montarRespostasDoFormulario(dados: DadosQuestionarioHipertensao) {
  const respostas = [];

  // Idade
  if (dados.idade < 40) respostas.push({ question_id: 10, option_id: 25 });
  else if (dados.idade < 50) respostas.push({ question_id: 10, option_id: 26 });
  else if (dados.idade < 60) respostas.push({ question_id: 10, option_id: 27 });
  else respostas.push({ question_id: 10, option_id: 28 });

  // IMC
  if (dados.imc < 25) respostas.push({ question_id: 11, option_id: 29 });
  else if (dados.imc < 30) respostas.push({ question_id: 11, option_id: 30 });
  else respostas.push({ question_id: 11, option_id: 31 });

  // Consumo de Sal
  if (dados.consumo_salgado_diario === 'Baixo')
    respostas.push({ question_id: 12, option_id: 32 });
  else if (dados.consumo_salgado_diario === 'Moderado')
    respostas.push({ question_id: 12, option_id: 33 });
  else respostas.push({ question_id: 12, option_id: 34 });

  // Atividade Física
  if (dados.atividade_fisica === 'Sim, regularmente')
    respostas.push({ question_id: 13, option_id: 35 });
  else respostas.push({ question_id: 13, option_id: 36 });

  // Consumo de Álcool
  if (dados.consumo_alcool === 'Não consumo')
    respostas.push({ question_id: 14, option_id: 37 });
  else if (dados.consumo_alcool === 'Consumo leve a moderado')
    respostas.push({ question_id: 14, option_id: 38 });
  else respostas.push({ question_id: 14, option_id: 39 });

  // Histórico Familiar de Hipertensão
  if (dados.historico_hipertensao_familiar === 'Não')
    respostas.push({ question_id: 15, option_id: 40 });
  else if (
    dados.historico_hipertensao_familiar ===
    'Sim, com histórico em familiares de segundo grau'
  )
    respostas.push({ question_id: 15, option_id: 41 });
  else respostas.push({ question_id: 15, option_id: 42 });

  // Estresse
  if (dados.estresse === 'Baixo')
    respostas.push({ question_id: 16, option_id: 43 });
  else if (dados.estresse === 'Moderado')
    respostas.push({ question_id: 16, option_id: 44 });
  else respostas.push({ question_id: 16, option_id: 45 });

  // Consumo de Alimentos Ultraprocessados
  if (dados.consumo_alimentos_ultraprocessados === 'Raramente')
    respostas.push({ question_id: 17, option_id: 46 });
  else if (dados.consumo_alimentos_ultraprocessados === 'Moderado')
    respostas.push({ question_id: 17, option_id: 47 });
  else respostas.push({ question_id: 17, option_id: 48 });

  // Tabagismo
  if (dados.tabagismo === 'Nunca fumei')
    respostas.push({ question_id: 18, option_id: 49 });
  else if (dados.tabagismo === 'Parei de fumar há mais de um ano')
    respostas.push({ question_id: 18, option_id: 50 });
  else if (dados.tabagismo === 'Parei de fumar há menos de um ano')
    respostas.push({ question_id: 18, option_id: 51 });
  else respostas.push({ question_id: 18, option_id: 52 });

  // Pressão Arterial Elevada
  if (dados.pressao_arterial_elevada === 'Não')
    respostas.push({ question_id: 19, option_id: 53 });
  else if (dados.pressao_arterial_elevada === 'Sim, uma vez')
    respostas.push({ question_id: 19, option_id: 54 });
  else respostas.push({ question_id: 19, option_id: 55 });

  return respostas;
}

async function enviarRespostasQuestionario(answers: any[]) {
  const token = Cookies.get('access_token');
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const response = await fetch(`${apiUrl}/questionarios/2/respostas`, {
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

const Hipertensao = () => {
  const { addToast } = useToast();
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const id = Cookies.get('quiz_user_id');
    if (id) {
      setUserId(id);
    }
  }, []);
  const [carregando, setCarregando] = useState(false);
  const [resultado, setResultado] =
    useState<RespostaQuestionarioHipertensao | null>(null);
  const [dadosFormulario, setDadosFormulario] =
    useState<DadosQuestionarioHipertensao>({
      idade: 0,
      imc: 0,
      consumo_salgado_diario: 'Baixo',
      atividade_fisica: 'Sim, regularmente',
      consumo_alcool: 'Não consumo',
      historico_hipertensao_familiar: 'Não',
      estresse: 'Baixo',
      consumo_alimentos_ultraprocessados: 'Raramente',
      tabagismo: 'Nunca fumei',
      pressao_arterial_elevada: 'Não',
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

    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  };

  const handleInputChange = (
    campo: keyof DadosQuestionarioHipertensao,
    valor: any
  ) => {
    setDadosFormulario((prev) => ({ ...prev, [campo]: valor }));
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
      }, 20000);
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
          Avaliação de Risco de Hipertensão
        </h1>
        <p className="text-gray-600 mb-8">
          Complete o questionário abaixo para avaliar seu nível de risco para
          hipertensão.
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
              {/* Perguntas em Linhas */}
              <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Idade e IMC */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Idade *
                  </label>
                  <input
                    type="number"
                    value={dadosFormulario.idade || ''}
                    onChange={(e) =>
                      handleInputChange('idade', parseInt(e.target.value) || 0)
                    }
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Digite sua idade"
                    min="1"
                    max="120"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Índice de Massa Corporal (IMC) *
                  </label>
                  <input
                    type="number"
                    value={dadosFormulario.imc || ''}
                    onChange={(e) =>
                      handleInputChange('imc', parseFloat(e.target.value) || 0)
                    }
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Digite seu IMC"
                    min="1"
                    max="50"
                  />
                </div>

                {/* Consumo de Sal e Atividade Física */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Consumo de Sal *
                  </label>
                  <select
                    value={dadosFormulario.consumo_salgado_diario}
                    onChange={(e) =>
                      handleInputChange(
                        'consumo_salgado_diario',
                        e.target.value as 'Baixo' | 'Moderado' | 'Alto'
                      )
                    }
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Baixo">Baixo</option>
                    <option value="Moderado">Moderado</option>
                    <option value="Alto">Alto</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Atividade Física *
                  </label>
                  <select
                    value={dadosFormulario.atividade_fisica}
                    onChange={(e) =>
                      handleInputChange(
                        'atividade_fisica',
                        e.target.value as
                          | 'Sim, regularmente'
                          | 'Não, pouco ou nenhum exercício'
                      )
                    }
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Sim, regularmente">Sim, regularmente</option>
                    <option value="Não, pouco ou nenhum exercício">
                      Não, pouco ou nenhum exercício
                    </option>
                  </select>
                </div>

                {/* Consumo de Álcool e Histórico Familiar */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Consumo de Álcool *
                  </label>
                  <select
                    value={dadosFormulario.consumo_alcool}
                    onChange={(e) =>
                      handleInputChange(
                        'consumo_alcool',
                        e.target.value as
                          | 'Não consumo'
                          | 'Consumo leve a moderado'
                          | 'Consumo excessivo'
                      )
                    }
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Não consumo">Não consumo</option>
                    <option value="Consumo leve a moderado">
                      Consumo leve a moderado
                    </option>
                    <option value="Consumo excessivo">Consumo excessivo</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Histórico Familiar de Hipertensão *
                  </label>
                  <select
                    value={dadosFormulario.historico_hipertensao_familiar}
                    onChange={(e) =>
                      handleInputChange(
                        'historico_hipertensao_familiar',
                        e.target.value as
                          | 'Não'
                          | 'Sim, com histórico em familiares de segundo grau'
                          | 'Sim, com histórico em familiares de primeiro grau'
                      )
                    }
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Não">Não</option>
                    <option value="Sim, com histórico em familiares de segundo grau">
                      Sim, com histórico em familiares de segundo grau
                    </option>
                    <option value="Sim, com histórico em familiares de primeiro grau">
                      Sim, com histórico em familiares de primeiro grau
                    </option>
                  </select>
                </div>

                {/* Estresse e Consumo de Alimentos Ultraprocessados */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Estresse no Dia a Dia *
                  </label>
                  <select
                    value={dadosFormulario.estresse}
                    onChange={(e) =>
                      handleInputChange(
                        'estresse',
                        e.target.value as 'Baixo' | 'Moderado' | 'Alto'
                      )
                    }
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Baixo">Baixo</option>
                    <option value="Moderado">Moderado</option>
                    <option value="Alto">Alto</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Consumo de Alimentos Ultraprocessados *
                  </label>
                  <select
                    value={dadosFormulario.consumo_alimentos_ultraprocessados}
                    onChange={(e) =>
                      handleInputChange(
                        'consumo_alimentos_ultraprocessados',
                        e.target.value as
                          | 'Raramente'
                          | 'Moderado'
                          | 'Frequentemente'
                      )
                    }
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Raramente">Raramente</option>
                    <option value="Moderado">Moderado</option>
                    <option value="Frequentemente">Frequentemente</option>
                  </select>
                </div>
              </div>

              {/* Pergunta 9 - Tabagismo e Pressão Arterial */}
              <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tabagismo *
                  </label>
                  <select
                    value={dadosFormulario.tabagismo}
                    onChange={(e) =>
                      handleInputChange(
                        'tabagismo',
                        e.target.value as
                          | 'Nunca fumei'
                          | 'Parei de fumar há mais de um ano'
                          | 'Parei de fumar há menos de um ano'
                          | 'Fumo atualmente'
                      )
                    }
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Nunca fumei">Nunca fumei</option>
                    <option value="Parei de fumar há mais de um ano">
                      Parei de fumar há mais de um ano
                    </option>
                    <option value="Parei de fumar há menos de um ano">
                      Parei de fumar há menos de um ano
                    </option>
                    <option value="Fumo atualmente">Fumo atualmente</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Pressão Arterial Elevada *
                  </label>
                  <select
                    value={dadosFormulario.pressao_arterial_elevada}
                    onChange={(e) =>
                      handleInputChange(
                        'pressao_arterial_elevada',
                        e.target.value as
                          | 'Não'
                          | 'Sim, uma vez'
                          | 'Sim, mais de uma vez'
                      )
                    }
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Não">Não</option>
                    <option value="Sim, uma vez">Sim, uma vez</option>
                    <option value="Sim, mais de uma vez">
                      Sim, mais de uma vez
                    </option>
                  </select>
                </div>
              </div>

              {/* Botão de Envio */}
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
                    hipertensão
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

export default Hipertensao;
