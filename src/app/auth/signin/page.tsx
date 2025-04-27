'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import BottomWave from '@/app/components/bottom_wave';
import TextInput from '@/app/components/text_input';
import Divider from '@/app/components/divider';
import { CustomButton } from '@/app/components/custom_button';

interface RegisterFormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const SigninPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (values: RegisterFormValues) => {
    setLoading(true);
    setError(null);
    // Register logic here
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
            className="object-cover w-full h-full rounded-tr-lg rounded-br-lg"
          />
        </div>

        <div className="w-full p-10 flex flex-col justify-center">
          <h2 className="text-5xl font-bold text-center text-black mb-6">
            Cadastre-se
          </h2>

          {error && <p className="text-red-500 text-center mb-4">{error}</p>}

          <form className="space-y-4">
            <TextInput
              type="text"
              placeholder="Nome"
              autoComplete="given-name"
            />
            <TextInput
              type="text"
              placeholder="Sobrenome"
              autoComplete="family-name"
            />
            <TextInput type="email" placeholder="Email" autoComplete="email" />
            <TextInput
              type="password"
              placeholder="Senha"
              autoComplete="new-password"
            />
            <TextInput
              type="password"
              placeholder="Confirmar senha"
              autoComplete="new-password"
            />
            <CustomButton
              loading={loading}
              text="Cadastrar"
              icon=""
              onClick={() => router.push('/auth/login')}
            />
            <Divider text="Já tem uma conta?" />
            <CustomButton
              loading={loading}
              text="Fazer Login"
              icon=""
              textColor="text-black"
              bgColor="bg-white"
              borderColor="border-blue-300"
              onClick={() => router.push('/auth/login')}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default SigninPage;
