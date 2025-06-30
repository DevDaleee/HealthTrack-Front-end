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
} from '@/app/components/toastification'
import Cookies from 'js-cookie';

interface LoginFormValues {
  email: string;
  password: string;
}

const LoginPage = () => {
  const [formValues, setFormValues] = useState<LoginFormValues>({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { addToast } = useToast();
  const showError = showErrorToast(addToast);
  const showSuccess = showSuccessToast(addToast);

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (values: LoginFormValues) => {
    setLoading(true);

    try {
      const response = await fetch('http://localhost:8000/auth/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Accept: 'application/json',
        },
        body: new URLSearchParams({
          username: values.email,
          password: values.password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        showError(errorData.detail || 'Erro ao fazer login');
        return;
      }

      const data = await response.json();
      const token = data.access_token;

      if (!token) {
        showError('Token de acesso não recebido');
        return;
      }

      Cookies.set('access_token', token, { expires: 10 });

      showSuccess('Login realizado com sucesso!');
      router.push('/dashboard');
    } catch (err) {
      showError('Erro de conexão com o servidor');
      console.error(err);
    } finally {
      setLoading(false);
    }
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
            className="object-cover w-full h-full"
          />
        </div>

        <div className="w-full p-10">
          <h2 className="text-5xl font-bold text-center text-black mb-6">
            Faça Login
          </h2>

          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <TextInput
              name="email"
              type="email"
              placeholder="Email"
              autoComplete="email"
              value={formValues.email}
              onChange={handleInputChange}
            />
            <TextInput
              name="password"
              type="password"
              placeholder="Senha"
              autoComplete="current-password"
              value={formValues.password}
              onChange={handleInputChange}
            />
            <CustomButton
              loading={loading}
              text={loading ? 'Entrando...' : 'Fazer Login'}
              onClick={() => handleSubmit(formValues)}
            />
            <Divider text="Ainda não tem conta?" />
            <CustomButton
              loading={false}
              text="Cadastrar"
              textColor="text-black"
              onClick={() => handleNavigation('/auth/signin')}
              bgColor="bg-white"
              borderColor="border-blue-300"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
