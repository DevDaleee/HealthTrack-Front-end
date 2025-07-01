'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import BottomWave from '@/app/components/bottom_wave';
import TextInput from '@/app/components/text_input';
import Divider from '@/app/components/divider';
import { CustomButton } from '@/app/components/custom_button';
import {
  useToast,
  showErrorToast,
  showSuccessToast,
} from '@/app/components/toastification';
import React from 'react';

interface RegisterFormValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
}

const SigninPage = () => {
  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState<RegisterFormValues>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'paciente',
  });
  const router = useRouter();
  const { addToast } = useToast();
  const showError = showErrorToast(addToast);
  const showSuccess = showSuccessToast(addToast);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    if (!formValues.name.trim()) {
      showError('Nome é obrigatório.');
      return false;
    }
    if (!formValues.email.trim()) {
      showError('Email é obrigatório.');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(formValues.email)) {
      showError('Email inválido.');
      return false;
    }
    if (!formValues.password) {
      showError('Senha é obrigatória.');
      return false;
    }
    if (formValues.password.length < 6) {
      showError('Senha deve ter pelo menos 6 caracteres.');
      return false;
    }
    if (formValues.password !== formValues.confirmPassword) {
      showError('As senhas não coincidem.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!validateForm()) return;

    setLoading(true);

    try {
      const response = await fetch('http://localhost:8000/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formValues.name,
          email: formValues.email,
          password: formValues.password,
          role: formValues.role,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 422 && data.detail) {
          const validationErrors = data.detail
            .map((err: any) => err.msg)
            .join(' ');
          showError(validationErrors || 'Erro de validação.');
        } else if (data.detail) {
          showError(data.detail);
        } else {
          showError('Falha no registro. Tente novamente.');
        }
        return;
      }

      showSuccess('Cadastro realizado com sucesso!');
      router.push('/auth/login?registered=true');
    } catch (err: any) {
      showError(err.message || 'Ocorreu um erro. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleLoginClick = () => {
    router.push('/auth/login');
  };

  return (
    <div className="relative w-screen h-screen bg-gray-100 flex items-center justify-center overflow-hidden">
      <BottomWave />
      <div className="relative bg-white flex rounded-lg shadow-lg overflow-hidden w-[90%] max-w-7xl h-[600px]">
        <div className="hidden md:block md:w-[1200px]">
          <Image
            src="/login-image.png"
            alt="Imagem de alimentos"
            width={500}
            height={500}
            className="object-cover w-full h-full rounded-tr-lg rounded-br-lg"
          />
        </div>
        <div className="w-full p-10 flex flex-col justify-center">
          <h2 className="text-5xl font-bold text-center text-black mb-6">
            Cadastre-se
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <TextInput
              type="text"
              name="name"
              placeholder="Nome completo"
              value={formValues.name}
              onChange={handleChange}
              autoComplete="name"
            />
            <TextInput
              type="email"
              name="email"
              placeholder="Email"
              value={formValues.email}
              onChange={handleChange}
              autoComplete="email"
            />
            <TextInput
              type="password"
              name="password"
              placeholder="Senha"
              value={formValues.password}
              onChange={handleChange}
              autoComplete="new-password"
            />
            <TextInput
              type="password"
              name="confirmPassword"
              placeholder="Confirmar senha"
              value={formValues.confirmPassword}
              onChange={handleChange}
              autoComplete="new-password"
            />
            <div className="flex flex-col items-center gap-2">
              <p className="text-sm text-gray-600 font-medium text-center">
                Selecione o tipo de conta que deseja criar:
              </p>
              <div className="flex justify-center items-center gap-4">
                <span
                  className={`font-medium ${
                    formValues.role === 'paciente'
                      ? 'text-blue-600'
                      : 'text-gray-400'
                  }`}
                >
                  Paciente
                </span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={formValues.role === 'nutricionista'}
                    onChange={(e) =>
                      setFormValues((prev) => ({
                        ...prev,
                        role: e.target.checked ? 'nutricionista' : 'paciente',
                      }))
                    }
                  />
                  <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:bg-blue-600 transition-colors duration-300"></div>
                  <span className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 transform peer-checked:translate-x-5"></span>
                </label>
                <span
                  className={`font-medium ${
                    formValues.role === 'nutricionista'
                      ? 'text-blue-600'
                      : 'text-gray-400'
                  }`}
                >
                  Nutricionista
                </span>
              </div>
            </div>

            <CustomButton
              loading={loading}
              text="Cadastrar"
              icon=""
              type="submit"
            />
            <Divider text="Já tem uma conta?" />
            <CustomButton
              loading={false}
              text="Fazer Login"
              icon=""
              textColor="text-black"
              bgColor="bg-white"
              borderColor="border-blue-300"
              onClick={handleLoginClick}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default SigninPage;
