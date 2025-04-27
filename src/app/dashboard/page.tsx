'use client';
import React from 'react';
import { CustomButton } from '../components/custom_button';
import BottomWave from '../components/bottom_wave';

const Dashboard = () => {
  return (
    <div className="p-20">
      <BottomWave />
      <div className="text-3xl pb-20">
        <h1>Olá Fulano!</h1>
        <h2>
          Percebemos que esse é seu primeiro acesso, seja bem-vindo! Para
          começar, precisamos que você se identifique:
        </h2>
      </div>
      <div className="flex justify-between text-2xl">
        <CustomButton
          text={'Sou Nutri!'}
          bgColor="bg-transparent"
          textColor="text-black"
          onClick={() => console.log('Sou nutri clickado!')}
        />
        <CustomButton
          text={'Sou Paciente!'}
          bgColor="bg-transparent"
          textColor="text-black"
          onClick={() => console.log('Sou Paciente clickado!')}
        />{' '}
      </div>
    </div>
  );
};

export default Dashboard;
