'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import BottomWave from '@/app/components/bottom_wave';
import TextInput from '@/app/components/text_input';
import Divider from '@/app/components/divider';
import { CustomButton } from '@/app/components/custom_button';

interface LoginFormValues {
  email: string;
  password: string;
}

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  const handleSubmit = async (values: LoginFormValues) => {
    setLoading(true);
    setError(null);
    // Login logic here
    setLoading(false);
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

          {error && <p className="text-red-500 text-center mb-4">{error}</p>}

          <form className="space-y-4">
            <TextInput
              type="email"
              placeholder={'Email'}
              autoComplete={'email'}
            />
            <TextInput
              type="password"
              placeholder={'Senha'}
              autoComplete={'current-password'}
            />
            <CustomButton
              loading={loading}
              text={loading ? 'Entrando...' : 'Fazer Login '}
              onClick={() => console.log('Faz login')}
            />
            <Divider text="Ainda não tem conta?" />

            <CustomButton
              loading={false}
              text="Cadastrar"
              textColor="text-black"
              onClick={() => router.push('/auth/signin')}
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
