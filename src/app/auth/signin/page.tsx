'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import BottomWave from '@/app/components/bottom_wave';
import TextInput from '@/app/components/text_input';
import Divider from '@/app/components/divider';
import { CustomButton } from '@/app/components/custom_button';
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
  const [error, setError] = useState<string | null>(null);
  const [formValues, setFormValues] = useState<RegisterFormValues>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'user', // Default role
  });
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    if (!formValues.name.trim()) {
      setError('Nome é obrigatório.');
      return false;
    }

    if (!formValues.email.trim()) {
      setError('Email é obrigatório.');
      return false;
    }

    if (!/\S+@\S+\.\S+/.test(formValues.email)) {
      setError('Email inválido.');
      return false;
    }

    if (!formValues.password) {
      setError('Senha é obrigatória.');
      return false;
    }

    if (formValues.password.length < 6) {
      setError('Senha deve ter pelo menos 6 caracteres.');
      return false;
    }

    if (formValues.password !== formValues.confirmPassword) {
      setError('As senhas não coincidem.');
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:8000/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formValues.name,
          email: formValues.email,
          role: formValues.role,
          password: formValues.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 422 && data.detail) {
          const validationErrors = data.detail
            .map((err: any) => err.msg)
            .join(' ');
          throw new Error(validationErrors || 'Erro de validação.');
        }
        throw new Error('Falha no registro. Tente novamente.');
      }

      router.push('/auth/login?registered=true');
    } catch (err: any) {
      setError(err.message || 'Ocorreu um erro. Tente novamente.');
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
          {error && (
            <p className="text-red-500 text-center mb-4 bg-red-50 p-2 rounded">
              {error}
            </p>
          )}
          <div className="space-y-4">
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
            <CustomButton
              loading={loading}
              text="Cadastrar"
              icon=""
              onClick={handleSubmit}
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default SigninPage;
